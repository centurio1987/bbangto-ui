import React, { useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'popup' | 'full' | 'bottom-sheet';
  /** popup 전용: 패널 너비 (기본값: 'md')  */
  size?: ModalSize;
  /** footer 슬롯: 확인/취소 같은 액션 버튼 영역 */
  footer?: React.ReactNode;
  /** true 이면 닫기 버튼을 비활성화하고 aria-busy를 패널에 설정 */
  loading?: boolean;
  /** false 이면 오버레이 클릭으로 모달이 닫히지 않음 (기본값: true) */
  closeOnOverlayClick?: boolean;
}

const POPUP_MAX_WIDTH: Record<ModalSize, string> = {
  sm: '320px',
  md: '400px',
  lg: '640px',
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      variant = 'popup',
      size = 'md',
      footer,
      loading = false,
      closeOnOverlayClick = true,
      style,
      className,
      ...props
    },
    ref
  ) => {
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

    const handleOverlayClick = () => {
      if (closeOnOverlayClick && !loading) {
        onClose();
      }
    };

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
        width: '90%',
        maxWidth: POPUP_MAX_WIDTH[size],
        ...base,
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
      cursor: loading ? 'not-allowed' : 'pointer',
      padding: cssVar('spacing', '4'),
      color: loading ? cssVar('semantic', 'disabled', 'foreground') : cssVar('semantic', 'foreground', 'muted'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: React.CSSProperties = {
      padding: cssVar('spacing', '20'),
      overflowY: 'auto',
      flex: 1,
    };

    const footerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: cssVar('spacing', '8'),
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '20')}`,
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      flexShrink: 0,
    };

    return (
      <div style={overlayStyle} onClick={handleOverlayClick}>
        <div
          ref={ref}
          style={getModalStyle()}
          className={className}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-busy={loading || undefined}
          {...props}
        >
          <div style={headerStyle}>
            {title && <h2 style={titleStyle}>{title}</h2>}
            <button
              style={closeBtnStyle}
              onClick={loading ? undefined : onClose}
              disabled={loading}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div style={contentStyle}>
            {children}
          </div>
          {footer && (
            <div style={footerStyle}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';
