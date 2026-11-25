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
