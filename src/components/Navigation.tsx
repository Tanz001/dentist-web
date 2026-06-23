import React, { useEffect, useState } from 'react';
import { Menu, X, Shield, CalendarDays } from 'lucide-react';

interface NavigationProps {
  onBookClick: () => void;
  isShrank?: boolean; // Controlled state from scroll position
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
        setActiveSection('timeline');
      } else {
        setActiveSection('booking');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Smoothly scroll using standard browser API / Lenis handled ticker
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${
        isShrank
          ? 'py-4 translate-y-0 opacity-100'
          : 'py-8 md:py-10 translate-y-0 md:opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav
          className={`flex items-center justify-between mx-auto px-6 py-3.5 rounded-full border border-primary-teal/10 shadow-sm backdrop-blur-md transition-all duration-500 ${
            isShrank
              ? 'bg-bg-base/80 pointer-events-auto shadow-md max-w-6xl'
              : 'bg-transparent pointer-events-none max-w-7xl'
          }`}
        >
          {/* Logo / Brandmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2 text-primary-teal font-serif font-semibold text-xl tracking-tight cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-primary-teal/10 flex items-center justify-center">
              <span className="w-3.5 h-3.5 rounded-full bg-primary-teal animate-pulse" />
            </span>
            <span>AURA</span>
            <span className="text-text-muted font-sans font-light text-sm tracking-widest hidden sm:inline ml-1">
              DENTAL
            </span>
          </a>

          {/* Desktop Navigation Link Cluster */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 relative py-1 hover:text-primary-teal ${
                  activeSection === link.id ? 'text-primary-teal' : 'text-text-muted'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-teal rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBookClick}
              className="bg-cta-coral text-white hover:bg-cta-coral/95 text-xs md:text-sm font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] flex items-center gap-2 shadow-md cursor-pointer"
            >
              <CalendarDays size={15} />
              <span>Book Appointment</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 text-text-primary transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-bg-base/95 backdrop-blur-lg z-40 flex flex-col md:hidden px-8 py-12 transition-all duration-300 border-t border-primary-teal/10">
          <div className="flex flex-col gap-6 text-2xl font-serif">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`transition-colors duration-300 ${
                  activeSection === link.id ? 'text-primary-teal italic font-semibold' : 'text-text-primary/70'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-primary-teal/10 flex flex-col gap-4 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-primary-teal" />
              <span>Accredited Medical Wellness Center</span>
            </div>
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
