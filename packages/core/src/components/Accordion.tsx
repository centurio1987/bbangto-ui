import React, { useEffect, useId, useRef, useState } from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';

/** `split-media`: at-active the root reflows to a 2-track grid (accordion | media-panel). */
export type AccordionVariantSplitMedia = 'split-media';
/** `neobrutalist`: thick solid border + hard zero-blur offset shadow + flat fill + sharp corners. */
export type AccordionVariantNeobrutalist = 'neobrutalist';
/** `horizontal-panels`: the root becomes a horizontal flex track; the panel is a collapsed
 *  background-image strip with a vertical title rail that grows open via flex-grow. */
export type AccordionVariantHorizontalPanels = 'horizontal-panels';

export type AccordionVariant =
  | 'bordered'
  | 'flush'
  | 'separated'
  | AccordionVariantSplitMedia
  | AccordionVariantNeobrutalist
  | AccordionVariantHorizontalPanels;
export type AccordionSize = 'sm' | 'md' | 'lg';

/** Scoped class prefix so @media rules can target the root without a CSS Module. */
const ACCORDION_ID = 'bbangto-accordion';

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  /** Visual style. `bordered` (default) renders a border+radius container;
   *  `flush` removes the border and radius for embedding inside cards/lists;
   *  `separated` renders each item as a detached card with its own border,
   *  radius, and a trailing gap so stacked items read as separate boxes;
   *  `split-media` reflows the root into a 2-track grid whose synced right panel
   *  swaps in the `media` slot when active;
   *  `neobrutalist` draws a thick solid border with a hard zero-blur offset
   *  shadow, flat fill, and sharp (0) corners — elevation from the offset, not blur;
   *  `horizontal-panels` lays the root out as a horizontal flex track: a collapsed
   *  background-image strip with a vertical title rail that expands via flex-grow. */
  variant?: AccordionVariant;
  /** Padding/font density. Defaults to `md`. */
  size?: AccordionSize;
  /** When `true`, the accordion cannot be expanded or collapsed. */
  disabled?: boolean;
  /** Image / illustration rendered in the synced media surface for the
   *  `split-media` (right panel) and `horizontal-panels` (cover layer) variants. */
  media?: React.ReactNode;
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
      media,
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

    const isSplitMedia = variant === 'split-media';
    const isNeobrutalist = variant === 'neobrutalist';
    const isHorizontal = variant === 'horizontal-panels';

    // ── Container ────────────────────────────────────────────────────────────
    let containerStyle: React.CSSProperties;
    if (isSplitMedia) {
      // Reflow on active: single column when collapsed → 2-track grid
      // (accordion-list | media-panel) once expanded. Tracks are token-gapped.
      containerStyle = {
        display: 'grid',
        gridTemplateColumns: isExpanded
          ? `minmax(0, 1fr) minmax(0, 0.85fr)`
          : '1fr',
        gap: cssVar('spacing', '16'),
        alignItems: 'start',
        backgroundColor: cssVar('semantic', 'background', 'base'),
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        transition: `grid-template-columns ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
        ...style,
      };
    } else if (isHorizontal) {
      // Horizontal flex track — the panel below is a collapsed flex-basis strip
      // that grows open via flex-grow.
      containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: cssVar('spacing', '8'),
        minHeight: cssVar('spacing', '64'),
        overflow: 'hidden',
        backgroundColor: cssVar('semantic', 'background', 'base'),
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };
    } else if (isNeobrutalist) {
      // Thick solid border + hard offset shadow (zero blur) + flat fill + sharp
      // corners. Elevation reads from the token-driven offset, not a blur.
      containerStyle = {
        border: `${cssVar('spacing', '2')} solid ${cssVar('semantic', 'border', 'strong')}`,
        borderRadius: cssVar('radius', 'none'),
        backgroundColor: cssVar('semantic', 'background', 'base'),
        boxShadow: `${cssVar('spacing', '4')} ${cssVar('spacing', '4')} 0 0 ${cssVar('semantic', 'foreground', 'base')}`,
        overflow: 'hidden',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };
    } else if (variant === 'flush') {
      containerStyle = {
        backgroundColor: cssVar('semantic', 'background', 'base'),
        overflow: 'hidden',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };
    } else if (variant === 'separated') {
      containerStyle = {
        border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
        borderRadius: cssVar('radius', 'lg'),
        marginBottom: cssVar('spacing', '12'),
        backgroundColor: cssVar('semantic', 'background', 'base'),
        overflow: 'hidden',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };
    } else {
      containerStyle = {
        border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
        borderRadius: cssVar('radius', 'md'),
        backgroundColor: cssVar('semantic', 'background', 'base'),
        overflow: 'hidden',
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        ...style,
      };
    }

    // Left "accordion-list" track for split-media (own border + radius).
    const splitLeftStyle: React.CSSProperties = {
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      overflow: 'hidden',
      minWidth: 0,
    };

    // Synced media panel revealed in the right track when active.
    const splitMediaPanelStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: cssVar('spacing', '64'),
      padding: cssVar('spacing', '16'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'lg'),
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      color: cssVar('semantic', 'foreground', 'muted'),
      overflow: 'hidden',
    };

    // Horizontal-panels: collapsed flex-basis strip carrying a token-composited
    // background-image (cover) that grows open via flex-grow.
    const horizontalPanelStyle: React.CSSProperties = {
      position: 'relative',
      flexGrow: isExpanded ? 1 : 0,
      flexBasis: isExpanded ? '0%' : cssVar('spacing', '48'),
      minWidth: cssVar('spacing', '48'),
      overflow: 'hidden',
      borderRadius: cssVar('radius', 'md'),
      backgroundImage: `linear-gradient(135deg, ${cssVar('semantic', 'primary', 'subtle')} 0%, ${cssVar('semantic', 'background', 'elevated')} 100%)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: [
        `flex-grow ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
        `flex-basis ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
      ].join(', '),
    };

    const horizontalOverlayStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      backgroundColor: cssVar('semantic', 'background', 'overlay'),
    };

    const horizontalMediaCoverStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
    };

    const horizontalInnerStyle: React.CSSProperties = {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    };

    // ── Header ───────────────────────────────────────────────────────────────
    const disabledFg = cssVar('semantic', 'disabled', 'foreground');

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${paddingBlock} ${paddingInline}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: isHorizontal
        ? 'transparent'
        : isExpanded && !disabled
          ? cssVar('semantic', 'background', 'elevated')
          : 'transparent',
      color: disabled ? disabledFg : cssVar('semantic', 'foreground', 'base'),
      fontSize,
      fontWeight: isExpanded ? 'bold' : 'normal',
      userSelect: 'none',
      opacity: disabled ? 0.5 : 1,
      transition: `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      // Vertical title rail while the horizontal panel is a collapsed strip.
      ...(isHorizontal && !isExpanded ? { writingMode: 'vertical-rl' as const } : null),
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

    // Shared header (role=button) — identical a11y contract across every variant.
    const headerEl = (
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
    );

    const contentEl = (
      <div id={contentId} data-bbangto-accordion-content style={contentStyle}>
        <div ref={contentRef} style={contentInnerStyle}>
          {children}
        </div>
      </div>
    );

    const dataAttrs = {
      'data-bbangto-accordion-variant': variant,
      'data-bbangto-accordion-size': size,
    } as const;

    // ── split-media: 2-track grid, synced media panel swaps in when active ─────
    if (isSplitMedia) {
      return (
        <div
          ref={ref}
          style={containerStyle}
          className={[className, `${ACCORDION_ID}-split`].filter(Boolean).join(' ')}
          {...dataAttrs}
          {...props}
        >
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${ACCORDION_ID}-split { column-gap: ${cssVar('spacing', '24')}; }
            }
            @media (prefers-reduced-motion: reduce) {
              .${ACCORDION_ID}-split,
              .${ACCORDION_ID}-split * { transition: none !important; }
            }
          `}</style>
          <div style={splitLeftStyle}>
            {headerEl}
            {contentEl}
          </div>
          {isExpanded && (
            <div data-bbangto-accordion-media style={splitMediaPanelStyle}>
              {media ?? (
                <span role="img" aria-label="Media preview">
                  Media preview
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    // ── horizontal-panels: horizontal flex track, vertical title rail strip ────
    if (isHorizontal) {
      return (
        <div
          ref={ref}
          style={containerStyle}
          className={[className, `${ACCORDION_ID}-horizontal`].filter(Boolean).join(' ')}
          {...dataAttrs}
          {...props}
        >
          <div data-bbangto-accordion-panel style={horizontalPanelStyle}>
            {media && (
              <div style={horizontalMediaCoverStyle} aria-hidden="true">
                {media}
              </div>
            )}
            <div
              data-bbangto-accordion-overlay
              style={horizontalOverlayStyle}
              aria-hidden="true"
            />
            <div style={horizontalInnerStyle}>
              {headerEl}
              {contentEl}
            </div>
          </div>
        </div>
      );
    }

    // ── bordered (default) / flush / separated / neobrutalist ──────────────────
    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        {...dataAttrs}
        {...props}
      >
        {headerEl}
        {contentEl}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
