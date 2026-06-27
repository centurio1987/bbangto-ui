import React, { useState, useRef, useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type PopoverSize = 'sm' | 'md' | 'lg';
/**
 * Visual / structural family of the popover panel.
 *
 * Default-first: `default` is the union head and stays the implicit default so
 * every existing call site and story renders identically. New members are
 * appended to the tail.
 *
 * - `default`: anchored floating panel — elevated surface, 1px hairline border,
 *   drop-shadow (existing behavior).
 * - `filled`: anchored floating panel on a `primary.subtle` fill for emphasis.
 * - `sheet`: structural layout — the panel detaches from the trigger and docks
 *   to a viewport edge (`position: fixed`). Full-bleed track (100% width when
 *   bottom/top-docked, 100% height when side-docked) capped by a max dimension,
 *   with a top drag-handle affordance bar and a slide-in transform from the
 *   docked edge. Content stacks vertically (header / body / footer).
 * - `arrow`: anchored floating panel that grows a triangular caret/notch on the
 *   edge nearest the trigger. The caret's fill + border match the panel surface
 *   so it reads as one continuous pointer; the panel keeps its border + shadow.
 * - `elevated`: borderless opaque surface that relies purely on box-shadow
 *   elevation — no 1px border and no outline ring.
 */
export type PopoverVariant = 'default' | 'filled' | 'sheet' | 'arrow' | 'elevated';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /** Controls the minimum width of the popover panel. Default: 'md' */
  size?: PopoverSize;
  /**
   * Visual / structural style of the popover panel. Default: 'default'.
   * See {@link PopoverVariant} for the full family.
   */
  variant?: PopoverVariant;
  /**
   * When true, clicking anywhere inside the popover content closes the panel.
   * Useful for menus and option lists.
   */
  closeOnContentClick?: boolean;
}

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      content,
      children,
      position = 'bottom',
      isOpen: controlledIsOpen,
      onOpenChange,
      size = 'md',
      variant = 'default',
      closeOnContentClick = false,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const dialogId = React.useId();

    // merge forwarded ref with internal containerRef
    const setRefs = (node: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const handleOpenToggle = () => {
      const nextState = !isOpen;
      if (!isControlled) {
        setUncontrolledIsOpen(nextState);
      }
      onOpenChange?.(nextState);
    };

    const handleClose = () => {
      if (!isControlled) setUncontrolledIsOpen(false);
      onOpenChange?.(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          if (isOpen) {
            handleClose();
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, isControlled, onOpenChange]);

    // a11y contract: Escape closes the open panel (keyboard dismissal).
    useEffect(() => {
      if (!isOpen) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') handleClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isControlled, onOpenChange]);

    // a11y contract: move focus into the panel when it opens.
    useEffect(() => {
      if (isOpen) panelRef.current?.focus();
    }, [isOpen]);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      ...style,
    };

    const isSheet = variant === 'sheet';
    const isArrow = variant === 'arrow';
    const isElevated = variant === 'elevated';

    const getPositionStyles = (): React.CSSProperties => {
      switch (position) {
        case 'bottom':
          return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: cssVar('spacing', '4') };
        case 'left':
          return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: cssVar('spacing', '4') };
        case 'right':
          return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: cssVar('spacing', '4') };
        case 'top':
        default:
          return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: cssVar('spacing', '4') };
      }
    };

    /** min-width by size */
    const minWidthMap: Record<PopoverSize, string> = {
      sm: '160px',
      md: '200px',
      lg: '320px',
    };

    /** background by variant — non-filled members share the elevated surface. */
    const bgColor =
      variant === 'filled'
        ? cssVar('semantic', 'primary', 'subtle')
        : cssVar('semantic', 'background', 'elevated');

    // `elevated` removes the hairline border outright and leans on the shadow;
    // all other members keep the 1px muted hairline.
    const panelBorder = isElevated ? 'none' : `1px solid ${cssVar('semantic', 'border', 'muted')}`;
    const panelShadow = cssVar('shadow', 'lg');

    const panelTransition = [
      `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
      `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
      `visibility ${cssVar('motion', 'duration', 'fast')}`,
    ].join(', ');

    const closedTransformBase =
      position === 'top' || position === 'bottom' ? 'translateX(-50%) scale(0.95)' : 'translateY(-50%) scale(0.95)';
    const openTransformBase =
      position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)';

    // ── Anchored floating panel (default / filled / arrow / elevated) ──────────
    const popoverStyle: React.CSSProperties = {
      position: 'absolute',
      ...getPositionStyles(),
      backgroundColor: bgColor,
      border: panelBorder,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: panelShadow,
      zIndex: cssVar('zIndex', 'popover'),
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transform: isOpen ? openTransformBase : closedTransformBase,
      transformOrigin:
        position === 'top'
          ? 'bottom center'
          : position === 'bottom'
          ? 'top center'
          : position === 'left'
          ? 'right center'
          : 'left center',
      transition: panelTransition,
      minWidth: minWidthMap[size],
    };

    // ── Docked sheet (sheet) ───────────────────────────────────────────────────
    // The panel detaches from the trigger and pins to a viewport edge. The
    // docked edge drives the full-bleed axis (100% width for top/bottom, 100%
    // height for left/right) and the slide-in transform direction.
    const getSheetEdgeStyles = (): React.CSSProperties => {
      switch (position) {
        case 'left':
          return {
            top: 0,
            bottom: 0,
            left: 0,
            height: '100%',
            width: '100%',
            maxWidth: '24rem',
            transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          };
        case 'right':
          return {
            top: 0,
            bottom: 0,
            right: 0,
            height: '100%',
            width: '100%',
            maxWidth: '24rem',
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          };
        case 'top':
          return {
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxHeight: '85vh',
            margin: '0 auto',
            transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          };
        case 'bottom':
        default:
          return {
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            maxHeight: '85vh',
            margin: '0 auto',
            transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          };
      }
    };

    const sheetStyle: React.CSSProperties = {
      position: 'fixed',
      ...getSheetEdgeStyles(),
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bgColor,
      border: panelBorder,
      borderRadius: cssVar('radius', 'lg'),
      boxShadow: panelShadow,
      zIndex: cssVar('zIndex', 'popover'),
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: panelTransition,
    };

    const handleBarStyle: React.CSSProperties = {
      flexShrink: 0,
      width: cssVar('spacing', '40'),
      height: cssVar('spacing', '4'),
      margin: `${cssVar('spacing', '8')} auto`,
      borderRadius: cssVar('radius', 'full'),
      backgroundColor: cssVar('semantic', 'border', 'strong'),
    };

    // Triangular caret for `arrow`: a token-filled square rotated 45° whose two
    // outward edges carry the same hairline border as the panel, so the notch
    // reads as a continuous pointer toward the trigger.
    const caretBorder = `1px solid ${cssVar('semantic', 'border', 'muted')}`;
    const getCaretStyles = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        position: 'absolute',
        width: cssVar('spacing', '8'),
        height: cssVar('spacing', '8'),
        backgroundColor: bgColor,
      };
      switch (position) {
        case 'top':
          // panel sits above the trigger → caret on the bottom edge.
          return {
            ...base,
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 50%) rotate(45deg)',
            borderRight: caretBorder,
            borderBottom: caretBorder,
          };
        case 'left':
          // panel sits left of the trigger → caret on the right edge.
          return {
            ...base,
            right: 0,
            top: '50%',
            transform: 'translate(50%, -50%) rotate(45deg)',
            borderTop: caretBorder,
            borderRight: caretBorder,
          };
        case 'right':
          // panel sits right of the trigger → caret on the left edge.
          return {
            ...base,
            left: 0,
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            borderBottom: caretBorder,
            borderLeft: caretBorder,
          };
        case 'bottom':
        default:
          // panel sits below the trigger → caret on the top edge.
          return {
            ...base,
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            borderTop: caretBorder,
            borderLeft: caretBorder,
          };
      }
    };

    const panelStyle = isSheet ? sheetStyle : popoverStyle;

    const handleContentClick = () => {
      if (closeOnContentClick && isOpen) {
        handleClose();
      }
    };

    return (
      <div ref={setRefs} style={containerStyle} {...props}>
        <div
          onClick={handleOpenToggle}
          style={{ display: 'inline-block' }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={dialogId}
        >
          {children}
        </div>
        <div
          ref={panelRef}
          id={dialogId}
          style={panelStyle}
          role="dialog"
          tabIndex={-1}
          data-variant={variant}
          data-bbangto-popover-variant={variant}
          data-size={size}
          onClick={closeOnContentClick ? handleContentClick : undefined}
        >
          {isSheet && <div aria-hidden="true" style={handleBarStyle} />}
          {isArrow && <span aria-hidden="true" data-bbangto-popover-caret="" style={getCaretStyles()} />}
          {content}
        </div>
      </div>
    );
  }
);

Popover.displayName = 'Popover';
