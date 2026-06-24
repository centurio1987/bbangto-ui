import React, { useState, useEffect, useCallback } from 'react';
import { cssVar } from '@centurio1987/tokens';

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
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [dragStartX, setDragStartX] = useState<number | null>(null);
    const [dragOffset, setDragOffset] = useState(0);
    const count = React.Children.count(children);
    const isDragging = dragStartX !== null;

    const nextSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }, [count]);

    const prevSlide = useCallback(() => {
      setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    }, [count]);

    useEffect(() => {
      if (!autoPlay || isPaused || count <= 1) return;
      const timer = setInterval(nextSlide, interval);
      return () => clearInterval(timer);
    }, [autoPlay, count, interval, isPaused, nextSlide]);

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
      transform: `translateX(calc(-${(currentIndex * 100) / count}% + ${dragOffset}px))`,
      transition: isDragging ? 'none' : `transform ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
      willChange: 'transform',
      touchAction: 'pan-y',
      cursor: isDragging ? 'grabbing' : 'grab',
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
      transition: [
        `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
      ].join(', '),
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
      width: isActive ? '20px' : '8px',
      height: '8px',
      borderRadius: cssVar('radius', 'full'),
      backgroundColor: isActive ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'strong'),
      cursor: 'pointer',
      border: 'none',
      padding: 0,
      transition: [
        `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
      ].join(', '),
    });

    if (count === 0) return null;

    const endDrag = (offset: number) => {
      if (Math.abs(offset) > 40) {
        if (offset < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      setDragStartX(null);
      setDragOffset(0);
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        {...props}
        onMouseEnter={(event) => {
          setIsPaused(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setIsPaused(false);
          onMouseLeave?.(event);
        }}
        onFocus={(event) => {
          setIsPaused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setIsPaused(false);
          onBlur?.(event);
        }}
        onPointerDown={(event) => {
          if (count > 1 && (event.pointerType !== 'mouse' || event.button === 0)) {
            setIsPaused(true);
            setDragStartX(event.clientX);
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          onPointerDown?.(event);
        }}
        onPointerMove={(event) => {
          if (dragStartX !== null) {
            setDragOffset(event.clientX - dragStartX);
          }
          onPointerMove?.(event);
        }}
        onPointerUp={(event) => {
          if (dragStartX !== null) {
            endDrag(event.clientX - dragStartX);
            setIsPaused(false);
          }
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          if (dragStartX !== null) {
            setDragStartX(null);
            setDragOffset(0);
            setIsPaused(false);
          }
          onPointerCancel?.(event);
        }}
      >
        <div data-bbangto-carousel-track style={trackStyle}>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button 
              style={arrowStyle('right')} 
              onClick={nextSlide}
              aria-label="Next slide"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
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
                data-bbangto-carousel-dot={idx === currentIndex ? 'active' : 'inactive'}
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
