import React, { useEffect } from 'react';
import { theme } from '../theme';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: '400px', md: '560px', lg: '720px' };

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          boxShadow: theme.shadows.xl,
          maxWidth: sizeMap[size],
          width: '90%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: theme.spacing.xl,
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}>
            <h2 style={{
              fontSize: theme.fontSizes['2xl'], fontWeight: 700,
              color: theme.colors.text, fontFamily: theme.fonts.heading, margin: 0,
            }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '1.5rem', color: theme.colors.textSecondary, padding: '0.25rem',
              }}
            >&#x2715;</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
