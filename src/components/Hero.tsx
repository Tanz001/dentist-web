import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Anchor, Compass } from 'lucide-react';
import DoctorPatientDisplay from './DoctorPatientDisplay';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onBookClick: () => void;
  onShrinkChange: (shrank: boolean) => void;
}

export default function Hero({ onBookClick, onShrinkChange }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualFrameRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const lowerContentRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !visualFrameRef.current) return;

    // Build the primary single sequential timeline for the Hero scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // 150vh of scrolling
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          // Let navigation know when we have shrunk beyond 15% scrolling
          onShrinkChange(self.progress > 0.15);
        },
      },
    });

    // Step 1: Fade out the overlay centered headline & scroll cue on early scroll
    tl.to(titleGroupRef.current, {
      opacity: 0,
      scale: 1.05,
      y: -50,
      duration: 1,
    }, 0);

    tl.to(scrollCueRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
    }, 0);

    // Step 2: Shrink the viewport edge-to-edge frame into a refined floating card
    // Adjust size gracefully based on responsive screen widths
    const isMobile = window.innerWidth < 768;
    const targetWidth = isMobile ? '86vw' : '72vw';
    const targetHeight = isMobile ? '50vh' : '55vh';

    tl.to(visualFrameRef.current, {
      width: targetWidth,
      height: targetHeight,
      borderRadius: '32px',
      boxShadow: '0 25px 50px -12px rgba(30, 127, 115, 0.15)',
      ease: 'power2.inOut',
      duration: 2.2,
    }, 0.2);

    // Step 3: Fade and slide in the lower descriptive copy and the primary CTA button
    tl.to(lowerContentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'back.out(1.2)',
      duration: 1.5,
    }, 1.2);

    return () => {
      // Clear ScrollTrigger bindings on unmount to make room for resizing refresh
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [onShrinkChange]);

  const handleArrowScroll = () => {
    // Scroll down past the hero pin block
    const element = document.getElementById('philosophy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full h-[180vh] bg-bg-base overflow-hidden"
    >
      {/* Side Rail Indicators - Established Left Rail */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center space-y-12 z-40 pointer-events-none select-none">
        <div className="h-32 w-[1.5px] bg-gradient-to-b from-transparent via-primary-teal/70 to-transparent"></div>
        <span className="rotate-180 uppercase text-[9px] tracking-[0.4em] text-text-muted font-bold font-mono" style={{ writingMode: 'vertical-rl' }}>
          Established 2014
        </span>
      </div>

      {/* Online Now Queue status indicator - Bottom Right */}
      <div className="absolute right-8 bottom-8 hidden md:flex items-center space-x-3.5 z-40 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-primary-teal/10 shadow-sm pointer-events-auto select-none">
        <div className="w-10 h-10 rounded-full border border-text-primary/10 flex items-center justify-center relative bg-[#E7F2EC]/30">
          <div className="w-2.5 h-2.5 bg-cta-coral rounded-full animate-pulse"></div>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-deep-navy font-mono tracking-wider leading-none">Online Now</span>
          <span className="text-[9px] text-text-muted mt-0.5 leading-none">Virtual Consultation Queue: 4m</span>
        </div>
      </div>

      {/* Assets Optimized Indicator - Bottom Left */}
      <div className="absolute left-8 bottom-8 hidden md:flex items-center space-x-3 z-40 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-primary-teal/10 shadow-sm pointer-events-none select-none">
        <div className="w-4 h-4 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="text-primary-teal animate-spin-slow w-full h-full">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} fill="none" strokeDasharray="30 60"></circle>
          </svg>
        </div>
        <span className="text-[9px] font-bold tracking-wider text-text-muted uppercase font-mono">Dynamic Assets Optimized</span>
      </div>

      {/* Custom Simulated Interactive Cursor Highlight Indicator near center */}
      <div className="absolute top-[45%] right-[20%] w-14 h-14 border border-primary-teal/40 rounded-full pointer-events-none hidden xl:flex items-center justify-center z-40 select-none animate-bounce" style={{ animationDuration: '4s' }}>
        <div className="w-1.5 h-1.5 bg-primary-teal rounded-full animate-ping"></div>
        <div className="w-1.5 h-1.5 bg-primary-teal rounded-full absolute"></div>
        <span className="absolute top-16 text-[8px] uppercase tracking-[0.25em] font-bold text-primary-teal font-mono">Interactive</span>
      </div>

      {/* Absolute fixed layer representing 100vh of persistent visual layout */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center py-12">
        
        {/* Ambient top tagline floating softly */}
        <div className="z-10 text-center max-w-sm px-6 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-teal/5 border border-primary-teal/10 rounded-full mb-3 shadow-sm">
            <Sparkles size={12} className="text-primary-teal animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-widest text-primary-teal uppercase">
              The Art of Modern Dentistry
            </span>
          </div>
        </div>

        {/* The core interactive 3D container that will shrink on scroll trigger */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            ref={visualFrameRef}
            className="w-full h-full bg-gradient-to-b from-highlight-glow/20 to-bg-alt/30 border border-primary-teal/5 shadow-none overflow-hidden relative flex items-center justify-center pointer-events-auto"
            style={{ borderRadius: '0px' }}
          >
            {/* Soft decorative background layers within the model context */}
            <div className="absolute -inset-10 bg-radial from-highlight-glow/30 via-transparent to-transparent opacity-90 blur-2xl pointer-events-none" />
            
            <div className="absolute top-8 left-8 flex items-center gap-1.5 opacity-50 text-[10px] uppercase tracking-wider font-mono text-primary-teal pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-teal animate-pulse" />
              <span>IMMERSIVE CLINICAL WELCOME V.2</span>
            </div>

            {/* Simulated lighting specular flare inside the frame */}
            <div className="absolute top-10 right-10 w-44 h-44 bg-white/20 rounded-full blur-2xl mix-blend-overlay pointer-events-none animate-pulse" />

            {/* Interactive Dentist and Patient Frame Display */}
            <div className="w-full h-full relative z-10 flex items-center justify-center">
              <DoctorPatientDisplay scrollProgress={scrollProgress} />
            </div>

            {/* Phase A Overlay Center Title - Fades out on scroll */}
            <div
              ref={titleGroupRef}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 select-none bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent md:to-deep-navy/20 pointer-events-none"
            >
              <div className="max-w-4xl mx-auto space-y-4">
                <span className="text-white/85 text-[11px] font-mono tracking-[0.25em] uppercase block">
                  AURA DENTAL CLINIC
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif text-white leading-tight font-light">
                  A smile youʼll <br className="hidden sm:inline" />
                  want to <span className="italic font-normal font-serif text-highlight-glow">share</span>
                </h1>
                <p className="font-sans text-white/70 max-w-lg mx-auto text-sm sm:text-base md:text-lg font-light tracking-wide">
                  Experience modern dentistry crafted with soft linen warmth, precision medical experts, and clinical calm.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase A Scroll Cue helper at the very bottom */}
        <div
          ref={scrollCueRef}
          onClick={handleArrowScroll}
          className="z-30 flex flex-col items-center gap-2 cursor-pointer group text-white/80 hover:text-white transition-colors py-4 px-6 mb-8 font-mono text-[9px] tracking-widest uppercase select-none pointer-events-auto"
        >
          <span className="animate-bounce">Scroll to Explore</span>
          <ChevronDown size={14} className="animate-pulse" />
        </div>

        {/* Phase B Revealing Lower Content Area - Fades in below the shrunk frame */}
        <div
          ref={lowerContentRef}
          className="absolute bottom-6 md:bottom-12 left-0 w-full z-30 text-center px-6 opacity-0 translate-y-12 scale-95 flex flex-col items-center pointer-events-auto"
        >
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-serif text-deep-navy tracking-tight leading-snug">
              Begin your visual <span className="italic">transformation</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-md mx-auto">
              Our bespoke boutique approach brings clinical excellence into a warm, stressless space. Ready to feel completely reassured?
            </p>
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="bg-cta-coral hover:bg-cta-coral/95 text-white text-xs font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.05] hover:shadow-lg active:scale-[0.97] shadow-md cursor-pointer"
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
