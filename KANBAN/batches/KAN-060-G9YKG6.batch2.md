---
card: KAN-060-G9YKG6
batch: 2
created: 2026-10-08
branch: KAN-060-G9YKG6
status: 계획
steps: S3, S4, S5
---

# KAN-060-G9YKG6 배치2 — 31칸의 값을 고쳐 초록으로 돌리고 마무리한다

카드: [KAN-060-G9YKG6.md](../cards/KAN-060-G9YKG6.md) · 범위 `S3` · `S4` · `S5`
선행: [배치1](KAN-060-G9YKG6.batch1.md)

> **이 문서는 착수 전 계획이다.** 수행 내역은 카드 실행 문서의 「수행 내역」에 있다.

값은 전략 「새 값」 표에 이미 정해져 있다(색조는 두고 명도만 낮춘 첫 3:1 값). 이 배치는 그 값을 옮겨 적고, 배치1의 빨강이 전부 초록으로 바뀌는지 본다.

## 1. 작업 패키지

### WP1 · `S3` foundation 21개

`packages/foundations/src/themes/<이름>.ts` 21개 파일에서 `border.focus` 한 칸씩 바꾼다. 파일마다 `focus:` 줄이 하나뿐인 것을 계획 때 확인했다.

**완료 기준**: `focusContrast.test.ts` 초록, foundations vitest 전체 초록, 배치1의 실제 입력 항목(neon-yellow) 초록.

### WP2 · `S4` style guide 9개 파일 · 색 스킴 10개

| 파일 | 색 스킴 | 지금 칸 |
|---|---|---|
| `neobrutalismEditorial.tsx` | `default` | `focus: NEO.gold` |
| `skeuomorphismTactile.tsx` | `default` · `green` | 리터럴 둘 |
| `kawaiiPastel.tsx` | `lavender` | 리터럴 |
| `tactileTexture.tsx` | `default` | `focus: CANDY` |
| `halftoneDotPrint.tsx` | `default` | `focus: CYAN` |
| `punkGrungeGraffiti.tsx` | `default` | `focus: MAGENTA` |
| `aiSurrealGradient3d.tsx` | `light` | 리터럴 |
| `pixelArtRetro.tsx` | `arcade-paper` | 리터럴 |
| `iridescentChrome.tsx` | `light` | 리터럴 |

상수를 쓰는 넷은 상수를 고치지 않는다 — 그 상수가 `primary`·장식에도 쓰인다. `focus:` 칸에만 새 값을 쓴다. 파일 안 관례가 상수 객체면(`NEO`) 거기에 새 이름을 더하고, 아니면 리터럴로 쓴다.

**완료 기준**: style-guide-catalog vitest 전체 초록(포커스 대비 · 본문 대비 · 매니페스트), 9개 `FoundationPresets` 스토리 초록.

### WP3 · `S5` 문서와 마무리

- README style guide 저작 「대비 게이트」 단계(`README.md:719` 부근)에 포커스 대비 한 단락 — 무엇을 재는지(`border.focus` 대 `base`·`elevated`, 3:1), 반투명 `elevated` 는 `base` 위에 합성해 잰다는 것, 어기면 어느 테스트가 빨개지는지.
- changeset `.changeset/kan-060-focus-contrast.md` — tokens minor(새 내보내기 셋) · foundations patch · style-guide-catalog patch. 바뀐 색 스킴 이름을 적는다.
- 게이트 5종, 화면 확인(neon-yellow · cosmonaut · Neobrutalism default 실제 Tab), 검토서.

**완료 기준**: 게이트 5종 초록, 검토로 이동.

## 2. 의존과 순서

S3 과 S4 는 서로 다른 패키지의 다른 파일이라 순서가 없다. S5 는 둘이 끝난 뒤다(게이트 5종이 둘 다 초록이어야 한다).

## 3. 리스크

| 리스크 | 징후 | 대응 |
|---|---|---|
| 같은 상수를 쓰는 다른 칸까지 바뀐다 | `git diff` 에 `focus:` 밖의 줄이 섞임 | 카드 「검증」 절 「추가 확인」의 diff 대조로 잡는다 |
| 스냅샷 유일성 확인이 깨진다 | `FoundationPresets` 스토리의 「preset 끼리 CSS 변수가 달라야 한다」 실패 | 값이 바뀌어도 같은 style guide 안의 색 스킴끼리 같아질 일은 계획 표상 없다. 나면 그 색 스킴 둘의 변수를 비교해 보고 멈춘다 |
| 새 값이 3.00~3.07 로 여유가 없다 | 게이트가 반올림 경계에서 흔들림 | 계산은 같은 `contrastRatio` 다. 3.00 인 둘(`jungle-night`·`obsidian-gold`)이 경계에서 떨어지면 명도를 한 단계(0.005) 더 낮춘 값을 쓰고 표를 고친다 |

되돌리기 어려운 지점은 없다. 색 값은 리터럴 한 칸씩이다.

## 4. 착수 시점 판단

**수행 관점: 단일 에이전트(2026-10-08 유저 선택, 배치1 과 같다).** 배치1 이 계획대로 닫혔다 — 단위 게이트 빨강 31건이 전략 표와 이름·값까지 같고, 브라우저 쪽은 neon-yellow 1.03 · style guide 스토리 9개 빨강이다. S5 를 다음 배치로 미루지 않는다. S3·S4 가 값 옮겨 적기라 작고, 게이트 5종은 S3·S4 가 끝나야 의미가 있다.
