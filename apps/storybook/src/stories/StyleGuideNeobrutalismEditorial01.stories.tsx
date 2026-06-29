import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import React from 'react';
import {
  StyleGuideProvider,
  bakeryStyleGuide,
  styleGuideMap,
  BakeryButton,
  BakeryCard,
  BakeryTag,
  BakeryHero,
  BakeryMenu,
  BakeryCraft,
  BakeryShowcase,
} from '@centurio1987/bbangto-ui-core';

/**
 * Neobrutalism_Editorial_01 — Style Guide Catalog의 첫 preset.
 *
 * 네오브루탈리즘 "소프트웨어 베이커리" 모티프를 StyleGuide 양식 6요소로 구현한 예시.
 * 사이드바 leaf = 카탈로그 구성요소: Referenced Foundations / Extended Foundations /
 * Wrapper Components / Patterns / Guideline / Visual Motif.
 *
 * 콘텐츠는 가상(fictional) placeholder다 — 개인/연락처/실제 제품명을 포함하지 않는다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Neobrutalism_Editorial_01',
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'todo' },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 공통 문서 셸 — provider + 크림 배경 + 폰트.
function DocShell({ children }: { children: React.ReactNode }) {
  return (
    <StyleGuideProvider
      styleGuide={bakeryStyleGuide}
      style={{
        padding: 32,
        minHeight: '100vh',
        background: 'var(--bbangto-semantic-background-base)',
        color: 'var(--bbangto-ext-ink)',
        fontFamily: 'var(--bbangto-typography-font-family-sans)',
      }}
    >
      {children}
    </StyleGuideProvider>
  );
}

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ marginTop: 32, fontFamily: 'var(--bbangto-typography-font-family-mono)', textTransform: 'uppercase', letterSpacing: 1 }}>
    {children}
  </h3>
);

// ────────────────────────────────────────────────────────────
// 1) Referenced Foundations — 참조하는 design token(BbangtoFoundation) specimen.
function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 44, height: 44, background: `var(${varName})`, border: '2px solid var(--bbangto-ext-ink)' }} />
      <div>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{label}</div>
        <code style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 11, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{varName}</code>
      </div>
    </div>
  );
}

export const ReferencedFoundations: Story = {
  render: () => (
    <DocShell>
      <h1 style={{ fontWeight: 700, letterSpacing: 2 }}>Referenced Foundations</h1>
      <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 520 }}>
        이 스타일 가이드가 참조하는 foundations(design token). {bakeryStyleGuide.description}
      </p>

      <H3>Color</H3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        <Swatch label="Cream (background)" varName="--bbangto-semantic-background-base" />
        <Swatch label="Paper (elevated)" varName="--bbangto-ext-paper" />
        <Swatch label="Ink" varName="--bbangto-ext-ink" />
        <Swatch label="Gold (accent)" varName="--bbangto-ext-accent" />
        <Swatch label="Green (app)" varName="--bbangto-ext-accent-app" />
        <Swatch label="Pink (infra)" varName="--bbangto-ext-accent-infra" />
      </div>

      <H3>Type</H3>
      <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: 2 }}>오븐 — IBM Plex Sans KR</div>
      <div style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 16 }}>OVEN · 0123456789 — IBM Plex Mono</div>

      <H3>Shadow (hard offset)</H3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 80, height: 48, background: 'var(--bbangto-ext-paper)', border: '2px solid var(--bbangto-ext-ink)', boxShadow: 'var(--bbangto-shadow-md)' }} />
        <div style={{ width: 80, height: 48, background: 'var(--bbangto-ext-paper)', border: '2px solid var(--bbangto-ext-ink)', boxShadow: 'var(--bbangto-shadow-lg)' }} />
      </div>
    </DocShell>
  ),
};

// ────────────────────────────────────────────────────────────
// 2) Extended Foundations — --bbangto-ext-* 모티프 변수.
export const ExtendedFoundations: Story = {
  render: () => (
    <DocShell>
      <h1 style={{ fontWeight: 700, letterSpacing: 2 }}>Extended Foundations</h1>
      <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>
        visual motif 구현을 위한 확장 CSS 변수(<code>--bbangto-ext-*</code>). foundations 토큰 위에 모티프 전용 값을 더한다.
      </p>
      <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
        {Object.entries(bakeryStyleGuide.extendedFoundations ?? {}).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid var(--bbangto-semantic-border-muted)', paddingBottom: 8 }}>
            <code style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 12, minWidth: 240 }}>{k}</code>
            <code style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 12, color: 'var(--bbangto-semantic-foreground-muted)' }}>{v}</code>
            <span aria-hidden style={{ width: 28, height: 28, marginLeft: 'auto', background: `var(${k})`, border: '2px solid var(--bbangto-ext-ink)' }} />
          </div>
        ))}
      </div>
    </DocShell>
  ),
};

// ────────────────────────────────────────────────────────────
// 3) Wrapper Components — 원형 컴포넌트 래퍼 데모.
export const WrapperComponents: Story = {
  render: () => (
    <StyleGuideProvider styleGuide={bakeryStyleGuide} style={{ padding: 32, minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: 28, background: 'var(--bbangto-semantic-background-base)', color: 'var(--bbangto-ext-ink)', fontFamily: 'var(--bbangto-typography-font-family-sans)' }}>
      <section>
        <H3>BakeryButton</H3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <BakeryButton color="primary">주문하기</BakeryButton>
          <BakeryButton variant="outline" color="neutral">메뉴 보기</BakeryButton>
          <BakeryButton color="primary" size="lg">크게</BakeryButton>
          <BakeryButton color="primary" disabled>품절</BakeryButton>
        </div>
      </section>

      <section>
        <H3>BakeryTag</H3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <BakeryTag tone="gold">PRODUCT</BakeryTag>
          <BakeryTag tone="app">APP</BakeryTag>
          <BakeryTag tone="infra">INFRA</BakeryTag>
          <BakeryTag tone="paper">TypeScript</BakeryTag>
          <BakeryTag tone="ink">INK</BakeryTag>
        </div>
      </section>

      <section>
        <H3>BakeryCard</H3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <BakeryCard style={{ maxWidth: 240 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>화덕</div>
            <div style={{ fontSize: 13, color: 'var(--bbangto-semantic-foreground-muted)' }}>꺼지지 않는 화덕, 안정적인 인프라 베이스</div>
          </BakeryCard>
        </div>
      </section>
    </StyleGuideProvider>
  ),
};

// ────────────────────────────────────────────────────────────
// 4) Patterns — 개별 재사용 섹션(Hero / Menu / Craft).
export const Patterns: Story = {
  render: () => (
    <StyleGuideProvider styleGuide={bakeryStyleGuide}>
      <BakeryHero />
      <BakeryMenu />
      <BakeryCraft />
    </StyleGuideProvider>
  ),
};

// ────────────────────────────────────────────────────────────
// 5) Guideline — core의 guidelines JSON을 표/목록으로 렌더(렌더러는 스토리 로컬).
function GuidelineSection({ data }: { data: Record<string, unknown> }) {
  const render = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      return (
        <div key={key} style={{ marginTop: 8 }}>
          <div style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{key}</div>
          <ul style={{ margin: '4px 0 0', paddingLeft: 18 }}>
            {value.map((item, i) => <li key={i} style={{ fontSize: 13, lineHeight: 1.6 }}>{String(item)}</li>)}
          </ul>
        </div>
      );
    }
    if (key === 'title') return null;
    return (
      <div key={key} style={{ marginTop: 8, fontSize: 13 }}>
        <span style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--bbangto-semantic-foreground-subtle)' }}>{key}: </span>
        {String(value)}
      </div>
    );
  };
  return (
    <BakeryCard style={{ padding: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>{String(data.title ?? '')}</div>
      {Object.entries(data).map(([k, v]) => render(k, v))}
    </BakeryCard>
  );
}

export const Guideline: Story = {
  render: () => (
    <DocShell>
      <h1 style={{ fontWeight: 700, letterSpacing: 2 }}>Guideline</h1>
      <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 560 }}>각 요소 사용 시의 Do&apos;s &amp; Don&apos;ts와 접근성 규칙.</p>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
        {Object.entries(bakeryStyleGuide.guidelines ?? {}).map(([name, section]) => (
          <GuidelineSection key={name} data={section as Record<string, unknown>} />
        ))}
      </div>
    </DocShell>
  ),
};

// ────────────────────────────────────────────────────────────
// 6) Visual Motif — 구현 예시(BakeryShowcase) + 대표 컴포넌트별 스펙 표.
const FORBIDDEN = ['centurio', 'naver.com', 'github.io', '+82', '1026411626', 'lync', '크로노', '풀무간', '빵토', 'bbangto bakery', 'est. 2019'];

export const VisualMotif: Story = {
  render: () => {
    const motif = bakeryStyleGuide.visualMotif!;
    const Example = motif.example!;
    return (
      <div>
        <StyleGuideProvider styleGuide={bakeryStyleGuide} style={{ height: '100vh' }}>
          <Example />
        </StyleGuideProvider>

        <StyleGuideProvider styleGuide={bakeryStyleGuide} style={{ padding: 32, background: 'var(--bbangto-semantic-background-base)', color: 'var(--bbangto-ext-ink)', fontFamily: 'var(--bbangto-typography-font-family-sans)' }}>
          <h2 style={{ fontWeight: 700, letterSpacing: 1 }}>Visual Motif — 컴포넌트 스펙</h2>
          <p style={{ color: 'var(--bbangto-semantic-foreground-muted)', maxWidth: 620 }}>{motif.summary}</p>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {Object.entries(motif.components).map(([name, spec]) => (
              <BakeryCard key={name} style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{name}</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--bbangto-semantic-foreground-muted)' }}>{spec.description}</p>
                <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                  {spec.specs.map((s, i) => (
                    <li key={i} style={{ fontFamily: 'var(--bbangto-typography-font-family-mono)', fontSize: 12, lineHeight: 1.7 }}>{s}</li>
                  ))}
                </ul>
              </BakeryCard>
            ))}
          </div>
        </StyleGuideProvider>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1) 구현 예시 렌더 — 가상 브랜드 히어로 타이틀.
    const title = await canvas.findByRole('heading', { name: '오븐' });
    await expect(title).toBeVisible();

    // 2) 토큰 — provider 루트(slug)에서 CSS 커스텀 프로퍼티 원본값 검사(rgb 변환/공백 회피).
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-style-guide="neobrutalism-editorial-01"]');
    await expect(root).not.toBeNull();
    const rootStyle = getComputedStyle(root!);
    await expect(rootStyle.getPropertyValue('--bbangto-semantic-background-base').trim().toUpperCase()).toBe('#FAF2DD');
    await expect(rootStyle.getPropertyValue('--bbangto-ext-ink').trim().toUpperCase()).toBe('#1C1B17');
    await expect(rootStyle.getPropertyValue('--bbangto-ext-offset-shadow').trim()).not.toBe('');

    // 3) 모티프 — 래퍼 Button은 각진 모서리(radius 0).
    const cta = canvas.getByRole('button', { name: /주문 문의하기/ });
    await expect(getComputedStyle(cta).borderRadius).toBe('0px');

    // 4) 인터랙션 — 히어로 CTA 링크의 가상 목적지(href).
    await expect(canvas.getByRole('link', { name: /메뉴 둘러보기/ })).toHaveAttribute('href', '#menu');
    await expect(canvas.getByRole('link', { name: /레시피가 궁금해요/ })).toHaveAttribute('href', '#craft');

    // 5) 개인정보 회귀 가드 — DOM 텍스트와 모든 href에 금지 토큰 부재.
    const text = (canvasElement.textContent ?? '').toLowerCase();
    const hrefs = Array.from(canvasElement.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '').join(' ').toLowerCase();
    for (const token of FORBIDDEN) {
      await expect(text.includes(token)).toBe(false);
      await expect(hrefs.includes(token)).toBe(false);
    }

    // 6) 카탈로그/preset 구조 — slug 일치 및 6요소 보장.
    await expect(styleGuideMap['neobrutalism-editorial-01']).toBe(bakeryStyleGuide);
    await expect(bakeryStyleGuide.name).toBe('neobrutalism-editorial-01');
    await expect(bakeryStyleGuide.foundations.radius.md).toBe('0px');
    await expect(bakeryStyleGuide.extendedFoundations?.['--bbangto-ext-ink']).toBe(
      bakeryStyleGuide.foundations.semantic.border.base
    );
    for (const key of ['Button', 'Card', 'Tag']) {
      await expect(bakeryStyleGuide.wrapperComponents?.[key]).toBeTruthy();
      await expect(bakeryStyleGuide.visualMotif?.components[key]).toBeTruthy();
    }
    for (const key of ['BakeryHero', 'BakeryMenu', 'BakeryCraft']) {
      await expect(bakeryStyleGuide.patterns?.[key]).toBeTruthy();
    }
  },
};
