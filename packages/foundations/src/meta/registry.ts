/**
 * foundationMetaRegistry — 유형/스타일 축과 직교하는 **foundation(색 스킴 base) 채택 메타 SSOT** (KAN-035).
 *
 * 린 설계: slug 정체성은 이미 `foundationCatalog`(src/index.ts)가 SSOT라, 여기엔 **authored 메타만** 담는다
 * (viz 유형 축은 사전 id 목록이 없어 전 슬롯을 나열했으나 foundation은 불필요). 매니페스트 생성기가
 * `foundationCatalog` 키를 순회하며 registry에서 meta를 조회하고, 없으면 `metaStatus:'pending'`으로 남긴다.
 *
 * **파일럿 3종(KAN-035, 인프라+파일럿 스코프)** — 스키마 스트레스 지향 스팬:
 *  - `blueprint`   : 라이트·쿨·기술(인디고, 개발자 인프라)
 *  - `amber-dark`  : **유일한 다크-베이스**(골드 on near-black, 핀테크/크립토) — colorScheme 다크 분기 실증
 *  - `stark-white` : 라이트·중립·엔터프라이즈 편집(그린-블랙 밴드)
 * 잔여 73종 전량 backfill = 후속 카드 KAN-041(pending 0 승격). registry.test가 파일럿 ≥3·통제어휘·related 정합을 게이트.
 */
import type { FoundationMeta } from '@centurio1987/bbangto-ui-tokens';

export const foundationMetaRegistry: Readonly<Record<string, FoundationMeta>> = {
  blueprint: {
    displayName: 'Blueprint',
    summary: '흰 바탕에 인디고 강조, 기술 청사진 미니멀 — 오픈소스/AI 인프라 톤',
    tags: ['light', 'minimal', 'technical', 'mono', 'grid', 'geometric', 'airy', 'serious'],
    mood: { formality: 4, energy: 2, warmth: 2, density: 2, ornament: 1 },
    domains: ['dev-tools', 'saas', 'docs', 'landing'],
    useWhen: [
      '오픈소스·AI 인프라나 개발자 툴 랜딩',
      '미니멀 화이트 기반에 인디고 포인트',
      '코드·모노 타이포가 중요한 기술 문서',
    ],
    avoidWhen: ['따뜻하고 표현적인 소비자 브랜드', '고밀도 데이터 대시보드 표면'],
    accessibility: { contrastIntent: 'aa', colorblindConsidered: false, darkFirst: false },
    related: ['stark-white'],
  },

  'amber-dark': {
    displayName: 'Amber Dark',
    summary: '근흑 바탕에 앰버/골드 강조, 프리미엄 다크 — 핀테크·크립토 트레이딩 톤',
    tags: ['dark', 'vivid', 'high-contrast', 'technical', 'futuristic', 'serious'],
    mood: { formality: 3, energy: 4, warmth: 4, density: 3, ornament: 2 },
    domains: ['fintech', 'crypto-web3', 'dashboard', 'saas'],
    useWhen: [
      '다크 트레이딩·크립토·핀테크 대시보드',
      '골드/앰버 강조의 프리미엄 다크 UI',
      '고대비 다크 표면이 필요할 때',
    ],
    avoidWhen: ['밝고 에어리한 편집/블로그', '키즈·파스텔 소비자 제품'],
    accessibility: { contrastIntent: 'aa', colorblindConsidered: false, darkFirst: true },
    related: ['graphite'],
  },

  'stark-white': {
    displayName: 'Stark White',
    summary: '스타크 화이트 편집형에 딥 그린-블랙 밴드 — 격식 있는 엔터프라이즈 SaaS 톤',
    tags: ['light', 'minimal', 'high-contrast', 'monochrome', 'serious', 'airy'],
    mood: { formality: 5, energy: 2, warmth: 3, density: 2, ornament: 1 },
    domains: ['saas', 'editorial', 'docs', 'landing', 'healthcare'],
    useWhen: [
      '엔터프라이즈 AI·SaaS 스타크 화이트 편집형',
      '딥 그린-블랙 제품 밴드 강조',
      '격식 있는 미니멀 기업 페이지',
    ],
    avoidWhen: ['플레이풀·맥시멀 소비자 브랜드', '다크-우선 게이밍/크립토'],
    accessibility: { contrastIntent: 'aa', colorblindConsidered: false, darkFirst: false },
    related: ['blueprint'],
  },
};
