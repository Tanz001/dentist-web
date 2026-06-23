import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Smile,
  Crown,
  Heart,
  Activity,
  CalendarCheck,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface ServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export default function Services({ onServiceSelect }: ServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const services: ServiceItem[] = [
    {
      id: 'cleaning',
      title: 'Wellness Cleanings',
      description: 'Ultrasonic micro-polishing paired with tea tree oil irrigation for supreme enamel shield.',
      category: 'preventative',
      iconName: 'sparkles',
      treatmentTime: '45 mins',
    },
    {
      id: 'cosmetic',
      title: 'Cosmetic Artistry',
      description: 'Ultra-thin porcelain veneers hand-shaded to mirror natural crystalline tooth translucency.',
      category: 'cosmetic',
      iconName: 'smile',
      treatmentTime: '2 sessions',
    },
    {
      id: 'ortho',
      title: 'Custom 3D Aligners',
      description: 'Transparent computer-modeled orthotics to comfortably shift teeth without brackets.',
      category: 'cosmetic',
      iconName: 'layers',
      treatmentTime: '6-12 months',
    },
    {
      id: 'implants',
      title: 'Porcelain Implants',
      description: 'Biocompatible titanium roots capped with custom dental crowns for robust biting force.',
      category: 'clinical',
      iconName: 'crown',
      treatmentTime: '3 sessions',
    },
    {
      id: 'pediatric',
      title: 'Gentle Pediatric Care',
      description: 'Comforting, non-threatening dental examinations that turn dentist fear into a fun adventure.',
      category: 'preventative',
      iconName: 'heart',
      treatmentTime: '30 mins',
    },
    {
      id: 'emergency',
      title: 'Emergency Care',
      description: 'On-demand clinical trauma relief, root repairs, and rapid tooth ache mitigation.',
      category: 'clinical',
      iconName: 'activity',
      treatmentTime: 'Immediate',
    },
  ];

  useEffect(() => {
    if (!gridRef.current || !titleRef.current) return;

    const cards = gridRef.current.querySelectorAll('.service-card');

    // Staggered enter animation for the services cards
    const anim = gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          end: 'bottom 50%',
          toggleActions: 'play none none none', // run once comfortably, or reverse if scrubbed
        },
      }
    );

    // Title slide check
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      case 'smile':
        return <Smile className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      case 'crown':
        return <Crown className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      case 'heart':
        return <Heart className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      case 'activity':
        return <Activity className="w-6 h-6 text-primary-teal group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Smile className="w-6 h-6 text-primary-teal" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 md:py-36 bg-bg-base relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Grouping */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24"
        >
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.25em] text-primary-teal uppercase block">
              OUR LUXURIOUS SPECIALTIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-deep-navy font-light leading-tight">
              Bespoke architectural <br />
              care for your <span className="italic font-serif font-normal text-primary-teal">smile</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-text-muted max-w-sm leading-relaxed">
            Every service is uniquely tailored and executed under microscopic precision, maintaining supreme structural dentist integrity.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group bg-[#FAF8F4] hover:bg-white rounded-[24px] border border-primary-teal/5 p-8 relative overflow-hidden flex flex-col justify-between h-[320px] transition-all duration-500 shadow-sm hover:shadow-xl hover:border-primary-teal/15 cursor-pointer hover:-translate-y-2 select-none"
              onClick={() => onServiceSelect(service.title)}
            >
              {/* Card visual flash accent line at the left */}
              <div className="absolute top-0 left-0 w-[4px] h-0 bg-primary-teal group-hover:h-full transition-all duration-500" />

              {/* Sub-surface card flare sweep reflection */}
              <div className="absolute -inset-y-4 -left-1/4 w-1/2 bg-gradient-to-r from-transparent via-highlight-glow/10 to-transparent rotate-25 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="space-y-6">
                {/* Header Row: Icon and Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary-teal/5 flex items-center justify-center group-hover:bg-primary-teal/10 transition-colors">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-text-muted bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200/50">
                    {service.treatmentTime}
                  </span>
                </div>

                {/* Info Block */}
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-deep-navy font-medium tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom footer linking action info */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-teal group-hover:text-cta-coral transition-colors duration-300">
                <span>Request details</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic client-care feedback block */}
        <div className="mt-20 p-8 rounded-[32px] bg-bg-alt flex flex-col lg:flex-row items-center justify-between gap-8 border border-primary-teal/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-teal shadow-sm shrink-0">
              <Award size={22} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-lg text-deep-navy font-medium">Have question about cosmetic vs orthopedic options?</h4>
              <p className="text-xs text-text-muted">Speak with our treatment coordinators for a free guided clinical matching roadmap.</p>
            </div>
          </div>
          <button
            onClick={() => onServiceSelect('Clinical Consult')}
            className="w-full lg:w-auto bg-primary-teal text-white hover:bg-deep-navy text-xs font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            Ask a Coordinator
          </button>
        </div>

      </div>
    </section>
  );
}
