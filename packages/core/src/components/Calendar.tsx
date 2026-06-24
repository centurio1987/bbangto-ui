import React, { useState, useCallback } from 'react';
import { cssVar } from '@centurio1987/tokens';

// ── helpers ──────────────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function clampDate(date: Date, min?: Date, max?: Date): Date {
  if (min && date < min) return new Date(min);
  if (max && date > max) return new Date(max);
  return date;
}

function isDateDisabled(date: Date, min?: Date, max?: Date): boolean {
  if (min) {
    const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (date < minDay) return true;
  }
  if (max) {
    const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (date > maxDay) return true;
  }
  return false;
}

// ── types ─────────────────────────────────────────────────────────────────────

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled selected date */
  value?: Date;
  /** Initial selected date for uncontrolled mode */
  defaultValue?: Date;
  /** Fires when a date is selected */
  onValueChange?: (date: Date) => void;
  /** Earliest selectable date */
  min?: Date;
  /** Latest selectable date */
  max?: Date;
  /** Disables all interaction */
  disabled?: boolean;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

// ── component ─────────────────────────────────────────────────────────────────

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      min,
      max,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    // controlled vs uncontrolled selection
    const isControlled = value !== undefined;
    const [internalSelected, setInternalSelected] = useState<Date | undefined>(defaultValue);
    const selected = isControlled ? value : internalSelected;

    // viewport month/year — seed from selected value or default to the first
    // available month in [min, max] range, never calling Date.now() implicitly
    const seedDate = selected ?? defaultValue;
    const [viewYear, setViewYear] = useState<number>(
      seedDate ? seedDate.getFullYear() : (min ? min.getFullYear() : 2025)
    );
    const [viewMonth, setViewMonth] = useState<number>(
      seedDate ? seedDate.getMonth() : (min ? min.getMonth() : 0)
    );

    // focused day for keyboard navigation (1-indexed within viewYear/viewMonth)
    const [focusedDay, setFocusedDay] = useState<number | null>(null);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

    // month label
    const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    const handlePrevMonth = () => {
      if (disabled) return;
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
      setFocusedDay(null);
    };

    const handleNextMonth = () => {
      if (disabled) return;
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
      setFocusedDay(null);
    };

    const handleSelectDay = useCallback(
      (day: number) => {
        if (disabled) return;
        const candidate = new Date(viewYear, viewMonth, day);
        if (isDateDisabled(candidate, min, max)) return;
        const clamped = clampDate(candidate, min, max);
        if (!isControlled) {
          setInternalSelected(clamped);
        }
        onValueChange?.(clamped);
      },
      [disabled, viewYear, viewMonth, min, max, isControlled, onValueChange]
    );

    // keyboard navigation within the grid
    const handleDayKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>, day: number) => {
        let next: number | null = null;
        if (e.key === 'ArrowRight') {
          next = day < daysInMonth ? day + 1 : null;
        } else if (e.key === 'ArrowLeft') {
          next = day > 1 ? day - 1 : null;
        } else if (e.key === 'ArrowDown') {
          next = day + 7 <= daysInMonth ? day + 7 : null;
        } else if (e.key === 'ArrowUp') {
          next = day - 7 >= 1 ? day - 7 : null;
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelectDay(day);
          return;
        }
        if (next !== null) {
          e.preventDefault();
          setFocusedDay(next);
        }
      },
      [daysInMonth, handleSelectDay]
    );

    // ── styles ────────────────────────────────────────────────────────────────

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '8'),
      padding: cssVar('spacing', '16'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      width: '288px',
      boxSizing: 'border-box',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const monthLabelStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'label', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'base'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
    };

    const navButtonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      border: 'none',
      backgroundColor: 'transparent',
      borderRadius: cssVar('radius', 'sm'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'muted'),
      transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      padding: '0',
    };

    const weekdayRowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: cssVar('spacing', '2'),
    };

    const weekdayCellStyle: React.CSSProperties = {
      textAlign: 'center',
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'label', 'fontWeight'),
      color: cssVar('semantic', 'foreground', 'muted'),
      lineHeight: '32px',
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: cssVar('spacing', '2'),
    };

    const getDayCellStyle = (
      _day: number,
      isSelected: boolean,
      isOutOfRange: boolean
    ): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      border: 'none',
      borderRadius: cssVar('radius', 'full'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: isSelected
        ? cssVar('typography', 'scale', 'label', 'fontWeight')
        : 'normal',
      cursor: isOutOfRange || disabled ? 'not-allowed' : 'pointer',
      backgroundColor: isSelected
        ? cssVar('semantic', 'primary', 'base')
        : 'transparent',
      color: isSelected
        ? cssVar('semantic', 'primary', 'foreground')
        : isOutOfRange || disabled
        ? cssVar('semantic', 'disabled', 'foreground')
        : cssVar('semantic', 'foreground', 'base'),
      opacity: isOutOfRange || disabled ? 0.5 : 1,
      transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      outline: 'none',
      boxSizing: 'border-box',
    });

    // ── render ────────────────────────────────────────────────────────────────

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {/* Header */}
        <div style={headerStyle}>
          <button
            type="button"
            style={navButtonStyle}
            aria-label="이전 달"
            disabled={disabled}
            onClick={handlePrevMonth}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={monthLabelStyle} aria-live="polite" aria-atomic="true">
            {monthLabel}
          </span>
          <button
            type="button"
            style={navButtonStyle}
            aria-label="다음 달"
            disabled={disabled}
            onClick={handleNextMonth}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Weekday header row */}
        <div style={weekdayRowStyle} aria-hidden="true">
          {WEEKDAYS.map((wd) => (
            <div key={wd} style={weekdayCellStyle}>
              {wd}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div
          role="grid"
          aria-label={monthLabel}
          style={gridStyle}
        >
          {/* Leading empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div
              key={`empty-${i}`}
              role="gridcell"
              aria-hidden="true"
              style={{ width: '36px', height: '36px' }}
            />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const cellDate = new Date(viewYear, viewMonth, day);
            const isSelected = selected ? isSameDay(cellDate, selected) : false;
            const isOutOfRange = isDateDisabled(cellDate, min, max);

            return (
              <div key={day} role="gridcell">
                <button
                  type="button"
                  aria-selected={isSelected}
                  aria-disabled={isOutOfRange || disabled || undefined}
                  tabIndex={
                    focusedDay !== null
                      ? focusedDay === day ? 0 : -1
                      : isSelected ? 0 : day === 1 ? 0 : -1
                  }
                  disabled={isOutOfRange || disabled}
                  style={getDayCellStyle(day, isSelected, isOutOfRange)}
                  onClick={() => handleSelectDay(day)}
                  onKeyDown={(e) => handleDayKeyDown(e, day)}
                  onFocus={() => setFocusedDay(day)}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
