import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  ActivityDiagram,
  ArchitectureDiagram,
  BlockDiagram,
  BPMNCollaborationDiagram,
  BPMNDiagram,
  C4CodeDiagram,
  C4ComponentDiagram,
  C4ContainerDiagram,
  C4ContextDiagram,
  C4DynamicDiagram,
  C4SystemLandscapeDiagram,
  ClassDiagram,
  ConceptMap,
  DataFlowDiagram,
  DataLineage,
  ERDiagram,
  Flowchart,
  ScreenFlow,
  SequenceDiagram,
  StateDiagram,
  SysMLBlockDiagram,
  UMLComponentDiagram,
  UMLDeploymentDiagram,
  UMLPackageDiagram,
  UMLSequenceDiagram,
  NetworkTopology,
} from './index';
import * as Index from './index';
import { edgeLabelBox } from '../atoms/EdgeLabel';

// KAN-082 S1 — 템플릿이 데이터로 받은 라벨 계열 칸을 그림에 그리는가.
//
// 2026-11-24 검토에서 Edge 를 쓰는 템플릿 다수가 관계 label · technology · 다중성 · stereotype · 상태 전이 라벨 ·
// 분기 라벨을 데이터로 받고도 그리지 않는다는 것을 확인했다(Edge 원자가 label 을 버린다, `atoms/Edge.tsx`).
// 여기서는 Edge 를 쓰는 템플릿 전부를 서버 렌더하고, 그 칸에 넣은 글자가 그림의 글(태그 밖 텍스트)에
// 정확히 한 번 나오는지 본다. 한 번도 안 나오면 안 그리는 것이고, 두 번 나오면 템플릿이 따로 그리는 라벨과
// Edge 가 그리는 라벨이 겹친 것이다.
//
// 라벨 계열 칸이 데이터 형식에 아예 없는 템플릿은 아래 NO_FIELD 에 이유와 함께 적는다. 새 템플릿이 Edge 를 쓰기
// 시작하면 CASES 나 NO_FIELD 둘 중 한 곳에 들어가야 이 시험이 초록이 된다.

const A = { width: 120, height: 60 };

/** 그림의 글만 남긴다 — 태그와 속성(aria-label 등)은 빼고 텍스트 노드만 잇는다. */
function textOf(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&');
}

function count(hay: string, needle: string): number {
  return hay.split(needle).length - 1;
}

interface Case {
  /** 템플릿이 있는 파일 이름(확장자 뺌) — 덮개 확인용 */
  file: string;
  el: React.ReactElement;
  /** 칸 이름 → 그 칸에 넣은 글자 */
  marks: Record<string, string>;
}

const CASES: Record<string, Case> = {
  ActivityDiagram: {
    file: 'ActivityDiagram',
    el: (
      <ActivityDiagram
        data={{
          nodes: [
            { id: 'a', kind: 'action', label: 'Aa', x: 40, y: 40 },
            { id: 'b', kind: 'action', label: 'Bb', x: 320, y: 40 },
          ],
          edges: [{ from: 'a', to: 'b', label: 'ACT_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'ACT_label' },
  },
  ArchitectureDiagram: {
    file: 'ArchitectureDiagram',
    el: (
      <ArchitectureDiagram
        data={{
          services: [
            { id: 'a', x: 40, y: 40, ...A, label: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, label: 'Bb' },
          ],
          edges: [{ id: 'e1', from: 'a', to: 'b', label: 'ARC_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'ARC_label' },
  },
  BlockDiagram: {
    file: 'BlockDiagram',
    el: (
      <BlockDiagram
        data={{
          nodes: [
            { id: 'a', x: 40, y: 40, ...A, label: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, label: 'Bb' },
          ],
          edges: [{ id: 'e1', from: 'a', to: 'b', label: 'BLK_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'BLK_label' },
  },
  BPMNCollaborationDiagram: {
    file: 'BPMNCollaborationDiagram',
    el: (
      <BPMNCollaborationDiagram
        data={{
          pools: [
            { id: 'p1', x: 0, y: 0, width: 640, height: 160, label: 'P1' },
            { id: 'p2', x: 0, y: 220, width: 640, height: 160, label: 'P2' },
          ],
          tasks: [
            { id: 't1', x: 120, y: 50, ...A, label: 'Aa' },
            { id: 't2', x: 400, y: 50, ...A, label: 'Bb' },
            { id: 't3', x: 120, y: 270, ...A, label: 'Cc' },
          ],
          sequenceFlows: [{ id: 'f1', from: 't1', to: 't2', label: 'BPC_seq' }],
          messageFlows: [{ id: 'm1', from: 't1', to: 't3', label: 'BPC_msg' }],
        }}
      />
    ),
    marks: { 'sequenceFlow.label': 'BPC_seq', 'messageFlow.label': 'BPC_msg' },
  },
  BPMNDiagram: {
    file: 'BPMNDiagram',
    el: (
      <BPMNDiagram
        data={{
          tasks: [
            { id: 't1', x: 40, y: 40, ...A, label: 'Aa' },
            { id: 't2', x: 320, y: 40, ...A, label: 'Bb' },
          ],
          flows: [{ id: 'f1', from: 't1', to: 't2', label: 'BPM_label' }],
        }}
      />
    ),
    marks: { 'flow.label': 'BPM_label' },
  },
  C4CodeDiagram: {
    file: 'C4CodeDiagram',
    el: (
      <C4CodeDiagram
        data={{
          elements: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa', kind: 'class' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb', kind: 'class' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4K_label', technology: 'C4K_tech' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'C4K_label', 'relationship.technology': 'C4K_tech' },
  },
  C4ComponentDiagram: {
    file: 'C4ComponentDiagram',
    el: (
      <C4ComponentDiagram
        data={{
          components: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4M_label', technology: 'C4M_tech' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'C4M_label', 'relationship.technology': 'C4M_tech' },
  },
  C4ContainerDiagram: {
    file: 'C4ContainerDiagram',
    el: (
      <C4ContainerDiagram
        data={{
          containers: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4N_label', technology: 'C4N_tech' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'C4N_label', 'relationship.technology': 'C4N_tech' },
  },
  C4ContextDiagram: {
    file: 'C4ContextDiagram',
    el: (
      <C4ContextDiagram
        data={{
          systems: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4X_label', technology: 'C4X_tech' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'C4X_label', 'relationship.technology': 'C4X_tech' },
  },
  C4DynamicDiagram: {
    file: 'C4DynamicDiagram',
    el: (
      <C4DynamicDiagram
        data={{
          elements: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          steps: [{ id: 's1', from: 'a', to: 'b', order: 1, label: 'C4D_label' }],
        }}
      />
    ),
    marks: { 'step.label': 'C4D_label' },
  },
  C4SystemLandscapeDiagram: {
    file: 'C4SystemLandscapeDiagram',
    el: (
      <C4SystemLandscapeDiagram
        data={{
          systems: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4L_label', technology: 'C4L_tech' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'C4L_label', 'relationship.technology': 'C4L_tech' },
  },
  ClassDiagram: {
    file: 'ClassDiagram',
    el: (
      <ClassDiagram
        data={{
          classes: [
            { id: 'a', x: 40, y: 40, width: 140, height: 90, name: 'Aa', stereotype: 'CLS_stereo' },
            { id: 'b', x: 360, y: 40, width: 140, height: 90, name: 'Bb' },
          ],
          relationships: [
            {
              id: 'r1',
              from: 'a',
              to: 'b',
              kind: 'association',
              label: 'CLS_label',
              fromLabel: 'CLS_from',
              toLabel: 'CLS_to',
            },
          ],
        }}
      />
    ),
    marks: {
      'class.stereotype': 'CLS_stereo',
      'relationship.label': 'CLS_label',
      'relationship.fromLabel': 'CLS_from',
      'relationship.toLabel': 'CLS_to',
    },
  },
  ConceptMap: {
    file: 'ConceptMap',
    el: (
      <ConceptMap
        data={{
          nodes: [
            { id: 'a', label: 'Aa', x: 40, y: 40 },
            { id: 'b', label: 'Bb', x: 320, y: 40 },
          ],
          links: [{ from: 'a', to: 'b', label: 'CMP_label' }],
        }}
      />
    ),
    marks: { 'link.label': 'CMP_label' },
  },
  DataFlowDiagram: {
    file: 'DataFlowDiagram',
    el: (
      <DataFlowDiagram
        data={{
          nodes: [
            { id: 'a', label: 'Aa', kind: 'external', x: 40, y: 40 },
            { id: 'b', label: 'Bb', kind: 'process', x: 320, y: 40 },
          ],
          flows: [{ from: 'a', to: 'b', label: 'DFD_label' }],
        }}
      />
    ),
    marks: { 'flow.label': 'DFD_label' },
  },
  DataLineage: {
    file: 'DataLineage',
    el: (
      <DataLineage
        data={{
          nodes: [
            { id: 'a', label: 'Aa', x: 40, y: 40 },
            { id: 'b', label: 'Bb', x: 320, y: 40 },
          ],
          edges: [{ from: 'a', to: 'b', label: 'LIN_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'LIN_label' },
  },
  ERDiagram: {
    file: 'ERDiagram',
    el: (
      <ERDiagram
        data={{
          entities: [
            { id: 'a', x: 40, y: 40, width: 140, name: 'Aa' },
            { id: 'b', x: 360, y: 40, width: 140, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'ERD_label' }],
        }}
      />
    ),
    marks: { 'relationship.label': 'ERD_label' },
  },
  Flowchart: {
    file: 'Flowchart',
    el: (
      <Flowchart
        data={{
          nodes: [
            { id: 'a', x: 40, y: 40, ...A, label: 'Aa', shape: 'diamond' },
            { id: 'b', x: 320, y: 40, ...A, label: 'Bb' },
          ],
          edges: [{ id: 'e1', from: 'a', to: 'b', label: 'FLW_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'FLW_label' },
  },
  ScreenFlow: {
    file: 'ScreenFlow',
    el: (
      <ScreenFlow
        data={{
          screens: [
            { id: 'a', title: 'Aa', x: 40, y: 40 },
            { id: 'b', title: 'Bb', x: 360, y: 40 },
          ],
          flows: [{ from: 'a', to: 'b', label: 'SCR_label' }],
        }}
      />
    ),
    marks: { 'flow.label': 'SCR_label' },
  },
  SequenceDiagram: {
    file: 'SequenceDiagram',
    el: (
      <SequenceDiagram
        data={{
          participants: [
            { id: 'a', x: 40, name: 'Aa' },
            { id: 'b', x: 320, name: 'Bb' },
          ],
          messages: [{ id: 'm1', from: 'a', to: 'b', y: 120, label: 'SEQ_label' }],
        }}
      />
    ),
    marks: { 'message.label': 'SEQ_label' },
  },
  StateDiagram: {
    file: 'StateDiagram',
    el: (
      <StateDiagram
        data={{
          states: [
            { id: 'a', x: 40, y: 40, title: 'Aa' },
            { id: 'b', x: 320, y: 40, title: 'Bb' },
          ],
          transitions: [{ id: 't1', from: 'a', to: 'b', label: 'STA_label' }],
        }}
      />
    ),
    marks: { 'transition.label': 'STA_label' },
  },
  SysMLBlockDiagram: {
    file: 'SysMLBlockDiagram',
    el: (
      <SysMLBlockDiagram
        data={{
          blocks: [
            { id: 'a', x: 40, y: 40, width: 140, height: 90, name: 'Aa', stereotype: 'SYS_stereo' },
            { id: 'b', x: 360, y: 40, width: 140, height: 90, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', kind: 'association' }],
        }}
      />
    ),
    marks: { 'block.stereotype': 'SYS_stereo' },
  },
  UMLComponentDiagram: {
    file: 'UMLComponentDiagram',
    el: (
      <UMLComponentDiagram
        data={{
          components: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          dependencies: [{ id: 'd1', from: 'a', to: 'b', label: 'CMP2_label' }],
        }}
      />
    ),
    marks: { 'dependency.label': 'CMP2_label' },
  },
  UMLDeploymentDiagram: {
    file: 'UMLDeploymentDiagram',
    el: (
      <UMLDeploymentDiagram
        data={{
          nodes: [
            { id: 'a', x: 40, y: 40, ...A, name: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, name: 'Bb' },
          ],
          edges: [{ id: 'e1', from: 'a', to: 'b', label: 'DEP_label' }],
        }}
      />
    ),
    marks: { 'edge.label': 'DEP_label' },
  },
  UMLPackageDiagram: {
    file: 'UMLPackageDiagram',
    el: (
      <UMLPackageDiagram
        data={{
          packages: [
            { id: 'a', x: 40, y: 40, ...A, label: 'Aa' },
            { id: 'b', x: 320, y: 40, ...A, label: 'Bb' },
          ],
          dependencies: [{ id: 'd1', from: 'a', to: 'b', label: 'PKG_label' }],
        }}
      />
    ),
    marks: { 'dependency.label': 'PKG_label' },
  },
  NetworkTopology: {
    file: 'NetworkTopology',
    el: (
      <NetworkTopology
        data={{
          zones: [],
          nodes: [
            { id: 'a', x: 40, y: 40, label: 'Aa' },
            { id: 'b', x: 320, y: 40, label: 'Bb' },
          ],
          // label 칸은 KAN-082.3(S10)이 연다 — 그 전에는 타입에 없다
          links: [{ from: 'a', to: 'b', label: 'TOP_label' }] as unknown as { from: string; to: string }[],
        }}
      />
    ),
    marks: { 'link.label': 'TOP_label' },
  },
  C4DeploymentDiagram: {
    file: 'C4DeploymentDiagram',
    el: React.createElement(
      (Index as unknown as Record<string, React.ComponentType<{ data: unknown }>>).C4DeploymentDiagram ?? 'g',
      {
        data: {
          nodes: [{ id: 'host', x: 10, y: 10, width: 560, height: 160, name: 'Host' }],
          containers: [
            { id: 'a', node: 'host', x: 30, y: 50, width: 120, height: 60, name: 'Aa' },
            { id: 'b', node: 'host', x: 400, y: 50, width: 120, height: 60, name: 'Bb' },
          ],
          relationships: [{ id: 'r1', from: 'a', to: 'b', label: 'C4P_label', technology: 'C4P_tech' }],
        },
      },
    ),
    marks: { 'relationship.label': 'C4P_label', 'relationship.technology': 'C4P_tech' },
  },
  UMLSequenceDiagram: {
    file: 'UMLSequenceDiagram',
    el: (
      <UMLSequenceDiagram
        data={{
          participants: [
            { id: 'a', x: 40, width: 100, name: 'Aa' },
            { id: 'b', x: 320, width: 100, name: 'Bb' },
          ],
          messages: [{ id: 'm1', from: 'a', to: 'b', y: 120, label: 'USQ_label' }],
        }}
      />
    ),
    marks: { 'message.label': 'USQ_label' },
  },
};

/** Edge 를 쓰지만 데이터 형식에 라벨 계열 칸이 없는 템플릿 — 파일 이름 → 이유 */
const NO_FIELD: Record<string, string> = {
  ArchiMateDiagram: '관계는 kind 만 받는다(ArchiMateRelationshipSpec)',
  ArchiMateViewpointDiagram: '관계는 kind 만 받는다(ArchiMateViewpointRelationshipSpec)',
  DMNDiagram: '요구 관계는 kind 만 받는다(DMNRequirementSpec)',
  Mindmap: '가지는 from · to 만 받는다(MindmapEdgeSpec)',
  NetworkGraph: '간선은 from · to 만 받는다(GraphEdge)',
  RequirementDiagram: '관계는 kind 만 받는다(RequirementEdgeSpec)',
  UseCaseDiagram: '링크는 kind 만 받는다(UseCaseLink) — include · extend 는 이미 «kind» 로 그린다',
};

const TEMPLATES_DIR = __dirname;

function filesUsingEdge(): string[] {
  return readdirSync(TEMPLATES_DIR)
    .filter((n) => n.endsWith('.tsx') && !n.includes('.test.'))
    .filter((n) => /<Edge\b/.test(readFileSync(join(TEMPLATES_DIR, n), 'utf8')))
    .map((n) => n.replace(/\.tsx$/, ''))
    .sort();
}

describe('템플릿이 라벨 계열 칸을 그린다 (KAN-082)', () => {
  it('Edge 를 쓰는 템플릿은 모두 CASES 나 NO_FIELD 에 있다', () => {
    const covered = new Set([...Object.values(CASES).map((c) => c.file), ...Object.keys(NO_FIELD)]);
    const files = filesUsingEdge();
    expect(files.length).toBe(34);
    expect(files.filter((f) => !covered.has(f))).toEqual([]);
    expect([...covered].filter((f) => !files.includes(f)).sort()).toEqual([]);
  });

  it.each(Object.entries(CASES))('%s — 넣은 글자가 그림에 한 번씩 나온다', (_name, c) => {
    const html = renderToStaticMarkup(c.el);
    // 선이 그려졌는지 먼저 본다 — 노드 위치를 못 찾아 선이 없으면 라벨이 없는 까닭이 다르다
    expect(html).toContain('data-viz-part="connector"');
    const text = textOf(html);
    const wrong = Object.entries(c.marks)
      .map(([field, mark]) => ({ field, mark, n: count(text, mark) }))
      .filter((r) => r.n !== 1)
      .map((r) => `${r.field}(${r.mark}) ${r.n === 0 ? '안 그림' : `${r.n}번 그림`}`);
    expect(wrong).toEqual([]);
  });
});

// ──────────────────────────────────────────────
// 라벨 위치 보정 칸(labelOffset) — 선 가운데 라벨을 데이터로 옮긴다 (KAN-082 계획 「만약」 표:
// 라벨이 노드나 다른 라벨과 겹치면 템플릿 데이터에 라벨 위치 보정 칸을 연다)
// ──────────────────────────────────────────────
const OFFSET = { x: 7, y: -9 };

/** 선 가운데 라벨 글자 — 템플릿 이름 → 그 라벨에 넣은 글자 */
const MID_LABEL: Record<string, string> = {
  ArchitectureDiagram: 'ARC_label',
  BlockDiagram: 'BLK_label',
  BPMNCollaborationDiagram: 'BPC_seq',
  BPMNDiagram: 'BPM_label',
  C4CodeDiagram: 'C4K_label',
  C4ComponentDiagram: 'C4M_label',
  C4ContainerDiagram: 'C4N_label',
  C4ContextDiagram: 'C4X_label',
  C4SystemLandscapeDiagram: 'C4L_label',
  ClassDiagram: 'CLS_label',
  ERDiagram: 'ERD_label',
  Flowchart: 'FLW_label',
  StateDiagram: 'STA_label',
  UMLComponentDiagram: 'CMP2_label',
  UMLDeploymentDiagram: 'DEP_label',
};

/** 데이터 안의 선(from · to 를 가진 항목)마다 labelOffset 을 더한 같은 그림 */
function withOffset(el: React.ReactElement): React.ReactElement {
  const props = el.props as { data: Record<string, unknown> };
  const data = Object.fromEntries(
    Object.entries(props.data).map(([k, v]) => [
      k,
      Array.isArray(v)
        ? v.map((o: unknown) =>
            o && typeof o === 'object' && 'from' in o && 'to' in o ? { ...(o as object), labelOffset: OFFSET } : o,
          )
        : v,
    ]),
  );
  return React.cloneElement(el as React.ReactElement<{ data: unknown }>, { data });
}

/** 글자를 담은 <text> 의 x · y */
function textPos(html: string, mark: string): { x: number; y: number } | null {
  // 여러 줄 라벨은 <text> 안에 줄마다 <tspan> 이 있다 — 그 <text> 의 x · y 가 라벨 묶음의 가운데다
  const m = html.match(new RegExp(`<text([^>]*)>(?:(?!</text>)[\\s\\S])*?${mark}`));
  if (!m) return null;
  const x = m[1].match(/\bx="([^"]+)"/);
  const y = m[1].match(/\by="([^"]+)"/);
  return x && y ? { x: Number(x[1]), y: Number(y[1]) } : null;
}

describe('선 가운데 라벨은 labelOffset 만큼 옮겨진다 (KAN-082)', () => {
  it('BPMN 협업의 메시지 흐름 라벨도 옮겨진다', () => {
    const c = CASES.BPMNCollaborationDiagram;
    const a = textPos(renderToStaticMarkup(c.el), 'BPC_msg');
    const b = textPos(renderToStaticMarkup(withOffset(c.el)), 'BPC_msg');
    expect({ a: !!a, b: !!b }).toEqual({ a: true, b: true });
    expect({ dx: b!.x - a!.x, dy: b!.y - a!.y }).toEqual({ dx: OFFSET.x, dy: OFFSET.y });
  });

  it.each(Object.entries(MID_LABEL))('%s', (name, mark) => {
    const c = CASES[name];
    const a = textPos(renderToStaticMarkup(c.el), mark);
    const b = textPos(renderToStaticMarkup(withOffset(c.el)), mark);
    expect({ a: !!a, b: !!b }).toEqual({ a: true, b: true });
    expect({ dx: Math.round((b!.x - a!.x) * 1000) / 1000, dy: Math.round((b!.y - a!.y) * 1000) / 1000 }).toEqual({
      dx: OFFSET.x,
      dy: OFFSET.y,
    });
  });
});

// ──────────────────────────────────────────────
// 라벨 바탕 상자 폭 — 한글 · 한자 · 가나는 1em 로 어림한다(0.6em 이면 바탕이 글자보다 좁아 선이 글자 양 끝에 비친다)
// ──────────────────────────────────────────────
describe('edgeLabelBox — 글자 폭 어림 (KAN-082)', () => {
  it('라틴 글자는 0.6em', () => {
    expect(edgeLabelBox('abc', 10, 3).width).toBeCloseTo(3 * 6 + 6);
  });
  it('한글은 1em — 「결제 요청 발행」(한글 6 · 빈칸 2)', () => {
    expect(edgeLabelBox('결제 요청 발행', 10, 3).width).toBeCloseTo(6 * 10 + 2 * 6 + 6);
  });
  it('섞인 글 — 「주문 조회 [HTTPS]」', () => {
    // 한글 4 → 40, 나머지(빈칸 2 · [ · HTTPS · ]) 9 → 54
    expect(edgeLabelBox('주문 조회 [HTTPS]', 10, 3).width).toBeCloseTo(40 + 54 + 6);
  });
});

// ──────────────────────────────────────────────
// C4 관계선 글은 두 줄 — 「설명」 아래 「[기술]」 (KAN-082.1 검토 1번, S17)
// ──────────────────────────────────────────────
describe('C4 관계선 글 — 설명과 기술은 서로 다른 줄 (KAN-082)', () => {
  const C4 = ['C4CodeDiagram', 'C4ComponentDiagram', 'C4ContainerDiagram', 'C4ContextDiagram', 'C4SystemLandscapeDiagram', 'C4DeploymentDiagram'];
  it.each(C4)('%s', (name) => {
    const c = CASES[name];
    const html = renderToStaticMarkup(c.el);
    const label = c.marks['relationship.label'];
    const tech = c.marks['relationship.technology'];
    const two = new RegExp(`<tspan[^>]*>${label}</tspan><tspan[^>]*>\\[${tech}\\]</tspan>`);
    expect({ name, twoLines: two.test(html) }).toEqual({ name, twoLines: true });
  });

  it('설명만 있거나 기술만 있으면 한 줄(줄 나눔 없음)', () => {
    const one = (r: Record<string, string>) =>
      renderToStaticMarkup(
        <C4ContainerDiagram
          data={{
            containers: [
              { id: 'a', x: 20, y: 20, ...A, name: 'Aa' },
              { id: 'b', x: 320, y: 20, ...A, name: 'Bb' },
            ],
            relationships: [{ id: 'r1', from: 'a', to: 'b', ...r }],
          }}
        />,
      );
    expect(one({ label: 'ONLY_label' })).not.toContain('<tspan');
    expect(one({ technology: 'ONLY_tech' })).toMatch(/<text[^>]*>\[ONLY_tech\]<\/text>/);
  });
});

describe('edgeLabelBox — 여러 줄 (KAN-082)', () => {
  it('줄 수만큼 높아지고 폭은 가장 긴 줄', () => {
    // 10px · 여백 3: 첫 줄 10 + 둘째 줄 줄 간격 12 + 여백 6
    expect(edgeLabelBox('ab\nabcd', 10, 3)).toEqual({ width: 4 * 6 + 6, height: 10 + 12 + 6 });
  });
  it('한 줄은 예전과 같다', () => {
    expect(edgeLabelBox('abcd', 10, 3)).toEqual({ width: 4 * 6 + 6, height: 10 + 6 });
  });
});
