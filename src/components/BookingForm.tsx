import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarDays, CheckCircle, ShieldAlert, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';
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
      color: Math.random() > 0.5 ? '#C4A962' : '#8BA399',
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
      className="py-28 md:py-40 bg-bg-ivory relative overflow-hidden px-6"
    >
      {/* Decorative smile-curve separator at the top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] h-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-bg-charcoal fill-current"
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
            className="lg:col-span-5 bg-bg-cream border border-accent-gold/15 rounded-[36px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-accent-gold-light/10 to-transparent pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <span className="kicker flex items-center gap-2">
                <CalendarDays size={13} />
                Schedule Your Visit
              </span>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-text-primary font-light leading-tight">
                  Your journey to{' '}
                  <span className="italic">radiance</span>
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  Reserve your private suite session. We guard patient buffers carefully — you never wait in a crowded lobby.
                </p>
              </div>

              <div className="w-full aspect-[4/3] rounded-3xl bg-bg-warm border border-accent-gold/10 overflow-hidden relative shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor advising happy patient"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 sepia-[0.08]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-charcoal/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                  <p className="text-sm text-white font-serif">Private consultation suite</p>
                  <p className="text-xs text-white/60 mt-0.5">Warm, unhurried, entirely yours</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-accent-gold/15 mt-8 space-y-4 relative z-10">
              <h4 className="text-xs tracking-widest text-text-muted uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                Your Appointments ({activeBookings.length})
              </h4>

              {activeBookings.length === 0 ? (
                <div className="p-4 rounded-2xl bg-bg-ivory border border-dashed border-accent-gold/15 flex items-center gap-3">
                  <ShieldAlert size={16} className="text-text-muted shrink-0" />
                  <p className="text-sm text-text-muted leading-relaxed">No upcoming consultations. Complete the form to reserve your visit.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
                  {activeBookings.map((booking, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-bg-ivory border border-accent-gold/10 flex items-start justify-between gap-3 hover:border-accent-gold/30 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={13} className="text-accent-sage-deep" />
                          <span className="text-sm font-medium text-text-primary">{booking.service}</span>
                        </div>
                        <p className="text-xs text-text-muted leading-relaxed">
                          Patient: <strong className="text-text-primary">{booking.name}</strong><br />
                          Specialist: <strong className="text-text-primary">{booking.dentistName}</strong><br />
                          Date: <span className="text-accent-gold font-mono">{booking.preferredDate}</span> ({booking.preferredTime})
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(idx)}
                        className="text-[10px] tracking-wider uppercase text-accent-gold hover:bg-accent-gold/5 px-2 py-1 rounded border border-accent-gold/15 transition-colors shrink-0 cursor-pointer"
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
            className="lg:col-span-7 bg-bg-ivory border border-accent-gold/10 p-8 md:p-12 rounded-[36px] shadow-lg flex flex-col justify-center relative"
          >
            
            {/* SUCCESS SHEET VIEW */}
            {isSubmitted ? (
              <div className="space-y-8 text-center py-8">
                <div className="w-20 h-20 rounded-full bg-accent-gold/10 border-2 border-accent-gold flex items-center justify-center text-accent-gold mx-auto">
                  <UserCheck size={36} />
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] tracking-widest text-accent-sage-deep uppercase bg-bg-cream px-4 py-1.5 rounded-full border border-accent-gold/15">
                    Registration Complete
                  </span>
                  <h3 className="text-3xl font-serif text-text-primary">We are preparing your visit</h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-md mx-auto">
                    Thank you, <strong className="text-text-primary">{formData.name}</strong>. Your reservation for <strong className="text-text-primary">{formData.service}</strong> with <strong className="text-text-primary">{formData.dentistName}</strong> is confirmed. A private coordinator will reach out shortly.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-6 rounded-2xl bg-bg-cream border border-accent-gold/15 text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-accent-gold/10 pb-2">
                    <span className="text-text-muted uppercase">Type</span>
                    <span className="text-text-primary font-medium">Private Consultation</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-gold/10 pb-2">
                    <span className="text-text-muted uppercase">Date</span>
                    <span className="text-accent-gold font-medium">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-accent-gold/10 pb-2">
                    <span className="text-text-muted uppercase">Time</span>
                    <span className="text-text-primary font-medium">{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted uppercase">Contact</span>
                    <span className="text-text-primary">{formData.phone}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleResetForm}
                    className="bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/15 text-xs font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all cursor-pointer"
                  >
                    Schedule Another
                  </button>
                  <a
                    href="#home"
                    className="bg-accent-gold text-white hover:bg-accent-gold/90 text-xs font-semibold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-1 shadow-sm"
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
                  <h3 className="text-2xl font-serif text-text-primary">Reserve Your Consultation</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Share your details and we'll match you with the right specialist.
                  </p>
                </div>

                {/* Inputs Strid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Name Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-name" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Full Name <span className="text-accent-gold">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Victoria Sterling"
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-email" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Email Address <span className="text-accent-gold">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. victoria@gmail.com"
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5 animate-field">
                    <label htmlFor="form-phone" className="text-[10px] font-mono tracking-wider uppercase text-text-muted block">
                      Phone Number <span className="text-accent-gold">*</span>
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. (555) 0192-384"
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3 outline-none transition-colors"
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
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3.5 outline-none transition-colors cursor-pointer"
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
                      Preferred Date <span className="text-accent-gold">*</span>
                    </label>
                    <input
                      id="form-date"
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3 outline-none transition-colors cursor-pointer"
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
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3.5 outline-none transition-colors cursor-pointer"
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
                              ? 'border-accent-gold bg-accent-gold/10 shadow-sm'
                              : 'border-accent-gold/15 hover:border-accent-gold/30 bg-bg-cream'
                          }`}
                        >
                          <Stethoscope size={14} className={formData.dentistName === doc ? 'text-accent-gold' : 'text-text-muted'} />
                          <span className="text-sm font-medium text-text-primary">{doc.split(' ')[1] + ' ' + doc.split(' ')[2]}</span>
                          <span className="text-[10px] text-text-muted">{doc.startsWith('Dr. Beatrice') ? 'Ceramic Art' : doc.startsWith('Dr. Marcus') ? 'Aligners' : 'Pediatric'}</span>
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
                      className="w-full text-sm border border-accent-gold/20 hover:border-accent-gold/40 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold bg-bg-cream rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                    />
                  </div>

                </div>

                {/* Submit Row */}
                <div className="pt-6 border-t border-accent-gold/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-field">
                  <div className="flex items-center gap-2.5 text-xs text-text-muted select-none">
                    <CheckCircle size={14} className="text-accent-sage-deep shrink-0" />
                    <span>Your data is protected under clinical privacy standards.</span>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                  >
                    <span>Confirm Booking</span>
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
