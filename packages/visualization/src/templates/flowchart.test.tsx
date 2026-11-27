import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Flowchart } from './Flowchart';

// KAN-082.1 검토 3번 — 플로우차트에 돌아가는 선(S19).
// Flowchart 선 데이터가 붙을 변(fromSide · toSide)과 꺾는 점(waypoints)을 받아, 「재시도 → 결제 시도」처럼 돌아가는
// 선을 정방향 선과 겹치지 않게 그릴 수 있어야 한다.

const TRY = { x: 20, y: 70, width: 120, height: 56 };
const RETRY = { x: 220, y: 220, width: 120, height: 56 };

function connector(html: string, nth: number): { x: number; y: number }[] {
  const ds = [...html.matchAll(/<path[^>]*data-viz-part="connector"[^>]*>/g)].map((m) => m[0].match(/\bd="([^"]+)"/)![1]);
  const nums = ds[nth].match(/-?[\d.]+/g)!.map(Number);
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: nums[i], y: nums[i + 1] });
  return pts;
}

describe('Flowchart — 붙을 변 · 꺾는 점 (KAN-082)', () => {
  const html = renderToStaticMarkup(
    <Flowchart
      data={{
        nodes: [
          { id: 'try', ...TRY, label: '결제 시도', shape: 'rounded' },
          { id: 'ok', x: 210, y: 60, width: 140, height: 76, label: '결제 성공?', shape: 'diamond' },
          { id: 'retry', ...RETRY, label: '재시도', shape: 'rounded' },
        ],
        edges: [
          { id: 'e-try', from: 'try', to: 'ok' },
          { id: 'e-fail', from: 'ok', to: 'retry', label: '실패' },
          { id: 'e-back', from: 'retry', to: 'try', fromSide: 'left', toSide: 'bottom', waypoints: [{ x: 80, y: 248 }] },
        ],
      }}
    />,
  );

  it('돌아가는 선은 재시도의 왼쪽 변에서 나와 결제 시도의 아래 변으로 들어간다', () => {
    const pts = connector(html, 2);
    const first = pts[0];
    const last = pts[pts.length - 1];
    expect(first.x).toBeLessThan(RETRY.x);
    expect(Math.abs(first.y - (RETRY.y + RETRY.height / 2))).toBeLessThan(0.01);
    expect(last.y).toBeGreaterThan(TRY.y + TRY.height);
    expect(Math.abs(last.x - (TRY.x + TRY.width / 2))).toBeLessThan(0.01);
  });

  it('돌아가는 선은 정방향 선(결제 시도 → 결제 성공?)과 겹치는 구간이 없다', () => {
    const fwd = connector(html, 0);
    const back = connector(html, 2);
    const fwdY = fwd[0].y; // 정방향 선은 결제 시도 오른쪽 변에서 나가는 가로선
    // 돌아가는 선의 어느 구간도 그 가로선 위(같은 y)를 지나지 않는다
    const onFwd = back.slice(1).some((p, i) => Math.abs(p.y - fwdY) < 0.5 && Math.abs(back[i].y - fwdY) < 0.5);
    expect(onFwd).toBe(false);
  });
});
