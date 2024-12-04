import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import clsx from 'clsx';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  icon?: keyof typeof Icons;
  placeholder?: string;
  className?: string;
}

export function EditableField({
  value,
  onChange,
  multiline,
  icon,
  placeholder,
  className,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const Icon = icon ? Icons[icon] : null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (isEditing) {
    const Component = multiline ? 'textarea' : 'input';
    return (
      <Component
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !multiline) {
            setIsEditing(false);
          }
          e.stopPropagation();
        }}
        onClick={(e) => e.stopPropagation()}
        autoFocus
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
          className
        )}
        rows={multiline ? 3 : undefined}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'cursor-text flex items-center min-h-[1.5rem] hover:bg-gray-50 rounded px-2 -mx-2 transition-colors',
        !value && 'text-gray-400',
        className
      )}
    >
      {Icon && <Icon className="h-5 w-5 mr-2 flex-shrink-0" />}
      {value || placeholder}
    </div>
  );
}