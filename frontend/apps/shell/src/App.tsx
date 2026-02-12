import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardRedirect from './pages/DashboardRedirect';
import StudentLayout from './components/student/StudentLayout';
import TeacherLayout from './components/teacher/TeacherLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourse from './pages/student/StudentCourse';
import StudentProgress from './pages/student/StudentProgress';
import StudentAchievements from './pages/student/StudentAchievements';
import StudentCalendar from './pages/student/StudentCalendar';
import StudentGrades from './pages/student/StudentGrades';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherGrades from './pages/teacher/TeacherGrades';
import TeacherCalendar from './pages/teacher/TeacherCalendar';
import TeacherMetrics from './pages/teacher/TeacherMetrics';
import TeacherBadges from './pages/teacher/TeacherBadges';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      
      {/* Dashboard Redirect - sends to appropriate dashboard based on role */}
      <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role}>
          <DashboardRedirect />
        </ProtectedRoute>
      } />

      {/* Student Routes - Multi-page with sidebar */}
      <Route path="/student" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} allowedRoles={['Student']}>
          <StudentLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="course" element={<StudentCourse />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="achievements" element={<StudentAchievements />} />
        <Route path="calendar" element={<StudentCalendar />} />
        <Route path="grades" element={<StudentGrades />} />
      </Route>

      {/* Teacher Routes - Multi-page with sidebar */}
      <Route path="/teacher" element={
        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={user?.role} allowedRoles={['Teacher']}>
          <TeacherLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="courses" element={<TeacherCourses />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="grades" element={<TeacherGrades />} />
        <Route path="calendar" element={<TeacherCalendar />} />
        <Route path="metrics" element={<TeacherMetrics />} />
        <Route path="badges" element={<TeacherBadges />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
