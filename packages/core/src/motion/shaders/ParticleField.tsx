import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface ParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Particle/line colors. Defaults to semantic primary tokens. */
  colors?: string[];
  /** Animation speed multiplier (1 = normal). Defaults to 1. */
  speed?: number;
  /** When true, skips animation and renders a single static frame. */
  static?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 60;
const MAX_LINK_DISTANCE = 120;
const PARTICLE_RADIUS = 2;

/** Seeded pseudo-random generator (LCG) for reproducible initial placement. */
function seededRng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/**
 * ParticleField — canvas-based decorative background.
 *
 * Floating dot particles drift slowly; nearby pairs are connected by faint
 * lines. Pure `requestAnimationFrame` loop, zero runtime deps beyond React.
 *
 * Decorative (aria-hidden). Respects `prefers-reduced-motion` and the
 * `static` prop by rendering a single frozen frame without rAF.
 */
export const ParticleField = React.forwardRef<HTMLDivElement, ParticleFieldProps>(
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

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Reduced-motion detection — props.static takes priority.
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const shouldFreeze = isStatic || prefersReduced;

      // Resolve colors: fall back to semantic primary token string at draw time.
      const resolvedColors: string[] = colors ?? [
        cssVar('semantic', 'primary', 'base'),
        cssVar('semantic', 'primary', 'subtle'),
      ];

      // Allocate particle structs; syncSize() will set correct positions.
      const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
      }));

      const particleColor = resolvedColors[0] ?? 'rgba(99,102,241,0.8)';
      const lineColor = resolvedColors[1] ?? 'rgba(99,102,241,0.2)';

      function draw() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw links first (underneath particles).
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_LINK_DISTANCE) {
              const alpha = (1 - dist / MAX_LINK_DISTANCE) * 0.35;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = lineColor;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw particles.
        ctx.globalAlpha = 1;
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = particleColor;
          ctx.fill();
        }
      }

      // Resize canvas to match its CSS size.
      function syncSize() {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || canvas.offsetWidth || 480;
        canvas.height = rect.height || canvas.offsetHeight || 280;
        // Re-scatter particles after resize for correct bounds.
        const newW = canvas.width;
        const newH = canvas.height;
        const r2 = seededRng(42);
        for (let i = 0; i < particles.length; i++) {
          particles[i].x = r2() * newW;
          particles[i].y = r2() * newH;
          const angle = r2() * Math.PI * 2;
          const bs = (r2() * 0.4 + 0.2) * speed;
          particles[i].vx = Math.cos(angle) * bs;
          particles[i].vy = Math.sin(angle) * bs;
        }
      }

      syncSize();

      if (shouldFreeze) {
        // Static mode: a single draw call, no rAF.
        draw();
        return;
      }

      // Animated mode.
      let rafId: number;

      function tick() {
        if (!canvas) return;
        const cw = canvas.width;
        const ch = canvas.height;
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          // Wrap around edges.
          if (p.x < 0) p.x += cw;
          if (p.x > cw) p.x -= cw;
          if (p.y < 0) p.y += ch;
          if (p.y > ch) p.y -= ch;
        }
        draw();
        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);

      const ro = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => { syncSize(); })
        : null;
      if (ro && canvas.parentElement) ro.observe(canvas.parentElement);

      return () => {
        cancelAnimationFrame(rafId);
        ro?.disconnect();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStatic, speed, colors]);

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-bbangto-particle-field
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

ParticleField.displayName = 'ParticleField';
