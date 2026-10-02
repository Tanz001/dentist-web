import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import { AdminLayout, LoginPage } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminAppointments } from './admin/AdminAppointments';
import { AdminAppointmentDetail } from './admin/AdminAppointmentDetail';
import { AdminPatients } from './admin/AdminPatients';
import { AdminDoctors, AdminServices, AdminSettingsPage } from './admin/AdminMorePages';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="appointments/:id" element={<AdminAppointmentDetail />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
