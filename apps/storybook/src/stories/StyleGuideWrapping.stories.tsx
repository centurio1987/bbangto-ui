import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import React from 'react';
import {
  StyleGuideProvider,
  useWrapperComponent,
  useWrapperBlock,
  useWrapperPattern,
  type StyleGuide,
} from '@centurio1987/bbangto-ui-core';

/*
 * StyleGuide의 pattern/block wrapping 인터페이스(ORD-006 #1) 검증.
 * 원형 component/block/pattern을 style guide가 wrapping할 수 있고,
 * wrapper 미정의 시 fallback(원형)으로 resolve 되는지 play 함수로 확인한다.
 */

// 원형(archetype) fallback 컴포넌트들 — wrapper 미정의 시 사용되어야 한다.
const FallbackButton: React.FC = () => <button data-testid="button">archetype-button</button>;
const FallbackHero: React.FC = () => <div data-testid="hero">archetype-hero</div>;
const FallbackSignIn: React.FC = () => <div data-testid="signin">archetype-signin</div>;

// style guide가 제공하는 wrapping 버전들.
const WrappedButton: React.FC = () => <button data-testid="button">wrapped-button</button>;
const WrappedHero: React.FC = () => <div data-testid="hero">wrapped-hero</div>;
const WrappedSignIn: React.FC = () => <div data-testid="signin">wrapped-signin</div>;

// Button/Hero/SignIn에 대해서만 wrapper를 정의하고, "Missing*"은 정의하지 않는다.
const styleGuide: StyleGuide = {
  name: 'wrapping-test-01',
  description: 'pattern/block wrapping 인터페이스 검증용 style guide',
  foundations: {
    name: 'wrapping-test-foundation',
    description: 'minimal',
    palette: {},
    semantic: {
      background: { base: '#fff', elevated: '#f5f5f5' },
      foreground: { base: '#111', muted: '#666' },
      border: { base: '#ddd' },
      primary: { base: '#0a7' },
    },
    typography: { fontFamily: { sans: 'system-ui' } },
    spacing: {},
    radius: {},
    shadow: {},
    motion: {},
    zIndex: {},
  } as StyleGuide['foundations'],
  wrapperComponents: { Button: WrappedButton },
  wrapperBlocks: { Hero: WrappedHero },
  wrapperPatterns: { SignIn: WrappedSignIn },
};

const Consumer: React.FC = () => {
  const Button = useWrapperComponent('Button', FallbackButton);
  const MissingButton = useWrapperComponent('MissingButton', FallbackButton);
  const Hero = useWrapperBlock('Hero', FallbackHero);
  const MissingHero = useWrapperBlock('MissingHero', FallbackHero);
  const SignIn = useWrapperPattern('SignIn', FallbackSignIn);
  const MissingSignIn = useWrapperPattern('MissingSignIn', FallbackSignIn);
  return (
    <div>
      <section data-testid="defined">
        <Button />
        <Hero />
        <SignIn />
      </section>
      <section data-testid="fallback">
        <MissingButton />
        <MissingHero />
        <MissingSignIn />
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'ARCHETYPE/StyleGuide Wrapping',
};
export default meta;

type Story = StoryObj;

export const Resolve: Story = {
  render: () => (
    <StyleGuideProvider styleGuide={styleGuide}>
      <Consumer />
    </StyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) wrapper가 정의된 경우 — wrapping 버전이 렌더된다.
    const defined = within(canvas.getByTestId('defined'));
    await expect(defined.getByTestId('button')).toHaveTextContent('wrapped-button');
    await expect(defined.getByTestId('hero')).toHaveTextContent('wrapped-hero');
    await expect(defined.getByTestId('signin')).toHaveTextContent('wrapped-signin');

    // 2) wrapper가 없는 경우 — fallback(원형)으로 resolve 된다.
    const fallback = within(canvas.getByTestId('fallback'));
    await expect(fallback.getByTestId('button')).toHaveTextContent('archetype-button');
    await expect(fallback.getByTestId('hero')).toHaveTextContent('archetype-hero');
    await expect(fallback.getByTestId('signin')).toHaveTextContent('archetype-signin');
  },
};

export const OutsideProviderUsesFallback: Story = {
  render: () => <Consumer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // provider 밖 — 모든 hook이 fallback(원형)을 반환해야 한다.
    await expect(canvas.getByTestId('defined').querySelector('[data-testid="button"]')).toHaveTextContent('archetype-button');
    await expect(canvas.getByTestId('defined').querySelector('[data-testid="hero"]')).toHaveTextContent('archetype-hero');
    await expect(canvas.getByTestId('defined').querySelector('[data-testid="signin"]')).toHaveTextContent('archetype-signin');
  },
};
