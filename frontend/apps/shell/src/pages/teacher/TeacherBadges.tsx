import { useState } from 'react';
import { theme } from '@ub-lms/ui-components';
import { mockTeacherBadges } from '../../data/mockTeacher';

const CATEGORIES = ['Todas', 'Rapidez', 'Productividad', 'Constancia', 'Excelencia', 'Comunicación', 'Creatividad', 'Apoyo'];

export default function TeacherBadges() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const unlockedCount = mockTeacherBadges.filter(b => b.isUnlocked).length;
  const totalXp = mockTeacherBadges.filter(b => b.isUnlocked).reduce((a, b) => a + b.xpReward, 0);

  const filteredBadges = selectedCategory === 'Todas' 
    ? mockTeacherBadges 
    : mockTeacherBadges.filter(b => b.category === selectedCategory);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
      <div>
        <h1 style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text, margin: 0 }}>
          🏆 Insignias y Logros
        </h1>
        <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginTop: theme.spacing.xs }}>
          Desbloquea insignias cumpliendo desafíos y metas
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: theme.spacing.md }}>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '2rem' }}>🏅</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.secondary }}>{unlockedCount}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Insignias desbloqueadas</div>
            </div>
          </div>
        </div>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '2rem' }}>⚡</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.warning }}>{totalXp}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>DP acumulados</div>
            </div>
          </div>
        </div>
        <div style={{
          background: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.xl,
          boxShadow: theme.shadows.sm,
          border: `1px solid ${theme.colors.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
            <div style={{ fontSize: '2rem' }}>🎯</div>
            <div>
              <div style={{ fontSize: theme.fontSizes['2xl'], fontWeight: 700, color: theme.colors.text }}>{mockTeacherBadges.length - unlockedCount}</div>
              <div style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>Insignias por obtener</div>
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
          Categorías
        </h3>
        <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                borderRadius: theme.borderRadius.full,
                border: selectedCategory === cat ? 'none' : `1px solid ${theme.colors.border}`,
                background: selectedCategory === cat ? theme.colors.primary : theme.colors.white,
                color: selectedCategory === cat ? theme.colors.white : theme.colors.textSecondary,
                fontSize: theme.fontSizes.sm,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: theme.spacing.lg }}>
        {filteredBadges.map(badge => (
          <div key={badge.id} style={{
            background: theme.colors.white,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.xl,
            boxShadow: theme.shadows.sm,
            border: badge.isUnlocked ? `2px solid ${theme.colors.secondary}` : `1px solid ${theme.colors.border}`,
            opacity: badge.isUnlocked ? 1 : 0.8,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {!badge.isUnlocked && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, transparent 50%, ${theme.colors.backgroundAlt} 50%)`,
              }} />
            )}
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: theme.borderRadius.lg,
                background: badge.isUnlocked ? `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%)` : theme.colors.backgroundDark,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                flexShrink: 0,
              }}>
                {badge.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 600, 
                  fontSize: theme.fontSizes.base, 
                  color: theme.colors.text,
                  marginBottom: '4px',
                }}>
                  {badge.name}
                </div>
                <span style={{
                  fontSize: theme.fontSizes.xs,
                  padding: '2px 8px',
                  borderRadius: theme.borderRadius.full,
                  background: theme.colors.backgroundAlt,
                  color: theme.colors.textSecondary,
                }}>
                  {badge.category}
                </span>
              </div>
              {badge.isUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  right: theme.spacing.md,
                  fontSize: '1.25rem',
                }}>
                  ✅
                </div>
              )}
            </div>

            <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginBottom: theme.spacing.md }}>
              {badge.description}
            </p>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              paddingTop: theme.spacing.md,
              borderTop: `1px solid ${theme.colors.border}`,
            }}>
              <div style={{
                padding: '4px 10px',
                borderRadius: theme.borderRadius.full,
                background: badge.isUnlocked ? theme.colors.successLight : theme.colors.warningLight,
                color: badge.isUnlocked ? theme.colors.success : theme.colors.warning,
                fontSize: theme.fontSizes.sm,
                fontWeight: 600,
              }}>
                +{badge.xpReward} DP
              </div>
              
              {!badge.isUnlocked && badge.progress !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <div style={{ 
                    width: '80px', 
                    height: 6, 
                    background: theme.colors.backgroundDark, 
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${(badge.progress / (badge.requirement || 1)) * 100}%`, 
                      background: theme.colors.warning,
                      borderRadius: 3,
                    }} />
                  </div>
                  <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>
                    {badge.progress}/{badge.requirement}
                  </span>
                </div>
              )}
              
              {badge.isUnlocked && badge.unlockedAt && (
                <span style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary }}>
                  {new Date(badge.unlockedAt).toLocaleDateString('es-CO')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
