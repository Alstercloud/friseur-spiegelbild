import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminContent from '@/pages/admin/AdminContent';
import AdminImages from '@/pages/admin/AdminImages';
import AdminTeam from '@/pages/admin/AdminTeam';
import AdminSettings from '@/pages/admin/AdminSettings';

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/content" element={
          <ProtectedRoute>
            <AdminContent />
          </ProtectedRoute>
        } />
        <Route path="/images" element={
          <ProtectedRoute>
            <AdminImages />
          </ProtectedRoute>
        } />
        <Route path="/team" element={
          <ProtectedRoute>
            <AdminTeam />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <AdminSettings />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
