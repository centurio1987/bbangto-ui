import React from 'react';
// 자기 패키지가 아니라 상대경로로 원형 컴포넌트를 import 한다(같은 패키지 내부 순환참조 회피).
import { Button, type ButtonProps } from '@centurio1987/bbangto-ui-core';
import { Card, type CardProps } from '@centurio1987/bbangto-ui-core';
import type { WrapperComponents } from '@centurio1987/bbangto-ui-core';

/*
 * Style Guide Catalog — 공통 모티프 래퍼 빌더.
 *
 * 모든 preset의 wrapperComponents(Button/Card/Tag)는 구조가 동일하다:
 * 원형 컴포넌트에 모티프 className을 덧대고, 모티프 스타일시트를 document.head에
 * 1회 주입한다. 차이는 "어떤 CSS를 주입하느냐"뿐이므로 그 부분만 config로 받는다.
 */

/** 두 className을 안전하게 병합. */
export const cx = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

const injected = new Set<string>();
/** 모티프 스타일시트를 문서당 1회 주입(SSR-safe, id 기준 dedup). */
export function useMotifStyle(id: string, css: string): void {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (injected.has(id) || document.getElementById(id)) {
      injected.add(id);
      return;
    }
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    injected.add(id);
  }, [id, css]);
}

/** 경량 Tag 배지 설정 — tone별 inline 스타일 오버라이드. */
export interface TagConfig {
  baseStyle: React.CSSProperties;
  tones: Record<string, React.CSSProperties>;
  defaultTone: string;
}

export interface MotifConfig {
  /** <style> 엘리먼트 id(중복 주입 가드 키). */
  styleId: string;
  /** 주입할 모티프 스타일시트. */
  css: string;
  /** Button 래퍼에 붙일 className(css 안에서 셀렉터로 사용). */
  buttonClass: string;
  /** Card 래퍼에 붙일 className. */
  cardClass: string;
  /** Tag 배지 설정. */
  tag: TagConfig;
  /** displayName 접두사(e.g. "Glass" → GlassButton). */
  displayPrefix: string;
}

export interface MotifTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: string;
}

/** preset 하나의 wrapperComponents(Button/Card/Tag)를 생성한다. */
export function makeMotifWrappers(cfg: MotifConfig): WrapperComponents {
  const MotifButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
      useMotifStyle(cfg.styleId, cfg.css);
      return <Button ref={ref} className={cx(cfg.buttonClass, className)} {...props} />;
    }
  );
  MotifButton.displayName = `${cfg.displayPrefix}Button`;

  const MotifCard = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
      useMotifStyle(cfg.styleId, cfg.css);
      return <Card ref={ref} className={cx(cfg.cardClass, className)} {...props} />;
    }
  );
  MotifCard.displayName = `${cfg.displayPrefix}Card`;

  const MotifTag = React.forwardRef<HTMLSpanElement, MotifTagProps>(
    ({ tone = cfg.tag.defaultTone, style, children, ...props }, ref) => {
      useMotifStyle(cfg.styleId, cfg.css);
      const merged: React.CSSProperties = {
        ...cfg.tag.baseStyle,
        ...(cfg.tag.tones[tone] ?? {}),
        ...style,
      };
      return (
        <span ref={ref} style={merged} {...props}>
          {children}
        </span>
      );
    }
  );
  MotifTag.displayName = `${cfg.displayPrefix}Tag`;

  return { Button: MotifButton, Card: MotifCard, Tag: MotifTag };
}
