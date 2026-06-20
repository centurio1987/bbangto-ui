import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ size = 'md', style, className, ...props }, ref) => {
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
      animation: 'spin 1s linear infinite',
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
      <div ref={ref} style={containerStyle} className={className} role="progressbar" {...props}>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style={circleStyle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path style={pathStyle} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';
