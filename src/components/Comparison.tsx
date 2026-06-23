import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Eye, ShieldCheck, Orbit, UserCheck, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideBarRef = useRef<HTMLDivElement>(null);
  const afterImageRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);

  // Sync scroll positioning to the slider reveal (scroll-scrubbed mask reveal)
  useEffect(() => {
    if (!containerRef.current) return;

    // A GSAP ScrollTrigger to automatically shift the clip-path slider on scroll
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.0,
      onUpdate: (self) => {
        // Only override if the user is not actively dragging the slider manually
        if (!isDragging) {
          // Map progress 0-1 to slider position 10% - 90%
          const percentage = 15 + self.progress * 70;
          setSliderPosition(percentage);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isDragging]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <section
      id="transformation"
      className="py-24 md:py-36 bg-deep-navy text-white relative overflow-hidden"
    >
      {/* Decorative stars / ambient grid mapping */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e7f7308_1px,transparent_1px),linear-gradient(to_bottom,#1e7f7308_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-highlight-glow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 md:mb-24 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-teal/10 border border-primary-teal/20 rounded-full mb-3">
            <Sparkles size={12} className="text-highlight-glow animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-highlight-glow uppercase">
              Micro-Layer Porcelain Veneers
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight leading-tight">
            Witness the art of <br />
            clinical <span className="italic font-serif font-normal text-highlight-glow">transformation</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-muted/80 max-w-lg mx-auto leading-relaxed">
            Drag the central slider below to preview the shift from initial diagnostic consultation to a radiant, hand-sculpted porcelain smile.
          </p>
        </div>

        {/* 2-Column Split: Visual comparison on left / Side details & doctor module on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Complete Interactive Mask Split Slider */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={containerRef}
              className="w-full max-w-[620px] aspect-[4/3] rounded-[32px] overflow-hidden border-2 border-primary-teal/20 shadow-2xl relative select-none cursor-ew-resize bg-[#212f35]"
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
            >
              
              {/* "BEFORE" Image Layer (Diagnostics / Consultation Stage) */}
              <div className="absolute inset-0 w-full h-full">
                {/* Backgound image representation */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
                    alt="Careful Dental Evaluation Consultation"
                    className="w-full h-full object-cover object-center brightness-90 contrast-95"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle slate overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                </div>
                
                {/* Floating clinical labels */}
                <div className="absolute bottom-6 left-6 z-10 space-y-1 text-left">
                  <span className="px-3 py-1 bg-amber-500/80 backdrop-blur-sm rounded-full text-[9px] font-mono tracking-widest text-white uppercase inline-block">
                    01 . Diagnostics
                  </span>
                  <p className="text-base font-serif font-light text-white leading-none">Initial Dental Alignment Assessment</p>
                  <p className="text-[10px] text-white/60 font-mono">Detailed 3D analysis & mock modeling</p>
                </div>
              </div>

              {/* "AFTER" Image Layer (Glistening Restored Smile Outcome) */}
              <div
                ref={afterImageRef}
                className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transition-all duration-75"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                {/* Background image representation */}
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
                    alt="Pristine Perfect Restored Smile"
                    className="w-full h-full object-cover object-center brightness-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Beautiful emerald-teal overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-teal/90 via-primary-teal/30 to-transparent" />
                </div>
                
                {/* Floating clinical labels */}
                <div className="absolute bottom-6 left-6 z-10 space-y-1 text-left pointer-events-auto">
                  <span className="px-3 py-1 bg-[#34D399] rounded-full text-[9px] font-mono tracking-widest text-deep-navy uppercase inline-block font-bold">
                    02 . Completed Restorative Art
                  </span>
                  <p className="text-base font-serif font-light text-white leading-none">Glistening Translucent Porcelain Veneers</p>
                  <p className="text-[10px] text-highlight-glow font-mono">Restored confidence and structural balance</p>
                </div>

                {/* State Tag */}
                <span className="absolute bottom-6 right-6 px-4 py-1.5 bg-primary-teal/95 rounded-full border border-highlight-glow/20 text-[10px] font-mono tracking-widest text-highlight-glow uppercase z-10 pointer-events-auto">
                  Wellness Restored
                </span>
              </div>

              {/* The Sliding Handlebar Divider */}
              <div
                ref={slideBarRef}
                className="absolute top-0 bottom-0 w-[3px] bg-highlight-glow shadow-[0_0_15px_rgba(191,227,240,0.8)] pointer-events-none transition-all duration-75"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center dial grip circle */}
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-10 h-10 rounded-full bg-primary-teal hover:bg-highlight-glow hover:text-deep-navy border-2 border-highlight-glow flex items-center justify-center text-white transition-all cursor-ew-resize shadow-lg">
                  <Eye size={16} className="animate-pulse" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Restorative Material Details & Model Morph */}
          <div className="lg:col-span-5 space-y-8 relative z-10">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-primary-teal uppercase block">
                How customization shifts geometry
              </span>
              <h3 className="text-2xl font-serif text-white font-light">
                Porcelain that breathes <span className="italic">light</span>
              </h3>
              <p className="text-xs text-text-muted/90 leading-relaxed">
                Standard dental plates reflect light flatly, resulting in an artificial, chalky smile. Our clinic molds individual bio-ceramic restorations with an integrated translucency grid that allows light to penetrate up to 1.2mm, matching the depth profile of real teeth.
              </p>
            </div>

            {/* Micro details with lists */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary-teal/20 flex items-center justify-center text-primary-teal shrink-0 mt-0.5">
                  <ShieldCheck size={12} className="text-highlight-glow" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Refractive Index Alignment</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed">Adjusting veneer quartz layers to fully align with standard enamel IOR benchmarks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary-teal/20 flex items-center justify-center text-primary-teal shrink-0 mt-0.5">
                  <ShieldCheck size={12} className="text-highlight-glow" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Bespoke Gingival Transition</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed">Soft borders mapped precisely around your unique gum boundary lines to prevent irritation.</p>
                </div>
              </div>
            </div>

            {/* Expert Diagnostic advisory card instead of small tooth */}
            <div className="bg-[#142930] p-5 rounded-2xl border border-primary-teal/10 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-primary-teal/5 rounded-full blur-xl pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=300"
                alt="Dr. Alistair Vance, Lead Clinical Designer"
                className="w-14 h-14 rounded-full object-cover object-center border border-primary-teal/30 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1 text-left">
                <h5 className="font-serif text-sm text-white">Dr. Alistair Vance</h5>
                <p className="text-[10px] text-primary-teal font-mono tracking-widest uppercase">LEAD CLINICAL DESIGNER</p>
                <p className="text-[10px] text-text-muted leading-relaxed">“Every ceramic layout matches the natural bio-geometry of our clients.”</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
