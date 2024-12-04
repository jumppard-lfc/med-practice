import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { BrowseAmbulance } from './pages/BrowseAmbulance';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { AppointmentForm } from './components/AppointmentForm';
import { PrescriptionForm } from './components/PrescriptionForm';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/browse/:doctorId?" element={<BrowseAmbulance />} />
        <Route path="/doctor/login" element={<Login />} />
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<AppointmentForm />} />
          <Route path="prescriptions" element={<PrescriptionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}