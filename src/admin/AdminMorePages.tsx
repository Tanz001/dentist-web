import { useState } from 'react';
import { formatMoney } from './admin-data';
import { useAdmin } from './admin-store';

export function AdminDoctors() {
  const { doctors, updateDoctor } = useAdmin();

  return (
    <div className="space-y-6">
      <div>
        <p className="kicker">Care team</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Doctors</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {doctors.map((d) => (
          <article
            key={d.id}
            className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm"
          >
            <img src={d.imageUrl} alt={d.name} className="aspect-[4/5] w-full object-cover" />
            <div className="space-y-3 p-5">
              <div>
                <h2 className="font-serif text-xl leading-tight">{d.name}</h2>
                <p className="mt-1 text-[12px] text-text-muted">{d.title}</p>
              </div>
              <p className="kicker !text-[10px]">{d.specialty}</p>
              <p className="text-[13px] leading-relaxed text-text-muted">{d.bio}</p>
              <div className="flex items-center justify-between border-t border-bg-warm pt-3 text-[12px]">
                <span>
                  {d.experienceYears} yrs · {d.patientsToday} today
                </span>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={d.active}
                    onChange={(e) => updateDoctor(d.id, { active: e.target.checked })}
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
          <article
            key={s.id}
            className="overflow-hidden rounded-2xl border border-bg-warm bg-white shadow-sm"
          >
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
      <div className="rounded-2xl border border-dashed border-bg-warm bg-bg-cream/40 p-5 text-[13px] text-text-muted">
        <p className="font-medium text-text-primary">Admin access</p>
        <p className="mt-2">
          Password: <code className="rounded bg-white px-1.5 py-0.5 text-text-primary">aura2026</code>
        </p>
      </div>
    </div>
  );
}
