import React from 'react';
import { theme } from '../theme';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const paddingMap = { sm: theme.spacing.md, md: theme.spacing.lg, lg: theme.spacing.xl };

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'md',
  hover = false,
  style,
  onClick,
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows[shadow],
    padding: paddingMap[padding],
    transition: hover ? 'all 0.2s ease' : undefined,
    cursor: onClick ? 'pointer' : undefined,
    ...style,
  };

  return (
    <div style={baseStyle} onClick={onClick}>
      {children}
    </div>
  );
};
