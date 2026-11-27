import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as viz from '../index';
import { vizTypeRegistry } from '../typeMeta';

// KAN-082.3 — 배치 도식 보강.
//
// 원문: 물리 대상 도식의 노드는 「서버, VM, 컨테이너 호스트, VPC·서브넷 같은 네트워크 영역」이고 화살표는 「네트워크 연결,
// 배치 관계(어디에 올라가 있나)」다. 예: 「하나의 EC2 위에 API 서버와 워커가 같이 떠 있다면, 배포 도식에서는 박스 하나고
// 런타임 도식에서는 박스 두 개입니다.」 그래서 배포 노드가 다른 노드 안에 들어가고(중첩), 노드 종류(장치 · 실행 환경)와
// 그 위에 놓인 artifact 를 그리며, C4 에는 Deployment 도식과 컨테이너 모양(DB · 큐)이 있어야 한다.

const C = viz as unknown as Record<string, React.ComponentType<{ data: unknown }> | undefined>;

function textOf(html: string): string {
  return html.replace(/<[^>]*>/g, ' ');
}

describe('UMLDeploymentDiagram — 노드 중첩 · 종류 · artifact (KAN-082 .3)', () => {
  const D = C.UMLDeploymentDiagram!;
  const el = (
    <D
      data={{
        nodes: [
          { id: 'ec2', x: 20, y: 20, width: 360, height: 200, name: 'EC2 m5.large', kind: 'device' },
          { id: 'api', x: 40, y: 80, width: 150, height: 110, name: 'API 서버', parent: 'ec2', kind: 'executionEnvironment', artifacts: ['api.jar'] },
          { id: 'worker', x: 210, y: 80, width: 150, height: 110, name: '워커', parent: 'ec2', stereotype: 'container' },
        ],
      }}
    />
  );
  const html = renderToStaticMarkup(el);

  it('자식은 부모 표시를 달고, 부모를 자식보다 먼저 그린다', () => {
    expect(html).toMatch(/data-bbangto-viz-deploy-parent="ec2"/);
    const at = (id: string) => html.indexOf(`data-bbangto-viz-deploy-node="${id}"`);
    expect({ ec2: at('ec2') >= 0, api: at('api') >= 0, worker: at('worker') >= 0 }).toEqual({ ec2: true, api: true, worker: true });
    expect(at('ec2')).toBeLessThan(at('api'));
    expect(at('ec2')).toBeLessThan(at('worker'));
  });

  it('자식이 있는 노드의 이름은 자식들 위에 놓인다', () => {
    const m = html.match(/<text[^>]*\by="([\d.]+)"[^>]*>[^<]*EC2 m5\.large/);
    expect(m).not.toBeNull();
    expect(Number(m![1])).toBeLessThan(80);
  });

  it('종류는 «device» · «executionEnvironment», stereotype 을 적으면 그 글', () => {
    const t = textOf(html);
    expect(t).toContain('«device»');
    expect(t).toContain('«executionEnvironment»');
    expect(t).toContain('«container»');
  });

  it('노드 위 artifact 를 이름과 함께 그린다', () => {
    expect(html).toMatch(/data-bbangto-viz-artifact[^>]*>/);
    expect(textOf(html)).toContain('api.jar');
  });

  it('중첩도 종류도 안 적은 노드는 예전처럼 이름이 가운데이고 표시가 없다', () => {
    const plain = renderToStaticMarkup(<D data={{ nodes: [{ id: 'n', x: 20, y: 20, width: 160, height: 80, name: 'Plain' }] }} />);
    expect(plain).not.toContain('data-bbangto-viz-deploy-parent');
    expect(textOf(plain)).not.toContain('«');
  });
});

describe('NetworkTopology — 링크 라벨 (KAN-082 .3)', () => {
  it('링크에 적은 라벨을 선 가운데에 한 번 그린다', () => {
    const T = C.NetworkTopology!;
    const html = renderToStaticMarkup(
      <T
        data={{
          zones: [],
          nodes: [
            { id: 'a', x: 40, y: 40, label: 'Aa' },
            { id: 'b', x: 320, y: 40, label: 'Bb' },
          ],
          links: [{ from: 'a', to: 'b', label: 'TOPO_label' }],
        }}
      />,
    );
    expect(textOf(html).split('TOPO_label').length - 1).toBe(1);
  });
});

describe('C4ContainerDiagram — 컨테이너 모양 (KAN-082 .3)', () => {
  const Ct = C.C4ContainerDiagram!;
  const html = renderToStaticMarkup(
    <Ct
      data={{
        containers: [
          { id: 'api', x: 20, y: 20, width: 150, height: 90, name: 'API', technology: 'Node.js' },
          { id: 'db', x: 220, y: 20, width: 150, height: 90, name: '주문 DB', technology: 'PostgreSQL', shape: 'database' },
          { id: 'q', x: 420, y: 20, width: 150, height: 90, name: '결제 큐', technology: 'Kafka', shape: 'queue' },
        ],
      }}
    />,
  );

  it('shape 를 적은 컨테이너는 DB · 큐 모양으로 그린다', () => {
    expect(html).toMatch(/data-bbangto-viz-molecule="database"[^>]*data-bbangto-viz-molecule-id="db"/);
    expect(html).toMatch(/data-bbangto-viz-molecule="queue"[^>]*data-bbangto-viz-molecule-id="q"/);
  });

  it('모양 칸을 안 적은 컨테이너는 예전처럼 C4 상자다', () => {
    expect(html).not.toMatch(/data-bbangto-viz-molecule="(database|queue)"[^>]*data-bbangto-viz-molecule-id="api"/);
    expect(textOf(html)).toContain('Node.js');
  });
});

describe('C4DeploymentDiagram (KAN-082 .3)', () => {
  it('패키지가 낸다', () => {
    expect(typeof C.C4DeploymentDiagram).toBe('function');
  });

  it('배포 노드는 중첩되고, 컨테이너 인스턴스는 자기 노드 안에 그린다', () => {
    const Dp = C.C4DeploymentDiagram!;
    const html = renderToStaticMarkup(
      <Dp
        data={{
          nodes: [
            { id: 'aws', x: 10, y: 10, width: 520, height: 300, name: 'AWS', technology: 'ap-northeast-2' },
            { id: 'ec2', x: 30, y: 60, width: 480, height: 230, name: 'EC2', technology: 'Ubuntu 22.04', parent: 'aws' },
          ],
          containers: [
            { id: 'api', node: 'ec2', x: 50, y: 120, width: 200, height: 120, name: 'API 서버', technology: 'Node.js' },
            { id: 'worker', node: 'ec2', x: 290, y: 120, width: 200, height: 120, name: '워커', technology: 'Go' },
          ],
          relationships: [{ id: 'r1', from: 'api', to: 'worker', label: '작업 넣기', kind: 'asyncMessage' }],
        }}
      />,
    );
    const t = textOf(html);
    for (const s of ['AWS', 'ap-northeast-2', 'EC2', 'Ubuntu 22.04', 'API 서버', '워커', '작업 넣기']) expect({ s, has: t.includes(s) }).toEqual({ s, has: true });
    const at = (id: string) => html.indexOf(`data-bbangto-viz-deploy-node="${id}"`);
    expect(at('aws')).toBeGreaterThanOrEqual(0);
    expect(at('aws')).toBeLessThan(at('ec2'));
    expect(html).toMatch(/data-bbangto-viz-deploy-parent="aws"/);
    expect(html).toMatch(/data-bbangto-viz-container-node="ec2"/);
    expect(html).toMatch(/data-bbangto-viz-relation-kind="asyncMessage"/);
  });

  it('유형 축에서 VT-104(배포 도식 — 별칭 C4 deployment)로 찾힌다', () => {
    expect(vizTypeRegistry.find((e) => e.id === 'VT-104')?.exportNames).toContain('C4DeploymentDiagram');
  });
});

// KAN-082.3 검토 2번 — 「추천대로(좌표는 데이터가 준다), 그러나 레이아웃 깨짐, 글자, 도식 겹침 등이 발생하지 않도록 해야 한다」.
// 좌표는 데이터 그대로 두고, 그리기 전에 상자만 맞춘다. 상자는 `data-bbangto-viz-box="x y w h"` 로 읽는다.

type Box = { x: number; y: number; w: number; h: number };
function boxOf(html: string, attr: string, id: string): Box {
  const m = html.match(new RegExp(`${attr}="${id}"[^>]*data-bbangto-viz-box="([^"]+)"`));
  expect({ attr, id, found: !!m }).toEqual({ attr, id, found: true });
  const [x, y, w, h] = m![1].split(' ').map(Number);
  return { x, y, w, h };
}
const inside = (c: Box, p: Box) => c.x >= p.x && c.y >= p.y && c.x + c.w <= p.x + p.w && c.y + c.h <= p.y + p.h;
const apart = (a: Box, b: Box) => a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y;
/** 이름 글자(NodeLabel 한 줄 · font 12)가 차지하는 띠 — 가운데 y 에서 위아래로 반 줄(7.5) */
function nameBand(html: string, name: string): { top: number; bottom: number } {
  const ys = [...html.matchAll(new RegExp(`<text[^>]*\\by="([\\d.]+)"[^>]*>${name}</text>`, 'g'))].map((m) => Number(m[1]));
  expect({ name, lines: ys.length > 0 }).toEqual({ name, lines: true });
  return { top: Math.min(...ys) - 7.5, bottom: Math.max(...ys) + 7.5 };
}

describe('UMLDeploymentDiagram — 상자가 깨지거나 겹치지 않는다 (KAN-082.3 검토 2번)', () => {
  const D = C.UMLDeploymentDiagram!;

  it('자식이 부모 밖으로 나간 데이터에서도 부모 앞면이 자식을 담는다', () => {
    const html = renderToStaticMarkup(
      <D
        data={{
          nodes: [
            { id: 'ec2', x: 20, y: 20, width: 200, height: 120, name: 'EC2', kind: 'device' },
            { id: 'api', x: 150, y: 80, width: 150, height: 110, name: 'API', parent: 'ec2' },
          ],
        }}
      />,
    );
    const p = boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2');
    const c = boxOf(html, 'data-bbangto-viz-deploy-node', 'api');
    expect(c).toEqual({ x: 150, y: 80, w: 150, h: 110 });
    // 큐브 앞면은 오른쪽 깊이(최대 14)만큼 좁다 — 앞면 안에 담겨야 오른쪽 옆면과 겹치지 않는다
    expect(inside(c, { x: p.x, y: p.y + 14, w: p.w - 14, h: p.h - 14 })).toBe(true);
  });

  it('자식이 머리 글자 띠 안으로 들어와도 스테레오타입 · 이름이 자식과 겹치지 않는다', () => {
    const html = renderToStaticMarkup(
      <D
        data={{
          nodes: [
            { id: 'ec2', x: 20, y: 60, width: 360, height: 200, name: 'EC2 m5.large', kind: 'device' },
            { id: 'api', x: 40, y: 70, width: 150, height: 110, name: 'API 서버', parent: 'ec2' },
          ],
        }}
      />,
    );
    const c = boxOf(html, 'data-bbangto-viz-deploy-node', 'api');
    expect(nameBand(html, 'EC2 m5.large').bottom).toBeLessThanOrEqual(c.y);
    const st = html.match(/data-bbangto-viz-deploy-stereotype[^>]*\by="([\d.]+)"/);
    expect(Number(st![1]) + 5).toBeLessThanOrEqual(c.y);
  });

  it('자식이 있는 노드의 artifact 칩은 자식 아래에 놓이고 자식과 겹치지 않는다', () => {
    const html = renderToStaticMarkup(
      <D
        data={{
          nodes: [
            { id: 'ec2', x: 20, y: 20, width: 360, height: 200, name: 'EC2', kind: 'device', artifacts: ['agent.deb', 'nginx.conf'] },
            { id: 'api', x: 40, y: 80, width: 150, height: 130, name: 'API', parent: 'ec2' },
          ],
        }}
      />,
    );
    const p = boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2');
    const c = boxOf(html, 'data-bbangto-viz-deploy-node', 'api');
    for (const a of ['agent.deb', 'nginx.conf']) {
      const chip = boxOf(html, 'data-bbangto-viz-artifact', a.replace('.', '\\.'));
      expect({ a, apart: apart(chip, c), inside: inside(chip, p) }).toEqual({ a, apart: true, inside: true });
    }
  });

  it('긴 이름도 낱말이 빠지지 않고, 띄어 쓰지 않은 긴 낱말은 상자를 넓힌다', () => {
    const name = 'payment-gateway-primary-instance-for-asia-pacific';
    const html = renderToStaticMarkup(<D data={{ nodes: [{ id: 'n', x: 20, y: 20, width: 120, height: 80, name }] }} />);
    const b = boxOf(html, 'data-bbangto-viz-deploy-node', 'n');
    // 한 낱말 글자 폭(font 12, 라틴 0.6em)이 상자 안쪽 폭보다 넓으면 안 된다
    expect(b.w - 8).toBeGreaterThanOrEqual(name.length * 12 * 0.6);
    const many = 'Primary Payment Gateway Instance For The Asia Pacific Region';
    const html2 = renderToStaticMarkup(<D data={{ nodes: [{ id: 'n', x: 20, y: 20, width: 120, height: 60, name: many }] }} />);
    for (const w of many.split(' ')) expect({ w, has: textOf(html2).includes(w) }).toEqual({ w, has: true });
    const b2 = boxOf(html2, 'data-bbangto-viz-deploy-node', 'n');
    const band = nameBand(html2, '[^<]+');
    expect(band.top).toBeGreaterThanOrEqual(b2.y);
    expect(band.bottom).toBeLessThanOrEqual(b2.y + b2.h);
  });

  it('데이터가 이미 맞으면 상자는 데이터 그대로다', () => {
    const html = renderToStaticMarkup(
      <D
        data={{
          nodes: [
            { id: 'ec2', x: 20, y: 20, width: 360, height: 200, name: 'EC2 m5.large', kind: 'device' },
            { id: 'api', x: 40, y: 80, width: 150, height: 110, name: 'API 서버', parent: 'ec2', kind: 'executionEnvironment', artifacts: ['api.jar'] },
            { id: 'worker', x: 210, y: 80, width: 150, height: 110, name: '워커', parent: 'ec2', stereotype: 'container' },
          ],
        }}
      />,
    );
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2')).toEqual({ x: 20, y: 20, w: 360, h: 200 });
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'api')).toEqual({ x: 40, y: 80, w: 150, h: 110 });
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'worker')).toEqual({ x: 210, y: 80, w: 150, h: 110 });
  });
});

describe('C4DeploymentDiagram — 상자가 깨지거나 겹치지 않는다 (KAN-082.3 검토 2번)', () => {
  const Dp = C.C4DeploymentDiagram!;

  it('컨테이너가 배포 노드 밖으로 나간 데이터에서도 노드가 컨테이너를 담는다', () => {
    const html = renderToStaticMarkup(
      <Dp
        data={{
          nodes: [{ id: 'ec2', x: 20, y: 20, width: 200, height: 150, name: 'EC2' }],
          containers: [{ id: 'api', node: 'ec2', x: 120, y: 90, width: 160, height: 100, name: 'API 서버', technology: 'Node.js' }],
        }}
      />,
    );
    const n = boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2');
    expect(inside({ x: 120, y: 90, w: 160, h: 100 }, n)).toBe(true);
    const r = html.match(/data-bbangto-viz-deploy-node="ec2"[^>]*>\s*<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/);
    expect(r!.slice(1).map(Number)).toEqual([n.x, n.y, n.w, n.h]);
  });

  it('자식 노드가 머리 글자 띠 안으로 들어와도 이름 · 기술 글자가 자식과 겹치지 않는다', () => {
    const html = renderToStaticMarkup(
      <Dp
        data={{
          nodes: [
            { id: 'aws', x: 10, y: 40, width: 400, height: 260, name: 'AWS', technology: 'ap-northeast-2' },
            { id: 'ec2', x: 30, y: 50, width: 300, height: 200, name: 'EC2', parent: 'aws' },
          ],
        }}
      />,
    );
    const aws = boxOf(html, 'data-bbangto-viz-deploy-node', 'aws');
    const ec2 = boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2');
    // 기술 글자의 바탕선이 aws.y + 32 이고 글자 아래 끝은 그보다 3 남짓 아래다
    expect(aws.y + 32 + 4).toBeLessThanOrEqual(ec2.y);
    expect(inside(ec2, aws)).toBe(true);
  });

  it('긴 이름과 인스턴스 수(×N)가 겹치지 않고 기술 글자가 상자 안에 있다', () => {
    const html = renderToStaticMarkup(
      <Dp
        data={{
          nodes: [{ id: 'web', x: 20, y: 20, width: 120, height: 80, name: 'Web Server Fleet', technology: 'm5.large · Ubuntu 22.04 LTS', instances: 3 }],
        }}
      />,
    );
    const b = boxOf(html, 'data-bbangto-viz-deploy-node', 'web');
    const nameRight = 20 + 10 + 'Web Server Fleet'.length * 12 * 0.6;
    expect(nameRight + 8).toBeLessThanOrEqual(b.x + b.w - 10 - 2 * 10 * 0.6);
    expect(20 + 10 + '[m5.large · Ubuntu 22.04 LTS]'.length * 10 * 0.6).toBeLessThanOrEqual(b.x + b.w - 10);
  });

  it('데이터가 이미 맞으면 상자는 데이터 그대로다(원문 예시 「EC2 하나에 API 서버와 워커」)', () => {
    const html = renderToStaticMarkup(
      <Dp
        data={{
          nodes: [
            { id: 'aws', x: 10, y: 10, width: 640, height: 300, name: 'AWS', technology: 'ap-northeast-2' },
            { id: 'ec2', x: 30, y: 60, width: 340, height: 230, name: 'EC2', technology: 'm5.large · Ubuntu 22.04', parent: 'aws' },
            { id: 'rds', x: 480, y: 60, width: 150, height: 230, name: 'RDS', technology: 'db.t3.medium', parent: 'aws' },
          ],
          containers: [
            { id: 'api', node: 'ec2', x: 50, y: 120, width: 140, height: 90, name: 'API 서버', technology: 'Node.js' },
            { id: 'worker', node: 'ec2', x: 210, y: 120, width: 140, height: 90, name: '워커', technology: 'Go' },
            { id: 'db', node: 'rds', x: 495, y: 120, width: 120, height: 90, name: '주문 DB', technology: 'PostgreSQL', shape: 'database' },
          ],
        }}
      />,
    );
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'aws')).toEqual({ x: 10, y: 10, w: 640, h: 300 });
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'ec2')).toEqual({ x: 30, y: 60, w: 340, h: 230 });
    expect(boxOf(html, 'data-bbangto-viz-deploy-node', 'rds')).toEqual({ x: 480, y: 60, w: 150, h: 230 });
  });
});

describe('UMLDeploymentDiagram — 머리 글자가 큐브 모서리 선에 걸치지 않는다 (KAN-082.3 검토 2번)', () => {
  it('자식이 있는 노드의 스테레오타입은 앞면 윗선(깊이 14) 아래에 놓인다', () => {
    const D = C.UMLDeploymentDiagram!;
    const html = renderToStaticMarkup(
      <D
        data={{
          nodes: [
            { id: 'ec2', x: 20, y: 20, width: 360, height: 200, name: 'EC2 m5.large', kind: 'device' },
            { id: 'api', x: 40, y: 80, width: 150, height: 110, name: 'API', parent: 'ec2' },
          ],
        }}
      />,
    );
    const st = html.match(/data-bbangto-viz-deploy-node="ec2"[\s\S]*?data-bbangto-viz-deploy-stereotype[^>]*\by="([\d.]+)"/);
    // 글자 크기 9 — 가운데에서 위로 4.5 남짓. 앞면 윗선은 y + 14
    expect(Number(st![1]) - 5).toBeGreaterThanOrEqual(20 + 14);
  });
});
