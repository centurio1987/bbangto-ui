/**
 * 피시본(이시카와) 뼈대 앵커 — 순수 함수. 수평 척추 + 인덱스 홀짝 상/하 교차 대각 뼈대.
 * 전용 레이아웃 엔진 아님(최소 산술). 앵커 좌표 결정성 확보용으로만 추출.
 * categories 0→spine만, 1→top 한쪽. 정밀 검증은 fishbone.test.ts.
 */

export interface FishboneBone {
  /** 뼈대 꼬리(척추에서 먼 끝). */
  readonly x1: number;
  readonly y1: number;
  /** 뼈대 앵커(척추 위). */
  readonly x2: number;
  readonly y2: number;
  readonly side: 'top' | 'bottom';
  readonly index: number;
}

export interface FishboneResult {
  readonly spine: { x1: number; y1: number; x2: number; y2: number };
  readonly head: { x: number; y: number };
  readonly bones: FishboneBone[];
}

export interface FishboneOptions {
  categories: number;
  spineLength: number;
  /** 척추 y좌표(기본 60). */
  spineY?: number;
  /** 뼈대 길이(기본 48). */
  boneLength?: number;
  /** 척추 대비 뼈대 각도(도, 기본 40). */
  boneAngle?: number;
}

export function fishboneLayout(opts: FishboneOptions): FishboneResult {
  const { categories, spineLength, spineY = 60, boneLength = 48, boneAngle = 40 } = opts;
  const spine = { x1: 0, y1: spineY, x2: spineLength, y2: spineY };
  const head = { x: spineLength, y: spineY };
  const bones: FishboneBone[] = [];
  if (categories <= 0) return { spine, head, bones };

  const rad = (boneAngle * Math.PI) / 180;
  const dx = Math.cos(rad) * boneLength;
  const dy = Math.sin(rad) * boneLength;

  // 뼈대 부착 지점: 척추 [12%, 92%] 구간에 균등 배치(head 쪽 여백).
  const start = spineLength * 0.12;
  const usable = spineLength * 0.8;
  const gap = usable / categories;

  for (let i = 0; i < categories; i++) {
    const side: 'top' | 'bottom' = i % 2 === 0 ? 'top' : 'bottom';
    const ax = start + gap * (i + 0.5);
    const ay = spineY;
    const tx = ax - dx; // 꼬리는 head 반대(좌측)로
    const ty = side === 'top' ? ay - dy : ay + dy;
    bones.push({ x1: tx, y1: ty, x2: ax, y2: ay, side, index: i });
  }
  return { spine, head, bones };
}
