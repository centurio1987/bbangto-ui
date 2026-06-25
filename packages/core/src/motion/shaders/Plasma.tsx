import React from 'react';

export interface PlasmaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Plasma colors cycled through via palette index.
   * Defaults to semantic primary/warning/success/error subtle tokens.
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
 * Canvas-based classic plasma background.
 *
 * Produces a smoothly flowing multi-colour field by summing several sine
 * functions over a pixel grid — the "plasma" effect popularised in the demoscene.
 *
 * Purely decorative — the container and canvas carry `aria-hidden="true"`.
 *
 * Reduced-motion: when `prefers-reduced-motion: reduce` is active, or when the
 * `static` prop is true, a single static frame is drawn at t = 0 with no rAF
 * loop.
 *
 * Implementation notes:
 * - All rendering uses the Canvas 2D API (no WebGL).
 * - Color palette and wave parameters are index-based (no Math.random/Date.now
 *   in render output) so the output is deterministic / hydration-safe.
 * - DOM/window access is guarded inside useEffect only.
 */
export const Plasma = React.forwardRef<HTMLDivElement, PlasmaProps>(
  ({ colors, speed = 1, static: isStatic = false, style, ...props }, ref) => {
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

      // Resolve colors: prefer passed colors, then fall back to semantic CSS
      // custom props read from the container's computed style so we respect
      // the active theme.
      const computedStyle = getComputedStyle(container);

      const resolvedColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              computedStyle
                .getPropertyValue('--bbangto-semantic-primary-subtle')
                .trim() || 'hsla(220,80%,65%,0.9)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-warning-subtle')
                .trim() || 'hsla(40,80%,65%,0.9)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-success-subtle')
                .trim() || 'hsla(150,70%,55%,0.9)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-error-subtle')
                .trim() || 'hsla(350,75%,65%,0.9)',
            ];

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── Palette ──────────────────────────────────────────────────────────
      // Build a lookup palette of `paletteSize` RGBA entries derived from the
      // resolved color strings.  We render to a tiny off-screen canvas to
      // convert CSS color strings to RGB values without any runtime dependency.
      const paletteSize = 256;
      const palette = new Uint8ClampedArray(paletteSize * 4);

      // Build an off-screen palette strip by painting each color as a stop on a
      // linear gradient, then reading back the pixels.
      const palCanvas = document.createElement('canvas');
      palCanvas.width = paletteSize;
      palCanvas.height = 1;
      const palCtx = palCanvas.getContext('2d');
      if (palCtx) {
        const grad = palCtx.createLinearGradient(0, 0, paletteSize, 0);
        const n = resolvedColors.length;
        for (let i = 0; i < n; i++) {
          grad.addColorStop(i / (n - 1 || 1), resolvedColors[i]);
        }
        // Wrap back to first color so the plasma loop is seamless
        grad.addColorStop(1, resolvedColors[0]);
        palCtx.fillStyle = grad;
        palCtx.fillRect(0, 0, paletteSize, 1);
        const imageData = palCtx.getImageData(0, 0, paletteSize, 1);
        palette.set(imageData.data);
      }

      // ── Resize helper ────────────────────────────────────────────────────
      const resize = (): void => {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio ?? 1;
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      };

      // ── Draw ─────────────────────────────────────────────────────────────
      // Classic plasma: value = sum of several sine functions over (x, y, t).
      // All math is index-based; no random state.
      const drawFrame = (elapsed: number): void => {
        const w = canvas.width;
        const h = canvas.height;
        if (w === 0 || h === 0) return;

        const t = elapsed * 0.001 * speed;

        const imageData = ctx.createImageData(w, h);
        const data = imageData.data;

        // Scale factors make the plasma fill the canvas regardless of size.
        const sx = 6.0 / w;
        const sy = 6.0 / h;

        for (let py = 0; py < h; py++) {
          for (let px = 0; px < w; px++) {
            const x = px * sx;
            const y = py * sy;

            // Sum of four sine fields — classic demoscene formula.
            // All coefficients are deterministic constants.
            const v =
              Math.sin(x + t) +
              Math.sin(y + t * 0.7) +
              Math.sin((x + y) * 0.5 + t * 1.3) +
              Math.sin(
                Math.sqrt(
                  (x - 3) * (x - 3) + (y - 3) * (y - 3) + 1,
                ) + t * 0.9,
              );

            // Map [-4, 4] → [0, paletteSize-1]
            const idx =
              Math.round(((v + 4) / 8) * (paletteSize - 1)) & (paletteSize - 1);

            const base = (py * w + px) * 4;
            data[base] = palette[idx * 4];
            data[base + 1] = palette[idx * 4 + 1];
            data[base + 2] = palette[idx * 4 + 2];
            data[base + 3] = 255;
          }
        }

        ctx.putImageData(imageData, 0, 0);
      };

      resize();

      // ── Static / reduced-motion path ─────────────────────────────────────
      if (prefersReduced) {
        drawFrame(0);
        return;
      }

      // ── Animation loop ───────────────────────────────────────────────────
      let rafId = 0;
      let startTime: number | null = null;

      const loop = (timestamp: number): void => {
        if (startTime === null) startTime = timestamp;
        drawFrame(timestamp - startTime);
        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);

      // Keep canvas in sync with container resizes
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
        data-bbangto-plasma
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

Plasma.displayName = 'Plasma';
