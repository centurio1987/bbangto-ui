import React, { useEffect, useId, useRef, useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ title, children, defaultExpanded = false, style, className, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const contentId = useId();

    useEffect(() => {
      const content = contentRef.current;
      if (!content) return;

      const updateHeight = () => setContentHeight(content.scrollHeight);
      updateHeight();

      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(updateHeight);
      observer.observe(content);
      return () => observer.disconnect();
    }, [children, isExpanded]);

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
      transition: `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
    };

    const contentStyle: React.CSSProperties = {
      height: isExpanded ? contentHeight : 0,
      opacity: isExpanded ? 1 : 0,
      visibility: isExpanded ? 'visible' : 'hidden',
      color: cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      transition: [
        `height ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
        `opacity ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'out')}`,
        `visibility ${cssVar('motion', 'duration', 'slow')}`,
      ].join(', '),
      overflow: 'hidden',
    };

    const contentInnerStyle: React.CSSProperties = {
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        <div
          style={headerStyle}
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsExpanded((current) => !current);
            }
          }}
        >
          <span>{title}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: `transform ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'default')}` }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div id={contentId} data-bbangto-accordion-content style={contentStyle}>
          <div ref={contentRef} style={contentInnerStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
