import React from 'react';

export interface HalftoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dot colors used when building the gradient across the canvas.
   * Defaults to semantic primary/warning/success/error subtle CSS custom properties.
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
 * Canvas-based halftone dot background.
 *
 * Renders a grid of circles whose radii are modulated by a time-varying sine
 * wave blended with a spatial gradient of the supplied colors. The effect
 * recalls halftone printing but is fully procedural.
 *
 * Purely decorative — both the wrapper div and the canvas carry
 * `aria-hidden="true"`.
 *
 * Reduced-motion: when `prefers-reduced-motion: reduce` is active, or when the
 * `static` prop is true, a single static frame is drawn at t = 0 with no rAF
 * loop.
 *
 * SSR-safe: all DOM/window access is guarded inside `useEffect`.
 * Deterministic: dot parameters are index-derived — no `Math.random()` or
 * `Date.now()` in render output.
 */
export const Halftone = React.forwardRef<HTMLDivElement, HalftoneProps>(
  (
    { colors, speed = 1, static: isStatic = false, style, ...props },
    ref,
  ) => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    // Merge forwarded ref with internal containerRef.
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        (
          containerRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (
            ref as React.MutableRefObject<HTMLDivElement | null>
          ).current = node;
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

      // Resolve colors: prefer passed props, else read computed CSS custom props
      // from the live container element so the active theme is respected.
      const computedStyle = getComputedStyle(container);
      const resolvedColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              computedStyle
                .getPropertyValue('--bbangto-semantic-primary-subtle')
                .trim() || 'hsla(220,80%,65%,0.8)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-warning-subtle')
                .trim() || 'hsla(40,80%,65%,0.8)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-success-subtle')
                .trim() || 'hsla(150,70%,55%,0.75)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-error-subtle')
                .trim() || 'hsla(350,75%,65%,0.7)',
            ];

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // --- Grid parameters (index-based, no Math.random) ---
      const CELL = 20; // dot grid cell size in logical pixels
      const MAX_RADIUS = CELL * 0.45; // max dot radius

      const resize = (): void => {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio ?? 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      };

      /**
       * Minimal LCG (linear congruential generator) seeded by a stable integer.
       * Returns a float in [0, 1). Used only for per-dot phase offsets so that
       * dots don't all pulse in unison, while keeping the output reproducible.
       *
       * Constants: Knuth / MMIX variant (m = 2^64 simulated via JS numbers; we
       * truncate to 32-bit by & 0xffffffff for stability).
       */
      const lcg = (seed: number): number => {
        // 32-bit Lehmer: x = (x * 1664525 + 1013904223) & 0xffffffff
        const next = ((seed * 1664525 + 1013904223) | 0) >>> 0;
        return next / 0x100000000;
      };

      /**
       * Linearly interpolate between two [r,g,b,a] tuples.
       */
      const lerpColor = (
        a: [number, number, number, number],
        b: [number, number, number, number],
        t: number,
      ): [number, number, number, number] => [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
        a[3] + (b[3] - a[3]) * t,
      ];

      /**
       * Naïve color string parser — handles hsla(...), hsl(...), rgba(...),
       * rgb(...), and #rrggbb / #rgb / #rrggbbaa hex. Returns [r, g, b, a] with
       * r/g/b in [0,255] and a in [0,1].
       *
       * Anything that doesn't match falls back to [100, 120, 200, 0.7].
       */
      const parseColor = (
        str: string,
      ): [number, number, number, number] => {
        const s = str.trim();

        // --- hex ---
        const hexMatch = /^#([0-9a-f]{3,8})$/i.exec(s);
        if (hexMatch) {
          const h = hexMatch[1];
          if (h.length === 3) {
            return [
              parseInt(h[0] + h[0], 16),
              parseInt(h[1] + h[1], 16),
              parseInt(h[2] + h[2], 16),
              1,
            ];
          }
          if (h.length === 6) {
            return [
              parseInt(h.slice(0, 2), 16),
              parseInt(h.slice(2, 4), 16),
              parseInt(h.slice(4, 6), 16),
              1,
            ];
          }
          if (h.length === 8) {
            return [
              parseInt(h.slice(0, 2), 16),
              parseInt(h.slice(2, 4), 16),
              parseInt(h.slice(4, 6), 16),
              parseInt(h.slice(6, 8), 16) / 255,
            ];
          }
        }

        // --- rgba / rgb ---
        const rgbaMatch =
          /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/.exec(
            s,
          );
        if (rgbaMatch) {
          return [
            parseFloat(rgbaMatch[1]),
            parseFloat(rgbaMatch[2]),
            parseFloat(rgbaMatch[3]),
            rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
          ];
        }

        // --- hsla / hsl ---
        const hslaMatch =
          /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?(?:\s*,\s*([\d.]+))?\s*\)$/.exec(
            s,
          );
        if (hslaMatch) {
          const h2 = parseFloat(hslaMatch[1]) / 360;
          const sv = parseFloat(hslaMatch[2]) / 100;
          const lv = parseFloat(hslaMatch[3]) / 100;
          const av =
            hslaMatch[4] !== undefined ? parseFloat(hslaMatch[4]) : 1;

          // HSL → RGB
          const hue2rgb = (p2: number, q2: number, t2: number): number => {
            let tt = t2;
            if (tt < 0) tt += 1;
            if (tt > 1) tt -= 1;
            if (tt < 1 / 6) return p2 + (q2 - p2) * 6 * tt;
            if (tt < 1 / 2) return q2;
            if (tt < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - tt) * 6;
            return p2;
          };
          const q = lv < 0.5 ? lv * (1 + sv) : lv + sv - lv * sv;
          const p = 2 * lv - q;
          return [
            Math.round(hue2rgb(p, q, h2 + 1 / 3) * 255),
            Math.round(hue2rgb(p, q, h2) * 255),
            Math.round(hue2rgb(p, q, h2 - 1 / 3) * 255),
            av,
          ];
        }

        // fallback
        return [100, 120, 200, 0.7];
      };

      const parsedColors = resolvedColors.map(parseColor);

      const drawFrame = (elapsed: number): void => {
        const dpr = window.devicePixelRatio ?? 1;
        const W = canvas.width / dpr;
        const H = canvas.height / dpr;

        ctx.clearRect(0, 0, W, H);

        const t = elapsed * 0.001 * speed;

        // Number of color stops along the gradient diagonal.
        const colorCount = parsedColors.length;

        // Iterate over the dot grid.
        const cols = Math.ceil(W / CELL) + 1;
        const rows = Math.ceil(H / CELL) + 1;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const cx = col * CELL + CELL * 0.5;
            const cy = row * CELL + CELL * 0.5;

            // Normalized diagonal position [0, 1] for color interpolation.
            const diagT = Math.min(
              1,
              Math.max(0, (cx / W + cy / H) * 0.5),
            );

            // Map diagT into the color array.
            const scaledT = diagT * (colorCount - 1);
            const colorIdx = Math.min(
              colorCount - 2,
              Math.floor(scaledT),
            );
            const colorFrac = scaledT - colorIdx;
            const [r, g, b, a] = lerpColor(
              parsedColors[colorIdx],
              parsedColors[colorIdx + 1],
              colorFrac,
            );

            // Deterministic per-dot phase offset via LCG seeded by grid index.
            const dotSeed = row * 1024 + col;
            const phaseOffset = lcg(dotSeed) * Math.PI * 2;

            // Radius modulation: sine-based pulse.
            const pulse =
              0.5 +
              0.5 *
                Math.sin(
                  t * Math.PI * 2 * 0.25 + phaseOffset + diagT * Math.PI * 4,
                );
            const radius = MAX_RADIUS * (0.2 + 0.8 * pulse);

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a.toFixed(3)})`;
            ctx.fill();
          }
        }
      };

      resize();

      if (prefersReduced) {
        // Static fallback: single frame at t = 0.
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
        data-bbangto-halftone
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

Halftone.displayName = 'Halftone';
