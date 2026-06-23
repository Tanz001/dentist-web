import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Award, ShieldCheck } from 'lucide-react';
import { Doctor } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface TeamProps {
  onDentistSelect: (dentistName: string) => void;
}

export default function Team({ onDentistSelect }: TeamProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const team: Doctor[] = [
    {
      id: 'dentist-1',
      name: 'Dr. Beatrice Rostova',
      title: 'Aesthetic Architect, DDS',
      specialty: 'Micro-Layer Ceramics',
      bio: 'Trained at the Zurich Dental Institute, Dr. Rostova specializes in hand-shading high-translucency porcelain veneers for natural luminescence.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      experienceYears: 14,
    },
    {
      id: 'dentist-2',
      name: 'Dr. Marcus Vance',
      title: 'Orthopedic Lead, DDS',
      specialty: '3D Computerized Aligners',
      bio: 'Pioneered custom biomechanical alignments. Dr. Vance utilizes custom structural simulations to design frictionless, zero-bracket orthopedic plans.',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      experienceYears: 16,
    },
    {
      id: 'dentist-3',
      name: 'Dr. Alena Thorne',
      title: 'Pediatric Specialist, DDS',
      specialty: 'Narrative Care & Conscious Sedation',
      bio: 'Dedicated to calming fear-sensitive patients. Dr. Thorne combines soothing aromatherapy with narrative dental tours to buffer pediatric anxiety.',
      imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600',
      experienceYears: 11,
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;

    const scrollWrapper = scrollWrapperRef.current;
    
    // Calculate total scroll translation distance
    const totalScrollWidth = scrollWrapper.scrollWidth;
    const clientWidth = scrollWrapper.clientWidth;
    const translateDist = totalScrollWidth - clientWidth;

    // Direct GSAP Horizontal Scroll Pinning translation with ScrollTrigger
    // Disable pinning on small mobile viewports to allow native organic sideways swipe
    const isMobile = window.innerWidth < 768;

    if (!isMobile && translateDist > 0) {
      const pinAnimation = gsap.fromTo(
        scrollWrapper,
        { x: 0 },
        {
          x: -translateDist,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${translateDist + 300}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        }
      );

      return () => {
        pinAnimation.scrollTrigger?.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative min-h-screen bg-bg-alt py-20 md:py-0 md:flex md:items-center overflow-hidden"
    >
      {/* Decorative smile-curve top separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#FAF8F4] fill-current"
        >
          <path d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col justify-center gap-12 relative z-10 md:h-screen">
        
        {/* Intro Tagging Row */}
        <div className="max-w-2xl space-y-4 md:mt-12">
          <span className="text-[10px] font-mono tracking-[0.25em] text-primary-teal uppercase block">
            CLINICAL MASTERMINDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-deep-navy font-light leading-tight">
            Meet our elite <br />
            medical <span className="italic font-serif font-normal text-primary-teal">practitioners</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-lg">
            Our doctors arenʼt just dentists — they are published scholars and sculptors who view oral geometry through a lens of holistic clinical wellness.
          </p>
        </div>

        {/* Doctor Cards Horizontal List Row */}
        <div
          ref={scrollWrapperRef}
          className="flex flex-col md:flex-row gap-8 overflow-y-visible overflow-x-auto md:overflow-x-visible pb-10 cursor-grab active:cursor-grabbing scrollbar-none"
        >
          {team.map((doctor) => (
            <div
              key={doctor.id}
              className="doctor-panel relative w-full md:w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden group border border-primary-teal/5 bg-[#FAF8F4] shadow-md hover:shadow-2xl hover:border-primary-teal/20 transition-all duration-300 shrink-0 select-none cursor-pointer"
              onClick={() => onDentistSelect(doctor.name)}
            >
              
              {/* Layer 1: Background Blur (Parallax layer 0.5x speed) */}
              <div className="absolute inset-0 bg-neutral-900 transition-all duration-700 pointer-events-none group-hover:scale-105" />

              {/* Layer 2: Portrait image with duotone transition overlay */}
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />

              {/* Cyan soft duotone color mask */}
              <div className="absolute inset-0 bg-primary-teal/20 dark:bg-primary-teal/10 mix-blend-color group-hover:bg-transparent transition-all duration-500 pointer-events-none" />

              {/* Bottom shadow gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              {/* Quick Credentials Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 select-none">
                <Award size={13} className="text-highlight-glow" />
                <span className="text-[9px] font-mono tracking-widest text-white uppercase">{doctor.experienceYears} yrs experience</span>
              </div>

              {/* Layer 3: Info Sheet Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end gap-3 translate-y-[20px] group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-1">
                  <span className="text-primary-teal font-mono text-[9px] tracking-[0.2em] uppercase block">
                    {doctor.specialty}
                  </span>
                  <h3 className="text-2xl font-serif text-white">{doctor.name}</h3>
                  <p className="text-xs text-white/70 font-light italic">{doctor.title}</p>
                </div>

                {/* Secret reveal drawer: slides open on hover */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out space-y-4 pt-2">
                  <p className="text-[11px] text-white/75 leading-relaxed font-light">
                    {doctor.bio}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-highlight-glow tracking-wider uppercase group-hover:text-cta-coral transition-colors">
                    <span>Reserve initial consultation</span>
                    <ArrowRight size={13} className="animate-pulse" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
