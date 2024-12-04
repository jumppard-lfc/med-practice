import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Switch } from '../Switch';
import { EditableField } from '../EditableField';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  visible: boolean;
  onToggle: () => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function ServiceCard({
  id,
  title,
  description,
  visible,
  onToggle,
  onTitleChange,
  onDescriptionChange,
}: ServiceCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-4 p-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>
      <div className="pl-12 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-4">
            <EditableField
              value={title}
              onChange={onTitleChange}
              className="text-lg font-semibold text-gray-900 mb-2"
              placeholder="Service Name"
            />
            <EditableField
              value={description}
              onChange={onDescriptionChange}
              className="text-sm text-gray-500"
              placeholder="Service Description"
            />
          </div>
          <Switch checked={visible} onChange={onToggle} />
        </div>
      </div>
    </div>
  );
}