import React, { useState, useRef, useEffect } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type PopoverSize = 'sm' | 'md' | 'lg';
export type PopoverVariant = 'default' | 'filled';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  /** Controls the minimum width of the popover panel. Default: 'md' */
  size?: PopoverSize;
  /**
   * Visual style of the popover panel.
   * - 'default': elevated background (existing behavior)
   * - 'filled': primary-subtle background for emphasis
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

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      ...style,
    };

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

    /** background by variant */
    const bgColor =
      variant === 'filled'
        ? cssVar('semantic', 'primary', 'subtle')
        : cssVar('semantic', 'background', 'elevated');

    const closedTransformBase =
      position === 'top' || position === 'bottom' ? 'translateX(-50%) scale(0.95)' : 'translateY(-50%) scale(0.95)';
    const openTransformBase =
      position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)';

    const popoverStyle: React.CSSProperties = {
      position: 'absolute',
      ...getPositionStyles(),
      backgroundColor: bgColor,
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'lg'),
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
      transition: [
        `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `visibility ${cssVar('motion', 'duration', 'fast')}`,
      ].join(', '),
      minWidth: minWidthMap[size],
    };

    const handleContentClick = () => {
      if (closeOnContentClick && isOpen) {
        handleClose();
      }
    };

    return (
      <div ref={setRefs} style={containerStyle} {...props}>
        <div onClick={handleOpenToggle} style={{ display: 'inline-block' }}>
          {children}
        </div>
        <div
          style={popoverStyle}
          role="dialog"
          data-variant={variant}
          data-size={size}
          onClick={closeOnContentClick ? handleContentClick : undefined}
        >
          {content}
        </div>
      </div>
    );
  }
);

Popover.displayName = 'Popover';
