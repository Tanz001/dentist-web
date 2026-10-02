import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight } from 'lucide-react';
import DoctorPatientDisplay from './DoctorPatientDisplay';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onBookClick: () => void;
  onShrinkChange: (shrank: boolean) => void;
}

export default function Hero({ onBookClick, onShrinkChange }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const trustStripRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !imageFrameRef.current || !copyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=120%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          onShrinkChange(self.progress > 0.12);
        },
      },
    });

    tl.to(copyRef.current, { opacity: 0, y: -40, duration: 1 }, 0);
    tl.to(scrollCueRef.current, { opacity: 0, duration: 0.4 }, 0);

    const isMobile = window.innerWidth < 768;
    tl.to(
      imageFrameRef.current,
      {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: isMobile ? '92vw' : '70vw',
        height: isMobile ? '48vh' : '54vh',
        xPercent: -50,
        yPercent: -50,
        borderRadius: '28px',
        boxShadow: '0 40px 80px -20px rgba(26, 31, 36, 0.4)',
        ease: 'power2.inOut',
        duration: 2,
      },
      0.12
    );

    tl.to(trustStripRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 1 }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [onShrinkChange]);

  const goPhilosophy = () => {
    document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} id="home" className="relative w-full h-[170vh] bg-bg-ivory overflow-hidden">
      <div className="absolute inset-0 w-full h-screen overflow-hidden">
        <div
          ref={imageFrameRef}
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ borderRadius: 0 }}
        >
          <DoctorPatientDisplay scrollProgress={scrollProgress} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-charcoal/75 via-bg-charcoal/40 to-transparent pointer-events-none" />
        </div>

        <div
          ref={copyRef}
          className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center px-6 sm:px-12 md:px-16 lg:px-24 pb-28 sm:pb-0 pt-28 pointer-events-none"
        >
          <div className="max-w-2xl pointer-events-auto">
            <p className="kicker text-accent-gold-light mb-3">Beverly Hills · Boutique Care</p>

            <h1 className="font-serif text-white tracking-tight leading-[0.92]">
              <span className="block text-[clamp(3.5rem,12vw,8rem)] font-medium">AURA</span>
              <span className="block mt-2 text-[clamp(1.35rem,3.5vw,2.25rem)] font-light text-white/90">
                A smile crafted with{' '}
                <span className="italic text-accent-gold-light">quiet precision</span>
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
              Modern dentistry in a calm private suite — clinical excellence without the clinical feel.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onBookClick} className="btn-primary">
                Book Consultation
              </button>
              <button
                type="button"
                onClick={goPhilosophy}
                className="btn-ghost text-white"
              >
                Our philosophy
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollCueRef}
          onClick={goPhilosophy}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer text-white/50 hover:text-white transition-colors"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div
        ref={trustStripRef}
        className="absolute bottom-10 left-0 w-full z-30 px-6 opacity-0 translate-y-8"
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-5 shadow-xl border border-black/5">
          <div className="text-center sm:text-left">
            <p className="font-serif text-2xl text-accent-gold">5.0</p>
            <p className="text-xs text-text-muted">Patient rating · 2,400+</p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-black/10" />
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold text-text-primary">Same-week openings</p>
            <p className="text-xs text-text-muted">Private suites, never crowded</p>
          </div>
          <button type="button" onClick={onBookClick} className="btn-primary">
            Request Visit
          </button>
        </div>
      </div>
    </div>
  );
}
