import React, { useState, useRef, useEffect } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { Spinner } from '../motion/Spinner';

export interface SelectOption {
  label: string;
  value: string;
  /** When true, the option is shown but cannot be selected. */
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export type SelectVariant = 'outline' | 'filled' | 'underline' | 'glass';

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Visual size of the trigger. Defaults to 'md'. */
  size?: SelectSize;
  /** Puts the select into an error state with a red border and aria-invalid. */
  error?: boolean;
  /** Shows a loading spinner inside the trigger and prevents opening the dropdown. */
  loading?: boolean;
  /** Visual treatment of the trigger. Defaults to 'outline'. */
  variant?: SelectVariant;
}

const SIZE_HEIGHT: Record<SelectSize, string> = {
  sm: '32px',
  md: '40px',
  lg: '48px',
};

const SIZE_FONT_KEY: Record<SelectSize, string> = {
  sm: 'meta',
  md: 'body',
  lg: 'body',
};

const SIZE_PADDING_KEY: Record<SelectSize, string> = {
  sm: '8',
  md: '12',
  lg: '16',
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select...',
      disabled,
      fullWidth = false,
      size = 'md',
      error = false,
      loading = false,
      variant = 'outline',
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const isInteractionDisabled = disabled || loading;

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

    const borderColor = error
      ? cssVar('semantic', 'error', 'base')
      : isOpen
        ? cssVar('semantic', 'primary', 'base')
        : cssVar('semantic', 'border', 'base');

    const paddingKey = SIZE_PADDING_KEY[size];
    const fontVariant = SIZE_FONT_KEY[size];

    const variantTrigger: React.CSSProperties =
      variant === 'filled'
        ? {
            backgroundColor: cssVar('semantic', 'background', 'sunken'),
            border: `1px solid ${error || isOpen ? borderColor : 'transparent'}`,
            borderRadius: cssVar('radius', 'md'),
          }
        : variant === 'underline'
          ? {
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${borderColor}`,
              borderRadius: '0',
            }
          : variant === 'glass'
            ? {
                // Frosted glass chrome: a translucent surface fill (never an
                // opaque token) sitting over a backdrop blur, framed by a subtle
                // translucent border. Solid fill / opaque outline / underline
                // cannot express this — the blur + alpha is the whole point.
                // Colors stay token-derived; alpha is composed via color-mix.
                backgroundColor: `color-mix(in srgb, ${cssVar('semantic', 'background', 'elevated')} 55%, transparent)`,
                backdropFilter: `blur(${cssVar('spacing', '12')})`,
                WebkitBackdropFilter: `blur(${cssVar('spacing', '12')})`,
                border: `1px solid ${
                  error || isOpen
                    ? borderColor
                    : `color-mix(in srgb, ${cssVar('semantic', 'border', 'base')} 45%, transparent)`
                }`,
                borderRadius: cssVar('radius', 'md'),
              }
            : {
                backgroundColor: cssVar('semantic', 'background', 'elevated'),
                border: `1px solid ${borderColor}`,
                borderRadius: cssVar('radius', 'md'),
              };

    const triggerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: SIZE_HEIGHT[size],
      padding: `0 ${cssVar('spacing', paddingKey)}`,
      color: selectedOption ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'subtle'),
      fontSize: cssVar('typography', 'scale', fontVariant, 'fontSize'),
      cursor: isInteractionDisabled ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.2s',
      ...variantTrigger,
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

    const optionStyle = (isSelected: boolean, isOptionDisabled: boolean): React.CSSProperties => ({
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`,
      cursor: isOptionDisabled ? 'not-allowed' : 'pointer',
      backgroundColor: isSelected ? cssVar('semantic', 'background', 'sunken') : 'transparent',
      color: isOptionDisabled
        ? cssVar('semantic', 'foreground', 'subtle')
        : cssVar('semantic', 'foreground', 'base'),
      fontSize: cssVar('typography', 'scale', fontVariant, 'fontSize'),
      opacity: isOptionDisabled ? 0.5 : 1,
    });

    const handleTriggerClick = () => {
      if (!isInteractionDisabled) {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        style={containerStyle}
        className={className}
        aria-invalid={error ? true : undefined}
        data-size={size}
        data-loading={loading || undefined}
        {...props}
      >
        <div
          style={triggerStyle}
          onClick={handleTriggerClick}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          data-bbangto-select-variant={variant}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          {loading ? (
            <Spinner size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16} color={cssVar('semantic', 'foreground', 'subtle')} />
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </div>
        <div style={dropdownStyle} role="listbox">
          {options.map((opt) => {
            const isOptionDisabled = opt.disabled === true;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                aria-disabled={isOptionDisabled || undefined}
                style={optionStyle(opt.value === value, isOptionDisabled)}
                onClick={() => {
                  if (isOptionDisabled) return;
                  if (onChange) onChange(opt.value);
                  setIsOpen(false);
                }}
                onMouseEnter={(e) => {
                  if (!isOptionDisabled) {
                    e.currentTarget.style.backgroundColor = cssVar('semantic', 'background', 'sunken');
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOptionDisabled) {
                    e.currentTarget.style.backgroundColor =
                      opt.value === value ? cssVar('semantic', 'background', 'sunken') : 'transparent';
                  }
                }}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
