import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, MoreHorizontal, Search } from 'lucide-react';
import { STATUS_META, patientsFromAppointments, type AppointmentStatus } from '../admin/admin-data';
import { useAdmin } from '../admin/admin-store';

const STATUSES: AppointmentStatus[] = [
  'pending',
  'confirmed',
  'checked-in',
  'completed',
  'cancelled',
  'no-show',
];

export function DoctorAppointments() {
  const { currentDoctor, appointments, updateAppointmentStatus } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | AppointmentStatus>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const mine = useMemo(
    () =>
      appointments
        .filter((a) => a.dentistName === currentDoctor?.name)
        .sort(
          (a, b) =>
            b.preferredDate.localeCompare(a.preferredDate) ||
            a.preferredTime.localeCompare(b.preferredTime),
        ),
    [appointments, currentDoctor?.name],
  );

  const filtered = mine.filter((a) => {
    if (status !== 'all' && a.status !== status) return false;
    if (!q.trim()) return true;
    return `${a.name} ${a.service} ${a.phone}`.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Schedule</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">My appointments</h1>
        <p className="mt-2 text-[13px] text-text-muted">{filtered.length} visits assigned to you</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatus('all')}
          className={`rounded-full px-3 py-1.5 text-[12px] ${
            status === 'all' ? 'bg-bg-charcoal text-white' : 'border border-bg-warm bg-white'
          }`}
        >
          All ({mine.length})
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-full px-3 py-1.5 text-[12px] ${
              status === s ? 'bg-bg-charcoal text-white' : 'border border-bg-warm bg-white'
            }`}
          >
            {STATUS_META[s].label} ({mine.filter((a) => a.status === s).length})
          </button>
        ))}
      </div>

      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your patients…"
          className="w-full rounded-xl border border-bg-warm bg-white py-2.5 pl-10 pr-3 text-[13px] outline-none focus:border-accent-gold"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[13px]">
            <thead className="border-b border-bg-warm bg-bg-cream/50 text-[11px] uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">When</th>
                <th className="px-5 py-4 font-medium">Patient</th>
                <th className="px-5 py-4 font-medium">Service</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium text-right"> </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-warm">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-bg-cream/40">
                  <td className="px-5 py-4">
                    <Link to={`/doctor/appointments/${a.id}`} className="font-medium hover:underline">
                      {a.preferredDate}
                    </Link>
                    <p className="text-[11px] text-text-muted">{a.preferredTime}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-[11px] text-text-muted">{a.phone}</p>
                  </td>
                  <td className="px-5 py-4">{a.service}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] ${STATUS_META[a.status].className}`}>
                      {STATUS_META[a.status].label}
                    </span>
                  </td>
                  <td className="relative px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label="Actions"
                      onClick={() => setOpenMenu(openMenu === a.id ? null : a.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-bg-warm hover:bg-bg-cream"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenu === a.id && (
                      <>
                        <button
                          type="button"
                          className="fixed inset-0 z-10"
                          aria-label="Close"
                          onClick={() => setOpenMenu(null)}
                        />
                        <div className="absolute right-5 top-12 z-20 w-48 overflow-hidden rounded-xl border border-bg-warm bg-white py-1 shadow-xl">
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] hover:bg-bg-cream"
                            onClick={() => {
                              setOpenMenu(null);
                              navigate(`/doctor/appointments/${a.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" /> Open chart
                          </button>
                          <div className="my-1 border-t border-bg-warm" />
                          {(['checked-in', 'completed', 'no-show'] as AppointmentStatus[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              className="block w-full px-3 py-2 text-left text-[13px] hover:bg-bg-cream"
                              onClick={() => {
                                updateAppointmentStatus(a.id, s);
                                setOpenMenu(null);
                              }}
                            >
                              Mark {STATUS_META[s].label.toLowerCase()}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-text-muted">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function DoctorAppointmentDetail() {
  const { id } = useParams();
  const { currentDoctor, appointments, updateAppointmentStatus, updateAppointmentNotes } = useAdmin();
  const appointment = appointments.find(
    (a) => a.id === id && a.dentistName === currentDoctor?.name,
  );

  if (!appointment) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <p className="font-serif text-3xl">Visit not found</p>
        <Link to="/doctor/appointments" className="btn-primary mt-8 inline-flex !rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/doctor/appointments"
            className="kicker inline-flex items-center gap-1.5 !text-[10px] !text-text-muted"
          >
            <ArrowLeft className="h-3 w-3" /> My appointments
          </Link>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl">{appointment.name}</h1>
          <p className="mt-2 text-[13px] text-text-muted">
            {appointment.preferredDate} · {appointment.preferredTime} · {appointment.service}
          </p>
        </div>
        <span className={`rounded-full px-4 py-1.5 text-[12px] ${STATUS_META[appointment.status].className}`}>
          {STATUS_META[appointment.status].label}
        </span>
      </div>

      <div className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
        <p className="kicker mb-3 !text-[10px]">Update visit status</p>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => updateAppointmentStatus(appointment.id, s)}
              className={`rounded-full px-4 py-2 text-[12px] ${
                appointment.status === s
                  ? 'bg-bg-charcoal text-white'
                  : 'border border-bg-warm hover:border-accent-gold'
              }`}
            >
              {STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl">Patient contact</h2>
          <dl className="mt-4 space-y-3 text-[13px]">
            <div>
              <dt className="text-text-muted">Phone</dt>
              <dd>
                <a href={`tel:${appointment.phone}`} className="underline">
                  {appointment.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-text-muted">Email</dt>
              <dd>
                <a href={`mailto:${appointment.email}`} className="underline">
                  {appointment.email}
                </a>
              </dd>
            </div>
          </dl>
        </section>
        <section className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl">Clinical notes</h2>
          <textarea
            value={appointment.notes ?? ''}
            onChange={(e) => updateAppointmentNotes(appointment.id, e.target.value)}
            rows={5}
            className="mt-4 w-full rounded-xl border border-bg-warm px-4 py-3 text-[13px] outline-none focus:border-accent-gold"
            placeholder="Chart notes for this visit…"
          />
        </section>
      </div>
    </div>
  );
}

export function DoctorPatients() {
  const { currentDoctor, appointments } = useAdmin();
  const [q, setQ] = useState('');
  const mine = appointments.filter((a) => a.dentistName === currentDoctor?.name);
  const patients = patientsFromAppointments(mine).filter((p) => {
    if (!q.trim()) return true;
    return `${p.name} ${p.email} ${p.phone}`.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Caseload</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">My patients</h1>
      </div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patients…"
          className="w-full rounded-xl border border-bg-warm bg-white py-2.5 pl-10 pr-3 text-[13px] outline-none focus:border-accent-gold"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-[13px]">
          <thead className="border-b border-bg-warm bg-bg-cream/50 text-[11px] uppercase tracking-wider text-text-muted">
            <tr>
              <th className="px-5 py-4 font-medium">Patient</th>
              <th className="px-5 py-4 font-medium">Visits with you</th>
              <th className="px-5 py-4 font-medium">Last visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-warm">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-bg-cream/40">
                <td className="px-5 py-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-[11px] text-text-muted">
                    {p.email} · {p.phone}
                  </p>
                </td>
                <td className="px-5 py-4">{p.visits}</td>
                <td className="px-5 py-4 text-text-muted">{p.lastVisit}</td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-16 text-center text-text-muted">
                  No patients yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DoctorProfile() {
  const { currentDoctor, updateDoctor } = useAdmin();
  if (!currentDoctor) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="kicker">Account</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Profile</h1>
      </div>
      <div className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <img
            src={currentDoctor.imageUrl}
            alt=""
            className="h-24 w-24 rounded-2xl object-cover"
          />
          <div>
            <h2 className="font-serif text-2xl">{currentDoctor.name}</h2>
            <p className="text-[13px] text-text-muted">{currentDoctor.title}</p>
            <p className="kicker mt-2 !text-[10px]">{currentDoctor.specialty}</p>
          </div>
        </div>
        <div className="space-y-4 border-t border-bg-warm p-6">
          <label className="block">
            <span className="kicker mb-1.5 block !text-[10px]">Bio</span>
            <textarea
              value={currentDoctor.bio}
              onChange={(e) => updateDoctor(currentDoctor.id, { bio: e.target.value })}
              rows={4}
              className="w-full rounded-xl border border-bg-warm px-3 py-2.5 text-[13px] outline-none focus:border-accent-gold"
            />
          </label>
          <p className="text-[12px] text-text-muted">
            {currentDoctor.experienceYears} years experience ·{' '}
            {currentDoctor.active ? 'Active on roster' : 'Inactive'}
          </p>
        </div>
      </div>
    </div>
  );
}
