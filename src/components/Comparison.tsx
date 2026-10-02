import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CASES = [
  {
    id: 'veneers',
    label: 'Porcelain Veneers',
    beforeLabel: 'Before',
    afterLabel: 'After · 2 visits',
    beforeImg:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1400',
    afterImg:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1400',
    caption: 'Hand-shaded porcelain for natural translucency and a balanced smile line.',
  },
  {
    id: 'aligners',
    label: 'Clear Aligners',
    beforeLabel: 'Before',
    afterLabel: 'After · 8 months',
    beforeImg:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1400',
    afterImg:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1400',
    caption: 'Custom 3D aligners that gently shift teeth without brackets or wires.',
  },
  {
    id: 'whitening',
    label: 'Smile Brightening',
    beforeLabel: 'Before',
    afterLabel: 'After · 1 session',
    beforeImg:
      'https://images.unsplash.com/photo-1609172117735-9f38db16c352?auto=format&fit=crop&q=80&w=1400',
    afterImg:
      'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=1400',
    caption: 'Professional brightening in a private suite — gentle, controlled, lasting.',
  },
];

export default function Comparison() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [caseIndex, setCaseIndex] = useState(0);
  const [slider, setSlider] = useState(50);
  const [dragging, setDragging] = useState(false);

  const active = CASES[caseIndex];

  const moveTo = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSlider(Math.max(4, Math.min(96, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      if (x != null) moveTo(x);
    };
    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, moveTo]);

  useEffect(() => {
    setSlider(50);
  }, [caseIndex]);

  return (
    <section id="transformation" className="section-pad bg-bg-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(42,157,143,0.12),transparent_55%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-4">
          <span className="kicker text-accent-gold-light">Before & After</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.1]">
            Real results you can{' '}
            <span className="italic text-accent-gold-light">slide through</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Drag the handle to compare — pick a case below to explore different treatments.
          </p>
        </div>

        {/* Case tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CASES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCaseIndex(i)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all cursor-pointer ${
                i === caseIndex
                  ? 'bg-accent-gold text-white'
                  : 'bg-white/5 text-white/55 border border-white/10 hover:border-accent-gold/40 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Slider frame */}
        <div
          ref={frameRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize bg-bg-charcoal touch-none"
          onMouseDown={(e) => {
            setDragging(true);
            moveTo(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            if (e.touches[0]) moveTo(e.touches[0].clientX);
          }}
        >
          {/* After (full base) */}
          <img
            key={`after-${active.id}`}
            src={active.afterImg}
            alt={`${active.label} after`}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
            draggable={false}
          />

          {/* Before (revealed from left) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
          >
            <img
              key={`before-${active.id}`}
              src={active.beforeImg}
              alt={`${active.label} before`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </div>

          {/* Labels */}
          <span className="absolute top-5 left-5 z-20 rounded-full bg-black/55 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white border border-white/15">
            {active.beforeLabel}
          </span>
          <span className="absolute top-5 right-5 z-20 rounded-full bg-accent-gold px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {active.afterLabel}
          </span>

          {/* Divider + handle */}
          <div
            className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
            style={{ left: `${slider}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-bg-charcoal shadow-xl border-2 border-accent-gold">
              <ChevronLeft size={14} className="-mr-0.5" />
              <ChevronRight size={14} className="-ml-0.5" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-white/45 max-w-lg mx-auto leading-relaxed">
          {active.caption}
        </p>
      </div>
    </section>
  );
}
