import React from 'react';
import { cssVar } from '@centurio87/tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: 'primary' | 'error' | 'success' | 'warning' | 'neutral';
  variant?: 'solid' | 'subtle';
}

export function Badge({ children, icon, color = 'error', variant = 'solid', style, ...props }: BadgeProps) {
  const isNeutral = color === 'neutral';
  const bgColor = variant === 'solid' 
    ? (isNeutral ? cssVar('semantic', 'foreground', 'muted') : cssVar('semantic', color, 'base'))
    : (isNeutral ? cssVar('semantic', 'background', 'sunken') : cssVar('semantic', color, 'subtle'));
    
  const fgColor = variant === 'solid'
    ? cssVar('semantic', color, 'foreground')
    : (isNeutral ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', color, 'active'));

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: cssVar('spacing', '4'),
    minWidth: 'fit-content',
    padding: `0 ${cssVar('spacing', '6')}`,
    height: '20px',
    fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
    fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    color: fgColor,
    backgroundColor: bgColor,
    borderRadius: cssVar('radius', 'full'),
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <span style={baseStyles} {...props}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {children && <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 1 }}>{children}</span>}
    </span>
  );
}
