import { theme } from '@ub-lms/ui-components';
import { mockTeacherMetrics } from '../../data/mockTeacher';

export default function TeacherMetrics() {
  const { monthly, weekly, trends } = mockTeacherMetrics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div>
        <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          📈 Métricas y Desempeño
        </h1>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
          Analiza tu desempeño como docente
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing.md }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.infoLight}, ${theme.colors.info})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              📚
            </div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+2</span>
          </div>
          <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{monthly.classesTaught}</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Clases este mes</div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.successLight}, ${theme.colors.success})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              ⏱️
            </div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+5h</span>
          </div>
          <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{monthly.hoursTaught}h</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Horas dictadas</div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, #f3e8ff, #8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              👥
            </div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+1.2%</span>
          </div>
          <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{monthly.avgAttendance}%</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Asistencia promedio</div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.warningLight}, ${theme.colors.warning})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              ⭐
            </div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+0.2</span>
          </div>
          <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{monthly.avgSatisfaction}/5</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Satisfacción</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: theme.spacing.lg }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.md,
        }}>
          <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.xl }}>
            📊 Tendencias de Desempeño
          </h3>
          
          <div style={{ marginBottom: theme.spacing.xl }}>
            <h4 style={{ fontSize: theme.fontSizes.sm, fontWeight: 600, color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
              Satisfacción por Mes
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: theme.spacing.md, height: '150px' }}>
              {trends.map((t, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.xs }}>
                  <div style={{
                    width: '100%',
                    height: `${(t.satisfaction / 5) * 130}px`,
                    background: `linear-gradient(180deg, ${theme.colors.warning} 0%, ${theme.colors.warningLight} 100%)`,
                    borderRadius: theme.borderRadius.md,
                    transition: 'height 0.3s',
                  }} />
                  <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>{t.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: theme.fontSizes.sm, fontWeight: 600, color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
              Asistencia por Mes
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: theme.spacing.md, height: '150px' }}>
              {trends.map((t, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.xs }}>
                  <div style={{
                    width: '100%',
                    height: `${(t.attendance / 100) * 130}px`,
                    background: `linear-gradient(180deg, ${theme.colors.info} 0%, ${theme.colors.infoLight} 100%)`,
                    borderRadius: theme.borderRadius.md,
                    transition: 'height 0.3s',
                  }} />
                  <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>{t.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
              ⚡ Esta Semana
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.textSecondary }}>Clases dictadas</span>
                <span style={{ fontWeight: 600, color: theme.colors.text }}>{weekly.classesThisWeek}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.textSecondary }}>Horas de clase</span>
                <span style={{ fontWeight: 600, color: theme.colors.text }}>{weekly.hoursThisWeek}h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.textSecondary }}>Tareas calificadas</span>
                <span style={{ fontWeight: 600, color: theme.colors.success }}>{weekly.assignmentsGraded}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: theme.colors.textSecondary }}>Estudiantes ayudados</span>
                <span style={{ fontWeight: 600, color: theme.colors.info }}>{weekly.studentsHelped}</span>
              </div>
            </div>
          </div>

          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
              🏆 Logros del Período
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                <div style={{ fontSize: '1.5rem' }}>✅</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>Docente Destacado</div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.success }}>Top 5% mejores evaluados</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                <div style={{ fontSize: '1.5rem' }}>📈</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>Mejora Continua</div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.success }}>+15% en satisfacción</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md }}>
                <div style={{ fontSize: '1.5rem' }}>⏰</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>Puntualidad Perfecta</div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.success }}>100% clases a tiempo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.lg }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.md,
        }}>
          <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
            💬 Comunicación
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Tiempo de respuesta</span>
                <span style={{ fontWeight: 600 }}>{monthly.responseTime}</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '85%', background: theme.colors.success, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Respuestas en foros</span>
                <span style={{ fontWeight: 600 }}>{monthly.forumResponses}</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '70%', background: theme.colors.info, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Interacciones con estudiantes</span>
                <span style={{ fontWeight: 600 }}>{monthly.studentInteractions}</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '90%', background: theme.colors.warning, borderRadius: 4 }} />
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
          <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
            📝 Productividad
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Calificaciones entregadas</span>
                <span style={{ fontWeight: 600 }}>94%</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94%', background: theme.colors.success, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Tiempo de corrección</span>
                <span style={{ fontWeight: 600 }}>{monthly.gradingTurnaround}</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '75%', background: theme.colors.info, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Recursos subidos</span>
                <span style={{ fontWeight: 600 }}>28</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '65%', background: theme.colors.primary, borderRadius: 4 }} />
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
          <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 600, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
            📊 Evaluación
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Satisfacción estudiantes</span>
                <span style={{ fontWeight: 600 }}>{monthly.avgSatisfaction}/5</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '94%', background: theme.colors.warning, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Clases puntuales</span>
                <span style={{ fontWeight: 600 }}>100%</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: theme.colors.success, borderRadius: 4 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
                <span style={{ color: theme.colors.textSecondary }}>Retención estudiantes</span>
                <span style={{ fontWeight: 600 }}>96%</span>
              </div>
              <div style={{ height: 8, background: theme.colors.backgroundDark, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '96%', background: theme.colors.info, borderRadius: 4 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
