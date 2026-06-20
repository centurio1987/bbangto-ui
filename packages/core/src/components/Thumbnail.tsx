import React, { useState } from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface ThumbnailProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: '1:1' | '4:3' | '16:9';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Thumbnail = React.forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ src, alt, ratio = '16:9', radius = 'md', style, className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const ratioMap = {
      '1:1': '100%',
      '4:3': '75%',
      '16:9': '56.25%',
    };

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      paddingTop: ratioMap[ratio],
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      borderRadius: cssVar('radius', radius),
      overflow: 'hidden',
      ...style,
    };

    const imgStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    const placeholderStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: cssVar('semantic', 'foreground', 'muted'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        {src && !imageError ? (
          <img src={src} alt={alt || 'Thumbnail'} style={imgStyle} onError={() => setImageError(true)} />
        ) : (
          <div style={placeholderStyle}>No Image</div>
        )}
      </div>
    );
  }
);

Thumbnail.displayName = 'Thumbnail';
