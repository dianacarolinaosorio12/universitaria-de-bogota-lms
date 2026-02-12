import { useState, useEffect } from 'react';
import { mockStudentDashboardData } from '../../data/mockStudentDashboard';

const COLORS = {
  primary: '#C41E2A',
  primaryDark: '#9B1520',
  secondary: '#FFB800',
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
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#1e293b',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#1e293b',
  },
  statLabel: {
    fontSize: '13px',
    color: '#64748b',
  },
};

export default function StudentProgress() {
  const data = mockStudentDashboardData;
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getStrengthColor = (level: string) => {
    switch (level) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'average': return '#f59e0b';
      case 'weak': return '#C41E2A';
      default: return '#64748b';
    }
  };

  return (
    <div style={styles.container}>
      {/* Summary Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: isMobile ? '12px' : '16px' }}>📊 Resumen de tu Progreso</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: isMobile ? '12px' : '16px',
        }}>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{data.currentCourse.progress}%</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Curso completado</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>+{data.stats.vsAverage}%</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>vs Promedio</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>{data.prediction.predictedGrade}%</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Predicción</div>
          </div>
          <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>#{data.user.ranking}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Ranking</div>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div style={{ ...styles.card, marginBottom: '20px' }}>
        <div style={styles.sectionTitle}>📈 Estadísticas de Estudio</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {[
            { label: 'Esta semana', value: `${data.stats.studyTimeWeek}h`, color: COLORS.primary },
            { label: 'Total curso', value: `${data.stats.studyTimeTotal}h`, color: COLORS.primary },
            { label: 'Mejor horario', value: data.stats.bestHours, color: '#f59e0b' },
            { label: 'Sesión promedio', value: `${data.stats.avgSession} min`, color: '#3b82f6' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Card */}
      <div style={{ ...styles.card, marginBottom: '20px' }}>
        <div style={styles.sectionTitle}>🎯 Metas Semanales</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.weeklyGoals.map(goal => (
            <div key={goal.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: '#f8fafc',
              borderRadius: '12px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: goal.isCompleted ? '#dcfce7' : '#dbeafe',
              }}>
                {goal.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{goal.title}</div>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(goal.progress / goal.target) * 100}%`,
                    background: goal.isCompleted ? '#10b981' : COLORS.primary,
                    borderRadius: '3px',
                    transition: 'width 0.3s',
                  }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  {goal.progress}/{goal.target} • +{goal.xpReward} XP
                </div>
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: goal.isCompleted ? '#10b981' : '#64748b',
              }}>
                {Math.round((goal.progress / goal.target) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '20px',
      }}>
        {/* Strengths */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>💪 Fortalezas</div>
          {data.strengths.map(strength => (
            <div key={strength.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{strength.name}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: getStrengthColor(strength.level) }}>
                  {strength.value}%
                </span>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${strength.value}%`,
                  background: getStrengthColor(strength.level),
                  borderRadius: '4px',
                  transition: 'width 0.3s',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>⏰ Actividad Reciente</div>
          {data.recentActivity.slice(0, 5).map(activity => (
            <div key={activity.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '8px',
              background: '#f8fafc',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                background: activity.type === 'xp' ? '#fef9c3' :
                           activity.type === 'badge' ? '#f3e8ff' :
                           activity.type === 'complete' ? '#dcfce7' : '#e0e7ff',
              }}>
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500 }}>{activity.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{activity.time}</div>
              </div>
              {activity.xp > 0 && (
                <div style={{ fontSize: '13px', fontWeight: 600, color: COLORS.secondary }}>+{activity.xp} XP</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
