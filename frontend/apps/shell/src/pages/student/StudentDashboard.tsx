import { useState, useEffect } from 'react';
import { mockStudentDashboardData } from '../../data/mockStudentDashboard';

const COLORS = {
  primary: '#C41E2A',
  primaryDark: '#9B1520',
  secondary: '#FFB800',
  success: '#10b981',
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

export default function StudentDashboard() {
  const data = mockStudentDashboardData;
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const availableXp = data.challenges.filter(c => !c.isCompleted).reduce((a, c) => a + c.xp, 0);

  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <h1 style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 700, marginBottom: '8px' }}>
          ¡Hola, {data.user.name}! 👋
        </h1>
        <p style={{ opacity: 0.9, marginBottom: '16px', fontSize: '14px' }}>
          Estás en el <span style={{
            background: COLORS.secondary,
            color: COLORS.primaryDark,
            padding: '2px 10px',
            borderRadius: '6px',
            fontWeight: 700
          }}>Top #{data.user.ranking}</span> de tu clase
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '12px', flex: '1 1 120px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>XP semana</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>+{data.stats.weeklyXp}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '12px 16px', borderRadius: '12px', flex: '1 1 120px' }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>Actividades</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>{data.stats.activitiesCompleted}/{data.stats.activitiesTotal}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {[
          { label: 'Curso', value: `${data.currentCourse.progress}%`, color: COLORS.primary },
          { label: 'vs Promedio', value: `+${data.stats.vsAverage}%`, color: COLORS.success },
          { label: 'Predicción', value: `${data.prediction.predictedGrade}%`, color: COLORS.primary },
          { label: 'Ranking', value: `#${data.user.ranking}`, color: COLORS.secondary },
        ].map((stat, i) => (
          <div key={i} style={{ ...styles.card, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Challenges Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '20px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>✨</span>
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Desafíos del Día</h3>
          </div>
          <span style={{ background: COLORS.secondary, color: COLORS.primaryDark, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
            +{availableXp} XP
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '10px' }}>
          {data.challenges.map(challenge => (
            <div key={challenge.id} style={{
              background: challenge.isCompleted ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '22px' }}>{challenge.icon}</span>
                <span style={{ background: 'rgba(255,184,0,0.3)', color: '#fef08a', padding: '2px 6px', borderRadius: '6px', fontSize: '10px', fontWeight: 600 }}>
                  +{challenge.xp}
                </span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, marginBottom: '6px', lineHeight: 1.3 }}>{challenge.title}</div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                <div style={{
                  height: '100%',
                  width: `${(challenge.progress / challenge.target) * 100}%`,
                  background: COLORS.secondary,
                  borderRadius: '2px',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips + Leaderboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '20px',
        marginBottom: '20px',
      }}>
        {/* Tips */}
        <div style={styles.card}>
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            💡 Tips <span style={{ background: '#faf5ff', color: '#9333ea', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>IA</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.tips.map(tip => (
              <div key={tip.id} style={{
                padding: '12px',
                borderRadius: '10px',
                background: tip.priority === 'high' ? '#fef2f2' : '#eff6ff',
                border: `1px solid ${tip.priority === 'high' ? '#fecaca' : '#bfdbfe'}`,
              }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: tip.priority === 'high' ? COLORS.primary : '#3b82f6', marginBottom: '4px' }}>
                  {tip.priority === 'high' ? '🎯 Prioridad alta' : '📚 Refuerza'}
                </div>
                <div style={{ fontSize: '13px', color: '#475569' }}>{tip.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={styles.card}>
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '14px' }}>🏆 Top 5</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.leaderboard.map((student, idx) => (
              <div key={student.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '10px',
                background: student.isYou ? 'linear-gradient(135deg, #fff5f5, #fee2e2)' : 'transparent',
              }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '11px',
                  background: idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : idx === 2 ? '#d97706' : '#f1f5f9',
                  color: idx < 3 ? 'white' : '#64748b',
                }}>
                  {idx + 1}
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  color: 'white',
                  fontSize: '11px',
                  background: student.color,
                }}>
                  {student.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>
                    {student.name} {student.isYou && '👈'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Nivel {student.level}</div>
                </div>
                <div style={{ fontWeight: 700, color: COLORS.primary, fontSize: '14px' }}>{student.xp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.card}>
        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '14px' }}>⏰ Actividad Reciente</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.recentActivity.slice(0, 5).map(activity => (
            <div key={activity.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px',
              borderRadius: '10px',
              background: '#f8fafc',
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                background: activity.type === 'xp' ? '#fef9c3' :
                           activity.type === 'badge' ? '#f3e8ff' :
                           activity.type === 'complete' ? '#dcfce7' : '#e0e7ff',
              }}>
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '13px' }}>{activity.title}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{activity.time}</div>
              </div>
              {activity.xp > 0 && (
                <div style={{ fontWeight: 600, color: COLORS.secondary, fontSize: '13px' }}>+{activity.xp} XP</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
