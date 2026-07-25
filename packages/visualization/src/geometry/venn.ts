/** Venn 원 배치 — 순수 함수. 2원 정밀, 3원 대칭 근사. 정밀 검증은 venn.test.ts. */

export interface VennSet {
  id: string;
  /** 집합 크기(면적에 비례 → 반지름 = sqrt). */
  size: number;
}

export interface VennBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VennCircle {
  id: string;
  cx: number;
  cy: number;
  r: number;
}

/**
 * 2~3개 집합의 Venn 원 배치. 반지름은 sqrt(size)에 비례(면적 ∝ size).
 * 2원: 중심 거리 = 0.62·(r1+r2)로 겹침 보장(완전 포함 아님). 3원: 정삼각 대칭 근사.
 * 마지막에 bounding box를 박스에 맞춰 균등 스케일·평행이동 → 항상 박스 내부.
 */
export function vennCircles(sets: readonly VennSet[], box: VennBox): VennCircle[] {
  const n = sets.length;
  if (n === 0) return [];

  const rawR = sets.map((s) => Math.sqrt(Math.max(1e-6, s.size)));

  // 초기 배치(정규화 전 좌표계).
  let pos: Array<{ x: number; y: number }>;
  if (n === 1) {
    pos = [{ x: 0, y: 0 }];
  } else if (n === 2) {
    const d = 0.62 * (rawR[0] + rawR[1]);
    pos = [{ x: -d / 2, y: 0 }, { x: d / 2, y: 0 }];
  } else {
    // 3개(그 이상은 정다각 대칭 근사): 정n각형 꼭짓점.
    const meanR = rawR.reduce((s, r) => s + r, 0) / n;
    const placeR = meanR * 1.05;
    pos = rawR.map((_, i) => {
      const a = (-90 + (360 / n) * i) * (Math.PI / 180);
      return { x: placeR * Math.cos(a), y: placeR * Math.sin(a) };
    });
  }

  // bounding box 계산 → 박스에 맞춰 스케일.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  pos.forEach((p, i) => {
    minX = Math.min(minX, p.x - rawR[i]);
    minY = Math.min(minY, p.y - rawR[i]);
    maxX = Math.max(maxX, p.x + rawR[i]);
    maxY = Math.max(maxY, p.y + rawR[i]);
  });
  const extentW = maxX - minX || 1;
  const extentH = maxY - minY || 1;
  const pad = 0.9;
  const scale = Math.min((box.width * pad) / extentW, (box.height * pad) / extentH);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const boxCx = box.x + box.width / 2;
  const boxCy = box.y + box.height / 2;

  return sets.map((s, i) => ({
    id: s.id,
    cx: boxCx + (pos[i].x - centerX) * scale,
    cy: boxCy + (pos[i].y - centerY) * scale,
    r: rawR[i] * scale,
  }));
}
