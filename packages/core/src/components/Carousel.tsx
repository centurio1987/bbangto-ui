import React, { useState, useEffect, useCallback } from 'react';
import { cssVar } from '@centurio87/tokens';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    children, 
    autoPlay = false, 
    interval = 3000, 
    showArrows = true, 
    showDots = true, 
    style, 
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = React.Children.count(children);

    const nextSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }, [count]);

    const prevSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    }, [count]);

    useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, nextSlide]);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      borderRadius: cssVar('radius', 'md'),
      ...style,
    };

    const trackStyle: React.CSSProperties = {
      display: 'flex',
      width: `${count * 100}%`,
      transform: `translateX(-${(currentIndex * 100) / count}%)`,
      transition: `transform ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
    };

    const slideStyle: React.CSSProperties = {
      width: `${100 / count}%`,
      flexShrink: 0,
    };

    const arrowStyle = (direction: 'left' | 'right'): React.CSSProperties => ({
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      [direction]: cssVar('spacing', '16'),
      zIndex: 1,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      color: cssVar('semantic', 'foreground', 'base'),
      border: 'none',
      borderRadius: cssVar('radius', 'full'),
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: cssVar('shadow', 'md'),
      opacity: 0.8,
    });

    const dotsContainerStyle: React.CSSProperties = {
      position: 'absolute',
      bottom: cssVar('spacing', '16'),
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: cssVar('spacing', '8'),
      zIndex: 1,
    };

    const dotStyle = (isActive: boolean): React.CSSProperties => ({
      width: '8px',
      height: '8px',
      borderRadius: cssVar('radius', 'full'),
      backgroundColor: isActive ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'strong'),
      cursor: 'pointer',
      border: 'none',
      padding: 0,
      transition: 'background-color 0.2s',
    });

    if (count === 0) return null;

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={trackStyle}>
          {React.Children.map(children, (child, idx) => (
            <div key={idx} style={slideStyle} aria-hidden={idx !== currentIndex}>
              {child}
            </div>
          ))}
        </div>

        {showArrows && count > 1 && (
          <>
            <button 
              style={arrowStyle('left')} 
              onClick={prevSlide}
              aria-label="Previous slide"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              style={arrowStyle('right')} 
              onClick={nextSlide}
              aria-label="Next slide"
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        {showDots && count > 1 && (
          <div style={dotsContainerStyle}>
            {Array.from({ length: count }).map((_, idx) => (
              <button
                key={idx}
                style={dotStyle(idx === currentIndex)}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
Carousel.displayName = 'Carousel';
