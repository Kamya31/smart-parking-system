/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * The original app kept everything in component state, so records vanished on
 * refresh. This is a small persistence layer over localStorage that keeps the
 * same shapes, so reservations, penalties, benefits and emergency records
 * survive a reload. Swapping it for a real API later only means replacing
 * `load` and `save`.
 */

import type { Db, ParkingSlot } from './types';

const KEY = 'smartpark.db.v1';

const FLOORS = ['A', 'B', 'C'];

/** Original slot layout, preserved exactly, plus the separate emergency lane. */
export const INITIAL_SLOTS: ParkingSlot[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `A${i + 1}`,
    name: `A${i + 1}`,
    floor: 'A',
    status: (i === 0 ? 'occupied' : i === 2 ? 'reserved' : 'free') as ParkingSlot['status'],
    type: 'normal' as const,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `B${i + 1}`,
    name: `B${i + 1}`,
    floor: 'B',
    status: (i === 1 ? 'occupied' : 'free') as ParkingSlot['status'],
    type: 'normal' as const,
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `C${i + 1}`,
    name: `C${i + 1}`,
    floor: 'C',
    status: (i === 4 ? 'reserved' : 'free') as ParkingSlot['status'],
    type: 'normal' as const,
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `E${i + 1}`,
    name: `E${i + 1}`,
    floor: 'E',
    status: 'emergency' as ParkingSlot['status'],
    type: 'emergency' as const,
  })),
];

export { FLOORS };

export function emptyDb(): Db {
  const now = new Date();
  return {
    slots: INITIAL_SLOTS,
    bookings: [],
    penalties: [],
    benefits: [],
    emergencyVehicles: [
      {
        id: 'ev-1',
        vehicleNumber: 'AMB-101',
        vehicleType: 'Ambulance',
        authorizationStatus: 'Authorized',
        addedAt: now,
      },
      {
        id: 'ev-2',
        vehicleNumber: 'FIRE-77',
        vehicleType: 'Fire Truck',
        authorizationStatus: 'Authorized',
        addedAt: now,
      },
    ],
    emergencyReservations: [],
    notifications: [],
    settings: {
      bufferMinutes: 15,
      penaltyBase: 100,
      penaltyPerHour: 50,
      allowMultipleBenefits: false,
      timeSpeed: 1,
    },
  };
}

const DATE_FIELDS = new Set([
  'startTime',
  'endTime',
  'bufferEndTime',
  'actualExitTime',
  'timestamp',
  'createdAt',
  'settledAt',
  'issueDate',
  'usedDate',
  'addedAt',
]);

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export function load(): Db {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyDb();
    const parsed = JSON.parse(raw, (key, value) => {
      if (DATE_FIELDS.has(key) && typeof value === 'string' && ISO.test(value)) {
        return new Date(value);
      }
      return value;
    }) as Db;

    // Guard against a partially written or outdated record.
    const base = emptyDb();
    return {
      ...base,
      ...parsed,
      settings: { ...base.settings, ...parsed.settings },
      slots: parsed.slots?.length ? parsed.slots : base.slots,
      bookings: (parsed.bookings ?? []).map((b) => ({ ...b, flags: b.flags ?? {} })),
      penalties: parsed.penalties ?? [],
      benefits: parsed.benefits ?? [],
      emergencyVehicles: parsed.emergencyVehicles ?? base.emergencyVehicles,
      emergencyReservations: parsed.emergencyReservations ?? [],
      notifications: parsed.notifications ?? [],
    };
  } catch {
    return emptyDb();
  }
}

export function save(db: Db) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    // Storage full or unavailable; the app keeps working from memory.
  }
}

export function reset() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
