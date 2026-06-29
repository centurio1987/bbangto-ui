import React from 'react';
import type { VisualMotif } from '../StyleGuide';
import { BakeryHero, BakeryMenu, BakeryCraft } from './bakeryPatterns';

/*
 * Neobrutalism_Editorial_01 — Visual Motif.
 *
 * Patterns(개별 재사용 섹션)와 달리, 이 모티프가 "대표 컴포넌트에 어떻게 적용되는가"를
 * 설명하는 스펙(components)과, 그 스펙이 적용된 전체 구현 예시 하나(example=BakeryShowcase)를
 * 한데 묶는다. core에는 데이터(스펙 JSON)와 구현물(예시 컴포넌트)만 두고, 이를 표/문서로
 * 그리는 렌더러는 소비처(Storybook 스토리)가 담당한다.
 */

/** 대표 컴포넌트별 모티프 스펙. 키는 wrapperComponents 키와 동일(Button/Card/Tag). */
const bakeryVisualMotifComponents: VisualMotif['components'] = {
  Button: {
    description:
      '1차 액션은 잉크로 가득 채우고 골드 오프셋 그림자로 종이 위에 올려놓은 듯한 입체감을 준다. 누르면 그림자를 흡수하며 살짝 눌린다.',
    specs: [
      '테두리: 2px 잉크 실선, 모서리 radius 0',
      '그림자: 3px 3px 0 골드(blur 0 하드 오프셋)',
      'hover: translate(2px,2px) + 그림자 1px로 축소',
      'active: translate(3px,3px) + 그림자 제거',
      'focus-visible: 2px 골드 outline (offset 2px)',
      '라벨: IBM Plex Mono, letter-spacing 0.02em',
    ],
  },
  Card: {
    description:
      '표면은 평평하게 두고 잉크 실선 테두리만으로 경계를 만든다. 소프트 그림자를 쓰지 않아 종이를 잘라 붙인 듯한 인상.',
    specs: [
      '테두리: 2px 잉크 실선, 모서리 radius 0',
      '그림자: 없음(none) — 경계는 오직 테두리로',
      '배경: 크림/종이 등 표면 토큰',
    ],
  },
  Tag: {
    description:
      '카테고리/메타 라벨용 경량 배지. 카테고리 색 배경 위에 잉크 텍스트를 올려 대비를 확보하고, mono 폰트로 라벨임을 분명히 한다.',
    specs: [
      '테두리: 1.5px 잉크 실선, 모서리 radius 0',
      '배경: 카테고리 색(gold/app/infra/paper/ink)',
      '텍스트: 잉크(색 배경 위 ink-on-color), ink tone일 때만 크림',
      '폰트: IBM Plex Mono, 대문자 letter-spacing 0.06em',
    ],
  },
};

/**
 * 구현 예시 — 스펙이 실제로 적용된 전체 랜딩(Hero / Menu / Craft 조립).
 * 콘텐츠는 가상(fictional) placeholder다. React 외 신규 의존성 없음.
 * CSS 변수는 호스트(StyleGuideProvider)가 주입하고, 웹폰트도 호스트가 로드한다.
 */
export function BakeryShowcase({ style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y proximity',
        scrollBehavior: 'smooth',
        ...style,
      }}
    >
      {/* BakeryCraft의 '맨 위로' 스크롤 대상. */}
      <div id="top">
        <BakeryHero id="hero" />
      </div>
      <BakeryMenu />
      <BakeryCraft />
    </div>
  );
}
BakeryShowcase.displayName = 'BakeryShowcase';

/** StyleGuide.visualMotif — 컴포넌트별 스펙 + 구현 예시. */
export const bakeryVisualMotif: VisualMotif = {
  summary:
    '네오브루탈리즘 "소프트웨어 베이커리": 크림 캔버스 위 잉크 2px 실선 테두리, 각진 모서리(radius 0), 골드 하드 오프셋 그림자, IBM Plex Sans/Mono.',
  components: bakeryVisualMotifComponents,
  example: BakeryShowcase,
};
