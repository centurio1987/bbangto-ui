import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ title, children, defaultExpanded = false, style, className, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const containerStyle: React.CSSProperties = {
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      overflow: 'hidden',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
      cursor: 'pointer',
      backgroundColor: isExpanded ? cssVar('semantic', 'background', 'elevated') : 'transparent',
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: isExpanded ? 'bold' : 'normal',
      userSelect: 'none',
      transition: 'background-color 0.2s',
    };

    const contentStyle: React.CSSProperties = {
      padding: isExpanded ? `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}` : '0 20px',
      height: isExpanded ? 'auto' : '0',
      opacity: isExpanded ? 1 : 0,
      visibility: isExpanded ? 'visible' : 'hidden',
      color: cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      transition: 'all 0.3s ease-in-out',
      overflow: 'hidden',
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        <div style={headerStyle} onClick={() => setIsExpanded(!isExpanded)}>
          <span>{title}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div style={contentStyle}>
          {children}
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
