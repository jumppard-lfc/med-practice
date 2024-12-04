import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, LogIn, UserPlus } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <Stethoscope className="h-16 w-16 text-blue-600 mx-auto" />
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            MedPractice
          </h1>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Manage your medical practice with ease
          </p>
        </div>

        <div className="mt-20 max-w-2xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2">
          <button
            onClick={() => navigate('/doctor/register')}
            className="relative group bg-white p-6 focus:outline-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <UserPlus className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Create Website</h2>
              <p className="mt-2 text-gray-500 text-center">
                Create your medical practice website
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/doctor/login')}
            className="relative group bg-white p-6 focus:outline-none rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex flex-col items-center">
              <LogIn className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Sign In</h2>
              <p className="mt-2 text-gray-500 text-center">
                Administer your Website
              </p>
            </div>
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Already registered but can't access your account?{' '}
            <a href="mailto:support@medpractice.com" className="text-blue-600 hover:text-blue-700">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}