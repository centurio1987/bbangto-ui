import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  action?: React.ReactNode;
  description?: React.ReactNode;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, action, description, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      marginBottom: cssVar('spacing', '16'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const topRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
      margin: 0,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      margin: 0,
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        <div style={topRowStyle}>
          <h3 style={titleStyle}>{title}</h3>
          {action && <div>{action}</div>}
        </div>
        {description && <p style={descriptionStyle}>{description}</p>}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
