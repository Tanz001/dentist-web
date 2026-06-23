import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineDrawRef = useRef<SVGPathElement>(null);
  const backgroundDecorRef = useRef<HTMLDivElement>(null);

  const statement = "We believe a visit to the dentist should feel less like a cold clinical appointment, and more like a quiet moment of wellness and restoration. Guided by warmth, empathy, and state-of-the-art care, we are redefining modern dentistry around your peace of mind.";

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll('.char-word');

    // Create scrub timeline for the text reveal and background parallax
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.8,
    });

    // 1. Staggered blur-to-sharp animation for the words
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 25,
        filter: 'blur(8px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 0.6,
        },
      }
    );

    // 2. Parallax drift for the abstract background SVG tooth
    if (backgroundDecorRef.current) {
      gsap.fromTo(
        backgroundDecorRef.current,
        { yPercent: -15, rotate: -5 },
        {
          yPercent: 15,
          rotate: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // 3. SVG Line drawing for the smile line decoration
    if (lineDrawRef.current) {
      gsap.fromTo(
        lineDrawRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1.0,
          },
        }
      );
    }

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-[90vh] py-24 md:py-36 bg-bg-alt flex flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Curved soft SVG divider at the top (smile-curve) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12 transform">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#FAF8F4] fill-current"
        >
          <path d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Parallax outline drawing of a tooth in the background */}
      <div
        ref={backgroundDecorRef}
        className="absolute top-24 opacity-[0.06] text-primary-teal w-full max-w-[500px] aspect-square flex items-center justify-center select-none pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-current fill-none stroke-[0.5]"
        >
          {/* A stylized fine line vector molar tooth crown + roots outline */}
          <path
            ref={lineDrawRef}
            className="outline-tooth-path"
            d="M 30,15 
               C 35,10  45,10  50,16 
               C 55,10  65,10  70,15 
               C 74,19  75,32  72,40 
               C 68,52  78,74  70,85 
               C 64,95  58,90  56,76 
               C 54,65  50,60  50,60 
               C 50,60  46,65  44,76 
               C 42,90  36,95  30,85 
               C 22,74  32,52  28,40 
               C 25,32  26,19  30,15 Z"
          />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
        {/* Cute kicker identifier */}
        <div className="flex justify-center items-center gap-1.5 opacity-80">
          <Heart size={14} className="text-primary-teal stroke-[2.5]" />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-primary-teal font-medium">
            Our Care Philosophy
          </span>
        </div>

        {/* The split text statement */}
        <h2
          ref={textRef}
          className="text-2xl sm:text-4xl md:text-5xl font-serif text-deep-navy font-light leading-relaxed select-none"
        >
          {statement.split(" ").map((word, index) => (
            <span
              key={index}
              className="char-word inline-block mr-[0.25em] mb-1.5 transition-all"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Three core pillars detailing the clinical soft touch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 text-left border-t border-primary-teal/15">
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-deep-navy flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-teal/10 flex items-center justify-center text-primary-teal text-xs font-mono">01</span>
              Acuity & Silence
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              We employ soundproof treatment lounges and state-of-the-art whisper drills to buffer anxiety-triggering clinical environments completely.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg text-deep-navy flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-teal/10 flex items-center justify-center text-primary-teal text-xs font-mono">02</span>
              Porcelain Artistry
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every crown, veneer, and aligner is hand-shaded and sculpted using custom tooth geometry for natural optical luminescence.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg text-deep-navy flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-teal/10 flex items-center justify-center text-primary-teal text-xs font-mono">03</span>
              Nurturing Care
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Warm towels, essential oils, and memory-foam dental suites help you feel fully anchored, heard, and relaxed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
