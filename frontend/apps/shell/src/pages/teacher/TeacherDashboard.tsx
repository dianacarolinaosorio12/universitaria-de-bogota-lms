import { theme } from '@ub-lms/ui-components';

const mockTeacherStats = {
  xp: 2850,
  level: 5,
  levelName: 'Experto',
  streak: 12,
  ranking: 3,
  departmentRanking: 1,
  totalStudents: 127,
  coursesCount: 3,
  responseTime: '6.2h',
  gradingPercentage: 94,
  classPunctuality: 100,
  satisfaction: 4.7,
};

const mockDailyChallenges = [
  { id: '1', title: 'Responder 5 mensajes de foro', progress: 3, target: 5, xpReward: 75, isCompleted: false },
  { id: '2', title: 'Calificar 8 tareas pendientes', progress: 8, target: 8, xpReward: 130, isCompleted: true },
  { id: '3', title: 'Iniciar clase Teams a tiempo', progress: 1, target: 1, xpReward: 65, isCompleted: true },
];

const mockCourses = [
  { id: '1', code: 'RC101', name: 'Redes de Computadoras I', students: 45, progress: 72, satisfaction: 4.8, pendingGrading: 3 },
  { id: '2', code: 'SI201', name: 'Seguridad Informática', students: 38, progress: 65, satisfaction: 4.6, pendingGrading: 2 },
  { id: '3', code: 'SO301', name: 'Sistemas Operativos', students: 44, progress: 58, satisfaction: 4.5, pendingGrading: 5 },
];

const mockAtRiskStudents = [
  { id: '1', name: 'María López R.', course: 'Redes I', lastAccess: '5 días', score: 78, initials: 'ML' },
  { id: '2', name: 'Carlos Gómez', course: 'Sist. Op.', lastAccess: '3 días', score: 65, initials: 'CG' },
  { id: '3', name: 'Ana Torres', course: 'Seguridad', lastAccess: '2 días', score: 55, initials: 'AT' },
];

const mockTopDepartment = [
  { name: 'Juan Carlos P. (Tú)', dp: 2850, isYou: true },
  { name: 'María García', dp: 2720, isYou: false },
  { name: 'Carlos Rodríguez', dp: 2580, isYou: false },
  { name: 'Ana Martínez', dp: 2340, isYou: false },
  { name: 'Luis Hernández', dp: 2180, isYou: false },
];

const mockTips = [
  { id: '1', title: 'Estudiante necesita atención', description: 'María López lleva 5 días sin acceder', priority: 'high', dpReward: 50 },
  { id: '2', title: 'Cerca de nueva insignia', description: 'Te faltan 2 respuestas para "Siempre Presente"', priority: 'high', dpReward: 400 },
  { id: '3', title: 'Mejora tu puntualidad', description: 'Iniciar clases 5 min antes aumentaría tu score', priority: 'medium', dpReward: 75 },
  { id: '4', title: 'Desafío disponible', description: 'Completa 3 calificaciones hoy para bonus', priority: 'medium', dpReward: 100 },
];

export default function TeacherDashboard() {
  const stats = mockTeacherStats;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      {/* Stats Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: theme.spacing.md }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.infoLight}, ${theme.colors.info})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⏱️</div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>-12%</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text }}>{stats.responseTime}</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Tiempo de Respuesta</div>
          <div style={{ height: 6, background: theme.colors.backgroundDark, borderRadius: 3, marginTop: theme.spacing.sm, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '92%', background: `linear-gradient(90deg, ${theme.colors.info}, #2563eb)`, borderRadius: 3 }} />
          </div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.successLight}, ${theme.colors.success})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>✅</div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+5%</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text }}>{stats.gradingPercentage}%</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Tareas Calificadas</div>
          <div style={{ height: 6, background: theme.colors.backgroundDark, borderRadius: 3, marginTop: theme.spacing.sm, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '94%', background: `linear-gradient(90deg, ${theme.colors.success}, #059669)`, borderRadius: 3 }} />
          </div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, #f3e8ff, #8b5cf6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎯</div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+3%</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text }}>{stats.classPunctuality}%</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Puntualidad Clases</div>
          <div style={{ height: 6, background: theme.colors.backgroundDark, borderRadius: 3, marginTop: theme.spacing.sm, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, #8b5cf6, #7c3aed)`, borderRadius: 3 }} />
          </div>
        </div>

        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
            <div style={{ width: 40, height: 40, borderRadius: theme.borderRadius.lg, background: `linear-gradient(135deg, ${theme.colors.warningLight}, ${theme.colors.warning})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⭐</div>
            <span style={{ fontSize: theme.fontSizes.xs, fontWeight: 600, color: theme.colors.success, background: theme.colors.successLight, padding: '2px 8px', borderRadius: theme.borderRadius.sm }}>+0.2</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: theme.colors.text }}>{stats.satisfaction}/5</div>
          <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Satisfacción</div>
          <div style={{ height: 6, background: theme.colors.backgroundDark, borderRadius: 3, marginTop: theme.spacing.sm, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '94%', background: `linear-gradient(90deg, ${theme.colors.warning}, #d97706)`, borderRadius: 3 }} />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: theme.spacing.xl }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
          {/* AI Recommendations */}
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
              <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
                💡 Recomendaciones IA
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: theme.spacing.md }}>
              {mockTips.map(tip => (
                <div key={tip.id} style={{
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${tip.priority === 'high' ? theme.colors.dangerLight : theme.colors.infoLight}`,
                  backgroundColor: tip.priority === 'high' ? theme.colors.dangerLight : theme.colors.infoLight,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.xs }}>
                    <span style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>{tip.title}</span>
                    <span style={{
                      fontSize: theme.fontSizes.xs,
                      fontWeight: 600,
                      color: tip.priority === 'high' ? theme.colors.danger : theme.colors.info,
                      background: theme.colors.white,
                      padding: '2px 8px',
                      borderRadius: theme.borderRadius.full,
                    }}>+{tip.dpReward} DP</span>
                  </div>
                  <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary, margin: 0 }}>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenges */}
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
              <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
                🎯 Desafíos del Día
              </h3>
              <span style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>Reinicio en 8h 23m</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              {mockDailyChallenges.map(challenge => (
                <div key={challenge.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  backgroundColor: challenge.isCompleted ? theme.colors.successLight : theme.colors.backgroundAlt,
                  border: `1px solid ${challenge.isCompleted ? theme.colors.success : theme.colors.border}`,
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: theme.borderRadius.lg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    backgroundColor: challenge.isCompleted ? theme.colors.success : theme.colors.backgroundDark,
                    color: challenge.isCompleted ? theme.colors.white : theme.colors.textSecondary,
                  }}>
                    {challenge.isCompleted ? '✓' : '🎯'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>
                      {challenge.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.xs }}>
                      <div style={{ flex: 1, height: 6, background: theme.colors.backgroundDark, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${(challenge.progress / challenge.target) * 100}%`,
                          background: challenge.isCompleted ? theme.colors.success : theme.colors.primary,
                          borderRadius: 3,
                        }} />
                      </div>
                      <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>
                        {challenge.progress}/{challenge.target}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: theme.fontSizes.sm,
                      color: challenge.isCompleted ? theme.colors.success : theme.colors.warning,
                    }}>
                      {challenge.xpReward} DP
                    </div>
                    {!challenge.isCompleted && (
                      <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.warning }}>x1.3</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
          {/* Students at Risk */}
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
              <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
                ⚠️ Estudiantes en Riesgo
              </h3>
              <span style={{
                fontSize: theme.fontSizes.xs,
                fontWeight: 600,
                color: theme.colors.danger,
                background: theme.colors.dangerLight,
                padding: '2px 8px',
                borderRadius: theme.borderRadius.full,
              }}>{mockAtRiskStudents.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
              {mockAtRiskStudents.map(student => (
                <div key={student.id} style={{
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.lg,
                  background: theme.colors.dangerLight,
                  border: `1px solid ${theme.colors.danger}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.xs }}>
                    <span style={{ fontWeight: 600, fontSize: theme.fontSizes.sm, color: theme.colors.text }}>{student.name}</span>
                    <span style={{
                      fontSize: theme.fontSizes.xs,
                      fontWeight: 700,
                      color: theme.colors.danger,
                      background: theme.colors.white,
                      padding: '2px 6px',
                      borderRadius: '50%',
                      border: `2px solid ${theme.colors.danger}`,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>{student.score}%</span>
                  </div>
                  <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary, marginBottom: theme.spacing.sm }}>
                    {student.course} • Último acceso: hace {student.lastAccess}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '6px 12px',
                    borderRadius: theme.borderRadius.md,
                    border: 'none',
                    background: theme.colors.primary,
                    color: theme.colors.white,
                    fontSize: theme.fontSizes.xs,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}>
                    📩 Contactar (+50 DP)
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Ranking */}
          <div style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.md,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
              <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text, margin: 0 }}>
                🏆 Top 5 Departamento
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
              {mockTopDepartment.map((teacher, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  padding: theme.spacing.sm,
                  borderRadius: theme.borderRadius.md,
                  backgroundColor: teacher.isYou ? theme.colors.infoLight : 'transparent',
                  border: teacher.isYou ? `1px solid ${theme.colors.info}` : 'none',
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: theme.fontSizes.xs,
                    fontWeight: 700,
                    background: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#d97706' : theme.colors.backgroundDark,
                    color: index < 3 ? (index === 0 ? '#78350f' : '#fff') : theme.colors.textSecondary,
                  }}>{index + 1}</div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontWeight: 600,
                      fontSize: theme.fontSizes.sm,
                      color: theme.colors.text,
                    }}>{teacher.name}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: theme.colors.warning }}>{teacher.dp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <h3 style={{ fontSize: theme.fontSizes.lg, fontWeight: 700, color: theme.colors.text, marginBottom: theme.spacing.lg }}>
          📚 Mis Cursos del Período
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.lg }}>
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
                  <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary }}>{course.code}</div>
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
                <span style={{ fontWeight: 600, color: theme.colors.warning }}>⚡ {Math.floor(course.students * 0.8)} DP ganados</span>
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
    </div>
  );
}
