import React from 'react';
import { cssVar } from '@centurio87/tokens';

export interface CellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  interactive?: boolean;
}

export const Cell = React.forwardRef<HTMLDivElement, CellProps>(
  ({ title, description, leading, trailing, interactive = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: interactive ? 'pointer' : 'default',
      transition: 'background-color 0.2s',
      ...style,
    };

    const textContainerStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      marginLeft: leading ? cssVar('spacing', '12') : 0,
      marginRight: trailing ? cssVar('spacing', '12') : 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'body', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    return (
      <div 
        ref={ref} 
        style={containerStyle} 
        className={className} 
        onMouseEnter={(e) => {
          if (interactive) e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'elevated');
        }}
        onMouseLeave={(e) => {
          if (interactive) e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'base');
        }}
        {...props}
      >
        {leading && <div>{leading}</div>}
        <div style={textContainerStyle}>
          <div style={titleStyle}>{title}</div>
          {description && <div style={descriptionStyle}>{description}</div>}
        </div>
        {trailing && <div>{trailing}</div>}
      </div>
    );
  }
);

Cell.displayName = 'Cell';
