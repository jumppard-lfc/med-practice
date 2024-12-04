import { create } from 'zustand';
import type { Patient, Appointment, Prescription, Doctor, PageSections } from '../types';

const DEFAULT_PAGE_SECTIONS: PageSections = {
  order: ['info', 'banner', 'services'],
  sections: {
    info: {
      visible: true,
      title: 'Practice Information',
      content: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
    },
    banner: {
      visible: true,
      title: 'Practice Updates',
      content: '',
    },
    services: {
      visible: true,
      title: 'Available Services',
    },
  },
  services: {
    order: ['appointments', 'voice', 'prescriptions'],
    items: {
      appointments: {
        visible: true,
        title: 'Book Appointment',
        description: 'Schedule a visit with your doctor',
      },
      voice: {
        visible: true,
        title: 'Voice Consultation',
        description: 'Get medical advice through a voice call',
      },
      prescriptions: {
        visible: true,
        title: 'Request Prescription',
        description: 'Request a prescription renewal',
      },
    },
  },
};

interface Store {
  doctor: Doctor | null;
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  setDoctor: (doctor: Doctor) => void;
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, updates: Partial<Doctor>) => Promise<void>;
  addPatient: (patient: Patient) => void;
  addAppointment: (appointment: Appointment) => void;
  addPrescription: (prescription: Prescription) => void;
  toggleFeature: (featureId: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Initial doctors data
const initialDoctors: Doctor[] = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '+1 (555) 123-4567',
    address: '123 Medical Center Dr, New York, NY',
    page_sections: DEFAULT_PAGE_SECTIONS,
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    phone_number: '+1 (555) 987-6543',
    address: '456 Healthcare Ave, Boston, MA',
    page_sections: DEFAULT_PAGE_SECTIONS,
  },
];

export const useStore = create<Store>((set) => ({
  doctor: null,
  doctors: initialDoctors,
  patients: [],
  appointments: [],
  prescriptions: [],
  
  setDoctor: (doctor) => set({ doctor }),
  
  addDoctor: (doctor) => 
    set((state) => ({ doctors: [...state.doctors, doctor] })),
  
  updateDoctor: async (id, updates) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set((state) => ({
      doctors: state.doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, ...updates } : doctor
      ),
      // Also update the logged-in doctor if it's the same one
      doctor: state.doctor?.id === id ? { ...state.doctor, ...updates } : state.doctor,
    }));
  },
  
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [...state.appointments, appointment] })),
  
  addPrescription: (prescription) =>
    set((state) => ({ prescriptions: [...state.prescriptions, prescription] })),
  
  toggleFeature: async (featureId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set((state) => {
      if (!state.doctor) return state;
      
      const pageSections = state.doctor.page_sections;
      const service = pageSections.services.items[featureId];
      
      if (!service) return state;
      
      const updatedPageSections = {
        ...pageSections,
        services: {
          ...pageSections.services,
          items: {
            ...pageSections.services.items,
            [featureId]: {
              ...service,
              visible: !service.visible,
            },
          },
        },
      };
      
      const updatedDoctor = {
        ...state.doctor,
        page_sections: updatedPageSections,
      };
      
      return {
        doctor: updatedDoctor,
        doctors: state.doctors.map((d) =>
          d.id === updatedDoctor.id ? updatedDoctor : d
        ),
      };
    });
  },
  
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const doctor = initialDoctors.find(
      (d) => d.email === email && d.password === password
    );
    
    if (doctor) {
      const { password: _, ...doctorWithoutPassword } = doctor;
      set({ doctor: doctorWithoutPassword });
      return true;
    }
    return false;
  },
  
  logout: () => set({ doctor: null }),
}));