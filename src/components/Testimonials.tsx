import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateState, setAnimateState] = useState('fade-in'); // For handling fade/slide states

  const testimonials: Testimonial[] = [
    {
      id: 'quote-1',
      quote: "“The absolute *first time* in my life that I didnʼt feel white-knuckle panic in a dental chair. Aura smells like fresh linen, is completely quiet, and Dr. Rostova sculpted my front veneer with microscopic artistry.”",
      patientName: "Victoria Sterling",
      serviceReceived: "Cosmetic Veneers",
      rating: 5,
      bgTone: "bg-[#FAF8F4]", // Soft Warm White
    },
    {
      id: 'quote-2',
      quote: "“Marcus Vance modeled my 3D aligners transparently on a digital screen, mapping biomechanical forces perfectly. The plans were completely clear, and my teeth shifted effortlessly without pain.”",
      patientName: "Jameson Reynolds",
      serviceReceived: "Clear Aligners",
      rating: 5,
      bgTone: "bg-[#E7F2EC]", // Pale Mint
    },
    {
      id: 'quote-3',
      quote: "“My toddler actually *laughed* during her check-up. Dr. Thorneʼs storytelling turned potentially scary clinical equipment into magical tooth brushes. Highly recommended for nervous parents!”",
      patientName: "Nadia Belcastro",
      serviceReceived: "Pediatric Wellness",
      rating: 5,
      bgTone: "bg-[#F3EFE9]", // Sandy Ecru
    },
  ];

  useEffect(() => {
    // Continuous auto-play rotation
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const transitionToSlide = (newIndex: number) => {
    setAnimateState('fade-out');
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimateState('fade-in');
    }, 400); // Wait for fade-out drift duration
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % testimonials.length;
    transitionToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + testimonials.length) % testimonials.length;
    transitionToSlide(prevIdx);
  };

  const slide = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className={`py-24 md:py-36 relative transition-colors duration-1000 ease-in-out ${slide.bgTone} overflow-hidden`}
    >
      {/* Decorative large quotation sign backdrop */}
      <div className="absolute top-10 left-10 md:left-24 text-primary-teal/5 opacity-50 select-none font-serif text-[18rem] md:text-[25rem] leading-[0] font-bold pointer-events-none">
        “
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Quote Kicker */}
        <div className="flex items-center gap-1.5 mb-10 opacity-75">
          <MessageSquareQuote size={15} className="text-primary-teal" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-primary-teal uppercase font-semibold">
            Patient Stories & Reviews
          </span>
        </div>

        {/* TRANSITIONING CAROUSEL SHEET */}
        <div className="min-h-[280px] flex flex-col items-center text-center justify-center">
          <div
            className={`transition-all duration-500 ease-out space-y-8 ${
              animateState === 'fade-in'
                ? 'opacity-100 translate-y-0 scale-100 blur-none'
                : 'opacity-0 -translate-y-4 scale-95 blur-xs'
            }`}
          >
            {/* Glistening Quote Content in elegant Fraunces serif */}
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-deep-navy font-light leading-relaxed max-w-4xl mx-auto select-none">
              {slide.quote}
            </p>

            {/* User Meta Row */}
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Rating stars */}
              <div className="flex items-center gap-1.5">
                {[...Array(slide.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-cta-coral stroke-cta-coral" />
                ))}
              </div>

              {/* Name Details */}
              <div className="space-y-1">
                <span className="font-serif text-base md:text-lg text-deep-navy font-bold block">
                  {slide.patientName}
                </span>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#7C8782] uppercase bg-white/40 border border-primary-teal/5 px-3 py-1 rounded-full">
                  Verified — {slide.serviceReceived}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* NAV CONTROLS ROW */}
        <div className="flex items-center gap-6 mt-16 z-20">
          
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-primary-teal/15 hover:border-primary-teal/40 bg-white/70 hover:bg-white text-text-primary flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            aria-label="Previous story"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots tracker indicators */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => transitionToSlide(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer h-2 ${
                  currentIndex === idx ? 'w-8 bg-primary-teal' : 'w-2 bg-primary-teal/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-primary-teal/15 hover:border-primary-teal/40 bg-white/70 hover:bg-white text-text-primary flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            aria-label="Next story"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}
