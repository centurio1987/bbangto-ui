import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Persistent visual style of the sidebar. Independent of the collapsed state.
 * - `default`: standard panel with labels shown.
 * - `rail`: icon-only narrow rail — labels are visually hidden and width is reduced.
 * - `floating`: detached panel with margin, border-radius and box-shadow.
 * - `bordered`: standard panel with an explicit right-edge divider rule.
 */
export type SidebarVariant = 'default' | 'rail' | 'floating' | 'bordered';

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'role'> {
  /** Controlled collapsed state. */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled. Defaults to false. */
  defaultCollapsed?: boolean;
  /** Called when the collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width when expanded. Defaults to 240px. */
  width?: number | string;
  /** Persistent visual style. Defaults to `default`. */
  variant?: SidebarVariant;
  children?: React.ReactNode;
}

export interface SidebarItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'aria-current'> {
  /** Icon element shown in both expanded and collapsed (rail) modes. */
  icon?: React.ReactNode;
  /** Text label — hidden in rail mode but kept as aria-label for the trigger. */
  label: string;
  /** Whether this item is the currently active page. */
  active?: boolean;
  /** Click handler. */
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** If provided, renders an <a> tag instead of <button>. */
  href?: string;
  /** Injected by parent Sidebar context; consumers should not set this directly. */
  _collapsed?: boolean;
}

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional group title label — hidden in collapsed mode. */
  label?: string;
  children?: React.ReactNode;
  /** Injected by parent Sidebar context. */
  _collapsed?: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface SidebarContextValue {
  collapsed: boolean;
  /** Rail variant collapses labels independently of the collapsed state. */
  rail: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue>({ collapsed: false, rail: false });

// ─── Sidebar ─────────────────────────────────────────────────────────────────

/** Collapsed rail width (icon-only mode). */
const RAIL_WIDTH = 56;

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      width = 240,
      variant = 'default',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);

    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? controlledCollapsed! : uncontrolledCollapsed;

    const handleToggle = () => {
      const next = !collapsed;
      if (!isControlled) {
        setUncontrolledCollapsed(next);
      }
      onCollapsedChange?.(next);
    };

    // The rail variant is a persistent icon-only style: it collapses labels and
    // narrows the width regardless of the (independent) collapsed toggle state.
    const isRail = variant === 'rail';
    const isFloating = variant === 'floating';
    const isBordered = variant === 'bordered';

    // Labels hidden when either the toggle collapsed the panel OR rail variant is on.
    const labelsHidden = collapsed || isRail;

    const resolvedWidth =
      labelsHidden
        ? RAIL_WIDTH
        : typeof width === 'number'
          ? width
          : parseInt(width as string, 10) || 240;

    const navStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: resolvedWidth,
      minHeight: '100%',
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      // bordered keeps a solid divider; floating drops the divider in favor of a shadow ring.
      borderRight: isFloating
        ? 'none'
        : `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      transition: `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      overflow: 'hidden',
      boxSizing: 'border-box',
      ...(isFloating
        ? {
            margin: cssVar('spacing', '10'),
            minHeight: 'auto',
            borderRadius: cssVar('radius', 'lg'),
            boxShadow: cssVar('shadow', 'lg'),
            border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
          }
        : {}),
      ...(isBordered
        ? {
            borderRight: `2px solid ${cssVar('semantic', 'border', 'base')}`,
          }
        : {}),
      ...style,
    };

    // Toggle button positioned at the bottom of the sidebar
    const toggleBtnStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-end',
      padding: `${cssVar('spacing', '6')} ${cssVar('spacing', '10')}`,
      marginTop: 'auto',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: cssVar('semantic', 'foreground', 'muted'),
      transition: `color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      borderRadius: cssVar('radius', 'sm'),
    };

    const chevronStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      transition: `transform ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
      flexShrink: 0,
    };

    return (
      <SidebarContext.Provider value={{ collapsed, rail: isRail }}>
        <nav
          ref={ref}
          aria-label="Sidebar navigation"
          data-bbangto-sidebar-variant={variant}
          style={navStyle}
          {...props}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: `${cssVar('spacing', '6')} 0`,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {children}
          </div>
          <button
            type="button"
            style={toggleBtnStyle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={handleToggle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = cssVar('semantic', 'foreground', 'base');
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = cssVar('semantic', 'foreground', 'muted');
            }}
          >
            {/* Chevron SVG — points left when expanded (collapse), right when collapsed (expand) */}
            <span style={chevronStyle} aria-hidden="true">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </nav>
      </SidebarContext.Provider>
    );
  }
);

Sidebar.displayName = 'Sidebar';

// ─── SidebarItem ─────────────────────────────────────────────────────────────

export const SidebarItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, SidebarItemProps>(
  (
    {
      icon,
      label,
      active = false,
      onClick,
      href,
      style,
      _collapsed,
      ...props
    },
    ref
  ) => {
    const ctx = React.useContext(SidebarContext);
    // Rail variant hides labels persistently, just like the collapsed toggle does.
    const collapsed = _collapsed !== undefined ? _collapsed : (ctx.collapsed || ctx.rail);

    const activeBg = cssVar('semantic', 'primary', 'subtle');
    const activeColor = cssVar('semantic', 'primary', 'base');
    const idleBg = 'transparent';
    const idleColor = cssVar('semantic', 'foreground', 'base');

    const baseItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: cssVar('spacing', '10'),
      width: '100%',
      padding: collapsed
        ? `${cssVar('spacing', '10')} 0`
        : `${cssVar('spacing', '10')} ${cssVar('spacing', '16')}`,
      justifyContent: collapsed ? 'center' : 'flex-start',
      backgroundColor: active ? activeBg : idleBg,
      color: active ? activeColor : idleColor,
      border: 'none',
      borderRadius: cssVar('radius', 'md'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontWeight: active
        ? cssVar('typography', 'scale', 'meta', 'fontWeight')
        : cssVar('typography', 'scale', 'body', 'fontWeight'),
      cursor: 'pointer',
      textDecoration: 'none',
      transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      ...style,
    };

    const iconWrapStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 20,
      height: 20,
    };

    const labelStyle: React.CSSProperties = {
      overflow: 'hidden',
      opacity: collapsed ? 0 : 1,
      maxWidth: collapsed ? 0 : '9999px',
      transition: [
        `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
        `max-width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      ].join(', '),
      // Reduce motion: browsers that set prefers-reduced-motion will still get
      // instantaneous transitions via the CSS media query on the document level.
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'sunken');
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (!active) {
        e.currentTarget.style.backgroundColor = idleBg;
      }
    };

    const ariaCurrent = active ? ('page' as const) : undefined;

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          style={baseItemStyle}
          aria-label={collapsed ? label : undefined}
          aria-current={ariaCurrent}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {icon && <span style={iconWrapStyle} aria-hidden="true">{icon}</span>}
          <span style={labelStyle} aria-hidden={collapsed}>{label}</span>
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        style={baseItemStyle}
        aria-label={collapsed ? label : undefined}
        aria-current={ariaCurrent}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLButtonElement>}
        onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {icon && <span style={iconWrapStyle} aria-hidden="true">{icon}</span>}
        <span style={labelStyle} aria-hidden={collapsed}>{label}</span>
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

// ─── SidebarGroup ─────────────────────────────────────────────────────────────

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, children, style, _collapsed, ...props }, ref) => {
    const ctx = React.useContext(SidebarContext);
    const collapsed = _collapsed !== undefined ? _collapsed : (ctx.collapsed || ctx.rail);

    const groupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '2'),
      padding: `${cssVar('spacing', '10')} ${cssVar('spacing', '6')}`,
      ...style,
    };

    const groupLabelStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'muted'),
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      padding: `0 ${cssVar('spacing', '10')}`,
      marginBottom: cssVar('spacing', '4'),
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      opacity: collapsed ? 0 : 1,
      maxHeight: collapsed ? 0 : '2em',
      transition: [
        `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
        `max-height ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
      ].join(', '),
    };

    return (
      <div ref={ref} role="group" aria-label={label} style={groupStyle} {...props}>
        {label && (
          <span style={groupLabelStyle} aria-hidden={collapsed}>
            {label}
          </span>
        )}
        {children}
      </div>
    );
  }
);

SidebarGroup.displayName = 'SidebarGroup';
