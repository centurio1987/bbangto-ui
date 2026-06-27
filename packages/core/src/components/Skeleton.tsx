import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
}

export function Skeleton({ width, height, variant = 'text', style, ...props }: SkeletonProps) {
  const getRadius = () => {
    switch (variant) {
      case 'circular': return '50%';
      case 'rounded': return cssVar('radius', 'md');
      case 'rectangular': return '0';
      case 'text': default: return cssVar('radius', 'sm');
    }
  };

  const baseStyles: React.CSSProperties = {
    display: 'block',
    width: width || (variant === 'text' ? '100%' : '50px'),
    height: height || (variant === 'text' ? '1em' : '50px'),
    backgroundColor: cssVar('semantic', 'border', 'muted'),
    borderRadius: getRadius(),
    animation: cssVar('motion', 'preset', 'pulse'),
    ...style,
  };

  return <div style={baseStyles} {...props} />;
}
