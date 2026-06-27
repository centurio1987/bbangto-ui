import React, { useEffect, useRef, useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: string | number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  initialVisible?: boolean;
}

const offsetForDirection = (direction: NonNullable<ScrollRevealProps['direction']>, distance: string | number) => {
  const value = typeof distance === 'number' ? `${distance}px` : distance;
  switch (direction) {
    case 'down': return `translate3d(0, -${value}, 0)`;
    case 'left': return `translate3d(${value}, 0, 0)`;
    case 'right': return `translate3d(-${value}, 0, 0)`;
    case 'none': return 'translate3d(0, 0, 0)';
    case 'up':
    default: return `translate3d(0, ${value}, 0)`;
  }
};

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      direction = 'up',
      distance = cssVar('motion', 'distance', 'lg'),
      threshold = 0.2,
      rootMargin = '0px',
      once = true,
      initialVisible = false,
      style,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(initialVisible);

    useEffect(() => {
      const node = localRef.current;
      if (!node || typeof IntersectionObserver === 'undefined') {
        setIsVisible(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, [once, rootMargin, threshold]);

    const revealStyle: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate3d(0, 0, 0)' : offsetForDirection(direction, distance),
      transition: [
        `opacity ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'out')}`,
        `transform ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'out')}`,
      ].join(', '),
      willChange: 'opacity, transform',
      ...style,
    };

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
        data-bbangto-scroll-reveal={isVisible ? 'visible' : 'hidden'}
        style={revealStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ScrollReveal.displayName = 'ScrollReveal';
