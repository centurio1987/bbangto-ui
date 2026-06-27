import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { KEYFRAME_NAMES } from '../motion';

export interface SectionMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  message: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Compact reduces padding and icon size for denser layouts. @default 'default' */
  size?: 'default' | 'compact';
  /** Render a dismiss (×) button and call this handler when clicked. */
  dismissible?: boolean;
  onDismiss?: () => void;
  /** Optional action buttons / links rendered below the message. */
  actions?: React.ReactNode;
}

export const SectionMessage = React.forwardRef<HTMLDivElement, SectionMessageProps>(
  (
    {
      title,
      message,
      variant = 'info',
      size = 'default',
      dismissible = false,
      onDismiss,
      actions,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const getColors = () => {
      switch (variant) {
        case 'success':
          return {
            bg: cssVar('semantic', 'success', 'subtle'),
            border: cssVar('semantic', 'success', 'base'),
            icon: cssVar('semantic', 'success', 'base'),
          };
        case 'error':
          return {
            bg: cssVar('semantic', 'error', 'subtle'),
            border: cssVar('semantic', 'error', 'base'),
            icon: cssVar('semantic', 'error', 'base'),
          };
        case 'warning':
          return {
            bg: cssVar('semantic', 'warning', 'subtle'),
            border: cssVar('semantic', 'warning', 'base'),
            icon: cssVar('semantic', 'warning', 'base'),
          };
        case 'info':
        default:
          return {
            bg: cssVar('semantic', 'primary', 'subtle'),
            border: cssVar('semantic', 'primary', 'base'),
            icon: cssVar('semantic', 'primary', 'base'),
          };
      }
    };

    const colors = getColors();

    const isCompact = size === 'compact';

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: isCompact ? cssVar('spacing', '8') : cssVar('spacing', '12'),
      padding: isCompact ? cssVar('spacing', '10') : cssVar('spacing', '16'),
      backgroundColor: colors.bg,
      borderLeft: `4px solid ${colors.border}`,
      borderRadius: cssVar('radius', 'sm'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      position: 'relative',
      // Fade in on mount
      animationName: KEYFRAME_NAMES.fadeIn,
      animationDuration: cssVar('motion', 'duration', 'normal'),
      animationTimingFunction: cssVar('motion', 'easing', 'out'),
      animationFillMode: 'both',
      ...style,
    };

    const iconSize = isCompact ? '16px' : '24px';

    const iconStyle: React.CSSProperties = {
      width: iconSize,
      height: iconSize,
      borderRadius: '50%',
      backgroundColor: colors.icon,
      flexShrink: 0,
      marginTop: isCompact ? '2px' : '0',
    };

    const textContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      flex: 1,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: isCompact
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const messageStyle: React.CSSProperties = {
      fontSize: isCompact
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
      marginTop: cssVar('spacing', '8'),
    };

    const dismissButtonStyle: React.CSSProperties = {
      all: 'unset',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      borderRadius: cssVar('radius', 'sm'),
      color: cssVar('semantic', 'foreground', 'muted'),
      cursor: 'pointer',
      flexShrink: 0,
      fontSize: '14px',
      lineHeight: 1,
      marginLeft: 'auto',
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="alert" {...props}>
        <div style={iconStyle} aria-hidden="true" />
        <div style={textContainerStyle}>
          {title && <div style={titleStyle}>{title}</div>}
          <div style={messageStyle}>{message}</div>
          {actions && <div style={actionsStyle}>{actions}</div>}
        </div>
        {dismissible && (
          <button
            type="button"
            style={dismissButtonStyle}
            aria-label="Dismiss"
            onClick={onDismiss}
          >
            ×
          </button>
        )}
      </div>
    );
  },
);

SectionMessage.displayName = 'SectionMessage';
