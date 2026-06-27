import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'meta';

export type TextColor = 'base' | 'muted' | 'subtle' | 'inverse' | 'primary' | 'error' | 'success' | 'warning';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The typography variant to use. Defaults to 'body'. */
  variant?: TextVariant;
  /** The semantic color of the text. Defaults to 'base'. */
  color?: TextColor;
  /** The HTML element to render as. Defaults to a sensible tag based on the variant. */
  as?: React.ElementType;
  children?: React.ReactNode;
}

const defaultTags: Record<TextVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  meta: 'span',
};

export function Text({
  variant = 'body',
  color = 'base',
  as,
  children,
  style,
  ...props
}: TextProps) {
  const Component = as || defaultTags[variant] || 'span';

  const isSemanticForeground = ['base', 'muted', 'subtle', 'inverse'].includes(color);
  const colorVar = isSemanticForeground
    ? cssVar('semantic', 'foreground', color)
    : cssVar('semantic', color, 'base');

  const baseStyles: React.CSSProperties = {
    margin: 0,
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    fontSize: cssVar('typography', 'scale', variant, 'fontSize'),
    fontWeight: cssVar('typography', 'scale', variant, 'fontWeight'),
    lineHeight: cssVar('typography', 'scale', variant, 'lineHeight'),
    letterSpacing: cssVar('typography', 'scale', variant, 'letterSpacing'),
    color: colorVar,
    ...style,
  };

  return (
    <Component style={baseStyles} {...props}>
      {children}
    </Component>
  );
}
