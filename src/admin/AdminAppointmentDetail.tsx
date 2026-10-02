import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Mail, Phone, Stethoscope, User } from 'lucide-react';
import { STATUS_META, type AppointmentStatus } from './admin-data';
import { useAdmin } from './admin-store';

const STATUSES: AppointmentStatus[] = [
  'pending',
  'confirmed',
  'checked-in',
  'completed',
  'cancelled',
  'no-show',
];

const PIPELINE: AppointmentStatus[] = ['pending', 'confirmed', 'checked-in', 'completed'];

export function AdminAppointmentDetail() {
  const { id } = useParams();
  const {
    appointments,
    doctors,
    services,
    updateAppointmentStatus,
    updateAppointmentNotes,
    updateAppointment,
  } = useAdmin();
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    return (
      <div className="mx-auto max-w-lg py-24 text-center">
        <p className="font-serif text-3xl">Appointment not found</p>
        <Link to="/admin/appointments" className="btn-primary mt-8 inline-flex !rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to appointments
        </Link>
      </div>
    );
  }

  const currentIdx = PIPELINE.indexOf(appointment.status);
  const activeDoctors = doctors.filter((d) => d.active);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            to="/admin/appointments"
            className="kicker inline-flex items-center gap-1.5 !text-[10px] !text-text-muted hover:!text-accent-gold"
          >
            <ArrowLeft className="h-3 w-3" /> All appointments
          </Link>
          <p className="kicker mt-3">Appointment detail</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">{appointment.name}</h1>
          <p className="mt-2 text-[13px] text-text-muted">
            {appointment.preferredDate} · {appointment.preferredTime}
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-[12px] font-medium ${STATUS_META[appointment.status].className}`}
        >
          {STATUS_META[appointment.status].label}
        </span>
      </div>

      <div className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-bg-charcoal text-white">
            <CalendarDays className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-serif text-xl">Visit pipeline</h2>
            <p className="text-[12px] text-text-muted">Track patient progress through the visit</p>
          </div>
        </div>

        {appointment.status === 'cancelled' || appointment.status === 'no-show' ? (
          <p className={`rounded-xl px-4 py-3 text-[13px] ${STATUS_META[appointment.status].className}`}>
            Marked as {STATUS_META[appointment.status].label.toLowerCase()}.
          </p>
        ) : (
          <ol className="grid gap-3 sm:grid-cols-4">
            {PIPELINE.map((step, i) => {
              const done = currentIdx >= i;
              return (
                <li
                  key={step}
                  className={`rounded-xl border px-4 py-4 ${
                    done ? 'border-accent-gold/40 bg-accent-gold/10' : 'border-bg-warm bg-bg-cream/50'
                  }`}
                >
                  <span
                    className={`mb-3 grid h-7 w-7 place-items-center rounded-full text-[11px] font-medium ${
                      done ? 'bg-bg-charcoal text-white' : 'bg-bg-warm text-text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[13px] font-medium">{STATUS_META[step].label}</p>
                  <p className="mt-1 text-[11px] text-text-muted">{done ? 'Done' : 'Waiting'}</p>
                </li>
              );
            })}
          </ol>
        )}

        <div className="mt-8">
          <p className="kicker mb-3 !text-[10px]">Update status</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateAppointmentStatus(appointment.id, s)}
                className={`rounded-full px-4 py-2 text-[12px] transition-colors ${
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <User className="h-4 w-4 text-accent-gold" />
            <h2 className="font-serif text-xl">Patient</h2>
          </div>
          <dl className="space-y-4 text-[13px]">
            <div>
              <dt className="kicker !text-[10px]">Name</dt>
              <dd className="mt-1 text-base font-medium">{appointment.name}</dd>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-text-muted" />
              <div>
                <dt className="kicker !text-[10px]">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${appointment.phone}`} className="underline underline-offset-2">
                    {appointment.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-text-muted" />
              <div>
                <dt className="kicker !text-[10px]">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${appointment.email}`} className="underline underline-offset-2">
                    {appointment.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <Stethoscope className="h-4 w-4 text-accent-gold" />
            <h2 className="font-serif text-xl">Care plan</h2>
          </div>
          <div className="space-y-4 text-[13px]">
            <label className="block">
              <span className="kicker mb-1.5 block !text-[10px]">Service</span>
              <select
                value={appointment.service}
                onChange={(e) => updateAppointment(appointment.id, { service: e.target.value })}
                className="w-full rounded-xl border border-bg-warm bg-white px-3 py-2.5 outline-none focus:border-accent-gold"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                {!services.some((s) => s.title === appointment.service) && (
                  <option value={appointment.service}>{appointment.service}</option>
                )}
              </select>
            </label>

            <label className="block">
              <span className="kicker mb-1.5 block !text-[10px]">Assign doctor</span>
              <select
                value={appointment.dentistName}
                onChange={(e) => updateAppointment(appointment.id, { dentistName: e.target.value })}
                className="w-full rounded-xl border border-bg-warm bg-white px-3 py-2.5 outline-none focus:border-accent-gold"
              >
                {activeDoctors.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} · {d.specialty}
                  </option>
                ))}
                {!activeDoctors.some((d) => d.name === appointment.dentistName) && (
                  <option value={appointment.dentistName}>{appointment.dentistName}</option>
                )}
              </select>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="kicker mb-1.5 block !text-[10px]">Date</span>
                <input
                  type="date"
                  value={appointment.preferredDate}
                  onChange={(e) =>
                    updateAppointment(appointment.id, { preferredDate: e.target.value })
                  }
                  className="w-full rounded-xl border border-bg-warm px-3 py-2.5 outline-none focus:border-accent-gold"
                />
              </label>
              <label className="block">
                <span className="kicker mb-1.5 block !text-[10px]">Time</span>
                <select
                  value={appointment.preferredTime}
                  onChange={(e) =>
                    updateAppointment(appointment.id, { preferredTime: e.target.value })
                  }
                  className="w-full rounded-xl border border-bg-warm bg-white px-3 py-2.5 outline-none focus:border-accent-gold"
                >
                  {[
                    '09:00 AM',
                    '10:00 AM',
                    '10:30 AM',
                    '11:00 AM',
                    '01:00 PM',
                    '02:00 PM',
                    '02:30 PM',
                    '04:00 PM',
                    '05:00 PM',
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl">Clinical notes</h2>
        <textarea
          value={appointment.notes ?? ''}
          onChange={(e) => updateAppointmentNotes(appointment.id, e.target.value)}
          rows={4}
          className="mt-4 w-full rounded-xl border border-bg-warm px-4 py-3 text-[13px] outline-none focus:border-accent-gold"
          placeholder="Allergies, anxiety notes, suite preference…"
        />
      </section>
    </div>
  );
}
