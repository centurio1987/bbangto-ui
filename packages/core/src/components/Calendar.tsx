import React, { useState, useCallback } from 'react';
import { cssVar, breakpoints } from '@centurio1987/bbangto-ui-tokens';

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

export type CalendarLayout =
  | 'month'
  | 'compact'
  | 'dual'
  | 'week'
  | 'fullscreen'
  | 'scheduler-split';

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
  /**
   * Display layout. DISPLAY-ONLY — does not change selection/navigation behavior.
   * - `month` (default): standard 7x6 grid.
   * - `compact`: same grid, denser typography + cell sizing.
   * - `dual`: current month grid plus the next month grid side by side.
   * - `week`: only the single week row containing the selected/current date.
   * - `fullscreen`: full-bleed viewport surface with no card chrome; enlarged
   *   day cells become content containers that host stacked event entries, with
   *   a top toolbar track carrying the prev/next month navigation.
   * - `scheduler-split`: bordered card wrapping a 2-track grid — the month
   *   calendar column beside an adjacent vertical time-slot list column.
   */
  layout?: CalendarLayout;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

/** Static time-slot rows rendered alongside the calendar in `scheduler-split`. */
const TIME_SLOTS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
] as const;

/** Unique class prefix to scope responsive @media rules without a CSS Module. */
const CALENDAR_ID = 'bbangto-calendar';

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
      layout = 'month',
      style,
      ...props
    },
    ref
  ) => {
    const isCompact = layout === 'compact';
    const isFullscreen = layout === 'fullscreen';
    const isSchedulerSplit = layout === 'scheduler-split';
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

    // secondary (next) month — only rendered in the `dual` layout
    const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const nextMonthMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextMonthLabel = new Date(nextMonthYear, nextMonthMonth, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    // anchor day for the `week` layout — the day whose week row is shown. Use the
    // selected date when it falls inside the viewed month, otherwise day 1.
    const weekAnchorDay =
      selected &&
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth
        ? selected.getDate()
        : 1;
    // first day-of-grid index (Sun=0) of the anchor's week, within the month
    const anchorGridIndex = firstDay + (weekAnchorDay - 1);
    const weekStartGridIndex = anchorGridIndex - (anchorGridIndex % 7);

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

    // generic selection for arbitrary year/month (used by the secondary grid
    // in the `dual` layout). Mirrors handleSelectDay's logic exactly so the
    // existing primary-month handler stays byte-for-byte unchanged.
    const handleSelectDateAt = useCallback(
      (year: number, month: number, day: number) => {
        if (disabled) return;
        const candidate = new Date(year, month, day);
        if (isDateDisabled(candidate, min, max)) return;
        const clamped = clampDate(candidate, min, max);
        if (!isControlled) {
          setInternalSelected(clamped);
        }
        onValueChange?.(clamped);
      },
      [disabled, min, max, isControlled, onValueChange]
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
      gap: isCompact ? cssVar('spacing', '4') : cssVar('spacing', '8'),
      padding: isCompact ? cssVar('spacing', '8') : cssVar('spacing', '16'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'lg'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      width: layout === 'dual' ? 'auto' : isCompact ? '232px' : '288px',
      boxSizing: 'border-box',
      // Fullscreen: full-bleed viewport surface, stripped of card chrome
      // (no border, no rounded corners, no elevation).
      ...(isFullscreen
        ? {
            display: 'flex',
            width: '100vw',
            height: '100vh',
            padding: cssVar('spacing', '0'),
            gap: cssVar('spacing', '0'),
            border: 'none',
            borderRadius: cssVar('radius', 'none'),
            boxShadow: cssVar('shadow', 'none'),
          }
        : null),
      // Scheduler-split: keep the bordered card chrome but let the body host a
      // 2-track grid (calendar | time-slots), so the root sizes to its content.
      ...(isSchedulerSplit
        ? {
            display: 'flex',
            width: 'auto',
          }
        : null),
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      // Fullscreen: the header becomes a toolbar track spanning the top edge,
      // separated from the grid by a divider on an elevated surface.
      ...(isFullscreen
        ? {
            padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '24')}`,
            backgroundColor: cssVar('semantic', 'background', 'elevated'),
            borderBottom: `1px solid ${cssVar('semantic', 'border', 'base')}`,
          }
        : null),
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
      lineHeight: isCompact ? '24px' : '32px',
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: cssVar('spacing', '2'),
      // Fullscreen: the grid flex-grows to fill the viewport, with tall auto rows
      // so each day cell can host a stacked stack of event entries.
      ...(isFullscreen
        ? {
            flex: 1,
            minHeight: 0,
            gap: cssVar('spacing', '6'),
            gridAutoRows: 'minmax(96px, 1fr)',
          }
        : null),
    };

    const cellSize = isCompact ? '28px' : '36px';

    const getDayCellStyle = (
      _day: number,
      isSelected: boolean,
      isOutOfRange: boolean
    ): React.CSSProperties => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: cellSize,
      height: cellSize,
      border: 'none',
      borderRadius: cssVar('radius', 'full'),
      fontSize: isCompact
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize'),
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
      // Fullscreen: each day cell becomes an enlarged, top-anchored content
      // container (vertical stack) rather than a centred pill.
      ...(isFullscreen
        ? {
            width: '100%',
            height: 'auto',
            minHeight: '96px',
            flexDirection: 'column' as const,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            borderRadius: cssVar('radius', 'sm'),
            border: `1px solid ${
              isSelected
                ? cssVar('semantic', 'primary', 'base')
                : cssVar('semantic', 'border', 'muted')
            }`,
            padding: cssVar('spacing', '6'),
            gap: cssVar('spacing', '4'),
            backgroundColor: isSelected
              ? cssVar('semantic', 'primary', 'subtle')
              : cssVar('semantic', 'background', 'elevated'),
            color: isOutOfRange || disabled
              ? cssVar('semantic', 'disabled', 'foreground')
              : cssVar('semantic', 'foreground', 'base'),
          }
        : null),
    });

    // Fullscreen day-cell sub-slots: the date number sits at the top of the cell,
    // above a flex-column region that hosts stacked event entries.
    const dayNumberStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'label', 'fontWeight'),
      textAlign: 'left',
    };

    const eventSlotStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '2'),
      flex: 1,
      minHeight: 0,
    };

    // Scheduler-split: the vertical time-slot list rendered beside the calendar.
    const timeSlotColumnStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '8'),
      borderLeft: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      paddingLeft: cssVar('spacing', '16'),
    };

    const timeSlotHeadingStyle: React.CSSProperties = {
      ...monthLabelStyle,
    };

    const timeSlotListStyle: React.CSSProperties = {
      listStyle: 'none',
      margin: cssVar('spacing', '0'),
      padding: cssVar('spacing', '0'),
      display: 'flex',
      flexDirection: 'column',
    };

    const timeSlotItemStyle: React.CSSProperties = {
      padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '4')}`,
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    };

    // Body wrapper: `dual` keeps a horizontal flex; `scheduler-split` becomes a
    // scoped responsive grid; `fullscreen` flex-grows to fill the viewport; all
    // other layouts fall through to `display: contents` (unchanged behaviour).
    const bodyWrapperStyle: React.CSSProperties =
      layout === 'dual'
        ? {
            display: 'flex',
            flexDirection: 'row',
            gap: cssVar('spacing', '16'),
            alignItems: 'flex-start',
          }
        : isSchedulerSplit
        ? {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: cssVar('spacing', '16'),
            alignItems: 'flex-start',
          }
        : isFullscreen
        ? {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
          }
        : { display: 'contents' };

    // Primary month column — flex-grows in fullscreen and gains horizontal
    // padding (the root drops its own padding in that layout).
    const primaryColumnStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: isCompact ? cssVar('spacing', '4') : cssVar('spacing', '8'),
      ...(isFullscreen
        ? {
            flex: 1,
            minHeight: 0,
            padding: `0 ${cssVar('spacing', '24')} ${cssVar('spacing', '24')}`,
          }
        : null),
    };

    // ── render ────────────────────────────────────────────────────────────────

    return (
      <div ref={ref} data-bbangto-calendar-layout={layout} style={containerStyle} {...props}>
        {/*
          Scoped responsive style for scheduler-split: on desktop (≥ lg) the
          body grid reflows from a single stacked column into two tracks
          (calendar | time-slots). Expressed via a <style> tag because @media
          cannot live in React's inline style prop.
        */}
        {isSchedulerSplit && (
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${CALENDAR_ID}-scheduler {
                grid-template-columns: 1fr 240px;
              }
            }
          `}</style>
        )}

        {/* Header — a top toolbar track in the fullscreen layout */}
        <div
          style={headerStyle}
          {...(isFullscreen ? { 'data-bbangto-calendar-toolbar': '' } : {})}
        >
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

        {/* Body — single month for month/compact/week/fullscreen, two months
            for dual, calendar + time-slot list for scheduler-split */}
        <div
          className={isSchedulerSplit ? `${CALENDAR_ID}-scheduler` : undefined}
          style={bodyWrapperStyle}
        >
          {/* Primary month column */}
          <div style={primaryColumnStyle}>
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
              {Array.from({ length: firstDay }).map((_, i) => {
                // in week layout, only render the empty cells inside the shown week
                if (layout === 'week' && (i < weekStartGridIndex || i >= weekStartGridIndex + 7)) {
                  return null;
                }
                return (
                  <div
                    key={`empty-${i}`}
                    role="gridcell"
                    aria-hidden="true"
                    style={
                      isFullscreen
                        ? { width: '100%', minHeight: '96px' }
                        : { width: cellSize, height: cellSize }
                    }
                  />
                );
              })}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                // in week layout, only render cells in the anchor's week row
                if (layout === 'week') {
                  const gridIndex = firstDay + i;
                  if (gridIndex < weekStartGridIndex || gridIndex >= weekStartGridIndex + 7) {
                    return null;
                  }
                }
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
                      {isFullscreen ? (
                        <>
                          <span style={dayNumberStyle}>{day}</span>
                          {/* Stacked event-entry host — a dedicated content slot
                              that day-scoped event chips would render into. */}
                          <span
                            data-bbangto-calendar-events
                            style={eventSlotStyle}
                            aria-hidden="true"
                          />
                        </>
                      ) : (
                        day
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary (next) month column — dual layout only */}
          {layout === 'dual' && (() => {
            const nDays = getDaysInMonth(nextMonthYear, nextMonthMonth);
            const nFirst = getFirstDayOfMonth(nextMonthYear, nextMonthMonth);
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: cssVar('spacing', '8') }}>
                <span style={{ ...monthLabelStyle, textAlign: 'center' }}>{nextMonthLabel}</span>
                <div style={weekdayRowStyle} aria-hidden="true">
                  {WEEKDAYS.map((wd) => (
                    <div key={wd} style={weekdayCellStyle}>
                      {wd}
                    </div>
                  ))}
                </div>
                <div role="grid" aria-label={nextMonthLabel} style={gridStyle}>
                  {Array.from({ length: nFirst }).map((_, i) => (
                    <div
                      key={`next-empty-${i}`}
                      role="gridcell"
                      aria-hidden="true"
                      style={{ width: cellSize, height: cellSize }}
                    />
                  ))}
                  {Array.from({ length: nDays }).map((_, i) => {
                    const day = i + 1;
                    const cellDate = new Date(nextMonthYear, nextMonthMonth, day);
                    const isSelected = selected ? isSameDay(cellDate, selected) : false;
                    const isOutOfRange = isDateDisabled(cellDate, min, max);
                    return (
                      <div key={`next-${day}`} role="gridcell">
                        <button
                          type="button"
                          aria-selected={isSelected}
                          aria-disabled={isOutOfRange || disabled || undefined}
                          tabIndex={-1}
                          disabled={isOutOfRange || disabled}
                          style={getDayCellStyle(day, isSelected, isOutOfRange)}
                          onClick={() => handleSelectDateAt(nextMonthYear, nextMonthMonth, day)}
                        >
                          {day}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Time-slot list column — scheduler-split layout only. A display-only
              vertical schedule track placed beside the month calendar. */}
          {isSchedulerSplit && (
            <div style={timeSlotColumnStyle}>
              <span style={timeSlotHeadingStyle}>Time slots</span>
              <ul role="list" aria-label="Time slots" style={timeSlotListStyle}>
                {TIME_SLOTS.map((slot) => (
                  <li key={slot} style={timeSlotItemStyle}>
                    {slot}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';
