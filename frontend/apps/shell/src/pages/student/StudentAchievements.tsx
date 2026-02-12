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
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '16px',
    color: '#1e293b',
  },
};

export default function StudentAchievements() {
  const data = mockStudentDashboardData;
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const unlockedCount = data.achievements.filter(a => a.isUnlocked).length;
  const lockedAchievements = data.achievements.filter(a => !a.isUnlocked);
  const unlockedAchievements = data.achievements.filter(a => a.isUnlocked);

  return (
    <div style={styles.container}>
      {/* Header Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.secondary}, #d97706)`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px', flexWrap: 'wrap' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>🏆</div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: COLORS.primaryDark, marginBottom: '4px' }}>
              {data.user.xp.toLocaleString()} XP
            </h2>
            <p style={{ color: COLORS.primaryDark, fontSize: '14px', marginBottom: '8px' }}>
              Nivel {data.user.level} • {unlockedCount} de {data.achievements.length} insignias
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '12px' }}>
                🔥 {data.user.streak} días
              </div>
              <div style={{ background: 'rgba(255,255,255,0.3)', padding: '4px 12px', borderRadius: '8px', fontSize: '12px' }}>
                📊 #{data.user.ranking}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ ...styles.card, marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Progreso total</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.primary }}>{Math.round((unlockedCount / data.achievements.length) * 100)}%</span>
        </div>
        <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(unlockedCount / data.achievements.length) * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: '5px',
            transition: 'width 0.3s',
          }} />
        </div>
      </div>

      {/* Next Unlocks */}
      {lockedAchievements.length > 0 && (
        <div style={{ ...styles.card, marginBottom: '20px' }}>
          <div style={styles.sectionTitle}>🎖️ Próximos Desbloqueos</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            {lockedAchievements.slice(0, 3).map(achievement => (
              <div key={achievement.id} style={{
                padding: '16px',
                background: '#fef9c3',
                border: '2px dashed #fbbf24',
                borderRadius: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{achievement.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{achievement.name}</div>
                <div style={{ fontSize: '12px', color: '#a16207', marginBottom: '10px' }}>{achievement.desc}</div>
                <div style={{ height: '6px', background: '#fde68a', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{
                    width: `${((achievement.progress || 0) / (achievement.requirement || 1)) * 100}%`,
                    height: '100%',
                    background: '#f59e0b',
                    borderRadius: '3px',
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: '#92400e', fontWeight: 500 }}>
                  {achievement.progress || 0}/{achievement.requirement}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Achievements */}
      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={styles.sectionTitle}>🏅 Insignias Desbloqueadas</div>
          <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
            {unlockedCount}/{data.achievements.length}
          </span>
        </div>
        
        {unlockedAchievements.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '12px',
          }}>
            {unlockedAchievements.map(achievement => (
              <div key={achievement.id} style={{
                textAlign: 'center',
                padding: '16px',
                background: 'linear-gradient(135deg, #fef9c3, #fef3c7)',
                border: '2px solid #fbbf24',
                borderRadius: '12px',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{achievement.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>{achievement.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>{achievement.desc}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: COLORS.success }}>
                  ✓ +{achievement.xp} XP
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎖️</div>
            <div style={{ fontSize: '14px' }}>¡Completa actividades para ganar insignias!</div>
          </div>
        )}
      </div>
    </div>
  );
}
