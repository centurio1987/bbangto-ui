import type { ShowcaseCopyExt } from './_showcase';

/*
 * Style Guide Catalog — Showcase 확장 카피 레지스트리 (결정론적 주입 sink).
 *
 * 각 스타일 가이드의 Showcase `displayName`(= `makeShowcase(…, 'X')`의 3번째 인자)을 키로,
 * 에디토리얼 템플릿의 확장 섹션(gallery/skills/philosophy/contact/footer) 텍스트를 담는다.
 *
 * 규칙(중요):
 *  - 이 파일의 콘텐츠는 LLM이 `ShowcaseCopyExt` schema로 생성한 "데이터"를 결정론적으로 조립한 것.
 *    템플릿 렌더 구조(_showcase.tsx)는 코드로 고정, 정체성 문장·키워드만 여기 데이터로 주입한다.
 *  - `philosophy`는 정확히 3장, Menu items 텍스트와 중복 금지.
 *  - `contact`는 비라우팅 placeholder만(`.invalid` TLD, `[at]` 형식). 실제 이메일/도메인/실명 금지.
 *  - 키가 없거나 필드가 비면 `makeShowcase`가 기본값으로 graceful degrade(빌드 초록 유지).
 *
 * 완비성은 Storybook play(`ShowcaseCopyCompleteness`)가 강제한다.
 */
export const SHOWCASE_COPY_EXT: Record<string, ShowcaseCopyExt> = {
  // Neobrutalism_Editorial_01 — 플래그십 정체성 카피(손저작, Phase 3 워크플로 대상에서 제외).
  NeobrutalismShowcase: {
    menuEyebrow: "TODAY'S BAKE",
    menuTitle: '오늘의 빵',
    skills: ['AWS', 'TypeScript', 'Nest.js', 'Vue.js', 'Kubernetes', 'Terraform'],
    craftEyebrow: 'WHAT WE BAKE',
    craftTitle: '우리가 굽는 것',
    philosophy: [
      { label: 'PRODUCT', title: '제품', body: '아이디어를 정성껏 반죽해, 손에 잡히는 제품으로 구워 냅니다.' },
      { label: 'INFRA', title: '인프라', body: '꺼지지 않는 화덕처럼, 안정적인 클라우드를 지킵니다.' },
      { label: 'CRAFT', title: '철학', body: '장인의 레시피로, 끊임없이 공부하며 더 나은 맛을 찾습니다.' },
    ],
    contact: { email: 'hello [at] example.invalid', phone: '—', blog: 'blog.example.invalid' },
    footer: '오븐 · SOFTWARE BAKERY · 코드와 철학을 굽습니다 · ovens on 24/7',
    scrollLabel: 'SCROLL ↓',
  },
};
