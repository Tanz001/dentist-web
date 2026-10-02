import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { BRAND } from '../brand';
import { useAdmin } from '../admin/admin-store';
import { todayISO } from '../admin/admin-data';

const NAV: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}[] = [
  { to: '/doctor', label: 'My day', icon: LayoutDashboard, end: true },
  { to: '/doctor/appointments', label: 'My appointments', icon: CalendarDays },
  { to: '/doctor/patients', label: 'My patients', icon: Users },
  { to: '/doctor/profile', label: 'Profile', icon: UserRound },
];

export function DoctorShell({ children }: { children?: ReactNode }) {
  const { doctorLogout, currentDoctor, appointments, settings } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const todayPending = appointments.filter(
    (a) =>
      a.dentistName === currentDoctor?.name &&
      a.preferredDate === todayISO() &&
      (a.status === 'pending' || a.status === 'confirmed' || a.status === 'checked-in'),
  ).length;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const NavLinks = ({ compact }: { compact?: boolean }) => (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setMobileOpen(false)}
          title={compact ? label : undefined}
          className={({ isActive }) =>
            [
              'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all',
              isActive
                ? 'bg-accent-gold/20 text-white'
                : 'text-white/65 hover:bg-white/5 hover:text-white',
              compact ? 'justify-center px-2' : '',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent-gold" />
              )}
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-accent-gold' : ''}`} />
              {!compact && <span>{label}</span>}
              {!compact && to === '/doctor/appointments' && todayPending > 0 && (
                <span className="ml-auto rounded-full bg-accent-gold px-1.5 py-0.5 text-[10px] font-semibold text-bg-charcoal">
                  {todayPending}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-bg-base text-text-primary">
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col bg-bg-charcoal text-white transition-[width] duration-300 ease-out lg:flex ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        <div
          className={`flex h-16 items-center border-b border-white/10 px-4 ${collapsed ? 'justify-center' : ''}`}
        >
          {!collapsed ? (
            <div className="min-w-0">
              <img
                src={BRAND.logoSrc}
                alt=""
                className="mb-0.5 h-8 w-auto max-w-[140px] rounded-md bg-white object-contain px-1.5 py-0.5"
              />
              <p className="mt-0.5 truncate text-[11px] text-accent-gold-light">
                {currentDoctor?.name ?? settings.clinicName}
              </p>
            </div>
          ) : (
            <img
              src={BRAND.logoSrc}
              alt=""
              className="h-8 w-8 rounded-md bg-white object-contain p-0.5"
            />
          )}
        </div>
        <NavLinks compact={collapsed} />
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={`mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-white/65 hover:bg-white/5 hover:text-white ${
              collapsed ? 'justify-center px-2' : ''
            }`}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <button
            type="button"
            onClick={() => {
              doctorLogout();
              navigate('/login');
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-white/65 hover:bg-rose-500/20 hover:text-rose-200 ${
              collapsed ? 'justify-center px-2' : ''
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg-charcoal/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-bg-charcoal text-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <div>
                <img
                  src={BRAND.logoSrc}
                  alt=""
                  className="h-8 w-auto max-w-[140px] rounded-md bg-white object-contain px-1.5 py-0.5"
                />
                <p className="mt-1 text-[11px] text-accent-gold-light">{currentDoctor?.name}</p>
              </div>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavLinks />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-bg-warm/80 bg-bg-base/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-xl border border-bg-warm bg-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3">
              {currentDoctor && (
                <img
                  src={currentDoctor.imageUrl}
                  alt=""
                  className="hidden h-9 w-9 rounded-full object-cover sm:block"
                />
              )}
              <div>
                <p className="text-[13px] font-medium">{currentDoctor?.name ?? 'Doctor'}</p>
                <p className="text-[11px] text-text-muted">{currentDoctor?.specialty}</p>
              </div>
            </div>
          </div>
          <a
            href="/"
            className="kicker hidden rounded-full border border-bg-warm bg-white px-3 py-2 !text-[10px] !text-text-primary sm:inline-flex"
          >
            View website
          </a>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
