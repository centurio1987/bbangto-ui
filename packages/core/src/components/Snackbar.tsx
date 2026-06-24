import React, { useState, useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  duration?: number;
  onClose?: () => void;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ message, actionText, onActionClick, duration = 3000, onClose, style, className, ...props }, ref) => {
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

    if (!shouldRender) return null;

    // Slide up from below (enter) / slide down out (exit)
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: '320px',
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'foreground', 'base'),
      color: cssVar('semantic', 'background', 'base'),
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: cssVar('zIndex', 'toast'),
      [SLIDE_VARS.x]: '0',
      [SLIDE_VARS.y]: '120%',
      animationName: closing ? KEYFRAME_NAMES.slideOut : KEYFRAME_NAMES.slideIn,
      animationDuration: dur,
      animationTimingFunction: closing ? cssVar('motion', 'easing', 'in') : cssVar('motion', 'easing', 'out'),
      animationFillMode: 'both',
      ...style,
    } as React.CSSProperties;

    const actionStyle: React.CSSProperties = {
      color: cssVar('semantic', 'primary', 'base'),
      fontWeight: 'bold',
      cursor: 'pointer',
      marginLeft: cssVar('spacing', '16'),
      background: 'none',
      border: 'none',
      padding: 0,
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="alert" {...props}>
        <span>{message}</span>
        {actionText && (
          <button style={actionStyle} onClick={onActionClick}>
            {actionText}
          </button>
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';
