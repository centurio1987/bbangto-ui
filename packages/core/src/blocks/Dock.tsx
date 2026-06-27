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

/**
 * Visual presentation axis for the {@link Dock}.
 *
 * - `floating` (default): centered floating bar with rounded corners, an
 *   elevation shadow and frosted-glass backdrop blur.
 * - `attached`: edge-attached bar that spans the full width with a flat
 *   bottom edge (no detached margin/radius/shadow on the attached edge).
 * - `labeled`: each item renders its icon beside its text label (horizontal
 *   item layout) for a denser, label-forward dock.
 * - `glass`: frosted-chrome treatment — no solid fill and no elevation drop
 *   shadow. The bar is a translucent backdrop-blurred pane (background token
 *   composited toward transparent) rimmed by a single thin *inset* highlight
 *   border. Reads as floating glass rather than `floating`'s opaque elevated
 *   surface + drop shadow.
 * - `spotlight`: glow-indicator chrome — the container itself is near-invisible
 *   (transparent fill, no border / shadow / blur) and the active affordance is
 *   a blurred token-gradient limelight beam behind the active item plus a thin
 *   glowing emitter bar across its top. Not an underline / pill / border — the
 *   indicator is a soft glow column, not a painted shape.
 */
export type DockVariant =
  | 'floating'
  | 'attached'
  | 'labeled'
  | 'glass'
  | 'spotlight';

/** The `glass` member literal of {@link DockVariant}. */
export type DockVariantGlass = 'glass';
/** The `spotlight` member literal of {@link DockVariant}. */
export type DockVariantSpotlight = 'spotlight';

export interface DockProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of dock items — each item becomes one pressable slot. */
  items: DockItem[];
  /** Visual presentation of the dock container. Defaults to `'floating'`. */
  variant?: DockVariant;
}

/**
 * Dock — macOS-style floating dock (organism / section block).
 *
 * Renders a horizontal row of icon + label slots inside a frosted-glass
 * container. Hover triggers a subtle scale-up animation that is suppressed
 * for users who prefer reduced motion.
 *
 * The {@link DockProps.variant} axis switches between a centered floating bar
 * (default), an edge-attached full-width bar, and a label-forward layout where
 * each icon sits beside its text label.
 */
export const Dock = React.forwardRef<HTMLElement, DockProps>(
  ({ items, variant = 'floating', style, ...props }, ref) => {
    const isAttached = variant === 'attached';
    const isLabeled = variant === 'labeled';
    const isGlass = variant === 'glass';
    const isSpotlight = variant === 'spotlight';

    const containerStyle: React.CSSProperties = {
      display: isAttached ? 'flex' : 'inline-flex',
      flexDirection: 'row',
      alignItems: isLabeled ? 'stretch' : 'flex-end',
      justifyContent: isAttached ? 'center' : undefined,
      width: isAttached ? '100%' : undefined,
      gap: cssVar('spacing', '8'),
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: isAttached ? '0' : cssVar('radius', 'xl'),
      boxShadow: isAttached ? 'none' : cssVar('shadow', 'lg'),
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      // Glass: translucent frosted pane — drop the solid fill and the elevation
      // drop shadow; composite the elevated background toward transparent and
      // rim it with a single thin INSET highlight (no border box). Stronger
      // blur than `floating` so the backdrop reads through the glass.
      ...(isGlass
        ? {
            backgroundColor: `color-mix(in srgb, ${cssVar('semantic', 'background', 'elevated')} 50%, transparent)`,
            border: 'none',
            boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${cssVar('semantic', 'border', 'strong')} 55%, transparent)`,
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }
        : null),
      // Spotlight: the bar is near-invisible — all chrome lives in the per-item
      // glow beam. Transparent fill, no border / shadow / blur.
      ...(isSpotlight
        ? {
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
          }
        : null),
      ...style,
    };

    return (
      <nav
        ref={ref}
        aria-label="Dock"
        data-bbangto-dock-variant={variant}
        style={containerStyle}
        {...props}
      >
        <style>{DOCK_STYLES}</style>
        {items.map((item, index) => (
          <DockButton
            key={index}
            item={item}
            labeled={isLabeled}
            spotlight={isSpotlight}
          />
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
  /** When true, the icon sits beside the label (horizontal item layout). */
  labeled?: boolean;
  /**
   * When true, the active item renders a glow limelight beam instead of the
   * solid pill fill, and the button establishes its own stacking context so
   * the beam can sit behind the icon/label.
   */
  spotlight?: boolean;
}

function DockButton({ item, labeled = false, spotlight = false }: DockButtonProps) {
  const [hovered, setHovered] = React.useState(false);

  // In spotlight mode the active state is communicated by the glow beam, not a
  // painted pill — so the active background fill is suppressed.
  const buttonBackground = spotlight
    ? hovered
      ? cssVar('semantic', 'background', 'sunken')
      : 'transparent'
    : item.active
      ? cssVar('semantic', 'primary', 'subtle')
      : hovered
        ? cssVar('semantic', 'background', 'sunken')
        : 'transparent';

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: labeled ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: labeled ? 'flex-start' : 'flex-end',
    gap: cssVar('spacing', '4'),
    padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '8')}`,
    background: buttonBackground,
    border: 'none',
    borderRadius: cssVar('radius', 'lg'),
    cursor: 'pointer',
    color: item.active
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'foreground', 'base'),
    transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    outline: 'none',
    minWidth: '56px',
    // Spotlight establishes a local stacking context so the absolutely
    // positioned glow beam (z-index -1) stays behind the icon/label.
    ...(spotlight ? { position: 'relative', isolation: 'isolate' } : null),
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

  // Blurred token-gradient light column behind the active item (limelight).
  const beamStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '70%',
    height: '100%',
    borderRadius: cssVar('radius', 'lg'),
    backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${cssVar('semantic', 'primary', 'base')} 60%, transparent) 0%, transparent 78%)`,
    filter: `blur(${cssVar('spacing', '8')})`,
    pointerEvents: 'none',
    zIndex: -1,
  };

  // Thin glowing emitter bar across the top of the active item.
  const barStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '2px',
    borderRadius: cssVar('radius', 'full'),
    backgroundColor: cssVar('semantic', 'primary', 'base'),
    boxShadow: `0 0 8px ${cssVar('semantic', 'primary', 'base')}`,
    pointerEvents: 'none',
    zIndex: -1,
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
      {spotlight && item.active && (
        <>
          <span
            className="bbangto-dock-spotlight-beam"
            aria-hidden="true"
            style={beamStyle}
          />
          <span
            className="bbangto-dock-spotlight-bar"
            aria-hidden="true"
            style={barStyle}
          />
        </>
      )}
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
