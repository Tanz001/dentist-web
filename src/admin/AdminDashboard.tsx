import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { STATUS_META, formatMoney, todayISO } from './admin-data';
import { useAdmin } from './admin-store';

export function AdminDashboard() {
  const { stats, appointments, syncWebsiteBookings } = useAdmin();
  const today = todayISO();
  const todays = appointments
    .filter((a) => a.preferredDate === today && a.status !== 'cancelled')
    .sort((a, b) => a.preferredTime.localeCompare(b.preferredTime))
    .slice(0, 6);
  const recent = [...appointments]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5);
  const maxDay = Math.max(...stats.byDay.map((d) => d.count), 1);

  const cards = [
    {
      label: "Today's visits",
      value: String(stats.todayCount),
      hint: `${stats.pendingCount} need attention`,
      icon: CalendarDays,
      dark: true,
    },
    {
      label: 'Patients',
      value: String(stats.patientsCount),
      hint: 'Unique records',
      icon: Users,
      dark: false,
    },
    {
      label: 'Completed (7d)',
      value: String(stats.completedWeek),
      hint: 'This week',
      icon: TrendingUp,
      dark: false,
    },
    {
      label: 'Care value',
      value: formatMoney(stats.revenueProxy),
      hint: 'Completed & checked-in',
      icon: Stethoscope,
      dark: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Overview</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={syncWebsiteBookings}
            className="rounded-full border border-bg-warm bg-white px-4 py-2.5 text-[12px] font-medium hover:border-accent-gold"
          >
            Sync website bookings
          </button>
          <Link
            to="/admin/appointments"
            className="btn-primary !rounded-full !px-4 !py-2.5 inline-flex items-center gap-2"
          >
            Appointments <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl p-5 shadow-sm ${
              c.dark
                ? 'bg-bg-charcoal text-white'
                : 'border border-bg-warm bg-white text-text-primary'
            }`}
          >
            <div className="flex items-start justify-between">
              <p className={`kicker !text-[10px] ${c.dark ? '!text-accent-gold-light' : ''}`}>
                {c.label}
              </p>
              <c.icon className={`h-4 w-4 ${c.dark ? 'text-white/60' : 'text-text-muted'}`} />
            </div>
            <p className="mt-3 font-serif text-3xl tracking-tight">{c.value}</p>
            <p className={`mt-2 text-[12px] ${c.dark ? 'text-white/55' : 'text-text-muted'}`}>
              {c.hint}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="font-serif text-xl">Booking activity</h2>
          <p className="text-[12px] text-text-muted">Appointments created · last 7 days</p>
          <div className="mt-6 flex h-44 items-end gap-3">
            {stats.byDay.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-36 w-full items-end rounded-t-lg bg-bg-cream/60 px-1">
                  <div
                    className="w-full rounded-t-md bg-accent-gold transition-all"
                    style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: d.count ? 8 : 0 }}
                  />
                </div>
                <span className="text-[11px] text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl">Status mix</h2>
          <ul className="mt-4 space-y-2.5">
            {stats.byStatus.map((s) => (
              <li key={s.status} className="flex items-center justify-between text-[13px]">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] ${STATUS_META[s.status].className}`}>
                  {STATUS_META[s.status].label}
                </span>
                <span className="font-medium">{s.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl">Today&apos;s schedule</h2>
            <Link to="/admin/appointments" className="kicker !text-[10px]">
              View all
            </Link>
          </div>
          <div className="divide-y divide-bg-warm">
            {todays.length === 0 && (
              <p className="py-10 text-center text-[13px] text-text-muted">No visits scheduled today</p>
            )}
            {todays.map((a) => (
              <Link
                key={a.id}
                to={`/admin/appointments/${a.id}`}
                className="flex items-center justify-between gap-3 py-3 hover:bg-bg-cream/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{a.name}</p>
                  <p className="truncate text-[11px] text-text-muted">
                    {a.preferredTime} · {a.service}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${STATUS_META[a.status].className}`}>
                  {STATUS_META[a.status].label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl">Top services</h2>
          <ul className="mt-4 space-y-3">
            {stats.byService.map((s, i) => (
              <li key={s.name}>
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="font-medium">
                    {i + 1}. {s.name}
                  </span>
                  <span className="text-text-muted">{s.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-bg-cream">
                  <div
                    className="h-full rounded-full bg-bg-charcoal"
                    style={{
                      width: `${(s.count / (stats.byService[0]?.count || 1)) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 divide-y divide-bg-warm border-t border-bg-warm pt-4">
            <p className="pb-2 text-[11px] font-medium text-text-muted">Recent requests</p>
            {recent.map((a) => (
              <Link
                key={a.id}
                to={`/admin/appointments/${a.id}`}
                className="flex justify-between gap-2 py-2.5 text-[12px] hover:text-accent-gold"
              >
                <span className="truncate">{a.name}</span>
                <span className="shrink-0 text-text-muted">{a.service}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
