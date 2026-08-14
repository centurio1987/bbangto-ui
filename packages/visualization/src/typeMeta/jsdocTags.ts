/**
 * jsdocTags — 레지스트리에서 **컴포넌트 선언 위 JSDoc 태그 블록**을 만드는 순수 함수 (KAN-043 / 상류 I2).
 *
 * 상류 리포트 I2: 소비자(특히 LLM)는 `import {} from '패키지'`로 시작해 `dist/index.d.ts`를 읽는데,
 * 거기에는 컴포넌트 이름과 props만 있고 **무엇을 언제 쓰는지가 통째로 없다**
 * (`grep -c "useWhen|avoidWhen|dataShape" dist/index.d.ts` → 0). 판단 근거는 매니페스트에만 있었고,
 * 그 파일을 열 이유가 메인 엔트리 어디에도 없었다.
 *
 * 해법은 SSOT를 복제하지 않는 것이다 — `vizTypeRegistry`에서 태그를 **생성해** 소스 JSDoc에 주입하면
 * tsup dts가 그대로 물고 가 IDE 툴팁과 LLM의 타입 읽기 양쪽에 동시에 뜬다.
 * 생성은 `scripts/genTypeJsdoc.ts`, 최신성 게이트는 `jsdoc.test.ts`가 이 함수를 공유해서 본다.
 */
import type { VizTypeRegistryEntry } from './types';
import { VIZ_TYPE_CATEGORY_LABELS } from './types';

/** 생성 태그로 인식하는 접두(멱등 재생성 시 이 줄들만 걷어낸다). */
export const GENERATED_TAG_PREFIXES = ['@vizType', '@useWhen', '@avoidWhen', '@seeTypeMeta'] as const;

/** 태그 줄이 최대 몇 개씩 붙는지 — 산문이 선언을 덮지 않게 자른다. */
const MAX_USE_WHEN = 2;
const MAX_AVOID_WHEN = 2;

function variantHint(entry: VizTypeRegistryEntry): string {
  const vs = entry.variants ?? [];
  if (vs.length === 0) return '';
  const rendered = vs.map((v) => `${v.prop}="${v.value}"${v.isDefault ? '(기본)' : ''}`).join(', ');
  return ` · ${rendered}`;
}

/**
 * 한 export에 대한 JSDoc 태그 줄(선행 ` * ` 없이 본문만)을 만든다.
 * 1 export가 여러 유형을 겸하면 유형마다 `@vizType`+근거 묶음이 반복된다(id 오름차순).
 */
export function buildJsdocTags(
  exportName: string,
  registry: readonly VizTypeRegistryEntry[],
): string[] {
  const entries = registry
    .filter((e) => e.exportNames.includes(exportName))
    .slice()
    .sort((a, b) => (a.id < b.id ? -1 : 1));
  if (entries.length === 0) return [];

  const lines: string[] = [];
  for (const e of entries) {
    const m = e.meta;
    if (!m) continue;
    lines.push(
      `@vizType ${e.id} ${e.name} · ${VIZ_TYPE_CATEGORY_LABELS[m.category]}` +
        ` · dataShape: ${m.dataShape.join(', ')}` +
        (m.structuralTraits.length ? ` · 구조: ${m.structuralTraits.join(', ')}` : '') +
        variantHint(e),
    );
    for (const u of m.useWhen.slice(0, MAX_USE_WHEN)) lines.push(`@useWhen ${u}`);
    for (const a of m.avoidWhen.slice(0, MAX_AVOID_WHEN)) lines.push(`@avoidWhen ${a}`);
  }
  if (lines.length === 0) return [];
  lines.push(
    '@seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의' +
      ' selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json',
  );
  return lines;
}

/** 생성 태그 줄인지(JSDoc 본문 한 줄 기준, 선행 `*`·공백 제거 후). */
export function isGeneratedTagLine(jsdocBody: string): boolean {
  const t = jsdocBody.replace(/^\s*\*?\s?/, '').trimStart();
  return GENERATED_TAG_PREFIXES.some((p) => t.startsWith(p));
}
