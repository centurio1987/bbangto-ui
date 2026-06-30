import React from 'react';
// 자기 패키지(@centurio1987/bbangto-ui-core)가 아니라 상대경로로 원형 컴포넌트를
// import 한다 — 같은 패키지 내부이므로 순환참조를 만들지 않기 위해서다.
import { Button, type ButtonProps } from '@centurio1987/bbangto-ui-core';
import { Card, type CardProps } from '@centurio1987/bbangto-ui-core';

/**
 * Neobrutalism_Editorial_01 모티프 스타일시트.
 *
 * 인스턴스마다 <style>을 꽂지 않고, document.head에 단 한 번만 주입한다.
 * 원형 컴포넌트(Button/Card)가 inline style을 쓰므로, 모티프는 `!important`로
 * 그 위에 덮어쓴다(테두리/모서리/그림자). hover·active·focus-visible·
 * prefers-reduced-motion 상태도 여기서 일괄 정의한다.
 */
const MOTIF_STYLE_ID = 'bbangto-bakery-motif';

const MOTIF_CSS = `
.bbangto-bakery-btn {
  border: var(--bbangto-ext-border-width, 2px) solid var(--bbangto-ext-ink, #1C1B17) !important;
  border-radius: 0 !important;
  box-shadow: var(--bbangto-ext-offset-shadow, 3px 3px 0 #E9C766) !important;
  font-family: var(--bbangto-typography-font-family-mono, 'IBM Plex Mono', monospace) !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em;
  transition: transform 120ms ease, box-shadow 120ms ease !important;
}
.bbangto-bakery-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--bbangto-ext-accent, #E9C766) !important;
}
.bbangto-bakery-btn:active {
  transform: translate(3px, 3px);
  box-shadow: none !important;
}
.bbangto-bakery-btn:focus-visible {
  outline: 2px solid var(--bbangto-ext-accent, #E9C766) !important;
  outline-offset: 2px;
}
.bbangto-bakery-card {
  border: var(--bbangto-ext-border-width, 2px) solid var(--bbangto-ext-ink, #1C1B17) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
@media (prefers-reduced-motion: reduce) {
  .bbangto-bakery-btn { transition: none !important; }
  .bbangto-bakery-btn:hover,
  .bbangto-bakery-btn:active { transform: none; }
}
`;

let motifInjected = false;
/** 모티프 스타일시트를 문서당 1회 주입한다(SSR-safe, 중복 가드). */
function useBakeryMotif(): void {
  React.useEffect(() => {
    if (motifInjected || typeof document === 'undefined') return;
    if (document.getElementById(MOTIF_STYLE_ID)) {
      motifInjected = true;
      return;
    }
    const el = document.createElement('style');
    el.id = MOTIF_STYLE_ID;
    el.textContent = MOTIF_CSS;
    document.head.appendChild(el);
    motifInjected = true;
  }, []);
}

/** 두 className을 안전하게 병합. */
const cx = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

/**
 * Button 원형을 감싸 베이커리 모티프(잉크 테두리 + 골드 오프셋 그림자 + 각진 모서리)를
 * 입힌다. variant/color/size/ref/이벤트/disabled 등 모든 prop은 그대로 통과시킨다.
 */
export const BakeryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    useBakeryMotif();
    return <Button ref={ref} className={cx('bbangto-bakery-btn', className)} {...props} />;
  }
);
BakeryButton.displayName = 'BakeryButton';

/**
 * Card 원형을 감싸 2px 잉크 테두리 + 각진 모서리 + (오프셋 대신) 플랫 표면을 입힌다.
 */
export const BakeryCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    useBakeryMotif();
    return <Card ref={ref} className={cx('bbangto-bakery-card', className)} {...props} />;
  }
);
BakeryCard.displayName = 'BakeryCard';

export type BakeryTagTone = 'gold' | 'app' | 'infra' | 'paper' | 'ink';

export interface BakeryTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 카테고리 색. 템플릿의 PRODUCT(gold) / APP(green) / INFRA(pink) 배지를 재현. */
  tone?: BakeryTagTone;
}

const TAG_BG: Record<BakeryTagTone, string> = {
  gold: 'var(--bbangto-ext-accent, #E9C766)',
  app: 'var(--bbangto-ext-accent-app, #C2D3B4)',
  infra: 'var(--bbangto-ext-accent-infra, #ECC3C8)',
  paper: 'var(--bbangto-semantic-background-base, #FAF2DD)',
  ink: 'var(--bbangto-ext-ink, #1C1B17)',
};

/**
 * 경량 Tag — mono 라벨 배지. 원형 Chip은 인터랙션 중심이라 무거워, 베이커리
 * 스타일가이드 전용의 가벼운 표시용 배지를 새로 둔다(스타일가이드 컴포넌트 레이어).
 */
export const BakeryTag = React.forwardRef<HTMLSpanElement, BakeryTagProps>(
  ({ tone = 'gold', style, children, ...props }, ref) => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: TAG_BG[tone],
      color: tone === 'ink' ? 'var(--bbangto-semantic-background-base, #FAF2DD)' : 'var(--bbangto-ext-ink, #1C1B17)',
      border: '1.5px solid var(--bbangto-ext-ink, #1C1B17)',
      borderRadius: 0,
      padding: '2px 8px',
      fontFamily: "var(--bbangto-typography-font-family-mono, 'IBM Plex Mono', monospace)",
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.06em',
      lineHeight: 1.6,
      whiteSpace: 'nowrap',
      // preset 스타일 → 사용자 style 순서로 머지(사용자 값이 우선).
      ...style,
    };
    return (
      <span ref={ref} style={baseStyle} {...props}>
        {children}
      </span>
    );
  }
);
BakeryTag.displayName = 'BakeryTag';

/** StyleGuide.wrapperComponents 맵. 키는 원형 컴포넌트 이름. */
export const bakeryWrapperComponents = {
  Button: BakeryButton,
  Card: BakeryCard,
  Tag: BakeryTag,
};
