---
card: KAN-069-G0FGTJ
batch: 1
created: 2026-10-10
branch: KAN-069-G0FGTJ
status: 계획
steps: S1, S2, S3
---

# KAN-069-G0FGTJ 배치1 — 게이트를 먼저 세우고 쓰일 자리가 있는 토큰 8개를 잇는다

카드: [KAN-069-G0FGTJ.md](../cards/KAN-069-G0FGTJ.md) · 범위 `S1` · `S2` · `S3`
선행: 없음 (이 카드의 첫 배치)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치가 끝나면 그림이 바뀐다. 카탈로그 가이드 29개에서 경계선(템플릿 11개)과 C4 상자 테두리(템플릿 5개)가 가이드 값으로 그려지고, 화살촉이 가이드마다 5~9 크기가 된다. 격자 간격은 30개 모두 8 이라 그대로다.

## 1. 작업 패키지

### WP1 · `S1` 빨간 테스트 두 벌

| 파일 | 더하는 것 |
|---|---|
| `packages/visualization/src/tokens/tokenUsage.test.ts` | 새 파일. `baseVisualizationFoundation` 의 잎 경로를 모두 펼치고, 잎마다 viz 소스(`src/**/*.ts(x)`, 테스트·`tokens/base.ts`·`tokens/types.ts` 제외)에 읽는 자리가 있는지 본다. 읽는 자리는 넷이다 — `vvar('a', 'b')`(가운데 조각이 변수인 `vvar('c4', level, 'bgTint')` 포함), `--bbangto-viz-a-b` 이름, `foundation.a.b`, `onInk.ts` 의 `f.a.b`·`f.a[l].b`. 템플릿 데이터의 `data.boundary.width` 같은 우연한 일치는 `foundation.` 접두로 거른다 |
| `apps/storybook/src/stories/visualization/TokenWiringGate.stories.tsx` | 새 파일. 아래 스토리 넷 |

| 스토리 | 무엇을 | 기대값 | 지금 |
|---|---|---|---|
| ① 경계선 | 블루프린트에서 `boundary` 를 `3 2`·2.5·14 로 바꾼 가이드 아래 `Boundary` | 사각형 computed `stroke-dasharray` `3px, 2px` · `stroke-width` `2.5px` · `rx` 14 | 빨강 |
| ② 실선 겹침 | 대시 가이드 안에 실선(`''`) 가이드를 겹친 `Boundary` | 안쪽 `none`, 바깥 대시 | 빨강 |
| ③ C4·화살촉·격자 | 같은 방식으로 C4 테두리 4·3·2, 화살촉 12, 격자 16 | `C4Box` 수준별 `stroke-width`, `<marker>` 의 `markerWidth` 12, `GridLayer` 선 간격 16 | 빨강 |
| ④ 카탈로그 전수 | 가이드 30개의 첫 preset 마다 `Boundary` 하나 | computed 값이 그 가이드 `boundary` 값과 같다 | 블루프린트만 초록 |

**완료 기준**: 단위 테스트가 잎 36개를 읽히지 않는 것으로 내며 빨갛고, 스토리 ①~③이 빨강, ④가 블루프린트 밖에서 빨강. 그 밖의 스토리는 초록.

### WP2 · `S2` 경계선 잇기

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/src/provider/contractCss.ts` | `[data-bbangto-viz-style-guide] [data-viz-part="boundary"] { stroke-dasharray: var(--bbangto-viz-boundary-dash-pattern); }` 와 그 주석 |
| `packages/visualization/src/atoms/Boundary.tsx` | 사각형에 `data-viz-part="boundary"`. `dashPattern` 을 적었을 때만 인라인 `strokeDasharray`. `strokeWidth`·`radius` 기본값을 `useVizFoundation().boundary` 에서. 라벨 `clearGap`·halo 두께가 그 값을 따른다 |

**완료 기준**: 스토리 ①·②·④ 초록, 단위 테스트에서 경계 잎 3개가 빠짐, TemplatePaintGate·Headless·TemplateDashGate 초록.

### WP3 · `S3` C4 테두리·화살촉·격자 잇기

| 파일 | 바꾸는 것 |
|---|---|
| `packages/visualization/src/molecules/C4Box.tsx` | `LEVEL_BORDER_WIDTH` 상수를 걷고 `vvar('c4', level, 'borderWidth')` |
| `packages/visualization/src/atoms/Canvas.tsx` | `markerSize` 기본값을 `useVizFoundation().edge.marker.size` 로 |
| `packages/visualization/src/atoms/GridLayer.tsx` | `gridUnit` 기본값을 `useVizFoundation().canvas.gridUnit` 로 |

**완료 기준**: 스토리 넷 모두 초록, 단위 테스트에서 잇는 잎 8개가 모두 빠짐(남은 빨강은 걷을 잎 28개뿐), viz 스토리 전체 초록.

## 2. 의존과 순서

S1 이 먼저다. S2 와 S3 은 고치는 파일이 겹치지 않아 순서가 없지만, 둘 다 S1 의 스토리 파일로 확인한다.

수행 방식 두 안:

| | 단일 에이전트 | 오케스트레이션 |
|---|---|---|
| 순서 | S1 → S2 → S3 를 한 세션이 차례로 | S1 을 메인이 → S2·S3 을 서브에이전트 둘이 동시에 |
| 배치 수 | 2 (이 배치 + 배치2) | 2 (같음) |
| 병렬 폭 | 1 | 2 (이 배치의 S2·S3) |
| 리스크 | 낮음. S3 이 S2 에서 얻은 렌더 확인 결과를 바로 쓴다 | S2·S3 이 같은 스토리 파일과 viz 빌드·storybook 캐시를 함께 써서, 동시에 돌리면 빌드 결과가 엇갈릴 수 있다 |
| 얻는 것 | 문맥이 이어진다 | S2·S3 이 각각 파일 1~2개라 줄어드는 시간이 작다 |

추천은 단일 에이전트다. 병렬로 얻는 시간이 작고, 빌드 산출물과 캐시를 함께 쓰는 위험이 그보다 크다.

## 3. 리스크

- 그림이 바뀌는 범위가 넓다. 경계선을 쓰는 템플릿 11개 × 가이드 29개와 화살촉이 바뀐다. 기존 스토리 중 경계선 대시나 화살촉 크기를 숫자로 박아 둔 단정이 있으면 빨개진다. 그것이 의도한 변화인지 S2·S3 에서 하나씩 확인하고, 의도한 변화면 기대값을 가이드 값으로 바꾼다.
- `rx` computed 값은 브라우저가 `rx` 를 CSS 값으로 돌려주는지에 달렸다. chromium 에서 안 나오면 속성값(`getAttribute('rx')`)으로 잰다.
- viz dist 를 고친 뒤에는 storybook 캐시 두 곳(`apps/storybook/node_modules/.cache`·`.vite`)을 지워야 새 렌더가 보인다.

## 4. 착수 시점 판단
<!-- 착수할 때 채운다 — 마지막 work 를 다음 배치로 미룰지 여기서 정한다. -->
