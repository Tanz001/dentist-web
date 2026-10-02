import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin } from 'lucide-react';
import { BRAND } from '../brand';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const cols = footerRef.current.querySelectorAll('.footer-col');

    const trigger = gsap.fromTo(
      cols,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-bg-charcoal text-white pt-24 pb-12 relative overflow-hidden select-none border-t border-accent-gold/10"
    >
      <div className="absolute bottom-[-100px] left-[50%] -translate-x-[50%] w-[450px] h-[450px] bg-accent-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/5">
          <div className="lg:col-span-4 space-y-6 footer-col">
            <div className="inline-flex rounded-2xl bg-white px-3 py-2">
              <img
                src={BRAND.logoSrc}
                alt={BRAND.fullName}
                className="h-12 w-auto max-w-[260px] object-contain"
              />
            </div>

            <p className="text-sm text-white/50 leading-relaxed">
              Private dental and aesthetic care in Johar Town — calm suites, honest plans, and specialists who put your comfort first.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#insta"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-gold hover:text-bg-charcoal border border-white/10 flex items-center justify-center transition-colors text-white/60"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#linkedin"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-gold hover:text-bg-charcoal border border-white/10 flex items-center justify-center transition-colors text-white/60"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 footer-col">
            <h4 className="text-xs tracking-widest text-accent-gold uppercase">
              Concierge Inquiries
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-accent-gold-light transition-colors max-w-max"
                >
                  <Mail size={15} className="text-accent-gold shrink-0" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-accent-gold-light transition-colors max-w-max"
                >
                  <Phone size={15} className="text-accent-gold shrink-0" />
                  <span>{BRAND.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                <MapPin size={15} className="text-accent-gold shrink-0 mt-0.5" />
                <span>
                  {BRAND.addressLine1}
                  <br />
                  {BRAND.addressLine2}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6 footer-col">
            <h4 className="text-xs tracking-widest text-accent-gold uppercase">
              Suite Hours
            </h4>
            <ul className="space-y-3.5 text-sm text-white/50 leading-relaxed">
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-accent-gold shrink-0" />
                <span>Monday — Friday</span>
              </li>
              <li className="pl-6 font-mono text-white/80 text-xs">9:00 AM — 6:00 PM</li>

              <li className="flex items-center gap-2">
                <Clock size={14} className="text-accent-gold shrink-0" />
                <span>Saturday</span>
              </li>
              <li className="pl-6 font-mono text-white/80 text-xs">9:00 AM — 3:00 PM</li>

              <li className="text-accent-gold pl-6 italic text-xs">Sunday: Closed</li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6 footer-col">
            <h4 className="text-xs tracking-widest text-accent-gold uppercase">
              Our Location
            </h4>

            <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative p-4 flex flex-col justify-between">
              <span className="text-[9px] tracking-wider text-white/30 uppercase">Johar Town</span>

              <div className="absolute inset-0 p-6 flex items-center justify-center opacity-30 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-accent-gold/30 fill-none">
                  <path d="M 0,10 L 100,10" />
                  <path d="M 0,40 L 100,40" />
                  <path d="M 10,0 L 10,100" />
                  <path d="M 70,0 L 70,100" />
                  <circle cx="70" cy="40" r="3" fill="#C9A84C" />
                </svg>
              </div>

              <div className="z-10 bg-bg-charcoal/80 backdrop-blur-md p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-medium text-accent-gold-light block leading-none">
                  Opposite G1 Market
                </span>
                <span className="text-[9px] text-white/40 block mt-1 leading-none">
                  Johar Town, Lahore 54000
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
            </span>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy & HIPAA Disclosure
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/login" className="hover:text-accent-gold transition-colors">
              Staff login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
