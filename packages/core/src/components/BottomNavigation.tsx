import React from 'react';
import { cssVar } from '@centurio87/tokens';

export interface BottomNavigationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
}

export const BottomNavigationItem = React.forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
  ({ icon, label, selected = false, style, className, ...props }, ref) => {
    const itemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      minWidth: '60px',
      height: '100%',
      padding: `${cssVar('spacing', '8')} 0`,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: selected ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'muted'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      transition: 'color 0.2s',
      ...style,
    };

    const iconContainerStyle: React.CSSProperties = {
      marginBottom: cssVar('spacing', '4'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: selected ? 'bold' : 'normal',
    };

    return (
      <button ref={ref} style={itemStyle} className={className} aria-pressed={selected} {...props}>
        <div style={iconContainerStyle}>{icon}</div>
        <span style={labelStyle}>{label}</span>
      </button>
    );
  }
);
BottomNavigationItem.displayName = 'BottomNavigationItem';

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fixed?: boolean;
}

export const BottomNavigation = React.forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ children, fixed = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '56px',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      position: fixed ? 'fixed' : 'relative',
      bottom: fixed ? 0 : 'auto',
      left: fixed ? 0 : 'auto',
      zIndex: fixed ? cssVar('zIndex', 'sticky') : 'auto',
      paddingBottom: 'env(safe-area-inset-bottom)',
      ...style,
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="navigation" {...props}>
        {children}
      </div>
    );
  }
);
BottomNavigation.displayName = 'BottomNavigation';
