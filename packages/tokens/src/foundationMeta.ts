/**
 * FoundationMeta — foundation preset "채택(adoption)" 메타데이터 레이어 (KAN-035).
 *
 * bbangto-ui를 소비하는 AI가 `foundationCatalog`(76종)에서 foundation을 **코드 전수 검토 없이** 고를 수
 * 있도록, 각 preset의 "언제/어디에 쓰는가"를 기계가독으로 선언한다. 스타일 축(`StyleGuideMeta`)과 동형이며,
 * 통제 어휘(`Domain`/`Tag`/`StyleMood`)를 **재사용**해 축 간 어휘 일관성을 지킨다(중복 union 금지).
 *
 * SSOT = `packages/foundations`의 `foundationMetaRegistry`(authored만). 이를 `foundation.manifest.json`으로
 * 투영해 AI가 파일 하나로 후보를 좁힌다. 전략은 foundations 패키지 FOUNDATION_METADATA_STRATEGY.md 참고.
 *
 * **파일럿 관찰(KAN-035)**: foundations 카탈로그는 거의 전량 **라이트-베이스**(흰 표면 + 어두운 텍스트, 브랜드
 * accent 프리셋)다 — base 라이트/다크/고대비 테마는 core에 내장이고, 유일한 다크-베이스는 `amber-dark`.
 * 따라서 파생 `colorScheme`은 정확하되 편중되며(75 light/1 dark), 실질 변별은 authored 필드
 * (`tags`=accent hue·타이포, `mood`, `domains`, `summary`, `useWhen`/`avoidWhen`)가 담당한다.
 */
import type { Domain, Tag, StyleMood } from './styleGuideMeta';

/**
 * base 표면 스킴 — **저작하지 않는다**. 매니페스트 생성기가 `semantic.background.base` 실효 휘도로 파생한다
 * (luminance ≥ 0.5 → 'light', < 0.5 → 'dark'). 현재 카탈로그에서 'dark'는 `amber-dark` 1종뿐.
 */
export type FoundationColorScheme = 'light' | 'dark';

/**
 * 접근성 자세 — **설계 의도(advisory)**. `contrastIntent`는 **대표 base 텍스트 쌍**
 * (`foreground.base` on `background.base`) **한정** 선언이며 전(全) 조합 보장이 아니다(그래서 매니페스트의
 * 파생 실측 필드는 `baseTextContrast`로 좁혀 명명한다). 매니페스트 생성기가 실측 `baseTextContrast`와 대조해
 * over-claim(선언이 실측보다 높음)을 hard-fail한다(KAN-024 패턴).
 */
export interface FoundationAccessibility {
  /** 대비 설계 의도(측정 보장 아님, base 텍스트 쌍 한정). */
  readonly contrastIntent: 'low' | 'aa' | 'aaa';
  /** 색각 이상 고려 여부(의도 선언). */
  readonly colorblindConsidered: boolean;
  /** 다크-베이스 설계인가(설계 사실). 현 카탈로그에선 amber-dark만 true. */
  readonly darkFirst: boolean;
}

/**
 * foundation 채택 메타데이터. **저작 필드**(의도)만 담는다.
 * `colorScheme`/`baseTextContrast`/`metaStatus` 같은 파생값은 저작하지 않고 매니페스트 생성기가 계산한다.
 */
export interface FoundationMeta {
  /** 표시명(Title Case). catalog label과 동일. */
  readonly displayName: string;
  /** 채택 관점 한 줄 — accent 성격/용도(description보다 "언제 쓰나"에 가깝게). */
  readonly summary: string;
  /** 통제 태그(복수) — accent 색/명도·형태·타이포·무드. `styleGuideMeta`의 `Tag` 재사용. */
  readonly tags: readonly Tag[];
  /** 무드 축(1~5). `styleGuideMeta`의 `StyleMood` 재사용. */
  readonly mood: StyleMood;
  /** 적합 도메인(복수). `styleGuideMeta`의 `Domain` 재사용. */
  readonly domains: readonly Domain[];
  /** 적합 시나리오 — LLM용 근거. 짧은 명령형 문장 ≤5개. */
  readonly useWhen: readonly string[];
  /** 안티패턴 — LLM용 근거. 짧은 명령형 문장 ≤5개. */
  readonly avoidWhen: readonly string[];
  /** 접근성 설계 의도(advisory, base 텍스트 쌍 한정). */
  readonly accessibility: FoundationAccessibility;
  /** 대체/인접 foundation 슬러그. 생성기가 존재·중복·self-ref를 검증. */
  readonly related?: readonly string[];
}
