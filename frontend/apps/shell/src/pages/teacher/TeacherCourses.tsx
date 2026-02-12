import { theme } from '@ub-lms/ui-components';

const mockCourses = [
  { 
    id: '1', 
    code: 'RC101', 
    name: 'Redes de Computadoras I', 
    schedule: 'Lun/Mié 8:00-10:00',
    students: 45, 
    progress: 72, 
    satisfaction: 4.8, 
    pendingGrading: 3,
    attendance: 100,
    punctuality: 98,
    responseTime: '5.8h',
    content: 95,
  },
  { 
    id: '2', 
    code: 'SI201', 
    name: 'Seguridad Informática', 
    schedule: 'Mar/Jue 10:00-12:00',
    students: 38, 
    progress: 65, 
    satisfaction: 4.6, 
    pendingGrading: 2,
    attendance: 100,
    punctuality: 100,
    responseTime: '6.5h',
    content: 90,
  },
  { 
    id: '3', 
    code: 'SO301', 
    name: 'Sistemas Operativos', 
    schedule: 'Vie 14:00-18:00',
    students: 44, 
    progress: 58, 
    satisfaction: 4.5, 
    pendingGrading: 5,
    attendance: 100,
    punctuality: 95,
    responseTime: '7.2h',
    content: 88,
  },
];

export default function TeacherCourses() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
            📚 Mis Cursos del Período
          </h1>
          <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
            {mockCourses.length} cursos asignados • {mockCourses.reduce((a, c) => a + c.students, 0)} estudiantes totales
          </p>
        </div>
        <button style={{
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          borderRadius: theme.borderRadius.lg,
          border: 'none',
          background: theme.colors.primary,
          color: theme.colors.white,
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          ➕ Agregar curso
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: theme.spacing.lg }}>
        {mockCourses.map(course => (
          <div key={course.id} style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.sm,
            border: `1px solid ${theme.colors.border}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.md }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: theme.fontSizes.lg, color: theme.colors.text }}>{course.name}</div>
                <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>{course.code} • {course.schedule}</div>
              </div>
              <span style={{
                fontSize: theme.fontSizes.xs,
                fontWeight: 500,
                color: course.pendingGrading > 2 ? theme.colors.danger : theme.colors.warning,
                background: course.pendingGrading > 2 ? theme.colors.dangerLight : theme.colors.warningLight,
                padding: '2px 8px',
                borderRadius: theme.borderRadius.full,
              }}>{course.pendingGrading} en riesgo</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
              <div style={{ textAlign: 'center', padding: theme.spacing.sm, background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.md }}>
                <div style={{ fontSize: theme.fontSizes.xl, fontWeight: 700, color: theme.colors.text }}>{course.students}</div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Estudiantes</div>
              </div>
              <div style={{ textAlign: 'center', padding: theme.spacing.sm, background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.md }}>
                <div style={{ fontSize: theme.fontSizes.xl, fontWeight: 700, color: theme.colors.success }}>{course.satisfaction}</div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>satisfacción</div>
              </div>
              <div style={{ textAlign: 'center', padding: theme.spacing.sm, background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.md }}>
                <div style={{ fontSize: theme.fontSizes.xl, fontWeight: 700, color: theme.colors.warning }}>{course.pendingGrading}</div>
                <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Pendientes</div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.fontSizes.sm, padding: '4px 8px', background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.sm }}>
                <span style={{ color: theme.colors.textSecondary }}>Asistencia</span>
                <span style={{ fontWeight: 600 }}>{course.attendance}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.fontSizes.sm, padding: '4px 8px', background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.sm }}>
                <span style={{ color: theme.colors.textSecondary }}>Puntualidad</span>
                <span style={{ fontWeight: 600 }}>{course.punctuality}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.fontSizes.sm, padding: '4px 8px', background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.sm }}>
                <span style={{ color: theme.colors.textSecondary }}>Tiempo resp.</span>
                <span style={{ fontWeight: 600 }}>{course.responseTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.fontSizes.sm, padding: '4px 8px', background: theme.colors.backgroundAlt, borderRadius: theme.borderRadius.sm }}>
                <span style={{ color: theme.colors.textSecondary }}>Contenido</span>
                <span style={{ fontWeight: 600 }}>{course.content}%</span>
              </div>
            </div>
            
            <div style={{ marginBottom: theme.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: theme.fontSizes.sm, marginBottom: 6 }}>
                <span style={{ color: theme.colors.textSecondary }}>Progreso del curso</span>
                <span style={{ fontWeight: 600 }}>{course.progress}%</span>
              </div>
              <div style={{ height: 6, background: theme.colors.backgroundDark, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${course.progress}%`, background: theme.colors.primary, borderRadius: 3 }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: theme.spacing.md, borderTop: `1px solid ${theme.colors.border}` }}>
              <span style={{ fontWeight: 600, color: theme.colors.warning }}>⚡ {Math.floor(course.students * 0.8 * 10)} DP ganados</span>
              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <button style={{
                  padding: '6px 12px',
                  borderRadius: theme.borderRadius.md,
                  border: 'none',
                  background: theme.colors.backgroundAlt,
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSizes.xs,
                  cursor: 'pointer',
                }}>👥 Estudiantes</button>
                <button style={{
                  padding: '6px 12px',
                  borderRadius: theme.borderRadius.md,
                  border: 'none',
                  background: theme.colors.primary,
                  color: theme.colors.white,
                  fontSize: theme.fontSizes.xs,
                  cursor: 'pointer',
                }}>📹 Teams</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
