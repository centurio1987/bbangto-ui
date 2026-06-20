import React, { useState } from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', shape = 'circle', style, className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const sizeMap = {
      sm: '24px',
      md: '32px',
      lg: '40px',
      xl: '48px',
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
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
