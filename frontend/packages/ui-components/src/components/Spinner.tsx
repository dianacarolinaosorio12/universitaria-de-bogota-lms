import React from 'react';
import { theme } from '../theme';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const sizeMap = { sm: 20, md: 32, lg: 48 };

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = theme.colors.primary,
}) => {
  const s = sizeMap[size];
  return (
    <svg
      width={s} height={s} viewBox="0 0 24 24" fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeDasharray="42" strokeLinecap="round" opacity="0.3" />
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeDasharray="42" strokeLinecap="round"
        style={{ animation: 'spin 1s linear infinite' }} />
    </svg>
  );
};
