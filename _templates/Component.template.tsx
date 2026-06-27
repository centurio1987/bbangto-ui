// 템플릿: 신규 컴포넌트 (atom / molecule / block)
// 사용법: __Name__ 을 컴포넌트명으로 치환해 packages/core/src/components/<Name>.tsx
//        (block이면 packages/core/src/blocks/<Name>.tsx) 로 복사한다.
// 규칙(QUALITY_CHECKLIST.md A): forwardRef + displayName + ...props + ref,
//      토큰은 cssVar()로만(하드코딩 금지), document/window 직접접근 금지, any 금지.
import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type __Name__Variant = 'solid' | 'outline';
export type __Name__Size = 'sm' | 'md' | 'lg';

export interface __Name__Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: __Name__Variant;
  size?: __Name__Size;
}

export const __Name__ = React.forwardRef<HTMLDivElement, __Name__Props>(
  ({ variant = 'solid', size = 'md', children, style, ...props }, ref) => {
    const paddingY =
      size === 'sm' ? cssVar('spacing', '6') : size === 'lg' ? cssVar('spacing', '16') : cssVar('spacing', '10');

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '6'),
      padding: `${paddingY} ${cssVar('spacing', '16')}`,
      backgroundColor: variant === 'solid' ? cssVar('semantic', 'primary', 'base') : 'transparent',
      color: variant === 'solid' ? cssVar('semantic', 'primary', 'foreground') : cssVar('semantic', 'foreground', 'base'),
      border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
      borderRadius: cssVar('radius', 'md'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      transition: `all ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      ...style,
    };

    return (
      <div ref={ref} style={baseStyles} {...props}>
        {children}
      </div>
    );
  }
);

__Name__.displayName = '__Name__';
