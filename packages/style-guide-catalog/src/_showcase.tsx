import React from 'react';
import type { WrapperComponents } from '@centurio1987/bbangto-ui-core';

/*
 * Style Guide Catalog — 공통 Showcase(구현 예시) 빌더.
 *
 * 각 preset의 `patterns` 1개이자 `visualMotif.example`로 쓰인다. 레이아웃·간격은
 * 표준 semantic/typography/radius CSS 변수로만 그리므로, 실제 모티프(블러·네온·
 * 이중그림자 등)는 전달된 wrapper 컴포넌트(Button/Card/Tag)의 주입 CSS로 드러난다.
 *
 * 콘텐츠는 전부 가상(fictional) placeholder다 — 개인/연락처/실제 제품명을 쓰지 않는다.
 * 표준 tone 키: 'accent' | 'muted' | 'solid' (모든 preset의 TagConfig가 제공).
 */

const SANS = "var(--bbangto-typography-font-family-sans, system-ui, sans-serif)";
const MONO = "var(--bbangto-typography-font-family-mono, monospace)";
const BG = 'var(--bbangto-semantic-background-base)';
const ELEVATED = 'var(--bbangto-semantic-background-elevated)';
const FG = 'var(--bbangto-semantic-foreground-base)';
const MUTED = 'var(--bbangto-semantic-foreground-muted)';
const SUBTLE = 'var(--bbangto-semantic-foreground-subtle)';
const ACCENT = 'var(--bbangto-semantic-primary-base)';
const ACCENT_FG = 'var(--bbangto-semantic-primary-foreground)';
const RADIUS_LG = 'var(--bbangto-radius-lg, 0)';

export interface ShowcaseItem {
  name: string;
  tone: 'accent' | 'muted' | 'solid';
  tag: string;
  desc: string;
}

export interface ShowcaseCopy {
  badge: string;
  title: string;
  tagline: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  items: readonly ShowcaseItem[];
  /** CTA 밴드 문구. */
  bandTitle: string;
}

/** wrapper 세트 + 카피로 단일 Showcase 컴포넌트를 만든다. */
export function makeShowcase(
  W: WrapperComponents,
  copy: ShowcaseCopy,
  displayName: string
): React.FC<React.HTMLAttributes<HTMLDivElement>> {
  const Button = W.Button as React.ElementType;
  const Card = W.Card as React.ElementType;
  const Tag = W.Tag as React.ElementType;

  const Showcase: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, ...props }) => (
    <div
      {...props}
      style={{
        fontFamily: SANS,
        color: FG,
        background: BG,
        minHeight: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* HERO */}
      <section
        style={{
          padding: 'clamp(40px,7vw,88px) clamp(20px,5vw,56px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <Tag tone="accent" style={{ fontFamily: MONO }}>
          {copy.badge}
        </Tag>
        <h1 style={{ margin: 0, fontSize: 'clamp(40px,7vw,80px)', fontWeight: 700, lineHeight: 1.02, letterSpacing: '-0.01em', maxWidth: 720 }}>
          {copy.title}
        </h1>
        <p style={{ margin: 0, fontSize: 'clamp(18px,2.4vw,24px)', fontWeight: 600, color: MUTED }}>
          {copy.tagline}
        </p>
        <p style={{ margin: 0, maxWidth: 560, fontSize: 16, lineHeight: 1.7, color: MUTED }}>
          {copy.body}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <Button color="primary">{copy.ctaPrimary}</Button>
          <Button variant="outline" color="neutral">{copy.ctaSecondary}</Button>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section style={{ padding: '0 clamp(20px,5vw,56px) clamp(40px,6vw,72px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700 }}>구성 요소</h2>
          <span style={{ fontFamily: MONO, fontSize: 12, color: SUBTLE, letterSpacing: '0.08em' }}>COMPONENTS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {copy.items.map((item) => (
            <Card key={item.name} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8, backgroundColor: ELEVATED }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{item.name}</span>
                <Tag tone={item.tone}>{item.tag}</Tag>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: MUTED }}>{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section
        style={{
          margin: 'clamp(20px,4vw,40px) clamp(20px,5vw,56px) clamp(40px,7vw,80px)',
          padding: 'clamp(28px,4vw,44px)',
          borderRadius: RADIUS_LG,
          background: ACCENT,
          color: ACCENT_FG,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ margin: 0, fontSize: 'clamp(20px,2.6vw,28px)', fontWeight: 700, lineHeight: 1.3, maxWidth: 520 }}>
          {copy.bandTitle}
        </p>
        <Button color="primary">{copy.ctaPrimary}</Button>
      </section>
    </div>
  );
  Showcase.displayName = displayName;
  return Showcase;
}
