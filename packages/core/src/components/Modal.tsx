import React, { useEffect, useRef } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { KEYFRAME_NAMES, SLIDE_VARS, useAnimatedMount } from '../motion';

export type ModalSize = 'sm' | 'md' | 'lg';

/**
 * Visual / structural family of the dialog surface.
 *
 * `popup` (default, union head) keeps every existing call site untouched.
 * New members are appended to the tail. `side-sheet` anchors to an inline
 * (left/right) viewport edge — distinct anchor + slide-axis from `bottom-sheet`.
 */
export type ModalVariant = 'popup' | 'full' | 'bottom-sheet' | 'side-sheet';

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  variant?: ModalVariant;
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

    // Internal handle to the panel so the a11y contract (focus trap + return
    // focus) works regardless of how/whether the caller forwards a ref.
    const panelRef = useRef<HTMLDivElement | null>(null);
    const lastFocusedRef = useRef<Element | null>(null);
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

    // Move focus into the dialog on open and restore it to the previously
    // focused element on close. This is part of the dialog a11y contract that
    // every variant (including new ones) must preserve.
    useEffect(() => {
      if (isOpen) {
        lastFocusedRef.current = document.activeElement;
        const id = requestAnimationFrame(() => panelRef.current?.focus());
        return () => cancelAnimationFrame(id);
      }
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus();
      }
      return undefined;
    }, [isOpen]);

    if (!shouldRender) return null;

    // Esc dismissal + Tab focus trap. Keeps focus contained to the dialog so
    // no variant can leak focus to the inert page behind the overlay.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && !loading) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) {
        e.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

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
      alignItems:
        variant === 'bottom-sheet'
          ? 'flex-end'
          : variant === 'full' || variant === 'side-sheet'
            ? 'stretch'
            : 'center',
      // side-sheet docks to the inline-end (right) viewport edge; all others center.
      justifyContent: variant === 'side-sheet' ? 'flex-end' : 'center',
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

      if (variant === 'side-sheet') {
        // Slides on the X axis from the inline-end edge — the load-bearing
        // distinction from bottom-sheet's Y-axis (block-end) entrance.
        return {
          [SLIDE_VARS.x]: '100%',
          [SLIDE_VARS.y]: '0',
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

      if (variant === 'side-sheet') {
        // Full block-size column anchored to the inline-end edge, its inline-size
        // capped by the same max-inline-size token the popup uses (sm/md/lg) —
        // never full-width, unlike bottom-sheet.
        return {
          ...base,
          width: '90vw',
          maxWidth: POPUP_MAX_WIDTH[size],
          height: '100vh',
          borderTopLeftRadius: cssVar('radius', 'xl'),
          borderBottomLeftRadius: cssVar('radius', 'xl'),
          boxShadow: cssVar('shadow', 'xl'),
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
          ref={setPanelRef}
          style={getModalStyle()}
          className={className}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-busy={loading || undefined}
          tabIndex={-1}
          data-bbangto-dialog-variant={variant}
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
