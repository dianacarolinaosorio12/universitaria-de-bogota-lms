import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '@ub-lms/ui-components';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Error al iniciar sesión');
      }

      const data = await res.json();
      localStorage.setItem('ub-lms-auth', JSON.stringify({ state: { ...data, isAuthenticated: true } }));
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            Iniciar Sesión
          </h1>
          <p style={{ color: theme.colors.textSecondary, fontSize: '0.875rem' }}>
            Plataforma LMS - Universitaria de Bogotá
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{
              background: theme.colors.dangerLight, color: theme.colors.danger,
              padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem',
            }}>{error}</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.text }}>Email</label>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, color: theme.colors.text }}>Contraseña</label>
              <Link to="/forgot-password" style={{
                fontSize: '0.8125rem', color: theme.colors.primary, textDecoration: 'none', fontWeight: 500,
              }}>¿Olvidaste tu contraseña?</Link>
            </div>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="••••••••"
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
              transition: 'all 0.2s', marginTop: '0.5rem',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0',
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: theme.colors.border }} />
            <span style={{ color: theme.colors.textSecondary, fontSize: '0.8125rem' }}>o</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: theme.colors.border }} />
          </div>

          <button
            type="button"
            style={{
              padding: '0.75rem', backgroundColor: 'transparent', color: theme.colors.primary,
              border: `2px solid ${theme.colors.primary}`, borderRadius: '0.5rem',
              fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            Iniciar con Azure AD (SSO)
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: theme.colors.textSecondary }}>
          <a href="/" style={{ color: theme.colors.primary, textDecoration: 'none', fontWeight: 500 }}>
            ← Volver al inicio
          </a>
        </p>
      </div>
    </div>
  );
}
