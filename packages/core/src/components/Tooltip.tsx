import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type TooltipVariant = 'dark' | 'light' | 'error';
export type TooltipSize = 'sm' | 'md' | 'lg';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Visual style of the tooltip bubble. Defaults to 'dark'. */
  variant?: TooltipVariant;
  /** Size of the tooltip bubble (padding + font). Defaults to 'md'. */
  size?: TooltipSize;
  /** When true the tooltip will never appear, regardless of interaction. */
  disabled?: boolean;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      variant = 'dark',
      size = 'md',
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const show = () => {
      if (!disabled) setIsVisible(true);
    };
    const hide = () => setIsVisible(false);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      ...style,
    };

    const getPositionStyles = (): React.CSSProperties => {
      switch (position) {
        case 'bottom':
          return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' };
        case 'left':
          return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' };
        case 'right':
          return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' };
        case 'top':
        default:
          return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' };
      }
    };

    // Padding by size
    const paddingMap: Record<TooltipSize, string> = {
      sm: `${cssVar('spacing', '2')} ${cssVar('spacing', '6')}`,
      md: `${cssVar('spacing', '4')} ${cssVar('spacing', '8')}`,
      lg: `${cssVar('spacing', '6')} ${cssVar('spacing', '12')}`,
    };

    // Font size by size
    const fontSizeMap: Record<TooltipSize, string> = {
      sm: cssVar('typography', 'scale', 'meta', 'fontSize'),
      md: cssVar('typography', 'scale', 'meta', 'fontSize'),
      lg: cssVar('typography', 'scale', 'body', 'fontSize'),
    };

    // Colors by variant
    const variantStyles = (): Pick<React.CSSProperties, 'backgroundColor' | 'color' | 'border'> => {
      switch (variant) {
        case 'light':
          return {
            backgroundColor: cssVar('semantic', 'background', 'elevated'),
            color: cssVar('semantic', 'foreground', 'base'),
            border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
          };
        case 'error':
          return {
            backgroundColor: cssVar('semantic', 'error', 'subtle'),
            color: cssVar('semantic', 'error', 'base'),
            border: `1px solid ${cssVar('semantic', 'error', 'base')}`,
          };
        case 'dark':
        default:
          return {
            backgroundColor: cssVar('common', 'black'),
            color: cssVar('common', 'white'),
            border: '1px solid transparent',
          };
      }
    };

    const tooltipStyle: React.CSSProperties = {
      position: 'absolute',
      ...getPositionStyles(),
      padding: paddingMap[size],
      ...variantStyles(),
      borderRadius: cssVar('radius', 'sm'),
      fontSize: fontSizeMap[size],
      whiteSpace: 'nowrap',
      zIndex: cssVar('zIndex', 'popover'),
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: `opacity ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}, visibility ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      pointerEvents: 'none',
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        <div style={tooltipStyle} role="tooltip">
          {content}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';
