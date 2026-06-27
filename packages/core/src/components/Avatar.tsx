import React, { useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Border-treatment axis for the avatar chrome.
 *
 * `plain` (default, first member) keeps the legacy single-surface render
 * untouched. `gradient-ring` is a distinct border treatment that cannot be
 * expressed by `shape` or the `status` dot: a gradient frames the avatar and
 * a background-colored gap (ring offset) separates it from the inner image.
 */
export type AvatarVariant = 'plain' | 'gradient-ring';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  /** Presence indicator rendered as a dot at the bottom-right corner. */
  status?: AvatarStatus;
  /** Border-treatment axis. Defaults to `plain` so legacy renders are unchanged. */
  variant?: AvatarVariant;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      size = 'md',
      shape = 'circle',
      status,
      variant = 'plain',
      style,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizeMap = {
      sm: '24px',
      md: '32px',
      lg: '40px',
      xl: '48px',
    };

    const statusDotSizeMap = {
      sm: '7px',
      md: '9px',
      lg: '11px',
      xl: '13px',
    };

    const statusColorMap: Record<AvatarStatus, string> = {
      online: cssVar('semantic', 'success', 'base'),
      offline: cssVar('semantic', 'foreground', 'muted'),
      away: cssVar('semantic', 'warning', 'base'),
      busy: cssVar('semantic', 'error', 'base'),
    };

    const radius = shape === 'circle' ? '50%' : cssVar('radius', 'md');
    const isRing = variant === 'gradient-ring';

    // Gradient ring chrome: the gradient itself is the ring (no solid border).
    // Composed from existing color-scale tokens since the token set has no
    // gradient primitive.
    const ringGradient = `conic-gradient(from 0deg, ${cssVar('semantic', 'primary', 'base')}, ${cssVar(
      'semantic',
      'success',
      'base'
    )}, ${cssVar('semantic', 'warning', 'base')}, ${cssVar(
      'semantic',
      'primary',
      'hover'
    )}, ${cssVar('semantic', 'primary', 'base')})`;

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      width: sizeMap[size],
      height: sizeMap[size],
      borderRadius: radius,
      // Plain keeps the flat sunken surface; the ring paints a gradient frame
      // with a padding-driven thickness instead of a background fill.
      backgroundColor: isRing ? 'transparent' : cssVar('semantic', 'background', 'sunken'),
      backgroundImage: isRing ? ringGradient : undefined,
      padding: isRing ? cssVar('spacing', '3') : undefined,
      color: cssVar('semantic', 'foreground', 'muted'),
      overflow: isRing ? 'visible' : 'hidden',
      position: 'relative',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
      fontWeight: 'bold',
      ...style,
    };

    // Background-colored gap between gradient ring and the inner content
    // (ring offset). Only used by the gradient-ring variant.
    const ringGapStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      padding: cssVar('spacing', '1'),
      borderRadius: radius,
      backgroundColor: cssVar('semantic', 'background', 'base'),
    };

    const ringContentStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      borderRadius: radius,
      overflow: 'hidden',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
    };

    const imgStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    const statusDotStyle: React.CSSProperties = status
      ? {
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: statusDotSizeMap[size],
          height: statusDotSizeMap[size],
          borderRadius: '50%',
          backgroundColor: statusColorMap[status],
          boxShadow: `0 0 0 2px ${cssVar('semantic', 'background', 'base')}`,
          boxSizing: 'border-box',
        }
      : {};

    const avatarContent =
      src && !imageError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          style={imgStyle}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials?.slice(0, 2).toUpperCase() || '?'}</span>
      );

    return (
      <div
        ref={ref}
        data-bbangto-avatar-variant={variant}
        style={containerStyle}
        className={className}
        {...props}
      >
        {isRing ? (
          <div data-bbangto-avatar-ring-gap="" style={ringGapStyle}>
            <div style={ringContentStyle}>{avatarContent}</div>
          </div>
        ) : (
          avatarContent
        )}
        {status && (
          <span
            data-avatar-status={status}
            role="img"
            aria-label={status}
            style={statusDotStyle}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
