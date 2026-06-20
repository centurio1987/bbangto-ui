import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export function Card({
  children,
  elevation = 'sm',
  padding = 'md',
  bordered = true,
  style,
  ...props
}: CardProps) {
  const paddingMap = {
    none: '0',
    sm: cssVar('spacing', '12'),
    md: cssVar('spacing', '24'),
    lg: cssVar('spacing', '40'),
  };

  const baseStyles: React.CSSProperties = {
    backgroundColor: cssVar('semantic', 'background', 'elevated'),
    borderRadius: cssVar('radius', 'lg'),
    padding: paddingMap[padding],
    boxShadow: cssVar('shadow', elevation),
    border: bordered ? `1px solid ${cssVar('semantic', 'border', 'base')}` : 'none',
    color: cssVar('semantic', 'foreground', 'base'),
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    ...style,
  };

  return (
    <div style={baseStyles} {...props}>
      {children}
    </div>
  );
}
