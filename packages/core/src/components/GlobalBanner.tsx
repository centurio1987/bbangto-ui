import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';
import { Text } from './Text';

export interface GlobalBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  color?: 'primary' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

export const GlobalBanner = React.forwardRef<HTMLDivElement, GlobalBannerProps>(
  ({ isOpen, onClose, color = 'primary', children, style, className, ...props }, ref) => {
    if (!isOpen) return null;

    const bannerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      backgroundColor: cssVar('semantic', color, 'subtle'),
      color: cssVar('semantic', color, 'foreground'),
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '16')}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const closeBtnStyle: React.CSSProperties = {
      position: 'absolute',
      right: cssVar('spacing', '16'),
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: cssVar('spacing', '4'),
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.7,
      transition: 'opacity 0.2s',
    };

    return (
      <div 
        ref={ref} 
        style={bannerStyle} 
        className={className} 
        role="banner"
        {...props}
      >
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Text variant="meta" style={{ fontWeight: 'bold' }}>
            {children}
          </Text>
        </div>
        
        {onClose && (
          <button 
            style={closeBtnStyle} 
            onClick={onClose} 
            aria-label="Close banner"
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

GlobalBanner.displayName = 'GlobalBanner';
