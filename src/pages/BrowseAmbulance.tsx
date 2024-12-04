import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar, MessageCircle, FileText } from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { useDoctor } from '../hooks/useDoctor';

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

export function BrowseAmbulance() {
  const { doctorId } = useParams();
  const { doctor, loading, error } = useDoctor(doctorId || '');
  const [selectedService, setSelectedService] = useState<any>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Practice not found</p>
      </div>
    );
  }

  const { page_sections } = doctor;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {page_sections.order.map((sectionId) => {
          const section = page_sections.sections[sectionId];
          if (!section?.visible) return null;

          switch (sectionId) {
            case 'info':
              return (
                <div key={sectionId} className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. {doctor.first_name} {doctor.last_name}
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{doctor.address}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-5 w-5 mr-2" />
                          <span>{doctor.phone_number}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-5 w-5 mr-2" />
                          <span>{doctor.email}</span>
                        </div>
                      </div>
                      
                      <div className="h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doctor.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-700"
                        >
                          <MapPin className="h-6 w-6 mr-2" />
                          <span>View on Google Maps</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );

            case 'banner':
              return section.content ? (
                <div key={sectionId} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                  <p className="text-blue-700">{section.content}</p>
                </div>
              ) : null;

            case 'services':
              return (
                <div key={sectionId} className="grid md:grid-cols-3 gap-6">
                  {page_sections.services.order
                    .filter(serviceId => page_sections.services.items[serviceId].visible)
                    .map((serviceId) => {
                      const serviceConfig = page_sections.services.items[serviceId];
                      const serviceInfo = services.find(s => s.id === serviceId);
                      if (!serviceInfo) return null;

                      return (
                        <button
                          key={serviceId}
                          onClick={() => setSelectedService({ ...serviceInfo, ...serviceConfig })}
                          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left"
                        >
                          <serviceInfo.icon className="h-8 w-8 text-blue-600 mb-3" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {serviceConfig.title}
                          </h3>
                          <p className="text-sm text-gray-500">{serviceConfig.description}</p>
                        </button>
                      );
                    })}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {selectedService && doctor && (
        <ServiceModal
          service={selectedService}
          doctor={doctor}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}