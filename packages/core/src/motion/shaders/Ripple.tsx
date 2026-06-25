import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface RippleBgProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ring colors. Defaults to semantic primary/warning/success subtle tokens. */
  colors?: string[];
  /**
   * Animation speed multiplier. 1 = default, larger = faster, smaller = slower.
   * @default 1
   */
  speed?: number;
  /** If true, renders a single static frame — no animation loop. */
  static?: boolean;
}

interface Ring {
  /** Current radius as a fraction of the base radius (0..1+) */
  phase: number;
  /** Color index into the resolved colors array */
  colorIndex: number;
  /** Base alpha for this ring */
  baseAlpha: number;
}

const RING_COUNT = 6;

/**
 * Canvas-based concentric ripple background.
 *
 * Circular waves emanate from the center and fade out as they expand,
 * creating a calm, pulsing water-ripple effect.
 * Purely decorative — container and canvas both carry aria-hidden="true".
 *
 * Reduced-motion policy: when `prefers-reduced-motion: reduce` is active, or
 * when the `static` prop is true, a single static frame is drawn with no rAF loop.
 */
export const RippleBg = React.forwardRef<HTMLDivElement, RippleBgProps>(
  (
    {
      colors,
      speed = 1,
      static: isStatic = false,
      style,
      ...props
    },
    ref,
  ) => {
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

      // Resolve colors: prefer passed colors, then read CSS custom props from container.
      const computedStyle = getComputedStyle(container);
      const resolveToken = (varRef: string): string => {
        const match = varRef.match(/var\((--[^)]+)\)/);
        if (!match) return varRef;
        const resolved = computedStyle.getPropertyValue(match[1]).trim();
        return resolved || varRef;
      };

      const ringColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              resolveToken(cssVar('semantic', 'primary', 'subtle')),
              resolveToken(cssVar('semantic', 'warning', 'subtle')),
              resolveToken(cssVar('semantic', 'success', 'subtle')),
            ];

      // Rings are seeded deterministically by index — no Math.random() to avoid
      // hydration mismatch risk (MOTION_QUALITY_CHECKLIST.md SSR requirement).
      const rings: Ring[] = Array.from({ length: RING_COUNT }, (_, i) => ({
        // Distribute rings evenly across phase space [0, 1)
        phase: i / RING_COUNT,
        colorIndex: i % ringColors.length,
        // Vary base alpha slightly by index for depth perception
        baseAlpha: 0.5 - (i % 3) * 0.08,
      }));

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const resize = (): void => {
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
        const cx = w / 2;
        const cy = h / 2;
        // Max radius: just beyond the diagonal so rings fill corners
        const maxRadius = Math.sqrt(cx * cx + cy * cy) * 1.05;
        // Speed factor: 0.00025 gives ~4 s full-cycle at speed=1
        const speedFactor = 0.00025 * speed;

        ctx.clearRect(0, 0, w, h);

        for (const ring of rings) {
          // Advance phase based on elapsed time
          const phase = (ring.phase + elapsed * speedFactor) % 1;
          const radius = phase * maxRadius;
          // Alpha fades from ring.baseAlpha at phase=0 to 0 at phase=1,
          // with a soft fade-in over the first 15% of travel.
          const fadeIn = Math.min(phase / 0.15, 1);
          const alpha = ring.baseAlpha * (1 - phase) * fadeIn;

          if (alpha <= 0) continue;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = ringColors[ring.colorIndex];
          ctx.globalAlpha = alpha;
          // Line width tapers as ring expands
          ctx.lineWidth = Math.max(1, 3 * (1 - phase * 0.8));
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      };

      resize();

      if (prefersReduced) {
        // Static mode: draw a single frame at t=0 showing evenly-spaced rings.
        drawFrame(0);
        return;
      }

      let rafId = 0;
      let startTime: number | null = null;

      const loop = (timestamp: number): void => {
        if (startTime === null) startTime = timestamp;
        drawFrame(timestamp - startTime);
        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatic, speed, ...(colors ?? [])]);

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-bbangto-ripple-bg
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

RippleBg.displayName = 'RippleBg';
