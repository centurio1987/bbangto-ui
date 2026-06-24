import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface WavesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wave fill colors. Defaults to semantic primary/warning/success subtle tokens. */
  colors?: string[];
  /** Animation speed multiplier. Higher = faster. Defaults to 1. */
  speed?: number;
  /** Render a single static frame without animation. */
  static?: boolean;
}

/**
 * Canvas-based sine-wave background.
 *
 * Multiple overlapping sine waves with phase offsets flow across the canvas.
 * This is purely decorative: the container and canvas are `aria-hidden`.
 *
 * Reduced-motion policy: when `prefers-reduced-motion: reduce` is detected, or
 * when `static` prop is true, a single static frame is painted and no
 * requestAnimationFrame loop is started.
 */
export const Waves = React.forwardRef<HTMLDivElement, WavesProps>(
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
      // values. We read them once from the container's computed style so we
      // respect the active theme.
      const computedStyle = getComputedStyle(container);
      const resolveToken = (varRef: string): string => {
        const match = varRef.match(/var\((--[^)]+)\)/);
        if (!match) return varRef;
        const resolved = computedStyle.getPropertyValue(match[1]).trim();
        return resolved || varRef;
      };

      const waveColors: string[] = colors && colors.length > 0
        ? colors
        : [
            resolveToken(cssVar('semantic', 'primary', 'subtle')),
            resolveToken(cssVar('semantic', 'warning', 'subtle')),
            resolveToken(cssVar('semantic', 'success', 'subtle')),
          ];

      // Wave configuration — index-based, no Math.random() for determinism.
      const waves = waveColors.map((color, i) => ({
        color,
        amplitude: 24 + i * 8,
        frequency: 0.012 - i * 0.002,
        phase: (i * Math.PI * 2) / waveColors.length,
        speed: (0.6 + i * 0.3) * speed,
        yOffset: 0.4 + i * 0.1,
        alpha: 0.35 + i * 0.05,
      }));

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

      const drawFrame = (elapsed: number) => {
        const w = canvas.width / (window.devicePixelRatio ?? 1);
        const h = canvas.height / (window.devicePixelRatio ?? 1);

        ctx.clearRect(0, 0, w, h);

        for (const wave of waves) {
          const t = elapsed * 0.001 * wave.speed;

          ctx.beginPath();
          ctx.moveTo(0, h);

          for (let x = 0; x <= w; x += 2) {
            const y =
              h * wave.yOffset +
              Math.sin(x * wave.frequency + wave.phase + t) * wave.amplitude +
              Math.sin(x * wave.frequency * 1.7 + wave.phase * 1.3 + t * 0.8) *
                (wave.amplitude * 0.4);
            ctx.lineTo(x, y);
          }

          ctx.lineTo(w, h);
          ctx.closePath();

          // Parse color — supports named/hex/rgb/rgba/CSS var resolved value.
          // We set globalAlpha separately so we don't need to rewrite the color string.
          ctx.globalAlpha = wave.alpha;
          ctx.fillStyle = wave.color;
          ctx.fill();
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
      const loop = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        drawFrame(timestamp - startTime);
        rafId = requestAnimationFrame(loop);
      };

      rafId = requestAnimationFrame(loop);

      // Resize observer to keep canvas in sync with container size
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
    }, [colors, speed, staticProp]);

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-bbangto-waves
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

Waves.displayName = 'Waves';
