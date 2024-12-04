import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  LogOut 
} from 'lucide-react';
import clsx from 'clsx';

export function Layout() {
  const doctor = useStore((state) => state.doctor);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const enabledFeatures = doctor?.enabledFeatures || [];

  const handleLogout = () => {
    logout();
    navigate('/doctor/login');
  };

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Stethoscope className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  MedPractice
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-sm text-gray-700">
                Welcome, {doctor?.name}
              </div>
              <button 
                onClick={handleLogout}
                className="ml-4 p-2 text-gray-500 hover:text-blue-600"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}