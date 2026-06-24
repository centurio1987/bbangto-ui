import React, { useRef, useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  duration?: string;
  disabled?: boolean;
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      children,
      color,
      duration,
      disabled = false,
      style,
      onPointerDown,
      ...props
    },
    ref,
  ) => {
    const nextId = useRef(0);
    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const rippleDuration = duration ?? cssVar('motion', 'duration', 'slow');

    const removeRipple = (id: number) => {
      setRipples((items) => items.filter((item) => item.id !== id));
    };

    return (
      <div
        ref={ref}
        data-bbangto-ripple
        style={{
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
          borderRadius: cssVar('radius', 'md'),
          isolation: 'isolate',
          ...style,
        }}
        onPointerDown={(event) => {
          if (!disabled) {
            const rect = event.currentTarget.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const id = nextId.current;
            nextId.current += 1;
            setRipples((items) => [
              ...items,
              {
                id,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                size,
              },
            ]);
            window.setTimeout(() => removeRipple(id), 450);
          }
          onPointerDown?.(event);
        }}
        {...props}
      >
        {children}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            data-bbangto-ripple-wave
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              borderRadius: cssVar('radius', 'full'),
              background: color ?? 'currentColor',
              pointerEvents: 'none',
              animationName: 'bbangto-ripple',
              animationDuration: rippleDuration,
              animationTimingFunction: cssVar('motion', 'easing', 'out'),
              animationFillMode: 'both',
              zIndex: 0,
            }}
          />
        ))}
      </div>
    );
  },
);

Ripple.displayName = 'Ripple';
