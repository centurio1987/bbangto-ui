import React, { useEffect, useMemo, useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
}

const defaultFormatter = (value: number) => Math.round(value).toLocaleString();

export const CountUp = React.forwardRef<HTMLSpanElement, CountUpProps>(
  ({ from = 0, to, duration = 1000, formatter = defaultFormatter, style, ...props }, ref) => {
    const [value, setValue] = useState(from);
    const [announcedValue, setAnnouncedValue] = useState(formatter(from));

    useEffect(() => {
      if (duration <= 0 || typeof window === 'undefined') {
        setValue(to);
        setAnnouncedValue(formatter(to));
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setValue(to);
        setAnnouncedValue(formatter(to));
        return;
      }

      let frame = 0;
      const start = performance.now();
      const delta = to - from;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = from + delta * eased;
        setValue(next);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setValue(to);
          setAnnouncedValue(formatter(to));
        }
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, [duration, formatter, from, to]);

    const visualValue = useMemo(() => formatter(value), [formatter, value]);

    return (
      <span
        ref={ref}
        data-bbangto-count-up
        style={{
          fontVariantNumeric: 'tabular-nums',
          transition: `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
          ...style,
        }}
        {...props}
      >
        <span aria-hidden="true">{visualValue}</span>
        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {announcedValue}
        </span>
      </span>
    );
  },
);

CountUp.displayName = 'CountUp';
