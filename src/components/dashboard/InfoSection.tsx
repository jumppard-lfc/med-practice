import React from 'react';
import { EditableField } from '../EditableField';

interface InfoSectionProps {
  name: string;
  phone: string;
  email: string;
  address: string;
  onFieldChange: (field: string, value: string) => void;
}

export function InfoSection({
  name,
  phone,
  email,
  address,
  onFieldChange,
}: InfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
      <div className="flex items-center space-x-6 mb-6">
        <EditableField
          value={name}
          onChange={(value) => onFieldChange('name', value)}
          className="text-2xl font-bold text-gray-900"
          placeholder="Practice Name"
        />
      </div>
      
      <div className="space-y-4">
        <EditableField
          value={phone}
          onChange={(value) => onFieldChange('phone', value)}
          icon="Phone"
          placeholder="Phone number"
        />
        <EditableField
          value={email}
          onChange={(value) => onFieldChange('email', value)}
          icon="Mail"
          placeholder="Email address"
        />
        <EditableField
          value={address}
          onChange={(value) => onFieldChange('address', value)}
          icon="MapPin"
          placeholder="Practice address"
        />
      </div>
    </div>
  );
}