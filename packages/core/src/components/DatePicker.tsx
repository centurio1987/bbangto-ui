import React, { useState } from 'react';
import { cssVar } from '@centurio87/tokens';
import { Button } from './Button';
import { Popover } from './Popover';

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder = 'Select date', style, ...props }, ref) => {
    
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
      padding: `${cssVar('spacing', '10')} ${cssVar('spacing', '16')}`,
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      color: value ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      cursor: 'pointer',
      width: '100%',
      minWidth: '200px',
      ...style,
    };

    return (
      <Popover 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        content={calendarContent} 
        position="bottom"
        ref={ref}
        {...props as any}
      >
        <div style={inputTriggerStyle} tabIndex={0}>
          {value ? formatDate(value) : placeholder}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: cssVar('spacing', '8'), color: cssVar('semantic', 'foreground', 'muted') }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </Popover>
    );
  }
);
DatePicker.displayName = 'DatePicker';
