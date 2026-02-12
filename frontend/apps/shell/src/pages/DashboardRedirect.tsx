import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function DashboardRedirect() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

  switch (user?.role) {
    case 'Student': return <Navigate to="/student/dashboard" replace />;
    case 'Teacher': return <Navigate to="/teacher/dashboard" replace />;
    case 'Admin':
    case 'SuperAdmin': return <div style={{ padding: '2rem' }}><h1>Panel Admin</h1><p>Bienvenido, {user.firstName}. (En construcción)</p></div>;
    default: return <div style={{ padding: '2rem' }}><h1>Dashboard</h1><p>Bienvenido, {user?.firstName}.</p></div>;
  }
}
