import React from 'react';
import { theme } from '../theme';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    border: 'none',
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `2px solid ${theme.colors.primary}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: theme.colors.text,
    border: 'none',
  },
  danger: {
    backgroundColor: theme.colors.danger,
    color: theme.colors.white,
    border: 'none',
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '0.5rem 1rem', fontSize: theme.fontSizes.sm },
  md: { padding: '0.625rem 1.25rem', fontSize: theme.fontSizes.base },
  lg: { padding: '0.75rem 1.5rem', fontSize: theme.fontSizes.lg },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: theme.fonts.body,
    fontWeight: 600,
    borderRadius: theme.borderRadius.md,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button disabled={disabled || isLoading} style={baseStyle} {...props}>
      {isLoading && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="42" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
};
