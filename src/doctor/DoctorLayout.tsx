import { Navigate, Outlet } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../admin/admin-store';
import { DoctorShell } from './DoctorShell';

export function DoctorLayout() {
  return (
    <AdminProvider>
      <DoctorGate />
    </AdminProvider>
  );
}

function DoctorGate() {
  const { ready, doctorId, currentDoctor } = useAdmin();

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg-charcoal text-white">
        <p className="kicker !text-accent-gold">Loading doctor portal…</p>
      </div>
    );
  }

  if (!doctorId || !currentDoctor) return <Navigate to="/login" replace />;

  return (
    <DoctorShell>
      <Outlet />
    </DoctorShell>
  );
}
