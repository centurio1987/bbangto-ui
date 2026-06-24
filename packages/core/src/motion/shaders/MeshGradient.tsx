import React from 'react';

export interface MeshGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Blob colors. Defaults to semantic primary/warning/success/error subtle tokens. */
  colors?: string[];
  /**
   * Animation speed multiplier. 1 = default, larger = faster, smaller = slower.
   * @default 1
   */
  speed?: number;
  /** If true, renders a single static frame — no animation loop. */
  static?: boolean;
}

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

/**
 * Canvas-based mesh gradient background.
 *
 * Renders multiple radial-gradient blobs that drift slowly around the canvas.
 * Purely decorative — the canvas carries aria-hidden="true".
 *
 * Reduced-motion: when prefers-reduced-motion: reduce is active, or when the
 * `static` prop is true, a single static frame is drawn with no rAF loop.
 */
export const MeshGradient = React.forwardRef<HTMLDivElement, MeshGradientProps>(
  ({ colors, speed = 1, static: isStatic = false, style, ...props }, ref) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (!container) return;

      // Resolve colors: prefer passed props, else read computed CSS custom props.
      const resolvedColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              getComputedStyle(container)
                .getPropertyValue('--bbangto-semantic-primary-subtle')
                .trim() || 'hsla(220,80%,65%,0.7)',
              getComputedStyle(container)
                .getPropertyValue('--bbangto-semantic-warning-subtle')
                .trim() || 'hsla(40,80%,65%,0.7)',
              getComputedStyle(container)
                .getPropertyValue('--bbangto-semantic-success-subtle')
                .trim() || 'hsla(150,70%,55%,0.65)',
              getComputedStyle(container)
                .getPropertyValue('--bbangto-semantic-error-subtle')
                .trim() || 'hsla(350,75%,65%,0.6)',
            ];

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const W = container.clientWidth || 480;
      const H = container.clientHeight || 280;
      canvas.width = W;
      canvas.height = H;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const blobCount = resolvedColors.length;

      // Blobs are seeded deterministically by index — no Math.random() at
      // render-time avoids any hydration mismatch risk.
      const blobs: Blob[] = resolvedColors.map((color, i) => {
        const angle = (i / blobCount) * Math.PI * 2;
        const r = Math.min(W, H) * (0.35 + (i % 3) * 0.08);
        return {
          x: W / 2 + Math.cos(angle) * r,
          y: H / 2 + Math.sin(angle) * r,
          vx: (i % 2 === 0 ? 1 : -1) * 0.15 * (1 + (i % 3) * 0.2) * speed,
          vy: (i % 3 === 0 ? 1 : -1) * 0.12 * (1 + (i % 2) * 0.25) * speed,
          radius: Math.min(W, H) * (0.35 + (i % 4) * 0.06),
          color,
        };
      });

      function drawFrame(): void {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);

        for (const blob of blobs) {
          const grad = ctx.createRadialGradient(
            blob.x,
            blob.y,
            0,
            blob.x,
            blob.y,
            blob.radius,
          );
          grad.addColorStop(0, blob.color);
          grad.addColorStop(1, 'transparent');

          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      // Static mode: draw once, no rAF
      if (prefersReduced) {
        drawFrame();
        return;
      }

      let rafId: number;

      function step(): void {
        for (const blob of blobs) {
          blob.x += blob.vx;
          blob.y += blob.vy;

          // Bounce off walls
          if (blob.x - blob.radius < 0 || blob.x + blob.radius > W) {
            blob.vx *= -1;
            blob.x = Math.max(blob.radius, Math.min(W - blob.radius, blob.x));
          }
          if (blob.y - blob.radius < 0 || blob.y + blob.radius > H) {
            blob.vy *= -1;
            blob.y = Math.max(blob.radius, Math.min(H - blob.radius, blob.y));
          }
        }

        drawFrame();
        rafId = requestAnimationFrame(step);
      }

      rafId = requestAnimationFrame(step);

      return () => {
        cancelAnimationFrame(rafId);
      };
      // Spread colors array into deps so a new array reference with different
      // values correctly re-runs the effect.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatic, speed, ...(colors ?? [])]);

    const containerStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    };

    const canvasStyle: React.CSSProperties = {
      display: 'block',
      width: '100%',
      height: '100%',
    };

    return (
      <div ref={ref} data-bbangto-mesh-gradient style={containerStyle} {...props}>
        <canvas ref={canvasRef} aria-hidden="true" style={canvasStyle} />
      </div>
    );
  },
);

MeshGradient.displayName = 'MeshGradient';

