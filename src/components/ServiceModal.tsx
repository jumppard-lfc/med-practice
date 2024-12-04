import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import type { Doctor } from '../types';

interface ServiceModalProps {
  service: {
    id: string;
    name: string;
    formFields: string[];
  };
  doctor: Doctor;
  onClose: () => void;
}

const fieldLabels: Record<string, string> = {
  preferredDate: 'Preferred Date',
  preferredTime: 'Preferred Time',
  reason: 'Reason for Visit',
  symptoms: 'Describe Your Symptoms',
  medication: 'Medication Name',
  pharmacy: 'Preferred Pharmacy',
  lastRefillDate: 'Last Refill Date'
};

export function ServiceModal({ service, doctor, onClose }: ServiceModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    // Here you would typically send this data to your backend
    console.log('Form submitted:', data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {service.formFields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {fieldLabels[field]}
              </label>
              {field.includes('Date') ? (
                <input
                  type="date"
                  {...register(field, { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : field.includes('Time') ? (
                <input
                  type="time"
                  {...register(field, { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  {...register(field, { required: true })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
              {errors[field] && (
                <p className="mt-1 text-sm text-red-600">This field is required</p>
              )}
            </div>
          ))}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}