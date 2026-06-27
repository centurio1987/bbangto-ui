import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ children, style, className, ...props }, ref) => {
    const footerStyle: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'muted'),
      padding: `${cssVar('spacing', '40')} ${cssVar('spacing', '24')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      ...style,
    };

    return (
      <footer ref={ref} style={footerStyle} className={className} {...props}>
        {children}
      </footer>
    );
  }
);
Footer.displayName = 'Footer';
