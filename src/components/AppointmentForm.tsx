import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore';
import type { Appointment } from '../types';

export function AppointmentForm() {
  const { register, handleSubmit, reset } = useForm();
  const addAppointment = useStore((state) => state.addAppointment);
  const doctor = useStore((state) => state.doctor);
  const patients = useStore((state) => state.patients);

  const onSubmit = (data: any) => {
    const appointment: Appointment = {
      id: crypto.randomUUID(),
      doctorId: doctor?.id || '',
      ...data,
      status: 'scheduled',
    };
    addAppointment(appointment);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Patient</label>
        <select
          {...register('patientId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          {...register('date')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          {...register('time')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          {...register('notes')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Schedule Appointment
      </button>
    </form>
  );
}