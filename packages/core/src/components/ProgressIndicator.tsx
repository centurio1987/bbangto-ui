import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  value?: number;
  showValue?: boolean;
}

export const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ size = 'md', value, showValue = false, style, className, ...props }, ref) => {
    if (value !== undefined) {
      const percentage = Math.min(100, Math.max(0, value));
      
      return (
        <div 
          ref={ref} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: cssVar('spacing', '8'),
            width: '100%',
            ...style
          }}
          className={className}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          {...props}
        >
          <div style={{
            flex: 1,
            height: size === 'sm' ? '4px' : size === 'lg' ? '12px' : '8px',
            backgroundColor: '#E6E4DF',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: cssVar('semantic', 'primary', 'base'),
              borderRadius: '999px',
              transition: `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`
            }} />
          </div>
          {showValue && (
            <span style={{
              fontFamily: cssVar('typography', 'fontFamily', 'sans'),
              fontSize: size === 'sm' ? '12px' : '14px',
              fontWeight: 500,
              color: cssVar('semantic', 'foreground', 'muted'),
              minWidth: '36px',
              textAlign: 'right'
            }}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      );
    }

    const getSize = () => {
      switch (size) {
        case 'sm': return '16px';
        case 'lg': return '48px';
        case 'md':
        default: return '32px';
      }
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-block',
      width: getSize(),
      height: getSize(),
      ...style,
    };

    const svgStyle: React.CSSProperties = {
      animation: cssVar('motion', 'preset', 'spin'),
      width: '100%',
      height: '100%',
      color: cssVar('semantic', 'primary', 'base'),
    };

    const circleStyle: React.CSSProperties = {
      opacity: 0.25,
    };

    const pathStyle: React.CSSProperties = {
      opacity: 0.75,
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        role="progressbar"
        data-bbangto-motion="essential"
        {...props}
      >
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style={circleStyle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path style={pathStyle} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';
