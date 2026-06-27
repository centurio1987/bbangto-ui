import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface AuroraProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Band colors. Defaults to semantic primary/warning/success subtle tokens. */
  colors?: string[];
  /** Animation speed multiplier. 1 = default. Higher = faster. */
  speed?: number;
  /** Disable animation — render a single static frame. */
  static?: boolean;
}

/**
 * Canvas-based aurora background.
 * Renders flowing vertical/diagonal gradient bands that shift like an aurora.
 * aria-hidden on both container and canvas — purely decorative.
 *
 * Reduced-motion policy: if `prefers-reduced-motion: reduce` is active OR
 * `props.static === true`, only one static frame is drawn (no rAF loop).
 */
export const Aurora = React.forwardRef<HTMLDivElement, AuroraProps>(
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
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const defaultColors = React.useMemo(
      () => [
        cssVar('semantic', 'primary', 'subtle'),
        cssVar('semantic', 'warning', 'subtle'),
        cssVar('semantic', 'success', 'subtle'),
        cssVar('semantic', 'primary', 'base'),
      ],
      [],
    );

    const resolvedColors = colors ?? defaultColors;

    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Determine if animation should run.
      const prefersReduced =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
          : false;
      const shouldAnimate = !isStatic && !prefersReduced;

      // Resolve CSS variable colors against the live document.
      function resolveCSSVar(value: string): string {
        const trimmed = value.trim();
        if (trimmed.startsWith('var(')) {
          const varName = trimmed.slice(4, -1).trim();
          if (typeof document !== 'undefined') {
            const resolved = getComputedStyle(document.documentElement)
              .getPropertyValue(varName)
              .trim();
            return resolved || '#6366f1';
          }
          return '#6366f1';
        }
        return trimmed;
      }

      // Resize canvas to match its CSS-sized container.
      function resize(): void {
        const rect = canvas!.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas!.width = Math.round(rect.width * dpr);
        canvas!.height = Math.round(rect.height * dpr);
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      resize();

      // Each band has a fixed index-based seed to avoid hydration mismatch.
      // All randomness is index-derived, not Math.random().
      const bandCount = resolvedColors.length;
      const bands = resolvedColors.map((color, i) => ({
        color,
        // Spread bands evenly across canvas width with slight offset per index.
        xOffset: (i / bandCount) + (i % 2 === 0 ? 0.05 : -0.05),
        // Each band has a slightly different oscillation phase.
        phase: (i * Math.PI * 2) / bandCount,
        // Amplitude as a fraction of canvas width.
        amplitude: 0.12 + (i % 3) * 0.06,
        // Vertical skew (sine frequency multiplier).
        freq: 0.4 + (i % 4) * 0.15,
        // Opacity weight.
        alpha: 0.55 + (i % 3) * 0.1,
        // Width of the band as fraction of canvas width.
        width: 0.35 + (i % 3) * 0.1,
      }));

      // Draw a single frame at a given time value (seconds).
      function drawFrame(t: number): void {
        if (!canvas || !ctx) return;
        const w = canvas.getBoundingClientRect().width;
        const h = canvas.getBoundingClientRect().height;

        ctx.clearRect(0, 0, w, h);

        for (let bi = 0; bi < bands.length; bi++) {
          const band = bands[bi];
          const resolvedColor = resolveCSSVar(band.color);

          // Compute band center x with a gentle sinusoidal oscillation over time.
          const centerX =
            band.xOffset * w +
            Math.sin(t * speed * band.freq + band.phase) * band.amplitude * w;

          const bandW = band.width * w;

          // Create a horizontal gradient centered on centerX.
          const gx0 = centerX - bandW;
          const gx1 = centerX + bandW;

          // Guard against degenerate gradient (same x).
          if (Math.abs(gx1 - gx0) < 0.5) continue;

          const gradient = ctx.createLinearGradient(gx0, 0, gx1, 0);

          // Parse the resolved color and build a gradient with alpha.
          const alphaStart = `rgba(${hexOrVarToRgb(resolvedColor)},0)`;
          const alphaMid = `rgba(${hexOrVarToRgb(resolvedColor)},${band.alpha})`;
          const alphaEnd = `rgba(${hexOrVarToRgb(resolvedColor)},0)`;

          gradient.addColorStop(0, alphaStart);
          gradient.addColorStop(0.5, alphaMid);
          gradient.addColorStop(1, alphaEnd);

          // Draw a skewed band (slightly angled) using a tall rotated rect.
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = gradient;
          // Apply a subtle diagonal skew for the aurora sash look.
          const skew = 0.15 + (bi % 2) * 0.1;
          ctx.transform(1, 0, skew, 1, -skew * h * 0.5, 0);
          ctx.fillRect(gx0, 0, gx1 - gx0, h);
          ctx.restore();
        }
      }

      // Static mode: draw exactly one frame and exit.
      if (!shouldAnimate) {
        drawFrame(0);
        return;
      }

      // Animation loop.
      let rafId: number;
      let startTime: number | null = null;

      function tick(ts: number): void {
        if (startTime === null) startTime = ts;
        const elapsed = (ts - startTime) / 1000; // seconds
        drawFrame(elapsed);
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);

      // ResizeObserver to keep canvas in sync.
      let ro: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
        ro = new ResizeObserver(() => {
          resize();
        });
        ro.observe(canvas.parentElement);
      }

      return () => {
        cancelAnimationFrame(rafId);
        ro?.disconnect();
      };
    }, [resolvedColors, isStatic, speed]);

    return (
      <div
        ref={ref}
        aria-hidden="true"
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
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  },
);

Aurora.displayName = 'Aurora';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Convert a CSS color string to an "r,g,b" string for rgba() construction.
 * Supports #RGB, #RRGGBB, rgb(...), and oklch/hsl by delegating to an
 * off-screen canvas color parse (browser only).
 */
function hexOrVarToRgb(color: string): string {
  const trimmed = color.trim();

  // Fast path: #RRGGBB
  const hexMatch = trimmed.match(/^#([0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const n = parseInt(hexMatch[1], 16);
    return `${(n >> 16) & 0xff},${(n >> 8) & 0xff},${n & 0xff}`;
  }

  // Fast path: #RGB
  const shortHexMatch = trimmed.match(/^#([0-9a-fA-F]{3})$/);
  if (shortHexMatch) {
    const r = parseInt(shortHexMatch[1][0], 16) * 17;
    const g = parseInt(shortHexMatch[1][1], 16) * 17;
    const b = parseInt(shortHexMatch[1][2], 16) * 17;
    return `${r},${g},${b}`;
  }

  // Fast path: rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = trimmed.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (rgbMatch) {
    return `${Math.round(Number(rgbMatch[1]))},${Math.round(Number(rgbMatch[2]))},${Math.round(Number(rgbMatch[3]))}`;
  }

  // Fallback: use a temporary canvas to resolve any other color syntax.
  if (typeof document !== 'undefined') {
    try {
      const tmp = document.createElement('canvas');
      tmp.width = 1;
      tmp.height = 1;
      const tmpCtx = tmp.getContext('2d');
      if (tmpCtx) {
        tmpCtx.fillStyle = trimmed;
        tmpCtx.fillRect(0, 0, 1, 1);
        const [r, g, b] = tmpCtx.getImageData(0, 0, 1, 1).data;
        return `${r},${g},${b}`;
      }
    } catch {
      // ignore
    }
  }

  // Last resort — indigo-ish fallback.
  return '99,102,241';
}
