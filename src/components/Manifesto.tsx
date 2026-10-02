import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: '01',
    title: 'Calm first',
    desc: 'Quiet suites, soft light, and unhurried appointments — anxiety stays outside.',
  },
  {
    num: '02',
    title: 'Precision craft',
    desc: 'Every veneer and crown is shaded and shaped to match your natural light.',
  },
  {
    num: '03',
    title: 'Honest care',
    desc: 'Clear plans, transparent pricing, and specialists who listen before they treat.',
  },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.philosophy-reveal',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="section-pad bg-bg-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="philosophy-reveal lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                alt="Aesthetic Lounge private treatment suite"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-2xl text-white leading-tight">
                  Private suites.
                  <br />
                  <span className="italic text-accent-gold-light">Zero rush.</span>
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden sm:flex bg-white rounded-2xl px-5 py-4 shadow-lg border border-accent-gold/10">
              <div>
                <p className="font-serif text-2xl text-accent-gold">10+</p>
                <p className="text-[11px] text-text-muted uppercase tracking-wider mt-0.5">Years of calm care</p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 space-y-10">
            <div className="philosophy-reveal space-y-4">
              <span className="kicker">Our Philosophy</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-primary font-normal leading-[1.15] tracking-tight max-w-xl">
                Dentistry that feels like{' '}
                <span className="italic text-accent-sage-deep">wellness</span>, not a waiting room.
              </h2>
              <p className="text-base text-text-muted leading-relaxed max-w-lg">
                We rebuilt the dental visit around comfort and craft — so you leave looking better and feeling genuinely at ease.
              </p>
            </div>

            <div className="philosophy-reveal grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2 border-t border-accent-gold/15">
              {PRINCIPLES.map((p) => (
                <div key={p.num} className="space-y-3 pt-6">
                  <span className="text-xs font-semibold tracking-widest text-accent-gold">{p.num}</span>
                  <h3 className="font-serif text-xl text-text-primary">{p.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
