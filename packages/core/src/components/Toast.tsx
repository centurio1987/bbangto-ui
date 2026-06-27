import React, { useState, useEffect } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';
import { Spinner } from '../motion/Spinner';

export type ToastSize = 'sm' | 'md' | 'lg';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  message: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  /**
   * Controls the visual density of the toast.
   * @default 'md'
   */
  size?: ToastSize;
  duration?: number;
  onClose?: () => void;
  /**
   * When true, shows a spinner and sets aria-busy.
   * @default false
   */
  loading?: boolean;
  /**
   * When true, renders a close/dismiss button.
   * @default false
   */
  closable?: boolean;
  /**
   * Controls where the toast anchors on the viewport when rendered in `position: fixed` mode.
   * This prop is exposed as `data-position` for styling hooks; layout coordinates are
   * resolved from the prop automatically when the toast is not overridden via `style`.
   * @default 'top-right'
   */
  position?: ToastPosition;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      title,
      message,
      variant = 'info',
      size = 'md',
      duration = 3000,
      onClose,
      loading = false,
      closable = false,
      position = 'top-right',
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    const { shouldRender, mountState } = useAnimatedMount(visible);
    const closing = mountState === 'closed';
    const dur = cssVar('motion', 'duration', 'normal');

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const handleClose = () => {
      setVisible(false);
      if (onClose) onClose();
    };

    if (!shouldRender) return null;

    const getVariantColors = () => {
      switch (variant) {
        case 'success':
          return { bg: cssVar('semantic', 'success', 'base'), fg: cssVar('common', 'white') };
        case 'error':
          return { bg: cssVar('semantic', 'error', 'base'), fg: cssVar('common', 'white') };
        case 'warning':
          return { bg: cssVar('semantic', 'warning', 'base'), fg: cssVar('common', 'black') };
        case 'info':
        default:
          return {
            bg: cssVar('semantic', 'background', 'elevated'),
            fg: cssVar('semantic', 'foreground', 'base'),
          };
      }
    };

    const colors = getVariantColors();

    // Size-dependent spacing tokens
    const paddingToken = size === 'sm' ? '10' : size === 'lg' ? '24' : '16';
    const gapToken = size === 'sm' ? '2' : size === 'lg' ? '8' : '4';
    const minWidthPx = size === 'sm' ? '240px' : size === 'lg' ? '400px' : '320px';

    // Position coordinates for fixed placement
    const getPositionStyle = (): React.CSSProperties => {
      switch (position) {
        case 'top-left':
          return { top: '24px', left: '24px', right: 'auto' };
        case 'top-center':
          return { top: '24px', left: '50%', right: 'auto', transform: 'translateX(-50%)' };
        case 'bottom-right':
          return { bottom: '24px', top: 'auto', right: '24px' };
        case 'bottom-left':
          return { bottom: '24px', top: 'auto', left: '24px', right: 'auto' };
        case 'bottom-center':
          return { bottom: '24px', top: 'auto', left: '50%', right: 'auto', transform: 'translateX(-50%)' };
        case 'top-right':
        default:
          return { top: '24px', right: '24px' };
      }
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', gapToken),
      minWidth: minWidthPx,
      padding: cssVar('spacing', paddingToken),
      backgroundColor: colors.bg,
      color: colors.fg,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      position: 'fixed',
      zIndex: cssVar('zIndex', 'toast'),
      [SLIDE_VARS.x]: '120%',
      [SLIDE_VARS.y]: '0',
      animationName: closing ? KEYFRAME_NAMES.slideOut : KEYFRAME_NAMES.slideIn,
      animationDuration: dur,
      animationTimingFunction: closing
        ? cssVar('motion', 'easing', 'in')
        : cssVar('motion', 'easing', 'out'),
      animationFillMode: 'both',
      ...getPositionStyle(),
      ...style,
    } as React.CSSProperties;

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: 'bold',
    };

    const messageStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    };

    const headerRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '6'),
    };

    const closeBtnStyle: React.CSSProperties = {
      marginLeft: 'auto',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'inherit',
      padding: cssVar('spacing', '2'),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: cssVar('radius', 'sm'),
      lineHeight: '1',
      fontSize: '1rem',
      opacity: 0.7,
    };

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        role="alert"
        aria-busy={loading || undefined}
        data-size={size}
        data-position={position}
        {...props}
      >
        {/* Header row: loading spinner + title + close button */}
        {(loading || title || closable) && (
          <div style={headerRowStyle}>
            {loading && (
              <Spinner size={16} color={colors.fg} />
            )}
            {title && <div style={titleStyle}>{title}</div>}
            {closable && (
              <button
                type="button"
                style={closeBtnStyle}
                onClick={handleClose}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            )}
          </div>
        )}
        <div style={messageStyle}>{message}</div>
      </div>
    );
  },
);

Toast.displayName = 'Toast';
