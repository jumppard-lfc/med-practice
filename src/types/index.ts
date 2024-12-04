export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  medicalHistory: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes?: string;
}

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  password?: string;
  page_sections: PageSections;
}

export interface PageSections {
  order: string[];
  sections: {
    [key: string]: {
      visible: boolean;
      title: string;
      content?: any;
    };
  };
  services: {
    order: string[];
    items: {
      [key: string]: {
        visible: boolean;
        title: string;
        description: string;
      };
    };
  };
}

export interface Section {
  visible: boolean;
  title: string;
  content?: any;
}

export interface Service {
  visible: boolean;
  title: string;
  description: string;
}