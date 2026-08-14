import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { CalloutLeader } from '../molecules/CalloutLeader';
import { parseViewBox } from '../geometry/layout';

export interface IllustrationAnnotation {
  id: string;
  /** 삽화 위 앵커 좌표(viewBox user-unit). */
  x: number;
  y: number;
  label: string;
  description?: string;
  side?: 'left' | 'right';
}

export interface AnnotatedIllustrationProps extends Omit<CanvasProps, 'data'> {
  data?: { annotations: IllustrationAnnotation[] };
  /** caller가 제공하는 삽화 slot(SVG 요소). children으로도 대체 가능. */
  illustration?: ReactNode;
  /** 텍스트 블록 가로 오프셋(px). */
  leaderLength?: number;
  children?: ReactNode;
}

/**
 * Annotated Illustration (VT-606) — caller 삽화 slot + CalloutLeader 주석.
 * 투영/삽화 미제공(caller 공급). headless(고정 viewBox user-unit 좌표).
 *
 * @vizType VT-606 Annotated Illustration · F. 인포그래픽/에디토리얼 · dataShape: concept
 * @useWhen 대상 구조를 라벨(콜아웃)로 해설할 때
 * @useWhen 제품/구조를 설명할 때
 * @avoidWhen 지도 위 마커는 Geo Infographic(VT-605) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function AnnotatedIllustration({
  data,
  illustration,
  leaderLength = 70,
  viewBox,
  children,
  title = 'Annotated illustration',
  ...canvasProps
}: AnnotatedIllustrationProps) {
  const [vbX, , vbW] = parseViewBox(viewBox, [0, 0, 420, 300]);

  if (!data) {
    return (
      <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="annotated-illustration" {...canvasProps}>
        {illustration ?? children}
      </Canvas>
    );
  }

  return (
    <Canvas viewBox={viewBox} title={title} data-bbangto-viz-pattern="annotated-illustration" {...canvasProps}>
      {illustration ?? children}
      {data.annotations.map((a) => {
        const side = a.side ?? (a.x > vbX + vbW / 2 ? 'right' : 'left');
        const toX = side === 'right' ? a.x + leaderLength : a.x - leaderLength;
        const lines = a.description ? [a.label, a.description] : [a.label];
        return (
          <CalloutLeader key={a.id} from={{ x: a.x, y: a.y }} to={{ x: toX, y: a.y }} lines={lines} side={side} />
        );
      })}
    </Canvas>
  );
}

AnnotatedIllustration.displayName = 'AnnotatedIllustration';
