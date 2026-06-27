import React, { useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, position = 'right', size = 'md', children, style, className, ...props }, ref) => {
    const { shouldRender, mountState } = useAnimatedMount(isOpen);
    const closing = mountState === 'closed';
    const dur = cssVar('motion', 'duration', 'normal');
    const easeOut = cssVar('motion', 'easing', 'out');
    const easeIn = cssVar('motion', 'easing', 'in');

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

    if (!shouldRender) return null;

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: cssVar('zIndex', 'modal'),
      animationName: closing ? KEYFRAME_NAMES.fadeOut : KEYFRAME_NAMES.fadeIn,
      animationDuration: dur,
      animationTimingFunction: closing ? easeIn : easeOut,
      animationFillMode: 'both',
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

    // Slide in from position edge (100% = full panel width off-screen)
    const slideX = position === 'right' ? '100%' : '-100%';

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
      [SLIDE_VARS.x]: slideX,
      [SLIDE_VARS.y]: '0',
      animationName: closing ? KEYFRAME_NAMES.slideOut : KEYFRAME_NAMES.slideIn,
      animationDuration: dur,
      animationTimingFunction: closing ? easeIn : easeOut,
      animationFillMode: 'both',
      ...style,
    } as React.CSSProperties;

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
