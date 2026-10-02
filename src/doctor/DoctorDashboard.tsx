import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { STATUS_META, todayISO } from '../admin/admin-data';
import { useAdmin } from '../admin/admin-store';

export function DoctorDashboard() {
  const { currentDoctor, appointments, updateAppointmentStatus } = useAdmin();
  const doctorName = currentDoctor?.name ?? '';
  const today = todayISO();

  const mine = appointments.filter((a) => a.dentistName === doctorName);
  const todays = mine
    .filter((a) => a.preferredDate === today && a.status !== 'cancelled')
    .sort((a, b) => a.preferredTime.localeCompare(b.preferredTime));
  const upcoming = mine
    .filter((a) => a.preferredDate >= today && a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => a.preferredDate.localeCompare(b.preferredDate) || a.preferredTime.localeCompare(b.preferredTime))
    .slice(0, 6);
  const completedWeek = mine.filter((a) => {
    if (a.status !== 'completed') return false;
    const d = new Date(a.updatedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return d >= weekAgo;
  }).length;
  const patients = new Set(mine.map((a) => a.email.toLowerCase())).size;

  const byDay = (() => {
    const map = new Map<string, number>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      map.set(d.toLocaleDateString('en-US', { weekday: 'short' }), 0);
    }
    for (const a of mine) {
      if (a.status === 'cancelled') continue;
      const key = new Date(a.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
      if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
    }
    return [...map.entries()].map(([day, count]) => ({ day, count }));
  })();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Clinical day</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">
            Hello, {currentDoctor?.name.split(' ').slice(-1)[0]}
          </h1>
          <p className="mt-2 text-[13px] text-text-muted">
            {currentDoctor?.title} · {todays.length} visit{todays.length === 1 ? '' : 's'} today
          </p>
        </div>
        <Link
          to="/doctor/appointments"
          className="btn-primary !rounded-full inline-flex items-center gap-2"
        >
          All appointments <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Today', value: String(todays.length), icon: CalendarDays, dark: true },
          { label: 'Upcoming', value: String(upcoming.length), icon: Clock3, dark: false },
          { label: 'Completed (7d)', value: String(completedWeek), icon: CheckCircle2, dark: false },
          { label: 'My patients', value: String(patients), icon: Users, dark: false },
        ].map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl p-5 shadow-sm ${
              c.dark ? 'bg-bg-charcoal text-white' : 'border border-bg-warm bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <p className={`kicker !text-[10px] ${c.dark ? '!text-accent-gold-light' : ''}`}>
                {c.label}
              </p>
              <c.icon className={`h-4 w-4 ${c.dark ? 'text-white/60' : 'text-text-muted'}`} />
            </div>
            <p className="mt-3 font-serif text-3xl">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="font-serif text-xl">Today&apos;s board</h2>
          <p className="text-[12px] text-text-muted">Tap a visit to open the chart / update status</p>
          <div className="mt-4 divide-y divide-bg-warm">
            {todays.length === 0 && (
              <p className="py-12 text-center text-[13px] text-text-muted">No patients on your list today</p>
            )}
            {todays.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <Link to={`/doctor/appointments/${a.id}`} className="min-w-0 flex-1 hover:text-accent-gold">
                  <p className="font-medium">{a.preferredTime} · {a.name}</p>
                  <p className="text-[12px] text-text-muted">{a.service}</p>
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] ${STATUS_META[a.status].className}`}>
                    {STATUS_META[a.status].label}
                  </span>
                  {a.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => updateAppointmentStatus(a.id, 'checked-in')}
                      className="rounded-full bg-bg-charcoal px-3 py-1.5 text-[11px] text-white"
                    >
                      Check in
                    </button>
                  )}
                  {(a.status === 'checked-in' || a.status === 'confirmed') && (
                    <button
                      type="button"
                      onClick={() => updateAppointmentStatus(a.id, 'completed')}
                      className="rounded-full border border-bg-warm px-3 py-1.5 text-[11px]"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl">My volume</h2>
          <p className="text-[12px] text-text-muted">Appointments · 7 days</p>
          <div className="mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={byDay}>
                <defs>
                  <linearGradient id="docFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis allowDecimals={false} width={24} tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8E2D8', fontSize: 12 }} />
                <Area type="monotone" dataKey="count" stroke="#C9A84C" strokeWidth={2.5} fill="url(#docFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 border-t border-bg-warm pt-4">
            <p className="mb-2 text-[11px] font-medium text-text-muted">Coming up</p>
            {upcoming.slice(0, 4).map((a) => (
              <Link
                key={a.id}
                to={`/doctor/appointments/${a.id}`}
                className="flex justify-between gap-2 py-2 text-[12px] hover:text-accent-gold"
              >
                <span className="truncate">
                  {a.preferredDate} · {a.name}
                </span>
                <span className="shrink-0 text-text-muted">{a.preferredTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
