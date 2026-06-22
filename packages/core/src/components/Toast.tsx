import React, { useState, useEffect } from 'react';
import { cssVar } from '@centurio87/tokens';

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  message: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, message, variant = 'info', duration = 3000, onClose, style, className, ...props }, ref) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    if (!visible) return null;

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
          return { bg: cssVar('semantic', 'background', 'elevated'), fg: cssVar('semantic', 'foreground', 'base') };
      }
    };

    const colors = getVariantColors();

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      minWidth: '320px',
      padding: cssVar('spacing', '16'),
      backgroundColor: colors.bg,
      color: colors.fg,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      position: 'fixed',
      top: '24px',
      right: '24px',
      zIndex: cssVar('zIndex', 'toast'),
      ...style,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: 'bold',
    };

    const messageStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="alert" {...props}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={messageStyle}>{message}</div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';
