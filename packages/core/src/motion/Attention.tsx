import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export type AttentionVariant = 'shake' | 'bounce';

export interface AttentionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: AttentionVariant;
  play?: boolean;
  delay?: string;
}

export const Attention = React.forwardRef<HTMLDivElement, AttentionProps>(
  ({ children, variant = 'shake', play = true, delay = '0ms', style, ...props }, ref) => {
    const preset = variant === 'bounce'
      ? cssVar('motion', 'preset', 'attentionBounce')
      : cssVar('motion', 'preset', 'attentionShake');

    return (
      <div
        ref={ref}
        data-bbangto-attention={variant}
        style={{
          display: 'inline-block',
          animation: play ? preset : undefined,
          animationDelay: delay,
          transformOrigin: 'center',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Attention.displayName = 'Attention';
