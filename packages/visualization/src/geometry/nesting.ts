/**
 * 중첩 상자 맞추기 — 좌표는 데이터가 준 그대로 두고, 부모 상자만 자식을 담도록 키운다(KAN-082.3 검토 2번).
 *
 * 배포 도식처럼 상자 안에 상자가 들어가는 템플릿은 자동 배치를 하지 않는다 — 다른 템플릿과 같이 좌표는 데이터가 준다.
 * 다만 자식이 부모 밖으로 나가거나 부모의 이름 글자 띠 안으로 들어온 데이터를 그대로 그리면 상자가 깨지고 글자가 겹친다.
 * 그래서 그리기 전에 깊은 상자부터 거슬러 올라가며 부모를 키운다. 자식 좌표는 한 번도 바꾸지 않고, 데이터가 이미 맞으면
 * 어느 상자도 바뀌지 않는다. 형제 상자끼리 겹치는 것은 데이터 몫이라 여기서 옮기지 않는다.
 */

export interface NestBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NestItem extends NestBox {
  id: string;
  /** 이 상자를 품는 상자 id. 없는 id 이거나 순환이면 맨 위 상자로 본다. */
  parent?: string;
}

/** 상자 하나가 비워 둘 여백 — 자식이 있을 때 자식들의 테두리 상자와 부모 테두리 사이 최소 거리, 그리고 최소 크기. */
export interface NestRoom {
  /** 자식 위 — 이름 · 스테레오타입 · 기술 글자 띠 */
  top?: number;
  right?: number;
  /** 자식 아래 — artifact 칩 띠 */
  bottom?: number;
  left?: number;
  /** 글자 · 칩이 상자를 넘지 않을 최소 폭 · 높이(자식이 없어도 적용한다) */
  minWidth?: number;
  minHeight?: number;
}

/** 부모 사슬이 순환하거나 끊긴 상자는 부모가 없는 것으로 본다. */
function validParents(items: readonly NestItem[]): Map<string, string | undefined> {
  const byId = new Map(items.map((it) => [it.id, it]));
  const out = new Map<string, string | undefined>();
  for (const it of items) {
    let ok = it.parent !== undefined && byId.has(it.parent);
    if (ok) {
      const seen = new Set<string>([it.id]);
      for (let p: string | undefined = it.parent; p !== undefined; p = byId.get(p)?.parent) {
        if (seen.has(p)) {
          ok = false;
          break;
        }
        if (!byId.has(p)) break;
        seen.add(p);
      }
    }
    out.set(it.id, ok ? it.parent : undefined);
  }
  return out;
}

/**
 * 깊은 상자부터 부모를 키운 결과를 id 별로 낸다. `room` 은 상자마다 비워 둘 여백을 돌려준다(자식이 있는지 함께 받는다).
 * 같은 입력이면 같은 결과를 낸다.
 */
export function fitNestedBoxes(
  items: readonly NestItem[],
  room: (item: NestItem, hasKids: boolean) => NestRoom = () => ({}),
): Map<string, NestBox> {
  const parentOf = validParents(items);
  const kids = new Map<string, string[]>();
  for (const it of items) {
    const p = parentOf.get(it.id);
    if (p !== undefined) kids.set(p, [...(kids.get(p) ?? []), it.id]);
  }
  const depth = (id: string): number => {
    let d = 0;
    for (let p = parentOf.get(id); p !== undefined; p = parentOf.get(p)) d++;
    return d;
  };
  const order = items.map((it, i) => ({ it, i, d: depth(it.id) })).sort((a, b) => b.d - a.d || a.i - b.i);

  const out = new Map<string, NestBox>();
  for (const { it } of order) {
    const ks = kids.get(it.id) ?? [];
    const r = room(it, ks.length > 0);
    let left = it.x;
    let top = it.y;
    let right = it.x + it.width;
    let bottom = it.y + it.height;
    if (ks.length) {
      const bs = ks.map((k) => out.get(k)!);
      left = Math.min(left, Math.min(...bs.map((b) => b.x)) - (r.left ?? 0));
      top = Math.min(top, Math.min(...bs.map((b) => b.y)) - (r.top ?? 0));
      right = Math.max(right, Math.max(...bs.map((b) => b.x + b.width)) + (r.right ?? 0));
      bottom = Math.max(bottom, Math.max(...bs.map((b) => b.y + b.height)) + (r.bottom ?? 0));
    }
    right = Math.max(right, left + (r.minWidth ?? 0));
    bottom = Math.max(bottom, top + (r.minHeight ?? 0));
    out.set(it.id, { x: left, y: top, width: right - left, height: bottom - top });
  }
  return out;
}
