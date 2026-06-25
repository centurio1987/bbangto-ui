import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardStatus = 'none' | 'error' | 'success' | 'warning';
export type CardLayout = 'vertical' | 'horizontal' | 'overlay';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  /** Visual treatment of the card surface.
   * - `elevated` (default): shadow + optional border (existing behaviour)
   * - `outlined`: border only, no shadow
   * - `filled`: sunken background, no border, no shadow
   */
  variant?: CardVariant;
  /** When true, the card responds to hover/focus as a clickable surface.
   * Adds `role="button"` and `tabIndex={0}` automatically unless overridden.
   */
  interactive?: boolean;
  /** Top-edge accent colour conveying semantic status.
   * Adds a coloured `borderTop` line; does not override the main border.
   */
  status?: CardStatus;
  /** Arrangement of `media` relative to `children`.
   * - `vertical` (default): media block (if present) stacked above children. With no media this renders exactly as before.
   * - `horizontal`: media on the left, children on the right (flex-row).
   * - `overlay`: media fills the card as an absolutely-positioned background, children overlaid on top with a readable scrim.
   */
  layout?: CardLayout;
  /** Optional media slot (image, video, illustration) positioned according to `layout`. */
  media?: React.ReactNode;
}

const STATUS_COLOR: Record<Exclude<CardStatus, 'none'>, string> = {
  error: cssVar('semantic', 'error', 'base'),
  success: cssVar('semantic', 'success', 'base'),
  warning: cssVar('semantic', 'warning', 'base'),
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      elevation = 'sm',
      padding = 'md',
      bordered = true,
      variant = 'elevated',
      interactive = false,
      status = 'none',
      layout = 'vertical',
      media,
      style,
      role,
      tabIndex,
      onKeyDown,
      onClick,
      ...props
    },
    ref
  ) => {
    const paddingMap: Record<NonNullable<CardProps['padding']>, string> = {
      none: '0',
      sm: cssVar('spacing', '12'),
      md: cssVar('spacing', '24'),
      lg: cssVar('spacing', '40'),
    };

    // Resolve shadow: outlined/filled suppress it; elevated uses the elevation prop.
    const resolvedShadow =
      variant === 'elevated' ? cssVar('shadow', elevation) : cssVar('shadow', 'none');

    // Resolve border.
    let resolvedBorder: string;
    if (variant === 'outlined') {
      resolvedBorder = `1px solid ${cssVar('semantic', 'border', 'base')}`;
    } else if (variant === 'filled') {
      resolvedBorder = 'none';
    } else {
      // elevated — honour the existing `bordered` prop
      resolvedBorder = bordered ? `1px solid ${cssVar('semantic', 'border', 'base')}` : 'none';
    }

    // Resolve background.
    const resolvedBg =
      variant === 'filled'
        ? cssVar('semantic', 'background', 'sunken')
        : cssVar('semantic', 'background', 'elevated');

    // Status accent — override borderTop when status is set.
    const statusBorderTop =
      status !== 'none'
        ? `3px solid ${STATUS_COLOR[status]}`
        : undefined;

    const hasMedia = media != null && media !== false;
    const resolvedPadding = paddingMap[padding];

    // Overlay layout clips the absolutely-positioned media to the card radius and
    // owns its own internal padding (the root keeps padding:0 so media reaches the edges).
    const isOverlay = layout === 'overlay';

    const baseStyles: React.CSSProperties = {
      backgroundColor: resolvedBg,
      borderRadius: cssVar('radius', 'lg'),
      padding: isOverlay ? '0' : resolvedPadding,
      boxShadow: resolvedShadow,
      border: resolvedBorder,
      ...(statusBorderTop ? { borderTop: statusBorderTop } : {}),
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: interactive ? 'pointer' : undefined,
      transition: interactive
        ? `box-shadow ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`
        : undefined,
      outline: 'none',
      // Layout-specific container flow.
      ...(hasMedia && layout === 'horizontal'
        ? { display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: resolvedPadding }
        : {}),
      ...(isOverlay ? { position: 'relative', overflow: 'hidden' } : {}),
      ...style,
    };

    // Accessibility: interactive cards behave like buttons when no explicit role.
    const resolvedRole = interactive ? (role ?? 'button') : role;
    const resolvedTabIndex = interactive ? (tabIndex ?? 0) : tabIndex;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        (e.currentTarget as HTMLDivElement).click();
      }
      onKeyDown?.(e);
    };

    // Media slot styling per layout.
    const horizontalMediaStyle: React.CSSProperties = {
      flex: '0 0 40%',
      minWidth: 0,
      overflow: 'hidden',
    };
    const overlayMediaStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      overflow: 'hidden',
    };
    const overlayScrimStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      pointerEvents: 'none',
    };
    const overlayContentStyle: React.CSSProperties = {
      position: 'relative',
      zIndex: 2,
      padding: resolvedPadding,
    };

    let body: React.ReactNode;
    if (isOverlay) {
      body = (
        <>
          {hasMedia ? (
            <div data-card-media style={overlayMediaStyle}>
              {media}
            </div>
          ) : null}
          {hasMedia ? <div data-card-scrim style={overlayScrimStyle} /> : null}
          <div data-card-content style={overlayContentStyle}>
            {children}
          </div>
        </>
      );
    } else if (hasMedia && layout === 'horizontal') {
      body = (
        <>
          <div data-card-media style={horizontalMediaStyle}>
            {media}
          </div>
          <div data-card-content style={{ flex: '1 1 auto', minWidth: 0 }}>
            {children}
          </div>
        </>
      );
    } else if (hasMedia) {
      // vertical with media — stacked
      body = (
        <>
          <div data-card-media>{media}</div>
          <div data-card-content>{children}</div>
        </>
      );
    } else {
      // vertical, no media — exactly as before (backward compat)
      body = children;
    }

    return (
      <div
        ref={ref}
        role={resolvedRole}
        tabIndex={resolvedTabIndex}
        style={baseStyles}
        data-card-variant={variant}
        data-card-interactive={interactive ? 'true' : undefined}
        data-card-status={status !== 'none' ? status : undefined}
        data-bbangto-card-layout={layout}
        onClick={onClick}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        {...props}
      >
        {body}
      </div>
    );
  }
);

Card.displayName = 'Card';
