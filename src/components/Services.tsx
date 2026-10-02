import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock } from 'lucide-react';
import { ServiceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

const services: ServiceItem[] = [
  {
    id: 'cleaning',
    title: 'Wellness Cleanings',
    description: 'Gentle ultrasonic polishing and protective enamel care in a quiet private suite.',
    category: 'preventative',
    iconName: 'sparkles',
    treatmentTime: '45 min',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Veneers',
    description: 'Ultra-thin porcelain, hand-shaded for natural translucency and a luminous smile line.',
    category: 'cosmetic',
    iconName: 'smile',
    treatmentTime: '2 visits',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400',
  },
  {
    id: 'ortho',
    title: 'Clear Aligners',
    description: 'Custom 3D-planned aligners that shift teeth comfortably — no brackets.',
    category: 'cosmetic',
    iconName: 'layers',
    treatmentTime: '6–12 mo',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Titanium roots with custom crowns built for lasting strength and natural feel.',
    category: 'clinical',
    iconName: 'crown',
    treatmentTime: '3 visits',
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'pediatric',
    title: 'Pediatric Care',
    description: 'Gentle visits that turn fear into trust — for kids and nervous parents.',
    category: 'preventative',
    iconName: 'heart',
    treatmentTime: '30 min',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b1ffefb000?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Same-day relief for trauma, pain, and urgent repairs when you need us most.',
    category: 'clinical',
    iconName: 'activity',
    treatmentTime: 'Same day',
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function Services({ onServiceSelect }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState('cosmetic');
  const featured = services.find((s) => s.id === activeId) ?? services[1];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-reveal',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-pad bg-bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="services-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-xl space-y-4">
            <span className="kicker">Our Treatments</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-primary leading-[1.1] tracking-tight">
              Care shaped around{' '}
              <span className="italic text-accent-sage-deep">you</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-md">
              Preview a specialty, then book it — we&apos;ll match you with the right doctor.
            </p>
          </div>
        </div>

        <div className="services-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Featured panel */}
          <div className="lg:col-span-7 relative rounded-[1.75rem] overflow-hidden min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] group">
            <img
              key={featured.id}
              src={featured.imageUrl}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal/90 via-bg-charcoal/35 to-transparent" />

            <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 text-accent-gold-light text-xs font-semibold uppercase tracking-wider mb-3">
                <Clock size={13} />
                {featured.treatmentTime}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md mb-6">
                {featured.description}
              </p>
              <button
                type="button"
                onClick={() => onServiceSelect(featured.title)}
                className="btn-primary w-fit"
              >
                Book {featured.title}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {services.map((service) => {
              const active = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  onDoubleClick={() => onServiceSelect(service.title)}
                  className={`flex items-center gap-4 rounded-2xl p-3.5 text-left transition-all duration-300 cursor-pointer border ${
                    active
                      ? 'bg-bg-charcoal border-bg-charcoal shadow-lg'
                      : 'bg-white border-black/5 hover:border-accent-gold/30'
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={service.imageUrl}
                      alt=""
                      className={`w-full h-full object-cover transition-all ${
                        active ? '' : 'grayscale-[0.4] group-hover:grayscale-0'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`font-serif text-base truncate ${
                          active ? 'text-white' : 'text-text-primary'
                        }`}
                      >
                        {service.title}
                      </h4>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider shrink-0 ${
                          active ? 'text-accent-gold-light' : 'text-text-muted'
                        }`}
                      >
                        {service.treatmentTime}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-0.5 line-clamp-1 ${
                        active ? 'text-white/55' : 'text-text-muted'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className={`shrink-0 transition-all ${
                      active ? 'text-accent-gold' : 'text-transparent'
                    }`}
                  />
                </button>
              );
            })}
            <p className="text-[11px] text-text-muted text-center pt-2 hidden lg:block">
              Click to preview · Double-click to book
            </p>
          </div>
        </div>

        <div className="services-reveal mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-[1.5rem] bg-bg-cream border border-accent-gold/15 px-7 py-6">
          <div>
            <p className="font-serif text-lg md:text-xl text-text-primary">Not sure which treatment?</p>
            <p className="text-sm text-text-muted mt-0.5">Start with a free consult — we&apos;ll guide you.</p>
          </div>
          <button
            type="button"
            onClick={() => onServiceSelect('Clinical Consult')}
            className="btn-primary shrink-0"
          >
            Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
