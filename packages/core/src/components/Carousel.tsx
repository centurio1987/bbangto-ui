import React, { useState, useEffect, useCallback } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type CarouselSize = 'sm' | 'md' | 'lg';
export type CarouselIndicatorVariant = 'dots' | 'numbers';
/**
 * Visual treatment of the track/slides.
 * - `flat`          (default) legacy render: plain single track, no extra chrome.
 * - `edge-fade`     borderless continuous track with a left/right mask fade.
 * - `media-overlay` full-bleed media slides with a bottom readability scrim.
 * - `elevated`      filled slide cards lifted with a box-shadow elevation.
 */
export type CarouselVariant = 'flat' | 'edge-fade' | 'media-overlay' | 'elevated';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  /** Controls the minimum slide height. @default 'md' */
  size?: CarouselSize;
  /** Fade between slides instead of sliding horizontally. @default false */
  fade?: boolean;
  /** When false, navigation stops at the first/last slide instead of wrapping. @default true */
  loop?: boolean;
  /** Visual style of the pagination indicator. @default 'dots' */
  indicatorVariant?: CarouselIndicatorVariant;
  /** Visual treatment of the track/slides. @default 'flat' */
  variant?: CarouselVariant;
}

const SLIDE_HEIGHT: Record<CarouselSize, string> = {
  sm: '120px',
  md: '180px',
  lg: '280px',
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    children,
    autoPlay = false,
    interval = 3000,
    showArrows = true,
    showDots = true,
    size = 'md',
    fade = false,
    loop = true,
    indicatorVariant = 'dots',
    variant = 'flat',
    style,
    onKeyDown,
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
      setCurrentIndex((prev) => {
        if (prev === count - 1) return loop ? 0 : prev;
        return prev + 1;
      });
    }, [count, loop]);

    const prevSlide = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev === 0) return loop ? count - 1 : prev;
        return prev - 1;
      });
    }, [count, loop]);

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

    // --- Slide track / fade styles ---
    const trackStyle: React.CSSProperties = fade
      ? {
          position: 'relative',
          width: '100%',
          minHeight: SLIDE_HEIGHT[size],
        }
      : {
          display: 'flex',
          width: `${count * 100}%`,
          transform: `translateX(calc(-${(currentIndex * 100) / count}% + ${dragOffset}px))`,
          transition: isDragging ? 'none' : `transform ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
          willChange: 'transform',
          touchAction: 'pan-y',
          cursor: isDragging ? 'grabbing' : 'grab',
        };

    const slideBaseStyle = (idx: number): React.CSSProperties =>
      fade
        ? {
            position: idx === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: SLIDE_HEIGHT[size],
            opacity: idx === currentIndex ? 1 : 0,
            transition: `opacity ${cssVar('motion', 'duration', 'slow')} ${cssVar('motion', 'easing', 'inOut')}`,
            pointerEvents: idx === currentIndex ? 'auto' : 'none',
          }
        : {
            width: `${100 / count}%`,
            flexShrink: 0,
            minHeight: SLIDE_HEIGHT[size],
          };

    // --- Variant chrome (default 'flat' adds nothing, so legacy render is untouched) ---
    // edge-fade: mask the track so its left/right edges dissolve. mask-image only
    // reads alpha, so the opaque stops are composed from an opaque color token.
    const edgeFadeMask =
      variant === 'edge-fade'
        ? (() => {
            const opaque = cssVar('semantic', 'foreground', 'base');
            return `linear-gradient(to right, transparent 0%, ${opaque} 8%, ${opaque} 92%, transparent 100%)`;
          })()
        : undefined;

    const variantTrackStyle: React.CSSProperties = edgeFadeMask
      ? { maskImage: edgeFadeMask, WebkitMaskImage: edgeFadeMask }
      : {};

    const variantSlideStyle: React.CSSProperties =
      variant === 'edge-fade'
        ? { border: 'none' }
        : variant === 'media-overlay'
          ? { position: 'relative', overflow: 'hidden', border: 'none' }
          : variant === 'elevated'
            ? {
                backgroundColor: cssVar('semantic', 'background', 'elevated'),
                boxShadow: cssVar('shadow', 'lg'),
                borderRadius: cssVar('radius', 'md'),
                overflow: 'hidden',
              }
            : {};

    // Bottom scrim for media-overlay: a vertical gradient from an opaque color
    // token (dimmed) up to transparent, giving panels readable contrast over media.
    const scrimStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '55%',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.6,
      backgroundImage: `linear-gradient(to top, ${cssVar('semantic', 'foreground', 'base')} 0%, transparent 100%)`,
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
      alignItems: 'center',
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

    const numberBadgeStyle = (isActive: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24px',
      height: '24px',
      padding: `0 ${cssVar('spacing', '6')}`,
      borderRadius: cssVar('radius', 'full'),
      backgroundColor: isActive ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'background', 'elevated'),
      color: isActive ? cssVar('semantic', 'primary', 'foreground') : cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      cursor: 'pointer',
      border: 'none',
      transition: [
        `background-color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
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

    const canGoPrev = loop || currentIndex > 0;
    const canGoNext = loop || currentIndex < count - 1;

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        data-bbangto-carousel-size={size}
        data-bbangto-carousel-fade={fade ? 'true' : undefined}
        data-bbangto-carousel-variant={variant}
        style={containerStyle}
        {...props}
        onKeyDown={(event) => {
          if (count > 1) {
            if (event.key === 'ArrowLeft') {
              prevSlide();
            } else if (event.key === 'ArrowRight') {
              nextSlide();
            }
          }
          onKeyDown?.(event);
        }}
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
          if (!fade && count > 1 && (event.pointerType !== 'mouse' || event.button === 0)) {
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
        <div data-bbangto-carousel-track style={{ ...trackStyle, ...variantTrackStyle }}>
          {React.Children.map(children, (child, idx) => (
            <div
              key={idx}
              data-bbangto-carousel-slide
              style={{ ...slideBaseStyle(idx), ...variantSlideStyle }}
              aria-hidden={idx !== currentIndex}
            >
              {child}
              {variant === 'media-overlay' && (
                <div data-bbangto-carousel-scrim style={scrimStyle} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {showArrows && count > 1 && (
          <>
            <button
              style={{ ...arrowStyle('left'), opacity: canGoPrev ? 0.8 : 0.3, cursor: canGoPrev ? 'pointer' : 'not-allowed' }}
              onClick={prevSlide}
              aria-label="Previous slide"
              disabled={!canGoPrev}
              onMouseEnter={(e) => {
                if (canGoPrev) {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.04)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = canGoPrev ? '0.8' : '0.3';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              style={{ ...arrowStyle('right'), opacity: canGoNext ? 0.8 : 0.3, cursor: canGoNext ? 'pointer' : 'not-allowed' }}
              onClick={nextSlide}
              aria-label="Next slide"
              disabled={!canGoNext}
              onMouseEnter={(e) => {
                if (canGoNext) {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.04)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = canGoNext ? '0.8' : '0.3';
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
          <div
            data-bbangto-carousel-indicator={indicatorVariant}
            style={dotsContainerStyle}
          >
            {indicatorVariant === 'numbers'
              ? Array.from({ length: count }).map((_, idx) => (
                  <button
                    key={idx}
                    data-bbangto-carousel-number={idx === currentIndex ? 'active' : 'inactive'}
                    style={numberBadgeStyle(idx === currentIndex)}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === currentIndex ? 'true' : undefined}
                  >
                    {idx + 1}
                  </button>
                ))
              : Array.from({ length: count }).map((_, idx) => (
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
