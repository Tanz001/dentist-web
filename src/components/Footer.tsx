import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Rss } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const logoEmblemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Stagger transition for footer elements as they scroll into viewport
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

    // Continuous breath pulse timeline for the vector logo emblem
    if (logoEmblemRef.current) {
      gsap.fromTo(
        logoEmblemRef.current,
        { scale: 0.98, opacity: 0.8 },
        {
          scale: 1.02,
          opacity: 1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      );
    }

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-deep-navy text-white pt-24 pb-12 relative overflow-hidden select-none border-t border-primary-teal/10"
    >
      {/* Soft background glow from logo emblem */}
      <div className="absolute bottom-[-100px] left-[50%] -translate-x-[50%] w-[450px] h-[450px] bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer layout rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20 border-b border-white/5">
          
          {/* COLUMN 1: Logo & Mission Statement (col-span-4) */}
          <div className="lg:col-span-4 space-y-6 footer-col">
            <div className="flex items-center gap-3">
              {/* Pulsing breathing vector emblem design */}
              <div
                ref={logoEmblemRef}
                className="w-12 h-12 rounded-full bg-primary-teal/10 border border-primary-teal/30 flex items-center justify-center text-primary-teal relative"
              >
                <div className="absolute inset-0 bg-primary-teal/10 rounded-full blur-xs" />
                <span className="relative font-bold text-lg select-none font-serif tracking-widest text-highlight-glow font-mono">A</span>
              </div>
              <div>
                <span className="font-serif text-xl tracking-tight leading-none block">AURA DENTAL</span>
                <span className="font-mono text-[9px] tracking-widest text-text-muted uppercase">Clinical Wellness</span>
              </div>
            </div>

            <p className="text-xs text-text-muted/80 leading-relaxed font-light">
              We architecturalize natural aesthetics on a foundation of pristine clinical safety. Our clinic offers a peaceful sanctuary of luxury and restorative care.
            </p>

            {/* Social link slots */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#insta"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-teal hover:text-white border border-white/10 flex items-center justify-center transition-colors text-text-muted/90"
                aria-label="Instagram portal"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#linkedin"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-teal hover:text-white border border-white/10 flex items-center justify-center transition-colors text-text-muted/90"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#vimeo"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary-teal hover:text-white border border-white/10 flex items-center justify-center transition-all text-text-muted/90 text-xs font-mono font-bold"
                aria-label="Vimeo film showcases"
              >
                V
              </a>
            </div>
          </div>

          {/* COLUMN 2: Contact Details (col-span-3) */}
          <div className="lg:col-span-3 space-y-6 footer-col">
            <h4 className="text-xs font-mono tracking-widest text-primary-teal uppercase">
              CONCIERGE INQUIRIES
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:concierge@auradental.com"
                  className="flex items-center gap-3 text-xs text-text-muted/90 hover:text-highlight-glow transition-colors max-w-max"
                >
                  <Mail size={15} className="text-primary-teal shrink-0" />
                  <span>concierge@auradental.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+18009012872"
                  className="flex items-center gap-3 text-xs text-text-muted/90 hover:text-highlight-glow transition-colors max-w-max"
                >
                  <Phone size={15} className="text-primary-teal shrink-0" />
                  <span>+1 (800) 901-AURA</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-xs text-text-muted/90 leading-relaxed">
                <MapPin size={15} className="text-primary-teal shrink-0 mt-0.5" />
                <span>
                  712 Crystalline Avenue<br />
                  Suite 12, Beverly Hills, CA 90210
                </span>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Operating Schedule (col-span-2) */}
          <div className="lg:col-span-2 space-y-6 footer-col">
            <h4 className="text-xs font-mono tracking-widest text-primary-teal uppercase">
              SUITE HOURS
            </h4>
            <ul className="space-y-3.5 text-xs text-text-muted/80 leading-relaxed">
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-primary-teal shrink-0" />
                <span>Monday — Friday</span>
              </li>
              <li className="pl-6 font-mono text-white">8:30 AM — 6:00 PM</li>
              
              <li className="flex items-center gap-2">
                <Clock size={14} className="text-primary-teal shrink-0" />
                <span>Saturday</span>
              </li>
              <li className="pl-6 font-mono text-white">9:00 AM — 3:00 PM</li>
              
              <li className="text-primary-teal pl-6 italic">Sunday: Strict Sabbath</li>
            </ul>
          </div>

          {/* COLUMN 4: Visual Map schematic placeholder vector (col-span-3) */}
          <div className="lg:col-span-3 space-y-6 footer-col">
            <h4 className="text-xs font-mono tracking-widest text-primary-teal uppercase">
              OUR LOCATION
            </h4>
            
            {/* Custom high end minimal mapping plot block */}
            <div className="w-full aspect-[4/3] rounded-2xl bg-neutral-900 border border-white/5 overflow-hidden relative p-4 flex flex-col justify-between shadow-inner">
              <span className="text-[8px] font-mono tracking-wider text-text-muted uppercase">SCHEMATIC BUILDING PLOT</span>
              
              {/* Cute line matrix representing a map layout */}
              <div className="absolute inset-0 p-6 flex items-center justify-center opacity-40 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary-teal/20 fill-none stroke-1">
                  <path d="M 0,10 L 100,10" />
                  <path d="M 0,40 L 100,40" />
                  <path d="M 10,0 L 10,100" />
                  <path d="M 70,0 L 70,100" />
                  <circle cx="70" cy="40" r="4" fill="#00B4D8" className="animate-ping" />
                  <circle cx="70" cy="40" r="3" fill="#00B4D8" />
                </svg>
              </div>

              <div className="z-10 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-white/5">
                <span className="text-[9px] font-bold text-highlight-glow block leading-none">Beverly Hills Wellness Sq.</span>
                <span className="text-[8px] text-text-muted block mt-0.5 leading-none">Free underground valeting</span>
              </div>
            </div>

          </div>

        </div>

        {/* Copy portal row */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-text-muted/70 font-mono">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left leading-relaxed">
            <span>© {new Date().getFullYear()} Aura Dental Care Group. All sovereign rights reserved.</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Charter & HIPAA Disclosure</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Wellness</a>
          </div>
          <span className="text-[#DEE7E2]/15 text-xs select-none">CRAFTED IN SPA RESIDENCY</span>
        </div>

      </div>
    </footer>
  );
}
