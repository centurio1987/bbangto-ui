import React, { useState, useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export type SnackbarSeverity = 'neutral' | 'info' | 'success' | 'error' | 'warning';
export type SnackbarPlacement = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  actionText?: string;
  onActionClick?: () => void;
  duration?: number;
  onClose?: () => void;
  /** Visual severity that applies a colored left border + accessible role semantics.
   *  Defaults to 'neutral' (original look, fully backward-compatible). */
  severity?: SnackbarSeverity;
  /** Leading icon slot. Renders before the message. */
  icon?: React.ReactNode;
  /** Show an explicit dismiss (×) button so the user can close without waiting. */
  dismissible?: boolean;
  /** Where the snackbar anchors on the viewport. Default: 'bottom-center'. */
  placement?: SnackbarPlacement;
}

// Severity → semantic token key (maps to SemanticColors keys)
const SEVERITY_COLOR_KEY: Record<SnackbarSeverity, string> = {
  neutral: '',
  info: 'primary',
  success: 'success',
  error: 'error',
  warning: 'warning',
};

// Placement → CSS position properties
function placementStyles(placement: SnackbarPlacement): React.CSSProperties {
  switch (placement) {
    case 'top-center':
      return { top: '24px', bottom: 'auto', left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-left':
      return { bottom: '24px', top: 'auto', left: '24px', transform: 'none' };
    case 'bottom-right':
      return { bottom: '24px', top: 'auto', right: '24px', left: 'auto', transform: 'none' };
    case 'bottom-center':
    default:
      return { bottom: '24px', top: 'auto', left: '50%', transform: 'translateX(-50%)' };
  }
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      message,
      actionText,
      onActionClick,
      duration = 3000,
      onClose,
      severity = 'neutral',
      icon,
      dismissible = false,
      placement = 'bottom-center',
      style,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(true);
    const { shouldRender, mountState } = useAnimatedMount(visible);
    const closing = mountState === 'closed';
    const dur = cssVar('motion', 'duration', 'normal');

    const handleClose = () => {
      setVisible(false);
      if (onClose) onClose();
    };

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

    const severityKey = SEVERITY_COLOR_KEY[severity];
    const hasSeverityColor = severity !== 'neutral' && severityKey !== '';

    // Left border color for severity states
    const borderLeftColor = hasSeverityColor
      ? cssVar('semantic', severityKey, 'base')
      : 'transparent';

    // Slide direction: top placements slide down-in/up-out; bottom placements slide up-in/down-out
    const isTopPlacement = placement === 'top-center';
    const slideY = isTopPlacement ? '-120%' : '120%';

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
      zIndex: cssVar('zIndex', 'toast'),
      // Severity: left border accent
      borderLeft: hasSeverityColor ? `4px solid ${borderLeftColor}` : undefined,
      [SLIDE_VARS.x]: '0',
      [SLIDE_VARS.y]: slideY,
      animationName: closing ? KEYFRAME_NAMES.slideOut : KEYFRAME_NAMES.slideIn,
      animationDuration: dur,
      animationTimingFunction: closing ? cssVar('motion', 'easing', 'in') : cssVar('motion', 'easing', 'out'),
      animationFillMode: 'both',
      // Apply placement — spread last so caller style can still override
      ...placementStyles(placement),
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
      fontFamily: 'inherit',
      fontSize: 'inherit',
    };

    const iconStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      marginRight: cssVar('spacing', '8'),
      color: hasSeverityColor ? cssVar('semantic', severityKey, 'base') : 'inherit',
    };

    const dismissStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: cssVar('spacing', '4'),
      marginLeft: cssVar('spacing', '12'),
      color: cssVar('semantic', 'background', 'base'),
      opacity: 0.7,
      borderRadius: cssVar('radius', 'sm'),
      flexShrink: 0,
      lineHeight: 1,
      fontSize: '1rem',
    };

    const contentStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      flex: 1,
    };

    const rightGroupStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="alert" {...props}>
        <span style={contentStyle}>
          {icon && <span style={iconStyle}>{icon}</span>}
          <span>{message}</span>
        </span>
        <span style={rightGroupStyle}>
          {actionText && (
            <button style={actionStyle} onClick={onActionClick}>
              {actionText}
            </button>
          )}
          {dismissible && (
            <button style={dismissStyle} onClick={handleClose} aria-label="Dismiss notification">
              ×
            </button>
          )}
        </span>
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';
