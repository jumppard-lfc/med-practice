import React from 'react';
import { EditableField } from '../EditableField';

interface BannerSectionProps {
  text: string;
  onChange: (value: string) => void;
}

export function BannerSection({ text, onChange }: BannerSectionProps) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
      <EditableField
        value={text}
        onChange={onChange}
        multiline
        placeholder="Enter practice updates or announcements..."
        className="text-blue-700"
      />
    </div>
  );
}