import React, { useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'popup' | 'full' | 'bottom-sheet';
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, children, variant = 'popup', style, className, ...props }, ref) => {
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
      display: 'flex',
      alignItems: variant === 'bottom-sheet' ? 'flex-end' : (variant === 'full' ? 'stretch' : 'center'),
      justifyContent: 'center',
      zIndex: cssVar('zIndex', 'modal'),
      animationName: closing ? KEYFRAME_NAMES.fadeOut : KEYFRAME_NAMES.fadeIn,
      animationDuration: dur,
      animationTimingFunction: closing ? easeIn : easeOut,
      animationFillMode: 'both',
    };

    const getPanelAnimation = (): React.CSSProperties => {
      if (variant === 'full') return {};

      if (variant === 'bottom-sheet') {
        return {
          [SLIDE_VARS.x]: '0',
          [SLIDE_VARS.y]: '100%',
          animationName: closing ? KEYFRAME_NAMES.slideOut : KEYFRAME_NAMES.slideIn,
          animationDuration: dur,
          animationTimingFunction: closing ? easeIn : easeOut,
          animationFillMode: 'both',
        } as React.CSSProperties;
      }

      // popup
      return {
        animationName: closing ? KEYFRAME_NAMES.scaleOut : KEYFRAME_NAMES.scaleIn,
        animationDuration: dur,
        animationTimingFunction: closing ? easeIn : easeOut,
        animationFillMode: 'both',
      };
    };

    const getModalStyle = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        backgroundColor: cssVar('semantic', 'background', 'base'),
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        color: cssVar('semantic', 'foreground', 'base'),
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...getPanelAnimation(),
        ...style,
      };

      if (variant === 'full') {
        return { ...base, width: '100%', height: '100%' };
      }

      if (variant === 'bottom-sheet') {
        return {
          ...base,
          width: '100%',
          maxHeight: '90vh',
          borderTopLeftRadius: cssVar('radius', 'xl'),
          borderTopRightRadius: cssVar('radius', 'xl'),
          paddingBottom: 'env(safe-area-inset-bottom)',
        };
      }

      return {
        ...base,
        width: '90%',
        maxWidth: '400px',
        borderRadius: cssVar('radius', 'lg'),
        boxShadow: cssVar('shadow', 'xl'),
        maxHeight: '90vh',
      };
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: title ? 'space-between' : 'flex-end',
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
      borderBottom: title ? `1px solid ${cssVar('semantic', 'border', 'muted')}` : 'none',
      flexShrink: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'h3', 'fontSize'),
      fontWeight: 'bold',
    };

    const closeBtnStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: cssVar('spacing', '4'),
      color: cssVar('semantic', 'foreground', 'muted'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: React.CSSProperties = {
      padding: cssVar('spacing', '20'),
      overflowY: 'auto',
      flex: 1,
    };

    return (
      <div style={overlayStyle} onClick={onClose}>
        <div
          ref={ref}
          style={getModalStyle()}
          className={className}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          <div style={headerStyle}>
            {title && <h2 style={titleStyle}>{title}</h2>}
            <button style={closeBtnStyle} onClick={onClose} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div style={contentStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
