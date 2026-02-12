import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { mockStudentDashboardData } from '../../data/mockStudentDashboard';

const COLORS = {
  primary: '#C41E2A',
  primaryDark: '#9B1520',
  secondary: '#FFB800',
};

const NAV_ITEMS = [
  { path: '/student/dashboard', label: 'Inicio', icon: '🏠' },
  { path: '/student/course', label: 'Curso', icon: '📚' },
  { path: '/student/progress', label: 'Progreso', icon: '📈' },
  { path: '/student/achievements', label: 'Logros', icon: '🏆' },
  { path: '/student/calendar', label: 'Calendario', icon: '📅' },
  { path: '/student/grades', label: 'Notas', icon: '📝' },
];

export default function StudentLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const data = mockStudentDashboardData;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', system-ui, sans-serif", 
      background: '#f1f5f9',
      minHeight: '100vh',
    }}>
      {/* Header Fixed */}
      <header style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
        color: 'white',
        padding: '12px 16px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: COLORS.secondary,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '16px',
              color: COLORS.primaryDark,
            }}>
              U
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>Universitaria de Bogotá</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>Portal Estudiantil</div>
            </div>
          </div>

          {/* Header Stats - Desktop only */}
          <div className="header-stats" style={{ display: 'none', alignItems: 'center', gap: '12px' }}>
            {[
              { icon: '🔥', value: data.user.streak, label: 'días' },
              { icon: '⚡', value: data.user.xp, label: 'XP' },
              { icon: '🏆', value: `N${data.user.level}`, label: '' },
              { icon: '📊', value: `#${data.user.ranking}`, label: '' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
                fontSize: '12px',
              }}>
                <span>{stat.icon}</span>
                <span style={{ fontWeight: 700 }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              background: COLORS.secondary,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '10px',
              color: COLORS.primaryDark,
            }}>
              {data.user.avatar}
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="desktop-sidebar" style={{
        width: '240px',
        background: 'white',
        borderRight: '1px solid #e2e8f0',
        padding: '16px',
        position: 'fixed',
        top: '60px',
        bottom: 0,
        left: 0,
        overflowY: 'auto',
        display: 'none',
        zIndex: 50,
      }}>
        {/* Course Card */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          borderRadius: '12px',
          padding: '14px',
          color: 'white',
          marginBottom: '16px',
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{data.currentCourse.name}</h3>
          <p style={{ fontSize: '10px', opacity: 0.8, marginBottom: '8px' }}>Semestre {data.currentCourse.semester}</p>
          <div style={{ height: '5px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${data.currentCourse.progress}%`, background: COLORS.secondary, borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '10px', marginTop: '4px', textAlign: 'right' }}>{data.currentCourse.progress}% completado</div>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                color: isActive ? COLORS.primary : '#64748b',
                background: isActive ? '#fff5f5' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                fontSize: '13px',
                textDecoration: 'none',
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            background: '#f1f5f9',
            color: '#64748b',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{
        padding: '16px',
        paddingTop: '76px',
        paddingBottom: '80px',
        minHeight: '100vh',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
      }}>
        {NAV_ITEMS.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              padding: '4px 8px',
              color: isActive ? COLORS.primary : '#94a3b8',
              fontSize: '9px',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Responsive Styles */}
      <style>{`
        /* Default (Mobile) */
        .desktop-sidebar { display: none !important; }
        .header-stats { display: none !important; }
        
        /* Tablet & Desktop */
        @media (min-width: 769px) {
          .desktop-sidebar { display: block !important; }
          .header-stats { display: flex !important; }
          .mobile-nav { display: none !important; }
          
          .main-content {
            margin-left: 240px;
            padding-top: 76px !important;
            padding-bottom: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
