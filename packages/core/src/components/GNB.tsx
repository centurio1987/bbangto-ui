import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface GNBProps extends React.HTMLAttributes<HTMLDivElement> {
  logo: React.ReactNode;
  navItems?: React.ReactNode;
  userActions?: React.ReactNode;
  fixed?: boolean;
}

export const GNB = React.forwardRef<HTMLDivElement, GNBProps>(
  ({ logo, navItems, userActions, fixed = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '64px',
      padding: `0 ${cssVar('spacing', '24')}`,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      position: fixed ? 'fixed' : 'relative',
      top: fixed ? 0 : 'auto',
      left: fixed ? 0 : 'auto',
      zIndex: fixed ? cssVar('zIndex', 'sticky') : 'auto',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const leftGroupStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '32'),
    };

    const rightGroupStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '16'),
    };

    return (
      <div ref={ref} style={containerStyle} className={className} role="banner" {...props}>
        <div style={leftGroupStyle}>
          <div>{logo}</div>
          {navItems && <div>{navItems}</div>}
        </div>
        <div style={rightGroupStyle}>
          {userActions}
        </div>
      </div>
    );
  }
);

GNB.displayName = 'GNB';
