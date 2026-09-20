/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Reservation lifecycle engine.
 *
 * Every transition below is derived from the system clock and the recorded
 * vehicle presence (entry / exit). `tick` is a pure function: given the same
 * store and the same `now` it always produces the same result, so it is safe to
 * run it repeatedly (including under React StrictMode double-invocation).
 *
 *   Reserved -> Active -> Booking ended -> Buffer -> Available
 *                                              \-> Overstayed -> Penalty
 *                                                          \-> Free benefit
 *                                                              for next user
 */

import type {
  AppNotification,
  Booking,
  Db,
  FreeBenefit,
  NotificationKind,
  ParkingSlot,
  Penalty,
  SlotStatus,
} from './types';

export const MINUTE = 60 * 1000;

/** Warn the driver this long before the buffer expires. */
export const EXPIRY_WARNING_MINUTES = 5;

export const BENEFIT_REASON = 'Affected by previous vehicle overstay';

let seq = 0;
function id(prefix: string, now: Date) {
  seq = (seq + 1) % 100000;
  return `${prefix}-${now.getTime().toString(36)}-${seq.toString(36)}`;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * MINUTE);
}

export function fmtTime(date?: Date) {
  if (!date) return '—';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function fmtDateTime(date?: Date) {
  if (!date) return '—';
  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${fmtTime(date)}`;
}

/** Whole minutes remaining until `target`, never negative. */
export function minutesLeft(target: Date, now: Date) {
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / MINUTE));
}

/** mm:ss countdown string. */
export function countdown(target: Date, now: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Minutes a vehicle stayed past the end of its buffer. */
export function overstayMinutes(booking: Booking, now: Date) {
  const end = booking.actualExitTime ?? now;
  return Math.max(0, Math.ceil((end.getTime() - booking.bufferEndTime.getTime()) / MINUTE));
}

export function penaltyAmount(minutes: number, base: number, perHour: number) {
  if (minutes <= 0) return 0;
  return base + Math.ceil(minutes / 60) * perHour;
}

/** A booking still holds its slot until the vehicle physically leaves. */
export function holdsSlot(b: Booking) {
  return (
    !b.actualExitTime &&
    (b.status === 'Reserved' || b.status === 'Active' || b.status === 'Buffer' || b.status === 'Overstayed')
  );
}

/** Window a booking blocks the slot for, buffer included. */
export function blockedWindow(b: Booking) {
  return { from: b.startTime, to: b.bufferEndTime };
}

export function overlaps(aFrom: Date, aTo: Date, bFrom: Date, bTo: Date) {
  return aFrom < bTo && bFrom < aTo;
}

/**
 * Live status of a slot. The booking currently covering `now` wins; otherwise a
 * pending reservation keeps the slot marked reserved, exactly as before.
 */
export function deriveSlotStatus(slot: ParkingSlot, bookings: Booking[], now: Date): SlotStatus {
  if (slot.type === 'emergency') {
    return slot.status === 'emergency-occupied' ? 'emergency-occupied' : 'emergency';
  }

  const live = bookings.filter((b) => b.slotId === slot.id && holdsSlot(b));
  const current = live.find((b) => b.startTime <= now && now <= b.bufferEndTime);
  const active = current ?? live.find((b) => b.status === 'Overstayed');

  if (active) {
    switch (active.status) {
      case 'Active':
        return 'occupied';
      case 'Buffer':
        return 'buffer';
      case 'Overstayed':
        return 'overstayed';
      default:
        return 'reserved';
    }
  }
  if (live.length > 0) return 'reserved';
  return slot.status;
}

/** Booking whose details should be shown on the slot right now. */
export function currentBookingFor(slotId: string, bookings: Booking[], now: Date) {
  const live = bookings.filter((b) => b.slotId === slotId && holdsSlot(b));
  return (
    live.find((b) => b.startTime <= now && now <= b.bufferEndTime) ??
    live.find((b) => b.status === 'Overstayed') ??
    live.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())[0]
  );
}

export const SLOT_LABEL: Record<SlotStatus, string> = {
  free: 'Available',
  reserved: 'Reserved',
  occupied: 'Occupied',
  buffer: 'Buffer Period',
  overstayed: 'Overstayed',
  emergency: 'Emergency Slot',
  'emergency-occupied': 'Emergency In Use',
};

function notify(
  now: Date,
  audience: string,
  title: string,
  message: string,
  kind: NotificationKind,
  extra: Partial<AppNotification> = {},
): AppNotification {
  return {
    id: id('ntf', now),
    audience,
    title,
    message,
    kind,
    createdAt: now,
    read: false,
    ...extra,
  };
}

/**
 * Advance the whole system to `now`. Returns a new store; the input is untouched.
 */
export function tick(db: Db, now: Date): Db {
  const { bufferMinutes, penaltyBase, penaltyPerHour, allowMultipleBenefits } = db.settings;

  const bookings = db.bookings.map((b) => ({ ...b, flags: { ...b.flags } }));
  const penalties = [...db.penalties];
  const benefits = [...db.benefits];
  const notifications = [...db.notifications];

  /** Nothing changed? Return the original store so React and the persistence
   *  layer can skip the update entirely. */
  let dirty = false;

  // Slots blocked right now by a vehicle that has overstayed its buffer.
  const overstayedSlots = new Set(
    bookings.filter((b) => b.status === 'Overstayed' && !b.actualExitTime).map((b) => b.slotId),
  );

  for (const b of bookings) {
    if (b.status === 'Completed' || b.status === 'Cancelled') continue;

    // Reserved -> Active. The vehicle cannot take a slot another vehicle is
    // still sitting in, so an affected reservation waits where it is.
    if (b.status === 'Reserved' && now >= b.startTime && !overstayedSlots.has(b.slotId)) {
      b.status = 'Active';
      dirty = true;
    }

    // A reservation whose window passed without the vehicle ever arriving is
    // simply closed out. No vehicle, no overstay, no penalty.
    if (b.status === 'Reserved' && now > b.bufferEndTime) {
      b.status = 'Completed';
      b.actualExitTime = b.actualExitTime ?? b.endTime;
      dirty = true;
      continue;
    }

    // Active -> Buffer, at the moment the booked time ends.
    if (b.status === 'Active' && now >= b.endTime) {
      b.status = 'Buffer';
      dirty = true;
      if (!b.flags.endedNotice) {
        b.flags.endedNotice = true;
        notifications.unshift(
          notify(
            now,
            b.userId,
            'Parking time ended',
            `Your parking reservation has ended. Please remove your vehicle within the ${bufferMinutes}-minute buffer period to avoid a penalty.`,
            'warning',
            {
              vehicleNumber: b.vehicleNumber,
              slotId: b.slotId,
              endTime: b.endTime,
              bufferEndTime: b.bufferEndTime,
            },
          ),
        );
      }
    }

    // Inside the buffer.
    if (b.status === 'Buffer') {
      if (!b.flags.bufferNotice) {
        b.flags.bufferNotice = true;
        dirty = true;
        notifications.unshift(
          notify(
            now,
            b.userId,
            'Buffer period started',
            `You have ${bufferMinutes} minutes of buffer time remaining to remove your vehicle from slot ${b.slotId}.`,
            'warning',
            { vehicleNumber: b.vehicleNumber, slotId: b.slotId, bufferEndTime: b.bufferEndTime },
          ),
        );
      }
      const warnAt = addMinutes(b.bufferEndTime, -EXPIRY_WARNING_MINUTES);
      if (!b.flags.expiringNotice && now >= warnAt) {
        b.flags.expiringNotice = true;
        dirty = true;
        notifications.unshift(
          notify(
            now,
            b.userId,
            'Buffer about to expire',
            'Your buffer period is about to expire. Please remove your vehicle immediately.',
            'warning',
            { vehicleNumber: b.vehicleNumber, slotId: b.slotId, bufferEndTime: b.bufferEndTime },
          ),
        );
      }

      // Buffer -> Overstayed, strictly after the buffer ends, so leaving
      // exactly on the buffer deadline never attracts a penalty.
      if (now > b.bufferEndTime) {
        b.status = 'Overstayed';
        overstayedSlots.add(b.slotId);
        dirty = true;
      }
    }

    // Overstaying: raise the penalty once, then keep it current.
    if (b.status === 'Overstayed') {
      const mins = overstayMinutes(b, now);
      const amount = penaltyAmount(mins, penaltyBase, penaltyPerHour);
      const existing = b.penaltyId ? penalties.findIndex((p) => p.id === b.penaltyId) : -1;

      if (existing === -1) {
        const penalty: Penalty = {
          id: id('pen', now),
          userId: b.userId,
          userName: b.userName,
          reservationId: b.id,
          vehicleNumber: b.vehicleNumber,
          slotId: b.slotId,
          overstayDuration: mins,
          amount,
          status: 'Unpaid',
          createdAt: now,
        };
        penalties.push(penalty);
        b.penaltyId = penalty.id;
        dirty = true;
        if (!b.flags.overstayNotice) {
          b.flags.overstayNotice = true;
          notifications.unshift(
            notify(
              now,
              b.userId,
              'Penalty generated',
              'Your vehicle has overstayed the reservation and a penalty has been generated.',
              'penalty',
              { vehicleNumber: b.vehicleNumber, slotId: b.slotId, bufferEndTime: b.bufferEndTime },
            ),
          );
          notifications.unshift(
            notify(
              now,
              'admin',
              'Overstay detected',
              `Vehicle ${b.vehicleNumber} has overstayed in slot ${b.slotId}.`,
              'penalty',
              { vehicleNumber: b.vehicleNumber, slotId: b.slotId },
            ),
          );
        }
      } else if (
        existing !== -1 &&
        penalties[existing].status === 'Unpaid' &&
        !b.actualExitTime &&
        (penalties[existing].overstayDuration !== mins || penalties[existing].amount !== amount)
      ) {
        penalties[existing] = { ...penalties[existing], overstayDuration: mins, amount };
        dirty = true;
      }

      // Compensate whoever was scheduled next on this slot and is being kept
      // waiting. Each affected reservation is handled on its own.
      const affected = bookings.filter(
        (n) =>
          n.id !== b.id &&
          n.slotId === b.slotId &&
          n.userId !== b.userId &&
          (n.status === 'Reserved' || n.status === 'Active') &&
          !n.actualExitTime &&
          n.startTime <= now,
      );

      for (const next of affected) {
        if (next.freeBenefitId || next.benefitSuppressed) continue;
        next.delayedByReservationId = b.id;
        b.affectedNextUser = next.userId;
        dirty = true;

        const alreadyHolds = benefits.some(
          (x) => x.userId === next.userId && x.status === 'Available',
        );
        if (alreadyHolds && !allowMultipleBenefits) {
          notifications.unshift(
            notify(
              now,
              next.userId,
              'Slot occupied beyond allowed time',
              `Your parking slot is currently occupied beyond the previous user's allowed time. You already hold an unused free parking benefit, so no additional benefit has been issued.`,
              'warning',
              { slotId: next.slotId },
            ),
          );
          next.benefitSuppressed = true;
          dirty = true;
          continue;
        }

        const benefit: FreeBenefit = {
          id: id('ben', now),
          userId: next.userId,
          userName: next.userName,
          reason: BENEFIT_REASON,
          status: 'Available',
          issueDate: now,
          affectedReservationId: next.id,
        };
        benefits.push(benefit);
        next.freeBenefitId = benefit.id;
        dirty = true;

        notifications.unshift(
          notify(
            now,
            next.userId,
            'Free parking benefit issued',
            `Your parking slot is currently occupied beyond the previous user's allowed time. You have been compensated with a free parking benefit for your next visit.`,
            'benefit',
            { slotId: next.slotId, vehicleNumber: next.vehicleNumber },
          ),
        );
      }
    }
  }

  // Expire benefits that were issued against a reservation the user never
  // completed and that is now long gone is out of scope here; benefits stay
  // Available until redeemed or explicitly expired by an administrator.

  if (!dirty) return db;

  return {
    ...db,
    bookings,
    penalties,
    benefits,
    notifications: notifications.slice(0, 200),
  };
}

/** Record that a vehicle physically left the slot. */
export function checkOut(db: Db, bookingId: string, now: Date): Db {
  const booking = db.bookings.find((b) => b.id === bookingId);
  if (!booking) return db;

  const late = now > booking.bufferEndTime;
  const bookings = db.bookings.map((b) =>
    b.id === bookingId
      ? { ...b, actualExitTime: now, status: late ? ('Overstayed' as const) : ('Completed' as const) }
      : b,
  );

  // Freeze the penalty at the real exit time.
  const penalties = db.penalties.map((p) => {
    if (p.reservationId !== bookingId || p.status !== 'Unpaid') return p;
    const mins = Math.max(0, Math.ceil((now.getTime() - booking.bufferEndTime.getTime()) / MINUTE));
    return {
      ...p,
      overstayDuration: mins,
      amount: penaltyAmount(mins, db.settings.penaltyBase, db.settings.penaltyPerHour),
    };
  });

  return { ...db, bookings, penalties };
}

export { id as makeId };
