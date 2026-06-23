import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface TopNavigationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  leading?: React.ReactNode;
  title?: React.ReactNode;
  trailing?: React.ReactNode;
  fixed?: boolean;
}

export const TopNavigation = React.forwardRef<HTMLDivElement, TopNavigationProps>(
  ({ leading, title, trailing, fixed = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '56px',
      padding: `0 ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      position: fixed ? 'fixed' : 'relative',
      top: fixed ? 0 : 'auto',
      left: fixed ? 0 : 'auto',
      zIndex: fixed ? cssVar('zIndex', 'sticky') : 'auto',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const sideStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      minWidth: '48px', // Ensuring title stays centered
    };

    const titleStyle: React.CSSProperties = {
      flex: 1,
      textAlign: 'center',
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="banner" {...props}>
        <div style={sideStyle}>{leading}</div>
        <div style={titleStyle}>{title}</div>
        <div style={{ ...sideStyle, justifyContent: 'flex-end' }}>{trailing}</div>
      </div>
    );
  }
);

TopNavigation.displayName = 'TopNavigation';
