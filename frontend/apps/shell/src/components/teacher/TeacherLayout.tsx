import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { theme } from '@ub-lms/ui-components';
import { useAuthStore } from '../../store/authStore';

const mockTeacherStats = {
  xp: 2850,
  level: 5,
  levelName: 'Experto',
  streak: 12,
  ranking: 3,
  departmentRanking: 1,
};

const NAV_ITEMS = [
  { path: '/teacher/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/teacher/courses', label: 'Mis Cursos', icon: '📚' },
  { path: '/teacher/students', label: 'Estudiantes', icon: '👥' },
  { path: '/teacher/grades', label: 'Calificaciones', icon: '✅' },
  { path: '/teacher/calendar', label: 'Calendario', icon: '📅' },
  { path: '/teacher/metrics', label: 'Métricas', icon: '📈' },
  { path: '/teacher/badges', label: 'Insignias', icon: '🏆' },
];

export default function TeacherLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const stats = mockTeacherStats;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: theme.fonts.body }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        background: `linear-gradient(180deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%)`,
        color: theme.colors.white,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          padding: theme.spacing.xl,
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ fontSize: theme.fontSizes.xl, fontWeight: 700 }}>
            🎓 UB LMS
          </div>
          <div style={{ fontSize: theme.fontSizes.xs, opacity: 0.7, marginTop: '4px' }}>
            Universitaria de Bogotá
          </div>
          <div style={{
            marginTop: theme.spacing.md,
            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
            background: 'rgba(255,184,0,0.2)',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.secondary,
            fontWeight: 600,
          }}>
            👨‍🏫 Portal Docente
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: `${theme.spacing.md} 0`, overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
                margin: `2px ${theme.spacing.sm}`,
                borderRadius: theme.borderRadius.lg,
                color: theme.colors.white,
                textDecoration: 'none',
                fontSize: theme.fontSizes.sm,
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                borderLeft: isActive ? `3px solid ${theme.colors.secondary}` : '3px solid transparent',
                transition: 'all 0.2s',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div style={{
          padding: theme.spacing.lg,
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}>
          <div style={{ fontSize: theme.fontSizes.sm, fontWeight: 600, marginBottom: '4px' }}>
            {user?.firstName} {user?.lastName}
          </div>
          <div style={{ fontSize: theme.fontSizes.xs, opacity: 0.7, marginBottom: theme.spacing.sm }}>
            {user?.email}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
          }}>
            <div style={{
              padding: '2px 8px',
              borderRadius: theme.borderRadius.sm,
              background: theme.colors.secondary,
              color: '#1A1A1A',
              fontSize: theme.fontSizes.xs,
              fontWeight: 600,
            }}>
              Nivel {stats.level}
            </div>
            <div style={{
              padding: '2px 8px',
              borderRadius: theme.borderRadius.sm,
              background: 'rgba(255,255,255,0.2)',
              fontSize: theme.fontSizes.xs,
              fontWeight: 600,
            }}>
              ⚡ {stats.xp.toLocaleString()} DP
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.md,
              border: '1px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.1)',
              color: theme.colors.white,
              fontSize: theme.fontSizes.sm,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: theme.colors.backgroundAlt }}>
        {/* Top bar */}
        <header style={{
          height: '64px',
          backgroundColor: theme.colors.white,
          borderBottom: `1px solid ${theme.colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${theme.spacing.xl}`,
          boxShadow: theme.shadows.sm,
        }}>
          <div style={{ fontSize: theme.fontSizes.lg, fontWeight: 500, color: theme.colors.text }}>
            Hola, <strong>Prof. {user?.firstName}</strong> 👋
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
            {/* Streak */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              borderRadius: theme.borderRadius.full,
              backgroundColor: '#FEF3C7',
              fontSize: theme.fontSizes.sm,
              fontWeight: 600,
              color: '#92400E',
            }}>
              🔥 {stats.streak} días
            </div>

            {/* Ranking */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.infoLight,
              fontSize: theme.fontSizes.sm,
              fontWeight: 600,
              color: theme.colors.info,
            }}>
              🏆 #{stats.ranking} Global
            </div>

            {/* Department Ranking */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.successLight,
              fontSize: theme.fontSizes.sm,
              fontWeight: 600,
              color: theme.colors.success,
            }}>
              🏅 #{stats.departmentRanking} Depto
            </div>

            {/* Notifications */}
            <button style={{
              width: 36,
              height: 36,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              backgroundColor: theme.colors.backgroundAlt,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              position: 'relative',
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: theme.colors.danger,
                color: theme.colors.white,
                fontSize: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>3</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: theme.spacing.xl,
          overflowY: 'auto',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
