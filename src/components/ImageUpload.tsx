import React from 'react';
import { Image } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="relative cursor-pointer group">
      <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        {value ? (
          <img src={value} alt="Logo" className="h-full w-full object-cover" />
        ) : (
          <Image className="h-8 w-8 text-gray-400" />
        )}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
        <span className="text-white text-sm">Change Logo</span>
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </label>
  );
}