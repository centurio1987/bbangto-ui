import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { Spinner } from '../motion/Spinner';

export type SearchfieldSize = 'sm' | 'md' | 'lg';

export interface SearchfieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onSearch?: (value: string) => void;
  fullWidth?: boolean;
  /** Visual size of the search field. Defaults to `md`. */
  size?: SearchfieldSize;
  /** Shows a spinner and disables input while a search is in progress. */
  loading?: boolean;
  /** Marks the field as invalid (error border). */
  error?: boolean;
  /**
   * When `true`, a clear (×) button appears whenever the field has a value.
   * Works with both controlled (`value`) and uncontrolled (`defaultValue`) modes.
   */
  clearable?: boolean;
}

// Height via spacing tokens (var(--bbangto-spacing-{n})).
const HEIGHT: Record<SearchfieldSize, string> = {
  sm: cssVar('spacing', '32'),
  md: cssVar('spacing', '40'),
  lg: cssVar('spacing', '48'),
};

const ICON_SIZE: Record<SearchfieldSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

const FONT_SCALE: Record<SearchfieldSize, [string, string, string]> = {
  sm: ['typography', 'scale', 'meta'],
  md: ['typography', 'scale', 'body'],
  lg: ['typography', 'scale', 'body'],
};

export const Searchfield = React.forwardRef<HTMLInputElement, SearchfieldProps>(
  (
    {
      onSearch,
      fullWidth = false,
      size = 'md',
      loading = false,
      error = false,
      clearable = false,
      style,
      className,
      value,
      defaultValue,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    // Internal value state for clearable (uncontrolled) mode.
    // When `value` is provided externally (controlled), defer to that.
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof defaultValue === 'string' ? defaultValue : ''
    );

    const currentValue = isControlled ? String(value ?? '') : internalValue;
    const showClearBtn = clearable && !loading && currentValue.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) onChange(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('');
      }
      // Dispatch a synthetic change event so consumers can react.
      if (onChange) {
        const nativeInput = (ref as React.RefObject<HTMLInputElement> | null)?.current;
        if (nativeInput) {
          // Create a synthetic event with an empty target value.
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value'
          )?.set;
          nativeInputValueSetter?.call(nativeInput, '');
          nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      if (onSearch) onSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      if (onKeyDown) onKeyDown(e);
    };

    const iconSize = ICON_SIZE[size];
    const fontScalePath = FONT_SCALE[size];

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : '240px',
      height: HEIGHT[size],
      padding: `0 ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
      border: `1px solid ${error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      transition: `border-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      opacity: loading ? 0.7 : 1,
      ...style,
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      color: cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar(...fontScalePath, 'fontSize'),
      height: '100%',
      minWidth: 0,
    };

    const clearBtnStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: 'none',
      border: 'none',
      padding: `0 ${cssVar('spacing', '4')}`,
      cursor: 'pointer',
      color: cssVar('semantic', 'foreground', 'muted'),
      lineHeight: 1,
    };

    return (
      <div
        style={containerStyle}
        className={className}
        data-bbangto-size={size}
        data-bbangto-error={error ? 'true' : undefined}
      >
        {loading ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: cssVar('spacing', '8'), flexShrink: 0 }}>
            <Spinner size={iconSize} color={cssVar('semantic', 'foreground', 'muted')} />
          </span>
        ) : (
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={error ? cssVar('semantic', 'error', 'base') : cssVar('semantic', 'foreground', 'muted')}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: cssVar('spacing', '8'), flexShrink: 0 }}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        )}
        <input
          ref={ref}
          type="search"
          style={inputStyle}
          placeholder="Search..."
          value={isControlled ? value : internalValue}
          disabled={loading || props.disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {showClearBtn && (
          <button
            type="button"
            aria-label="Clear search"
            style={clearBtnStyle}
            onClick={handleClear}
            tabIndex={0}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Searchfield.displayName = 'Searchfield';
