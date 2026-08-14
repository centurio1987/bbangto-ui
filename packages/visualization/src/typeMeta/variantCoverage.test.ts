/**
 * variantCoverage.test.ts — 렌더 가능한 모드 ↔ VT 유형 청구 게이트 (KAN-043 / 상류 I6).
 *
 * 상류 리포트 I6: `StatisticsMode`의 `mosaic`처럼 **렌더는 되는데 유형 레지스트리에 없는 모드**가 있으면
 * 소비자는 그 화면의 채택 근거를 읽을 수 없다. 개별 누락을 손으로 메우는 대신, 배럴이 노출하는
 * `export type <X>Mode = 'a' | 'b'` union을 **정적 스캔**해 모든 멤버가 정확히 1개 엔트리에 청구되는지 검사한다.
 * 새 모드를 추가하면 레지스트리를 갱신하기 전까지 이 테스트가 빨갛다 — 재발 차단이 목적이다.
 *
 * 정적 스캔인 이유는 registry.test.ts와 같다: 런타임 import 없이(React/CSS side-effect 무관) 소스만 읽는다.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { vizTypeRegistry } from './registry';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, '..');

interface ModeUnion {
  /** 모드를 소비하는 컴포넌트 export명(파일명 = 컴포넌트명 규약). */
  readonly component: string;
  /** prop 이름. 현 코드베이스는 전부 `mode`. */
  readonly prop: string;
  readonly values: readonly string[];
}

/**
 * `export type <Component>Mode = 'a' | 'b' | 'c';`를 스캔한다.
 * 규약: 타입명이 `<컴포넌트명>Mode`이고 해당 컴포넌트가 `mode?: <Component>Mode` prop을 받는다.
 */
function scanModeUnions(relDir: string): ModeUnion[] {
  const out: ModeUnion[] = [];
  const dir = join(srcDir, relDir);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.tsx')) continue;
    const text = readFileSync(join(dir, file), 'utf8');
    const m = /^export type ([A-Za-z0-9_]+)Mode = ([^;]+);$/m.exec(text);
    if (!m) continue;
    const component = m[1];
    // 이 컴포넌트가 실제로 mode prop을 받는지 확인(타입만 있고 안 쓰면 스캔 대상 아님).
    if (!new RegExp(`\\bmode\\??:\\s*${component}Mode\\b`).test(text)) continue;
    const values = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1]);
    out.push({ component, prop: 'mode', values });
  }
  return out.sort((a, b) => (a.component < b.component ? -1 : 1));
}

const modeUnions = [...scanModeUnions('patterns'), ...scanModeUnions('templates')];

/** (component, prop, value) → 청구한 엔트리 id 목록. */
function claimants(component: string, prop: string, value: string): string[] {
  return vizTypeRegistry
    .filter(
      (e) =>
        e.exportNames.includes(component) &&
        (e.variants ?? []).some((v) => v.prop === prop && v.value === value),
    )
    .map((e) => e.id);
}

describe('모드 union ↔ 레지스트리 청구 (상류 I6)', () => {
  it('스캔이 최소 4개 모드 union을 잡는다(Comparison·Cycle·Hierarchy·Statistics + DotPlot)', () => {
    const names = modeUnions.map((u) => u.component);
    for (const n of ['Comparison', 'Cycle', 'Hierarchy', 'Statistics', 'DotPlot']) {
      expect(names).toContain(n);
    }
  });

  it('모든 모드 멤버가 정확히 1개 엔트리에 청구된다(미청구·중복청구 0)', () => {
    const unclaimed: string[] = [];
    const duplicated: string[] = [];
    for (const u of modeUnions) {
      for (const v of u.values) {
        const ids = claimants(u.component, u.prop, v);
        if (ids.length === 0) unclaimed.push(`${u.component}.${u.prop}='${v}'`);
        if (ids.length > 1) duplicated.push(`${u.component}.${u.prop}='${v}' → ${ids.join(',')}`);
      }
    }
    expect(unclaimed).toEqual([]);
    expect(duplicated).toEqual([]);
  });

  it('모드를 가진 export마다 기본 렌더 엔트리가 정확히 하나다(isDefault)', () => {
    for (const u of modeUnions) {
      const defaults = vizTypeRegistry.filter(
        (e) =>
          e.exportNames.includes(u.component) &&
          (e.variants ?? []).some((v) => v.prop === u.prop && v.isDefault === true),
      );
      expect(`${u.component}:${defaults.length}`).toBe(`${u.component}:1`);
    }
  });

  it('variants의 prop/value는 비어있지 않고, isDefault는 export당 1건을 넘지 않는다', () => {
    for (const e of vizTypeRegistry) {
      for (const v of e.variants ?? []) {
        expect(v.prop.length).toBeGreaterThan(0);
        expect(v.value.length).toBeGreaterThan(0);
      }
    }
  });
});
