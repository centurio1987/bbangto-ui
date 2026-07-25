/**
 * metadataCoverage — **repo 전역 메타데이터 커버리지 census(집행 장치)** 순수 검증기 (KAN-035).
 *
 * "저장소의 모든 채택 카탈로그가 메타-커버 또는 명시적 범위-밖인지"를 강제한다. 개별 축 게이트
 * (style-guide-catalog/viz manifest·registry test)는 축 **내부** drift를 잡지만, 이 census는 **축 자체의 누락**과
 * **infra-pilot의 영구화**를 잡는다 — 신규 카탈로그가 census 등록 없이는 CI를 통과 못 하게 한다.
 *
 * SSOT 선언 = 저장소 루트 `metadata-coverage.json`. **엔트리 개수를 담지 않는다**(수동 수치는 새 drift 지점) —
 * 개수는 매니페스트 JSON에서 읽어 대조한다(source==manifest 동수 검증은 각 축 자체 게이트의 몫).
 *
 * `auditCoverage`는 fs·import에 의존하지 않는 **순수 함수**라 fixture 주입 단위 테스트가 가능하다
 * (metadataCoverage.test.ts가 "미선언 카탈로그 발견 시 위반"을 자동·영속 검증).
 */

/** census 축 선언 1행. 실제 개수는 담지 않는다(매니페스트에서 계산). */
export interface CoverageAxisDecl {
  readonly id: string;
  /** 패키지 디렉토리명(packages/<package>). */
  readonly package: string;
  /** 이 축이 소유하는 카탈로그 파일들(package 기준 상대경로). 드리프트 스캔이 이들과 대조한다. */
  readonly files: readonly string[];
  /** 사람용 — 개수 SSOT 소스 모듈 힌트(테스트 대상 아님). */
  readonly sourceModule: string;
  readonly status: 'covered' | 'infra-pilot' | 'out-of-scope';
  /** infra-pilot일 때 최소 authored 파일럿 수(개수는 매니페스트에서 읽어 대조). */
  readonly pilotAuthored?: number;
  /** infra-pilot은 반드시 후속 카드 id를 가리켜야 한다(영구 예외 방지). */
  readonly followUp?: string;
  readonly gate: string;
}

/** 범위-밖 인터페이스 범주 선언. rationale + 승격 trigger 필수. */
export interface CoverageOutOfScopeDecl {
  readonly id: string;
  readonly rationale: string;
  /** 어떤 변화가 생기면 covered 대상으로 승격되는지. */
  readonly promoteTrigger: string;
}

/** metadata-coverage.json 전체. */
export interface CoverageDeclaration {
  readonly axes: readonly CoverageAxisDecl[];
  readonly outOfScope: readonly CoverageOutOfScopeDecl[];
  /** 스캔에 잡히지만 채택 카탈로그가 아니어서 의도적으로 제외한 파일(repo 상대경로). */
  readonly ignoredCatalogFiles?: readonly string[];
}

/** 매니페스트 JSON에서 읽은 개수 통계(테스트가 주입). */
export interface ManifestStat {
  readonly total: number;
  readonly authored: number;
}

/** 카탈로그 파일 판별: `*.manifest.json` 또는 `src/catalog.json`(node_modules·dist 제외). repo 상대경로. */
export function isCatalogFile(relPath: string): boolean {
  if (relPath.includes('node_modules') || relPath.includes('/dist/')) return false;
  const base = relPath.split('/').pop() ?? '';
  if (base.endsWith('.manifest.json')) return true;
  return relPath.endsWith('src/catalog.json');
}

/** 축이 소유한다고 선언한 파일의 repo 상대경로 집합. */
function declaredAxisFiles(decl: CoverageDeclaration): Set<string> {
  const out = new Set<string>();
  for (const ax of decl.axes) for (const f of ax.files) out.add(`packages/${ax.package}/${f}`);
  return out;
}

/**
 * census 선언과 실제(discovered 카탈로그 파일 목록 + 선택적 매니페스트 통계)를 대조해 **위반 목록**을 반환한다
 * (빈 배열 = 통과). fs·import 없음 → 순수. `discovered`는 repo 상대경로(호출자가 isCatalogFile로 필터).
 */
export function auditCoverage(
  decl: CoverageDeclaration,
  discovered: readonly string[],
  stats?: Readonly<Record<string, ManifestStat>>,
): string[] {
  const violations: string[] = [];

  // 1) 구조 — 상태 enum·필수 필드·infra-pilot followUp 필수(영구 예외 방지).
  const axisIds = new Set<string>();
  for (const ax of decl.axes) {
    if (axisIds.has(ax.id)) violations.push(`중복 축 id "${ax.id}"`);
    axisIds.add(ax.id);
    if (!['covered', 'infra-pilot', 'out-of-scope'].includes(ax.status)) {
      violations.push(`축 "${ax.id}": 알 수 없는 status "${ax.status}"`);
    }
    if (ax.files.length === 0) violations.push(`축 "${ax.id}": files 비어있음`);
    if (ax.status === 'infra-pilot') {
      if (!ax.followUp || ax.followUp.trim() === '') {
        violations.push(`축 "${ax.id}": infra-pilot은 followUp(후속 카드) 필수 — 영구 예외 방지`);
      }
      if (ax.pilotAuthored == null || ax.pilotAuthored < 1) {
        violations.push(`축 "${ax.id}": infra-pilot은 pilotAuthored≥1 필요`);
      }
    }
  }
  for (const oos of decl.outOfScope) {
    if (!oos.rationale?.trim()) violations.push(`out-of-scope "${oos.id}": rationale 필수`);
    if (!oos.promoteTrigger?.trim()) violations.push(`out-of-scope "${oos.id}": promoteTrigger 필수`);
  }

  // 2) 드리프트 스캔 — 발견된 카탈로그 파일이 모두 선언(축 or ignored)돼 있어야 한다.
  const axisFiles = declaredAxisFiles(decl);
  const ignored = new Set(decl.ignoredCatalogFiles ?? []);
  for (const f of discovered) {
    if (!axisFiles.has(f) && !ignored.has(f)) {
      violations.push(`미선언 카탈로그 파일 "${f}" — census(axes 또는 ignoredCatalogFiles)에 등록 필요`);
    }
  }
  // 선언한 축 파일은 실제로 존재해야 한다(discovered에 있어야 함).
  const discoveredSet = new Set(discovered);
  for (const f of axisFiles) {
    if (!discoveredSet.has(f)) violations.push(`선언된 축 파일 "${f}"이 디스크에 없음`);
  }

  // 3) 개수/상태 정합 — 매니페스트 통계가 주어지면 대조(수치는 census가 아니라 매니페스트에서 옴).
  if (stats) {
    for (const ax of decl.axes) {
      if (ax.status === 'out-of-scope') continue;
      const s = stats[ax.id];
      if (!s) {
        violations.push(`축 "${ax.id}": 매니페스트 통계 없음(파일 로드 실패?)`);
        continue;
      }
      if (ax.status === 'covered' && s.authored !== s.total) {
        violations.push(
          `축 "${ax.id}": covered인데 pending 존재(authored=${s.authored}/total=${s.total})`,
        );
      }
      if (ax.status === 'infra-pilot') {
        const min = ax.pilotAuthored ?? 1;
        if (s.authored < min) {
          violations.push(`축 "${ax.id}": infra-pilot authored=${s.authored} < pilotAuthored=${min}`);
        }
      }
    }
  }

  return violations;
}
