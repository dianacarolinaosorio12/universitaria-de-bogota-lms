import { useState } from 'react';
import { theme } from '@ub-lms/ui-components';
import { mockTeacherCalendar } from '../../data/mockTeacher';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const EVENT_COLORS: Record<string, string> = {
  class: '#3B82F6',
  grading: '#F59E0B',
  meeting: '#8B5CF6',
  exam: '#EF4444',
  deadline: '#EC4899',
};

const EVENT_LABELS: Record<string, string> = {
  class: 'Clase',
  grading: 'Calificación',
  meeting: 'Reunión',
  exam: 'Examen',
  deadline: 'Entrega',
};

export default function TeacherCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<typeof mockTeacherCalendar[0] | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isToday = (day: number) => 
    today.getFullYear() === year && 
    today.getMonth() === month && 
    today.getDate() === day;

  const getEventsForDay = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return mockTeacherCalendar.filter(e => e.date.startsWith(dateStr));
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const days = [];
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
  }
  
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
  }

  const upcomingEvents = mockTeacherCalendar
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div>
        <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          📅 Calendario Académico
        </h1>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
          Organiza tus clases, evaluaciones y reuniones
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: theme.spacing.lg }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.md,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
              <button onClick={prevMonth} style={{
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                background: theme.colors.backgroundAlt,
                cursor: 'pointer',
                fontSize: '1rem',
              }}>◀</button>
              <h2 style={{ fontSize: theme.fontSizes.xl, fontWeight: 700, color: theme.colors.text, margin: 0, minWidth: '200px', textAlign: 'center' }}>
                {MONTHS[month]} {year}
              </h2>
              <button onClick={nextMonth} style={{
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                background: theme.colors.backgroundAlt,
                cursor: 'pointer',
                fontSize: '1rem',
              }}>▶</button>
            </div>
            <button onClick={goToToday} style={{
              padding: `${theme.spacing.xs} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.md,
              border: `1px solid ${theme.colors.primary}`,
              background: 'transparent',
              color: theme.colors.primary,
              fontSize: theme.fontSizes.sm,
              cursor: 'pointer',
              fontWeight: 500,
            }}>
              Hoy
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: theme.spacing.sm }}>
            {DAYS.map(day => (
              <div key={day} style={{
                textAlign: 'center',
                padding: theme.spacing.sm,
                fontSize: theme.fontSizes.sm,
                fontWeight: 600,
                color: theme.colors.textSecondary,
              }}>
                {day}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {days.map((d, idx) => {
              const events = getEventsForDay(d.day);
              return (
                <div
                  key={idx}
                  onClick={() => events.length > 0 && setSelectedEvent(events[0])}
                  style={{
                    minHeight: '90px',
                    padding: theme.spacing.xs,
                    backgroundColor: !d.isCurrentMonth ? theme.colors.backgroundAlt : theme.colors.white,
                    borderRadius: theme.borderRadius.md,
                    cursor: events.length > 0 ? 'pointer' : 'default',
                    opacity: d.isCurrentMonth ? 1 : 0.5,
                    border: isToday(d.day) ? `2px solid ${theme.colors.primary}` : '1px solid transparent',
                  }}
                >
                  <div style={{
                    fontSize: theme.fontSizes.sm,
                    fontWeight: isToday(d.day) ? 700 : 400,
                    color: isToday(d.day) ? theme.colors.primary : theme.colors.text,
                    marginBottom: '4px',
                  }}>
                    {d.day}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {events.slice(0, 2).map(e => (
                      <div key={e.id} style={{
                        fontSize: '0.6rem',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        backgroundColor: EVENT_COLORS[e.type],
                        color: '#fff',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {e.title.length > 15 ? e.title.substring(0, 15) + '...' : e.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <div style={{ fontSize: '0.6rem', color: theme.colors.textSecondary }}>
                        +{events.length - 2}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.lg,
            boxShadow: theme.shadows.md,
          }}>
            <h3 style={{ fontSize: theme.fontSizes.base, fontWeight: 600, color: theme.colors.text, margin: `0 0 ${theme.spacing.md}` }}>
              Leyenda
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
              {Object.entries(EVENT_LABELS).map(([type, label]) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: EVENT_COLORS[type],
                  }} />
                  <span style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.lg,
            boxShadow: theme.shadows.md,
            flex: 1,
          }}>
            <h3 style={{ fontSize: theme.fontSizes.base, fontWeight: 600, color: theme.colors.text, margin: `0 0 ${theme.spacing.md}` }}>
              Próximas Actividades
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
              {upcomingEvents.map(event => {
                const eventDate = new Date(event.date);
                return (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    style={{
                      padding: theme.spacing.sm,
                      borderRadius: theme.borderRadius.md,
                      backgroundColor: theme.colors.backgroundAlt,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs, marginBottom: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: EVENT_COLORS[event.type],
                      }} />
                      <span style={{
                        fontSize: theme.fontSizes.xs,
                        color: theme.colors.textSecondary,
                      }}>
                        {eventDate.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ fontSize: theme.fontSizes.sm, fontWeight: 500, color: theme.colors.text }}>
                      {event.title}
                    </div>
                    {event.courseCode && (
                      <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>
                        {event.courseCode} {event.duration && `• ${event.duration}`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: theme.colors.white,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.xl,
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.md }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: theme.borderRadius.full,
                  backgroundColor: EVENT_COLORS[selectedEvent.type],
                  color: '#fff',
                  fontSize: theme.fontSizes.xs,
                  fontWeight: 600,
                  marginBottom: theme.spacing.sm,
                }}>
                  {EVENT_LABELS[selectedEvent.type]}
                </span>
                <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, margin: 0 }}>
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: theme.colors.textSecondary,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
              {selectedEvent.courseCode && (
                <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>
                  <strong>Curso:</strong> {selectedEvent.courseCode}
                </div>
              )}
              <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>
                <strong>Fecha y hora:</strong> {new Date(selectedEvent.date).toLocaleDateString('es-CO', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              {selectedEvent.duration && (
                <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>
                  <strong>Duración:</strong> {selectedEvent.duration}
                </div>
              )}
            </div>
            <div style={{ marginTop: theme.spacing.lg, display: 'flex', gap: theme.spacing.sm }}>
              <button style={{
                flex: 1,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                background: theme.colors.primary,
                color: theme.colors.white,
                fontSize: theme.fontSizes.sm,
                fontWeight: 500,
                cursor: 'pointer',
              }}>
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
