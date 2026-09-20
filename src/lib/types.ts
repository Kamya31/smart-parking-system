/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Slots ---

export type SlotStatus =
  | 'free'
  | 'occupied'
  | 'reserved'
  | 'buffer'
  | 'overstayed'
  | 'emergency'
  | 'emergency-occupied';

export type SlotType = 'normal' | 'emergency';

export interface ParkingSlot {
  id: string;
  name: string;
  floor: string;
  /** Base status. Live status is derived from bookings (see engine.deriveSlotStatus). */
  status: SlotStatus;
  type: SlotType;
  vehicleNumber?: string;
  bookedBy?: string;
  hours?: number;
}

// --- Bookings / Reservations ---

export type BookingStatus =
  | 'Reserved'
  | 'Active'
  | 'Buffer'
  | 'Overstayed'
  | 'Completed'
  | 'Cancelled';

export interface BookingFlags {
  endedNotice?: boolean;
  bufferNotice?: boolean;
  expiringNotice?: boolean;
  overstayNotice?: boolean;
}

export interface Booking {
  id: string;
  slotId: string;
  userId: string;
  userName: string;
  vehicleNumber: string;
  duration: number;
  startTime: Date;
  endTime: Date;
  bufferEndTime: Date;
  actualExitTime?: Date;
  status: BookingStatus;
  penaltyId?: string;
  /** userId of the next reservation holder who was blocked by this booking's overstay. */
  affectedNextUser?: string;
  /** Benefit issued to THIS booking's user because a previous vehicle overstayed. */
  freeBenefitId?: string;
  /** Reservation of the overstaying vehicle that delayed this booking. */
  delayedByReservationId?: string;
  /** Delay was recorded but no benefit issued (user already holds one). */
  benefitSuppressed?: boolean;
  /** Benefit the user redeemed on this booking. */
  appliedBenefitId?: string;
  isFree?: boolean;
  timestamp: Date;
  flags: BookingFlags;
}

// --- Penalties ---

export type PenaltyStatus = 'Unpaid' | 'Paid' | 'Waived';

export interface Penalty {
  id: string;
  userId: string;
  userName: string;
  reservationId: string;
  vehicleNumber: string;
  slotId: string;
  /** Minutes beyond the end of the buffer period. */
  overstayDuration: number;
  amount: number;
  status: PenaltyStatus;
  createdAt: Date;
  settledAt?: Date;
}

// --- Free parking benefits ---

export type BenefitStatus = 'Available' | 'Used' | 'Expired';

export interface FreeBenefit {
  id: string;
  userId: string;
  userName: string;
  reason: string;
  status: BenefitStatus;
  issueDate: Date;
  usedDate?: Date;
  /** The reservation of this user that was delayed. */
  affectedReservationId: string;
  /** The reservation the benefit was finally spent on. */
  usedReservationId?: string;
}

// --- Emergency lane ---

export type EmergencyAuthStatus = 'Authorized' | 'Pending' | 'Revoked';

export interface EmergencyVehicle {
  id: string;
  vehicleNumber: string;
  vehicleType: string;
  authorizationStatus: EmergencyAuthStatus;
  assignedSlot?: string;
  addedAt: Date;
}

export type EmergencyReservationStatus = 'Active' | 'Released';

export interface EmergencyReservation {
  id: string;
  emergencyVehicleId: string;
  vehicleNumber: string;
  vehicleType: string;
  slotId: string;
  startTime: Date;
  endTime?: Date;
  status: EmergencyReservationStatus;
  createdBy: string;
}

// --- Notifications ---

export type NotificationKind = 'info' | 'warning' | 'penalty' | 'benefit' | 'emergency';

export interface AppNotification {
  id: string;
  /** userId, or 'admin' for admin-only, or 'all'. */
  audience: string;
  title: string;
  message: string;
  kind: NotificationKind;
  createdAt: Date;
  read: boolean;
  vehicleNumber?: string;
  slotId?: string;
  endTime?: Date;
  bufferEndTime?: Date;
}

// --- Settings (admin configurable) ---

export interface Settings {
  bufferMinutes: number;
  penaltyBase: number;
  penaltyPerHour: number;
  allowMultipleBenefits: boolean;
  /** Clock acceleration for demonstration. 1 = real time. */
  timeSpeed: number;
}

// --- Users ---

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

// --- The whole persisted store ---

export interface Db {
  slots: ParkingSlot[];
  bookings: Booking[];
  penalties: Penalty[];
  benefits: FreeBenefit[];
  emergencyVehicles: EmergencyVehicle[];
  emergencyReservations: EmergencyReservation[];
  notifications: AppNotification[];
  settings: Settings;
}
