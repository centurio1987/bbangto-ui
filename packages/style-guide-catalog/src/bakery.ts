import type { StyleGuide } from '../StyleGuide';
import { bakeryFoundations, bakeryExtendedFoundations } from './bakeryFoundations';
import { bakeryWrapperComponents } from './bakeryWrappers';
import { bakeryPatterns } from './bakeryPatterns';
import { bakeryGuidelines } from './bakeryGuidelines';
import { bakeryVisualMotif } from './bakeryVisualMotif';

/**
 * Neobrutalism_Editorial_01 — Style Guide Catalog의 첫 preset.
 *
 * 명칭 정책: 표시명은 `Neobrutalism_Editorial_01`(디자인 트렌드 인덱스), 식별자(slug)는
 * `neobrutalism-editorial-01`(preset name / data-bbangto-style-guide 속성 / styleGuideMap 키).
 *
 * 네오브루탈리즘 "소프트웨어 베이커리" 비주얼 모티프를 StyleGuide 양식 전체로 구현한 것:
 * - foundations          : 크림/잉크/골드 디자인 토큰 (필수)
 * - extendedFoundations  : --bbangto-ext-* 모티프 변수(ink/paper/accent/offset-shadow/border-width)
 * - wrapperComponents    : Button/Card/Tag — 원형 컴포넌트에 모티프를 입힌 래퍼
 * - patterns             : BakeryHero/Menu/Craft — 랜딩 섹션 (조립은 소비처에서)
 * - guidelines           : Do's & Don'ts + 접근성 + 필수 웹폰트
 * - visualMotif          : 대표 컴포넌트별 모티프 스펙 + 구현 예시(BakeryShowcase)
 *
 * 콘텐츠는 가상(fictional) placeholder로, 어떤 개인/연락처/실제 제품명도 포함하지 않는다.
 */
export const bakeryStyleGuide: StyleGuide = {
  name: 'neobrutalism-editorial-01',
  description: bakeryFoundations.description,
  foundations: bakeryFoundations,
  extendedFoundations: bakeryExtendedFoundations,
  wrapperComponents: bakeryWrapperComponents,
  patterns: bakeryPatterns,
  guidelines: bakeryGuidelines,
  visualMotif: bakeryVisualMotif,
};
