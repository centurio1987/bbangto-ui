import React, { useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, position = 'right', size = 'md', children, style, className, ...props }, ref) => {
    
    // Prevent body scroll when drawer is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: cssVar('zIndex', 'modal'),
    };

    const getWidth = () => {
      switch (size) {
        case 'sm': return '300px';
        case 'lg': return '600px';
        case 'full': return '100%';
        case 'md':
        default:
          return '400px';
      }
    };

    const drawerStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      [position]: 0,
      width: getWidth(),
      maxWidth: '100vw',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'base'),
      boxShadow: cssVar('shadow', 'xl'),
      zIndex: cssVar('zIndex', 'modal'),
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };

    return (
      <div style={overlayStyle} onClick={onClose}>
        <div 
          ref={ref} 
          style={drawerStyle} 
          className={className} 
          onClick={(e) => e.stopPropagation()} 
          role="dialog" 
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';
