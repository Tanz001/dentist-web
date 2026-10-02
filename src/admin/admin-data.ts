import type { BookingFormData } from '../types';

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'checked-in'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export type AdminAppointment = BookingFormData & {
  id: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string | undefined;
};

export type AdminDoctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  experienceYears: number;
  active: boolean;
  patientsToday: number;
};

export type AdminService = {
  id: string;
  title: string;
  description: string;
  category: 'clinical' | 'cosmetic' | 'preventative';
  treatmentTime: string;
  imageUrl: string;
  priceFrom: number;
  active: boolean;
};

export type AdminPatient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: string;
  preferredDentist: string;
};

export type AdminSettings = {
  clinicName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export const ADMIN_PASSWORD = 'lounge2026';
export const DOCTOR_PASSWORD = 'doctor2026';
export const AUTH_KEY = 'aesthetic-lounge-admin-auth';
export const DOCTOR_AUTH_KEY = 'aesthetic-lounge-doctor-auth';
export const STORAGE_KEY = 'aesthetic-lounge-admin-v1';
export const BOOKINGS_KEY = 'aesthetic_lounge_bookings';

export const DEFAULT_SETTINGS: AdminSettings = {
  clinicName: 'Aesthetic Lounge',
  phone: '+92 327 2668844',
  email: 'hello@aestheticlounge.pk',
  address: 'Opposite to G1 Market, Johar Town, Lahore, Pakistan, 54000',
  hours: 'Mon–Sat · 9:00 AM – 6:00 PM',
};

export const STATUS_META: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pending: { label: 'Pending', className: 'bg-amber-500/15 text-amber-800' },
  confirmed: { label: 'Confirmed', className: 'bg-sky-500/15 text-sky-800' },
  'checked-in': { label: 'Checked in', className: 'bg-teal-500/15 text-teal-800' },
  completed: { label: 'Completed', className: 'bg-emerald-500/15 text-emerald-800' },
  cancelled: { label: 'Cancelled', className: 'bg-rose-500/15 text-rose-700' },
  'no-show': { label: 'No-show', className: 'bg-stone-200 text-stone-600' },
};

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const SEED_DOCTORS: AdminDoctor[] = [
  {
    id: 'dentist-1',
    name: 'Dr. Beatrice Rostova',
    title: 'Aesthetic Architect, DDS',
    specialty: 'Porcelain Veneers',
    bio: 'Zurich-trained. Hand-shaded, high-translucency veneers for natural light.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    experienceYears: 14,
    active: true,
    patientsToday: 6,
  },
  {
    id: 'dentist-2',
    name: 'Dr. Marcus Vance',
    title: 'Orthopedic Lead, DDS',
    specialty: 'Clear Aligners',
    bio: '3D biomechanical aligner plans — frictionless, precise, comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    experienceYears: 16,
    active: true,
    patientsToday: 5,
  },
  {
    id: 'dentist-3',
    name: 'Dr. Alena Thorne',
    title: 'Pediatric Specialist, DDS',
    specialty: 'Gentle Pediatric Care',
    bio: 'Turns nervous visits into calm ones — for kids and anxious adults.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800',
    experienceYears: 11,
    active: true,
    patientsToday: 4,
  },
  {
    id: 'dentist-4',
    name: 'Dr. Julian Park',
    title: 'Implant Specialist, DDS',
    specialty: 'Dental Implants',
    bio: 'Titanium implants and custom crowns built for lasting strength and comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    experienceYears: 13,
    active: true,
    patientsToday: 3,
  },
];

export const SEED_SERVICES: AdminService[] = [
  {
    id: 'cleaning',
    title: 'Wellness Cleanings',
    description: 'Gentle ultrasonic polishing and protective enamel care.',
    category: 'preventative',
    treatmentTime: '45 min',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
    priceFrom: 120,
    active: true,
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Veneers',
    description: 'Ultra-thin porcelain, hand-shaded for natural translucency.',
    category: 'cosmetic',
    treatmentTime: '2 visits',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400',
    priceFrom: 900,
    active: true,
  },
  {
    id: 'ortho',
    title: 'Clear Aligners',
    description: 'Custom 3D-planned aligners that shift teeth comfortably.',
    category: 'cosmetic',
    treatmentTime: '6–12 mo',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    priceFrom: 2500,
    active: true,
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Titanium roots with custom crowns for lasting strength.',
    category: 'clinical',
    treatmentTime: '3 visits',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
    priceFrom: 1800,
    active: true,
  },
  {
    id: 'pediatric',
    title: 'Pediatric Care',
    description: 'Gentle visits that turn fear into trust.',
    category: 'preventative',
    treatmentTime: '30 min',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b1ffefb000?auto=format&fit=crop&q=80&w=1200',
    priceFrom: 90,
    active: true,
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Same-day relief for trauma, pain, and urgent repairs.',
    category: 'clinical',
    treatmentTime: 'Same day',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200',
    priceFrom: 150,
    active: true,
  },
];

const NAMES = [
  'Elena Marquez',
  'James Whitfield',
  'Sofia Chen',
  'Noah Patel',
  'Amelia Brooks',
  'Liam Ortega',
  'Chloe Nguyen',
  'Ethan Cole',
  'Maya Singh',
  'Owen Hart',
  'Isla Bennett',
  'Leo Castillo',
];

const TIMES = ['09:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:00 PM'];
const SERVICES = SEED_SERVICES.map((s) => s.title);
const DOCTORS = SEED_DOCTORS.map((d) => d.name);
const STATUSES: AppointmentStatus[] = [
  'pending',
  'confirmed',
  'checked-in',
  'completed',
  'confirmed',
  'pending',
  'completed',
  'cancelled',
  'confirmed',
  'no-show',
  'checked-in',
  'confirmed',
];

export function seedAppointments(): AdminAppointment[] {
  return STATUSES.map((status, i) => {
    const id = `apt-${1000 + i}`;
    const created = daysAgo(8 - (i % 9));
    const appt: AdminAppointment = {
      id,
      name: NAMES[i % NAMES.length]!,
      email: `${NAMES[i % NAMES.length]!.split(' ')[0]!.toLowerCase()}@mail.com`,
      phone: `555-01${String(20 + i).padStart(2, '0')}`,
      service: SERVICES[i % SERVICES.length]!,
      preferredDate: daysFromNow(i % 5 === 0 ? 0 : (i % 4) - 1),
      preferredTime: TIMES[i % TIMES.length]!,
      dentistName: DOCTORS[i % DOCTORS.length]!,
      status,
      createdAt: created,
      updatedAt: created,
    };
    if (i % 3 === 0) appt.notes = 'Prefers quiet suite';
    return appt;
  });
}

export function patientsFromAppointments(appointments: AdminAppointment[]): AdminPatient[] {
  const map = new Map<string, AdminPatient>();
  for (const a of appointments) {
    const key = a.email.toLowerCase();
    const cur = map.get(key) ?? {
      id: `pat-${key}`,
      name: a.name,
      email: a.email,
      phone: a.phone,
      visits: 0,
      lastVisit: a.preferredDate,
      preferredDentist: a.dentistName,
    };
    cur.visits += 1;
    if (a.preferredDate > cur.lastVisit) {
      cur.lastVisit = a.preferredDate;
      cur.name = a.name;
      cur.phone = a.phone;
      cur.preferredDentist = a.dentistName;
    }
    map.set(key, cur);
  }
  return [...map.values()].sort((a, b) => b.visits - a.visits);
}

export function formatMoney(v: number) {
  return `$${v.toLocaleString('en-US')}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
