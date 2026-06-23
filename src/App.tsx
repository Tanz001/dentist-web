import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout & Section Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Comparison from './components/Comparison';
import Team from './components/Team';
import FacilityTour from './components/FacilityTour';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

// Register GreenSock Trigger immediately
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isNavShrank, setIsNavShrank] = useState(false);

  // States to coordinate details between panels and the scheduling form
  const [preselectedService, setPreselectedService] = useState('');
  const [preselectedDentist, setPreselectedDentist] = useState('');

  // 1. Core Lenis Smooth Scroll + GSAP Synchronizer ticks
  useEffect(() => {
    // Check user preference for reduced motion before spawning Lenis
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('Reduced motion active. Disabling scroll smoothing.');
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    // One cohesive tick render loop synchronized with GSAP
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    setLenis(lenisInstance);

    // Trigger refreshing triggers on load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // 2. Click Navigation & CTA Anchored Flow helpers
  const handleScrollToBooking = () => {
    if (lenis) {
      lenis.scrollTo('#booking');
    } else {
      const el = document.getElementById('booking');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setPreselectedService(serviceName);
    handleScrollToBooking();
  };

  const handleSelectDentistFromCard = (dentistName: string) => {
    setPreselectedDentist(dentistName);
    handleScrollToBooking();
  };

  const handleClearPreselections = () => {
    setPreselectedService('');
    setPreselectedDentist('');
  };

  return (
    <div id="home" className="min-h-screen bg-bg-base overflow-x-hidden selection:bg-primary-teal selection:text-white">
      
      {/* 1. Brand Navigation Header Bar overlay */}
      <Navigation
        onBookClick={handleScrollToBooking}
        isShrank={isNavShrank}
      />

      {/* 2. Pinned 3D Hero Sequence */}
      <Hero
        onBookClick={handleScrollToBooking}
        onShrinkChange={setIsNavShrank}
      />

      {/* 3. Clinical Calm Trust Manifesto */}
      <Manifesto />

      {/* 4. Specialties & Medical Services Grid */}
      <Services onServiceSelect={handleSelectServiceFromCard} />

      {/* 5. Before & After Translucent Smile Comparison */}
      <Comparison />

      {/* 6. Horizontally-Translating Elite Dentists Team Slider */}
      <Team onDentistSelect={handleSelectDentistFromCard} />

      {/* 7. Quiet Clinic Interior Facility Parallax Tour */}
      <FacilityTour />

      {/* 8. Booking Experience timeline roadmap */}
      <Process />

      {/* 9. Testimonials Carousel and rating slide reviews */}
      <Testimonials />

      {/* 10. Direct Booking Conversion Scheduler */}
      <BookingForm
        preselectedService={preselectedService}
        preselectedDentist={preselectedDentist}
        onClearPreselections={handleClearPreselections}
      />

      {/* 11. Ink Navy Close Information Columns Footer */}
      <Footer />

    </div>
  );
}
