import { useEffect, useRef, useState } from 'react';

const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920',
    alt: 'Warm dental consultation in a luxury clinic',
  },
  {
    src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1920',
    alt: 'Serene modern dental treatment suite',
  },
];

const ROTATE_MS = 6000;

interface DoctorPatientProps {
  scrollProgress?: number;
}

export default function DoctorPatientDisplay({ scrollProgress = 0 }: DoctorPatientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const parallaxX = mousePos.x * 12;
  const parallaxY = mousePos.y * 12;
  const scale = 1.08 - scrollProgress * 0.06;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${scale})`,
        }}
      >
        {HERO_IMAGES.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1800ms] ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-bg-charcoal/80 via-bg-charcoal/45 to-bg-charcoal/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal/70 via-transparent to-bg-charcoal/25 pointer-events-none" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 flex items-center gap-2 pointer-events-none">
        {HERO_IMAGES.map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === activeIndex ? 'w-8 bg-accent-gold' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
