import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';

export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  /** Presence indicator rendered as a dot at the bottom-right corner. */
  status?: AvatarStatus;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', shape = 'circle', status, style, className, ...props }, ref) => {
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

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sizeMap[size],
      height: sizeMap[size],
      borderRadius: shape === 'circle' ? '50%' : cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'muted'),
      overflow: 'hidden',
      position: 'relative',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
      fontWeight: 'bold',
      ...style,
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

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            style={imgStyle}
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials?.slice(0, 2).toUpperCase() || '?'}</span>
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
