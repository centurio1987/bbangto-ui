import React from 'react';

export interface MetaballsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ball colors. Defaults to semantic primary/warning/success/error subtle tokens. */
  colors?: string[];
  /**
   * Animation speed multiplier. 1 = default, larger = faster, smaller = slower.
   * @default 1
   */
  speed?: number;
  /** If true, renders a single static frame — no animation loop. */
  static?: boolean;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

/**
 * Canvas-based metaballs background.
 *
 * Several round blobs drift around the canvas. When they approach each other
 * they merge into organic, fluid shapes — the classic metaball effect
 * approximated via radial-gradient threshold compositing on a 2D canvas.
 * Purely decorative — both the container and the canvas carry aria-hidden="true".
 *
 * Reduced-motion: when prefers-reduced-motion: reduce is active, or when the
 * `static` prop is true, a single static frame is drawn with no rAF loop.
 */
export const Metaballs = React.forwardRef<HTMLDivElement, MetaballsProps>(
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

      // Resolve colors: prefer passed props, else read computed CSS custom props.
      const computedStyle = getComputedStyle(container);
      const resolvedColors: string[] =
        colors && colors.length > 0
          ? colors
          : [
              computedStyle
                .getPropertyValue('--bbangto-semantic-primary-subtle')
                .trim() || 'hsla(220,80%,65%,0.75)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-warning-subtle')
                .trim() || 'hsla(40,80%,65%,0.75)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-success-subtle')
                .trim() || 'hsla(150,70%,55%,0.7)',
              computedStyle
                .getPropertyValue('--bbangto-semantic-error-subtle')
                .trim() || 'hsla(350,75%,65%,0.65)',
            ];

      const prefersReduced =
        isStatic ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const W = container.clientWidth || 480;
      const H = container.clientHeight || 280;
      canvas.width = W;
      canvas.height = H;

      const ballCount = resolvedColors.length;

      // Balls are seeded deterministically by index — no Math.random() at
      // render-time avoids any hydration mismatch risk.
      const balls: Ball[] = resolvedColors.map((color, i) => {
        // Distribute initial positions in a ring with index-based offsets.
        const angle = (i / ballCount) * Math.PI * 2;
        const dist = Math.min(W, H) * (0.25 + (i % 3) * 0.07);
        // Alternate velocity signs per index for organic-looking movement.
        const vx = (i % 2 === 0 ? 1 : -1) * 0.4 * (1 + (i % 3) * 0.15) * speed;
        const vy = (i % 3 === 0 ? 1 : -1) * 0.35 * (1 + (i % 2) * 0.2) * speed;
        // Radius: large enough for blobs to overlap and visibly merge.
        const radius = Math.min(W, H) * (0.22 + (i % 4) * 0.04);
        return {
          x: W / 2 + Math.cos(angle) * dist,
          y: H / 2 + Math.sin(angle) * dist,
          vx,
          vy,
          radius,
          color,
        };
      });

      /**
       * Draw one frame.
       *
       * Each ball is painted as a radial gradient (opaque centre → transparent
       * edge) with `lighter` composite mode so overlapping regions brighten and
       * visually "merge", mimicking the metaball threshold look on a 2D canvas
       * without a full field-evaluation pass.
       */
      function drawFrame(): void {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;

        for (const ball of balls) {
          const grad = ctx.createRadialGradient(
            ball.x,
            ball.y,
            0,
            ball.x,
            ball.y,
            ball.radius,
          );
          grad.addColorStop(0, ball.color);
          // Mid-stop keeps the gradient solid longer before fading — this
          // makes the merge area look denser and more organic.
          grad.addColorStop(0.45, ball.color);
          grad.addColorStop(1, 'transparent');

          // 'lighter' blending adds RGB channels: overlapping blobs brighten
          // and blend smoothly, approximating the metaball threshold effect.
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = 0.55;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reset composite state
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      // Static / reduced-motion mode: draw once, no rAF loop.
      if (prefersReduced) {
        drawFrame();
        return;
      }

      let rafId: number;

      function step(): void {
        for (const ball of balls) {
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Bounce off walls
          if (ball.x - ball.radius < 0 || ball.x + ball.radius > W) {
            ball.vx *= -1;
            ball.x = Math.max(ball.radius, Math.min(W - ball.radius, ball.x));
          }
          if (ball.y - ball.radius < 0 || ball.y + ball.radius > H) {
            ball.vy *= -1;
            ball.y = Math.max(ball.radius, Math.min(H - ball.radius, ball.y));
          }
        }

        drawFrame();
        rafId = requestAnimationFrame(step);
      }

      rafId = requestAnimationFrame(step);

      // ResizeObserver keeps canvas dimensions in sync with the container.
      const ro = new ResizeObserver(() => {
        const newW = container.clientWidth || 480;
        const newH = container.clientHeight || 280;
        canvas.width = newW;
        canvas.height = newH;
        // Reposition balls proportionally when the canvas is resized.
        const scaleX = newW / W;
        const scaleY = newH / H;
        for (const ball of balls) {
          ball.x *= scaleX;
          ball.y *= scaleY;
        }
        drawFrame();
      });

      ro.observe(container);

      return () => {
        cancelAnimationFrame(rafId);
        ro.disconnect();
      };
      // Spread colors array into deps so a new array reference with different
      // values correctly re-runs the effect.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatic, speed, ...(colors ?? [])]);

    return (
      <div
        ref={setRefs}
        aria-hidden="true"
        data-bbangto-metaballs
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

Metaballs.displayName = 'Metaballs';
