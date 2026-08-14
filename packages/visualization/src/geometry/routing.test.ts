import { describe, it, expect } from 'vitest';
import { straightPath, orthogonalPath, buildPath, MIN_TERMINAL_SEGMENT } from './routing';
import type { Point } from './anchors';

// 상류 이슈 P1(축 정렬 엣지의 화살촉이 90° 틀어진다)의 회귀 고정.
// 마커는 전부 orient="auto"(atoms/Marker.tsx)라 **종단 세그먼트의 방향**을 그대로 쓴다.
// 그래서 이 파일이 보는 것은 좌표의 아름다움이 아니라 종단 세그먼트의 길이다.

/**
 * 경로 문자열에서 각 명령의 **끝점**만 뽑는다(Q·C는 제어점을 버리고 마지막 좌표쌍).
 * 클라이언트 게이트(`resume/scripts/render-core.ts`의 `inspectEdgeGeometry`)와 같은 파싱 규칙 —
 * 여기서 초록이면 그쪽 게이트도 초록이어야 한다.
 */
function endpoints(d: string): Point[] {
  const out: Point[] = [];
  for (const m of d.matchAll(/([MLQCmlqc])([^MLQCZmlqcz]*)/g)) {
    const n = (m[2].trim().match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    if (n.length >= 2) out.push({ x: n[n.length - 2], y: n[n.length - 1] });
  }
  return out;
}

function segments(d: string): { from: Point; to: Point; length: number }[] {
  const pts = endpoints(d);
  return pts.slice(1).map((to, i) => {
    const from = pts[i];
    return { from, to, length: Math.hypot(to.x - from.x, to.y - from.y) };
  });
}

/** 길이 0 판정 — 이보다 짧으면 SVG가 방향을 정의하지 못하고 Chromium은 마커를 0°로 그린다. */
const ZERO_EPS = 0.01;

/**
 * 종단 세그먼트의 최소 길이 — 판정 기준은 "정확히 0"이 아니라 이 값이다(근거는 소스 주석).
 * 기준값은 소스와 한 곳에서 온다.
 */
const MIN_TERMINAL = MIN_TERMINAL_SEGMENT;

function terminals(d: string): { start: number; end: number } {
  const segs = segments(d);
  expect(segs.length).toBeGreaterThan(0);
  return { start: segs[0].length, end: segs[segs.length - 1].length };
}

function expectNoZeroSegment(d: string): void {
  const zero = segments(d).filter((s) => s.length <= ZERO_EPS);
  expect({ d, zeroSegments: zero.length }).toEqual({ d, zeroSegments: 0 });
}

function expectMarkerReadableTerminals(d: string): void {
  const { start, end } = terminals(d);
  expect({ d, start: start >= MIN_TERMINAL, end: end >= MIN_TERMINAL }).toEqual({
    d,
    start: true,
    end: true,
  });
}

// ──────────────────────────────────────────────
// 1. 축 정렬 — 종단이 길이 0이 되어 화살촉 방향이 아예 정의되지 않는다
// ──────────────────────────────────────────────
const AXIS_ALIGNED: [label: string, from: Point, to: Point][] = [
  ['세로 정렬 from.x === to.x', { x: 100, y: 40 }, { x: 100, y: 160 }],
  ['세로 정렬 · 역방향', { x: 100, y: 160 }, { x: 100, y: 40 }],
  ['가로 정렬 from.y === to.y', { x: 40, y: 100 }, { x: 160, y: 100 }],
  ['가로 정렬 · 역방향', { x: 160, y: 100 }, { x: 40, y: 100 }],
  // 자체 저장소 재현: G1Templates FlowchartChildrenMode n2(240,40,120×60) → n3(240,170,120×60)
  ['자체 재현 FlowchartChildrenMode n2→n3', { x: 300, y: 101.25 }, { x: 300, y: 168.75 }],
];

describe('orthogonalPath · 축 정렬', () => {
  it.each(AXIS_ALIGNED)('%s — 길이 0 세그먼트가 없다', (_label, from, to) => {
    expectNoZeroSegment(orthogonalPath(from, to));
  });

  it.each(AXIS_ALIGNED)('%s — 종단이 마커 길이 이상이다', (_label, from, to) => {
    expectMarkerReadableTerminals(orthogonalPath(from, to));
  });

  it.each(AXIS_ALIGNED)('%s — 직선과 같은 그림이므로 straightPath에 위임한다', (_label, from, to) => {
    expect(orthogonalPath(from, to)).toBe(straightPath(from, to));
  });

  it('cornerRadius=0 에서도 축 정렬은 직선이다', () => {
    const from = { x: 100, y: 40 };
    const to = { x: 100, y: 160 };
    expect(orthogonalPath(from, to, 0)).toBe(straightPath(from, to));
  });
});

// ──────────────────────────────────────────────
// 2. 근축 — 길이 0은 아니지만 화살촉이 종단 구간보다 길어 옆을 본다
// ──────────────────────────────────────────────
const NEAR_AXIS: [label: string, from: Point, to: Point][] = [
  ['dx=1 (종단 0.5)', { x: 100, y: 40 }, { x: 101, y: 160 }],
  ['dx=3 (종단 1.5)', { x: 100, y: 40 }, { x: 103, y: 160 }],
  ['dx=7 (종단 3.5)', { x: 100, y: 40 }, { x: 107, y: 160 }],
  // dx === cornerRadius*2 는 조건이 `dx < cornerRadius*2` 라 라운드 분기로 들어가고,
  // 거기서 종단 L 이 (mx + cr) → to.x 라 **정확히 길이 0**이 된다. 리포트가 놓친 경계다.
  ['dx=8 = cornerRadius*2 (라운드 분기 · 종단 0)', { x: 100, y: 40 }, { x: 108, y: 160 }],
  ['dx=16 (라운드 분기 · 종단 4)', { x: 100, y: 40 }, { x: 116, y: 160 }],
  ['dy=1 근축 · 가로 방향', { x: 40, y: 100 }, { x: 160, y: 101 }],
];

describe('orthogonalPath · 근축', () => {
  it.each(NEAR_AXIS)('%s — 길이 0 세그먼트가 없다', (_label, from, to) => {
    expectNoZeroSegment(orthogonalPath(from, to));
  });

  it.each(NEAR_AXIS)('%s — 종단이 마커 길이 이상이다', (_label, from, to) => {
    expectMarkerReadableTerminals(orthogonalPath(from, to));
  });
});

// ──────────────────────────────────────────────
// 3. 일반 경로 불변 — 수정이 기존 그림의 좌표를 움직이지 않는다
// ──────────────────────────────────────────────
describe('orthogonalPath · 일반 경로 불변', () => {
  it('대각 경로(라운드 분기)의 d 문자열이 그대로다', () => {
    expect(orthogonalPath({ x: 0, y: 0 }, { x: 200, y: 100 })).toBe(
      'M 0 0 L 96 0 Q 100 0 100 4 L 100 96 Q 100 100 104 100 L 200 100',
    );
  });

  it('납작한 경로(모서리 없는 분기)의 d 문자열이 그대로다', () => {
    // dy=3 < cornerRadius*2 라 모서리 없는 분기지만 종단은 100 — 고칠 대상이 아니다.
    expect(orthogonalPath({ x: 0, y: 0 }, { x: 200, y: 3 })).toBe('M 0 0 L 100 0 L 100 3 L 200 3');
  });

  it('역방향 대각 경로의 d 문자열이 그대로다', () => {
    expect(orthogonalPath({ x: 200, y: 100 }, { x: 0, y: 0 })).toBe(
      'M 200 100 L 104 100 Q 100 100 100 96 L 100 4 Q 100 0 96 0 L 0 0',
    );
  });

  it('일반 경로는 종단이 마커 길이 이상이다', () => {
    expectMarkerReadableTerminals(orthogonalPath({ x: 0, y: 0 }, { x: 200, y: 100 }));
    expectMarkerReadableTerminals(orthogonalPath({ x: 0, y: 0 }, { x: 200, y: 3 }));
  });
});

// ──────────────────────────────────────────────
// 4. buildPath — waypoints 경로도 같은 결함을 갖는다
// ──────────────────────────────────────────────
describe('buildPath · waypoints', () => {
  it('연속 중복 waypoint 가 길이 0 세그먼트를 만들지 않는다', () => {
    const d = buildPath({ x: 0, y: 0 }, { x: 100, y: 100 }, 'orthogonal', 4, [
      { x: 50, y: 0 },
      { x: 50, y: 0 },
    ]);
    expectNoZeroSegment(d);
  });

  it('마지막 waypoint 가 to 와 같아도 종단이 살아 있다', () => {
    const d = buildPath({ x: 0, y: 0 }, { x: 100, y: 100 }, 'orthogonal', 4, [
      { x: 50, y: 0 },
      { x: 100, y: 100 },
    ]);
    expectNoZeroSegment(d);
    expectMarkerReadableTerminals(d);
  });

  it('첫 waypoint 가 from 과 같아도 시작 종단이 살아 있다', () => {
    const d = buildPath({ x: 0, y: 0 }, { x: 100, y: 100 }, 'orthogonal', 4, [
      { x: 0, y: 0 },
      { x: 50, y: 50 },
    ]);
    expectNoZeroSegment(d);
    expectMarkerReadableTerminals(d);
  });

  it('정상 waypoints 경로는 그대로다', () => {
    expect(
      buildPath({ x: 0, y: 0 }, { x: 100, y: 100 }, 'orthogonal', 4, [{ x: 50, y: 0 }]),
    ).toBe('M 0 0 L 50 0 L 100 100');
  });
});

// ──────────────────────────────────────────────
// 5. buildPath — routing 위임
// ──────────────────────────────────────────────
describe('buildPath · routing 위임', () => {
  const from = { x: 10, y: 20 };
  const to = { x: 110, y: 80 };

  it("routing='straight' 는 straightPath", () => {
    expect(buildPath(from, to, 'straight')).toBe(straightPath(from, to));
  });

  it("routing='orthogonal' 은 orthogonalPath", () => {
    expect(buildPath(from, to, 'orthogonal', 4)).toBe(orthogonalPath(from, to, 4));
  });

  it("routing='curved' 는 C 명령을 쓴다", () => {
    expect(buildPath(from, to, 'curved')).toMatch(/^M .* C /);
  });
});
