import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

/**
 * Indeterminate loader treatment (the spinner shown when `value` is omitted).
 *
 * - `spinner`: the historical default — an SVG arc that rotates 360°. Kept as
 *   the first union member so existing call sites / stories render unchanged.
 * - `ring`: a single centred circle drawn purely with `border-width`; one edge
 *   (`border-top`) is left transparent to carve an arc gap. No background fill,
 *   rotates 360°.
 * - `spokes`: N tapered pill lines arranged radially via `rotate()+translate()`
 *   around the centre, each fading on a staggered delay. No border-ring, no fill.
 * - `dots`: the root reflows to a horizontal flex row; three full-radius circles
 *   sit on a horizontal track and pulse (scale + opacity) on staggered delays.
 * - `bars`: a horizontal flex row of narrow rects (small radius) animated with an
 *   equalizer `scaleY` pattern. No circular radius, no border-ring.
 */
export type ProgressIndicatorVariant = 'spinner' | 'ring' | 'spokes' | 'dots' | 'bars';

export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: ProgressIndicatorVariant;
  value?: number;
  showValue?: boolean;
}

/** Unique class prefix to scope keyframes / reduced-motion without a CSS Module. */
const LOADER_ID = 'bbangto-spinner-loader';

export const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ size = 'md', variant = 'spinner', value, showValue = false, style, className, ...props }, ref) => {
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

    // Indeterminate loaders. Numeric base keeps child geometry proportional to
    // the existing `getSize()` footprint (16 / 32 / 48 px).
    const px = size === 'sm' ? 16 : size === 'lg' ? 48 : 32;
    const dimension = `${px}px`;
    const primary = cssVar('semantic', 'primary', 'base');
    const full = cssVar('radius', 'full');

    const rootClassName = [LOADER_ID, className].filter(Boolean).join(' ');

    // Custom keyframe for the `dots` pulse (scale + opacity together — the motion
    // layer's `pulse` only animates opacity). Plus a reduced-motion guard.
    const scopedStyle = `
      @keyframes ${LOADER_ID}-dot {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }
      @media (prefers-reduced-motion: reduce) {
        .${LOADER_ID}, .${LOADER_ID} * { animation: none !important; }
      }
    `;

    let rootStyle: React.CSSProperties;
    let content: React.ReactNode;

    if (variant === 'ring') {
      // Border-only ring: thickness via border-width, one edge transparent for
      // the arc gap, no background fill, full 360° rotation.
      const thickness = Math.max(2, Math.round(px / 8));
      rootStyle = { display: 'inline-block', width: dimension, height: dimension };
      content = (
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            borderRadius: full,
            borderStyle: 'solid',
            borderWidth: `${thickness}px`,
            borderColor: primary,
            borderTopColor: 'transparent',
            animation: cssVar('motion', 'preset', 'spin'),
          }}
        />
      );
    } else if (variant === 'spokes') {
      // Radial tapered pills placed by rotate()+translate(), staggered fade.
      const spokeCount = 10;
      const spokeLen = Math.max(3, Math.round(px * 0.3));
      const spokeW = Math.max(1, Math.round(px / 14));
      const outward = px / 2 - spokeLen / 2 - 1;
      rootStyle = { display: 'inline-block', position: 'relative', width: dimension, height: dimension };
      content = Array.from({ length: spokeCount }).map((_, i) => {
        const angle = (360 / spokeCount) * i;
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${spokeW}px`,
              height: `${spokeLen}px`,
              borderRadius: full,
              backgroundColor: primary,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${outward}px)`,
              animation: cssVar('motion', 'preset', 'pulse'),
              animationDelay: `${(i / spokeCount).toFixed(3)}s`,
            }}
          />
        );
      });
    } else if (variant === 'dots') {
      // Horizontal flex track of three full-radius circles, staggered pulse.
      const dotSize = Math.max(4, Math.round(px / 3.2));
      rootStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: cssVar('spacing', '6'),
        width: 'auto',
        height: dimension,
      };
      content = [0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            borderRadius: full,
            backgroundColor: primary,
            animation: `${LOADER_ID}-dot ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')} infinite`,
            animationDelay: `${(i * 0.16).toFixed(2)}s`,
          }}
        />
      ));
    } else if (variant === 'bars') {
      // Horizontal flex track of narrow rects with an equalizer scaleY beat.
      const barCount = 5;
      const barW = Math.max(2, Math.round(px / 8));
      rootStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: cssVar('spacing', '4'),
        width: 'auto',
        height: dimension,
      };
      content = Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          style={{
            width: `${barW}px`,
            height: '100%',
            borderRadius: cssVar('radius', 'sm'),
            backgroundColor: primary,
            transformOrigin: 'center bottom',
            animation: cssVar('motion', 'preset', 'bars'),
            animationDelay: `${(i * 0.12).toFixed(2)}s`,
          }}
        />
      ));
    } else {
      // 'spinner' (default) — preserve the historical SVG arc render verbatim.
      rootStyle = { display: 'inline-block', width: dimension, height: dimension };
      content = (
        <svg
          style={{ animation: cssVar('motion', 'preset', 'spin'), width: '100%', height: '100%', color: primary }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    }

    return (
      <div
        ref={ref}
        className={rootClassName}
        style={{ ...rootStyle, ...style }}
        role="progressbar"
        aria-label="Loading"
        data-bbangto-motion="essential"
        data-bbangto-spinner-loader-variant={variant}
        {...props}
      >
        <style>{scopedStyle}</style>
        {content}
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';
