import React, { useState } from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Button } from './Button';
import { Popover } from './Popover';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Currently selected date */
  value?: Date;
  /** Callback fired when a day is selected */
  onChange?: (date: Date) => void;
  /** Trigger placeholder text (existing API — default preserved) */
  placeholder?: string;
  /** Accessible label rendered above the trigger */
  label?: string;
  /** When true the trigger is non-interactive and visually dimmed */
  disabled?: boolean;
  /** Validation error message rendered below the trigger */
  error?: string;
  /** Size of the trigger control */
  size?: DatePickerSize;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date',
      label,
      disabled = false,
      error,
      size = 'md',
      style,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(value ? value.getMonth() : new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(value ? value.getFullYear() : new Date().getFullYear());
    const [isOpen, setIsOpen] = useState(false);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(y => y - 1);
      } else {
        setCurrentMonth(m => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(y => y + 1);
      } else {
        setCurrentMonth(m => m + 1);
      }
    };

    const handleSelectDate = (day: number) => {
      const newDate = new Date(currentYear, currentMonth, day);
      onChange?.(newDate);
      setIsOpen(false);
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString();
    };

    // ── size tokens ────────────────────────────────────────────────
    const paddingY =
      size === 'sm' ? cssVar('spacing', '6') :
      size === 'lg' ? cssVar('spacing', '16') :
      cssVar('spacing', '10');
    const paddingX =
      size === 'sm' ? cssVar('spacing', '12') :
      size === 'lg' ? cssVar('spacing', '24') :
      cssVar('spacing', '16');
    const fontSize =
      size === 'sm' ? cssVar('typography', 'scale', 'meta', 'fontSize') :
      size === 'lg' ? cssVar('typography', 'scale', 'h3', 'fontSize') :
      cssVar('typography', 'scale', 'body', 'fontSize');

    // ── border color based on state ────────────────────────────────
    const borderColor =
      error    ? cssVar('semantic', 'error', 'base') :
      disabled ? cssVar('semantic', 'disabled', 'border') :
                 cssVar('semantic', 'border', 'base');

    const calendarContent = (
      <div style={{ padding: cssVar('spacing', '16'), width: '280px', fontFamily: cssVar('typography', 'fontFamily', 'sans') }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: cssVar('spacing', '16') }}>
          <Button variant="ghost" size="sm" onClick={handlePrevMonth} aria-label="Previous month">&lt;</Button>
          <div style={{ fontWeight: 'bold', fontSize: cssVar('typography', 'scale', 'body', 'fontSize') }}>
            {new Date(currentYear, currentMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </div>
          <Button variant="ghost" size="sm" onClick={handleNextMonth} aria-label="Next month">&gt;</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: cssVar('spacing', '4'), textAlign: 'center', marginBottom: cssVar('spacing', '8') }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} style={{ fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'), color: cssVar('semantic', 'foreground', 'muted'), fontWeight: 'bold' }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: cssVar('spacing', '4') }}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = value && value.getDate() === day && value.getMonth() === currentMonth && value.getFullYear() === currentYear;
            const isToday = today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;

            return (
              <button
                key={day}
                onClick={() => handleSelectDate(day)}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  backgroundColor: isSelected ? cssVar('semantic', 'primary', 'base') : 'transparent',
                  color: isSelected ? cssVar('semantic', 'primary', 'foreground') : (isToday ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'base')),
                  borderRadius: cssVar('radius', 'full'),
                  fontWeight: isSelected || isToday ? 'bold' : 'normal',
                  cursor: 'pointer',
                  fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );

    const inputTriggerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${paddingY} ${paddingX}`,
      border: `1px solid ${borderColor}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: disabled ? cssVar('semantic', 'disabled', 'background') : cssVar('semantic', 'background', 'base'),
      color: disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : value
          ? cssVar('semantic', 'foreground', 'base')
          : cssVar('semantic', 'foreground', 'muted'),
      fontSize,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%',
      minWidth: '200px',
      opacity: disabled ? '0.6' : '1',
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      marginBottom: cssVar('spacing', '6'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      color: disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    const errorStyle: React.CSSProperties = {
      display: 'block',
      marginTop: cssVar('spacing', '4'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: cssVar('semantic', 'error', 'base'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    };

    const handleOpenChange = (open: boolean) => {
      if (!disabled) setIsOpen(open);
    };

    const handleTriggerClick = () => {
      if (!disabled) setIsOpen(prev => !prev);
    };

    return (
      <div style={{ display: 'inline-block', width: '100%', minWidth: '200px' }}>
        {label && (
          <label style={labelStyle}>
            {label}
          </label>
        )}
        <Popover
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          content={calendarContent}
          position="bottom"
          ref={ref}
          {...props as any}
        >
          <div
            data-datepicker-trigger
            style={inputTriggerStyle}
            tabIndex={disabled ? -1 : 0}
            onClick={handleTriggerClick}
            aria-disabled={disabled || undefined}
          >
            {value ? formatDate(value) : placeholder}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: cssVar('spacing', '8'), color: disabled ? cssVar('semantic', 'disabled', 'foreground') : cssVar('semantic', 'foreground', 'muted') }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </Popover>
        {error && (
          <span role="alert" style={errorStyle}>
            {error}
          </span>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';
