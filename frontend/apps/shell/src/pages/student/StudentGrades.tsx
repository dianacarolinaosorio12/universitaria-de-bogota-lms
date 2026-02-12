import { useState, useEffect } from 'react';
import { mockStudentDashboardData } from '../../data/mockStudentDashboard';

const COLORS = {
  primary: '#C41E2A',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
};

export default function StudentGrades() {
  const data = mockStudentDashboardData;
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const completedGrades = data.grades.filter(g => g.score !== null);
  const pendingGrades = data.grades.filter(g => g.isPending);
  const avgScore = completedGrades.length > 0
    ? Math.round(completedGrades.reduce((a, b) => a + (b.score || 0), 0) / completedGrades.length)
    : 0;

  const getScoreColor = (score: number | null) => {
    if (score === null) return '#64748b';
    if (score >= 90) return COLORS.success;
    if (score >= 70) return COLORS.warning;
    return COLORS.danger;
  };

  const getScoreBg = (score: number | null) => {
    if (score === null) return '#f1f5f9';
    if (score >= 90) return '#dcfce7';
    if (score >= 70) return '#fef3c7';
    return '#fee2e2';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎬';
      case 'quiz': return '📝';
      case 'h5p': return '🎮';
      case 'task': return '📋';
      default: return '📄';
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'video': return '#fee2e2';
      case 'quiz': return '#fef3c7';
      case 'h5p': return '#f3e8ff';
      case 'task': return '#dcfce7';
      default: return '#f1f5f9';
    }
  };

  return (
    <div style={styles.container}>
      {/* Summary Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, #9B1520)`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>📝 Mis Calificaciones</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{avgScore}%</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Promedio</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{completedGrades.length}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Completadas</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', gridColumn: isMobile ? 'span 2' : 'auto' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: COLORS.warning }}>{pendingGrades.length}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Pendientes</div>
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div style={styles.card}>
        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Todas las Actividades</div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.grades.map(grade => (
            <div key={grade.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: grade.isPending ? '#fff7ed' : '#f8fafc',
              borderRadius: '12px',
              border: grade.isPending ? '1px solid #fed7aa' : '1px solid #e2e8f0',
              flexWrap: 'wrap',
            }}>
              {/* Icon */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: getTypeBg(grade.type),
                flexShrink: 0,
              }}>
                {getTypeIcon(grade.type)}
              </div>

              {/* Info */}
              <div style={{ flex: '1 1 150px', minWidth: '120px' }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{grade.activity}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {grade.topic}
                </div>
              </div>

              {/* Date */}
              <div style={{ minWidth: '70px', textAlign: 'center' }}>
                {grade.isPending ? (
                  <div style={{ fontSize: '12px', color: COLORS.warning, fontWeight: 500 }}>
                    {grade.dueDate}
                  </div>
                ) : grade.date ? (
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{grade.date}</div>
                ) : null}
              </div>

              {/* Score */}
              <div style={{
                minWidth: '60px',
                textAlign: 'center',
              }}>
                {grade.score !== null ? (
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: getScoreBg(grade.score),
                    color: getScoreColor(grade.score),
                    fontWeight: 700,
                    fontSize: '14px',
                    display: 'inline-block',
                  }}>
                    {grade.score}%
                  </div>
                ) : grade.isPending ? (
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#fed7aa',
                    color: '#ea580c',
                    fontWeight: 600,
                    fontSize: '11px',
                    display: 'inline-block',
                  }}>
                    Pendiente
                  </div>
                ) : null}
              </div>

              {/* XP */}
              <div style={{ minWidth: '50px', textAlign: 'right' }}>
                {grade.xpEarned > 0 ? (
                  <div style={{ fontSize: '12px', fontWeight: 600, color: COLORS.primary }}>+{grade.xpEarned} XP</div>
                ) : (
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>+{grade.xpEarned} XP</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
