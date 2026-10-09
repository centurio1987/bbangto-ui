---
card: KAN-061-K8V2HH
batch: 3
created: 2026-10-10
branch: KAN-061-K8V2HH
status: 계획
steps: S6, S7, S8
---

# KAN-061-K8V2HH 배치3 — 투명도가 바뀌는 면과 C4 를 고치고 기준 목록을 비운다

카드: [KAN-061-K8V2HH.md](../cards/KAN-061-K8V2HH.md) · 범위 `S6` · `S7` · `S8`
선행: [배치2](KAN-061-K8V2HH.batch2.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

이 배치가 끝나면 기준 목록이 비고, 카드가 검토로 갈 준비가 된다.

## 1. 작업 패키지

### WP1 · `S6` 투명도가 바뀌는 면과 C4

| 템플릿 | 면 | 글자색 |
|---|---|---|
| Heatmap · ChoroplethMap | 값마다 투명도가 다른 팔레트 칸 | `useVizFoundation()` 으로 칸마다 「`canvas.bg` 위 팔레트 × 투명도」 합성색을 만들고 계산 함수로 고른다 |
| Sankey | 투명도 0.42 띠 위 이름 | 위와 같다 |
| ArchiMate 4종(archimate · business · application · technology) | 팔레트 35% 면 | 위와 같다 |
| C4 context · container · dynamic · system-landscape | `C4Box` 의 `c4.<level>.bgTint`, `PersonNode`·`ExternalNode` 의 `node.<kind>.fill`, c4-dynamic 순번 원(`palette.p3`) | `on-c4-<level>-bg-tint` · `on-node-<kind>-fill` · `on-palette-p3` |

C4 글자는 `c4.*.labelColor` 를 쓰지 않는다. KAN-069 가 그 토큰을 잇거나 걷기로 정해 두었기 때문이다(카드 전략 「제약」).

순서: 열한 템플릿의 줄 238곳을 템플릿 하나씩 지우고 고친다.

**완료 기준**: 238곳이 목록에서 빠지고 목록이 0줄이다. 두 게이트 초록.

### WP2 · `S7` 기준 목록 닫기

`_labelContrastBaseline.ts` 를 빈 목록으로 두고, 머리 주석을 「새 미달은 목록에 올리지 말고 `--bbangto-viz-on-*` 로 고친다」로 바꾼다. 게이트 코드에서 기준 목록 비교는 남겨 둔다. 목록이 비어 있으면 「새 미달」 하나로도 실패한다.

`packages/visualization/README.md` 189~193번째 줄(글자색 고르는 규칙과 기준 목록 설명)을 「면 위 글자는 `vvar('on', …)` 를 쓴다」로 고친다. KAN-067 과의 겹침은 용인했다(2026-10-10 유저 선택). KAN-067 이 고치는 36·108번째 줄·203번째 줄 앞 새 절·203~208번째 줄은 건드리지 않는다.

**완료 기준**: `LABEL_CONTRAST_BASELINE` 0개, 게이트 초록.

### WP3 · `S8` 마무리

`.changeset/kan-061-*.md` 에 tokens minor(선택 필드 `on`)·visualization minor(`--bbangto-viz-on-*` 변수, 템플릿 글자색)를 적는다. 품질 게이트 다섯을 돌린다.

**완료 기준**: 게이트 5종(`pnpm typecheck` · `pnpm build` · `pnpm test` · `pnpm --filter storybook build` · `pnpm test:unit`) 초록. 카드 「검증」 절 항목이 모두 확인된다.

## 2. 의존과 순서

`S6 → S7 → S8` 순서다. S7 은 목록이 0줄이 된 뒤에만 의미가 있고, S8 의 changeset 은 바뀐 공개 동작을 다 안 뒤에 쓴다.

배치 밖 의존은 둘이다.

- KAN-067 이 먼저 main 에 병합되면 README 줄 번호가 밀린다. 고치기 전에 「글자색 토큰은 그 뒤 면 토큰과 짝지어」 문장으로 자리를 다시 찾는다.
- KAN-068(미배포 수정분 배포)이 먼저 배포되면 이 카드의 changeset 은 그 다음 배포에 실린다. 버전 줄은 고치지 않는다.

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 칸마다 계산하는 템플릿에서 계산 결과가 리터럴처럼 보인다 | `LiteralPaintGate` 가 A·B 에서 같은 검정·흰색을 잡는다 | 그 칸의 합성색과 후보를 수행 내역에 남기고, 후보 순서를 다시 본다. 검사 규칙은 고치지 않는다 |
| 투명도가 아주 낮은 칸은 면이 거의 `canvas.bg` 라 글자색이 `edge.stroke` 로 돌아온다 | 같은 열에서 글자색이 칸마다 바뀜 | 읽히는 것이 목표라 받아들인다. 화면을 수행 내역에 남긴다 |
| 품질 게이트 중 `pnpm test` 가 다른 스토리의 화면을 바꿔 실패한다 | 템플릿 개별 스토리의 play 함수가 글자색을 직접 잰다 | 그 스토리를 찾아 기대값을 `on-*` 기준으로 바꾼다. 스토리 파일이 scope 밖이면 scope 를 넓히고 `dep-check` 를 다시 돈다 |

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-10 유저 선택).**

| 관점 | 이 배치 | 리스크 |
|---|---|---|
| **단일 에이전트(채택, 2026-10-10 유저 선택)** | S6 → S7 → S8 을 한 세션이 차례로 | 게이트 5종이 마지막에 몰린다 |
| 오케스트레이션 | S6 은 배치2 와 함께 병렬로 끝나 있고, 이 배치는 S7·S8 만 메인이 한다 | 병렬 배치에서 넷이 만든 결과를 메인이 합치며 기준 목록 충돌을 푼다 |

S8 을 따로 미룰지는 S7 을 닫은 시점에 정한다.
