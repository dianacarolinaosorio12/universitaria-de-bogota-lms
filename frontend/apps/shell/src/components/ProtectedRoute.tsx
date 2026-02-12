import { Navigate } from 'react-router-dom';
import type { UserRole } from '@ub-lms/shared-types';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  userRole?: string;
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

export function ProtectedRoute({
  isAuthenticated,
  userRole,
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
