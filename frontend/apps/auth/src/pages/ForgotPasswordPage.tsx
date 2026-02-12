import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '@ub-lms/ui-components';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with backend password reset endpoint
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
      padding: '1rem',
    }}>
      <div style={{
        background: theme.colors.white, borderRadius: '1rem', padding: '2.5rem',
        width: '100%', maxWidth: '420px', boxShadow: theme.shadows.xl,
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: theme.colors.primary, color: theme.colors.white,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 800, margin: '0 auto 1rem',
          }}>U</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: theme.colors.text, margin: '0 0 0.25rem' }}>
            Recuperar Contraseña
          </h1>
          <p style={{ color: theme.colors.textSecondary, fontSize: '0.875rem' }}>
            Te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: theme.colors.successLight, color: theme.colors.success,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', margin: '0 auto 1rem',
            }}>✓</div>
            <p style={{ color: theme.colors.text, fontWeight: 500, marginBottom: '0.5rem' }}>
              Correo enviado
            </p>
            <p style={{ color: theme.colors.textSecondary, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Revisa tu bandeja de entrada en <strong>{email}</strong> y sigue las instrucciones.
            </p>
            <Link to="/login" style={{
              display: 'inline-block', padding: '0.625rem 1.5rem',
              backgroundColor: theme.colors.primary, color: theme.colors.white,
              borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9375rem',
            }}>
              Volver al login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.text }}>
                Email institucional
              </label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="correo@universitariadebogota.edu.co"
                style={{
                  padding: '0.625rem 0.875rem', borderRadius: '0.5rem', fontSize: '1rem',
                  border: `1px solid ${theme.colors.border}`, outline: 'none', width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                padding: '0.75rem', backgroundColor: theme.colors.primary, color: theme.colors.white,
                border: 'none', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s', marginTop: '0.25rem',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.colors.textSecondary }}>
          <Link to="/login" style={{ color: theme.colors.primary, textDecoration: 'none', fontWeight: 500 }}>
            ← Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
