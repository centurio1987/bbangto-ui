import React from 'react';
import { cssVar } from '@centurio87/tokens';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${cssVar('spacing', '40')} ${cssVar('spacing', '20')}`,
      textAlign: 'center',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const iconContainerStyle: React.CSSProperties = {
      marginBottom: cssVar('spacing', '16'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
      marginBottom: cssVar('spacing', '8'),
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      marginBottom: action ? cssVar('spacing', '24') : 0,
      maxWidth: '400px',
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        {icon && <div style={iconContainerStyle}>{icon}</div>}
        <div style={titleStyle}>{title}</div>
        {description && <div style={descriptionStyle}>{description}</div>}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
