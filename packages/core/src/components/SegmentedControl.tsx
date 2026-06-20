import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  segments: string[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
  fullWidth?: boolean;
}

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ segments, selectedIndex = 0, onChange, fullWidth = false, style, className, ...props }, ref) => {
    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      padding: '2px',
      borderRadius: cssVar('radius', 'md'),
      width: fullWidth ? '100%' : 'auto',
      ...style,
    };

    const segmentStyle = (isSelected: boolean): React.CSSProperties => ({
      flex: fullWidth ? 1 : 'none',
      padding: `${cssVar('spacing', '4')} ${cssVar('spacing', '16')}`,
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: isSelected ? cssVar('semantic', 'background', 'elevated') : 'transparent',
      color: isSelected ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'subtle'),
      borderRadius: cssVar('radius', 'sm'),
      boxShadow: isSelected ? cssVar('shadow', 'sm') : 'none',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: isSelected ? 'bold' : 'normal',
      transition: 'all 0.2s',
    });

    return (
      <div ref={ref} style={containerStyle} className={className} {...props}>
        {segments.map((segment, index) => (
          <div
            key={segment}
            style={segmentStyle(index === selectedIndex)}
            onClick={() => onChange?.(index)}
          >
            {segment}
          </div>
        ))}
      </div>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
