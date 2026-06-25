import React, { useState, useRef, useEffect, useCallback, useId } from 'react';
import { cssVar } from '@centurio1987/tokens';

// ─── Menu ────────────────────────────────────────────────────────────────────

/** Visual treatment of the menu list container. */
export type MenuVariant = 'default' | 'compact' | 'bordered' | 'floating';

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Additional inline styles. */
  style?: React.CSSProperties;
  /** Visual treatment of the menu container. Defaults to 'default'. */
  variant?: MenuVariant;
}

export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ children, style, variant = 'default', className, ...props }, ref) => {
    // A stable id is needed only for the compact variant, which scopes a
    // `<style>` tag to override the inline padding of its child MenuItems.
    const generatedId = useId();
    const compactClass = `bbangto-menu-compact-${generatedId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

    const variantStyles: React.CSSProperties =
      variant === 'compact'
        ? { padding: `${cssVar('spacing', '2')} 0` }
        : variant === 'bordered'
          ? {
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: cssVar('semantic', 'border', 'base'),
            }
          : variant === 'floating'
            ? {
                boxShadow: cssVar('shadow', 'xl'),
                borderRadius: cssVar('radius', 'lg'),
              }
            : {};

    const menuStyles: React.CSSProperties = {
      listStyle: 'none',
      margin: 0,
      padding: `${cssVar('spacing', '4')} 0`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'lg'),
      minWidth: '160px',
      outline: 'none',
      ...variantStyles,
      ...style,
    };

    return (
      <>
        {variant === 'compact' && (
          <style>{`
            .${compactClass} > [role="menuitem"],
            .${compactClass} [role="group"] > [role="menuitem"] {
              padding-top: ${cssVar('spacing', '4')} !important;
              padding-bottom: ${cssVar('spacing', '4')} !important;
            }
          `}</style>
        )}
        <ul
          ref={ref}
          role="menu"
          data-bbangto-menu-variant={variant}
          className={
            variant === 'compact'
              ? [compactClass, className].filter(Boolean).join(' ')
              : className
          }
          style={menuStyles}
          {...props}
        >
          {children}
        </ul>
      </>
    );
  }
);

Menu.displayName = 'Menu';

// ─── MenuItem ─────────────────────────────────────────────────────────────────

export interface MenuItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'onSelect'> {
  /** Called when the item is selected via click or keyboard. */
  onSelect?: () => void;
  /** When true, the item cannot be interacted with. */
  disabled?: boolean;
  /** Icon rendered to the left of the label text. */
  leftIcon?: React.ReactNode;
}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  ({ children, onSelect, disabled = false, leftIcon, style, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
      if (!disabled) {
        onSelect?.();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onSelect?.();
      }
    };

    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '8'),
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '16')}`,
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      backgroundColor: isHovered && !disabled
        ? cssVar('semantic', 'background', 'sunken')
        : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      listStyle: 'none',
      ...style,
    };

    return (
      <li
        ref={ref}
        role="menuitem"
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        style={itemStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        {...props}
      >
        {leftIcon && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              color: disabled ? cssVar('semantic', 'disabled', 'foreground') : 'inherit',
            }}
          >
            {leftIcon}
          </span>
        )}
        <span style={{ flex: 1 }}>{children}</span>
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';

// ─── MenuGroup ────────────────────────────────────────────────────────────────

export interface MenuGroupProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Visible label above the group. */
  label: string;
}

export const MenuGroup = React.forwardRef<HTMLLIElement, MenuGroupProps>(
  ({ label, children, style, ...props }, ref) => {
    const labelStyles: React.CSSProperties = {
      display: 'block',
      padding: `${cssVar('spacing', '6')} ${cssVar('spacing', '16')} ${cssVar('spacing', '4')}`,
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'muted'),
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      userSelect: 'none',
    };

    const groupStyles: React.CSSProperties = {
      listStyle: 'none',
      ...style,
    };

    return (
      <li ref={ref} role="presentation" style={groupStyles} {...props}>
        <span style={labelStyles} aria-hidden="true">
          {label}
        </span>
        <ul role="group" aria-label={label} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {children}
        </ul>
      </li>
    );
  }
);

MenuGroup.displayName = 'MenuGroup';

// ─── MenuSeparator ────────────────────────────────────────────────────────────

export interface MenuSeparatorProps extends React.HTMLAttributes<HTMLLIElement> {}

export const MenuSeparator = React.forwardRef<HTMLLIElement, MenuSeparatorProps>(
  ({ style, ...props }, ref) => {
    const separatorStyles: React.CSSProperties = {
      listStyle: 'none',
      margin: `${cssVar('spacing', '4')} 0`,
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      ...style,
    };

    return <li ref={ref} role="separator" style={separatorStyles} {...props} />;
  }
);

MenuSeparator.displayName = 'MenuSeparator';

// ─── DropdownMenu ─────────────────────────────────────────────────────────────

export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The trigger element. When provided, `children` is used as the menu content.
   * If omitted, the first child is used as the trigger.
   */
  trigger?: React.ReactElement;
  /** Menu content when `trigger` prop is used, otherwise pass trigger+content as children. */
  children?: React.ReactNode;
  /** Controlled open state. */
  isOpen?: boolean;
  /** Called when open state should change. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Position of the menu relative to the trigger. Defaults to 'bottom'. */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      children,
      isOpen: controlledIsOpen,
      onOpenChange,
      position = 'bottom',
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const triggerId = useId();
    const menuId = useId();

    // Merge forwarded ref with internal containerRef
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

    const open = useCallback(() => {
      if (!isControlled) setUncontrolledIsOpen(true);
      onOpenChange?.(true);
    }, [isControlled, onOpenChange]);

    const close = useCallback(() => {
      if (!isControlled) setUncontrolledIsOpen(false);
      onOpenChange?.(false);
    }, [isControlled, onOpenChange]);

    const toggle = useCallback(() => {
      if (isOpen) {
        close();
      } else {
        open();
      }
    }, [isOpen, open, close]);

    // Enter on the <button> trigger fires keydown AND a synthesized click; the
    // click re-focuses the button (stealing focus from the menu). So keyboard
    // navigation does not rely on DOM focus moving into the menu — it tracks an
    // activeIndex on the trigger and activates the target item via .click().
    const suppressClickRef = useRef(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const getMenuItems = useCallback(
      () =>
        menuRef.current
          ? Array.from(
              menuRef.current.querySelectorAll<HTMLElement>(
                '[role="menuitem"]:not([aria-disabled="true"])'
              )
            )
          : [],
      []
    );

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          isOpen
        ) {
          close();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, close]);

    // Focus first item when menu opens
    useEffect(() => {
      if (isOpen && menuRef.current) {
        const firstItem = menuRef.current.querySelector<HTMLElement>(
          '[role="menuitem"]:not([aria-disabled="true"])'
        );
        firstItem?.focus();
      }
    }, [isOpen]);

    // Keyboard navigation on the menu
    const handleMenuKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        if (!menuRef.current) return;

        const items = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([aria-disabled="true"])'
          )
        );
        const currentIndex = items.indexOf(document.activeElement as HTMLElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[next]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prev]?.focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          close();
          // Return focus to trigger
          triggerRef.current?.focus();
        } else if (e.key === 'Tab') {
          close();
        }
      },
      [close]
    );

    // Keyboard on trigger (focus stays on the trigger button — see note above).
    const handleTriggerKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          suppressClickRef.current = true; // neutralize the synthesized click's toggle
          if (!isOpen) {
            open();
            setActiveIndex(0);
          } else {
            const items = getMenuItems();
            const target = activeIndex >= 0 ? items[activeIndex] : items[0];
            if (target) {
              target.click();
              close();
              setActiveIndex(-1);
            }
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (!isOpen) {
            open();
            setActiveIndex(0);
          } else {
            setActiveIndex((i) => {
              const count = getMenuItems().length;
              return count === 0 ? -1 : Math.min(i + 1, count - 1);
            });
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (isOpen) {
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
        } else if (e.key === 'Escape') {
          if (isOpen) {
            e.preventDefault();
            close();
            setActiveIndex(-1);
          }
        }
      },
      [isOpen, open, close, getMenuItems, activeIndex]
    );

    // Positioning of the menu panel
    const getPositionStyles = (): React.CSSProperties => {
      switch (position) {
        case 'bottom':
          return {
            top: '100%',
            left: '0',
            marginTop: cssVar('spacing', '4'),
          };
        case 'top':
          return {
            bottom: '100%',
            left: '0',
            marginBottom: cssVar('spacing', '4'),
          };
        case 'right':
          return {
            left: '100%',
            top: '0',
            marginLeft: cssVar('spacing', '4'),
          };
        case 'left':
          return {
            right: '100%',
            top: '0',
            marginRight: cssVar('spacing', '4'),
          };
        default:
          return {
            top: '100%',
            left: '0',
            marginTop: cssVar('spacing', '4'),
          };
      }
    };

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      ...style,
    };

    const menuWrapperStyle: React.CSSProperties = {
      position: 'absolute',
      ...getPositionStyles(),
      zIndex: cssVar('zIndex', 'popover'),
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transform: isOpen ? 'scale(1)' : 'scale(0.95)',
      transformOrigin: position === 'top' ? 'bottom left' : position === 'bottom' ? 'top left' : 'top left',
      transition: [
        `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
        `visibility ${cssVar('motion', 'duration', 'fast')}`,
      ].join(', '),
    };

    // Clone trigger to inject a11y + keyboard props
    const clonedTrigger = trigger
      ? React.cloneElement(trigger, {
          id: triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': isOpen,
          'aria-controls': menuId,
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            if (suppressClickRef.current) {
              suppressClickRef.current = false;
            } else {
              toggle();
            }
            trigger.props.onClick?.(e);
          },
          onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
            handleTriggerKeyDown(e);
            trigger.props.onKeyDown?.(e);
          },
          ref: triggerRef,
        } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> })
      : null;

    return (
      <div ref={setRefs} style={containerStyle} {...props}>
        {clonedTrigger}
        <div style={menuWrapperStyle} aria-hidden={!isOpen}>
          <Menu
            ref={menuRef}
            id={menuId}
            aria-labelledby={triggerId}
            onKeyDown={handleMenuKeyDown}
            style={{ margin: 0, border: 'none', boxShadow: 'none', borderRadius: cssVar('radius', 'md') }}
          >
            {children}
          </Menu>
        </div>
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';
