import { useState } from 'react';
import { theme } from '@ub-lms/ui-components';
import { mockTeacherGrades } from '../../data/mockTeacher';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Quiz': return '❓';
    case 'Assignment': return '📝';
    case 'Exam': return '📋';
    case 'Lab': return '🔬';
    default: return '📄';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Quiz': return theme.colors.info;
    case 'Assignment': return theme.colors.warning;
    case 'Exam': return theme.colors.primary;
    case 'Lab': return theme.colors.success;
    default: return theme.colors.textSecondary;
  }
};

export default function TeacherGrades() {
  const [selectedCourse, setSelectedCourse] = useState(mockTeacherGrades[0]?.courseId || '');

  const course = mockTeacherGrades.find(c => c.courseId === selectedCourse);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div>
        <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          ✅ Gestión de Calificaciones
        </h1>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
          Administra las calificaciones de tus cursos
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing.md }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '1.5rem' }}>📚</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>
                {mockTeacherGrades.length}
              </div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Cursos</div>
            </div>
          </div>
        </div>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '1.5rem' }}>👥</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>
                {mockTeacherGrades.reduce((a, c) => a + c.students, 0)}
              </div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Estudiantes</div>
            </div>
          </div>
        </div>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '1.5rem' }}>📊</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.success }}>
                {mockTeacherGrades.reduce((a, c) => a + c.activities.length, 0)}
              </div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Actividades</div>
            </div>
          </div>
        </div>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.danger}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '1.5rem' }}>⏳</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.danger }}>
                {mockTeacherGrades.reduce((a, c) => a + c.pendingGrading, 0)}
              </div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Por calificar</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: theme.spacing.md, overflowX: 'auto', paddingBottom: theme.spacing.sm }}>
        {mockTeacherGrades.map(c => (
          <button
            key={c.courseId}
            onClick={() => setSelectedCourse(c.courseId)}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              borderRadius: theme.borderRadius.lg,
              border: selectedCourse === c.courseId ? 'none' : `1px solid ${theme.colors.border}`,
              background: selectedCourse === c.courseId ? theme.colors.primary : theme.colors.white,
              color: selectedCourse === c.courseId ? theme.colors.white : theme.colors.text,
              fontSize: theme.fontSizes.sm,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
            }}
          >
            <span>{c.courseCode}</span>
            {c.pendingGrading > 0 && (
              <span style={{
                padding: '2px 6px',
                borderRadius: theme.borderRadius.full,
                background: selectedCourse === c.courseId ? 'rgba(255,255,255,0.3)' : theme.colors.dangerLight,
                color: selectedCourse === c.courseId ? theme.colors.white : theme.colors.danger,
                fontSize: theme.fontSizes.xs,
              }}>
                {c.pendingGrading}
              </span>
            )}
          </button>
        ))}
      </div>

      {course && (
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.md,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.xl }}>
            <div>
              <div style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.primary, marginBottom: '4px' }}>
                {course.courseCode}
              </div>
              <h2 style={{ fontSize: theme.fontSizes.xl, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
                {course.courseName}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: theme.spacing.xl }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{course.students}</div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Estudiantes</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.success }}>{course.avgGrade}</div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Promedio</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: course.pendingGrading > 0 ? theme.colors.danger : theme.colors.success }}>
                  {course.pendingGrading}
                </div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Pendientes</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
              Actividades del Curso
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              {course.activities.map(activity => (
                <div key={activity.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.lg,
                  padding: theme.spacing.lg,
                  background: theme.colors.backgroundAlt,
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${theme.colors.border}`,
                }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: theme.borderRadius.lg,
                    background: getTypeColor(activity.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {getTypeIcon(activity.type)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: theme.colors.text, marginBottom: '4px' }}>{activity.name}</div>
                    <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>
                      {activity.type} • Entrega: {new Date(activity.dueDate).toLocaleDateString('es-CO')}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
                    <div>
                      <div style={{ 
                        fontSize: theme.fontSizes.sm, 
                        color: theme.colors.textSecondary,
                        marginBottom: '4px',
                      }}>
                        Entregas
                      </div>
                      <div style={{ fontWeight: 600, color: theme.colors.text }}>
                        {activity.submitted}/{activity.total}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: theme.fontSizes.sm, 
                        color: theme.colors.textSecondary,
                        marginBottom: '4px',
                      }}>
                        Promedio
                      </div>
                      <div style={{ 
                        fontWeight: 600, 
                        color: activity.avgGrade ? 
                          (activity.avgGrade >= 4 ? theme.colors.success : 
                           activity.avgGrade >= 3 ? theme.colors.warning : theme.colors.danger) : 
                          theme.colors.textSecondary 
                      }}>
                        {activity.avgGrade ? activity.avgGrade.toFixed(1) : '—'}
                      </div>
                    </div>
                  </div>

                  <button style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    borderRadius: theme.borderRadius.md,
                    border: 'none',
                    background: activity.avgGrade === null ? theme.colors.warning : theme.colors.primary,
                    color: theme.colors.white,
                    fontSize: theme.fontSizes.sm,
                    cursor: 'pointer',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>
                    {activity.avgGrade === null ? `Calificar (${activity.submitted})` : 'Ver entregas'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
