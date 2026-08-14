import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';
import { parseViewBox, distributeCenters } from '../geometry/layout';

const PALETTE_KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'] as const;

export interface GitBranchSpec {
  id: string;
  label: string;
  color?: string;
}

export interface GitCommitSpec {
  id: string;
  branch: string;
  label?: string;
}

export interface GitMergeSpec {
  from: string;
  to: string;
}

export interface GitGraphProps extends Omit<CanvasProps, 'data' | 'children'> {
  data?: { branches: GitBranchSpec[]; commits: GitCommitSpec[]; merges?: GitMergeSpec[] };
  children?: ReactNode;
}

const PAD = { left: 90, right: 40, top: 30, bottom: 30 } as const;

/** Git graph (VT-129) — 브랜치 레인 + 커밋 원 + 직선 merge(공개 계약: curved는 후속). headless. */
export function GitGraph({
  data,
  viewBox,
  children,
  title = 'Git graph',
  ...canvasProps
}: GitGraphProps) {
  const [vbX, vbY, vbW, vbH] = parseViewBox(viewBox, [0, 0, 560, 220]);

  if (children || !data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gitgraph" {...canvasProps}>
        {children}
      </Canvas>
    );
  }

  const { branches, commits, merges = [] } = data;
  const branchY = new Map(
    branches.map((b, i) => [b.id, distributeCenters(branches.length, vbY + PAD.top, vbY + vbH - PAD.bottom)[i]]),
  );
  const branchColor = new Map(branches.map((b, i) => [b.id, b.color ?? vvar('palette', PALETTE_KEYS[i % PALETTE_KEYS.length])]));
  const commitX = distributeCenters(commits.length, vbX + PAD.left, vbX + vbW - PAD.right);
  const posById = new Map(commits.map((c, i) => [c.id, { x: commitX[i], y: branchY.get(c.branch) ?? vbY, branch: c.branch }]));

  // 커밋 부모 연결(같은 브랜치 직전 커밋).
  const lastByBranch = new Map<string, string>();
  const parentEdges: Array<{ from: string; to: string }> = [];
  for (const c of commits) {
    const prev = lastByBranch.get(c.branch);
    if (prev) parentEdges.push({ from: prev, to: c.id });
    lastByBranch.set(c.branch, c.id);
  }

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-chart="gitgraph" {...canvasProps}>
      {/* 브랜치 레인(수평 기준선) + 라벨 */}
      {branches.map((b) => {
        const y = branchY.get(b.id)!;
        return (
          <g key={b.id} data-bbangto-viz-branch-lane data-bbangto-viz-branch-lane-id={b.id}>
            <path data-bbangto-viz-edge d={`M ${vbX + PAD.left} ${y} L ${vbX + vbW - PAD.right} ${y}`} style={{ fill: 'none', stroke: branchColor.get(b.id), strokeWidth: 2, opacity: 0.35 }} />
            <text x={vbX + PAD.left - 10} y={y} textAnchor="end" dominantBaseline="central" fontSize={11} fontWeight={700} fontFamily={resolveLabelFont(b.label)} style={{ fill: vvar('shape', 'stroke') }}>
              {b.label}
            </text>
          </g>
        );
      })}
      {/* 부모 엣지(직선) */}
      {parentEdges.map((e, i) => {
        const a = posById.get(e.from)!;
        const b = posById.get(e.to)!;
        return <path key={`pe-${i}`} data-bbangto-viz-edge d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} style={{ fill: 'none', stroke: branchColor.get(a.branch), strokeWidth: 2 }} />;
      })}
      {/* merge 엣지(직선) */}
      {merges.map((m, i) => {
        const a = posById.get(m.from);
        const b = posById.get(m.to);
        if (!a || !b) return null;
        return <path key={`me-${i}`} data-bbangto-viz-edge d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} style={{ fill: 'none', strokeDasharray: '4 3', strokeWidth: 2 }} />;
      })}
      {/* 커밋 원 + 라벨 */}
      {commits.map((c) => {
        const p = posById.get(c.id)!;
        return (
          <g key={c.id} data-bbangto-viz-commit data-bbangto-viz-commit-id={c.id}>
            <circle cx={p.x} cy={p.y} r={7} style={{ fill: branchColor.get(c.branch) }} />
            {c.label && (
              <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize={10} fontFamily={resolveLabelFont(c.label)} style={{ fill: vvar('shape', 'stroke') }}>
                {c.label}
              </text>
            )}
          </g>
        );
      })}
    </Canvas>
  );
}

GitGraph.displayName = 'GitGraph';
