import React from 'react';
import { cssVar } from '@centurio87/tokens';
import { Text } from './Text';

export interface StepItem {
  title: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  currentStep: number; // 0-indexed
  direction?: 'horizontal' | 'vertical';
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, direction = 'horizontal', style, ...props }, ref) => {
    
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      width: '100%',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          const stepColor = isCompleted || isActive ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'strong');
          const textColor = isActive ? cssVar('semantic', 'primary', 'base') : (isCompleted ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'muted'));

          const stepContainerStyle: React.CSSProperties = {
            display: 'flex',
            flexDirection: direction === 'horizontal' ? 'row' : 'column',
            alignItems: direction === 'horizontal' ? 'center' : 'flex-start',
            flex: isLast ? '0 0 auto' : '1 1 auto',
            position: 'relative',
          };

          const circleStyle: React.CSSProperties = {
            width: '28px',
            height: '28px',
            borderRadius: cssVar('radius', 'full'),
            backgroundColor: isCompleted ? cssVar('semantic', 'primary', 'base') : (isActive ? 'transparent' : 'transparent'),
            border: `2px solid ${stepColor}`,
            color: isCompleted ? cssVar('semantic', 'primary', 'foreground') : stepColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
            fontWeight: 'bold',
            flexShrink: 0,
            zIndex: 1,
          };

          const lineStyle: React.CSSProperties = {
            flex: '1 1 auto',
            backgroundColor: isCompleted ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'border', 'muted'),
            ...(direction === 'horizontal' 
              ? { height: '2px', marginLeft: cssVar('spacing', '8'), marginRight: cssVar('spacing', '8') }
              : { width: '2px', height: '40px', marginTop: cssVar('spacing', '4'), marginBottom: cssVar('spacing', '4'), marginLeft: '13px' }
            )
          };

          const contentStyle: React.CSSProperties = {
            ...(direction === 'horizontal'
              ? { position: 'absolute', top: '36px', left: '14px', transform: 'translateX(-50%)', textAlign: 'center', width: 'max-content' }
              : { position: 'absolute', left: '44px', top: '0' }
            )
          };

          return (
            <div key={index} style={stepContainerStyle}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={circleStyle}>
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {!isLast && direction === 'horizontal' && <div style={lineStyle} />}
              </div>
              
              <div style={contentStyle}>
                <Text variant="meta" style={{ fontWeight: isActive ? 'bold' : 'normal', color: textColor }}>
                  {step.title}
                </Text>
                {step.description && direction === 'vertical' && (
                  <Text variant="meta" color="muted" style={{ display: 'block', marginTop: '4px' }}>
                    {step.description}
                  </Text>
                )}
              </div>

              {!isLast && direction === 'vertical' && <div style={lineStyle} />}
            </div>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = 'Stepper';
