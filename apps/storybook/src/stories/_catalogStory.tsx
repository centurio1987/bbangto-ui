import type { StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import React from 'react';
import { StyleGuideProvider, styleGuideMap } from '@centurio1987/bbangto-ui-core';
import type { StyleGuide } from '@centurio1987/bbangto-ui-core';

/*
 * Style Guide Catalog — 공통 스토리 팩토리.
 *
 * 모든 카탈로그 preset은 6-leaf 구조(Referenced Foundations / Extended Foundations /
 * Wrapper Components / Patterns / Guideline / Visual Motif)가 동일하다. 그 6개 스토리의
 * render/play를 styleGuide 하나로부터 생성한다. 각 preset 스토리 파일은 이 팩토리를
 * 호출해 6개 named export를 펼치기만 하면 된다(중복 작성 금지).
 */

// 개인정보 회귀 가드 — DOM 텍스트/href에 절대 나타나면 안 되는 토큰.
const FORBIDDEN = [
  'centurio', 'ghkdldjwls', 'gmail.com', 'naver.com', 'github.io',
  '+82', '1026411626', 'lync', '크로노', '풀무간',
];

type Story = StoryObj;

const MONO = 'var(--bbangto-typography-font-family-mono)';
const SANS = 'var(--bbangto-typography-font-family-sans)';

function DocShell({ sg, children, style }: { sg: StyleGuide; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <StyleGuideProvider
      styleGuide={sg}
      style={{
        padding: 32,
        minHeight: '100vh',
        background: 'var(--bbangto-semantic-background-base)',
        color: 'var(--bbangto-semantic-foreground-base)',
        fontFamily: SANS,
        ...style,
      }}
    >
      {children}
    </StyleGuideProvider>
  );
}

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ marginTop: 32, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: 1, fontSize: 13 }}>{children}</h3>
);

const SEMANTIC_SWATCHES: { label: string; varName: string }[] = [
  { label: 'Background', varName: '--bbangto-semantic-background-base' },
  { label: 'Elevated', varName: '--bbangto-semantic-background-elevated' },
  { label: 'Foreground', varName: '--bbangto-semantic-foreground-base' },
  { label: 'Muted', varName: '--bbangto-semantic-foreground-muted' },
  { label: 'Primary', varName: '--bbangto-semantic-primary-base' },
  { label: 'Border', varName: '--bbangto-semantic-border-base' },
];

function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 44, height: 44, background: `var(${varName})`, border: '1px solid var(--bbangto-semantic-border-base)' }} />
      <div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
        <code style={{ fontFamily: MONO, fontSize: 10, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{varName}</code>
      </div>
    </div>
  );
}

function GuidelineSection({ data, Card }: { data: Record<string, unknown>; Card: React.ElementType }) {
  const render = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      return (
        <div key={key} style={{ marginTop: 8 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{key}</div>
          <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
            {value.map((item, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>{String(item)}</li>)}
          </ul>
        </div>
      );
    }
    if (key === 'title') return null;
    return (
      <div key={key} style={{ marginTop: 8, fontSize: 13 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{key}: </span>
        {String(value)}
      </div>
    );
  };
  return (
    <Card style={{ padding: 18, backgroundColor: 'var(--bbangto-semantic-background-elevated)' }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{String(data.title ?? '')}</div>
      {Object.entries(data).map(([k, v]) => render(k, v))}
    </Card>
  );
}

/** styleGuide 하나로부터 6개 카탈로그 스토리를 생성한다. */
export function makeCatalogStories(sg: StyleGuide): Record<string, Story> {
  const W = sg.wrapperComponents ?? {};
  const Button = (W.Button ?? 'button') as React.ElementType;
  const Card = (W.Card ?? 'div') as React.ElementType;
  const Tag = (W.Tag ?? 'span') as React.ElementType;

  const ReferencedFoundations: Story = {
    render: () => (
      <DocShell sg={sg}>
        <h1 style={{ fontWeight: 700, letterSpacing: 1 }}>Referenced Foundations</h1>
        <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>{sg.description}</p>
        <H3>Color</H3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {SEMANTIC_SWATCHES.map((s) => <Swatch key={s.varName} {...s} />)}
        </div>
        <H3>Type</H3>
        <div style={{ fontSize: 40, fontWeight: 700 }}>Aa 가나다 — Sans</div>
        <div style={{ fontFamily: MONO, fontSize: 16 }}>Aa · 0123456789 — Mono</div>
        <H3>Radius &amp; Shadow</H3>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {(['md', 'lg', 'xl'] as const).map((r) => (
            <div key={r} style={{ width: 90, height: 56, background: 'var(--bbangto-semantic-background-elevated)', border: '1px solid var(--bbangto-semantic-border-base)', borderRadius: `var(--bbangto-radius-${r})`, boxShadow: `var(--bbangto-shadow-${r})` }} />
          ))}
        </div>
      </DocShell>
    ),
  };

  const ExtendedFoundations: Story = {
    render: () => (
      <DocShell sg={sg}>
        <h1 style={{ fontWeight: 700, letterSpacing: 1 }}>Extended Foundations</h1>
        <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>
          visual motif 구현을 위한 확장 CSS 변수(<code style={{ fontFamily: MONO }}>--bbangto-ext-*</code>).
        </p>
        <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
          {Object.entries(sg.extendedFoundations ?? {}).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid var(--bbangto-semantic-border-muted)', paddingBottom: 8 }}>
              <code style={{ fontFamily: MONO, fontSize: 12, minWidth: 240 }}>{k}</code>
              <code style={{ fontFamily: MONO, fontSize: 11, color: 'var(--bbangto-semantic-foreground-muted)', wordBreak: 'break-all' }}>{v}</code>
              <span aria-hidden style={{ width: 28, height: 28, marginLeft: 'auto', flexShrink: 0, background: `var(${k})`, border: '1px solid var(--bbangto-semantic-border-base)' }} />
            </div>
          ))}
        </div>
      </DocShell>
    ),
  };

  const WrapperComponents: Story = {
    render: () => (
      <DocShell sg={sg} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <section>
          <H3>Button</H3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button color="primary">Primary</Button>
            <Button variant="outline" color="neutral">Outline</Button>
            <Button color="primary" disabled>Disabled</Button>
          </div>
        </section>
        <section>
          <H3>Tag</H3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Tag tone="accent">ACCENT</Tag>
            <Tag tone="muted">MUTED</Tag>
            <Tag tone="solid">SOLID</Tag>
          </div>
        </section>
        <section>
          <H3>Card</H3>
          <Card style={{ maxWidth: 260, padding: 18, backgroundColor: 'var(--bbangto-semantic-background-elevated)' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Card title</div>
            <div style={{ fontSize: 13, color: 'var(--bbangto-semantic-foreground-muted)' }}>모티프가 적용된 표면 예시.</div>
          </Card>
        </section>
      </DocShell>
    ),
  };

  const Patterns: Story = {
    render: () => (
      <StyleGuideProvider styleGuide={sg} style={{ background: 'var(--bbangto-semantic-background-base)' }}>
        {Object.values(sg.patterns ?? {}).map((P, i) => {
          const Pattern = P as React.ElementType;
          return <Pattern key={i} />;
        })}
      </StyleGuideProvider>
    ),
  };

  const Guideline: Story = {
    render: () => (
      <DocShell sg={sg}>
        <h1 style={{ fontWeight: 700, letterSpacing: 1 }}>Guideline</h1>
        <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>각 요소 사용 시의 Do&apos;s &amp; Don&apos;ts와 접근성 규칙.</p>
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {Object.entries(sg.guidelines ?? {}).map(([name, section]) => (
            <GuidelineSection key={name} data={section as Record<string, unknown>} Card={Card} />
          ))}
        </div>
      </DocShell>
    ),
  };

  const VisualMotif: Story = {
    render: () => {
      const motif = sg.visualMotif!;
      const Example = motif.example!;
      return (
        <div>
          <StyleGuideProvider styleGuide={sg} style={{ minHeight: '100vh', background: 'var(--bbangto-semantic-background-base)' }}>
            <Example />
          </StyleGuideProvider>
          <StyleGuideProvider styleGuide={sg} style={{ padding: 32, background: 'var(--bbangto-semantic-background-base)', color: 'var(--bbangto-semantic-foreground-base)', fontFamily: SANS }}>
            <h2 style={{ fontWeight: 700, letterSpacing: 1 }}>Visual Motif — 컴포넌트 스펙</h2>
            <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 640 }}>{motif.summary}</p>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
              {Object.entries(motif.components).map(([name, spec]) => (
                <Card key={name} style={{ padding: 18, backgroundColor: 'var(--bbangto-semantic-background-elevated)' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--bbangto-semantic-foreground-muted)' }}>{spec.description}</p>
                  <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                    {spec.specs.map((s, i) => (
                      <li key={i} style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.7 }}>{s}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </StyleGuideProvider>
        </div>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const slug = sg.name;

      // 1) 구현 예시 렌더 — 최소 1개 heading + 1개 버튼.
      const headings = await canvas.findAllByRole('heading');
      await expect(headings.length).toBeGreaterThan(0);
      await expect(canvas.getAllByRole('button').length).toBeGreaterThan(0);

      // 2) 토큰 — provider 루트(slug)에서 핵심 CSS 변수 주입 확인.
      const root = canvasElement.querySelector<HTMLElement>(`[data-bbangto-style-guide="${slug}"]`);
      await expect(root).not.toBeNull();
      const rs = getComputedStyle(root!);
      await expect(rs.getPropertyValue('--bbangto-semantic-background-base').trim()).not.toBe('');
      await expect(rs.getPropertyValue('--bbangto-semantic-foreground-base').trim()).not.toBe('');
      await expect(rs.getPropertyValue('--bbangto-typography-font-family-sans').trim()).not.toBe('');

      // 3) 카탈로그/preset 구조 — slug 일치 + 6요소 보장.
      await expect(styleGuideMap[slug]).toBe(sg);
      await expect(Object.keys(sg.extendedFoundations ?? {}).length).toBeGreaterThan(0);
      await expect(Object.keys(sg.patterns ?? {}).length).toBeGreaterThan(0);
      for (const key of ['Button', 'Card', 'Tag']) {
        await expect(sg.wrapperComponents?.[key]).toBeTruthy();
        await expect(sg.visualMotif?.components[key]).toBeTruthy();
      }

      // 4) 개인정보 회귀 가드 — DOM 텍스트/href에 금지 토큰 부재.
      const text = (canvasElement.textContent ?? '').toLowerCase();
      const hrefs = Array.from(canvasElement.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '').join(' ').toLowerCase();
      for (const token of FORBIDDEN) {
        await expect(text.includes(token)).toBe(false);
        await expect(hrefs.includes(token)).toBe(false);
      }
    },
  };

  return { ReferencedFoundations, ExtendedFoundations, WrapperComponents, Patterns, Guideline, VisualMotif };
}
