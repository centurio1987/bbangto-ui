import React, { useEffect, useRef, useState } from 'react';

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number;
  disabled?: boolean;
}

export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(
  ({ children, speed = 0.2, disabled = false, style, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
      if (disabled || typeof window === 'undefined') {
        setOffset(0);
        return;
      }

      let frame = 0;
      const update = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => setOffset(window.scrollY * speed));
      };

      update();
      window.addEventListener('scroll', update, { passive: true });
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('scroll', update);
      };
    }, [disabled, speed]);

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        data-bbangto-parallax
        style={{
          transform: `translate3d(0, ${offset.toFixed(2)}px, 0)`,
          willChange: disabled ? undefined : 'transform',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Parallax.displayName = 'Parallax';
