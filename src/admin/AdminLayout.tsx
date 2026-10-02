import { Navigate, Outlet } from 'react-router-dom';
import { AdminProvider, useAdmin } from './admin-store';
import { AdminShell } from './AdminShell';
import { AdminLogin } from './AdminLogin';

export function AdminLayout() {
  return (
    <AdminProvider>
      <AdminGate />
    </AdminProvider>
  );
}

function AdminGate() {
  const { ready, authenticated } = useAdmin();

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg-charcoal text-white">
        <p className="kicker !text-accent-gold">Loading admin…</p>
      </div>
    );
  }

  if (!authenticated) return <Navigate to="/login" replace />;

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}

export function LoginPage() {
  return (
    <AdminProvider>
      <AdminLogin />
    </AdminProvider>
  );
}
