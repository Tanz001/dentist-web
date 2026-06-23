import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CalendarDays, CheckCircle, ShieldAlert, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
import { BookingFormData } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface BookingFormProps {
  preselectedService: string;
  preselectedDentist: string;
  onClearPreselections: () => void;
}

export default function BookingForm({
  preselectedService,
  preselectedDentist,
  onClearPreselections,
}: BookingFormProps) {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: 'Wellness Cleanings',
    preferredDate: '',
    preferredTime: '09:00 AM',
    dentistName: 'Dr. Beatrice Rostova',
    notes: '',
  });

  const [activeBookings, setActiveBookings] = useState<BookingFormData[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confettiDots, setConfettiDots] = useState<{ id: number; x: number; y: number; size: number; color: string; scale: number }[]>([]);

  // Pre-populate service/dentist triggers from other sections
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedDentist) {
      setFormData((prev) => ({ ...prev, dentistName: preselectedDentist }));
    }
  }, [preselectedDentist]);

  // Load active booking schedules from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_dental_bookings');
      if (stored) {
        setActiveBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse active bookings', e);
    }
  }, []);

  // Set up ScrollTrigger stagger animations for input fields
  useEffect(() => {
    if (!rightColumnRef.current) return;

    const inputs = rightColumnRef.current.querySelectorAll('.animate-field');

    const trigger = gsap.fromTo(
      inputs,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      trigger.scrollTrigger?.kill();
    };
  }, []);

  const triggerConfettiCelebration = () => {
    const dots = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // percentage 10% - 90%
      y: 70 + Math.random() * 30, // vertical starting line bottom
      size: 6 + Math.random() * 8, // diameter in pixels
      color: Math.random() > 0.5 ? '#1E7F73' : '#FF7A59', // Teal or Coral
      scale: 0.5 + Math.random() * 0.8,
    }));
    setConfettiDots(dots);
    
    // Dissolve confetti after 4 seconds
    setTimeout(() => {
      setConfettiDots([]);
    }, 4500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validity guarding
    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
      alert('Please fill out all standard contact and date schedule parameters.');
      return;
    }

    const updated = [formData, ...activeBookings];
    setActiveBookings(updated);
    
    try {
      localStorage.setItem('aura_dental_bookings', JSON.stringify(updated));
    } catch (err) {
      console.error('Storage quota overflow', err);
    }

    setIsSubmitted(true);
    triggerConfettiCelebration();
    onClearPreselections();
  };

  const handleCancelBooking = (idx: number) => {
    const filtered = activeBookings.filter((_, i) => i !== idx);
    setActiveBookings(filtered);
    localStorage.setItem('aura_dental_bookings', JSON.stringify(filtered));
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Wellness Cleanings',
      preferredDate: '',
      preferredTime: '09:00 AM',
      dentistName: 'Dr. Beatrice Rostova',
      notes: '',
    });
  };

  const serviceCategories = [
    'Wellness Cleanings',
    'Cosmetic Artistry',
    'Custom 3D Aligners',
    'Porcelain Implants',
    'Gentle Pediatric Care',
    'Emergency Care',
    'Clinical Consult',
  ];

  const dentists = [
    'Dr. Beatrice Rostova',
    'Dr. Marcus Vance',
    'Dr. Alena Thorne',
  ];

  return (
    <section
      ref={formSectionRef}
      id="booking"
      className="py-24 md:py-36 bg-bg-base relative overflow-hidden px-6"
    >
      {/* Decorative smile-curve separator at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-deep-navy fill-current"
        >
          <path d="M0,0 C300,50 900,50 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Celebration Confetti Canvas overlay */}
        {confettiDots.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            {confettiDots.map((dot) => (
              <span
                key={dot.id}
                className="absolute rounded-full animate-float-fade"
                style={{
                  left: `${dot.x}%`,
                  bottom: `${100 - dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  backgroundColor: dot.color,
                  transform: `scale(${dot.scale})`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMN 1: Calming visual / active bookings panel (lg:col-span-5) */}
          <div
            ref={leftColumnRef}
            className="lg:col-span-5 bg-bg-alt/60 border border-primary-teal/10 rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient grid overlay */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-highlight-glow/10 to-transparent pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 border border-primary-teal/15 rounded-full">
                <CalendarDays size={13} className="text-primary-teal" />
                <span className="text-[10px] font-mono tracking-widest text-primary-teal uppercase">Schedule Dashboard</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-deep-navy font-light leading-tight">
                  Your journey to <br />
                  reconstructed <span className="italic">radiance</span>
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Reserve your custom suite session. We strictly guard patient buffers, ensuring you never wait in a crowded lobby. Feel completely reassured.
                </p>
              </div>

              {/* Immersive Doctor and Patient consultation visual card */}
              <div className="w-full aspect-[4/3] rounded-3xl bg-white/40 border border-white/80 overflow-hidden relative shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor Rostova advising happy patient"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual indicator overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#FAF8F4]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary-teal/10">
                  <span className="w-2 h-2 rounded-full bg-cta-coral animate-pulse" />
                  <span className="font-mono text-[8px] text-deep-navy font-bold uppercase tracking-wider">Clinical Space Live</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                  <span className="text-[10px] uppercase font-bold text-highlight-glow font-mono tracking-wider">LUMIA DIAGNOSTICK PANEL</span>
                  <p className="text-xs text-white font-serif leading-none mt-0.5">Custom Smile Alignment & Restoration Preparation</p>
                </div>
              </div>
            </div>

            {/* List of upcoming appointments scheduled locally */}
            <div className="pt-8 border-t border-primary-teal/15 mt-8 space-y-4 relative z-10">
              <h4 className="text-xs font-mono tracking-widest text-[#7C8782] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-teal" />
                Your Registered Appointments ({activeBookings.length})
              </h4>

              {activeBookings.length === 0 ? (
                <div className="p-4 rounded-2xl bg-white/20 border border-dashed border-primary-teal/10 flex items-center gap-3">
                  <ShieldAlert size={16} className="text-text-muted shrink-0" />
                  <p className="text-[10px] text-text-muted leading-relaxed">No upcoming consultation slots active. Fill out the scheduler to register your visit plan.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                  {activeBookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-primary-teal/10 flex items-start justify-between gap-3 shadow-xs hover:border-cta-coral transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-primary-teal" />
                          <span className="text-[11px] font-bold text-deep-navy">{booking.service}</span>
                        </div>
                        <p className="text-[10px] text-text-muted font-light leading-relaxed">
                          Patient: <strong className="text-text-primary font-medium">{booking.name}</strong><br />
                          Specialist: <strong className="text-text-primary font-medium">{booking.dentistName}</strong><br />
                          Date: <span className="text-primary-teal font-medium font-mono">{booking.preferredDate}</span> ({booking.preferredTime})
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(idx)}
                        className="text-[9px] font-mono tracking-wider uppercase text-cta-coral hover:bg-cta-coral/5 px-2 py-1 rounded border border-cta-coral/10 transition-colors shrink-0"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* COLUMN 2: Friendly Consultation Booking Form Card (lg:col-span-7) */}
          <div
            ref={rightColumnRef}
            className="lg:col-span-7 bg-white border border-primary-teal/5 p-8 md:p-12 rounded-[36px] shadow-xl flex flex-col justify-center relative"
          >
            
            {/* SUCCESS SHEET VIEW */}
            {isSubmitted ? (
              <div className="space-y-8 text-center py-8">
                <div className="w-20 h-20 rounded-full bg-primary-teal/5 border-2 border-primary-teal flex items-center justify-center text-primary-teal mx-auto animate-bounce">
                  <UserCheck size={36} />
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#1E7F73] uppercase bg-bg-alt px-4 py-1.5 rounded-full border border-primary-teal/10">
                    Registration Completed Successfully
                  </span>
                  <h3 className="text-3xl font-serif text-deep-navy">We are preparing your visit</h3>
                  <p className="text-xs text-text-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-text-primary font-bold">{formData.name}</strong>. Your wellness reservation for <strong className="text-text-primary font-bold">{formData.service}</strong> with <strong className="text-text-primary font-bold">{formData.dentistName}</strong> is verified. A private clinical coordinator will reach out to your line shortly.
                  </p>
                </div>

                {/* Patient Summary Slip */}
                <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#FAF8F4] border border-primary-teal/10 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-primary-teal/5 pb-2">
                    <span className="text-text-muted uppercase">TICKET TYPE:</span>
                    <span className="text-deep-navy font-bold">VIP CONSULTATION</span>
                  </div>
                  <div className="flex justify-between border-b border-primary-teal/5 pb-2">
                    <span className="text-text-muted uppercase">APPOINTMENT DATE:</span>
                    <span className="text-primary-teal font-bold">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary-teal/5 pb-2">
                    <span className="text-text-muted uppercase">PREFERRED TIME:</span>
                    <span className="text-deep-navy font-bold">{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted uppercase">TRIAGE CONTACT:</span>
                    <span className="text-deep-navy">{formData.phone}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="bg-primary-teal/5 text-primary-teal hover:bg-primary-teal/10 text-xs font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all cursor-pointer"
                  >
                    Schedule Another
                  </button>
                  <a
                    href="#home"
                    className="bg-cta-coral text-white hover:bg-cta-coral/95 text-xs font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-1 shadow-md hover:scale-[1.03]"
                  >
                    <span>Back to Top</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ) : (
              
              /* SENSATIONAL BOOKING FORM INTERFACE - Standard inputs */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2 animate-field">
                  <h3 className="text-2xl font-serif text-deep-navy">Bespoke Reservation Scheduler</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Please provide your contact variables to lock in custom dental consultation matching.
                  </p>
                </div>

                {/* Inputs Strid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Name Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-name" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Full Legal Name <span className="text-cta-coral">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-email" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Email Address <span className="text-cta-coral">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. victoria@gmail.com"
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-phone" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Phone Number <span className="text-cta-coral">*</span>
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. (555) 0192-384"
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  {/* Service Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-service" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Treatment Interest
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3.5 outline-none bg-white transition-colors cursor-pointer"
                    >
                      {serviceCategories.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-date" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Preferred Booking Date <span className="text-cta-coral">*</span>
                    </label>
                    <input
                      id="form-date"
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3 outline-none transition-colors cursor-pointer"
                    />
                  </div>

                  {/* Time Select */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-time" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Preferred Time Slot
                    </label>
                    <select
                      id="form-time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3.5 outline-none bg-white transition-colors cursor-pointer"
                    >
                      <option value="08:00 AM — Morning session">08:00 AM — Morning session</option>
                      <option value="10:00 AM — Morning session">10:00 AM — Morning session</option>
                      <option value="01:00 PM — Midday slot">01:00 PM — Midday slot</option>
                      <option value="03:00 PM — Afternoon slot">03:00 PM — Afternoon slot</option>
                      <option value="05:00 PM — Twilight slot">05:00 PM — Twilight slot</option>
                    </select>
                  </div>

                  {/* Specialist Input */}
                  <div className="space-y-1.5 animate-field md:col-span-2">
                    <label htmlFor="form-doctor" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Preferred Specialist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {dentists.map((doc) => (
                        <div
                          key={doc}
                          onClick={() => setFormData((prev) => ({ ...prev, dentistName: doc }))}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer select-none flex flex-col items-center justify-center gap-1 ${
                            formData.dentistName === doc
                              ? 'border-primary-teal bg-primary-teal/5 shadow-sm'
                              : 'border-neutral-200 hover:border-primary-teal/30 bg-neutral-50/50'
                          }`}
                        >
                          <Stethoscope size={14} className={formData.dentistName === doc ? 'text-primary-teal' : 'text-text-muted'} />
                          <span className="text-[11px] font-semibold text-deep-navy">{doc.split(' ')[1] + ' ' + doc.split(' ')[2]}</span>
                          <span className="text-[9px] text-[#7C8782]">{doc.startsWith('Dr. Beatrice') ? 'Ceramic Art' : doc.startsWith('Dr. Marcus') ? 'Aligners' : 'Pediatric'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes Area */}
                  <div className="space-y-1.5 animate-field md:col-span-2">
                    <label htmlFor="form-notes" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Do you have specific anxieties, details, or questions? (Optional)
                    </label>
                    <textarea
                      id="form-notes"
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Let us know. e.g. 'I am very anxiety-sensitive to high drill frequencies' or 'Interested in veneers pricing'"
                      className="w-full text-sm border border-neutral-200 hover:border-primary-teal/30 focus:border-primary-teal focus:ring-1 focus:ring-primary-teal rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                    />
                  </div>

                </div>

                {/* Submit Row */}
                <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-field">
                  <div className="flex items-center gap-2.5 text-[10px] text-text-muted select-none">
                    <CheckCircle size={14} className="text-primary-teal shrink-0" />
                    <span>Your data is protected under robust clinical medical rules.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-cta-coral text-white hover:bg-cta-coral/95 text-xs font-bold tracking-wider uppercase px-8 py-4 rounded-full transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-md hover:scale-[1.03] hover:shadow-xl active:scale-[0.98] animate-pulse"
                  >
                    <span>Secure Booking Ticket</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
