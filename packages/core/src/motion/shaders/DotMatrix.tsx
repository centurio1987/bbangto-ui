import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface DotMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dot colors. Defaults to semantic primary/warning/success subtle tokens.
   * The wave cycles through these colors per dot column.
   */
  colors?: string[];
  /**
   * Animation speed multiplier. 1 = default, larger = faster, smaller = slower.
   * @default 1
   */
  speed?: number;
  /** If true, renders a single static frame — no animation loop. */
  static?: boolean;
}

/**
 * Canvas-based dot matrix background.
 *
 * A grid of dots whose size and brightness ripple in a time-based wave pattern.
 * No mouse interaction — purely time-driven. Purely decorative: the container
 * and canvas both carry `aria-hidden="true"`.
 *
 * Reduced-motion policy: when `prefers-reduced-motion: reduce` is detected, or
 * when the `static` prop is true, a single static frame is painted and no
 * requestAnimationFrame loop is started.
 *
 * Dot positions and wave seeds are index-based — no `Math.random()` or
 * `Date.now()` in render output, ensuring deterministic results.
 */
export const DotMatrix = React.forwardRef<HTMLDivElement, DotMatrixProps>(
  ({ colors, speed = 1, static: staticProp = false, style, ...props }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Merge forwarded ref with internal containerRef
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resolve colors: prefer passed colors, then fallback to CSS var computed
      // values read from the container's computed style (respects active theme).
      const computedStyle = getComputedStyle(container);
      const resolveToken = (varRef: string): string => {
        const match = varRef.match(/var\((--[^)]+)\)/);
        if (!match) return varRef;
        const resolved = computedStyle.getPropertyValue(match[1]).trim();
        return resolved || varRef;
      };

      const dotColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              resolveToken(cssVar('semantic', 'primary', 'subtle')),
              resolveToken(cssVar('semantic', 'warning', 'subtle')),
              resolveToken(cssVar('semantic', 'success', 'subtle')),
            ];

      // Dot grid configuration — fully deterministic, no Math.random()
      const DOT_SPACING = 20; // pixels between dot centers
      const DOT_MAX_RADIUS = 4.5;
      const DOT_MIN_RADIUS = 0.8;

      // LCG seed function for stable per-dot phase offset (no Math.random)
      // lcg(i) gives a value in [0, 1) that is stable across frames.
      const lcgA = 1664525;
      const lcgC = 1013904223;
      const lcgM = 2 ** 32;
      const lcg = (seed: number): number => ((lcgA * seed + lcgC) % lcgM) / lcgM;

      let rafId = 0;
      let startTime: number | null = null;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio ?? 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      };

      const drawFrame = (elapsed: number): void => {
        const dpr = window.devicePixelRatio ?? 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);

        const t = elapsed * 0.001 * speed;
        const cols = Math.ceil(w / DOT_SPACING) + 1;
        const rows = Math.ceil(h / DOT_SPACING) + 1;
        const colorCount = dotColors.length;

        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const idx = col * rows + row;
            // Stable per-dot phase offset using LCG seeded by index
            const phaseOffset = lcg(idx) * Math.PI * 2;

            // Wave: combination of column and row positions + time
            const wave =
              Math.sin(col * 0.4 + row * 0.25 + t * 1.2 + phaseOffset * 0.3) *
                0.5 +
              Math.sin(col * 0.15 - row * 0.35 + t * 0.7 + phaseOffset * 0.2) *
                0.3 +
              0.2; // slight upward bias so dots are mostly visible

            // Normalise wave to [0, 1]
            const normalized = Math.max(0, Math.min(1, wave * 0.5 + 0.5));

            const radius =
              DOT_MIN_RADIUS + (DOT_MAX_RADIUS - DOT_MIN_RADIUS) * normalized;

            // Color cycles across columns
            const color = dotColors[col % colorCount];

            const cx = col * DOT_SPACING + DOT_SPACING / 2;
            const cy = row * DOT_SPACING + DOT_SPACING / 2;

            ctx.globalAlpha = 0.25 + normalized * 0.65;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.globalAlpha = 1;
      };

      // Reduced-motion detection
      const prefersReduced =
        staticProp ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      resize();

      if (prefersReduced) {
        // Draw single static frame at t=0
        drawFrame(0);
        return;
      }

      // Animation loop
      const loop = (timestamp: number): void => {
        if (startTime === null) startTime = timestamp;
        drawFrame(timestamp - startTime);
        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);

      // Resize observer to keep canvas in sync with container dimensions
      const ro = new ResizeObserver(() => {
        resize();
        if (prefersReduced) {
          drawFrame(0);
        }
      });
      ro.observe(container);

      return () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
      };
    // Spread colors array into deps so a new array reference with different
    // values correctly re-runs the effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staticProp, speed, ...(colors ?? [])]);

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-bbangto-dot-matrix
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style,
        }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            display: 'block',
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  },
);

DotMatrix.displayName = 'DotMatrix';
