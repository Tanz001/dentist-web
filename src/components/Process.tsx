import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick, PhoneCall, FileSpreadsheet, Sparkles, Footprints } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepNodesRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      i: '01',
      title: 'Digital Reservation',
      desc: 'Select preferred service, specialist, and time in under two minutes via our intuitive scheduler.',
      icon: <MousePointerClick className="w-5 h-5 text-primary-teal" />,
    },
    {
      i: '02',
      title: 'Warm Voice Triage',
      desc: 'Connect with a private treatment coordinator for a 15-min audio chat to list visual aesthetics.',
      icon: <PhoneCall className="w-5 h-5 text-primary-teal" />,
    },
    {
      i: '03',
      title: 'Bespoke Blueprints',
      desc: 'Receive personalized 3D anatomical smile blueprints and transparent budgetary layouts.',
      icon: <FileSpreadsheet className="w-5 h-5 text-primary-teal" />,
    },
    {
      i: '04',
      title: 'Breathe & Restore',
      desc: 'Step into our sun-lit sanctuary suite, receive warm aroma towels, and leave with complete confidence.',
      icon: <Sparkles className="w-5 h-5 text-primary-teal animate-pulse" />,
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !pathRef.current || !stepNodesRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Configure drawing offset values
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Custom GSAP Timeline to draw the connective line and stagger step nodes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: 1.0,
      },
    });

    // Step 1: Draw the connect line
    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      duration: 2,
    }, 0);

    // Step 2: Stagger reveal the node circles and textual descriptions
    const cards = stepNodesRef.current.querySelectorAll('.step-card');
    tl.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.4,
        ease: 'power2.out',
        duration: 1.5,
      },
      0.3
    );

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-24 md:py-36 bg-bg-alt relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Detail Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-teal/10 border border-primary-teal/25 rounded-full mb-2">
            <Footprints size={12} className="text-primary-teal" />
            <span className="text-[10px] font-mono tracking-widest text-primary-teal uppercase">Step-by-Step Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-deep-navy font-light leading-tight">
            Designed for complete <br />
            emotional <span className="italic font-serif font-normal text-primary-teal">reassurance</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            From your very first digital click to walking out of our front door, we buffer friction and stress completely.
          </p>
        </div>

        {/* TIMELINE VISUAL CONTAINER */}
        <div className="relative w-full py-10 mt-10">
          
          {/* SVG Line Backing - Horizontal connecting path (Hidden on micro mobile) */}
          <div className="absolute top-[82px] left-[15%] right-[15%] h-1.5 hidden lg:block z-0 pointer-events-none">
            <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="w-full h-1">
              {/* Back background trace */}
              <line x1="0" y1="1" x2="100" y2="1" stroke="#DEE7E2" strokeWidth="2" strokeLinecap="round" />
              {/* Front active reveal dash */}
              <path
                ref={pathRef}
                d="M 0,1 L 100,1"
                fill="none"
                stroke="#1E7F73"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Stagger nodes list */}
          <div
            ref={stepNodesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, idx) => (
              <div
                key={step.i}
                className="step-card group bg-[#FAF8F4] hover:bg-white p-8 rounded-[28px] border border-primary-teal/5 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col items-center text-center select-none cursor-default"
              >
                {/* Step Circle Index */}
                <div className="w-14 h-14 rounded-full bg-primary-teal/5 flex items-center justify-center border border-primary-teal/10 group-hover:bg-primary-teal group-hover:text-white group-hover:border-transparent transition-all duration-500 z-10 relative mb-6">
                  <span className="text-xs font-mono font-bold tracking-wider text-primary-teal group-hover:text-white transition-colors">
                    {step.i}
                  </span>
                </div>

                {/* Internal floating secondary hover icon badge */}
                <div className="absolute -top-3 right-8 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary-teal shadow-md border border-neutral-100 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                  {step.icon}
                </div>

                {/* Text groups */}
                <div className="space-y-3">
                  <h3 className="text-lg font-serif text-deep-navy font-semibold">
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Small indicator loop visual */}
                <div className="absolute bottom-4 w-4 h-[2px] bg-primary-teal/20 group-hover:bg-cta-coral transition-colors" />

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
