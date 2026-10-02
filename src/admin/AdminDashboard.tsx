import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { STATUS_META, formatMoney, todayISO } from './admin-data';
import { useAdmin } from './admin-store';

const PIE_COLORS = ['#C9A84C', '#0B1F3A', '#E0C878', '#E6E0D6', '#A68732', '#f43f5e'];

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

  const statusChart = stats.byStatus
    .filter((s) => s.count > 0)
    .map((s) => ({ name: STATUS_META[s.status].label, value: s.count, status: s.status }));

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
              c.dark ? 'bg-bg-charcoal text-white' : 'border border-bg-warm bg-white text-text-primary'
            }`}
          >
            <div className="flex items-start justify-between">
              <p className={`kicker !text-[10px] ${c.dark ? '!text-accent-gold-light' : ''}`}>{c.label}</p>
              <c.icon className={`h-4 w-4 ${c.dark ? 'text-white/60' : 'text-text-muted'}`} />
            </div>
            <p className="mt-3 font-serif text-3xl tracking-tight">{c.value}</p>
            <p className={`mt-2 text-[12px] ${c.dark ? 'text-white/55' : 'text-text-muted'}`}>{c.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="font-serif text-xl">Booking activity</h2>
          <p className="text-[12px] text-text-muted">Appointments created · last 7 days</p>
          <div className="mt-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.byDay}>
                <defs>
                  <linearGradient id="auraFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7280' }} width={28} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E8E2D8', fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Bookings"
                  stroke="#C9A84C"
                  strokeWidth={2.5}
                  fill="url(#auraFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-bg-warm bg-white p-5 shadow-sm">
          <h2 className="font-serif text-xl">Status mix</h2>
          <p className="text-[12px] text-text-muted">Pipeline distribution</p>
          <div className="mt-1 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChart} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={3}>
                  {statusChart.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8E2D8', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-1 space-y-1.5">
            {stats.byStatus.map((s) => (
              <li key={s.status} className="flex items-center justify-between text-[12px]">
                <span className={`rounded-full px-2 py-0.5 ${STATUS_META[s.status].className}`}>
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
          <h2 className="font-serif text-xl">Top services</h2>
          <p className="text-[12px] text-text-muted">Most requested treatments</p>
          <div className="mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byService} layout="vertical" margin={{ left: 8, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E2D8" horizontal={false} />
                <XAxis type="number" allowDecimals={false} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 10, fill: '#6B7280' }}
                  tickFormatter={(v: string) => (v.length > 16 ? `${v.slice(0, 16)}…` : v)}
                />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8E2D8', fontSize: 12 }} />
                <Bar dataKey="count" name="Bookings" fill="#1A1F24" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
          <div className="mt-4 divide-y divide-bg-warm border-t border-bg-warm pt-3">
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
