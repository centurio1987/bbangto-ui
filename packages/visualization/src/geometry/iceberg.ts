/**
 * Iceberg 레이아웃 — 순수 함수. 수면 위 삼각형 tip + 수면 아래 사다리꼴 밴드.
 * 밴드는 빙산 폴리곤 경사(아래로 갈수록 좁아짐)를 따라 leftX/rightX가 계산된다.
 * 정밀 검증은 iceberg.test.ts.
 */

export interface IcebergBand {
  readonly index: number;
  readonly y: number;
  readonly height: number;
  /** 밴드 수직 중심에서의 폴리곤 좌측 x. */
  readonly leftX: number;
  /** 밴드 수직 중심에서의 폴리곤 우측 x. */
  readonly rightX: number;
}

export interface IcebergResult {
  readonly waterlineY: number;
  readonly tip: {
    readonly apex: { x: number; y: number };
    readonly baseLeft: { x: number; y: number };
    readonly baseRight: { x: number; y: number };
  };
  /** 수중 본체 폴리곤(수면선 최대폭 → 바닥 점). */
  readonly body: {
    readonly topLeft: { x: number; y: number };
    readonly topRight: { x: number; y: number };
    readonly bottom: { x: number; y: number };
  };
  readonly bands: IcebergBand[];
}

export interface IcebergOptions {
  width: number;
  height: number;
  /** 수면선 세로 비율(0.1~0.9로 clamp). 기본 0.28. */
  waterlineRatio?: number;
  /** 수면 아래 밴드 수. */
  layers: number;
}

const TIP_HALF_RATIO = 0.18; // 수면 위 tip 밑변 반폭.
const BODY_HALF_RATIO = 0.45; // 수면선에서 수중 본체 반폭.
const TOP_MARGIN_RATIO = 0.03; // apex 상단 여백.

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function icebergLayout(opts: IcebergOptions): IcebergResult {
  const { width, height, layers } = opts;
  const cx = width / 2;
  const ratio = clamp(opts.waterlineRatio ?? 0.28, 0.1, 0.9);
  const waterlineY = height * ratio;

  const tipHalf = width * TIP_HALF_RATIO;
  const tip = {
    apex: { x: cx, y: height * TOP_MARGIN_RATIO },
    baseLeft: { x: cx - tipHalf, y: waterlineY },
    baseRight: { x: cx + tipHalf, y: waterlineY },
  };

  const bodyHalf = width * BODY_HALF_RATIO;
  const submerged = height - waterlineY;
  const body = {
    topLeft: { x: cx - bodyHalf, y: waterlineY },
    topRight: { x: cx + bodyHalf, y: waterlineY },
    bottom: { x: cx, y: height },
  };

  const bands: IcebergBand[] = [];
  if (layers > 0) {
    const bandH = submerged / layers;
    // 폴리곤: 수면선에서 bodyHalf → 바닥(height)에서 0으로 선형 축소.
    const halfAt = (y: number) => bodyHalf * ((height - y) / submerged);
    for (let i = 0; i < layers; i++) {
      const y = waterlineY + bandH * i;
      const yCenter = y + bandH / 2;
      const hw = halfAt(yCenter);
      bands.push({ index: i, y, height: bandH, leftX: cx - hw, rightX: cx + hw });
    }
  }

  return { waterlineY, tip, body, bands };
}
