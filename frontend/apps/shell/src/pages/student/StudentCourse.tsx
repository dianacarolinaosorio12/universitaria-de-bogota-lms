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
};

export default function StudentCourse() {
  const data = mockStudentDashboardData;
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return { icon: '🎬', bg: '#fee2e2' };
      case 'doc': return { icon: '📄', bg: '#dbeafe' };
      case 'quiz': return { icon: '📝', bg: '#fef3c7' };
      case 'h5p': return { icon: '🎮', bg: '#f3e8ff' };
      case 'task': return { icon: '📋', bg: '#dcfce7' };
      default: return { icon: '📄', bg: '#f1f5f9' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Course Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
        borderRadius: '16px',
        padding: isMobile ? '16px' : '24px',
        color: 'white',
        marginBottom: '20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '12px',
            }}>
              {data.currentCourse.code}
            </span>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginTop: '8px' }}>{data.currentCourse.name}</h1>
            <p style={{ opacity: 0.9, marginTop: '4px', fontSize: '14px' }}>{data.currentCourse.teacher}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700 }}>{data.currentCourse.progress}%</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>completado</div>
          </div>
        </div>
        <div style={{
          height: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
          marginTop: '16px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${data.currentCourse.progress}%`,
            background: COLORS.secondary,
            borderRadius: '4px',
            transition: 'width 0.3s',
          }} />
        </div>
      </div>

      {/* Course Content */}
      <div style={styles.card}>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>📚 Contenido del Curso</div>
        
        {data.courseContent.map((topic, topicIdx) => (
          <div key={topic.id} style={{
            background: '#f8fafc',
            borderRadius: '12px',
            padding: isMobile ? '12px' : '16px',
            marginBottom: '12px',
            opacity: topic.isLocked ? 0.6 : 1,
          }}>
            {/* Topic Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: isMobile ? '8px' : '12px',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                background: topic.isCompleted ? COLORS.primary : topic.isActive ? COLORS.secondary : '#94a3b8',
                color: 'white',
                fontWeight: 600,
                flexShrink: 0,
              }}>
                {topic.isCompleted ? '✓' : topic.isActive ? '▶' : topic.isLocked ? '🔒' : topicIdx + 1}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>{topic.title}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {topic.isLocked ? 'Completar tema anterior' : `${topic.progress}% completado`}
                </div>
              </div>
            </div>

            {/* Content Items */}
            {!topic.isLocked && topic.items.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '44px' }}>
                {topic.items.map(item => {
                  const contentType = getContentIcon(item.type);
                  return (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      background: 'white',
                      borderRadius: '10px',
                      opacity: item.isCompleted ? 0.7 : 1,
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        background: contentType.bg,
                        flexShrink: 0,
                      }}>
                        {contentType.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span>{item.duration}</span>
                          {item.date && <span>📅 {item.date}</span>}
                          {item.score && <span style={{ color: COLORS.primary }}>Score: {item.score}%</span>}
                          {(item as any).dueDate && (
                            <span style={{ color: (item as any).isUrgent ? COLORS.primary : '#f59e0b' }}>
                              {(item as any).isUrgent ? '⏰' : '📅'} {(item as any).dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{
                        background: '#fef9c3',
                        color: '#a16207',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        +{item.xp} XP
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
