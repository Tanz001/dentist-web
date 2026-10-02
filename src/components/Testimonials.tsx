import { useCallback, useEffect, useRef, useState } from 'react';
import { Star, ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 'quote-1',
    quote: "The first time I didn't feel panic in a dental chair. Aesthetic Lounge is completely quiet, and the veneer work was done with microscopic artistry.",
    patientName: 'Victoria Sterling',
    serviceReceived: 'Cosmetic Veneers',
    rating: 5,
    bgTone: 'bg-bg-ivory',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'quote-2',
    quote: 'My aligners were modeled on screen with total transparency. The plan was crystal clear, and my teeth shifted effortlessly — zero pain.',
    patientName: 'Jameson Reynolds',
    serviceReceived: 'Clear Aligners',
    rating: 5,
    bgTone: 'bg-bg-ivory',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'quote-3',
    quote: "My toddler laughed during her check-up. Dr. Thorne turned scary equipment into something magical. A gift for nervous parents.",
    patientName: 'Nadia Belcastro',
    serviceReceived: 'Pediatric Wellness',
    rating: 5,
    bgTone: 'bg-bg-ivory',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
  },
];

const AUTO_MS = 7000;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, AUTO_MS);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 bg-bg-charcoal overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-gold/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-sage/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header + stats */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="space-y-5">
            <span className="kicker text-accent-gold-light">Patient Stories</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal leading-[1.1] max-w-lg tracking-tight">
              Real smiles from people who{' '}
              <span className="italic text-accent-gold-light">expected more</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-8 lg:gap-12">
            {[
              { value: '5.0', label: 'Average rating' },
              { value: '2.4k+', label: 'Happy patients' },
              { value: '98%', label: 'Would recommend' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-serif text-accent-gold-light">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden px-4 md:px-12 -mx-4 md:-mx-0">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                transform: `translateX(calc(-${active * 100}% - ${active * 0}px))`,
              }}
            >
              {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="w-full shrink-0 px-3 md:px-4"
                  >
                    <div className="relative mx-auto max-w-4xl">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-[28px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-sm shadow-2xl">
                        {/* Photo */}
                        <div className="md:col-span-2 relative aspect-[4/5] md:aspect-auto md:min-h-[380px]">
                          <img
                            src={t.imageUrl}
                            alt={t.patientName}
                            className="absolute inset-0 w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-charcoal/60 via-transparent to-transparent" />

                          {/* Floating rating pill on photo */}
                          <div className="absolute top-5 left-5 flex items-center gap-1.5 bg-bg-charcoal/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} size={11} className="fill-accent-gold stroke-accent-gold" />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-3 flex flex-col justify-center p-8 md:p-10 lg:p-12">
                          <div className="inline-flex items-center gap-1.5 text-accent-sage text-xs font-medium mb-6 w-fit">
                            <BadgeCheck size={14} />
                            Verified Patient
                          </div>

                          <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] font-serif text-white font-light leading-relaxed">
                            "{t.quote}"
                          </blockquote>

                          <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between gap-4">
                            <div>
                              <p className="font-medium text-white text-base">{t.patientName}</p>
                              <p className="text-sm text-white/45 mt-0.5">{t.serviceReceived}</p>
                            </div>
                            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-white/25 font-mono">
                              Aesthetic Lounge
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10 max-w-4xl mx-auto px-2">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className="relative h-1 rounded-full overflow-hidden cursor-pointer bg-white/10 w-12"
                  aria-label={`Go to review ${idx + 1}`}
                >
                  <span
                    className={`absolute inset-y-0 left-0 bg-accent-gold rounded-full transition-all duration-300 ${
                      idx === active ? 'w-full' : 'w-0'
                    }`}
                  />
                  {idx === active && !isPaused && (
                    <span
                      key={`progress-${active}`}
                      className="absolute inset-y-0 left-0 bg-accent-gold-light rounded-full animate-[testimonialProgress_7s_linear_forwards] opacity-60"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/15 hover:border-accent-gold/50 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous review"
              >
                <ArrowLeft size={16} className="text-white" />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-white/15 hover:border-accent-gold/50 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next review"
              >
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Avatar strip — quick jump */}
        <div className="flex items-center justify-center gap-4 mt-12">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => goTo(idx)}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
                idx === active
                  ? 'w-20 h-24 ring-2 ring-accent-gold ring-offset-2 ring-offset-bg-charcoal'
                  : 'w-14 h-16 opacity-40 hover:opacity-70 grayscale hover:grayscale-0'
              }`}
              aria-label={`Read ${t.patientName}'s review`}
            >
              <img
                src={t.imageUrl}
                alt={t.patientName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
