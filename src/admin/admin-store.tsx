import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  ADMIN_PASSWORD,
  AUTH_KEY,
  BOOKINGS_KEY,
  DEFAULT_SETTINGS,
  DOCTOR_AUTH_KEY,
  DOCTOR_PASSWORD,
  SEED_DOCTORS,
  SEED_SERVICES,
  STORAGE_KEY,
  patientsFromAppointments,
  seedAppointments,
  todayISO,
  type AdminAppointment,
  type AdminDoctor,
  type AdminService,
  type AdminSettings,
  type AppointmentStatus,
} from './admin-data';
import type { BookingFormData } from '../types';

type AdminContextValue = {
  ready: boolean;
  authenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  doctorId: string | null;
  doctorLogin: (doctorId: string, password: string) => boolean;
  doctorLogout: () => void;
  currentDoctor: AdminDoctor | null;
  appointments: AdminAppointment[];
  doctors: AdminDoctor[];
  services: AdminService[];
  settings: AdminSettings;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateAppointmentNotes: (id: string, notes: string) => void;
  deleteAppointment: (id: string) => void;
  updateDoctor: (id: string, patch: Partial<AdminDoctor>) => void;
  addDoctor: (input: Omit<AdminDoctor, 'id'>) => AdminDoctor;
  deleteDoctor: (id: string) => void;
  updateAppointment: (id: string, patch: Partial<AdminAppointment>) => void;
  updateService: (id: string, patch: Partial<AdminService>) => void;
  updateSettings: (patch: Partial<AdminSettings>) => void;
  resetDemoData: () => void;
  syncWebsiteBookings: () => void;
  stats: {
    todayCount: number;
    pendingCount: number;
    completedWeek: number;
    patientsCount: number;
    doctorsActive: number;
    revenueProxy: number;
    byDay: { day: string; count: number }[];
    byStatus: { status: AppointmentStatus; count: number }[];
    byService: { name: string; count: number }[];
  };
};

const AdminContext = createContext<AdminContextValue | null>(null);

function loadAppointments(): AdminAppointment[] {
  try {
    const adminRaw = localStorage.getItem(STORAGE_KEY);
    if (adminRaw) {
      const parsed = JSON.parse(adminRaw) as { appointments?: AdminAppointment[] };
      if (parsed.appointments?.length) return parsed.appointments;
    }
  } catch {
    /* ignore */
  }
  return seedAppointments();
}

function mergeWebsiteBookings(existing: AdminAppointment[]): AdminAppointment[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) return existing;
    const siteBookings = JSON.parse(raw) as BookingFormData[];
    if (!Array.isArray(siteBookings) || !siteBookings.length) return existing;

    const keys = new Set(
      existing.map((a) => `${a.email}|${a.preferredDate}|${a.preferredTime}|${a.service}`),
    );
    const extras: AdminAppointment[] = [];
    siteBookings.forEach((b, i) => {
      const key = `${b.email}|${b.preferredDate}|${b.preferredTime}|${b.service}`;
      if (keys.has(key)) return;
      const id = `web-${Date.now()}-${i}`;
      const now = new Date().toISOString();
      extras.push({
        ...b,
        id,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      });
      keys.add(key);
    });
    return [...extras, ...existing];
  } catch {
    return existing;
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [doctors, setDoctors] = useState<AdminDoctor[]>(SEED_DOCTORS);
  const [services, setServices] = useState<AdminService[]>(SEED_SERVICES);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          appointments?: AdminAppointment[];
          doctors?: AdminDoctor[];
          services?: AdminService[];
          settings?: AdminSettings;
        };
        let appts = parsed.appointments?.length ? parsed.appointments : seedAppointments();
        appts = mergeWebsiteBookings(appts);
        setAppointments(appts);
        if (parsed.doctors?.length) setDoctors(parsed.doctors);
        if (parsed.services?.length) setServices(parsed.services);
        if (parsed.settings) setSettings({ ...DEFAULT_SETTINGS, ...parsed.settings });
      } else {
        setAppointments(mergeWebsiteBookings(seedAppointments()));
      }
    } catch {
      setAppointments(seedAppointments());
    }
    setAuthenticated(localStorage.getItem(AUTH_KEY) === '1');
    setDoctorId(localStorage.getItem(DOCTOR_AUTH_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ appointments, doctors, services, settings }),
    );
  }, [appointments, doctors, services, settings, ready]);

  const login = useCallback((password: string) => {
    if (password.trim() === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, '1');
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }, []);

  const doctorLogin = useCallback(
    (id: string, password: string) => {
      const exists = doctors.some((d) => d.id === id && d.active);
      if (exists && password.trim() === DOCTOR_PASSWORD) {
        localStorage.setItem(DOCTOR_AUTH_KEY, id);
        setDoctorId(id);
        return true;
      }
      return false;
    },
    [doctors],
  );

  const doctorLogout = useCallback(() => {
    localStorage.removeItem(DOCTOR_AUTH_KEY);
    setDoctorId(null);
  }, []);

  const currentDoctor = useMemo(
    () => doctors.find((d) => d.id === doctorId) ?? null,
    [doctors, doctorId],
  );

  const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status, updatedAt: new Date().toISOString() } : a,
      ),
    );
  }, []);

  const updateAppointmentNotes = useCallback((id: string, notes: string) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, notes, updatedAt: new Date().toISOString() } : a,
      ),
    );
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updateDoctor = useCallback((id: string, patch: Partial<AdminDoctor>) => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  }, []);

  const addDoctor = useCallback((input: Omit<AdminDoctor, 'id'>) => {
    const doctor: AdminDoctor = {
      ...input,
      id: `dentist-${Date.now()}`,
    };
    setDoctors((prev) => [doctor, ...prev]);
    return doctor;
  }, []);

  const deleteDoctor = useCallback((id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateAppointment = useCallback((id: string, patch: Partial<AdminAppointment>) => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a,
      ),
    );
  }, []);

  const updateService = useCallback((id: string, patch: Partial<AdminService>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const updateSettings = useCallback((patch: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetDemoData = useCallback(() => {
    setAppointments(seedAppointments());
    setDoctors(SEED_DOCTORS);
    setServices(SEED_SERVICES);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const syncWebsiteBookings = useCallback(() => {
    setAppointments((prev) => mergeWebsiteBookings(prev));
  }, []);

  const stats = useMemo(() => {
    const today = todayISO();
    const todayCount = appointments.filter(
      (a) => a.preferredDate === today && a.status !== 'cancelled',
    ).length;
    const pendingCount = appointments.filter(
      (a) => a.status === 'pending' || a.status === 'confirmed',
    ).length;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const completedWeek = appointments.filter(
      (a) => a.status === 'completed' && new Date(a.updatedAt) >= weekAgo,
    ).length;
    const patientsCount = patientsFromAppointments(appointments).length;
    const doctorsActive = doctors.filter((d) => d.active).length;

    const priceMap = new Map(services.map((s) => [s.title, s.priceFrom]));
    const revenueProxy = appointments
      .filter((a) => a.status === 'completed' || a.status === 'checked-in')
      .reduce((n, a) => n + (priceMap.get(a.service) ?? 150), 0);

    const dayMap = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dayMap.set(d.toLocaleDateString('en-US', { weekday: 'short' }), 0);
    }
    for (const a of appointments) {
      if (a.status === 'cancelled') continue;
      const key = new Date(a.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
      if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
    }

    const statuses: AppointmentStatus[] = [
      'pending',
      'confirmed',
      'checked-in',
      'completed',
      'cancelled',
      'no-show',
    ];
    const byStatus = statuses.map((status) => ({
      status,
      count: appointments.filter((a) => a.status === status).length,
    }));

    const serviceMap = new Map<string, number>();
    for (const a of appointments) {
      if (a.status === 'cancelled') continue;
      serviceMap.set(a.service, (serviceMap.get(a.service) ?? 0) + 1);
    }
    const byService = [...serviceMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      todayCount,
      pendingCount,
      completedWeek,
      patientsCount,
      doctorsActive,
      revenueProxy,
      byDay: [...dayMap.entries()].map(([day, count]) => ({ day, count })),
      byStatus,
      byService,
    };
  }, [appointments, doctors, services]);

  return (
    <AdminContext.Provider
      value={{
        ready,
        authenticated,
        login,
        logout,
        doctorId,
        doctorLogin,
        doctorLogout,
        currentDoctor,
        appointments,
        doctors,
        services,
        settings,
        updateAppointmentStatus,
        updateAppointmentNotes,
        deleteAppointment,
        updateDoctor,
        addDoctor,
        deleteDoctor,
        updateAppointment,
        updateService,
        updateSettings,
        resetDemoData,
        syncWebsiteBookings,
        stats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
