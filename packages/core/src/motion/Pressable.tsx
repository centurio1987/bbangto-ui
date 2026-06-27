import React, { useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export interface PressableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  lift?: string;
  pressScale?: number;
  disabled?: boolean;
}

export const Pressable = React.forwardRef<HTMLDivElement, PressableProps>(
  (
    {
      children,
      lift,
      pressScale = 0.98,
      disabled = false,
      style,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const liftDistance = lift ?? cssVar('motion', 'distance', 'sm');
    const transform = disabled
      ? undefined
      : pressed
        ? `translate3d(0, 0, 0) scale(${pressScale})`
        : hovered
          ? `translate3d(0, calc(-1 * ${liftDistance}), 0) scale(1)`
          : 'translate3d(0, 0, 0) scale(1)';

    return (
      <div
        ref={ref}
        data-bbangto-pressable
        data-bbangto-pressed={pressed ? 'true' : undefined}
        style={{
          display: 'inline-block',
          transform,
          transition: `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
          willChange: disabled ? undefined : 'transform',
          cursor: disabled ? 'not-allowed' : style?.cursor,
          ...style,
        }}
        onMouseEnter={(event) => {
          if (!disabled) setHovered(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setHovered(false);
          setPressed(false);
          onMouseLeave?.(event);
        }}
        onPointerDown={(event) => {
          if (!disabled) setPressed(true);
          onPointerDown?.(event);
        }}
        onPointerUp={(event) => {
          setPressed(false);
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          setPressed(false);
          onPointerCancel?.(event);
        }}
        onBlur={(event) => {
          setPressed(false);
          onBlur?.(event);
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Pressable.displayName = 'Pressable';
