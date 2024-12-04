import React from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '../store/useStore';
import { Plus, X } from 'lucide-react';
import type { Prescription } from '../types';

export function PrescriptionForm() {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    },
  });
  const addPrescription = useStore((state) => state.addPrescription);
  const doctor = useStore((state) => state.doctor);
  const patients = useStore((state) => state.patients);

  const medications = watch('medications');

  const onSubmit = (data: any) => {
    const prescription: Prescription = {
      id: crypto.randomUUID(),
      doctorId: doctor?.id || '',
      date: new Date().toISOString(),
      ...data,
    };
    addPrescription(prescription);
    reset();
  };

  const addMedication = () => {
    const newMedications = [
      ...medications,
      { name: '', dosage: '', frequency: '', duration: '' },
    ];
    reset({ ...watch(), medications: newMedications });
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    reset({ ...watch(), medications: newMedications });
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Medications</h3>
          <button
            type="button"
            onClick={addMedication}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Medication
          </button>
        </div>

        {medications.map((_, index) => (
          <div key={index} className="p-4 border rounded-md relative">
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeMedication(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medication Name
                </label>
                <input
                  {...register(`medications.${index}.name`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dosage
                </label>
                <input
                  {...register(`medications.${index}.dosage`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <input
                  {...register(`medications.${index}.frequency`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  {...register(`medications.${index}.duration`)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
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
        Create Prescription
      </button>
    </form>
  );
}