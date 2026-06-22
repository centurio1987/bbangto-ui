import React, { useState, useRef, useEffect } from 'react';
import { cssVar } from '@centurio87/tokens';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = 'Select...', disabled, fullWidth = false, style, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: fullWidth ? '100%' : '240px',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      opacity: disabled ? 0.5 : 1,
      ...style,
    };

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '40px',
      padding: `0 ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${isOpen ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      color: selectedOption ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'subtle'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.2s',
    };

    const dropdownStyle: React.CSSProperties = {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      width: '100%',
      maxHeight: '200px',
      overflowY: 'auto',
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      boxShadow: cssVar('shadow', 'md'),
      zIndex: cssVar('zIndex', 'dropdown'),
      display: isOpen ? 'block' : 'none',
      padding: `${cssVar('spacing', '4')} 0`,
    };

    const optionStyle = (isSelected: boolean): React.CSSProperties => ({
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`,
      cursor: 'pointer',
      backgroundColor: isSelected ? cssVar('semantic', 'background', 'sunken') : 'transparent',
      color: cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    });

    return (
      <div ref={(node) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as any).current = node;
        }
      }} style={containerStyle} className={className} {...props}>
        <div style={triggerStyle} onClick={() => !disabled && setIsOpen(!isOpen)}>
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div style={dropdownStyle}>
          {options.map((opt) => (
            <div
              key={opt.value}
              style={optionStyle(opt.value === value)}
              onClick={() => {
                if (onChange) onChange(opt.value);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'sunken'))}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = opt.value === value ? cssVar('semantic', 'background', 'sunken') : 'transparent')}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
