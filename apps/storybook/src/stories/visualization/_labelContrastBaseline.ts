/**
 * 글자 대비 게이트(`TemplatePaintGate.stories.tsx` 의 LabelContrastGate)가 이미 알고 있는 미달 목록.
 *
 * KAN-056 을 마칠 때 대상 템플릿 13개 × 카탈로그 가이드 30개에서 잰 값으로 시작했고, KAN-063 에서 검사를 표본
 * 전부(templates 가 내보내는 템플릿 68개)로 넓히며 드러난 미달 1334곳을 맨 아래 「KAN-063」 묶음에 더했다.
 * 키는 `가이드 · fixture · text[문서 순서] "글자 앞 24자"`, 값은 그때의 대비(소수 둘째 자리)다.
 * 게이트는 이 목록에 없는 미달, 여기 적힌 값보다 0.01 넘게 떨어진 대비, 이제 기준을 넘어
 * 목록에서 지워야 할 항목을 모두 실패로 낸다. 목록은 줄어들기만 해야 한다.
 *
 * KAN-056 묶음의 원인은 대부분 그 카드 전부터 있던 것이다 — Mindmap 노드의 불투명 팔레트 면, Requirement 의
 * 반투명 표기 글자(opacity 0.6·0.8)와 머리 띠, 일부 가이드의 shape.fill·edge.stroke 쌍.
 * ArchiMate 계층 면(팔레트 35%)은 KAN-056 검토 항목 2에서 받아들인 값이다.
 * KAN-063 묶음은 원인을 가르지 않고 잰 그대로 옮겼다(템플릿별 수는 KAN-063 카드 문서 수행 내역).
 * 줄이는 일은 KAN-061(viz 라벨 대비 정리)이 맡는다.
 */
export const LABEL_CONTRAST_BASELINE: Readonly<Record<string, number>> = {

  // ── KAN-063 — 검사를 템플릿 68개로 넓히며 드러난 미달 ──────────────────────
};
