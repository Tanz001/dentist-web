import { useState } from 'react';
import { MoreHorizontal, Pencil, Plus, Trash2, UserCheck, UserX, X } from 'lucide-react';
import { formatMoney, type AdminDoctor } from './admin-data';
import { useAdmin } from './admin-store';

const emptyDoctor = (): Omit<AdminDoctor, 'id'> => ({
  name: '',
  title: 'DDS',
  specialty: 'General Dentistry',
  bio: '',
  imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
  experienceYears: 5,
  active: true,
  patientsToday: 0,
});

export function AdminDoctors() {
  const { doctors, updateDoctor, addDoctor, deleteDoctor } = useAdmin();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyDoctor());

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyDoctor());
    setModal('add');
  };

  const openEdit = (d: AdminDoctor) => {
    setEditingId(d.id);
    setForm({
      name: d.name,
      title: d.title,
      specialty: d.specialty,
      bio: d.bio,
      imageUrl: d.imageUrl,
      experienceYears: d.experienceYears,
      active: d.active,
      patientsToday: d.patientsToday,
    });
    setModal('edit');
    setOpenMenu(null);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (modal === 'edit' && editingId) updateDoctor(editingId, form);
    else addDoctor(form);
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Care team</p>
          <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Doctors</h1>
          <p className="mt-2 text-[13px] text-text-muted">{doctors.length} clinicians on roster</p>
        </div>
        <button type="button" onClick={openAdd} className="btn-primary !rounded-full inline-flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add doctor
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="border-b border-bg-warm bg-bg-cream/50 text-[11px] uppercase tracking-wider text-text-muted">
              <tr>
                <th className="px-5 py-4 font-medium">Doctor</th>
                <th className="px-5 py-4 font-medium">Specialty</th>
                <th className="px-5 py-4 font-medium">Experience</th>
                <th className="px-5 py-4 font-medium">Today</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium text-right"> </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-warm">
              {doctors.map((d) => (
                <tr key={d.id} className="hover:bg-bg-cream/40">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={d.imageUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{d.name}</p>
                        <p className="text-[11px] text-text-muted">{d.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-text-muted">{d.specialty}</td>
                  <td className="px-5 py-4">{d.experienceYears} years</td>
                  <td className="px-5 py-4">{d.patientsToday} patients</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] ${
                        d.active ? 'bg-emerald-500/15 text-emerald-800' : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {d.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="relative px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label="Actions"
                      onClick={() => setOpenMenu(openMenu === d.id ? null : d.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-bg-warm hover:bg-bg-cream"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {openMenu === d.id && (
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
                            onClick={() => openEdit(d)}
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] hover:bg-bg-cream"
                            onClick={() => {
                              updateDoctor(d.id, { active: !d.active });
                              setOpenMenu(null);
                            }}
                          >
                            {d.active ? (
                              <>
                                <UserX className="h-4 w-4" /> Set inactive
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-4 w-4" /> Set active
                              </>
                            )}
                          </button>
                          <div className="my-1 border-t border-bg-warm" />
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] text-rose-600 hover:bg-rose-50"
                            onClick={() => {
                              if (confirm(`Remove ${d.name}?`)) deleteDoctor(d.id);
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
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <button type="button" className="absolute inset-0 bg-bg-charcoal/45 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="kicker">{modal === 'add' ? 'New' : 'Edit'}</p>
                <h2 className="font-serif text-2xl">{modal === 'add' ? 'Add doctor' : 'Edit doctor'}</h2>
              </div>
              <button type="button" onClick={() => setModal(null)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-3">
              {(
                [
                  ['name', 'Full name'],
                  ['title', 'Title'],
                  ['specialty', 'Specialty'],
                  ['imageUrl', 'Photo URL'],
                  ['bio', 'Bio'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="block">
                  <span className="kicker mb-1.5 block !text-[10px]">{label}</span>
                  {key === 'bio' ? (
                    <textarea
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      rows={3}
                      className="w-full rounded-xl border border-bg-warm px-3 py-2.5 text-[13px] outline-none focus:border-accent-gold"
                    />
                  ) : (
                    <input
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full rounded-xl border border-bg-warm px-3 py-2.5 text-[13px] outline-none focus:border-accent-gold"
                    />
                  )}
                </label>
              ))}
              <label className="block">
                <span className="kicker mb-1.5 block !text-[10px]">Years of experience</span>
                <input
                  type="number"
                  min={0}
                  value={form.experienceYears}
                  onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                  className="w-full rounded-xl border border-bg-warm px-3 py-2.5 text-[13px] outline-none focus:border-accent-gold"
                />
              </label>
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />
                Active on roster
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setModal(null)} className="rounded-xl border border-bg-warm px-4 py-2.5 text-[12px]">
                Cancel
              </button>
              <button type="button" onClick={save} className="btn-primary !rounded-xl">
                {modal === 'add' ? 'Create doctor' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminServices() {
  const { services, updateService } = useAdmin();

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Catalog</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Services</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s) => (
          <article key={s.id} className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm">
            <img src={s.imageUrl} alt={s.title} className="aspect-[16/10] w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-serif text-xl">{s.title}</h2>
                <span className="rounded-full bg-bg-cream px-2 py-0.5 text-[10px] capitalize text-text-muted">
                  {s.category}
                </span>
              </div>
              <p className="text-[13px] text-text-muted">{s.description}</p>
              <div className="flex items-center justify-between border-t border-bg-warm pt-3 text-[13px]">
                <span>
                  From {formatMoney(s.priceFrom)} · {s.treatmentTime}
                </span>
                <label className="flex items-center gap-2 text-[12px]">
                  <input
                    type="checkbox"
                    checked={s.active}
                    onChange={(e) => updateService(s.id, { active: e.target.checked })}
                  />
                  Active
                </label>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  const { settings, updateSettings, resetDemoData, syncWebsiteBookings } = useAdmin();
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="kicker">Clinic</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Settings</h1>
      </div>
      <div className="space-y-4 rounded-2xl border border-bg-warm bg-white p-6 shadow-sm">
        {(
          [
            ['clinicName', 'Clinic name'],
            ['phone', 'Phone'],
            ['email', 'Email'],
            ['address', 'Address'],
            ['hours', 'Hours'],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="block">
            <span className="kicker mb-1.5 block !text-[10px]">{label}</span>
            <input
              value={settings[key]}
              onChange={(e) => updateSettings({ [key]: e.target.value })}
              className="w-full rounded-xl border border-bg-warm px-3 py-2.5 text-[13px] outline-none focus:border-accent-gold"
            />
          </label>
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setSaved(true);
              window.setTimeout(() => setSaved(false), 1600);
            }}
            className="btn-primary !rounded-xl"
          >
            {saved ? 'Saved' : 'Save settings'}
          </button>
          <button
            type="button"
            onClick={syncWebsiteBookings}
            className="rounded-xl border border-bg-warm px-5 py-2.5 text-[12px] font-medium"
          >
            Sync website bookings
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all admin demo data?')) resetDemoData();
            }}
            className="rounded-xl border border-bg-warm px-5 py-2.5 text-[12px] font-medium text-rose-700"
          >
            Reset demo data
          </button>
        </div>
      </div>
    </div>
  );
}
