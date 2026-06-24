import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

export interface DockItem {
  /** Icon node rendered in the dock button. */
  icon: React.ReactNode;
  /** Visible label below the icon. */
  label: string;
  /** Click handler for the item. */
  onClick?: () => void;
  /** Whether this item is currently active/selected. */
  active?: boolean;
}

export interface DockProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of dock items — each item becomes one pressable slot. */
  items: DockItem[];
}

/**
 * Dock — macOS-style floating dock (organism / section block).
 *
 * Renders a horizontal row of icon + label slots inside a frosted-glass
 * container. Hover triggers a subtle scale-up animation that is suppressed
 * for users who prefer reduced motion.
 */
export const Dock = React.forwardRef<HTMLElement, DockProps>(
  ({ items, style, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: cssVar('spacing', '8'),
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'xl'),
      boxShadow: cssVar('shadow', 'lg'),
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      ...style,
    };

    return (
      <nav ref={ref} aria-label="Dock" style={containerStyle} {...props}>
        <style>{DOCK_STYLES}</style>
        {items.map((item, index) => (
          <DockButton key={index} item={item} />
        ))}
      </nav>
    );
  }
);

Dock.displayName = 'Dock';

// ---------------------------------------------------------------------------
// Internal DockButton
// ---------------------------------------------------------------------------

interface DockButtonProps {
  item: DockItem;
}

function DockButton({ item }: DockButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: cssVar('spacing', '4'),
    padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '8')}`,
    background: item.active
      ? cssVar('semantic', 'primary', 'subtle')
      : hovered
        ? cssVar('semantic', 'background', 'sunken')
        : 'transparent',
    border: 'none',
    borderRadius: cssVar('radius', 'lg'),
    cursor: 'pointer',
    color: item.active
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'foreground', 'base'),
    transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    outline: 'none',
    minWidth: '56px',
    // The scale is handled via className to allow prefers-reduced-motion suppression
  };

  const iconWrapStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: cssVar('radius', 'md'),
    transition: `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    transform: hovered ? 'scale(1.2) translateY(-4px)' : 'scale(1) translateY(0)',
    // transform is inlined so it responds to JS state; reduced-motion overrides
    // the CSS transition duration via the DOCK_STYLES scoped rule.
  };

  return (
    <button
      className="bbangto-dock-item"
      type="button"
      aria-pressed={item.active ?? false}
      aria-label={item.label}
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={item.onClick}
    >
      <span
        className="bbangto-dock-icon"
        aria-hidden="true"
        style={iconWrapStyle}
      >
        {item.icon}
      </span>
      <Text variant="meta" color="muted" as="span">
        {item.label}
      </Text>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Scoped styles — prefers-reduced-motion suppression only
// (layout transitions are driven by inline style state above)
// ---------------------------------------------------------------------------

const DOCK_STYLES = `
  @media (prefers-reduced-motion: reduce) {
    .bbangto-dock-icon {
      transform: none !important;
      transition: none !important;
    }
    .bbangto-dock-item {
      transition: none !important;
    }
  }
`;
