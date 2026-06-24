import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardStatus = 'none' | 'error' | 'success' | 'warning';

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

    const baseStyles: React.CSSProperties = {
      backgroundColor: resolvedBg,
      borderRadius: cssVar('radius', 'lg'),
      padding: paddingMap[padding],
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

    return (
      <div
        ref={ref}
        role={resolvedRole}
        tabIndex={resolvedTabIndex}
        style={baseStyles}
        data-card-variant={variant}
        data-card-interactive={interactive ? 'true' : undefined}
        data-card-status={status !== 'none' ? status : undefined}
        onClick={onClick}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
