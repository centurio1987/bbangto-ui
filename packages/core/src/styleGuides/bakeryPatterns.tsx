import React from 'react';
import { BakeryButton, BakeryCard, BakeryTag } from './bakeryWrappers';

/*
 * Neobrutalism_Editorial_01 — 모듈형 섹션 패턴.
 *
 * 네오브루탈리즘 "소프트웨어 베이커리" 랜딩 템플릿의 세 페이지(Hero / Menu / Craft)를
 * 각각 재사용 가능한 섹션 컴포넌트로 노출한다. 콘텐츠는 가상(fictional) placeholder다.
 *
 * 색·폰트는 모두 CSS 변수(foundations/extendedFoundations)를 참조한다. 웹폰트
 * 자체는 호스트가 로드한다(컴포넌트에서 @import 하지 않음).
 */

// 자주 쓰는 CSS 변수 참조 단축.
const INK = 'var(--bbangto-ext-ink, #1C1B17)';
const CREAM = 'var(--bbangto-semantic-background-base, #FAF2DD)';
const PAPER = 'var(--bbangto-ext-paper, #FFFCF2)';
const GOLD = 'var(--bbangto-ext-accent, #E9C766)';
const MUTED = 'var(--bbangto-semantic-foreground-muted, #4A463C)';
const FAINT = 'var(--bbangto-semantic-foreground-subtle, #6E6A5E)';
const MONO = "var(--bbangto-typography-font-family-mono, 'IBM Plex Mono', monospace)";
const SANS = "var(--bbangto-typography-font-family-sans, 'IBM Plex Sans KR', sans-serif)";

type SectionProps = React.HTMLAttributes<HTMLElement>;

const pageBase: React.CSSProperties = {
  minHeight: '100vh',
  scrollSnapAlign: 'start',
  position: 'relative',
  fontFamily: SANS,
  boxSizing: 'border-box',
};

// ────────────────────────────────────────────────────────────
// PAGE 01 — HERO
export function BakeryHero({ style, ...props }: SectionProps) {
  const ctaBase: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: '13px',
    fontWeight: 600,
    padding: '13px 28px',
    border: `2px solid ${INK}`,
    borderRadius: 0,
    textDecoration: 'none',
    display: 'inline-block',
  };
  return (
    <section
      {...props}
      style={{
        ...pageBase,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px clamp(20px,5vw,52px) 96px',
        background: CREAM,
        color: INK,
        ...style,
      }}
    >
      <style>{`
        @media (max-width:720px){ .bakery-hero__title{ font-size:84px !important; } }
      `}</style>

      <span
        style={{
          fontFamily: MONO,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
          border: `2px solid ${INK}`,
          background: GOLD,
          padding: '6px 15px',
          marginBottom: '30px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: 8, height: 8, background: INK, borderRadius: '50%' }} />
        Software Bakery
      </span>

      <h1
        className="bakery-hero__title"
        style={{ margin: 0, fontSize: 'clamp(96px,17vw,184px)', fontWeight: 700, letterSpacing: '6px', lineHeight: 0.9 }}
      >
        오븐
      </h1>
      <p style={{ margin: '24px 0 0', fontSize: 'clamp(24px,3.4vw,38px)', fontWeight: 600, letterSpacing: '-0.5px' }}>
        코드와 철학을 굽습니다
      </p>
      <p style={{ maxWidth: 560, margin: '20px auto 0', fontSize: 'clamp(14px,1.6vw,16px)', lineHeight: 1.75, color: MUTED }}>
        반죽을 치대듯 문제를 매만지고, 화덕을 지키듯 인프라를 돌봅니다. 매일 아침 갓 구운 소프트웨어를 한 봉지 가득 담아 내어 드립니다.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 36 }}>
        <a href="#menu" style={{ ...ctaBase, background: INK, color: CREAM, boxShadow: `3px 3px 0 ${GOLD}` }}>
          메뉴 둘러보기 ↓
        </a>
        <a href="#craft" style={{ ...ctaBase, background: PAPER, color: INK }}>
          레시피가 궁금해요
        </a>
      </div>

      <div
        style={{
          fontFamily: MONO,
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 10,
          letterSpacing: '3px',
          color: FAINT,
        }}
      >
        SCROLL ↓ 01 / 03
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PAGE 02 — MENU / DISPLAY CASE
interface MenuItem {
  name: string;
  tone: 'gold' | 'app' | 'infra';
  category: string;
  desc: string;
}
const MENU_ITEMS: MenuItem[] = [
  { name: '소금빵', tone: 'gold', category: 'PRODUCT', desc: '매일의 기본을 책임지는 메인 제품 라인업' },
  { name: '바게트', tone: 'app', category: 'APP', desc: '엣지에서 가볍게 구운 클라이언트 앱' },
  { name: '화덕', tone: 'infra', category: 'INFRA', desc: '꺼지지 않는 화덕, 안정적인 인프라 베이스' },
];
const SKILLS = ['AWS', 'TypeScript', 'Nest.js', 'Vue.js', 'Kubernetes', 'Terraform'];

export function BakeryMenu({ style, ...props }: SectionProps) {
  return (
    <section
      {...props}
      id={props.id ?? 'menu'}
      style={{
        ...pageBase,
        background: PAPER,
        color: INK,
        borderTop: `2.5px solid ${INK}`,
        padding: 'clamp(56px,9vh,96px) clamp(20px,5vw,52px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      <style>{`
        @media (max-width:720px){ .bakery-menu__grid{ grid-template-columns:1fr 1fr !important; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 13, borderBottom: `3px solid ${INK}`, paddingBottom: 11, marginBottom: 30 }}>
        <BakeryTag tone="gold" style={{ fontSize: 13, fontWeight: 700, padding: '3px 10px', border: `2px solid ${INK}` }}>02</BakeryTag>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}>
          오늘의 빵 <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 500, color: FAINT, letterSpacing: 0 }}>Today&apos;s Bake</span>
        </h2>
        <span style={{ fontFamily: MONO, marginLeft: 'auto', fontSize: 11, color: FAINT, letterSpacing: '2px' }}>02 / 03</span>
      </div>

      <div className="bakery-menu__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {MENU_ITEMS.map((item) => (
          <BakeryCard key={item.name} padding="none" style={{ background: CREAM, display: 'flex', flexDirection: 'column' }}>
            <div
              aria-hidden="true"
              style={{ height: 160, borderBottom: `2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: FAINT, fontFamily: MONO, fontSize: 11, background: PAPER }}
            >
              제품 사진
            </div>
            <div style={{ padding: '14px 15px 17px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{item.name}</span>
                <BakeryTag tone={item.tone}>{item.category}</BakeryTag>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.6, color: MUTED }}>{item.desc}</p>
            </div>
          </BakeryCard>
        ))}

        <BakeryCard padding="none" style={{ background: INK, color: CREAM, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
          <div style={{ fontFamily: MONO, fontSize: 42, fontWeight: 700, color: GOLD, lineHeight: 1 }}>+8</div>
          <div style={{ fontSize: 12, marginTop: 8 }}>더 많은 메뉴가<br />화덕에서 익는 중</div>
          <a href="#craft" style={{ fontFamily: MONO, marginTop: 14, fontSize: 11, fontWeight: 600, border: `1.5px solid ${CREAM}`, padding: '6px 12px', color: CREAM, textDecoration: 'none' }}>
            전체 보기 →
          </a>
        </BakeryCard>
      </div>

      <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', color: FAINT, textTransform: 'uppercase' }}>Core Skills ·</span>
        {SKILLS.map((s) => (
          <BakeryTag key={s} tone="paper" style={{ fontSize: 12, fontWeight: 500, padding: '4px 11px' }}>{s}</BakeryTag>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// PAGE 03 — CRAFT / PHILOSOPHY / CONTACT
interface CraftItem {
  index: string;
  accent: string;
  motif: string;
  title: string;
  desc: string;
}
const CRAFT_ITEMS: CraftItem[] = [
  { index: '01 · PRODUCT', accent: GOLD, motif: '반죽', title: '제품', desc: '아이디어를 정성껏 반죽해, 손에 잡히는 제품으로 구워 냅니다.' },
  { index: '02 · INFRA', accent: 'var(--bbangto-ext-accent-app, #C2D3B4)', motif: '화덕', title: '인프라', desc: '꺼지지 않는 화덕처럼, 안정적인 클라우드를 지킵니다.' },
  { index: '03 · CRAFT', accent: 'var(--bbangto-ext-accent-infra, #ECC3C8)', motif: '레시피', title: '철학', desc: '장인의 레시피로, 끊임없이 공부하며 더 나은 맛을 찾습니다.' },
];

export function BakeryCraft({ style, ...props }: SectionProps) {
  const scrollTop = () => {
    if (typeof document !== 'undefined') {
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section
      {...props}
      id={props.id ?? 'craft'}
      style={{
        ...pageBase,
        background: INK,
        color: CREAM,
        borderTop: `2.5px solid ${INK}`,
        padding: 'clamp(56px,9vh,96px) clamp(20px,5vw,52px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      <style>{`
        @media (max-width:720px){
          .bakery-craft__grid{ grid-template-columns:1fr !important; }
          .bakery-craft__split{ grid-template-columns:1fr !important; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 13, borderBottom: `3px solid ${CREAM}`, paddingBottom: 11, marginBottom: 32 }}>
        <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, background: GOLD, color: INK, border: `2px solid ${CREAM}`, padding: '3px 10px' }}>03</span>
        <h2 style={{ margin: 0, fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1, color: CREAM }}>
          우리가 굽는 것 <span style={{ fontFamily: MONO, fontSize: 15, fontWeight: 500, color: FAINT, letterSpacing: 0 }}>What We Bake</span>
        </h2>
        <span style={{ fontFamily: MONO, marginLeft: 'auto', fontSize: 11, color: FAINT, letterSpacing: '2px' }}>03 / 03</span>
      </div>

      {/* 다크 섹션의 카드는 잉크 배경 위라 테두리가 크림이어야 하므로 BakeryCard(잉크 테두리 강제) 대신 인버스 표면을 직접 그린다. */}
      <div className="bakery-craft__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 34 }}>
        {CRAFT_ITEMS.map((c) => (
          <div key={c.title} style={{ border: `2px solid ${CREAM}`, padding: '22px 20px' }}>
            <div style={{ fontFamily: MONO, display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, letterSpacing: '1px', color: c.accent, marginBottom: 12 }}>
              <span>{c.index}</span><span>{c.motif}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#cfc9ba' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bakery-craft__split" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, alignItems: 'stretch' }}>
        <div style={{ background: GOLD, color: INK, border: `2px solid ${CREAM}`, padding: '28px clamp(22px,3vw,34px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ margin: 0, fontSize: 'clamp(20px,2.6vw,28px)', fontWeight: 700, lineHeight: 1.4 }}>
            갓 구운 소프트웨어,<br />한 봉지 어떠세요?
          </p>
          <BakeryButton color="primary" onClick={scrollTop} style={{ marginTop: 20, alignSelf: 'flex-start' }}>
            주문 문의하기 →
          </BakeryButton>
        </div>
        {/* 연락처는 라우팅 불가한 텍스트 placeholder만 — 실제 mailto/tel/도메인 링크를 두지 않는다. */}
        <div style={{ border: `2px solid ${CREAM}`, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 11, fontFamily: MONO }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', color: GOLD }}>CONTACT</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, borderBottom: '1px solid #3a3833', paddingBottom: 9, color: CREAM }}>
            <span style={{ color: FAINT }}>Email</span><span>hello [at] example.invalid</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, borderBottom: '1px solid #3a3833', paddingBottom: 9, color: CREAM }}>
            <span style={{ color: FAINT }}>Phone</span><span>—</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13, color: CREAM }}>
            <span style={{ color: FAINT }}>Blog</span><span style={{ borderBottom: `1.5px solid ${CREAM}` }}>blog.example.invalid</span>
          </div>
        </div>
      </div>

      <div style={{ fontFamily: MONO, marginTop: 28, textAlign: 'center', fontSize: 10.5, color: FAINT, letterSpacing: '1px' }}>
        오븐 · SOFTWARE BAKERY · 코드와 철학을 굽습니다 · ovens on 24/7
      </div>
    </section>
  );
}

/** StyleGuide.patterns 맵. */
export const bakeryPatterns = {
  BakeryHero,
  BakeryMenu,
  BakeryCraft,
};
