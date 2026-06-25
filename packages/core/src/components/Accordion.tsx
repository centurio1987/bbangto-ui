import React, { useEffect, useId, useRef, useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type AccordionVariant = 'bordered' | 'flush' | 'separated';
export type AccordionSize = 'sm' | 'md' | 'lg';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  /** Visual style. `bordered` (default) renders a border+radius container;
   *  `flush` removes the border and radius for embedding inside cards/lists;
   *  `separated` renders each item as a detached card with its own border,
   *  radius, and a trailing gap so stacked items read as separate boxes. */
  variant?: AccordionVariant;
  /** Padding/font density. Defaults to `md`. */
  size?: AccordionSize;
  /** When `true`, the accordion cannot be expanded or collapsed. */
  disabled?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      children,
      defaultExpanded = false,
      variant = 'bordered',
      size = 'md',
      disabled = false,
      style,
      className,
      ...props
    },
    ref
  ) => {
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

    // ── Size-driven padding tokens ────────────────────────────────────────────
    const paddingBlock =
      size === 'sm'
        ? cssVar('spacing', '10')
        : size === 'lg'
          ? cssVar('spacing', '24')
          : cssVar('spacing', '16');

    const paddingInline =
      size === 'sm'
        ? cssVar('spacing', '12')
        : size === 'lg'
          ? cssVar('spacing', '24')
          : cssVar('spacing', '20');

    const fontSize =
      size === 'sm'
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : size === 'lg'
          ? cssVar('typography', 'scale', 'h3', 'fontSize')
          : cssVar('typography', 'scale', 'body', 'fontSize');

    // ── Container ────────────────────────────────────────────────────────────
    const containerStyle: React.CSSProperties =
      variant === 'flush'
        ? {
            backgroundColor: cssVar('semantic', 'background', 'base'),
            overflow: 'hidden',
            fontFamily: cssVar('typography', 'fontFamily', 'sans'),
            ...style,
          }
        : variant === 'separated'
          ? {
              border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
              borderRadius: cssVar('radius', 'lg'),
              marginBottom: cssVar('spacing', '12'),
              backgroundColor: cssVar('semantic', 'background', 'base'),
              overflow: 'hidden',
              fontFamily: cssVar('typography', 'fontFamily', 'sans'),
              ...style,
            }
          : {
              border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
              borderRadius: cssVar('radius', 'md'),
              backgroundColor: cssVar('semantic', 'background', 'base'),
              overflow: 'hidden',
              fontFamily: cssVar('typography', 'fontFamily', 'sans'),
              ...style,
            };

    // ── Header ───────────────────────────────────────────────────────────────
    const disabledFg = cssVar('semantic', 'disabled', 'foreground');

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${paddingBlock} ${paddingInline}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor:
        isExpanded && !disabled ? cssVar('semantic', 'background', 'elevated') : 'transparent',
      color: disabled ? disabledFg : cssVar('semantic', 'foreground', 'base'),
      fontSize,
      fontWeight: isExpanded ? 'bold' : 'normal',
      userSelect: 'none',
      opacity: disabled ? 0.5 : 1,
      transition: `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
    };

    // ── Content panel ────────────────────────────────────────────────────────
    const contentStyle: React.CSSProperties = {
      height: isExpanded ? contentHeight : 0,
      opacity: isExpanded ? 1 : 0,
      visibility: isExpanded ? 'visible' : 'hidden',
      color: cssVar('semantic', 'foreground', 'muted'),
      fontSize,
      transition: [
        `height ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
        `opacity ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'out')}`,
        `visibility ${cssVar('motion', 'duration', 'slow')}`,
      ].join(', '),
      overflow: 'hidden',
    };

    const contentInnerStyle: React.CSSProperties = {
      padding: `${paddingBlock} ${paddingInline}`,
    };

    // ── Toggle handler ───────────────────────────────────────────────────────
    const toggle = () => {
      if (!disabled) {
        setIsExpanded((current) => !current);
      }
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        data-bbangto-accordion-variant={variant}
        data-bbangto-accordion-size={size}
        {...props}
      >
        <div
          style={headerStyle}
          onClick={toggle}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isExpanded}
          aria-disabled={disabled ? 'true' : undefined}
          aria-controls={contentId}
          onKeyDown={(event) => {
            if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              setIsExpanded((current) => !current);
            }
          }}
        >
          <span>{title}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'none',
              transition: `transform ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'default')}`,
              flexShrink: 0,
            }}
          >
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
