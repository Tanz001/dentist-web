import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FacilityTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      layerBackRef.current,
      { yPercent: -8, scale: 1.05 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      layerMidRef.current,
      { yPercent: -18 },
      {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      layerFrontRef.current,
      { yPercent: -30 },
      {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      textBlockRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      id="tech-tour"
      className="relative h-[110vh] md:h-[135vh] bg-bg-ivory overflow-hidden flex items-center justify-center px-6"
    >
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-bg-cream fill-current"
        >
          <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
        <div
          ref={layerBackRef}
          className="absolute inset-0 w-full h-[110%] -top-[5%] bg-bg-cream"
        >
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200"
            alt="Aura Dental reception lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30 sepia-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-ivory via-transparent to-bg-ivory/80" />
        </div>

        <div
          ref={layerMidRef}
          className="absolute top-[20%] right-[10%] w-[65%] max-w-[550px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-bg-ivory/80 bg-bg-warm z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
            alt="Modern treatment lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover sepia-[0.1]"
          />
          <div className="absolute inset-0 border border-accent-gold/15 rounded-[28px] pointer-events-none" />
        </div>

        <div
          ref={layerFrontRef}
          className="absolute bottom-[8%] left-[8%] w-[45%] max-w-[360px] aspect-square rounded-[24px] overflow-hidden shadow-xl border border-accent-gold/15 z-20"
        >
          <img
            src="https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=600"
            alt="Healing aromatherapy details"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110 sepia-[0.1]"
          />
        </div>
      </div>

      <div
        ref={textBlockRef}
        className="max-w-xl bg-bg-ivory/85 backdrop-blur-xl border border-accent-gold/15 p-8 md:p-10 rounded-[36px] shadow-xl relative z-30 translate-y-12 shrink-0 md:mr-auto md:ml-24"
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <span className="kicker">The Clinic</span>
            <span className="rule-gold" />
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif text-text-primary leading-tight">
              A space designed for{' '}
              <span className="italic text-accent-sage-deep">calm</span>
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Soft light, quiet rooms, and private suites — every detail is tuned so your visit feels unhurried and considered.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-accent-gold/15">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-accent-sage-deep tracking-wider uppercase block">Quiet rooms</span>
              <p className="text-xs text-text-muted leading-relaxed">Acoustic suites that keep clinical noise away.</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-accent-sage-deep tracking-wider uppercase block">Warm light</span>
              <p className="text-xs text-text-muted leading-relaxed">Soft ambient lighting instead of harsh fluorescents.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
