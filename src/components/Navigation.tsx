import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X, CalendarDays } from 'lucide-react';

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
            className={`flex items-center gap-2.5 font-serif font-medium text-xl tracking-tight cursor-pointer transition-colors duration-500 ${
              isShrank ? 'text-text-primary' : 'text-white'
            }`}
          >
            <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-500 ${
              isShrank ? 'border-accent-gold/40' : 'border-white/40'
            }`}>
              <span className={`font-serif text-sm transition-colors duration-500 ${
                isShrank ? 'text-accent-gold' : 'text-accent-gold-light'
              }`}>A</span>
            </span>
            <span>AURA</span>
            <span className={`font-sans font-light text-sm tracking-widest hidden sm:inline transition-colors duration-500 ${
              isShrank ? 'text-text-muted' : 'text-white/60'
            }`}>
              DENTAL
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

          <div className="flex items-center gap-3">
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

          <div className="mt-12 pt-8 border-t border-accent-gold/15 text-sm text-text-muted">
            <p className="font-sans leading-relaxed">
              Mon — Fri: 8:00 AM — 6:00 PM<br />
              Saturday: 9:00 AM — 3:00 PM
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
