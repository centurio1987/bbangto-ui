import React, { useEffect, useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'inline';
  height?: string | number;
  color?: string;
  label?: string;
}

export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ position = 'top', height = 4, color, label = 'Scroll progress', style, ...props }, ref) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const update = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable)));
      };

      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      return () => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      };
    }, []);

    const fixedPosition: React.CSSProperties =
      position === 'inline'
        ? {}
        : {
            position: 'fixed',
            left: 0,
            right: 0,
            [position]: 0,
            zIndex: cssVar('zIndex', 'sticky'),
          };

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        data-bbangto-scroll-progress
        style={{
          height,
          backgroundColor: cssVar('semantic', 'background', 'sunken'),
          overflow: 'hidden',
          ...fixedPosition,
          ...style,
        }}
        {...props}
      >
        <div
          data-bbangto-scroll-progress-bar
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: color ?? cssVar('semantic', 'primary', 'base'),
            transform: `scaleX(${progress})`,
            transformOrigin: 'left',
            transition: `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
          }}
        />
      </div>
    );
  },
);

ScrollProgress.displayName = 'ScrollProgress';
