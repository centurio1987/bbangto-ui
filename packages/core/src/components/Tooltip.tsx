import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top', style, ...props }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style,
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' };
      case 'top':
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' };
    }
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    ...getPositionStyles(),
    padding: `${cssVar('spacing', '4')} ${cssVar('spacing', '8')}`,
    backgroundColor: cssVar('common', 'black'), // Tooltips are typically dark
    color: cssVar('common', 'white'),
    borderRadius: cssVar('radius', 'sm'),
    fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
    whiteSpace: 'nowrap',
    zIndex: cssVar('zIndex', 'popover'),
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: 'opacity 0.2s, visibility 0.2s',
    pointerEvents: 'none',
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      {...props}
    >
      {children}
      <div style={tooltipStyle} role="tooltip">
        {content}
      </div>
    </div>
  );
}
