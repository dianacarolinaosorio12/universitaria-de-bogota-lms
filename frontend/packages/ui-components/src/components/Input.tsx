import React from 'react';
import { theme } from '../theme';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  style,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.625rem 0.875rem',
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.body,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${error ? theme.colors.danger : theme.colors.border}`,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  const errorStyle: React.CSSProperties = {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.danger,
    fontFamily: theme.fonts.body,
  };

  return (
    <div style={containerStyle}>
      {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
      <input id={inputId} style={inputStyle} {...props} />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};
