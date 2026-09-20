/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  ShieldCheck,
  LogOut,
  Clock,
  Car,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  ChevronRight,
  Bell,
  Ambulance,
  Gift,
  Timer,
  AlertTriangle,
  BadgeCheck,
  Ban,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import type {
  AppNotification,
  Booking,
  Db,
  EmergencyVehicle,
  FreeBenefit,
  ParkingSlot,
  Penalty,
  Settings,
  SlotStatus,
  Toast,
  User,
} from './lib/types';
import {
  addMinutes,
  blockedWindow,
  checkOut,
  countdown,
  currentBookingFor,
  deriveSlotStatus,
  fmtDateTime,
  fmtTime,
  holdsSlot,
  makeId,
  minutesLeft,
  overlaps,
  SLOT_LABEL,
  tick,
} from './lib/engine';
import { FLOORS, load, save } from './lib/store';

// --- Constants ---

const EMERGENCY_TYPES = [
  'Ambulance',
  'Fire Truck',
  'Emergency Response Vehicle',
  'Police Vehicle',
  'Disaster Response Unit',
];

// --- Helpers ---

function toLocalInput(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
}

function slugify(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '-') || 'user';
}

/** Card / pill styling per slot status. Existing three statuses are untouched. */
const SLOT_STYLES: Record<SlotStatus, { card: string; badge: string; text: string; icon: string }> = {
  free: {
    card: 'bg-white border-slate-100 hover:border-emerald-500 shadow-sm',
    badge: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors',
    text: 'text-emerald-600',
    icon: 'text-slate-200',
  },
  occupied: {
    card: 'bg-rose-50 border-rose-100',
    badge: 'bg-rose-100 text-rose-600',
    text: 'text-rose-600',
    icon: 'text-rose-400',
  },
  reserved: {
    card: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber-100 text-amber-600',
    text: 'text-amber-600',
    icon: 'text-amber-400',
  },
  buffer: {
    card: 'bg-orange-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-600',
    text: 'text-orange-600',
    icon: 'text-orange-400',
  },
  overstayed: {
    card: 'bg-red-100 border-red-300',
    badge: 'bg-red-200 text-red-700',
    text: 'text-red-700',
    icon: 'text-red-500',
  },
  emergency: {
    card: 'bg-white border-dashed border-rose-200 hover:border-rose-400 shadow-sm',
    badge: 'bg-rose-50 text-rose-600',
    text: 'text-rose-600',
    icon: 'text-rose-300',
  },
  'emergency-occupied': {
    card: 'bg-rose-50 border-rose-200',
    badge: 'bg-rose-100 text-rose-700',
    text: 'text-rose-700',
    icon: 'text-rose-500',
  },
};

const BOOKING_BADGE: Record<Booking['status'], string> = {
  Reserved: 'bg-amber-100 text-amber-700',
  Active: 'bg-emerald-100 text-emerald-700',
  Buffer: 'bg-orange-100 text-orange-700',
  Overstayed: 'bg-red-100 text-red-700',
  Completed: 'bg-slate-100 text-slate-700',
  Cancelled: 'bg-slate-100 text-slate-500',
};

// --- Components ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [db, setDb] = useState<Db>(() => load());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const offsetRef = useRef(0);
  const speedRef = useRef(db.settings.timeSpeed);
  speedRef.current = db.settings.timeSpeed;

  /** Single source of truth for "now", including any demo acceleration. */
  const now = () => new Date(Date.now() + offsetRef.current);

  const slots = db.slots;
  const bookings = db.bookings;

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      offsetRef.current += (speedRef.current - 1) * 1000;
      setCurrentTime(new Date(Date.now() + offsetRef.current));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Reservation lifecycle engine: buffer -> overstay -> penalty -> benefit.
  useEffect(() => {
    setDb((prev) => tick(prev, currentTime));
  }, [currentTime]);

  // Persist every change.
  useEffect(() => {
    save(db);
  }, [db]);

  // Toast Helper
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  // Surface newly generated notifications as toasts, once each.
  const lastSeenNotification = useRef<string | null>(null);
  useEffect(() => {
    if (!user) return;
    const mine = db.notifications.filter(
      (n) => n.audience === user.id || n.audience === 'all' || (user.role === 'admin' && n.audience === 'admin'),
    );
    const latest = mine[0];
    if (!latest) return;
    if (lastSeenNotification.current === null) {
      lastSeenNotification.current = latest.id;
      return;
    }
    if (latest.id !== lastSeenNotification.current) {
      lastSeenNotification.current = latest.id;
      addToast(latest.title, latest.kind === 'benefit' ? 'success' : 'info');
    }
  }, [db.notifications, user]);

  // Actions
  const handleLogin = (role: 'admin' | 'user', name?: string) => {
    const displayName = name?.trim() || (role === 'admin' ? 'Admin' : 'Demo User');
    setUser({ id: role === 'admin' ? 'admin' : slugify(displayName), name: displayName, role });
    lastSeenNotification.current = null;
    addToast(`Logged in as ${role === 'admin' ? 'Administrator' : displayName}`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setShowNotifications(false);
    addToast('Logged out successfully', 'info');
  };

  const bookSlot = (
    slotId: string,
    vehicleNumber: string,
    hours: number,
    startTime: Date,
    useBenefit: boolean,
  ) => {
    if (!user) return;
    const slot = db.slots.find((s) => s.id === slotId);
    if (!slot) return;

    // Emergency slots are never bookable from the normal flow.
    if (slot.type === 'emergency') {
      addToast('Emergency slots cannot be reserved by normal users', 'error');
      return;
    }

    const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000);
    const bufferEndTime = addMinutes(endTime, db.settings.bufferMinutes);

    // The slot stays blocked through the previous booking's buffer.
    const clash = db.bookings
      .filter((b) => b.slotId === slotId && holdsSlot(b))
      .find((b) => {
        const w = blockedWindow(b);
        return overlaps(startTime, bufferEndTime, w.from, w.to);
      });
    if (clash) {
      addToast(`Slot ${slotId} is booked until ${fmtTime(clash.bufferEndTime)}`, 'error');
      return;
    }

    const benefit = useBenefit
      ? db.benefits.find((b) => b.userId === user.id && b.status === 'Available')
      : undefined;

    const newBooking: Booking = {
      id: makeId('rsv', now()),
      slotId,
      userId: user.id,
      userName: user.name,
      vehicleNumber: vehicleNumber.toUpperCase(),
      duration: hours,
      startTime,
      endTime,
      bufferEndTime,
      status: 'Reserved',
      timestamp: now(),
      flags: {},
      appliedBenefitId: benefit?.id,
      isFree: Boolean(benefit),
    };

    setDb((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
      benefits: prev.benefits.map((b) =>
        b.id === benefit?.id
          ? { ...b, status: 'Used' as const, usedDate: now(), usedReservationId: newBooking.id }
          : b,
      ),
    }));

    setBookingModal(null);
    addToast(
      benefit
        ? `Slot ${slotId} reserved — free parking benefit applied!`
        : `Slot ${slotId} reserved successfully!`,
    );
  };

  const updateBookingStatus = (bookingId: string, newStatus: 'Active' | 'Completed') => {
    const booking = db.bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    if (newStatus === 'Active') {
      setDb((prev) => ({
        ...prev,
        bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, status: 'Active' } : b)),
      }));
      addToast('Vehicle checked in');
    } else {
      const exitAt = now();
      const late = exitAt > booking.bufferEndTime;
      setDb((prev) => checkOut(prev, bookingId, exitAt));
      addToast(
        late ? 'Vehicle checked out after buffer — penalty applies' : 'Vehicle checked out',
        late ? 'error' : 'success',
      );
    }
  };

  const cancelBooking = (bookingId: string) => {
    setDb((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) =>
        b.id === bookingId && b.status === 'Reserved' ? { ...b, status: 'Cancelled' } : b,
      ),
      // A cancelled reservation releases any benefit it was holding.
      benefits: prev.benefits.map((x) =>
        x.usedReservationId === bookingId
          ? { ...x, status: 'Available' as const, usedDate: undefined, usedReservationId: undefined }
          : x,
      ),
    }));
    addToast('Reservation cancelled — no penalty applies', 'info');
  };

  const markSlotFree = (slotId: string) => {
    const exitAt = now();
    setDb((prev) => {
      let next = prev;
      for (const b of prev.bookings.filter((x) => x.slotId === slotId && holdsSlot(x))) {
        next = checkOut(next, b.id, exitAt);
      }
      return {
        ...next,
        slots: next.slots.map((s) =>
          s.id === slotId
            ? {
                ...s,
                status: s.type === 'emergency' ? 'emergency' : 'free',
                vehicleNumber: undefined,
                hours: undefined,
              }
            : s,
        ),
        emergencyReservations: next.emergencyReservations.map((r) =>
          r.slotId === slotId && r.status === 'Active'
            ? { ...r, status: 'Released' as const, endTime: exitAt }
            : r,
        ),
      };
    });
    addToast(`Slot ${slotId} is now free`);
  };

  const addNewSlot = (name: string, floor: string) => {
    if (!name || !floor) return;
    if (slots.find((s) => s.name === name)) {
      addToast('Slot name already exists', 'error');
      return;
    }
    const isEmergency = floor === 'E';
    const newSlot: ParkingSlot = {
      id: name,
      name,
      floor,
      status: isEmergency ? 'emergency' : 'free',
      type: isEmergency ? 'emergency' : 'normal',
    };
    setDb((prev) => ({ ...prev, slots: [...prev.slots, newSlot] }));
    addToast(
      isEmergency
        ? `Emergency slot ${name} added`
        : `New slot ${name} added to floor ${floor}`,
    );
  };

  // --- Emergency lane ---

  const addEmergencyVehicle = (vehicleNumber: string, vehicleType: string) => {
    const number = vehicleNumber.trim().toUpperCase();
    if (!number) return;
    if (db.emergencyVehicles.some((v) => v.vehicleNumber === number)) {
      addToast('Vehicle already registered', 'error');
      return;
    }
    setDb((prev) => ({
      ...prev,
      emergencyVehicles: [
        ...prev.emergencyVehicles,
        {
          id: makeId('ev', now()),
          vehicleNumber: number,
          vehicleType,
          authorizationStatus: 'Authorized',
          addedAt: now(),
        },
      ],
    }));
    addToast(`${number} authorized for emergency parking`);
  };

  const setEmergencyAuth = (id: string, status: EmergencyVehicle['authorizationStatus']) => {
    setDb((prev) => ({
      ...prev,
      emergencyVehicles: prev.emergencyVehicles.map((v) =>
        v.id === id ? { ...v, authorizationStatus: status } : v,
      ),
    }));
    addToast(`Authorization set to ${status}`, status === 'Authorized' ? 'success' : 'info');
  };

  const removeEmergencyVehicle = (id: string) => {
    setDb((prev) => ({
      ...prev,
      emergencyVehicles: prev.emergencyVehicles.filter((v) => v.id !== id),
    }));
    addToast('Emergency vehicle removed', 'info');
  };

  const reserveEmergencySlot = (slotId: string, vehicleNumber: string) => {
    if (!user) return;
    const number = vehicleNumber.trim().toUpperCase();
    const vehicle = db.emergencyVehicles.find((v) => v.vehicleNumber === number);

    if (!vehicle) {
      addToast('Vehicle is not registered as an emergency vehicle', 'error');
      return;
    }
    if (vehicle.authorizationStatus !== 'Authorized') {
      addToast(`${number} is not authorized (${vehicle.authorizationStatus})`, 'error');
      return;
    }
    const slot = db.slots.find((s) => s.id === slotId);
    if (!slot || slot.type !== 'emergency') {
      addToast('Not an emergency slot', 'error');
      return;
    }
    if (slot.status === 'emergency-occupied') {
      addToast(`Slot ${slotId} is already in use`, 'error');
      return;
    }

    const at = now();
    setDb((prev) => ({
      ...prev,
      slots: prev.slots.map((s) =>
        s.id === slotId ? { ...s, status: 'emergency-occupied', vehicleNumber: number } : s,
      ),
      emergencyVehicles: prev.emergencyVehicles.map((v) =>
        v.id === vehicle.id ? { ...v, assignedSlot: slotId } : v,
      ),
      emergencyReservations: [
        {
          id: makeId('emr', at),
          emergencyVehicleId: vehicle.id,
          vehicleNumber: number,
          vehicleType: vehicle.vehicleType,
          slotId,
          startTime: at,
          status: 'Active' as const,
          createdBy: user.name,
        },
        ...prev.emergencyReservations,
      ],
      notifications: [
        {
          id: makeId('ntf', at),
          audience: 'all',
          title: 'Emergency slot reserved',
          message: `Emergency parking slot ${slotId} reserved for an authorized emergency vehicle.`,
          kind: 'emergency' as const,
          createdAt: at,
          read: false,
          vehicleNumber: number,
          slotId,
        },
        ...prev.notifications,
      ],
    }));
    addToast(`Emergency slot ${slotId} assigned to ${number}`);
  };

  const releaseEmergencySlot = (reservationId: string) => {
    const reservation = db.emergencyReservations.find((r) => r.id === reservationId);
    if (!reservation) return;
    const at = now();
    setDb((prev) => ({
      ...prev,
      slots: prev.slots.map((s) =>
        s.id === reservation.slotId ? { ...s, status: 'emergency', vehicleNumber: undefined } : s,
      ),
      emergencyVehicles: prev.emergencyVehicles.map((v) =>
        v.id === reservation.emergencyVehicleId ? { ...v, assignedSlot: undefined } : v,
      ),
      emergencyReservations: prev.emergencyReservations.map((r) =>
        r.id === reservationId ? { ...r, status: 'Released' as const, endTime: at } : r,
      ),
    }));
    addToast(`Emergency slot ${reservation.slotId} released`, 'info');
  };

  // --- Admin: penalties, settings, notifications ---

  const setPenaltyStatus = (id: string, status: Penalty['status']) => {
    setDb((prev) => ({
      ...prev,
      penalties: prev.penalties.map((p) =>
        p.id === id ? { ...p, status, settledAt: now() } : p,
      ),
    }));
    addToast(`Penalty marked ${status}`, 'info');
  };

  const updateSettings = (patch: Partial<Settings>) => {
    setDb((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  };

  const markNotificationsRead = () => {
    if (!user) return;
    setDb((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.audience === user.id || n.audience === 'all' || (user.role === 'admin' && n.audience === 'admin')
          ? { ...n, read: true }
          : n,
      ),
    }));
  };

  // --- Derived state ---

  /** Slots carrying their live status and the vehicle currently in them. */
  const liveSlots = useMemo(
    () =>
      slots.map((s) => {
        const status = deriveSlotStatus(s, bookings, currentTime);
        const booking = s.type === 'normal' ? currentBookingFor(s.id, bookings, currentTime) : undefined;
        return {
          ...s,
          status,
          vehicleNumber: booking?.vehicleNumber ?? s.vehicleNumber,
          booking,
        };
      }),
    [slots, bookings, currentTime],
  );

  const normalSlots = useMemo(() => liveSlots.filter((s) => s.type === 'normal'), [liveSlots]);
  const emergencySlots = useMemo(() => liveSlots.filter((s) => s.type === 'emergency'), [liveSlots]);

  const myNotifications = useMemo(
    () =>
      user
        ? db.notifications.filter(
            (n) =>
              n.audience === user.id ||
              n.audience === 'all' ||
              (user.role === 'admin' && n.audience === 'admin'),
          )
        : [],
    [db.notifications, user],
  );
  const unreadCount = myNotifications.filter((n) => !n.read).length;

  const myBookings = useMemo(
    () => (user?.role === 'admin' ? bookings : bookings.filter((b) => b.userId === user?.id)),
    [bookings, user],
  );

  const myBenefits = useMemo(
    () => (user ? db.benefits.filter((b) => user.role === 'admin' || b.userId === user.id) : []),
    [db.benefits, user],
  );
  const availableBenefit = useMemo(
    () => (user ? db.benefits.find((b) => b.userId === user.id && b.status === 'Available') : undefined),
    [db.benefits, user],
  );

  const myPenalties = useMemo(
    () => (user ? db.penalties.filter((p) => user.role === 'admin' || p.userId === user.id) : []),
    [db.penalties, user],
  );

  // Stats
  const stats = useMemo(
    () => ({
      total: normalSlots.length,
      free: normalSlots.filter((s) => s.status === 'free').length,
      occupied: normalSlots.filter(
        (s) => s.status === 'occupied' || s.status === 'buffer' || s.status === 'overstayed',
      ).length,
      reserved: normalSlots.filter((s) => s.status === 'reserved').length,
      buffer: normalSlots.filter((s) => s.status === 'buffer').length,
      overstayed: normalSlots.filter((s) => s.status === 'overstayed').length,
      emergency: emergencySlots.filter((s) => s.status === 'emergency-occupied').length,
    }),
    [normalSlots, emergencySlots],
  );

  const chartData = useMemo(() => {
    return FLOORS.map((f) => ({
      name: `Floor ${f}`,
      slots: normalSlots.filter((s) => s.floor === f).length,
      occupied: normalSlots.filter((s) => s.floor === f && s.status !== 'free').length,
    }));
  }, [normalSlots]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="bg-[#6C63FF] p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Car size={32} />
            </div>
            <h1 className="text-2xl font-bold">SmartPark</h1>
            <p className="text-white/80 mt-1">Next-Gen Parking Management</p>
          </div>
          <LoginPanel onLogin={handleLogin} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F4F6FB]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#6C63FF] text-white flex flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Car size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">SmartPark</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem
            icon={<MapPin size={20} />}
            label="Parking Map"
            active={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
          />
          <SidebarItem
            icon={<BookOpen size={20} />}
            label="My Bookings"
            active={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
          />
          <SidebarItem
            icon={<Ambulance size={20} />}
            label="Emergency Lane"
            active={activeTab === 'emergency'}
            onClick={() => setActiveTab('emergency')}
          />
          {user.role === 'admin' && (
            <SidebarItem
              icon={<ShieldCheck size={20} />}
              label="Admin Panel"
              active={activeTab === 'admin'}
              onClick={() => setActiveTab('admin')}
            />
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-white/60 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back, {user.name}!
            </h2>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Clock size={16} />
              <span className="text-sm font-medium">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="text-slate-300 mx-1">•</span>
              <span className="text-sm">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications((v) => !v);
                  if (!showNotifications) markNotificationsRead();
                }}
                className="p-3 bg-white rounded-2xl text-slate-400 hover:text-[#6C63FF] transition-all shadow-sm border border-slate-100 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <NotificationPanel
                    notifications={myNotifications}
                    now={currentTime}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Slots" value={stats.total} icon={<Car className="text-blue-500" />} color="blue" />
                <StatCard label="Free Slots" value={stats.free} icon={<CheckCircle2 className="text-emerald-500" />} color="emerald" />
                <StatCard label="Occupied" value={stats.occupied} icon={<XCircle className="text-rose-500" />} color="rose" />
                <StatCard label="Reserved" value={stats.reserved} icon={<AlertCircle className="text-amber-500" />} color="amber" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-slate-900">Occupancy by Floor</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#6C63FF]"></div>
                        <span className="text-xs text-slate-500 font-medium">Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                        <span className="text-xs text-slate-500 font-medium">Total</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <Tooltip
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="slots" fill="#f1f5f9" radius={[8, 8, 0, 0]} barSize={40} />
                        <Bar dataKey="occupied" fill="#6C63FF" radius={[8, 8, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quick View */}
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Quick View</h3>
                    <button onClick={() => setActiveTab('map')} className="text-sm font-semibold text-[#6C63FF] hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-5 gap-3">
                    {normalSlots.slice(0, 15).map((slot) => (
                      <div
                        key={slot.id}
                        title={`${slot.name} · ${SLOT_LABEL[slot.status]}`}
                        className={cn(
                          'aspect-square rounded-xl flex items-center justify-center text-[10px] font-bold transition-all',
                          slot.status === 'free' ? 'bg-emerald-50 text-emerald-600' :
                          slot.status === 'occupied' ? 'bg-rose-50 text-rose-600' :
                          slot.status === 'buffer' ? 'bg-orange-50 text-orange-600' :
                          slot.status === 'overstayed' ? 'bg-red-100 text-red-700' :
                          'bg-amber-50 text-amber-600'
                        )}
                      >
                        {slot.name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#6C63FF] shadow-sm">
                        <Plus size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">New Booking</p>
                        <p className="text-xs text-slate-500">Quick reserve a slot</p>
                      </div>
                      <button onClick={() => setActiveTab('map')} className="ml-auto p-2 hover:bg-slate-200 rounded-lg transition-all">
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {(stats.buffer > 0 || stats.overstayed > 0) && (
                      <div className="p-4 bg-orange-50 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                          <Timer size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {stats.buffer} in buffer · {stats.overstayed} overstayed
                          </p>
                          <p className="text-xs text-slate-500">Live slot alerts</p>
                        </div>
                        <button onClick={() => setActiveTab('bookings')} className="ml-auto p-2 hover:bg-orange-100 rounded-lg transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}

                    {availableBenefit && (
                      <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                          <Gift size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Free Parking Benefit</p>
                          <p className="text-xs text-slate-500">Ready for your next booking</p>
                        </div>
                        <button onClick={() => setActiveTab('bookings')} className="ml-auto p-2 hover:bg-emerald-100 rounded-lg transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}

                    {stats.emergency > 0 && (
                      <div className="p-4 bg-rose-50 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm">
                          <Ambulance size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{stats.emergency} Emergency In Use</p>
                          <p className="text-xs text-slate-500">Emergency lane occupancy</p>
                        </div>
                        <button onClick={() => setActiveTab('emergency')} className="ml-auto p-2 hover:bg-rose-100 rounded-lg transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Parking Map</h3>
                <div className="flex gap-4 flex-wrap">
                  <LegendItem color="bg-emerald-500" label="Free" />
                  <LegendItem color="bg-rose-500" label="Occupied" />
                  <LegendItem color="bg-amber-500" label="Reserved" />
                  <LegendItem color="bg-orange-500" label="Buffer" />
                  <LegendItem color="bg-red-600" label="Overstayed" />
                </div>
              </div>

              {FLOORS.map((floor) => (
                <div key={floor} className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Floor {floor}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {normalSlots
                      .filter((s) => s.floor === floor)
                      .map((slot) => (
                        <SlotCard
                          key={slot.id}
                          slot={slot}
                          booking={slot.booking}
                          now={currentTime}
                          onClick={() => setBookingModal(slot.id)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-slate-900">My Bookings</h3>

              {myBenefits.length > 0 && (
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                      <Gift size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Free Parking Benefits</h4>
                      <p className="text-xs text-slate-500">Issued when a previous vehicle delays your reservation</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {myBenefits.map((benefit) => (
                      <BenefitRow key={benefit.id} benefit={benefit} showUser={user.role === 'admin'} />
                    ))}
                  </div>
                </div>
              )}

              {myPenalties.length > 0 && (
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Penalties</h4>
                      <p className="text-xs text-slate-500">Raised when a vehicle stays past the buffer period</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {myPenalties.map((p) => (
                      <div key={p.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Slot {p.slotId} · <span className="font-mono">{p.vehicleNumber}</span>
                          </p>
                          <p className="text-xs text-slate-500">
                            Overstayed {p.overstayDuration} min · {fmtDateTime(p.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-red-600">₹{p.amount}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{p.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {myBookings.length === 0 ? (
                <div className="bg-white p-12 rounded-[32px] text-center border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <BookOpen size={32} />
                  </div>
                  <p className="text-slate-500 font-medium">No bookings found in this session.</p>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="mt-4 text-[#6C63FF] font-bold hover:underline"
                  >
                    Go to Parking Map
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      now={currentTime}
                      penalty={db.penalties.find((p) => p.id === booking.penaltyId)}
                      onUpdate={updateBookingStatus}
                      onCancel={cancelBooking}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'emergency' && (
            <motion.div
              key="emergency"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Emergency Vehicle Lane</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Reserved exclusively for authorized emergency vehicles. Separate from normal parking.
                  </p>
                </div>
                <div className="flex gap-4">
                  <LegendItem color="bg-rose-300" label="Emergency Free" />
                  <LegendItem color="bg-rose-600" label="In Use" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {emergencySlots.map((slot) => (
                  <SlotCard key={slot.id} slot={slot} now={currentTime} onClick={() => undefined} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-6">Assign Emergency Slot</h4>
                  <EmergencyReserveForm
                    slots={emergencySlots}
                    vehicles={db.emergencyVehicles}
                    onReserve={reserveEmergencySlot}
                  />
                </div>

                <div className="lg:col-span-2 bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="px-8 py-6">
                    <h4 className="text-lg font-bold text-slate-900">Emergency Reservations</h4>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Slot</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reserved</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {db.emergencyReservations.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-8 py-8 text-center text-slate-400 font-medium">
                            No emergency reservations recorded.
                          </td>
                        </tr>
                      )}
                      {db.emergencyReservations.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 font-mono text-sm font-bold text-slate-900">{r.vehicleNumber}</td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{r.vehicleType}</td>
                          <td className="px-8 py-4 font-bold text-slate-900">{r.slotId}</td>
                          <td className="px-8 py-4 text-slate-500 text-sm">{fmtDateTime(r.startTime)}</td>
                          <td className="px-8 py-4">
                            <span className={cn(
                              'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                              r.status === 'Active' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700',
                            )}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-right">
                            {r.status === 'Active' && (
                              <button
                                onClick={() => releaseEmergencySlot(r.id)}
                                className="px-4 py-2 text-xs font-bold text-[#6C63FF] hover:bg-slate-50 rounded-lg transition-all"
                              >
                                Release
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {user.role === 'admin' && (
                <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h4 className="text-lg font-bold text-slate-900">Authorized Emergency Vehicles</h4>
                    <AddEmergencyVehicleForm onAdd={addEmergencyVehicle} />
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Number</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Authorization</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Slot</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {db.emergencyVehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 font-mono text-sm font-bold text-slate-900">{v.vehicleNumber}</td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{v.vehicleType}</td>
                          <td className="px-8 py-4">
                            <span className={cn(
                              'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                              v.authorizationStatus === 'Authorized' ? 'bg-emerald-100 text-emerald-700' :
                              v.authorizationStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-700',
                            )}>
                              {v.authorizationStatus}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{v.assignedSlot ?? '—'}</td>
                          <td className="px-8 py-4 text-right whitespace-nowrap">
                            {v.authorizationStatus === 'Authorized' ? (
                              <button
                                onClick={() => setEmergencyAuth(v.id, 'Revoked')}
                                className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                                title="Revoke authorization"
                              >
                                <Ban size={18} />
                              </button>
                            ) : (
                              <button
                                onClick={() => setEmergencyAuth(v.id, 'Authorized')}
                                className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                title="Verify and authorize"
                              >
                                <BadgeCheck size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => removeEmergencyVehicle(v.id)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Remove vehicle"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'admin' && user.role === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900">System Administration</h3>
                <AddSlotForm onAdd={addNewSlot} />
              </div>

              {/* Live status summary */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatusPill label="Available" value={stats.free} className="bg-emerald-50 text-emerald-700" />
                <StatusPill label="Occupied" value={stats.occupied - stats.buffer - stats.overstayed} className="bg-rose-50 text-rose-700" />
                <StatusPill label="Reserved" value={stats.reserved} className="bg-amber-50 text-amber-700" />
                <StatusPill label="Buffer Period" value={stats.buffer} className="bg-orange-50 text-orange-700" />
                <StatusPill label="Overstayed" value={stats.overstayed} className="bg-red-100 text-red-700" />
                <StatusPill label="Emergency" value={stats.emergency} className="bg-rose-100 text-rose-700" />
              </div>

              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Slot ID</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Floor</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle</th>
                      <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {liveSlots.map((slot) => (
                      <tr key={slot.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-900">{slot.name}</td>
                        <td className="px-8 py-4 text-slate-500 font-medium">
                          {slot.type === 'emergency' ? 'Emergency Lane' : `Floor ${slot.floor}`}
                        </td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                            slot.status === 'free' ? 'bg-emerald-100 text-emerald-700' :
                            slot.status === 'occupied' ? 'bg-rose-100 text-rose-700' :
                            slot.status === 'buffer' ? 'bg-orange-100 text-orange-700' :
                            slot.status === 'overstayed' ? 'bg-red-100 text-red-700' :
                            slot.status === 'emergency' ? 'bg-rose-50 text-rose-600' :
                            slot.status === 'emergency-occupied' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700',
                          )}>
                            {SLOT_LABEL[slot.status]}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-slate-500 font-mono text-sm">
                          {slot.vehicleNumber || '—'}
                        </td>
                        <td className="px-8 py-4 text-right">
                          {slot.status !== 'free' && slot.status !== 'emergency' && (
                            <button
                              onClick={() => markSlotFree(slot.id)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                              title="Mark Free"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Reservation monitor */}
              <AdminSection title="Reservations" subtitle="Buffer and overstay tracking across all users">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <Th>User</Th>
                      <Th>Vehicle</Th>
                      <Th>Slot</Th>
                      <Th>Start</Th>
                      <Th>End</Th>
                      <Th>Buffer End</Th>
                      <Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {bookings.length === 0 && <EmptyRow colSpan={7} text="No reservations yet." />}
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-900">{b.userName}</td>
                        <td className="px-8 py-4 font-mono text-sm text-slate-500">{b.vehicleNumber}</td>
                        <td className="px-8 py-4 font-bold text-slate-900">{b.slotId}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{fmtTime(b.startTime)}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{fmtTime(b.endTime)}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{fmtTime(b.bufferEndTime)}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                            BOOKING_BADGE[b.status],
                          )}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AdminSection>

              {/* Penalties */}
              <AdminSection title="Penalties" subtitle="Generated automatically once the buffer period expires">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <Th>User</Th>
                      <Th>Vehicle</Th>
                      <Th>Slot</Th>
                      <Th>Overstay</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th align="right">Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.penalties.length === 0 && <EmptyRow colSpan={7} text="No penalties generated." />}
                    {db.penalties.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-900">{p.userName}</td>
                        <td className="px-8 py-4 font-mono text-sm text-slate-500">{p.vehicleNumber}</td>
                        <td className="px-8 py-4 font-bold text-slate-900">{p.slotId}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{p.overstayDuration} min</td>
                        <td className="px-8 py-4 font-bold text-red-600">₹{p.amount}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                            p.status === 'Unpaid' ? 'bg-red-100 text-red-700' :
                            p.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-slate-100 text-slate-700',
                          )}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right whitespace-nowrap">
                          {p.status === 'Unpaid' && (
                            <>
                              <button
                                onClick={() => setPenaltyStatus(p.id, 'Paid')}
                                className="px-3 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              >
                                Mark Paid
                              </button>
                              <button
                                onClick={() => setPenaltyStatus(p.id, 'Waived')}
                                className="px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-all"
                              >
                                Waive
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AdminSection>

              {/* Benefits */}
              <AdminSection title="Free Parking Benefits" subtitle="Compensation issued to users delayed by an overstay">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <Th>User</Th>
                      <Th>Reason</Th>
                      <Th>Issued</Th>
                      <Th>Status</Th>
                      <Th>Used On</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {db.benefits.length === 0 && <EmptyRow colSpan={5} text="No benefits issued." />}
                    {db.benefits.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-900">{b.userName}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{b.reason}</td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{fmtDateTime(b.issueDate)}</td>
                        <td className="px-8 py-4">
                          <span className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                            b.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                            b.status === 'Used' ? 'bg-slate-100 text-slate-700' :
                            'bg-amber-100 text-amber-700',
                          )}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-slate-500 text-sm">{fmtDateTime(b.usedDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AdminSection>

              {/* Settings */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-1">System Settings</h4>
                <p className="text-sm text-slate-500 mb-6">Buffer duration and penalty charges are configurable here.</p>
                <SettingsForm settings={db.settings} onSave={(s) => { updateSettings(s); addToast('Settings saved'); }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModal(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="bg-[#6C63FF] p-6 text-white">
                <h3 className="text-xl font-bold">Reserve Slot {bookingModal}</h3>
                <p className="text-white/70 text-sm">Enter vehicle details to book</p>
              </div>
              <BookingForm
                slotId={bookingModal}
                bookings={bookings}
                bufferMinutes={db.settings.bufferMinutes}
                benefit={availableBenefit}
                now={currentTime}
                onCancel={() => setBookingModal(null)}
                onSubmit={bookSlot}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={cn(
                'px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border min-w-[240px]',
                toast.type === 'success' ? 'bg-white border-emerald-100 text-slate-900' :
                toast.type === 'error' ? 'bg-rose-50 border-rose-100 text-rose-900' :
                'bg-blue-50 border-blue-100 text-blue-900'
              )}
            >
              {toast.type === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
              {toast.type === 'error' && <XCircle className="text-rose-500" size={20} />}
              {toast.type === 'info' && <Bell className="text-blue-500" size={20} />}
              <span className="font-semibold text-sm">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Sub-components ---

function LoginPanel({ onLogin }: { onLogin: (role: 'admin' | 'user', name?: string) => void }) {
  const [name, setName] = useState('');
  return (
    <div className="p-8 space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all text-sm font-semibold"
      />
      <button
        onClick={() => onLogin('admin')}
        className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 border border-slate-200 group"
      >
        <ShieldCheck className="text-[#6C63FF] group-hover:scale-110 transition-transform" />
        Login as Admin
      </button>
      <button
        onClick={() => onLogin('user', name)}
        className="w-full py-4 bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-semibold rounded-2xl transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-3 group"
      >
        <LayoutDashboard className="group-hover:scale-110 transition-transform" />
        Login as User
      </button>
      <p className="text-center text-slate-400 text-sm mt-6">
        Demo access • No password required
      </p>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-semibold text-sm",
        active 
          ? "bg-white text-[#6C63FF] shadow-lg shadow-black/10" 
          : "text-white/70 hover:text-white hover:bg-white/10"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", `bg-${color}-50`)}>
        {React.cloneElement(icon as React.ReactElement, { size: 28 })}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatusPill({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className={cn('px-5 py-4 rounded-2xl', className)}>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="text-xl font-bold mt-0.5">{value}</p>
    </div>
  );
}

interface SlotCardProps {
  key?: React.Key;
  slot: ParkingSlot;
  booking?: Booking;
  now: Date;
  onClick: () => void;
}

function SlotCard({ slot, booking, now, onClick }: SlotCardProps) {
  const style = SLOT_STYLES[slot.status];
  const bookable = slot.type === 'normal';
  const isEmergency = slot.type === 'emergency';

  return (
    <motion.button
      whileHover={bookable ? { y: -4 } : undefined}
      whileTap={bookable ? { scale: 0.98 } : undefined}
      onClick={bookable ? onClick : undefined}
      className={cn(
        'p-6 rounded-[24px] border-2 text-left transition-all relative overflow-hidden group',
        style.card,
        !bookable && 'cursor-default',
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold', style.badge)}>
          {slot.name}
        </span>
        {isEmergency ? (
          <Ambulance size={18} className={style.icon} />
        ) : (
          <Car size={18} className={style.icon} />
        )}
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {isEmergency ? 'Emergency Lane' : `Floor ${slot.floor}`}
      </p>
      <p className={cn('text-sm font-bold mt-1', style.text)}>{SLOT_LABEL[slot.status]}</p>

      {slot.vehicleNumber && (
        <p className="text-[10px] font-mono text-slate-500 mt-2 bg-white/50 px-2 py-1 rounded-lg inline-block">
          {slot.vehicleNumber}
        </p>
      )}

      {booking && slot.status === 'buffer' && (
        <p className="text-[10px] font-bold text-orange-600 mt-2">
          Buffer ends in {countdown(booking.bufferEndTime, now)}
        </p>
      )}
      {booking && slot.status === 'overstayed' && (
        <p className="text-[10px] font-bold text-red-700 mt-2">
          Overstayed since {fmtTime(booking.bufferEndTime)}
        </p>
      )}
      {booking && (slot.status === 'reserved' || slot.status === 'occupied') && (
        <p className="text-[10px] font-bold text-slate-400 mt-2">
          Free after {fmtTime(booking.bufferEndTime)}
        </p>
      )}
    </motion.button>
  );
}

interface BookingCardProps {
  key?: React.Key;
  booking: Booking;
  now: Date;
  penalty?: Penalty;
  onUpdate: (id: string, status: 'Active' | 'Completed') => void;
  onCancel: (id: string) => void;
}

function BookingCard({ booking, now, penalty, onUpdate, onCancel }: BookingCardProps) {
  const inBuffer = booking.status === 'Buffer';
  const overstayed = booking.status === 'Overstayed';

  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#6C63FF] font-bold">
            {booking.slotId}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{booking.vehicleNumber}</p>
            <p className="text-xs text-slate-500">{booking.duration} Hours Duration</p>
          </div>
        </div>
        <span className={cn(
          'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
          BOOKING_BADGE[booking.status],
        )}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-slate-50 rounded-2xl py-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start</p>
          <p className="text-xs font-bold text-slate-900 mt-1">{fmtTime(booking.startTime)}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl py-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">End</p>
          <p className="text-xs font-bold text-slate-900 mt-1">{fmtTime(booking.endTime)}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl py-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Buffer</p>
          <p className="text-xs font-bold text-slate-900 mt-1">{fmtTime(booking.bufferEndTime)}</p>
        </div>
      </div>

      {inBuffer && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-700">
              <Timer size={16} />
              <p className="text-xs font-bold">Please remove your vehicle</p>
            </div>
            <p className="text-lg font-bold text-orange-600 tabular-nums">
              {countdown(booking.bufferEndTime, now)}
            </p>
          </div>
          <p className="text-[11px] text-orange-600/80 mt-1">
            {minutesLeft(booking.bufferEndTime, now)} min of buffer left · slot {booking.slotId} · {booking.vehicleNumber}
          </p>
        </div>
      )}

      {overstayed && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-2xl">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={16} />
            <p className="text-xs font-bold">
              Overstayed{penalty ? ` · penalty ₹${penalty.amount}` : ''}
            </p>
          </div>
          <p className="text-[11px] text-red-600/80 mt-1">
            Buffer ended {fmtTime(booking.bufferEndTime)}
            {penalty ? ` · ${penalty.overstayDuration} min beyond buffer` : ''}
          </p>
        </div>
      )}

      {booking.freeBenefitId && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-emerald-700">
          <Gift size={16} />
          <p className="text-xs font-bold">
            Delayed by a previous vehicle — free parking benefit issued
          </p>
        </div>
      )}

      {booking.isFree && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
          <p className="text-xs font-bold text-emerald-700">Free parking benefit applied</p>
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        {booking.status === 'Reserved' && (
          <>
            <button
              onClick={() => onUpdate(booking.id, 'Active')}
              className="flex-1 py-3 bg-[#6C63FF] text-white text-sm font-bold rounded-xl hover:bg-[#5a52e0] transition-all"
            >
              Simulate Entry
            </button>
            <button
              onClick={() => onCancel(booking.id)}
              className="px-4 py-3 text-slate-500 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </>
        )}
        {(booking.status === 'Active' || booking.status === 'Buffer' || booking.status === 'Overstayed') && (
          <button
            onClick={() => onUpdate(booking.id, 'Completed')}
            className={cn(
              'flex-1 py-3 text-white text-sm font-bold rounded-xl transition-all',
              overstayed ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-slate-800',
            )}
          >
            Simulate Exit
          </button>
        )}
        {(booking.status === 'Completed' || booking.status === 'Cancelled') && (
          <div className="flex-1 py-3 bg-slate-50 text-slate-400 text-sm font-bold rounded-xl text-center">
            {booking.status === 'Cancelled' ? 'Reservation Cancelled' : 'Booking Finished'}
          </div>
        )}
      </div>
    </div>
  );
}

function BookingForm({
  slotId,
  bookings,
  bufferMinutes,
  benefit,
  now,
  onCancel,
  onSubmit,
}: {
  slotId: string;
  bookings: Booking[];
  bufferMinutes: number;
  benefit?: FreeBenefit;
  now: Date;
  onCancel: () => void;
  onSubmit: (slotId: string, vehicle: string, hours: number, start: Date, useBenefit: boolean) => void;
}) {
  // If the slot is busy, default the start to the moment it actually frees up.
  const busyUntil = useMemo(() => {
    const live = bookings.filter((b) => b.slotId === slotId && holdsSlot(b));
    if (live.length === 0) return null;
    return new Date(Math.max(...live.map((b) => b.bufferEndTime.getTime())));
  }, [bookings, slotId]);

  const defaultStart = busyUntil && busyUntil > now ? busyUntil : now;
  const [startMode, setStartMode] = useState<'now' | 'later'>(busyUntil ? 'later' : 'now');
  const [startValue, setStartValue] = useState(toLocalInput(defaultStart));
  const [useBenefit, setUseBenefit] = useState(Boolean(benefit));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Always the system clock the rest of the app runs on.
        const start = startMode === 'now' ? now : new Date(startValue);
        onSubmit(
          slotId,
          formData.get('vehicle') as string,
          Number(formData.get('hours')),
          start,
          useBenefit && Boolean(benefit),
        );
      }}
      className="p-8 space-y-6"
    >
      {busyUntil && busyUntil > now && (
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
          <p className="text-xs font-bold text-amber-700">
            Currently booked until {fmtTime(busyUntil)}
          </p>
          <p className="text-[11px] text-amber-600/80 mt-1">
            Includes the {bufferMinutes}-minute buffer. Book from that time onwards.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Number</label>
        <input 
          name="vehicle"
          required
          placeholder="e.g. ABC-1234"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all font-mono uppercase"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Start Time</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStartMode('now')}
            className={cn(
              'flex-1 py-3 rounded-2xl text-sm font-bold transition-all border',
              startMode === 'now'
                ? 'bg-[#6C63FF] text-white border-[#6C63FF]'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100',
            )}
          >
            Start Now
          </button>
          <button
            type="button"
            onClick={() => setStartMode('later')}
            className={cn(
              'flex-1 py-3 rounded-2xl text-sm font-bold transition-all border',
              startMode === 'later'
                ? 'bg-[#6C63FF] text-white border-[#6C63FF]'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100',
            )}
          >
            Schedule
          </button>
        </div>
        {startMode === 'later' && (
          <input
            type="datetime-local"
            value={startValue}
            onChange={(e) => setStartValue(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all"
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duration (Hours)</label>
        <select 
          name="hours"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 focus:border-[#6C63FF] transition-all"
        >
          {[1,2,3,4,5,6,7,8].map(h => <option key={h} value={h}>{h} Hour{h > 1 ? 's' : ''}</option>)}
        </select>
        <p className="text-[11px] text-slate-400 font-medium">
          A {bufferMinutes}-minute buffer is added automatically after your booking ends.
        </p>
      </div>

      {benefit && (
        <label className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={useBenefit}
            onChange={(e) => setUseBenefit(e.target.checked)}
            className="w-4 h-4 accent-emerald-500"
          />
          <span className="text-xs font-bold text-emerald-700">
            Apply free parking benefit to this reservation
          </span>
        </label>
      )}

      <div className="flex gap-4 pt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="flex-2 py-4 bg-[#6C63FF] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#5a52e0] transition-all"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
}

function NotificationPanel({
  notifications,
  now,
  onClose,
}: {
  notifications: AppNotification[];
  now: Date;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        className="absolute right-0 mt-3 w-[380px] max-h-[460px] overflow-y-auto bg-white rounded-[32px] shadow-2xl border border-slate-100 z-40 p-6"
      >
        <h4 className="text-sm font-bold text-slate-900 mb-4">Notifications</h4>
        {notifications.length === 0 && (
          <p className="text-sm text-slate-400 font-medium py-6 text-center">Nothing to show yet.</p>
        )}
        <div className="space-y-3">
          {notifications.slice(0, 25).map((n) => (
            <div
              key={n.id}
              className={cn(
                'p-4 rounded-2xl border',
                n.kind === 'penalty' ? 'bg-red-50 border-red-100' :
                n.kind === 'benefit' ? 'bg-emerald-50 border-emerald-100' :
                n.kind === 'emergency' ? 'bg-rose-50 border-rose-100' :
                n.kind === 'warning' ? 'bg-orange-50 border-orange-100' :
                'bg-slate-50 border-slate-100',
              )}
            >
              <p className="text-xs font-bold text-slate-900">{n.title}</p>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.message}</p>
              {(n.vehicleNumber || n.slotId) && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] font-bold text-slate-500">
                  {n.vehicleNumber && <span className="font-mono">{n.vehicleNumber}</span>}
                  {n.slotId && <span>Slot {n.slotId}</span>}
                  {n.endTime && <span>Ends {fmtTime(n.endTime)}</span>}
                  {n.bufferEndTime && <span>Buffer {fmtTime(n.bufferEndTime)}</span>}
                  {n.bufferEndTime && n.bufferEndTime > now && (
                    <span className="text-orange-600">{countdown(n.bufferEndTime, now)} left</span>
                  )}
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-2">{fmtDateTime(n.createdAt)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function BenefitRow({ benefit, showUser }: { key?: React.Key; benefit: FreeBenefit; showUser: boolean }) {
  return (
    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-slate-900">
          {showUser ? `${benefit.userName} · ` : ''}Free Parking
        </p>
        <p className="text-xs text-slate-500">{benefit.reason}</p>
        <p className="text-[10px] text-slate-400 mt-1">Issued {fmtDateTime(benefit.issueDate)}</p>
      </div>
      <span className={cn(
        'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0',
        benefit.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
        benefit.status === 'Used' ? 'bg-slate-200 text-slate-700' :
        'bg-amber-100 text-amber-700',
      )}>
        {benefit.status}
      </span>
    </div>
  );
}

function AdminSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-6">
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function Th({ children, align }: { children: React.ReactNode; align?: 'right' }) {
  return (
    <th className={cn(
      'px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider',
      align === 'right' && 'text-right',
    )}>
      {children}
    </th>
  );
}

function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-8 py-8 text-center text-slate-400 font-medium">
        {text}
      </td>
    </tr>
  );
}

function AddSlotForm({ onAdd }: { onAdd: (name: string, floor: string) => void }) {
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('A');

  return (
    <div className="flex gap-3">
      <input 
        value={name}
        onChange={e => setName(e.target.value.toUpperCase())}
        placeholder="Slot ID (e.g. D1)"
        className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
      />
      <select 
        value={floor}
        onChange={e => setFloor(e.target.value)}
        className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
      >
        {FLOORS.map(f => <option key={f} value={f}>Floor {f}</option>)}
        <option value="E">Emergency Lane</option>
      </select>
      <button 
        onClick={() => { onAdd(name, floor); setName(''); }}
        className="px-6 py-3 bg-[#6C63FF] text-white font-bold rounded-xl hover:bg-[#5a52e0] transition-all flex items-center gap-2"
      >
        <Plus size={18} />
        Add Slot
      </button>
    </div>
  );
}

function AddEmergencyVehicleForm({ onAdd }: { onAdd: (vehicleNumber: string, vehicleType: string) => void }) {
  const [number, setNumber] = useState('');
  const [type, setType] = useState(EMERGENCY_TYPES[0]);

  return (
    <div className="flex gap-3 flex-wrap">
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value.toUpperCase())}
        placeholder="Vehicle No. (e.g. AMB-102)"
        className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold font-mono"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
      >
        {EMERGENCY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <button
        onClick={() => { onAdd(number, type); setNumber(''); }}
        className="px-6 py-3 bg-[#6C63FF] text-white font-bold rounded-xl hover:bg-[#5a52e0] transition-all flex items-center gap-2"
      >
        <Plus size={18} />
        Authorize
      </button>
    </div>
  );
}

function EmergencyReserveForm({
  slots,
  vehicles,
  onReserve,
}: {
  slots: ParkingSlot[];
  vehicles: EmergencyVehicle[];
  onReserve: (slotId: string, vehicleNumber: string) => void;
}) {
  const freeSlots = slots.filter((s) => s.status === 'emergency');
  const [slotId, setSlotId] = useState(freeSlots[0]?.id ?? '');
  const [vehicle, setVehicle] = useState('');

  const authorized = vehicles.filter((v) => v.authorizationStatus === 'Authorized');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Emergency Slot</label>
        <select
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
        >
          {freeSlots.length === 0 && <option value="">No free emergency slots</option>}
          {freeSlots.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Number</label>
        <input
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value.toUpperCase())}
          list="authorized-emergency-vehicles"
          placeholder="e.g. AMB-101"
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 font-mono uppercase text-sm"
        />
        <datalist id="authorized-emergency-vehicles">
          {authorized.map((v) => <option key={v.id} value={v.vehicleNumber} />)}
        </datalist>
        <p className="text-[11px] text-slate-400 font-medium">
          Only administrator-authorized emergency vehicles are accepted.
        </p>
      </div>
      <button
        onClick={() => { if (slotId && vehicle) { onReserve(slotId, vehicle); setVehicle(''); } }}
        disabled={!slotId}
        className="w-full py-4 bg-[#6C63FF] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#5a52e0] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Reserve Emergency Slot
      </button>
    </div>
  );
}

function SettingsForm({ settings, onSave }: { settings: Settings; onSave: (s: Partial<Settings>) => void }) {
  const [buffer, setBuffer] = useState(settings.bufferMinutes);
  const [base, setBase] = useState(settings.penaltyBase);
  const [perHour, setPerHour] = useState(settings.penaltyPerHour);
  const [multi, setMulti] = useState(settings.allowMultipleBenefits);
  const [speed, setSpeed] = useState(settings.timeSpeed);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Buffer Minutes">
          <input
            type="number"
            min={1}
            value={buffer}
            onChange={(e) => setBuffer(Number(e.target.value))}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
          />
        </Field>
        <Field label="Penalty Base (₹)">
          <input
            type="number"
            min={0}
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
          />
        </Field>
        <Field label="Penalty Per Hour (₹)">
          <input
            type="number"
            min={0}
            value={perHour}
            onChange={(e) => setPerHour(Number(e.target.value))}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
          />
        </Field>
        <Field label="Clock Speed (demo)">
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/20 text-sm font-bold"
          >
            <option value={1}>Real time (1x)</option>
            <option value={60}>1 min = 1 hour (60x)</option>
            <option value={300}>Fast (300x)</option>
          </select>
        </Field>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={multi}
          onChange={(e) => setMulti(e.target.checked)}
          className="w-4 h-4 accent-[#6C63FF]"
        />
        <span className="text-sm font-semibold text-slate-700">
          Allow a user to hold more than one unused free parking benefit
        </span>
      </label>

      <button
        onClick={() =>
          onSave({
            bufferMinutes: buffer,
            penaltyBase: base,
            penaltyPerHour: perHour,
            allowMultipleBenefits: multi,
            timeSpeed: speed,
          })
        }
        className="px-6 py-3 bg-[#6C63FF] text-white font-bold rounded-xl hover:bg-[#5a52e0] transition-all"
      >
        Save Settings
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-3 h-3 rounded-full", color)}></div>
      <span className="text-xs text-slate-500 font-bold">{label}</span>
    </div>
  );
}
