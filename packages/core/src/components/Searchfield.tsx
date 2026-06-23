import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export interface SearchfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  fullWidth?: boolean;
}

export const Searchfield = React.forwardRef<HTMLInputElement, SearchfieldProps>(
  ({ onSearch, fullWidth = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : '240px',
      height: '40px',
      padding: `0 ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      transition: 'border-color 0.2s',
      ...style,
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      height: '100%',
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };

    return (
      <div style={containerStyle} className={className}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cssVar('semantic', 'foreground', 'muted')} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={ref}
          type="search"
          style={inputStyle}
          placeholder="Search..."
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  }
);

Searchfield.displayName = 'Searchfield';
