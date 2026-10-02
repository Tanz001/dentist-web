import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from './admin-store';

export function AdminLogin() {
  const { login, authenticated, ready } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (ready && authenticated) navigate('/admin', { replace: true });
  }, [ready, authenticated, navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-charcoal px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #2A9D8F 0.7px, transparent 0.8px), radial-gradient(circle at 80% 70%, #fff 0.5px, transparent 0.6px)',
          backgroundSize: '32px 32px, 42px 42px',
        }}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-bg-base p-8 shadow-2xl">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-accent-gold/40">
          <span className="font-serif text-xl text-accent-gold">A</span>
        </div>
        <p className="kicker mt-4">Aura Dental</p>
        <h1 className="mt-2 font-serif text-3xl text-text-primary">Staff login</h1>
        <p className="mt-2 text-[14px] text-text-muted">
          Sign in to manage appointments, patients, doctors and clinic services.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!login(password)) {
              setError('Incorrect password. Try again.');
              return;
            }
            setError('');
            navigate('/admin');
          }}
        >
          <label className="block">
            <span className="kicker mb-1.5 block !text-[10px]">Email</span>
            <input
              type="email"
              defaultValue="admin@aura.dental"
              readOnly
              className="w-full rounded-xl border border-bg-warm bg-white/70 px-3 py-3 text-[14px] text-text-muted outline-none"
            />
          </label>
          <label className="block">
            <span className="kicker mb-1.5 block !text-[10px]">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full rounded-xl border border-bg-warm bg-white px-3 py-3 text-[14px] outline-none focus:border-accent-gold"
              placeholder="Enter admin password"
            />
          </label>
          {error && (
            <p role="alert" className="text-[13px] text-rose-600">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary w-full !rounded-xl py-3.5">
            Sign in → Dashboard
          </button>
        </form>
        <p className="mt-6 text-center text-[12px] text-text-muted">
          Demo password:{' '}
          <code className="rounded bg-white px-1.5 py-0.5 text-text-primary">aura2026</code>
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
