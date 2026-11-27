import { describe, it, expect } from 'vitest';
import { fitNestedBoxes, type NestItem } from './nesting';

// KAN-082.3 검토 2번 — 「추천대로(좌표는 데이터가 준다), 그러나 레이아웃 깨짐, 글자, 도식 겹침 등이 발생하지 않도록 해야 한다」.
// 좌표는 데이터가 준 그대로 두고, 그리기 전에 부모 상자만 맞춘다 — 자식을 여백과 함께 담고, 글자 띠만큼 비워 둔다.

const box = (m: Map<string, { x: number; y: number; width: number; height: number }>, id: string) => m.get(id)!;

describe('fitNestedBoxes — 중첩 상자 맞추기', () => {
  it('자식이 부모 밖으로 나가면 부모가 자식을 여백과 함께 담는다', () => {
    const items: NestItem[] = [
      { id: 'p', x: 0, y: 0, width: 100, height: 100 },
      { id: 'c', x: 60, y: 60, width: 80, height: 80, parent: 'p' },
    ];
    const m = fitNestedBoxes(items, () => ({ top: 10, right: 10, bottom: 10, left: 10 }));
    expect(box(m, 'c')).toEqual({ x: 60, y: 60, width: 80, height: 80 });
    expect(box(m, 'p')).toEqual({ x: 0, y: 0, width: 150, height: 150 });
  });

  it('자식이 머리 글자 띠 안으로 들어오면 부모가 위로 커진다', () => {
    const items: NestItem[] = [
      { id: 'p', x: 0, y: 50, width: 200, height: 150 },
      { id: 'c', x: 20, y: 60, width: 80, height: 60, parent: 'p' },
    ];
    const m = fitNestedBoxes(items, () => ({ top: 40, right: 10, bottom: 10, left: 10 }));
    expect(box(m, 'p').y).toBe(20);
    // 아래쪽 끝은 그대로다(위로만 커진다)
    expect(box(m, 'p').y + box(m, 'p').height).toBe(200);
  });

  it('손자가 밖으로 나가면 부모와 조부모가 차례로 커진다', () => {
    const items: NestItem[] = [
      { id: 'g', x: 0, y: 0, width: 300, height: 200 },
      { id: 'p', x: 20, y: 40, width: 200, height: 140, parent: 'g' },
      { id: 'c', x: 40, y: 80, width: 260, height: 60, parent: 'p' },
    ];
    const m = fitNestedBoxes(items, () => ({ top: 30, right: 10, bottom: 10, left: 10 }));
    expect(box(m, 'p').x + box(m, 'p').width).toBe(310);
    expect(box(m, 'g').x + box(m, 'g').width).toBe(320);
  });

  it('데이터가 이미 맞으면 상자는 그대로다', () => {
    const items: NestItem[] = [
      { id: 'aws', x: 10, y: 10, width: 640, height: 300 },
      { id: 'ec2', x: 30, y: 60, width: 340, height: 230, parent: 'aws' },
      { id: 'api', x: 50, y: 120, width: 140, height: 90, parent: 'ec2' },
    ];
    const m = fitNestedBoxes(items, () => ({ top: 40, right: 10, bottom: 10, left: 10 }));
    for (const it of items) expect(box(m, it.id)).toEqual({ x: it.x, y: it.y, width: it.width, height: it.height });
  });

  it('최소 폭 · 높이는 자식이 없는 상자도 키운다', () => {
    const m = fitNestedBoxes([{ id: 'n', x: 0, y: 0, width: 40, height: 20 }], () => ({ minWidth: 120, minHeight: 50 }));
    expect(box(m, 'n')).toEqual({ x: 0, y: 0, width: 120, height: 50 });
  });

  it('부모가 서로를 가리키는 순환은 끊고 둘 다 맨 위 상자로 둔다', () => {
    const items: NestItem[] = [
      { id: 'a', x: 0, y: 0, width: 50, height: 50, parent: 'b' },
      { id: 'b', x: 100, y: 0, width: 50, height: 50, parent: 'a' },
    ];
    const m = fitNestedBoxes(items, () => ({ top: 10, right: 10, bottom: 10, left: 10 }));
    expect(box(m, 'a')).toEqual({ x: 0, y: 0, width: 50, height: 50 });
    expect(box(m, 'b')).toEqual({ x: 100, y: 0, width: 50, height: 50 });
  });

  it('없는 부모를 가리키면 맨 위 상자로 둔다', () => {
    const m = fitNestedBoxes([{ id: 'a', x: 0, y: 0, width: 50, height: 50, parent: 'nope' }]);
    expect(box(m, 'a')).toEqual({ x: 0, y: 0, width: 50, height: 50 });
  });
});
