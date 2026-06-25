import React from 'react';

export interface NoiseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grain colors blended into the noise texture. Defaults to semantic
   * primary/warning subtle tokens read from computed CSS custom properties.
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
 * Canvas-based film-grain / noise texture background.
 *
 * Renders a subtle animated grain pattern using a seeded LCG pseudo-random
 * number generator so every pixel value is deterministic (no Math.random()
 * at render time). The noise "shifts" each frame by advancing the LCG seed,
 * giving the appearance of organic texture movement.
 *
 * Purely decorative — the container and canvas both carry `aria-hidden="true"`.
 *
 * Reduced-motion policy: when `prefers-reduced-motion: reduce` is detected,
 * or when the `static` prop is `true`, a single static frame is painted and
 * no `requestAnimationFrame` loop is started.
 */
export const Noise = React.forwardRef<HTMLDivElement, NoiseProps>(
  ({ colors, speed = 1, static: isStatic = false, style, ...props }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (!container) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resolve colors: prefer passed props, then read computed CSS custom props.
      const computedStyle = getComputedStyle(container);
      const resolvedColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              computedStyle
                .getPropertyValue('--bbangto-semantic-primary-subtle')
                .trim() || 'hsla(220,60%,60%,0.18)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-warning-subtle')
                .trim() || 'hsla(40,60%,60%,0.14)',
            ];

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── Sizing ──────────────────────────────────────────────────────────────
      const dpr = window.devicePixelRatio ?? 1;
      const W = container.clientWidth || 480;
      const H = container.clientHeight || 280;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // Work at logical pixel resolution for the noise grid to avoid overly tiny
      // grain on retina displays. We'll scale up in the ImageData step.
      const GRAIN_SCALE = 2; // logical pixels per noise cell
      const gW = Math.ceil(W / GRAIN_SCALE);
      const gH = Math.ceil(H / GRAIN_SCALE);

      // Off-screen canvas for the noise grid (logical resolution).
      const offCanvas = document.createElement('canvas');
      offCanvas.width = gW;
      offCanvas.height = gH;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const imageData = offCtx.createImageData(gW, gH);
      const data = imageData.data;

      // ── Seeded LCG (Knuth MMIX-style) ────────────────────────────────────
      // Period: 2^64 (truncated to 32-bit integer range here).
      // All operations are integer only — no floating-point side-effects from
      // Math.random() or Date.now().
      const lcgNext = (s: number): number =>
        // LCG: multiplier 1664525, increment 1013904223 (Numerical Recipes)
        // Mask to 32-bit unsigned.
        (Math.imul(s, 1664525) + 1013904223) >>> 0;

      // Parse the first resolved color into RGBA components (best-effort).
      // We blend a tinted grain rather than pure grey for a slightly warmer look.
      const parseColor = (cssColor: string): [number, number, number] => {
        // Accept hex (#rrggbb, #rgb) and hsla/rgba/named fallback to neutral.
        const hexMatch = cssColor.match(
          /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
        );
        if (hexMatch) {
          return [
            parseInt(hexMatch[1], 16),
            parseInt(hexMatch[2], 16),
            parseInt(hexMatch[3], 16),
          ];
        }
        const shortHex = cssColor.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (shortHex) {
          return [
            parseInt(shortHex[1] + shortHex[1], 16),
            parseInt(shortHex[2] + shortHex[2], 16),
            parseInt(shortHex[3] + shortHex[3], 16),
          ];
        }
        // Fallback to neutral grey for token values (hsla/var strings)
        return [180, 180, 200];
      };

      // Pre-parse colors once.
      const parsedColors = resolvedColors.map(parseColor);

      // ── Draw one noise frame ──────────────────────────────────────────────
      // `seed` determines which LCG sequence is used — different seed = different
      // frame, giving the animation its temporal variation.
      const drawFrame = (seed: number): void => {
        let s = seed;
        for (let i = 0; i < gW * gH; i++) {
          s = lcgNext(s);
          // Brightness 0–255 from upper 8 bits of LCG output.
          const brightness = (s >>> 24) & 0xff;

          // Choose a tint based on index (cycles through resolved colors).
          const colorIndex = i % parsedColors.length;
          const [cr, cg, cb] = parsedColors[colorIndex];

          // Blend: lerp between neutral grey and the tint color at low opacity.
          const blend = 0.18; // tint mix weight — keep grain subtle
          const r = Math.round(brightness * (1 - blend) + cr * blend);
          const g = Math.round(brightness * (1 - blend) + cg * blend);
          const b = Math.round(brightness * (1 - blend) + cb * blend);
          // Alpha: keep grain very subtle (40–80 out of 255 ≈ 16–31 % opacity).
          const a = 40 + ((s >>> 16) & 0x1f); // 40–71

          const idx = i * 4;
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a;
        }

        offCtx.putImageData(imageData, 0, 0);

        // Blit scaled-up grain onto the main (DPR-scaled) canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(dpr * GRAIN_SCALE, dpr * GRAIN_SCALE);
        ctx.drawImage(offCanvas, 0, 0);
        ctx.restore();
      };

      // ── Static mode ───────────────────────────────────────────────────────
      if (prefersReduced) {
        // Seed is index-based (0) for full determinism — no time dependency.
        drawFrame(0x12345678);
        return;
      }

      // ── Animation loop ────────────────────────────────────────────────────
      // Frame counter advances the LCG seed each tick.  Speed controls how
      // many seed-steps happen per animation frame.  We use integer increments
      // only — still no Math.random()/Date.now().
      let rafId: number;
      let frame = 0;
      // Steps-per-frame derived from speed: at speed=1 the seed advances by 1
      // per frame; higher speed → larger jumps → faster apparent grain flicker.
      const stepsPerFrame = Math.max(1, Math.round(speed));

      const step = (): void => {
        frame += stepsPerFrame;
        drawFrame(frame);
        rafId = requestAnimationFrame(step);
      };

      drawFrame(frame);
      rafId = requestAnimationFrame(step);

      // ── ResizeObserver ────────────────────────────────────────────────────
      const ro = new ResizeObserver(() => {
        const newW = container.clientWidth || 480;
        const newH = container.clientHeight || 280;
        const newDpr = window.devicePixelRatio ?? 1;
        canvas.width = Math.round(newW * newDpr);
        canvas.height = Math.round(newH * newDpr);
        canvas.style.width = `${newW}px`;
        canvas.style.height = `${newH}px`;
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
        ref={ref}
        aria-hidden="true"
        data-bbangto-noise
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

Noise.displayName = 'Noise';
