import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Eye, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';
import { SectionWrapper } from '../components/dashboard/SectionWrapper';
import { InfoSection } from '../components/dashboard/InfoSection';
import { BannerSection } from '../components/dashboard/BannerSection';
import { ServicesSection } from '../components/dashboard/ServicesSection';
import type { PageSections } from '../types';

const SECTION_INFO = {
  info: {
    title: 'Practice Information',
    type: 'info',
  },
  banner: {
    title: 'Practice Updates',
    type: 'banner',
  },
  services: {
    title: 'Available Services',
    type: 'services',
  },
};

export function DoctorDashboard() {
  const doctor = useStore((state) => state.doctor);
  const updateDoctor = useStore((state) => state.updateDoctor);
  const [unsavedChanges, setUnsavedChanges] = useState<PageSections | null>(
    doctor?.page_sections || null
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setUnsavedChanges((prev) => {
        if (!prev) return null;
        
        if (active.id.startsWith('section-')) {
          const oldIndex = prev.order.indexOf(active.id.replace('section-', ''));
          const newIndex = prev.order.indexOf(over.id.replace('section-', ''));
          return {
            ...prev,
            order: arrayMove(prev.order, oldIndex, newIndex),
          };
        } else {
          const oldIndex = prev.services.order.indexOf(active.id);
          const newIndex = prev.services.order.indexOf(over.id);
          return {
            ...prev,
            services: {
              ...prev.services,
              order: arrayMove(prev.services.order, oldIndex, newIndex),
            },
          };
        }
      });
    }
  };

  const handleInfoChange = (field: string, value: string) => {
    setUnsavedChanges((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        sections: {
          ...prev.sections,
          info: {
            ...prev.sections.info,
            content: {
              ...prev.sections.info.content,
              [field]: value,
            },
          },
        },
      };
    });
  };

  const handleBannerChange = (value: string) => {
    setUnsavedChanges((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        sections: {
          ...prev.sections,
          banner: {
            ...prev.sections.banner,
            content: value,
          },
        },
      };
    });
  };

  const handleServiceUpdate = (
    serviceId: string,
    field: 'title' | 'description' | 'visible',
    value: string | boolean
  ) => {
    setUnsavedChanges((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        services: {
          ...prev.services,
          items: {
            ...prev.services.items,
            [serviceId]: {
              ...prev.services.items[serviceId],
              [field]: value,
            },
          },
        },
      };
    });
  };

  const handleSave = async () => {
    if (!unsavedChanges || !doctor) return;

    try {
      await updateDoctor(doctor.id, { page_sections: unsavedChanges });
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  const handlePreview = () => {
    if (!unsavedChanges) return;

    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            <div class="min-h-screen bg-gray-50">
              <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                ${unsavedChanges.order.map((sectionId) => {
                  const section = unsavedChanges.sections[sectionId];
                  if (!section?.visible) return '';
                  
                  switch (sectionId) {
                    case 'info':
                      return `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-6">
                          <h2 class="text-2xl font-bold text-gray-900 mb-4">${section.content.name}</h2>
                          <div class="space-y-2">
                            <p class="flex items-center text-gray-600">
                              <span class="mr-2">📞</span>${section.content.phone}
                            </p>
                            <p class="flex items-center text-gray-600">
                              <span class="mr-2">✉️</span>${section.content.email}
                            </p>
                            <p class="flex items-center text-gray-600">
                              <span class="mr-2">📍</span>${section.content.address}
                            </p>
                          </div>
                        </div>
                      `;
                    case 'banner':
                      return section.content ? `
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
                          <p class="text-blue-700">${section.content}</p>
                        </div>
                      ` : '';
                    case 'services':
                      return `
                        <div class="grid md:grid-cols-3 gap-6">
                          ${unsavedChanges.services.order
                            .filter(id => unsavedChanges.services.items[id].visible)
                            .map(id => {
                              const service = unsavedChanges.services.items[id];
                              return `
                                <div class="bg-white p-6 rounded-lg shadow-md">
                                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                    ${service.title}
                                  </h3>
                                  <p class="text-sm text-gray-500">
                                    ${service.description}
                                  </p>
                                </div>
                              `;
                            }).join('')}
                        </div>
                      `;
                  }
                }).join('')}
              </div>
            </div>
          </body>
        </html>
      `);
    }
  };

  if (!doctor || !unsavedChanges) return null;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={unsavedChanges.order.map(s => `section-${s}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {unsavedChanges.order.map((sectionId) => (
              <SectionWrapper
                key={`section-${sectionId}`}
                id={`section-${sectionId}`}
                title={SECTION_INFO[sectionId].title}
              >
                {sectionId === 'info' && (
                  <InfoSection
                    {...unsavedChanges.sections.info.content}
                    onFieldChange={handleInfoChange}
                  />
                )}
                {sectionId === 'banner' && (
                  <BannerSection
                    text={unsavedChanges.sections.banner.content}
                    onChange={handleBannerChange}
                  />
                )}
                {sectionId === 'services' && (
                  <ServicesSection
                    services={unsavedChanges.services.order.map((id) => ({
                      id,
                      ...unsavedChanges.services.items[id],
                    }))}
                    onServiceUpdate={handleServiceUpdate}
                  />
                )}
              </SectionWrapper>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="fixed bottom-6 right-6 flex space-x-4">
        <button
          onClick={handlePreview}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 flex items-center"
        >
          <Eye className="h-5 w-5 mr-2" />
          Preview
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 flex items-center"
        >
          <Save className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}