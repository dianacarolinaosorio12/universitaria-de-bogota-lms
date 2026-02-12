import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { theme } from '@ub-lms/ui-components';
import { useAuthStore } from '../store/authStore';

const styles = {
  header: {
    position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: theme.colors.white, boxShadow: theme.shadows.sm,
    padding: '0 2rem', height: '70px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none',
  },
  logoIcon: {
    width: '42px', height: '42px', borderRadius: '50%',
    backgroundColor: theme.colors.primary, color: theme.colors.white,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.25rem', fontWeight: 800,
  },
  logoText: {
    fontSize: '1.125rem', fontWeight: 700, color: theme.colors.text,
    lineHeight: 1.2,
  },
  logoSubtext: {
    fontSize: '0.6875rem', color: theme.colors.textSecondary, fontWeight: 400,
  },
  nav: {
    display: 'flex', alignItems: 'center', gap: '2rem',
  },
  navLink: {
    color: theme.colors.textSecondary, textDecoration: 'none', fontSize: '0.9375rem',
    fontWeight: 500, transition: 'color 0.2s',
  },
  btnOutline: {
    padding: '0.5rem 1.25rem', border: `2px solid ${theme.colors.primary}`,
    borderRadius: '0.5rem', backgroundColor: 'transparent', color: theme.colors.primary,
    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
    display: 'inline-block',
  },
  btnPrimary: {
    padding: '0.5rem 1.25rem', border: 'none', borderRadius: '0.5rem',
    backgroundColor: theme.colors.primary, color: theme.colors.white,
    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
    display: 'inline-block',
  },
};

function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header style={styles.header}>
      <a href="/" style={styles.logo}>
        <div style={styles.logoIcon}>U</div>
        <div>
          <div style={styles.logoText}>Universitaria de Bogotá</div>
          <div style={styles.logoSubtext}>Plataforma LMS</div>
        </div>
      </a>
      <nav style={styles.nav}>
        <a href="#programas" style={styles.navLink}>Programas</a>
        <a href="#beneficios" style={styles.navLink}>Beneficios</a>
        <a href="#contacto" style={styles.navLink}>Contacto</a>
        {isAuthenticated ? (
          <Link to="/dashboard" style={styles.btnPrimary}>Mi Dashboard</Link>
        ) : (
          <>
            <Link to="/auth/login" style={styles.btnOutline}>Aula Virtual</Link>
            <Link to="/auth/login" style={styles.btnPrimary}>Inscríbete</Link>
          </>
        )}
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section style={{
      paddingTop: '70px', minHeight: '85vh', display: 'flex', alignItems: 'center',
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 60%, #6B0F15 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
        backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem',
        display: 'flex', alignItems: 'center', gap: '4rem', width: '100%', position: 'relative',
      }}>
        <div style={{ flex: 1, color: theme.colors.white }}>
          <div style={{
            display: 'inline-block', padding: '0.375rem 1rem', borderRadius: '2rem',
            backgroundColor: 'rgba(255,255,255,0.15)', fontSize: '0.875rem', fontWeight: 500,
            marginBottom: '1.5rem', backdropFilter: 'blur(4px)',
          }}>
            Inscripciones Abiertas 2026
          </div>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Construye tu{' '}
            <span style={{ color: theme.colors.secondary }}>Futuro</span>
            <br />Profesional
          </h1>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.7, opacity: 0.9, maxWidth: '500px', marginBottom: '2rem' }}>
            Formamos los profesionales del mañana con tecnología de punta,
            gamificación e inteligencia artificial al servicio de tu aprendizaje.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/auth/login" style={{
              padding: '0.875rem 2rem', backgroundColor: theme.colors.secondary,
              color: theme.colors.text, border: 'none', borderRadius: '0.5rem',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
              display: 'inline-block', transition: 'all 0.2s',
            }}>
              Comenzar Ahora
            </Link>
            <a href="#programas" style={{
              padding: '0.875rem 2rem', backgroundColor: 'transparent',
              color: theme.colors.white, border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
            }}>
              Ver Programas
            </a>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '380px', height: '380px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{
              width: '300px', height: '300px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem',
            }}>
              <span style={{ fontSize: '4rem' }}>🎓</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 600, color: theme.colors.white }}>LMS Platform</span>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const programs = [
  { icon: '🤖', name: 'Ingeniería en IA', desc: 'Inteligencia Artificial y Machine Learning aplicado', color: '#EEF2FF' },
  { icon: '🏗️', name: 'Ingeniería Civil', desc: 'Construcción e infraestructura sostenible', color: '#FEF3C7' },
  { icon: '🔒', name: 'Ciberseguridad', desc: 'Protección de sistemas y datos digitales', color: '#FEE2E2' },
  { icon: '🌿', name: 'Ciencias Agropecuarias', desc: 'Producción agrícola y desarrollo rural', color: '#DCFCE7' },
];

function ProgramsSection() {
  return (
    <section id="programas" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.colors.text, marginBottom: '0.75rem' }}>
          Programas Académicos
        </h2>
        <p style={{ color: theme.colors.textSecondary, fontSize: '1.0625rem', maxWidth: '600px', margin: '0 auto' }}>
          Descubre nuestras carreras diseñadas para el futuro profesional
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {programs.map((p) => (
          <div key={p.name} style={{
            background: theme.colors.white, borderRadius: '1rem', padding: '2rem',
            boxShadow: theme.shadows.md, transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
              backgroundColor: theme.colors.secondary,
            }} />
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              backgroundColor: theme.colors.primary, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
              marginBottom: '1.25rem',
            }}>
              {p.icon}
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: theme.colors.text, marginBottom: '0.5rem' }}>
              {p.name}
            </h3>
            <p style={{ color: theme.colors.textSecondary, fontSize: '0.9375rem', lineHeight: 1.6 }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickLoginSection() {
  const navigate = useNavigate();
  const loginFn = useAuthStore(s => s.login);
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
      loginFn(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`,
      padding: '5rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '300px', color: theme.colors.white }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Accede a tu Aula Virtual
          </h2>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, opacity: 0.9, marginBottom: '1.5rem' }}>
            Ingresa a la plataforma y continúa tu formación profesional.
            Tu progreso, logros y cursos te esperan.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[{ n: '+1,000', l: 'Estudiantes' }, { n: '50+', l: 'Cursos' }, { n: '24/7', l: 'Soporte IA' }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.n}</div>
                <div style={{ fontSize: '0.8125rem', opacity: 0.8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          flex: 1, minWidth: '320px', maxWidth: '400px',
          background: theme.colors.white, borderRadius: '1rem', padding: '2rem',
          boxShadow: theme.shadows.xl,
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: theme.colors.text, textAlign: 'center' }}>
            Iniciar Sesión
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && <div style={{ background: theme.colors.dangerLight, color: theme.colors.danger, padding: '0.625rem', borderRadius: '0.375rem', fontSize: '0.8125rem' }}>{error}</div>}
            <input type="email" placeholder="Email institucional" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: `1px solid ${theme.colors.border}`, fontSize: '0.9375rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ padding: '0.625rem 0.875rem', borderRadius: '0.5rem', border: `1px solid ${theme.colors.border}`, fontSize: '0.9375rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            <button type="submit" disabled={loading} style={{
              padding: '0.75rem', backgroundColor: theme.colors.primary, color: theme.colors.white,
              border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.9375rem',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: theme.colors.textSecondary }}>
            ¿Problemas para acceder? <a href="#" style={{ color: theme.colors.primary, fontWeight: 500, textDecoration: 'none' }}>Recuperar contraseña</a>
          </p>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: '🎮', title: 'Gamificación', desc: 'Gana XP, sube de nivel y desbloquea logros mientras aprendes' },
  { icon: '🧠', title: 'IA Personalizada', desc: 'Chatbot 24/7 y recomendaciones adaptadas a tu estilo' },
  { icon: '📊', title: 'Analytics Avanzado', desc: 'Seguimiento de tu progreso con predicciones inteligentes' },
  { icon: '💬', title: 'Microsoft Teams', desc: 'Clases en vivo, grabaciones y asistencia integradas' },
];

function BenefitsSection() {
  return (
    <section id="beneficios" style={{ padding: '5rem 2rem', backgroundColor: theme.colors.backgroundAlt }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: theme.colors.text, marginBottom: '0.75rem' }}>
            ¿Por qué nuestra plataforma?
          </h2>
          <p style={{ color: theme.colors.textSecondary, fontSize: '1.0625rem', maxWidth: '600px', margin: '0 auto' }}>
            Tecnología de vanguardia al servicio de tu formación profesional
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {benefits.map(b => (
            <div key={b.title} style={{
              background: theme.colors.white, borderRadius: '1rem', padding: '2rem',
              textAlign: 'center', boxShadow: theme.shadows.sm,
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: theme.colors.primary, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '1.75rem', margin: '0 auto 1.25rem',
              }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: theme.colors.text }}>
                {b.title}
              </h3>
              <p style={{ color: theme.colors.textSecondary, fontSize: '0.9375rem', lineHeight: 1.6 }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" style={{
      backgroundColor: '#1A1A1A', color: 'rgba(255,255,255,0.8)', padding: '4rem 2rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: theme.colors.primary, color: theme.colors.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1.125rem',
            }}>U</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: theme.colors.white }}>
              Universitaria de Bogotá
            </div>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, opacity: 0.7 }}>
            Formamos los profesionales del futuro con innovación, tecnología y compromiso social.
          </p>
        </div>
        <div>
          <h4 style={{ color: theme.colors.white, fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>
            Enlaces
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Inicio', 'Programas', 'Aula Virtual', 'Inscripciones'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>{l}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ color: theme.colors.white, fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>
            Contacto
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.7 }}>
            <span>📍 Bogotá, Colombia</span>
            <span>📧 info@universitariadebogota.edu.co</span>
            <span>📞 (601) 123-4567</span>
          </div>
        </div>
        <div>
          <h4 style={{ color: theme.colors.white, fontWeight: 700, marginBottom: '1rem', fontSize: '0.9375rem' }}>
            Síguenos
          </h4>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {['Facebook', 'Instagram', 'YouTube'].map(s => (
              <a key={s} href="#" style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
              }}>{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '1.5rem',
        textAlign: 'center', fontSize: '0.8125rem', opacity: 0.5,
      }}>
        © 2026 Universitaria de Bogotá. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <HeroSection />
      <ProgramsSection />
      <QuickLoginSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
