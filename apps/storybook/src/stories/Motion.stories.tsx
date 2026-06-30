import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  Spinner,
  Pulse,
  Wave,
  Stagger,
  BarsLoader,
  RingLoader,
  Shimmer,
  ScrollReveal,
  ScrollProgress,
  Parallax,
  AnimatedGradientBg,
  GridDriftBg,
  GradientText,
  SplitReveal,
  TypingText,
  Marquee,
  BorderBeam,
  Glow,
  CountUp,
  Pressable,
  Ripple,
  Attention,
} from '@centurio1987/bbangto-ui-core';
import { within, expect, userEvent, waitFor } from 'storybook/test';

/**
 * Foundations/Motion — the animation layer of the design system.
 *
 * Motion *parameters* (duration, easing, distance, presets) live in the token
 * layer; `@keyframes` + the `prefers-reduced-motion` reset are injected once by
 * FoundationProvider. The atoms below consume those tokens. Zero runtime deps.
 */
const meta = {
  title: 'ARCHETYPE/Foundations/Motion',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
type PlayContext = { canvasElement: HTMLElement };

const DURATIONS = ['instant', 'fast', 'normal', 'slow'] as const;
const EASINGS = ['default', 'in', 'out', 'inOut'] as const;

const Swatch = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 16,
      border: '1px solid var(--bbangto-semantic-border-base)',
      borderRadius: 'var(--bbangto-radius-md)',
      color: 'var(--bbangto-semantic-foreground-base)',
      fontFamily: 'var(--bbangto-typography-font-family-sans)',
      minWidth: 160,
    }}
  >
    <strong>{label}</strong>
    <code style={{ fontSize: 13, opacity: 0.7 }}>{value}</code>
  </div>
);

/** Visualize the duration tokens via an animated bar on hover/replay. */
export const DurationTokens: Story = {
  render: () => {
    const [k, setK] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button onClick={() => setK((v) => v + 1)}>Replay</button>
        {DURATIONS.map((d) => (
          <div key={`${d}-${k}`} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 80, fontFamily: 'var(--bbangto-typography-font-family-sans)', color: 'var(--bbangto-semantic-foreground-base)' }}>{d}</span>
            <div style={{ flex: 1, height: 12, background: 'var(--bbangto-semantic-background-sunken)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  background: 'var(--bbangto-semantic-primary-base)',
                  transformOrigin: 'left',
                  animation: `grow var(--bbangto-motion-duration-${d}) var(--bbangto-motion-easing-out) both`,
                }}
              />
            </div>
            <code style={{ width: 70, fontSize: 13, color: 'var(--bbangto-semantic-foreground-muted)' }}>{`var(…-${d})`}</code>
          </div>
        ))}
        <style>{`@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
      </div>
    );
  },
};

/** The easing curve tokens. */
export const EasingTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {EASINGS.map((e) => (
        <Swatch key={e} label={e} value={`var(--bbangto-motion-easing-${e})`} />
      ))}
    </div>
  ),
};

const ReplayBox = ({ children }: { children: (key: number) => React.ReactNode }) => {
  const [k, setK] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <button onClick={() => setK((v) => v + 1)}>Replay</button>
      <div key={k}>{children(k)}</div>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 24,
      background: 'var(--bbangto-semantic-background-elevated)',
      border: '1px solid var(--bbangto-semantic-border-base)',
      borderRadius: 'var(--bbangto-radius-md)',
      color: 'var(--bbangto-semantic-foreground-base)',
      fontFamily: 'var(--bbangto-typography-font-family-sans)',
    }}
  >
    {children}
  </div>
);

export const FadeInDemo: Story = {
  name: 'FadeIn',
  render: () => (
    <ReplayBox>{() => <FadeIn><Card>I faded in.</Card></FadeIn>}</ReplayBox>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByText('I faded in.');
    const fadeWrapper = text.parentElement as HTMLElement;
    // Atom applies the tokenized keyframe...
    await expect(getComputedStyle(fadeWrapper).animationName).toBe('bbangto-fade-in');
    // ...and FoundationProvider injected the global keyframe stylesheet exactly once.
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const SlideInDemo: Story = {
  name: 'SlideIn',
  render: () => (
    <ReplayBox>
      {() => (
        <div style={{ display: 'flex', gap: 16 }}>
          {(['up', 'down', 'left', 'right'] as const).map((dir) => (
            <SlideIn key={dir} direction={dir}>
              <Card>{dir}</Card>
            </SlideIn>
          ))}
        </div>
      )}
    </ReplayBox>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    // All four directions render...
    for (const dir of ['up', 'down', 'left', 'right'] as const) {
      const label = await canvas.findByText(dir);
      const wrapper = label.parentElement as HTMLElement;
      // ...and each sets a per-instance slide offset CSS var (token-driven).
      const hasOffset =
        wrapper.style.getPropertyValue('--bbangto-slide-x') !== '' ||
        wrapper.style.getPropertyValue('--bbangto-slide-y') !== '';
      await expect(hasOffset).toBe(true);
    }
  },
};

export const ScaleInDemo: Story = {
  name: 'ScaleIn',
  render: () => (
    <ReplayBox>{() => <ScaleIn><Card>I popped in.</Card></ScaleIn>}</ReplayBox>
  ),
};

export const SpinnerDemo: Story = {
  name: 'Spinner',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="md" color="var(--bbangto-semantic-error-base)" />
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const spinners = canvas.getAllByRole('status');
    await expect(spinners.length).toBeGreaterThan(0);
    // Spinner conveys progress → must be exempt from the reduced-motion reset.
    await expect(spinners[0].getAttribute('data-bbangto-motion')).toBe('essential');
    await expect(spinners[0].getAttribute('aria-label')).toBeTruthy();
  },
};

export const PulseDemo: Story = {
  name: 'Pulse',
  render: () => (
    <Pulse>
      <Card>Loading placeholder…</Card>
    </Pulse>
  ),
};

export const StaggerDemo: Story = {
  name: 'Stagger',
  render: () => (
    <ReplayBox>
      {() => (
        <Stagger style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Card>Item 1</Card>
          <Card>Item 2</Card>
          <Card>Item 3</Card>
          <Card>Item 4</Card>
        </Stagger>
      )}
    </ReplayBox>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    // All four items rendered
    for (const label of ['Item 1', 'Item 2', 'Item 3', 'Item 4']) {
      await expect(canvas.getByText(label)).toBeTruthy();
    }
    // Global keyframe sheet present
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const WaveDemo: Story = {
  name: 'Wave',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Wave dotSize={6} />
        <Wave dotSize={8} />
        <Wave dotSize={12} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Wave count={5} stagger={100} />
        <Wave count={3} color="var(--bbangto-semantic-error-base)" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const waves = canvas.getAllByRole('status');
    await expect(waves.length).toBeGreaterThan(0);
    await expect(waves[0].getAttribute('data-bbangto-motion')).toBe('essential');
    await expect(waves[0].getAttribute('aria-label')).toBeTruthy();
  },
};

export const BarsLoaderDemo: Story = {
  name: 'BarsLoader',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <BarsLoader size="sm" />
      <BarsLoader size="md" />
      <BarsLoader size="lg" />
      <BarsLoader count={5} color="var(--bbangto-semantic-warning-base)" />
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const loaders = canvas.getAllByRole('status');
    await expect(loaders.length).toBeGreaterThan(0);
    await expect(loaders[0].getAttribute('data-bbangto-motion')).toBe('essential');
    await expect(loaders[0].getAttribute('aria-label')).toBeTruthy();
    const firstBar = loaders[0].querySelector('span') as HTMLElement;
    await expect(getComputedStyle(firstBar).animationName).toBe('bbangto-bars');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const RingLoaderDemo: Story = {
  name: 'RingLoader',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <RingLoader size="sm" />
      <RingLoader size="md" />
      <RingLoader size="lg" />
      <RingLoader strokeWidth={3} color="var(--bbangto-semantic-success-base)" />
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const loaders = canvas.getAllByRole('status');
    await expect(loaders.length).toBeGreaterThan(0);
    await expect(loaders[0].getAttribute('data-bbangto-motion')).toBe('essential');
    await expect(loaders[0].getAttribute('aria-label')).toBeTruthy();
    const ring = loaders[0].querySelector('[data-bbangto-ring-circle]') as SVGCircleElement;
    await expect(getComputedStyle(ring).animationName).toBe('bbangto-ring');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const ShimmerDemo: Story = {
  name: 'Shimmer',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <Shimmer height={18} />
      <Shimmer width="82%" height={18} />
      <Shimmer width="64%" height={18} />
      <Shimmer height={120} radius="var(--bbangto-radius-md)" />
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const shimmers = canvas.getAllByRole('status');
    await expect(shimmers.length).toBeGreaterThan(0);
    await expect(shimmers[0].getAttribute('data-bbangto-motion')).toBe('essential');
    await expect(shimmers[0].getAttribute('aria-label')).toBeTruthy();
    await expect(getComputedStyle(shimmers[0]).animationName).toBe('bbangto-shimmer');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const ScrollRevealDemo: Story = {
  name: 'ScrollReveal',
  render: () => (
    <ScrollReveal initialVisible>
      <Card>Revealed content</Card>
    </ScrollReveal>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByText('Revealed content');
    const wrapper = text.closest('[data-bbangto-scroll-reveal]') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper.getAttribute('data-bbangto-scroll-reveal')).toBe('visible');
    await expect(getComputedStyle(wrapper).transitionProperty).toContain('opacity');
  },
};

export const ScrollProgressDemo: Story = {
  name: 'ScrollProgress',
  render: () => (
    <div style={{ width: 360 }}>
      <ScrollProgress position="inline" />
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const progress = await canvas.findByRole('progressbar', { name: 'Scroll progress' });
    const bar = progress.querySelector('[data-bbangto-scroll-progress-bar]') as HTMLElement;
    await expect(progress).toHaveAttribute('aria-valuenow');
    await expect(getComputedStyle(bar).transitionProperty).toContain('transform');
  },
};

export const ParallaxDemo: Story = {
  name: 'Parallax',
  render: () => (
    <Parallax disabled>
      <Card>Parallax layer</Card>
    </Parallax>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByText('Parallax layer');
    const wrapper = text.closest('[data-bbangto-parallax]') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper.style.transform).toContain('translate3d');
  },
};

export const BackgroundMotionDemo: Story = {
  name: 'Background motion',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 720 }}>
      <AnimatedGradientBg
        style={{
          minHeight: 160,
          borderRadius: 'var(--bbangto-radius-md)',
          padding: 24,
          color: 'var(--bbangto-semantic-foreground-base)',
        }}
      >
        Animated gradient
      </AnimatedGradientBg>
      <GridDriftBg
        style={{
          minHeight: 160,
          borderRadius: 'var(--bbangto-radius-md)',
          padding: 24,
          backgroundColor: 'var(--bbangto-semantic-background-elevated)',
          color: 'var(--bbangto-semantic-foreground-base)',
        }}
      >
        Drifting grid
      </GridDriftBg>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const gradient = canvasElement.querySelector('[data-bbangto-animated-gradient]') as HTMLElement;
    const grid = canvasElement.querySelector('[data-bbangto-grid-drift]') as HTMLElement;
    await expect(getComputedStyle(gradient).animationName).toBe('bbangto-animated-gradient');
    await expect(getComputedStyle(grid).animationName).toBe('bbangto-grid-drift');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const BorderGlowDemo: Story = {
  name: 'BorderBeam / Glow',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <BorderBeam style={{ width: 220 }}>
        <Card>Border beam</Card>
      </BorderBeam>
      <Glow>
        <Card>Glow pulse</Card>
      </Glow>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const beam = canvasElement.querySelector('[data-bbangto-border-beam-line]') as HTMLElement;
    const glow = canvasElement.querySelector('[data-bbangto-glow]') as HTMLElement;
    await expect(getComputedStyle(beam).animationName).toBe('bbangto-border-beam');
    await expect(getComputedStyle(glow).animationName).toBe('bbangto-glow');
  },
};

export const CountUpDemo: Story = {
  name: 'CountUp',
  render: () => (
    <Card>
      <CountUp from={0} to={1280} duration={0} />
    </Card>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const wrapper = canvasElement.querySelector('[data-bbangto-count-up]') as HTMLElement;
    const visualValue = wrapper.querySelector('[aria-hidden="true"]');
    const liveRegion = wrapper.querySelector('[aria-live="polite"]');
    await expect(wrapper).not.toBeNull();
    await expect(visualValue).toHaveTextContent('1,280');
    await expect(liveRegion).not.toBeNull();
    await expect(liveRegion).toHaveTextContent('1,280');
    await expect(getComputedStyle(wrapper).fontVariantNumeric).toContain('tabular-nums');
  },
};

export const GradientTextDemo: Story = {
  name: 'GradientText',
  render: () => (
    <Card>
      <GradientText style={{ fontSize: 28, fontWeight: 800 }}>Gradient headline</GradientText>
    </Card>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const text = await canvas.findByText('Gradient headline');
    await expect(text).toHaveAttribute('data-bbangto-gradient-text');
    await expect(getComputedStyle(text).animationName).toBe('bbangto-gradient-text');
    await expect(text.getAttribute('aria-hidden')).toBeNull();
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const SplitRevealDemo: Story = {
  name: 'SplitReveal',
  render: () => (
    <Card>
      <SplitReveal text="Split reveal text" by="word" />
    </Card>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const wrapper = canvasElement.querySelector('[data-bbangto-split-reveal]') as HTMLElement;
    const visual = wrapper.querySelector('[aria-hidden="true"]') as HTMLElement;
    const staticText = wrapper.querySelector('[data-bbangto-static-text]') as HTMLElement;
    const firstPart = wrapper.querySelector('[data-bbangto-split-reveal-part]') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(visual).toHaveTextContent('Split reveal text');
    await expect(staticText).toHaveTextContent('Split reveal text');
    await expect(firstPart).not.toBeNull();
    await expect(getComputedStyle(firstPart).animationName).toBe('bbangto-split-reveal');
  },
};

export const TypingTextDemo: Story = {
  name: 'TypingText',
  render: () => (
    <Card>
      <TypingText text="Typed without screen reader spam" speed={0} />
    </Card>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const wrapper = canvasElement.querySelector('[data-bbangto-typing-text]') as HTMLElement;
    const visual = wrapper.querySelector('[aria-hidden="true"]') as HTMLElement;
    const staticText = wrapper.querySelector('[data-bbangto-static-text]') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(visual).toHaveTextContent('Typed without screen reader spam');
    await expect(staticText).toHaveTextContent('Typed without screen reader spam');
    await expect(wrapper.querySelector('[aria-live]')).toBeNull();
  },
};

export const MarqueeDemo: Story = {
  name: 'Marquee',
  render: () => (
    <Card>
      <Marquee text="Shipping motion with static accessible text" tabIndex={0} />
    </Card>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const wrapper = canvasElement.querySelector('[data-bbangto-marquee]') as HTMLElement;
    const track = wrapper.querySelector('[data-bbangto-marquee-track]') as HTMLElement;
    const staticText = wrapper.querySelector('[data-bbangto-static-text]') as HTMLElement;
    const copies = wrapper.querySelectorAll('[data-bbangto-marquee-copy]');
    await expect(wrapper).not.toBeNull();
    await expect(track).toHaveAttribute('aria-hidden', 'true');
    await expect(copies.length).toBeGreaterThan(1);
    await expect(getComputedStyle(track).animationName).toBe('bbangto-marquee');
    await expect(staticText).toHaveTextContent('Shipping motion with static accessible text');
    await userEvent.hover(wrapper);
    await waitFor(() => expect(getComputedStyle(track).animationPlayState).toBe('paused'));
    await userEvent.unhover(wrapper);
    await waitFor(() => expect(getComputedStyle(track).animationPlayState).toBe('running'));
  },
};

export const InteractionMotionDemo: Story = {
  name: 'Pressable / Ripple',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Pressable>
        <Card>Pressable card</Card>
      </Pressable>
      <Ripple style={{ color: 'var(--bbangto-semantic-primary-foreground)' }}>
        <button
          type="button"
          style={{
            position: 'relative',
            zIndex: 1,
            border: 0,
            padding: '12px 18px',
            borderRadius: 'var(--bbangto-radius-md)',
            background: 'var(--bbangto-semantic-primary-base)',
            color: 'var(--bbangto-semantic-primary-foreground)',
            fontFamily: 'var(--bbangto-typography-font-family-sans)',
            cursor: 'pointer',
          }}
        >
          Ripple action
        </button>
      </Ripple>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    const pressableText = await canvas.findByText('Pressable card');
    const pressable = pressableText.closest('[data-bbangto-pressable]') as HTMLElement;
    await expect(pressable).not.toBeNull();
    await expect(getComputedStyle(pressable).transitionProperty).toContain('transform');
    await userEvent.hover(pressable);
    await waitFor(() => expect(pressable.style.transform).toContain('calc(-1 * var(--bbangto-motion-distance-sm))'));
    await userEvent.unhover(pressable);

    const action = await canvas.findByRole('button', { name: 'Ripple action' });
    await userEvent.click(action);
    const ripple = canvasElement.querySelector('[data-bbangto-ripple-wave]') as HTMLElement;
    await expect(ripple).not.toBeNull();
    await expect(getComputedStyle(ripple).animationName).toBe('bbangto-ripple');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const AttentionDemo: Story = {
  name: 'Attention',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Attention variant="shake">
        <Card>Shake attention</Card>
      </Attention>
      <Attention variant="bounce">
        <Card>Bounce attention</Card>
      </Attention>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const shake = canvasElement.querySelector('[data-bbangto-attention="shake"]') as HTMLElement;
    const bounce = canvasElement.querySelector('[data-bbangto-attention="bounce"]') as HTMLElement;
    await expect(shake).not.toBeNull();
    await expect(bounce).not.toBeNull();
    await expect(getComputedStyle(shake).animationName).toBe('bbangto-attention-shake');
    await expect(getComputedStyle(bounce).animationName).toBe('bbangto-attention-bounce');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

/**
 * Forces the `prefers-reduced-motion` reset (scoped) to demonstrate the policy
 * deterministically without changing OS settings: wrapper atoms freeze, while
 * the Spinner (marked `data-bbangto-motion="essential"`) keeps animating.
 */
export const ReducedMotion: Story = {
  render: () => (
    <div className="bbangto-rm-demo" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        .bbangto-rm-demo *:not([data-bbangto-motion="essential"]),
        .bbangto-rm-demo *:not([data-bbangto-motion="essential"])::before,
        .bbangto-rm-demo *:not([data-bbangto-motion="essential"])::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
      <p style={{ fontFamily: 'var(--bbangto-typography-font-family-sans)', color: 'var(--bbangto-semantic-foreground-muted)' }}>
        Reduced-motion forced in this story. FadeIn/Pulse are neutralized; the Spinner keeps spinning (essential).
      </p>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <FadeIn><Card>No fade (reduced)</Card></FadeIn>
        <Pulse><Card>No pulse (reduced)</Card></Pulse>
        <Spinner size="md" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }: PlayContext) => {
    const canvas = within(canvasElement);
    // Under the forced reduced-motion reset, the essential spinner survives.
    const spinner = canvas.getByRole('status');
    await expect(spinner.getAttribute('data-bbangto-motion')).toBe('essential');
  },
};
