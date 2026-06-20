import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface SectionMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  message: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export const SectionMessage = React.forwardRef<HTMLDivElement, SectionMessageProps>(
  ({ title, message, variant = 'info', style, className, ...props }, ref) => {
    
    const getColors = () => {
      switch (variant) {
        case 'success':
          return { bg: '#E8F5E9', border: cssVar('semantic', 'success', 'base'), icon: cssVar('semantic', 'success', 'base') };
        case 'error':
          return { bg: '#FFEBEE', border: cssVar('semantic', 'error', 'base'), icon: cssVar('semantic', 'error', 'base') };
        case 'warning':
          return { bg: '#FFF8E1', border: cssVar('semantic', 'warning', 'base'), icon: cssVar('semantic', 'warning', 'base') };
        case 'info':
        default:
          return { bg: '#E3F2FD', border: '#2196F3', icon: '#2196F3' }; // Usually blueish
      }
    };

    const colors = getColors();

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: cssVar('spacing', '12'),
      padding: cssVar('spacing', '16'),
      backgroundColor: colors.bg,
      borderLeft: `4px solid ${colors.border}`,
      borderRadius: cssVar('radius', 'sm'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: colors.icon,
      flexShrink: 0,
    };

    const textContainerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const messageStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        <div style={iconStyle} />
        <div style={textContainerStyle}>
          {title && <div style={titleStyle}>{title}</div>}
          <div style={messageStyle}>{message}</div>
        </div>
      </div>
    );
  }
);

SectionMessage.displayName = 'SectionMessage';
