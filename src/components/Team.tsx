import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Doctor } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface TeamProps {
  onDentistSelect: (dentistName: string) => void;
}

const team: Doctor[] = [
  {
    id: 'dentist-1',
    name: 'Dr. Beatrice Rostova',
    title: 'Aesthetic Architect, DDS',
    specialty: 'Porcelain Veneers',
    bio: 'Zurich-trained. Hand-shaded, high-translucency veneers for natural light.',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    experienceYears: 14,
  },
  {
    id: 'dentist-2',
    name: 'Dr. Marcus Vance',
    title: 'Orthopedic Lead, DDS',
    specialty: 'Clear Aligners',
    bio: '3D biomechanical aligner plans — frictionless, precise, comfortable.',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    experienceYears: 16,
  },
  {
    id: 'dentist-3',
    name: 'Dr. Alena Thorne',
    title: 'Pediatric Specialist, DDS',
    specialty: 'Gentle Pediatric Care',
    bio: 'Turns nervous visits into calm ones — for kids and anxious adults.',
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800',
    experienceYears: 11,
  },
  {
    id: 'dentist-4',
    name: 'Dr. Julian Park',
    title: 'Implant Specialist, DDS',
    specialty: 'Dental Implants',
    bio: 'Titanium implants and custom crowns built for lasting strength and comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    experienceYears: 13,
  },
];

export default function Team({ onDentistSelect }: TeamProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

      const anim = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getDistance() + 200}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative bg-bg-cream overflow-hidden md:min-h-screen md:flex md:flex-col md:justify-center"
    >
      <div className="w-full pt-20 pb-8 md:pt-28 md:pb-10 px-6 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-4">
          <span className="kicker">Specialists</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-text-primary leading-[1.1] tracking-tight">
            Meet the doctors behind{' '}
            <span className="italic text-accent-sage-deep">your calm</span>
          </h2>
          <p className="text-sm text-text-muted leading-relaxed max-w-lg md:hidden">
            Swipe to explore our specialists — tap a doctor to book with them.
          </p>
          <p className="text-sm text-text-muted leading-relaxed max-w-lg hidden md:block">
            Scroll to explore our specialists — click a doctor to book with them.
          </p>
        </div>
      </div>

      <div className="w-full pb-20 md:pb-28 overflow-x-auto md:overflow-visible scrollbar-none">
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-6 px-6 w-max will-change-transform"
        >
          {team.map((doctor) => (
            <button
              key={doctor.id}
              type="button"
              onClick={() => onDentistSelect(doctor.name)}
              className="group relative w-[78vw] max-w-[340px] sm:w-[320px] md:w-[380px] aspect-[3/4] rounded-[1.75rem] overflow-hidden shrink-0 text-left cursor-pointer border border-black/5 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal via-bg-charcoal/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {doctor.specialty}
                </span>
                <span className="rounded-full bg-accent-gold text-white px-2.5 py-1 text-[10px] font-semibold">
                  {doctor.experienceYears} yrs
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-white leading-tight">{doctor.name}</h3>
                <p className="text-sm text-white/65 mt-1">{doctor.title}</p>
                <p className="text-sm text-white/55 mt-3 leading-relaxed line-clamp-2">{doctor.bio}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-gold-light">
                  Book with {doctor.name.split(' ').pop()}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          ))}
          {/* End spacer so last card clears the edge */}
          <div className="w-2 shrink-0 md:w-10" aria-hidden />
        </div>
      </div>
    </section>
  );
}
