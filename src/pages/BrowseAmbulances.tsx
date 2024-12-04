import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MapPin, Phone, Mail, Calendar, MessageCircle, FileText, Stethoscope } from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';

const services = [
  {
    id: 'appointments',
    name: 'Book Appointment',
    icon: Calendar,
    description: 'Schedule a visit with your doctor',
    formFields: ['preferredDate', 'preferredTime', 'reason']
  },
  {
    id: 'voice',
    name: 'Voice Consultation',
    icon: MessageCircle,
    description: 'Get medical advice through a voice call',
    formFields: ['preferredDate', 'preferredTime', 'symptoms']
  },
  {
    id: 'prescriptions',
    name: 'Request Prescription',
    icon: FileText,
    description: 'Request a prescription renewal',
    formFields: ['medication', 'pharmacy', 'lastRefillDate']
  }
];

export function BrowseAmbulances() {
  const doctors = useStore((state) => state.doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="mb-12">
            {/* Practice Info Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                <p className="text-lg text-blue-600 mb-4">{doctor.specialization}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{doctor.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-5 w-5 mr-2" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-5 w-5 mr-2" />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                  
                  {/* Map View */}
                  <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <MapPin className="h-8 w-8 text-gray-400" />
                      <span className="ml-2 text-gray-500">Map view requires Google Maps API key</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice Updates Banner */}
            {doctor.bannerText && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Stethoscope className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Practice Updates</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>{doctor.bannerText}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {services.filter(service => doctor.enabledFeatures.includes(service.id)).map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setSelectedService(service);
                  }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <service.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {selectedService && selectedDoctor && (
        <ServiceModal
          service={selectedService}
          doctor={selectedDoctor}
          onClose={() => {
            setSelectedService(null);
            setSelectedDoctor(null);
          }}
        />
      )}
    </div>
  );
}