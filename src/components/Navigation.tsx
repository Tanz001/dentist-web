import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X, CalendarDays } from 'lucide-react';
import { BRAND } from '../brand';

interface NavigationProps {
  onBookClick: () => void;
  isShrank?: boolean;
}

export default function Navigation({ onBookClick, isShrank = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 300) {
        setActiveSection('home');
      } else if (scrollY < 1200) {
        setActiveSection('philosophy');
      } else if (scrollY < 2400) {
        setActiveSection('services');
      } else if (scrollY < 3600) {
        setActiveSection('team');
      } else if (scrollY < 4800) {
        setActiveSection('process');
      } else {
        setActiveSection('booking');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Services', id: 'services' },
    { label: 'Meet the Team', id: 'team' },
    { label: 'Technology', id: 'tech-tour' },
    { label: 'How it Works', id: 'process' },
  ];

  return (
    <header
      id="main-nav-header"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out py-5 md:py-6"
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav
          className={`flex items-center justify-between mx-auto px-6 py-3.5 rounded-full border transition-all duration-500 ${
            isShrank
              ? 'bg-bg-ivory/90 backdrop-blur-md border-accent-gold/15 shadow-md max-w-6xl'
              : 'bg-transparent border-transparent max-w-7xl'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <span
              className={`rounded-full bg-white/95 px-2.5 py-1.5 shadow-sm border transition-all duration-500 ${
                isShrank ? 'border-accent-gold/20' : 'border-white/30'
              }`}
            >
              <img
                src={BRAND.logoSrc}
                alt={BRAND.fullName}
                className="h-8 w-auto max-w-[180px] object-contain sm:h-9 sm:max-w-[220px]"
              />
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-xs font-medium tracking-wide transition-all duration-300 relative py-1 ${
                  isShrank
                    ? activeSection === link.id
                      ? 'text-accent-sage-deep'
                      : 'text-text-muted hover:text-text-primary'
                    : activeSection === link.id
                      ? 'text-accent-gold-light'
                      : 'text-white/65 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-accent-gold" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/login?role=doctor"
              className={`hidden md:inline-flex items-center rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-300 ${
                isShrank
                  ? 'border-bg-charcoal/15 text-text-primary hover:border-accent-gold hover:text-accent-gold'
                  : 'border-white/35 text-white hover:border-accent-gold-light hover:text-accent-gold-light'
              }`}
            >
              Doctor
            </a>
            <a
              href="/login?role=admin"
              className={`hidden sm:inline-flex items-center rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide transition-all duration-300 ${
                isShrank
                  ? 'border-bg-charcoal/15 text-text-primary hover:border-accent-gold hover:text-accent-gold'
                  : 'border-white/35 text-white hover:border-accent-gold-light hover:text-accent-gold-light'
              }`}
            >
              Admin
            </a>
            <button
              onClick={onBookClick}
              className="btn-primary !px-5 !py-2.5 text-[11px]"
            >
              <CalendarDays size={14} />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
                isShrank
                  ? 'hover:bg-bg-warm text-text-primary'
                  : 'hover:bg-white/10 text-white'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-bg-ivory/98 backdrop-blur-lg z-40 flex flex-col md:hidden px-8 py-12 border-t border-accent-gold/10">
          <div className="flex flex-col gap-6 text-2xl font-serif">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-accent-sage-deep italic'
                    : 'text-text-primary/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-accent-gold/15 space-y-4">
            <p className="text-sm text-text-muted font-sans leading-relaxed">
              {BRAND.hours}
              <br />
              <a href={`tel:${BRAND.phoneTel}`} className="text-text-primary font-medium">
                {BRAND.phoneDisplay}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/login?role=doctor"
                className="inline-flex items-center justify-center rounded-full border border-bg-charcoal/20 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Doctor login
              </a>
              <a
                href="/login?role=admin"
                className="inline-flex items-center justify-center rounded-full bg-bg-charcoal px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin login
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
