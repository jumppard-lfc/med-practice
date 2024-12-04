import React from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ServiceCard } from './ServiceCard';

interface ServicesSectionProps {
  services: {
    id: string;
    title: string;
    description: string;
    visible: boolean;
  }[];
  onServiceUpdate: (
    serviceId: string,
    field: 'title' | 'description' | 'visible',
    value: string | boolean
  ) => void;
}

export function ServicesSection({ services, onServiceUpdate }: ServicesSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <SortableContext
        items={services.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              visible={service.visible}
              onToggle={() => onServiceUpdate(service.id, 'visible', !service.visible)}
              onTitleChange={(value) => onServiceUpdate(service.id, 'title', value)}
              onDescriptionChange={(value) => onServiceUpdate(service.id, 'description', value)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}