import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Sparkles, Sliders } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FacilityTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Background Layer: 0.2x Parallax Speed
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

    // Midground Layer: 0.5x Parallax Speed
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

    // Foreground Layer: 0.8x Parallax Speed
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

    // Text Block Slide/Blur Stagger Reveal
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
      className="relative h-[110vh] md:h-[135vh] bg-bg-base overflow-hidden flex items-center justify-center px-6"
    >
      {/* Decorative smile-curve top separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#E7F2EC] fill-current"
        >
          <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* COMPOSITE PARALLAX CANVAS */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
        
        {/* Layer 1: Background Layer (Waiting Room / Lounge) - Slow Translation */}
        <div
          ref={layerBackRef}
          className="absolute inset-0 w-full h-[110%] -top-[5%] bg-[#EAEDE7]"
        >
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200"
            alt="Aura Dental Spa Reception Lounge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter blur-xs"
          />
          {/* Subtle natural vignetting */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-transparent to-bg-base/80" />
        </div>

        {/* Layer 2: Midground Layer (Treatment Chair / Precision Optics) - Normal speed */}
        <div
          ref={layerMidRef}
          className="absolute top-[20%] right-[10%] w-[65%] max-w-[550px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50 bg-[#E3EAE6] z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
            alt="Modern treatment lounge overlooking forest trees"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 contrast-105"
          />
          {/* Soft inner glow highlight */}
          <div className="absolute inset-0 border border-primary-teal/20 rounded-[28px] pointer-events-none" />
        </div>

        {/* Layer 3: Foreground Layer (Natural Monstera Leaves / Foreground flare) - Fast speed */}
        <div
          ref={layerFrontRef}
          className="absolute bottom-[8%] left-[8%] w-[45%] max-w-[360px] aspect-square rounded-[24px] overflow-hidden shadow-xl border border-primary-teal/10 z-20"
        >
          <img
            src="https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=600"
            alt="Bespoke healing aromatherapy tools"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Overlay Lens Flare - Pulsing opacity independently */}
        <div className="absolute top-[15%] left-[25%] w-[400px] h-[400px] bg-gradient-to-tr from-highlight-glow/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms] z-30" />
        <div className="absolute bottom-[20%] right-[8%] w-[250px] h-[250px] bg-cta-coral/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[4000ms] z-30" />

      </div>

      {/* FLOAT OVERLAY CONTENT BLOCK */}
      <div
        ref={textBlockRef}
        className="max-w-xl bg-white/70 backdrop-blur-xl border border-primary-teal/15 p-8 md:p-10 rounded-[36px] shadow-2xl relative z-30 translate-y-12 shrink-0 md:mr-auto md:ml-24"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-teal/5 border border-primary-teal/10 rounded-full">
            <Compass size={13} className="text-primary-teal animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-widest text-primary-teal uppercase">Spatial Sanctuary</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif text-deep-navy font-light leading-tight">
              A serene ecosystem built for <span className="italic">peace</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We replaced traditional stainless-steel tool trays and fluorescent ceiling tubes with natural oak cabinetry, acoustic ceiling felts, and warm 2700K ambient key lighting. 
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-teal/10">
            <div className="space-y-1">
              <span className="font-mono text-xs text-primary-teal tracking-wider uppercase block">Sound Filtering</span>
              <p className="text-[10px] text-text-muted leading-relaxed">Active ANC loops remove 92% of clinic engine frequencies during treatment.</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-primary-teal tracking-wider uppercase block">Visual Calmer</span>
              <p className="text-[10px] text-text-muted leading-relaxed">Retinal ambient monitors stream tranquil sea motion above dental headrests.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
