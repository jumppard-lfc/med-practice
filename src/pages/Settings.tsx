import React from 'react';
import { useStore } from '../store/useStore';
import { Power, Palette, Image, MessageSquare, MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const features = [
  {
    id: 'appointments',
    name: 'Appointments',
    description: 'Schedule and manage patient appointments',
  },
  {
    id: 'voice',
    name: 'Voice Consultation',
    description: 'Get medical advice through a voice call',
  },
  {
    id: 'prescriptions',
    name: 'Prescriptions',
    description: 'Create and manage medical prescriptions',
  },
];

const themes = [
  { id: 'blue', primary: '#2563eb', secondary: '#bfdbfe' },
  { id: 'green', primary: '#16a34a', secondary: '#bbf7d0' },
  { id: 'purple', primary: '#7c3aed', secondary: '#ddd6fe' },
  { id: 'red', primary: '#dc2626', secondary: '#fecaca' },
];

export function Settings() {
  const doctor = useStore((state) => state.doctor);
  const updateDoctor = useStore((state) => state.updateDoctor);
  const toggleFeature = useStore((state) => state.toggleFeature);

  const handleContactUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates = {
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
    };
    
    if (doctor) {
      try {
        await updateDoctor(doctor.id, updates);
        toast.success('Contact information updated successfully');
      } catch (error) {
        toast.error('Failed to update contact information');
      }
    }
  };

  const handleBannerUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (doctor) {
      try {
        await updateDoctor(doctor.id, {
          bannerText: formData.get('bannerText') as string,
        });
        toast.success('Practice updates banner updated successfully');
      } catch (error) {
        toast.error('Failed to update practice updates');
      }
    }
  };

  const handleThemeChange = async (themeId: string) => {
    if (doctor) {
      try {
        await updateDoctor(doctor.id, { theme: themeId });
        toast.success('Theme updated successfully');
      } catch (error) {
        toast.error('Failed to update theme');
      }
    }
  };

  const handleLogoUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && doctor) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          await updateDoctor(doctor.id, { logo: reader.result as string });
          toast.success('Logo updated successfully');
        };
        reader.onerror = () => {
          toast.error('Failed to update logo');
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error('Failed to update logo');
      }
    }
  };

  const handleFeatureToggle = async (featureId: string) => {
    try {
      await toggleFeature(featureId);
      toast.success(`${featureId.charAt(0).toUpperCase() + featureId.slice(1)} service ${
        doctor?.enabledFeatures.includes(featureId) ? 'disabled' : 'enabled'
      } successfully`);
    } catch (error) {
      toast.error('Failed to update service status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Practice Updates Banner */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            <MessageSquare className="h-5 w-5 inline mr-2" />
            Practice Updates
          </h3>
          <form onSubmit={handleBannerUpdate}>
            <textarea
              name="bannerText"
              rows={3}
              defaultValue={doctor?.bannerText}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter important updates about your practice (e.g., vacation dates, special announcements)..."
            />
            <button
              type="submit"
              className="mt-4 btn btn-primary"
            >
              Update Practice Updates
            </button>
          </form>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Contact Information</h3>
          <form onSubmit={handleContactUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={doctor?.phone}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={doctor?.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={doctor?.address}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update Contact Information
            </button>
          </form>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            <Palette className="h-5 w-5 inline mr-2" />
            Color Theme
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`h-20 rounded-lg border-2 transition-all ${
                  doctor?.theme === theme.id
                    ? 'border-gray-900 scale-105'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            <Image className="h-5 w-5 inline mr-2" />
            Practice Logo
          </h3>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0 h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center">
              {doctor?.logo ? (
                <img
                  src={doctor.logo}
                  alt="Practice logo"
                  className="h-20 w-20 object-contain"
                />
              ) : (
                <Image className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <label className="btn btn-secondary cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleLogoUpdate}
              />
              Change Logo
            </label>
          </div>
        </div>
      </div>

      {/* Services Toggle */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Available Services</h3>
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{feature.name}</p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                <button
                  onClick={() => handleFeatureToggle(feature.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    doctor?.enabledFeatures.includes(feature.id)
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      doctor?.enabledFeatures.includes(feature.id)
                        ? 'translate-x-5'
                        : 'translate-x-0'
                    }`}
                  >
                    <Power className="h-3 w-3 text-gray-400 m-1" />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}