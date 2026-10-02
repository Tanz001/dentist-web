import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, MoreHorizontal, Search, Trash2 } from 'lucide-react';
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

export function AdminAppointments() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAdmin();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | AppointmentStatus>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return [...appointments]
      .sort((a, b) => b.preferredDate.localeCompare(a.preferredDate) || a.preferredTime.localeCompare(b.preferredTime))
      .filter((a) => {
        if (status !== 'all' && a.status !== status) return false;
        if (!q.trim()) return true;
        const hay = `${a.name} ${a.email} ${a.phone} ${a.service} ${a.dentistName}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      });
  }, [appointments, q, status]);

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Schedule</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Appointments</h1>
        <p className="mt-2 text-[13px] text-text-muted">
          {filtered.length} shown · use ⋯ for actions or open full detail
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStatus('all')}
          className={`rounded-full px-3 py-1.5 text-[12px] ${
            status === 'all' ? 'bg-bg-charcoal text-white' : 'border border-bg-warm bg-white'
          }`}
        >
          All ({appointments.length})
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
            {STATUS_META[s].label} ({appointments.filter((a) => a.status === s).length})
          </button>
        ))}
      </div>

      <div className="relative max-w-lg">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search patient, service, doctor…"
          className="w-full rounded-xl border border-bg-warm bg-white py-2.5 pl-10 pr-3 text-[13px] outline-none focus:border-accent-gold"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-[13px]">
            <thead className="border-b border-bg-warm bg-bg-cream/50 text-[11px] uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">Date / Time</th>
                <th className="px-5 py-4 font-medium">Patient</th>
                <th className="px-5 py-4 font-medium">Service</th>
                <th className="px-5 py-4 font-medium">Doctor</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium text-right"> </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-warm">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-bg-cream/40">
                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/appointments/${a.id}`}
                      className="font-medium underline-offset-2 hover:underline"
                    >
                      {a.preferredDate}
                    </Link>
                    <p className="text-[11px] text-text-muted">{a.preferredTime}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{a.name}</p>
                    <p className="text-[11px] text-text-muted">{a.phone}</p>
                  </td>
                  <td className="max-w-[220px] truncate px-5 py-4">{a.service}</td>
                  <td className="px-5 py-4 text-text-muted">{a.dentistName}</td>
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
                          className="fixed inset-0 z-10 cursor-default"
                          aria-label="Close menu"
                          onClick={() => setOpenMenu(null)}
                        />
                        <div className="absolute right-5 top-12 z-20 w-48 overflow-hidden rounded-xl border border-bg-warm bg-white py-1 shadow-xl">
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] hover:bg-bg-cream"
                            onClick={() => {
                              setOpenMenu(null);
                              navigate(`/admin/appointments/${a.id}`);
                            }}
                          >
                            <Eye className="h-4 w-4" /> View details
                          </button>
                          <div className="my-1 border-t border-bg-warm" />
                          {STATUSES.filter((s) => s !== a.status)
                            .slice(0, 4)
                            .map((s) => (
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
                          <div className="my-1 border-t border-bg-warm" />
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-rose-600 hover:bg-rose-50"
                            onClick={() => {
                              if (confirm('Delete this appointment?')) deleteAppointment(a.id);
                              setOpenMenu(null);
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center text-text-muted">
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
