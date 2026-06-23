import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from './Text';

// --- Timeline ---
export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({ children, style, ...props }, ref) => {
    const timelineStyle: React.CSSProperties = {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      ...style,
    };

    return (
      <ul ref={ref} style={timelineStyle} {...props}>
        {children}
      </ul>
    );
  }
);
Timeline.displayName = 'Timeline';

// --- TimelineItem ---
export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  title?: React.ReactNode;
  time?: string;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
  isLast?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ title, time, color = 'neutral', isLast = false, children, style, ...props }, ref) => {
    
    const dotColor = color === 'neutral' 
      ? cssVar('semantic', 'border', 'strong') 
      : cssVar('semantic', color, 'base');

    const itemStyle: React.CSSProperties = {
      position: 'relative',
      paddingLeft: cssVar('spacing', '32'),
      paddingBottom: isLast ? 0 : cssVar('spacing', '24'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const tailStyle: React.CSSProperties = {
      position: 'absolute',
      left: '7px', // center of 14px dot
      top: '14px',
      bottom: 0,
      width: '2px',
      backgroundColor: cssVar('semantic', 'border', 'muted'),
      display: isLast ? 'none' : 'block',
    };

    const dotStyle: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: '4px', // slightly offset to align with first line of text
      width: '12px',
      height: '12px',
      borderRadius: cssVar('radius', 'full'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      border: `2px solid ${dotColor}`,
      zIndex: 1,
    };

    return (
      <li ref={ref} style={itemStyle} {...props}>
        <div style={tailStyle} />
        <div style={dotStyle} />
        
        {(title || time) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: cssVar('spacing', '4') }}>
            {title && (
              <Text variant="body" style={{ fontWeight: 'bold' }}>
                {title}
              </Text>
            )}
            {time && (
              <Text variant="meta" color="muted">
                {time}
              </Text>
            )}
          </div>
        )}
        
        <div style={{ color: cssVar('semantic', 'foreground', 'muted'), fontSize: cssVar('typography', 'scale', 'body', 'fontSize') }}>
          {children}
        </div>
      </li>
    );
  }
);
TimelineItem.displayName = 'TimelineItem';

export const TimelineComponent = Object.assign(Timeline, {
  Item: TimelineItem,
});
