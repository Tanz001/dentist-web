import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Activity, Smile, Heart, Star } from 'lucide-react';

interface DoctorPatientProps {
  scrollProgress?: number;
}

export default function DoctorPatientDisplay({ scrollProgress = 0 }: DoctorPatientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalized coordinates: -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax translation styles
  const rotateX = mousePos.y * -15; // tilting down on mouse down
  const rotateY = mousePos.x * 15;  // tilting sideways
  
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[350px] sm:min-h-[500px] flex items-center justify-center overflow-hidden p-4 sm:p-8 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
    >
      {/* Immersive glow background matched to our soft teal/coral luxury palette */}
      <div 
        className="absolute inset-0 bg-radial from-primary-teal/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl scale-125 transition-transform duration-700" 
        style={{
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`
        }}
      />
      
      {/* 3D Interactive Framed Card */}
      <div
        className="relative w-full max-w-4xl aspect-[16/10] rounded-[32px] overflow-hidden border border-white/40 bg-white/40 backdrop-blur-md shadow-2xl transition-all duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Parallax Layer 1: Background Warm Light leak / Ambient Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-primary-teal/20 via-deep-navy/90 to-cta-coral/20 transition-all duration-500"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(1.1)`,
          }}
        />

        {/* Parallax Layer 2: Main Warm Doctor-Patient Consulting Image */}
        <div 
          className="absolute inset-0 transition-all duration-500 overflow-hidden mix-blend-overlay opacity-80"
          style={{
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px) scale(1.05)`,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
            alt="Expert Dentist and Happy Smiling Patient"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Additional Beautiful overlay layer for secondary high key dentist interior shot */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none opacity-[0.45]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200')",
            transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px) scale(1.15)`,
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Parallax Layer 3: Glassmorphism details and HUD accents */}
        <div 
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 text-white z-10"
          style={{
            transform: `translateZ(30px)`,
          }}
        >
          {/* Top HUD Row */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-highlight-glow uppercase">
                Aura Clinical Wellness
              </span>
            </div>
            
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all">
                <Smile size={14} className="text-highlight-glow" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all">
                <Heart size={14} className="text-cta-coral" />
              </span>
            </div>
          </div>

          {/* Bottom Floating Card info with patient trust scores */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-12 self-stretch">
            
            <div className="space-y-2 text-left max-w-sm bg-black/50 backdrop-blur-md p-5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-1 text-cta-coral">
                <Star size={12} className="fill-current" />
                <Star size={12} className="fill-current" />
                <Star size={12} className="fill-current" />
                <Star size={12} className="fill-current" />
                <Star size={12} className="fill-current" />
                <span className="text-[10px] font-mono text-white/90 ml-1.5 font-bold">5.0 VIP Care</span>
              </div>
              <h3 className="text-sm sm:text-base font-serif text-highlight-glow">
                “A warm, supportive, entirely stressless dental approach”
              </h3>
              <p className="text-[10px] text-white/60 font-mono">
                — Elena S., Beverly Hills Resident
              </p>
            </div>

            {/* Live consultation queue tracker */}
            <div className="hidden sm:flex items-center gap-3 bg-white text-deep-navy px-4 py-2.5 rounded-2xl shadow-lg border border-primary-teal/10">
              <div className="w-8 h-8 rounded-full bg-primary-teal/10 flex items-center justify-center text-primary-teal">
                <Activity size={15} className="animate-pulse" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[8px] tracking-widest text-text-muted uppercase block leading-none">PREDICTIVE WAIT</span>
                <span className="text-xs font-bold text-deep-navy leading-none">Immediate Entry</span>
              </div>
            </div>

          </div>
        </div>

        {/* Elegant border light streak shimmer */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-highlight-glow/60 to-transparent animate-pulse"
          style={{
            transform: `translate(${mousePos.x * 20}px, 0px)`
          }}
        />
      </div>
    </div>
  );
}
