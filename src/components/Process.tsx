import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    i: '01',
    title: 'Book online',
    desc: 'Pick a service, doctor, and time in under two minutes.',
  },
  {
    i: '02',
    title: 'Quick consult call',
    desc: 'A coordinator reviews goals and prep — no surprise fees.',
  },
  {
    i: '03',
    title: 'Your treatment plan',
    desc: 'Clear 3D visuals and a transparent roadmap before we begin.',
  },
  {
    i: '04',
    title: 'Restore & smile',
    desc: 'Settle into a private suite and leave looking — and feeling — better.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.step-item',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section-pad bg-bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-14 md:mb-20">
          <span className="kicker">How it works</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-primary leading-[1.1] tracking-tight">
            Four calm steps to a{' '}
            <span className="italic text-accent-sage-deep">better smile</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-accent-gold/25" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step) => (
              <div key={step.i} className="step-item relative text-center lg:text-left space-y-4">
                <div className="inline-flex lg:flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-accent-gold/30 text-accent-gold font-serif text-xl shadow-sm relative z-10 mx-auto lg:mx-0">
                  {step.i}
                </div>
                <h3 className="font-serif text-xl text-text-primary">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
