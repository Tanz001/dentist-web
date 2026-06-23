export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: 'clinical' | 'cosmetic' | 'preventative';
  iconName: string;
  treatmentTime: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  experienceYears: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  patientName: string;
  serviceReceived: string;
  rating: number;
  bgTone: string; // Background color variation class for quote transitions
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  dentistName: string;
  notes?: string;
}
