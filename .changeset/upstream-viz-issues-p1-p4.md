---
"@centurio1987/bbangto-ui-visualization": minor
"@centurio1987/bbangto-ui-tokens": minor
---

상류 이슈 4건 해소 — 축 정렬 엣지 화살촉 · 콘텐츠 박스 · 경계 라벨 · 라벨 서체

클라이언트가 올린 4건(P1~P4)을 고쳤다. 각 항목마다 **되돌릴 수 있는 우회**를 적는다.

**P1 · 축 정렬 엣지에서 화살촉이 90° 틀어지던 문제** (`orthogonalPath`)

- 축 정렬(`from.x === to.x` / `from.y === to.y`)은 `straightPath`에 위임한다. 그림은 같고 길이 0
  종단 세그먼트가 사라져 `orient="auto"` 마커의 방향이 정의된다.
- 리포트가 제안한 "정확히 0" 판정보다 한 단계 넓다. 종단 구간이 마커(기본 8 user unit)보다
  짧으면 화살촉이 구간을 덮어 길이가 0이 아니어도 옆을 본 그림이 된다 — 새 상수
  `MIN_TERMINAL_SEGMENT`(=8) 아래면 직선으로 잇는다. `dx === cornerRadius * 2`처럼
  **모서리 분기에서도 길이 0 종단이 나오던 경계**가 여기 함께 잡힌다.
- `buildPath`의 waypoints 경로도 연속 중복 점을 접는다(같은 결함).
- 되돌릴 우회: 세로 엣지의 `routing="straight"` 명시. 게이트 2종(`lint-diagrams.ts` ·
  `inspectEdgeGeometry`)은 그대로 둘 것 — 상류 회귀를 계속 잡는다.

**P2 · 형태별 콘텐츠 박스** (신규 `contentBox(shape, bbox, opts?)`)

- 도형 안에서 글자를 넣어도 되는 사각형을 돌려준다. cylinder·diamond·hexagon·trapezoid·
  parallelogram·cube·folder·subroutine·circle·ellipse·stadium·doubleCircle·rounded 지원.
- cylinder 뚜껑 상수는 `cylinderCapHeight`(+`CYLINDER_CAP_RATIO/MIN/MAX`)로 승격해
  `cylinderPaths`와 한 값을 공유한다. `cubeDepth`·`subroutineIndent`·`doubleCircleInnerRadius`·
  `folderTabHeight`도 같은 이유로 export한다 — `Node`가 그리는 값과 계산이 갈릴 수 없다.
- **주의**: cylinder의 실제 콘텐츠 높이는 리포트가 계산한 `h - 2*cap`(h=62 → 43px)이 아니라
  `h - 3*cap`(h=62 → 34.1px)이다. body path의 윗변이 위 뚜껑의 **아랫 호**라 가로 중앙에서
  `y + 2*cap`까지 내려온다(브라우저 `isPointInFill` 실측). 복제해 둔 계산식을 지울 때 이 값으로 맞출 것.
- `NodeLabel`에 `height?`·`shape?`를 추가했다. 주면 콘텐츠 박스 안으로 줄 수를 맞추고,
  줄이 줄어 낱말이 빠지면 말줄임으로 드러낸다. 안 주면 종전 동작 그대로다.
- 되돌릴 우회: `_frame.tsx`의 `cap = clamp(h*0.15,4,12)` 복제와 `database`/`decision` 치수 주석.

**P3 · 경계 라벨이 프레임 선에 얹히던 문제** (`Boundary`)

- 기본 배치는 그대로 두고(기존 그림 좌표 보존) 라벨 뒤에 배경색 halo를 깐다
  (`paint-order: stroke`) — 선이 글자를 가로지르지 않는다. `labelHalo` / `labelHaloColor` /
  `labelHaloWidth`로 조절한다.
- `labelPlacement?: 'on-line' | 'outside' | 'inside'` 추가. 밖/안으로 완전히 빼면 halo 없이도 비껴간다.
- 실측: fontSize 11 기준 라벨 잉크 하단과 프레임 스트로크 밴드 사이 여유는 2.3px뿐이라
  디센더가 있는 라벨(`Payment gateway`)은 기본 두께 1.5에서 0.32px 겹쳤다.
- 되돌릴 우회: `_frame.tsx`가 `Boundary`에 label을 넘기지 않고 직접 `<text>`로 그리는 것.

**P4 · 라벨 기본 서체가 monoFont라 한글이 폴백으로 떨어지던 문제**

- `typography.labelFont`를 **optional**로 추가했다(required면 스타일가이드 전체가 깨진다).
- 신규 `resolveLabelFont(label, explicit?)` — 명시값 > `labelFont` 토큰 > 스크립트 판정
  (비라틴이면 `titleFont`, 아니면 `monoFont`). 판정 함수 `hasNonAsciiScript`도 export한다.
  라틴 확장·일반 구두점·통화기호(`«»`·`café`·`—`·`₩`)는 라틴으로 본다.
- 적용: `Boundary`·`Lane`·`EdgeLabel`·`Tag`·`Axis`(틱 라벨)·`MilestoneMarker` ·
  `ClassBox`·`EntityTable` · 호출자 문자열을 그리는 patterns/templates 28곳.
  축 눈금 수치·순번·델타처럼 항상 라틴인 자리는 mono를 유지한다.
- 되돌릴 우회: `_frame.tsx`의 `isLatin()` 분기.
