import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { patientsFromAppointments } from './admin-data';
import { useAdmin } from './admin-store';

export function AdminPatients() {
  const { appointments } = useAdmin();
  const [q, setQ] = useState('');
  const patients = useMemo(() => {
    return patientsFromAppointments(appointments).filter((p) => {
      if (!q.trim()) return true;
      return `${p.name} ${p.email} ${p.phone}`.toLowerCase().includes(q.toLowerCase());
    });
  }, [appointments, q]);

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">CRM</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Patients</h1>
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="border-b border-bg-warm bg-bg-cream/50 text-[11px] uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">Patient</th>
                <th className="px-5 py-4 font-medium">Visits</th>
                <th className="px-5 py-4 font-medium">Preferred doctor</th>
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
                  <td className="px-5 py-4 font-medium">{p.visits}</td>
                  <td className="px-5 py-4 text-text-muted">{p.preferredDentist}</td>
                  <td className="px-5 py-4 text-text-muted">{p.lastVisit}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-16 text-center text-text-muted">
                    No patients yet.
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
