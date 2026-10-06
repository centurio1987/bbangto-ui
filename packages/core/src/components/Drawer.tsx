import React, { useEffect, useRef } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';
import { useEscapeKey, useFocusTrap } from '../a11y';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, onClose, position = 'right', size = 'md', children, style, className, onKeyDown, ...props }, ref) => {
    const { shouldRender, mountState } = useAnimatedMount(isOpen);
    const closing = mountState === 'closed';
    const dur = cssVar('motion', 'duration', 'normal');
    const easeOut = cssVar('motion', 'easing', 'out');
    const easeIn = cssVar('motion', 'easing', 'in');

    // Internal handle to the panel so the dialog a11y contract works whether or
    // not the caller forwards a ref.
    const panelRef = useRef<HTMLDivElement | null>(null);
    const setPanelRef = (node: HTMLDivElement | null) => {
      panelRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

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

    // Same dialog contract as Modal: focus moves in on open and back on close,
    // Tab stays inside, Esc dismisses.
    const handleEscape = useEscapeKey(onClose);
    const handleFocusTrap = useFocusTrap(panelRef, isOpen);

    if (!shouldRender) return null;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      handleEscape(e);
      handleFocusTrap(e);
    };

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
          ref={setPanelRef}
          style={drawerStyle}
          className={className}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';
