import type { StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import React from 'react';
import { StyleGuideProvider, resolveFoundationPreset } from '@centurio1987/bbangto-ui-core';
import type { StyleGuide } from '@centurio1987/bbangto-ui-core';
import { styleGuideMap } from '@centurio1987/bbangto-ui-style-guide-catalog';

/*
 * Style Guide Catalog — 공통 스토리 팩토리.
 *
 * 모든 카탈로그 preset은 6-leaf 구조(Referenced Foundations / Extended Foundations /
 * Wrapper Components / Patterns / Guideline / Visual Motif)가 동일하다. 그 6개 스토리의
 * render/play를 styleGuide 하나로부터 생성한다. 각 preset 스토리 파일은 이 팩토리를
 * 호출해 6개 named export를 펼치기만 하면 된다(중복 작성 금지).
 */

// 개인정보 회귀 가드 — DOM 텍스트/href에 절대 나타나면 안 되는 토큰.
const FORBIDDEN_PRIVACY = [
  'centurio', 'ghkdldjwls', 'gmail.com', 'naver.com', 'github.io',
  '+82', '1026411626', 'lync', '크로노', '풀무간',
];
// bakery 레거시 브랜드 카피 — factory 편입 후 재생성 콘텐츠엔 등장하면 안 됨(오탐 범위 분리).
const FORBIDDEN_LEGACY = ['빵토', 'bbangto bakery', 'est. 2019'];
const FORBIDDEN = [...FORBIDDEN_PRIVACY, ...FORBIDDEN_LEGACY];

type Story = StoryObj<{ foundationKey?: string }>;

const MONO = 'var(--bbangto-typography-font-family-mono)';
const SANS = 'var(--bbangto-typography-font-family-sans)';

/** 시각적으로 숨기되 DOM에는 남겨 getComputedStyle 쿼리가 가능하도록(sr-only). */
const SR_ONLY: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
};

function DocShell({ sg, foundationKey, children, style }: { sg: StyleGuide; foundationKey?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <StyleGuideProvider
      styleGuide={sg}
      foundationKey={foundationKey}
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

/**
 * 색 스킴 컨트롤 config를 생성한다. foundationPresets가 있는 style guide에만
 * foundationKey radio arg를 붙인다(없으면 빈 객체 → 38종 무변경).
 */
function foundationControl(sg: StyleGuide): Partial<Story> {
  const presets = sg.foundationPresets;
  if (!presets?.length) return {};
  return {
    argTypes: {
      foundationKey: {
        name: 'Foundation Preset',
        control: 'radio',
        options: presets.map((p) => p.key),
        description: '색 스킴(foundation preset) 기호선택 — 하단 Controls 패널에서 전환',
      },
    },
    args: { foundationKey: sg.defaultFoundationKey ?? presets[0].key },
  };
}

/** #RGB / #RRGGBB → [r,g,b]. 파싱 불가 시 null. */
function parseHex(c: string): [number, number, number] | null {
  const s = c.trim().replace('#', '');
  if (s.length === 3) return [0, 1, 2].map((i) => parseInt(s[i] + s[i], 16)) as [number, number, number];
  if (s.length === 6) return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)) as [number, number, number];
  return null;
}

/** WCAG 상대휘도 대비비. 파싱 불가 시 null. */
function contrastRatio(a: string, b: string): number | null {
  const ca = parseHex(a);
  const cb = parseHex(b);
  if (!ca || !cb) return null;
  const lum = ([r, g, b]: [number, number, number]) => {
    const f = (v: number) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const l1 = lum(ca);
  const l2 = lum(cb);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/** `rgb()/rgba()`(getComputedStyle 반환형) 또는 hex → 대비비. 파싱 불가 시 null. */
function contrastRatioRGB(a: string, b: string): number | null {
  const parse = (c: string): [number, number, number] | null => {
    const m = c.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
    return parseHex(c);
  };
  const ca = parse(a);
  const cb = parse(b);
  if (!ca || !cb) return null;
  const lum = ([r, g, b]: [number, number, number]) => {
    const f = (v: number) => {
      const x = v / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const l1 = lum(ca);
  const l2 = lum(cb);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
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
    ...foundationControl(sg),
    render: (args) => (
      <DocShell sg={sg} foundationKey={args.foundationKey}>
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
    ...foundationControl(sg),
    render: (args) => (
      <DocShell sg={sg} foundationKey={args.foundationKey}>
        <h1 style={{ fontWeight: 700, letterSpacing: 1 }}>Extended Foundations</h1>
        <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>
          visual motif 구현을 위한 확장 CSS 변수(<code style={{ fontFamily: MONO }}>--bbangto-ext-*</code>).
        </p>
        <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
          {Object.entries(resolveFoundationPreset(sg, args.foundationKey).extendedFoundations).map(([k, v]) => (
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
    ...foundationControl(sg),
    render: (args) => (
      <DocShell sg={sg} foundationKey={args.foundationKey} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
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
    ...foundationControl(sg),
    render: (args) => (
      <StyleGuideProvider styleGuide={sg} foundationKey={args.foundationKey} style={{ background: 'var(--bbangto-semantic-background-base)' }}>
        {Object.values(sg.patterns ?? {}).map((P, i) => {
          const Pattern = P as React.ElementType;
          return <Pattern key={i} />;
        })}
      </StyleGuideProvider>
    ),
  };

  const Guideline: Story = {
    ...foundationControl(sg),
    render: (args) => (
      <DocShell sg={sg} foundationKey={args.foundationKey}>
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
    ...foundationControl(sg),
    render: (args) => {
      const motif = sg.visualMotif!;
      const Example = motif.example!;
      return (
        <div>
          <StyleGuideProvider styleGuide={sg} foundationKey={args.foundationKey} style={{ minHeight: '100vh', background: 'var(--bbangto-semantic-background-base)' }}>
            <Example />
          </StyleGuideProvider>
          <StyleGuideProvider styleGuide={sg} foundationKey={args.foundationKey} style={{ padding: 32, background: 'var(--bbangto-semantic-background-base)', color: 'var(--bbangto-semantic-foreground-base)', fontFamily: SANS }}>
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

      // 3b) 에디토리얼 3섹션(Hero/Menu/Craft) 구조 렌더 확인.
      await expect(headings.length).toBeGreaterThanOrEqual(3);
      for (const s of ['hero', 'menu', 'craft']) {
        await expect(canvasElement.querySelector(`[data-section="${s}"]`)).not.toBeNull();
      }
      await expect(
        canvasElement.querySelectorAll('[data-section="menu"] [data-menu-card]').length,
      ).toBeGreaterThan(0);
      await expect(
        canvasElement.querySelectorAll('[data-philosophy-card]').length,
      ).toBeGreaterThanOrEqual(1);
      await expect(canvasElement.querySelector('[data-testid="showcase-contact"]')).not.toBeNull();
      await expect(canvasElement.querySelector('[data-testid="showcase-footer"]')).not.toBeNull();

      // 3c) 반전 Craft 존 — 배경/전경 대비 4.5:1 이상(computed rgb).
      const craft = canvasElement.querySelector<HTMLElement>('[data-section="craft"]');
      await expect(craft).not.toBeNull();
      const craftStyle = getComputedStyle(craft!);
      const craftRatio = contrastRatioRGB(craftStyle.backgroundColor, craftStyle.color);
      if (craftRatio != null) await expect(craftRatio).toBeGreaterThanOrEqual(4.5);

      // 4) 개인정보 회귀 가드 — DOM 텍스트/href에 금지 토큰 부재.
      const text = (canvasElement.textContent ?? '').toLowerCase();
      const hrefs = Array.from(canvasElement.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '').join(' ').toLowerCase();
      for (const token of FORBIDDEN) {
        await expect(text.includes(token)).toBe(false);
        await expect(hrefs.includes(token)).toBe(false);
      }
    },
  };

  const presets = sg.foundationPresets;

  // foundationPresets가 없는 style guide는 6-leaf만 반환(38종 무변경).
  if (!presets?.length) {
    return { ReferencedFoundations, ExtendedFoundations, WrapperComponents, Patterns, Guideline, VisualMotif };
  }

  // 핵심 CSS 변수 스냅샷 키 — preset 간 유일성 판별용(단일 배경 비교 금지).
  // accent-only 변형(배경 동일, 강조색만 상이)도 구분되도록 primary-subtle·border-focus 포함.
  const SNAPSHOT_VARS = [
    '--bbangto-semantic-background-base',
    '--bbangto-semantic-foreground-base',
    '--bbangto-semantic-primary-base',
    '--bbangto-semantic-primary-subtle',
    '--bbangto-semantic-border-focus',
  ];

  const FoundationPresets: Story = {
    render: () => (
      <div style={{ display: 'grid', gap: 0 }}>
        {/* 각 preset을 자기 key로 렌더 → data-bbangto-foundation로 구분. */}
        {presets.map((p) => (
          <StyleGuideProvider
            key={p.key}
            styleGuide={sg}
            foundationKey={p.key}
            style={{ padding: 24, background: 'var(--bbangto-semantic-background-base)', color: 'var(--bbangto-semantic-foreground-base)', fontFamily: SANS, borderBottom: '1px solid var(--bbangto-semantic-border-base)' }}
          >
            <div style={{ fontFamily: MONO, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{p.key}</div>
            <div style={{ fontWeight: 700, fontSize: 20, marginTop: 4 }}>{p.label}</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button color="primary">Primary</Button>
              <Tag tone="accent">TAG</Tag>
              <Card style={{ padding: 12, backgroundColor: 'var(--bbangto-semantic-background-elevated)' }}>Card</Card>
            </div>
          </StyleGuideProvider>
        ))}
        {/* fallback 검증용(play 테스트 전용) — 미지정(default) / 잘못된 key.
            시각적으로 숨기되 DOM 쿼리는 되도록 sr-only 처리. */}
        <StyleGuideProvider styleGuide={sg} className="sg-fk-unset" style={SR_ONLY}>
          <span>unset</span>
        </StyleGuideProvider>
        <StyleGuideProvider styleGuide={sg} foundationKey="__nonexistent__" className="sg-fk-invalid" style={SR_ONLY}>
          <span>invalid</span>
        </StyleGuideProvider>
      </div>
    ),
    play: async ({ canvasElement }) => {
      const readVar = (el: HTMLElement, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

      // 1) preset이 2개 이상.
      await expect(presets.length).toBeGreaterThanOrEqual(2);

      // 2) 각 preset 루트 존재 + 핵심 변수 주입 + 스냅샷 유일성.
      const snapshots = new Set<string>();
      for (const p of presets) {
        const root = canvasElement.querySelector<HTMLElement>(`[data-bbangto-foundation="${p.key}"]`);
        await expect(root).not.toBeNull();
        const snap = SNAPSHOT_VARS.map((v) => readVar(root!, v)).join('|');
        for (const v of SNAPSHOT_VARS) await expect(readVar(root!, v)).not.toBe('');
        snapshots.add(snap);
      }
      // accent-only 변형은 배경이 같을 수 있으나, 4개 변수 스냅샷 전체는 preset마다 유일해야 함.
      await expect(snapshots.size).toBe(presets.length);

      // 3) 미지정(default) → base foundations 색 주입.
      const unset = canvasElement.querySelector<HTMLElement>('.sg-fk-unset');
      await expect(unset).not.toBeNull();
      await expect(readVar(unset!, '--bbangto-semantic-background-base')).toBe(
        sg.foundations.semantic.background.base.trim(),
      );

      // 4) 잘못된 key → 기본 preset으로 fallback(사일런트 오류 정책).
      const invalid = canvasElement.querySelector<HTMLElement>('.sg-fk-invalid');
      await expect(invalid).not.toBeNull();
      const expected = resolveFoundationPreset(sg, sg.defaultFoundationKey ?? presets[0].key);
      await expect(readVar(invalid!, '--bbangto-semantic-background-base')).toBe(
        expected.foundations.semantic.background.base.trim(),
      );

      // 5) invariant — key 중복 없음 / defaultFoundationKey 존재 / 첫 preset === base foundations 참조.
      const keys = presets.map((p) => p.key);
      await expect(new Set(keys).size).toBe(keys.length);
      if (sg.defaultFoundationKey) await expect(keys).toContain(sg.defaultFoundationKey);
      await expect(presets[0].foundations).toBe(sg.foundations);

      // 6) 색-스킴-only 제약 — 모든 preset의 비색상 토큰이 base와 동일.
      for (const p of presets) {
        await expect(p.foundations.radius).toEqual(sg.foundations.radius);
        await expect(p.foundations.shadow).toEqual(sg.foundations.shadow);
        await expect(p.foundations.typography).toEqual(sg.foundations.typography);
        await expect(p.foundations.spacing).toEqual(sg.foundations.spacing);
      }

      // 7) 접근성 — 각 preset의 전경/배경 대비 4.5:1 이상(파싱 가능한 경우).
      for (const p of presets) {
        const ratio = contrastRatio(
          p.foundations.semantic.foreground.base,
          p.foundations.semantic.background.base,
        );
        if (ratio != null) await expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    },
  };

  return { ReferencedFoundations, ExtendedFoundations, WrapperComponents, Patterns, Guideline, VisualMotif, FoundationPresets };
}
