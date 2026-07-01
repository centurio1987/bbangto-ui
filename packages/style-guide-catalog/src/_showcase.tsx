import React from 'react';
import type { WrapperComponents } from '@centurio1987/bbangto-ui-core';
import { SHOWCASE_COPY_EXT } from './_showcaseCopy.generated';

/*
 * Style Guide Catalog — 공통 Showcase(구현 예시) 빌더.
 *
 * 각 preset의 `patterns` 1개이자 `visualMotif.example`로 쓰인다. 3섹션 에디토리얼 랜딩:
 *   Hero(대형 타이틀·CTA) → Menu/Gallery(아이템 그리드 + 스킬 칩) → Craft(철학 3카드 + CTA + 가상 연락 + 푸터).
 * 레이아웃·간격은 표준 semantic/typography/radius CSS 변수로만 그리므로, 실제 모티프(블러·네온·
 * 이중그림자 등)는 전달된 wrapper 컴포넌트(Button/Card/Tag)의 주입 CSS로 드러난다.
 *
 * 템플릿 구조는 결정론적으로 고정하고, 각 가이드의 정체성 텍스트는 `copy` + displayName 키의
 * `SHOWCASE_COPY_EXT`(결정론적 데이터 레지스트리)를 병합해 채운다. 신규 확장 필드는 전부 optional +
 * 기본값이라 데이터 조립 전에도 풀 템플릿이 렌더된다(빌드 초록 유지).
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
// 반전 존 텍스트 — 항상 solid(테마 배경이 gradient여도 안전). foreground-inverse는 "반대 표면 위 텍스트"용.
const FG_INVERSE = 'var(--bbangto-semantic-foreground-inverse)';
const RADIUS_LG = 'var(--bbangto-radius-lg, 0)';
const RADIUS_MD = 'var(--bbangto-radius-md, 0)';

export interface ShowcaseItem {
  name: string;
  tone: 'accent' | 'muted' | 'solid';
  tag: string;
  desc: string;
}

/** 철학/가치 카드 한 장 — Craft 섹션. */
export interface PhilosophyCard {
  label: string;
  title: string;
  body: string;
}

/** 가상 연락 placeholder — 비라우팅 텍스트만(`.invalid`/`[at]`). */
export interface ShowcaseContact {
  email?: string;
  phone?: string;
  blog?: string;
}

export interface ShowcaseCopy {
  badge: string;
  title: string;
  tagline: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
  items: readonly ShowcaseItem[];
  /** CTA 밴드/Craft CTA 문구. */
  bandTitle: string;
  // — 에디토리얼 확장(전부 optional, 기본값으로 degrade) —
  menuEyebrow?: string;
  menuTitle?: string;
  skills?: readonly string[];
  craftEyebrow?: string;
  craftTitle?: string;
  philosophy?: readonly PhilosophyCard[];
  contact?: ShowcaseContact;
  footer?: string;
  scrollLabel?: string;
}

/** `SHOWCASE_COPY_EXT` 레지스트리에 담는 확장 전용 부분집합(기존 필수 8필드는 카탈로그 소스에 유지). */
export type ShowcaseCopyExt = Partial<
  Pick<
    ShowcaseCopy,
    'menuEyebrow' | 'menuTitle' | 'skills' | 'craftEyebrow' | 'craftTitle' | 'philosophy' | 'contact' | 'footer' | 'scrollLabel'
  >
>;

const CONTACT_DEFAULT: Required<ShowcaseContact> = {
  email: 'hello [at] example.invalid',
  phone: '—',
  blog: 'blog.example.invalid',
};

/** wrapper 세트 + 카피로 3섹션 에디토리얼 Showcase 컴포넌트를 만든다.
    섹션은 콘텐츠 높이 + 넉넉한 패딩으로 그린다 — 100vh 강제 금지(짧은 카피에서 빈 화면 방지). */
export function makeShowcase(
  W: WrapperComponents,
  copy: ShowcaseCopy,
  displayName: string
): React.FC<React.HTMLAttributes<HTMLDivElement>> {
  const Button = W.Button as React.ElementType;
  const Card = W.Card as React.ElementType;
  const Tag = W.Tag as React.ElementType;

  // 결정론적 병합: 카탈로그 소스의 base copy + displayName 키 확장 데이터.
  const ext = SHOWCASE_COPY_EXT[displayName] ?? {};
  const c: ShowcaseCopy = { ...copy, ...ext };

  const menuEyebrow = c.menuEyebrow ?? 'COMPONENTS';
  const menuTitle = c.menuTitle ?? '구성 요소';
  const skills = c.skills ?? [];
  const craftEyebrow = c.craftEyebrow ?? 'PHILOSOPHY';
  const craftTitle = c.craftTitle ?? '우리가 만드는 것';
  const philosophy: readonly PhilosophyCard[] =
    c.philosophy && c.philosophy.length
      ? c.philosophy
      : [{ label: craftEyebrow, title: craftTitle, body: c.tagline }];
  const contact = { ...CONTACT_DEFAULT, ...(c.contact ?? {}) };
  const footer = c.footer ?? `${c.badge} · ${c.tagline}`;
  const scrollLabel = c.scrollLabel ?? 'SCROLL ↓';

  const Showcase: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ style, className, ...props }) => (
    <div
      {...props}
      className={className}
      style={{ fontFamily: SANS, color: FG, background: BG, boxSizing: 'border-box', ...style }}
    >
      {/* ── 1) HERO ── */}
      <section
        data-section="hero"
        aria-label="소개"
        style={{
          padding: 'clamp(56px,9vw,128px) clamp(20px,5vw,64px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          alignItems: 'flex-start',
        }}
      >
        <Tag tone="accent" style={{ fontFamily: MONO }}>{c.badge}</Tag>
        <h1 style={{ margin: 0, fontSize: 'clamp(48px,11vw,140px)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em', maxWidth: 900 }}>
          {c.title}
        </h1>
        <p style={{ margin: 0, fontSize: 'clamp(18px,2.6vw,26px)', fontWeight: 600, color: MUTED, maxWidth: 640 }}>
          {c.tagline}
        </p>
        <p style={{ margin: 0, maxWidth: 580, fontSize: 16, lineHeight: 1.7, color: MUTED }}>
          {c.body}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <Button color="primary">{c.ctaPrimary}</Button>
          <Button variant="outline" color="neutral">{c.ctaSecondary}</Button>
        </div>
        <div aria-hidden style={{ marginTop: 16, fontFamily: MONO, fontSize: 12, letterSpacing: '0.14em', color: SUBTLE }}>
          {scrollLabel} · 01 / 03
        </div>
      </section>

      {/* ── 2) MENU / GALLERY ── */}
      <section data-section="menu" aria-label={menuTitle} style={{ padding: 'clamp(40px,6vw,88px) clamp(20px,5vw,64px)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <span style={{ fontFamily: MONO, fontSize: 12, color: SUBTLE, letterSpacing: '0.12em' }}>02 / {menuEyebrow}</span>
        </div>
        <h2 style={{ margin: '0 0 24px', fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.01em' }}>{menuTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {c.items.map((item) => (
            <Card key={item.name} data-menu-card style={{ padding: 0, overflow: 'hidden', backgroundColor: ELEVATED }}>
              <div
                aria-hidden
                style={{
                  height: 120,
                  background: ELEVATED,
                  borderBottom: `1px solid var(--bbangto-semantic-border-muted, ${SUBTLE})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  color: SUBTLE,
                }}
              >
                {item.tag}
              </div>
              <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>{item.name}</span>
                  <Tag tone={item.tone}>{item.tag}</Tag>
                </div>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: MUTED }}>{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
        {skills.length > 0 && (
          <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: SUBTLE, letterSpacing: '0.1em', marginRight: 4 }}>STACK</span>
            {skills.map((s) => (
              <Tag key={s} tone="muted">{s}</Tag>
            ))}
          </div>
        )}
      </section>

      {/* ── 3) CRAFT / PHILOSOPHY / CONTACT / FOOTER (반전 존) ──
          bg=foreground-base(solid), text=foreground-inverse(solid) → 테마 배경이 gradient여도 안전.
          중첩 컴포넌트 대신 plain div로 그려 반전 상속 문제를 회피한다. */}
      <section
        data-section="craft"
        aria-label={craftTitle}
        style={{
          background: FG,
          color: FG_INVERSE,
          padding: 'clamp(48px,7vw,104px) clamp(20px,5vw,64px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.12em', opacity: 0.66 }}>03 / {craftEyebrow}</span>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.01em' }}>{craftTitle}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {philosophy.map((p, i) => (
            <div
              key={i}
              data-philosophy-card
              style={{ padding: 18, borderRadius: RADIUS_MD, border: `1px solid currentColor`, display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', color: ACCENT }}>
                {String(i + 1).padStart(2, '0')} · {p.label}
              </span>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{p.title}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, opacity: 0.82 }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 8,
            padding: 'clamp(24px,4vw,40px)',
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
          <p style={{ margin: 0, fontSize: 'clamp(20px,2.6vw,28px)', fontWeight: 700, lineHeight: 1.3, maxWidth: 520 }}>{c.bandTitle}</p>
          {/* accent/accent-fg는 검증된 대비 쌍 → primary-base 밴드 위 primary 버튼 중복(예: 잉크 위 잉크) 회피. */}
          <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, border: `2px solid ${ACCENT_FG}`, padding: '10px 20px', whiteSpace: 'nowrap' }}>
            {c.ctaPrimary} →
          </span>
        </div>

        <div
          data-testid="showcase-contact"
          style={{ display: 'flex', gap: 'clamp(16px,4vw,48px)', flexWrap: 'wrap', fontFamily: MONO, fontSize: 13, opacity: 0.9 }}
        >
          <span>Email — {contact.email}</span>
          <span>Phone — {contact.phone}</span>
          <span>Blog — {contact.blog}</span>
        </div>

        <div data-testid="showcase-footer" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.1em', opacity: 0.6 }}>
          {footer}
        </div>
      </section>
    </div>
  );
  Showcase.displayName = displayName;
  return Showcase;
}
