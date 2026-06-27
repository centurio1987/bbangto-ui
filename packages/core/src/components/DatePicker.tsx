import React, { useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';
import { Button } from './Button';
import { Popover } from './Popover';

export type DatePickerSize = 'sm' | 'md' | 'lg';

/**
 * Visual / interaction family for the DatePicker.
 *
 * `default` is the historical popover-triggered input field and stays the head
 * of the union so every existing call site and story renders identically.
 *
 * - `default`: bordered input trigger that opens a month-grid calendar in a
 *   popover overlay (original behaviour).
 * - `inline-week-strip`: always-visible single horizontal week rail — no
 *   popover. A `auto 1fr auto` track lays out [prev-chevron | inline day-cell
 *   track | next-chevron]; the selected day is a solid-fill pill, the rest are
 *   ghost cells. The calendar is the control itself, never a triggered grid.
 * - `wheel`: a multi-column scroll-snap drum (day / month / year). Each column
 *   is its own vertical `overflow-y` scroll track of stacked items; a fixed
 *   centre selection band (border-y + subtle fill) is overlaid at the vertical
 *   centre and the track edges fade out via a mask gradient. No month grid, no
 *   popover.
 * - `ghost`: the `default` calendar behaviour, but the trigger drops its border
 *   box and fill — chrome is `none` instead of an outlined field. Only a
 *   trailing calendar icon-button remains and focus is expressed as a subtle
 *   ring (no offset) rather than a bordered box.
 */
export type DatePickerVariant = 'default' | 'inline-week-strip' | 'wheel' | 'ghost';

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
  /** Visual / interaction family. Defaults to the historical popover field. */
  variant?: DatePickerVariant;
}

/** Unique class prefix to scope namespaced styles without a CSS Module. */
const DP_ID = 'bbangto-date-picker';

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
      variant = 'default',
      style,
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(value ? value.getMonth() : new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(value ? value.getFullYear() : new Date().getFullYear());
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    // Week-rail anchor: the strip shows the Sun–Sat week containing this date.
    const [weekAnchor, setWeekAnchor] = useState<Date>(value ?? new Date());

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

    const sameDay = (a: Date | undefined, b: Date) =>
      !!a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    const selectExactDate = (date: Date) => {
      onChange?.(date);
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

    const isGhost = variant === 'ghost';

    // Ghost: no border box and no fill — chrome is `none`. Focus is expressed as
    // a subtle ring (no offset) via box-shadow instead of a bordered field box.
    const ghostRing =
      isFocused && !disabled ? `0 0 0 2px ${cssVar('semantic', 'border', 'focus')}` : 'none';

    const inputTriggerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${paddingY} ${paddingX}`,
      border: isGhost ? 'none' : `1px solid ${borderColor}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: isGhost
        ? 'transparent'
        : disabled
          ? cssVar('semantic', 'disabled', 'background')
          : cssVar('semantic', 'background', 'base'),
      boxShadow: isGhost ? ghostRing : undefined,
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
      outline: 'none',
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

    // ── inline-week-strip ──────────────────────────────────────────────
    // Always-visible single horizontal week rail (no popover/overlay). The root
    // rail uses a `auto 1fr auto` track: [prev-chevron | day-cell track | next].
    if (variant === 'inline-week-strip') {
      const anchor = weekAnchor;
      const startOfWeek = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay());
      const weekDays = Array.from({ length: 7 }, (_, i) =>
        new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i)
      );

      const shiftWeek = (delta: number) => {
        if (disabled) return;
        setWeekAnchor(new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() + delta * 7));
      };

      const selectedIndex = Math.max(0, weekDays.findIndex(d => sameDay(value, d)));

      const handleRailKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        const focusCell = (idx: number) => {
          const cell = e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="gridcell"]')[idx];
          cell?.focus();
        };
        const current = weekDays.findIndex(d => sameDay(value, d));
        const from = current < 0 ? selectedIndex : current;
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (from >= 6) { shiftWeek(1); } else { focusCell(from + 1); }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (from <= 0) { shiftWeek(-1); } else { focusCell(from - 1); }
        }
      };

      return (
        <div
          ref={ref}
          data-bbangto-date-picker-variant="inline-week-strip"
          className={`${DP_ID}-root`}
          style={{ display: 'inline-block', width: '100%', minWidth: '280px', fontFamily: cssVar('typography', 'fontFamily', 'sans'), ...style }}
          {...props}
        >
          {label && <label style={labelStyle}>{label}</label>}
          <div
            role="grid"
            aria-label={label ?? 'Week'}
            className={`${DP_ID}-rail`}
            onKeyDown={handleRailKeyDown}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: cssVar('spacing', '8'),
              padding: cssVar('spacing', '8'),
              border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
              borderRadius: cssVar('radius', 'lg'),
              backgroundColor: cssVar('semantic', 'background', 'base'),
            }}
          >
            <Button variant="ghost" size="sm" onClick={() => shiftWeek(-1)} aria-label="Previous week" disabled={disabled}>&lt;</Button>
            <div
              role="row"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: cssVar('spacing', '4'),
                minWidth: 0,
              }}
            >
              {weekDays.map((d, i) => {
                const isSelected = sameDay(value, d);
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelected}
                    tabIndex={i === selectedIndex ? 0 : -1}
                    disabled={disabled}
                    onClick={() => { selectExactDate(d); setWeekAnchor(d); }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: cssVar('spacing', '2'),
                      padding: `${cssVar('spacing', '6')} ${cssVar('spacing', '2')}`,
                      border: 'none',
                      borderRadius: cssVar('radius', 'full'),
                      // Selected = solid fill pill; unselected = ghost (transparent).
                      backgroundColor: isSelected ? cssVar('semantic', 'primary', 'base') : 'transparent',
                      color: isSelected ? cssVar('semantic', 'primary', 'foreground') : cssVar('semantic', 'foreground', 'base'),
                      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
                      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                      cursor: disabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span style={{ fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'), opacity: 0.8 }}>
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()]}
                    </span>
                    <span style={{ fontWeight: 'bold' }}>{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
            <Button variant="ghost" size="sm" onClick={() => shiftWeek(1)} aria-label="Next week" disabled={disabled}>&gt;</Button>
          </div>
          {error && <span role="alert" style={errorStyle}>{error}</span>}
        </div>
      );
    }

    // ── wheel ──────────────────────────────────────────────────────────
    // Multi-column scroll-snap drum (day / month / year). Each column is its own
    // vertical scroll track; a fixed centre band (border-y + subtle fill) is
    // overlaid at the vertical centre and the edges fade via a mask gradient.
    if (variant === 'wheel') {
      const ITEM_H = cssVar('spacing', '32');
      const TRACK_H = `calc(${ITEM_H} * 5)`;
      const selDay = value ? value.getDate() : today.getDate();
      const wheelDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      const wheelMonths = Array.from({ length: 12 }, (_, i) => i);
      const wheelYears = Array.from({ length: 12 }, (_, i) => currentYear - 6 + i);

      const trackStyle: React.CSSProperties = {
        position: 'relative',
        height: TRACK_H,
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
        padding: `calc(${ITEM_H} * 2) 0`,
      };

      const itemStyle = (selected: boolean): React.CSSProperties => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: ITEM_H,
        scrollSnapAlign: 'center',
        border: 'none',
        width: '100%',
        backgroundColor: 'transparent',
        color: selected ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'muted'),
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
        fontWeight: selected ? 'bold' : 'normal',
        cursor: disabled ? 'not-allowed' : 'pointer',
      });

      const renderColumn = (
        key: string,
        ariaLabel: string,
        items: number[],
        isSelected: (v: number) => boolean,
        renderLabel: (v: number) => React.ReactNode,
        onPick: (v: number) => void
      ) => (
        <div key={key} role="listbox" aria-label={ariaLabel} className={`${DP_ID}-wheel-track`} style={trackStyle}>
          {items.map(v => {
            const selected = isSelected(v);
            return (
              <button
                key={v}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={disabled}
                onClick={() => { if (!disabled) onPick(v); }}
                style={itemStyle(selected)}
              >
                {renderLabel(v)}
              </button>
            );
          })}
        </div>
      );

      return (
        <div
          ref={ref}
          data-bbangto-date-picker-variant="wheel"
          className={`${DP_ID}-root`}
          style={{ display: 'inline-block', width: '100%', minWidth: '280px', fontFamily: cssVar('typography', 'fontFamily', 'sans'), ...style }}
          {...props}
        >
          {/* Edge fade for the drum tracks — a mask gradient cannot be expressed
              inline per-element cleanly, so scope it via the namespaced class. */}
          <style>{`
            .${DP_ID}-wheel-track {
              -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%);
              mask-image: linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%);
              scrollbar-width: none;
            }
            .${DP_ID}-wheel-track::-webkit-scrollbar { display: none; }
          `}</style>
          {label && <label style={labelStyle}>{label}</label>}
          <div
            className={`${DP_ID}-wheel-drum`}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: cssVar('spacing', '4'),
              padding: cssVar('spacing', '8'),
              border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
              borderRadius: cssVar('radius', 'lg'),
              backgroundColor: cssVar('semantic', 'background', 'base'),
            }}
          >
            {renderColumn('day', 'Day', wheelDays, v => v === selDay,
              v => v, v => selectExactDate(new Date(currentYear, currentMonth, v)))}
            {renderColumn('month', 'Month', wheelMonths, v => v === currentMonth,
              v => new Date(2000, v, 1).toLocaleDateString(undefined, { month: 'short' }),
              v => { setCurrentMonth(v); selectExactDate(new Date(currentYear, v, Math.min(selDay, getDaysInMonth(currentYear, v)))); })}
            {renderColumn('year', 'Year', wheelYears, v => v === currentYear,
              v => v,
              v => { setCurrentYear(v); selectExactDate(new Date(v, currentMonth, Math.min(selDay, getDaysInMonth(v, currentMonth)))); })}
            {/* Fixed centre selection band — border-y + subtle fill highlight. */}
            <div
              aria-hidden="true"
              className={`${DP_ID}-wheel-band`}
              style={{
                position: 'absolute',
                left: cssVar('spacing', '8'),
                right: cssVar('spacing', '8'),
                top: '50%',
                height: ITEM_H,
                transform: 'translateY(-50%)',
                borderTop: `1px solid ${cssVar('semantic', 'border', 'strong')}`,
                borderBottom: `1px solid ${cssVar('semantic', 'border', 'strong')}`,
                backgroundColor: cssVar('semantic', 'primary', 'subtle'),
                pointerEvents: 'none',
              }}
            />
          </div>
          {error && <span role="alert" style={errorStyle}>{error}</span>}
        </div>
      );
    }

    const calendarIcon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: disabled ? cssVar('semantic', 'disabled', 'foreground') : cssVar('semantic', 'foreground', 'muted') }}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    );

    return (
      <div
        data-bbangto-date-picker-variant={variant}
        className={`${DP_ID}-root`}
        style={{ display: 'inline-block', width: '100%', minWidth: '200px' }}
      >
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
            onFocus={isGhost ? () => setIsFocused(true) : undefined}
            onBlur={isGhost ? () => setIsFocused(false) : undefined}
            aria-disabled={disabled || undefined}
          >
            {value ? formatDate(value) : placeholder}
            {isGhost ? (
              // Ghost: trailing calendar icon-button only (no field box chrome).
              <button
                type="button"
                aria-label="Open calendar"
                disabled={disabled}
                onClick={(e) => { e.stopPropagation(); handleTriggerClick(); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: cssVar('spacing', '8'),
                  padding: cssVar('spacing', '2'),
                  border: 'none',
                  background: 'transparent',
                  borderRadius: cssVar('radius', 'full'),
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {calendarIcon}
              </button>
            ) : (
              <span style={{ display: 'inline-flex', marginLeft: cssVar('spacing', '8') }}>
                {calendarIcon}
              </span>
            )}
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
