import { useState, useEffect } from 'react';
import { mockStudentDashboardData } from '../../data/mockStudentDashboard';

const COLORS = {
  primary: '#C41E2A',
  secondary: '#FFB800',
};

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

const getEventColor = (type: string) => {
  switch (type) {
    case 'class': return { bg: '#dbeafe', color: '#1d4ed8' };
    case 'quiz': return { bg: '#fef3c7', color: '#b45309' };
    case 'assignment': return { bg: '#fee2e2', color: '#dc2626' };
    case 'exam': return { bg: '#fce7f3', color: '#be185d' };
    default: return { bg: '#f1f5f9', color: '#64748b' };
  }
};

export default function StudentCalendar() {
  const data = mockStudentDashboardData;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return data.calendar.events.filter(e => e.date === dateStr);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const upcomingEvents = data.calendar.events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div style={styles.container}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 300px',
        gap: '20px',
      }}>
        {/* Calendar */}
        <div style={styles.card}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={prevMonth}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ◀
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 700, minWidth: '160px', textAlign: 'center' }}>
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            marginBottom: '8px',
          }}>
            {DAYS.map(day => (
              <div key={day} style={{
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '12px',
                color: '#64748b',
                padding: '8px',
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
          }}>
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} style={{
                minHeight: isMobile ? '50px' : '70px',
                padding: '4px',
                border: '1px solid #f1f5f9',
                borderRadius: '8px',
                background: '#f8fafc',
              }} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const events = getEventsForDay(day);
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              return (
                <div key={day} style={{
                  minHeight: isMobile ? '50px' : '70px',
                  padding: '4px',
                  border: `2px solid ${isToday ? COLORS.primary : '#e2e8f0'}`,
                  borderRadius: '8px',
                  background: isToday ? '#fff5f5' : 'white',
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: isToday ? 700 : 500,
                    color: isToday ? COLORS.primary : '#1e293b',
                    marginBottom: '2px',
                  }}>
                    {day}
                  </div>
                  {events.slice(0, 2).map(e => {
                    const eventColor = getEventColor(e.type);
                    return (
                      <div key={e.id} style={{
                        fontSize: '9px',
                        padding: '2px 3px',
                        borderRadius: '3px',
                        marginBottom: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        background: eventColor.bg,
                        color: eventColor.color,
                        fontWeight: 500,
                      }}>
                        {e.title}
                      </div>
                    );
                  })}
                  {events.length > 2 && (
                    <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 500 }}>
                      +{events.length - 2}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Legend */}
          <div style={styles.card}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Leyenda</div>
            {[
              { type: 'class', label: 'Clase', color: '#1d4ed8' },
              { type: 'quiz', label: 'Quiz', color: '#b45309' },
              { type: 'assignment', label: 'Tarea', color: '#dc2626' },
              { type: 'exam', label: 'Examen', color: '#be185d' },
            ].map(item => (
              <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: item.color }} />
                <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div style={{ ...styles.card, flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Próximos</div>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => {
                const eventDate = new Date(event.date);
                const eventColor = getEventColor(event.type);
                return (
                  <div key={event.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
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
                      background: eventColor.bg,
                      color: eventColor.color,
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      {eventDate.getDate()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500 }}>{event.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{event.time}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '13px' }}>
                No hay eventos próximos
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
