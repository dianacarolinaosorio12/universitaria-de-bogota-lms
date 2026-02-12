import { useState } from 'react';
import { theme } from '@ub-lms/ui-components';
import { mockTeacherStudents } from '../../data/mockTeacher';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return theme.colors.success;
    case 'warning': return theme.colors.warning;
    case 'at-risk': return theme.colors.danger;
    default: return theme.colors.textSecondary;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Activo';
    case 'warning': return 'En warning';
    case 'at-risk': return 'En riesgo';
    default: return 'Desconocido';
  }
};

export default function TeacherStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const isMobile = useMediaQuery('md');
  const isTablet = useMediaQuery('lg');

  const courses = ['RC101', 'SI201', 'SO301'];

  const filteredStudents = mockTeacherStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const atRiskCount = mockTeacherStudents.filter(s => s.status === 'at-risk').length;
  const warningCount = mockTeacherStudents.filter(s => s.status === 'warning').length;
  const activeCount = mockTeacherStudents.filter(s => s.status === 'active').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div>
        <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          👥 Gestión de Estudiantes
        </h1>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
          {mockTeacherStudents.length} estudiantes • {atRiskCount} en riesgo • {warningCount} en warning
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.md }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '1.5rem' }}>✅</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.success }}>{activeCount}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Activos</div>
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
            <div style={{ fontSize: '1.5rem' }}>⚠️</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.warning }}>{warningCount}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>En warning</div>
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
            <div style={{ fontSize: '1.5rem' }}>🚨</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.danger }}>{atRiskCount}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>En riesgo</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        background: theme.colors.white,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        boxShadow: theme.shadows.md,
      }}>
        <div style={{ display: 'flex', gap: theme.spacing.md, marginBottom: theme.spacing.lg, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.border}`,
              fontSize: theme.fontSizes.sm,
              outline: 'none',
            }}
          />
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.border}`,
              fontSize: theme.fontSizes.sm,
              outline: 'none',
              background: theme.colors.white,
              cursor: 'pointer',
            }}
          >
            <option value="all">Todos los cursos</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${theme.colors.border}`,
              fontSize: theme.fontSizes.sm,
              outline: 'none',
              background: theme.colors.white,
              cursor: 'pointer',
            }}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="warning">En warning</option>
            <option value="at-risk">En riesgo</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          {filteredStudents.map(student => (
            <div key={student.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.lg,
              padding: theme.spacing.lg,
              background: student.status === 'at-risk' ? theme.colors.dangerLight : 
                         student.status === 'warning' ? theme.colors.warningLight : theme.colors.backgroundAlt,
              borderRadius: theme.borderRadius.lg,
              border: `1px solid ${student.status === 'at-risk' ? theme.colors.danger : 
                                  student.status === 'warning' ? theme.colors.warning : theme.colors.border}`,
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: theme.colors.primary,
                color: theme.colors.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: theme.fontSizes.sm,
                flexShrink: 0,
              }}>
                {student.avatar}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: theme.colors.text }}>{student.name}</span>
                  <span style={{
                    fontSize: theme.fontSizes.xs,
                    padding: '2px 8px',
                    borderRadius: theme.borderRadius.full,
                    background: getStatusColor(student.status),
                    color: theme.colors.white,
                    fontWeight: 500,
                  }}>
                    {getStatusLabel(student.status)}
                  </span>
                </div>
                <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>
                  {student.email} • {student.course} - {student.courseName}
                </div>
              </div>

              <div style={{ display: 'flex', gap: theme.spacing.xl, textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text }}>{student.attendance}%</div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Asistencia</div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: theme.fontSizes.lg, 
                    fontWeight: 700, 
                    color: student.avgGrade >= 4 ? theme.colors.success : 
                           student.avgGrade >= 3 ? theme.colors.warning : theme.colors.danger 
                  }}>
                    {student.avgGrade}
                  </div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Promedio</div>
                </div>
                <div>
                  <div style={{ fontSize: theme.fontSizes.sm, fontWeight: 500, color: theme.colors.textSecondary }}>{student.lastAccess}</div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Último acceso</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: theme.spacing.sm }}>
                <button style={{
                  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                  borderRadius: theme.borderRadius.md,
                  border: 'none',
                  background: theme.colors.primary,
                  color: theme.colors.white,
                  fontSize: theme.fontSizes.sm,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}>
                  📝 Ver detalle
                </button>
                {student.status !== 'active' && (
                  <button style={{
                    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                    borderRadius: theme.borderRadius.md,
                    border: `1px solid ${theme.colors.warning}`,
                    background: 'transparent',
                    color: theme.colors.warning,
                    fontSize: theme.fontSizes.sm,
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}>
                    📩 Contactar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
