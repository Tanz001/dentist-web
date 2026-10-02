import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BRAND } from '../brand';
import { DOCTOR_PASSWORD } from './admin-data';
import { useAdmin } from './admin-store';

export function AdminLogin() {
  const { login, authenticated, ready, doctors, doctorLogin, doctorId, currentDoctor } = useAdmin();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRole = params.get('role') === 'doctor' ? 'doctor' : 'admin';
  const [role, setRole] = useState<'admin' | 'doctor'>(initialRole);
  const [password, setPassword] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [error, setError] = useState('');

  const activeDoctors = doctors.filter((d) => d.active);

  useEffect(() => {
    if (!ready) return;
    if (authenticated) navigate('/admin', { replace: true });
    else if (doctorId && currentDoctor) navigate('/doctor', { replace: true });
  }, [ready, authenticated, doctorId, currentDoctor, navigate]);

  useEffect(() => {
    if (!selectedDoctor && activeDoctors[0]) setSelectedDoctor(activeDoctors[0].id);
  }, [activeDoctors, selectedDoctor]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-charcoal px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #C9A84C 0.7px, transparent 0.8px), radial-gradient(circle at 80% 70%, #fff 0.5px, transparent 0.6px)',
          backgroundSize: '32px 32px, 42px 42px',
        }}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-bg-base p-8 shadow-2xl">
        <div className="mb-2 inline-flex rounded-2xl border border-accent-gold/25 bg-white px-3 py-2">
          <img src={BRAND.logoSrc} alt={BRAND.fullName} className="h-12 w-auto max-w-[240px] object-contain" />
        </div>
        <p className="kicker mt-4">{BRAND.name}</p>
        <h1 className="mt-2 font-serif text-3xl text-text-primary">Portal login</h1>
        <p className="mt-2 text-[14px] text-text-muted">
          Choose Admin or Doctor to open the right dashboard.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-bg-cream p-1">
          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setError('');
              setPassword('');
            }}
            className={`rounded-xl py-2.5 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
              role === 'admin' ? 'bg-bg-charcoal text-white' : 'text-text-muted'
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('doctor');
              setError('');
              setPassword('');
            }}
            className={`rounded-xl py-2.5 text-[12px] font-semibold uppercase tracking-wide transition-colors ${
              role === 'doctor' ? 'bg-bg-charcoal text-white' : 'text-text-muted'
            }`}
          >
            Doctor
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (role === 'admin') {
              if (!login(password)) {
                setError('Incorrect admin password.');
                return;
              }
              setError('');
              navigate('/admin');
              return;
            }
            if (!selectedDoctor) {
              setError('Select your doctor profile.');
              return;
            }
            if (!doctorLogin(selectedDoctor, password)) {
              setError('Incorrect doctor password or inactive profile.');
              return;
            }
            setError('');
            navigate('/doctor');
          }}
        >
          {role === 'doctor' && (
            <label className="block">
              <span className="kicker mb-1.5 block !text-[10px]">Doctor profile</span>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full rounded-xl border border-bg-warm bg-white px-3 py-3 text-[14px] outline-none focus:border-accent-gold"
              >
                {activeDoctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} · {d.specialty}
                  </option>
                ))}
              </select>
            </label>
          )}

          {role === 'admin' && (
            <label className="block">
              <span className="kicker mb-1.5 block !text-[10px]">Email</span>
              <input
                type="email"
                defaultValue={BRAND.email}
                readOnly
                className="w-full rounded-xl border border-bg-warm bg-white/70 px-3 py-3 text-[14px] text-text-muted outline-none"
              />
            </label>
          )}

          <label className="block">
            <span className="kicker mb-1.5 block !text-[10px]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-bg-warm bg-white px-3 py-3 text-[14px] outline-none focus:border-accent-gold"
              placeholder={role === 'admin' ? 'Admin password' : 'Doctor password'}
            />
          </label>

          {error && (
            <p role="alert" className="text-[13px] text-rose-600">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full !rounded-xl py-3.5">
            {role === 'admin' ? 'Sign in → Admin' : 'Sign in → Doctor portal'}
          </button>
        </form>

        <p className="mt-6 text-center text-[12px] text-text-muted">
          {role === 'admin' ? (
            <>
              Admin password:{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-text-primary">lounge2026</code>
            </>
          ) : (
            <>
              Doctor password:{' '}
              <code className="rounded bg-white px-1.5 py-0.5 text-text-primary">{DOCTOR_PASSWORD}</code>
            </>
          )}
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="kicker !text-[10px] underline underline-offset-4">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
