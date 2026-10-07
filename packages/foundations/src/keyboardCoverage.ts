/**
 * keyboardCoverage — **core 상호작용 컴포넌트 키보드 테스트 커버리지 게이트**의 순수 검증기 (KAN-054).
 *
 * 같은 키보드·포커스 결함이 core 여러 곳에 퍼진 것은 키보드 테스트를 요구하는 장치가 없었기 때문이다.
 * 규칙을 문서에 적는 대신 `test:unit` 에서 막는다. 자리와 짜임은 `metadataCoverage.ts` 를 따른다
 * (SSOT 선언 = 저장소 루트 `keyboard-coverage.json`, 이 파일 = fs 없는 순수 함수, `.test.ts` = 실제 저장소 + fixture).
 *
 * 세 검사:
 *  1) 누락 — core `components/`·`blocks/`·`patterns/`·`motion/` 에서 상호작용 신호(아래 `findInteractiveSignals`)가 있는 파일이 선언(`components[].source`
 *     또는 `ignored[].source`)에 없으면 위반. 선언이 검사보다 넓은 것은 허용한다(DataGrid 처럼 컴포넌트 태그에
 *     `onClick` 을 단 경우는 신호로 안 잡힌다).
 *  2) 테스트 — 각 항목의 `keyboardStories` 가 스토리 파일에 `export const <이름>` 으로 있고, 그 블록에 play 함수와
 *     `userEvent.keyboard(` / `userEvent.tab(` 이 있어야 한다. 파일 단위로만 보면 키만 누르고 아무것도 확인하지
 *     않는 스토리 하나로도 통과하므로 **스토리 이름 단위**로 본다.
 *  3) 실제 입력 — `realInput: true` 항목은 `apps/storybook/src/real-input/<component>.realinput.test.tsx` 가 있고
 *     그 파일이 `vitest/browser` 의 입력을 써야 한다. play 테스트의 `userEvent` 는 이벤트를 흉내 내서, 열 때
 *     포커스가 옮겨 가는 오버레이의 렌더 순서 결함을 못 잡는다(KAN-053 Modal Enter 결함).
 *
 * **커버리지 한계**: 스토리 블록은 다음 `export const` 까지 정규식으로 자른다. 블록 밖 헬퍼 함수 안에서 키를
 * 누르면 못 본다. 키를 누른 뒤 무엇을 확인하는지는 보지 않는다 — 그것은 `behaviors` 를 읽는 사람의 몫이다.
 *
 * **포커스 표시 검사**(KAN-059, `auditFocusRing`)는 같은 선언 파일의 `focusRing`·`focusRingIgnored` 를 본다.
 * 키보드로 닿아도 화면에 표시가 없던 원인은 둘이었다 — 인라인 `outline: 'none'` 으로 브라우저 기본 테두리를 끄고
 * 대신 그리는 것이 없거나, 입력 요소를 1px 로 숨겨(`clip: rect(0 0 0 0)` 등) 브라우저 테두리가 보이지 않는 것.
 *  1) 누락 — 그 신호(`findFocusRingSignals`)가 나온 파일이 `focusRing[].source` 나 `focusRingIgnored[].source` 에 없으면 위반.
 *  2) 규칙 — `focusRing` 의 소스가 공용 규칙(`FOCUS_RING`·`useFocusVisible`) 이나 `:focus-visible` 스타일을 쓰지 않으면 위반.
 *  3) 실제 입력 — 키보드 포커스인지(`:focus-visible`)는 흉내 낸 입력으로 믿기 어려워, `real-input` 테스트 어딘가에
 *     `it('<component>: …')` 항목이 있어야 한다.
 * 한계: 신호는 정규식이라 스타일을 변수에 담아 계산하면 못 본다. 테두리가 실제로 보이는지는 실제 입력 테스트가 진다.
 */

/** 선언 1행 — 키보드 테스트가 있어야 하는 컴포넌트. */
export interface KeyboardCoverageEntry {
  readonly component: string;
  /** core 소스 파일(repo 상대경로). 한 파일에 컴포넌트가 둘이면(Menu·DropdownMenu) 같은 값을 두 행이 쓴다. */
  readonly source: string;
  /** 스토리 파일(repo 상대경로). */
  readonly story: string;
  /** 키보드 동작을 확인하는 스토리 export 이름. 전부 있어야 한다. */
  readonly keyboardStories: readonly string[];
  /** WAI-ARIA APG 기준으로 필요한 동작(사람이 읽는 값, 검사 대상 아님). */
  readonly behaviors: readonly string[];
  /** 열 때 포커스가 옮겨 가는 오버레이 — 실제 입력 테스트가 있어야 한다. */
  readonly realInput: boolean;
}

/** 신호에 걸리지만 키보드 테스트를 요구하지 않는 파일. 사유 필수. */
export interface KeyboardCoverageIgnored {
  readonly source: string;
  readonly reason: string;
}

/** keyboard-coverage.json 전체. */
export interface KeyboardCoverageDeclaration {
  readonly components: readonly KeyboardCoverageEntry[];
  readonly ignored: readonly KeyboardCoverageIgnored[];
}

/** 검사에 넘기는 저장소 상태(테스트가 fs 로 읽어 주입). 키는 repo 상대경로. */
export interface KeyboardCoverageInput {
  /** core `components/`·`blocks/`·`patterns/`·`motion/` 아래 `.tsx` 소스. */
  readonly sources: Readonly<Record<string, string>>;
  /** 스토리 파일. 없으면 키가 없다. */
  readonly stories: Readonly<Record<string, string>>;
  /** 실제 입력 테스트 파일. 없으면 키가 없다. */
  readonly realInputTests: Readonly<Record<string, string>>;
}

/** 상호작용으로 보는 ARIA role. */
export const INTERACTIVE_ROLES = [
  'dialog',
  'tablist',
  'listbox',
  'combobox',
  'menu',
  'tree',
  'grid',
  'radiogroup',
] as const;

/** `onClick` 을 달아도 키보드가 저절로 되는 네이티브 요소. */
const NATIVE_CLICKABLE = new Set(['button', 'a', 'input', 'select', 'textarea', 'label', 'summary']);

/** 실제 입력 테스트 파일 경로. */
export function realInputTestPath(component: string): string {
  return `apps/storybook/src/real-input/${component}.realinput.test.tsx`;
}

/**
 * JSX 여는 태그 하나의 속성 문자열을 돌려준다. `{}` 깊이와 문자열을 따라가므로 속성 안의 `=>` 에서 끊기지 않는다.
 * `start` 는 `<` 바로 뒤 태그 이름이 끝난 자리다.
 */
function readAttributes(src: string, start: number): string {
  let depth = 0;
  let quote: string | null = null;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}') depth--;
    else if (ch === '>' && depth === 0) return src.slice(start, i);
  }
  return src.slice(start);
}

/** 속성 문자열에서 깊이 0 의 속성 이름만 뽑는다(중괄호 안의 `onClick` 은 다른 요소의 것일 수 있다). */
function topLevelAttributeNames(attrs: string): Set<string> {
  const names = new Set<string>();
  let depth = 0;
  let quote: string | null = null;
  for (let i = 0; i < attrs.length; i++) {
    const ch = attrs[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}') depth--;
    else if (depth === 0 && /[A-Za-z]/.test(ch) && (i === 0 || /\s/.test(attrs[i - 1]))) {
      const m = /^[A-Za-z][\w-]*/.exec(attrs.slice(i));
      if (m) {
        names.add(m[0]);
        i += m[0].length - 1;
      }
    }
  }
  return names;
}

/**
 * 소스 한 파일의 상호작용 신호. 빈 배열이면 신호 없음.
 *  - `role="<INTERACTIVE_ROLES>"` (문자열 리터럴. 삼항 안의 리터럴도 잡는다)
 *  - 네이티브가 아닌 소문자 요소에 깊이 0 의 `onClick`
 */
export function findInteractiveSignals(src: string): string[] {
  const signals = new Set<string>();
  const roleRe = new RegExp(`['"](${INTERACTIVE_ROLES.join('|')})['"]`, 'g');
  for (const m of src.matchAll(/role=\{?([^}\n>]*)/g)) {
    for (const r of m[1].matchAll(roleRe)) signals.add(`role=${r[1]}`);
  }
  for (const m of src.matchAll(/<([a-z][a-z0-9]*)(?=[\s>/])/g)) {
    const tag = m[1];
    if (NATIVE_CLICKABLE.has(tag)) continue;
    const attrs = readAttributes(src, m.index! + 1 + tag.length);
    if (topLevelAttributeNames(attrs).has('onClick')) signals.add(`<${tag} onClick>`);
  }
  return [...signals].sort();
}

/** 스토리 파일에서 `export const <name>` 블록(다음 export const 까지)을 잘라 낸다. 없으면 null. */
export function storyBlock(storySrc: string, name: string): string | null {
  const re = new RegExp(`^export const ${name}\\b`, 'm');
  const m = re.exec(storySrc);
  if (!m) return null;
  const rest = storySrc.slice(m.index + m[0].length);
  const next = /^export const /m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

/** 블록이 play 함수 안에서 키보드 입력을 쓰는가. */
export function usesKeyboardInput(block: string): boolean {
  return /\bplay\s*:/.test(block) && /\buserEvent\.(keyboard|tab)\(/.test(block);
}

/**
 * 선언과 저장소 상태를 대조해 위반 목록을 낸다(빈 배열 = 통과). 위반 문자열은 컴포넌트·파일 이름으로 시작한다.
 */
export function auditKeyboardCoverage(
  decl: KeyboardCoverageDeclaration,
  input: KeyboardCoverageInput,
): string[] {
  const violations: string[] = [];

  // 0) 구조
  const seen = new Set<string>();
  for (const e of decl.components) {
    if (seen.has(e.component)) violations.push(`${e.component}: 선언이 둘입니다`);
    seen.add(e.component);
    if (e.keyboardStories.length === 0) violations.push(`${e.component}: keyboardStories 가 비었습니다`);
    if (e.behaviors.length === 0) violations.push(`${e.component}: behaviors 가 비었습니다`);
  }
  for (const ig of decl.ignored) {
    if (!ig.reason.trim()) violations.push(`${ig.source}: ignored 에 사유가 없습니다`);
  }

  // 1) 누락
  const declared = new Set([...decl.components.map((e) => e.source), ...decl.ignored.map((i) => i.source)]);
  for (const [path, src] of Object.entries(input.sources)) {
    const signals = findInteractiveSignals(src);
    if (signals.length > 0 && !declared.has(path)) {
      violations.push(`누락 ${path}: 상호작용 신호(${signals.join(', ')})가 있는데 keyboard-coverage.json 에 없습니다`);
    }
  }
  for (const e of decl.components) {
    if (!(e.source in input.sources)) violations.push(`${e.component}: 소스 ${e.source} 가 없습니다`);
  }

  // 2) 테스트
  for (const e of decl.components) {
    const story = input.stories[e.story];
    if (story === undefined) {
      violations.push(`${e.component}: 스토리 파일 ${e.story} 가 없습니다`);
      continue;
    }
    for (const name of e.keyboardStories) {
      const block = storyBlock(story, name);
      if (block === null) violations.push(`${e.component}: 스토리 ${name} 이 ${e.story} 에 없습니다`);
      else if (!usesKeyboardInput(block)) {
        violations.push(`${e.component}: 스토리 ${name} 의 play 가 userEvent.keyboard/tab 을 쓰지 않습니다`);
      }
    }
  }

  // 3) 실제 입력
  for (const e of decl.components) {
    if (!e.realInput) continue;
    const path = realInputTestPath(e.component);
    const test = input.realInputTests[path];
    if (test === undefined) violations.push(`${e.component}: 실제 입력 테스트 ${path} 가 없습니다`);
    else if (!/from ['"]vitest\/browser['"]/.test(test)) {
      violations.push(`${e.component}: ${path} 가 vitest/browser 의 입력을 쓰지 않습니다`);
    }
  }

  return violations;
}

/** 포커스 표시 선언 1행 — 브라우저 기본 테두리를 끄거나 입력을 숨겨서, 표시를 직접 그려야 하는 컴포넌트(KAN-059). */
export interface FocusRingEntry {
  /** 실제 입력 테스트의 `it('<component>: …')` 접두. */
  readonly component: string;
  /** core 소스 파일(repo 상대경로). */
  readonly source: string;
  /** 테두리를 그리는 자리(사람이 읽는 값, 검사 대상 아님). */
  readonly indicator: string;
}

/** keyboard-coverage.json 의 포커스 표시 부분. */
export interface FocusRingDeclaration {
  readonly focusRing: readonly FocusRingEntry[];
  /** 신호에 걸리지만 포커스를 받지 않는 파일. 사유 필수. */
  readonly focusRingIgnored: readonly KeyboardCoverageIgnored[];
}

/** 포커스 표시 검사에 넘기는 저장소 상태. 키는 repo 상대경로. */
export interface FocusRingInput {
  /** core `components/`·`blocks/`·`patterns/`·`motion/` 아래 `.tsx` 소스. */
  readonly sources: Readonly<Record<string, string>>;
  /** `apps/storybook/src/real-input/` 아래 실제 입력 테스트 전부. */
  readonly realInputTests: Readonly<Record<string, string>>;
}

/**
 * 소스 한 파일의 포커스 표시 신호. 빈 배열이면 신호 없음.
 *  - `outline: none|0` — 인라인 객체(`outline: 'none'`)와 스타일 문자열(`outline: none;`) 둘 다
 *  - 1px 숨김 — `clip: rect(0 …)`, `clipPath: 'inset(50%)'`·`clip-path: inset(50%)`
 */
export function findFocusRingSignals(src: string): string[] {
  const signals: string[] = [];
  if (/\boutline\s*:\s*['"]?\s*(?:none|0)\b/.test(src)) signals.push('outline:none');
  if (/\bclip\s*:\s*['"]?rect\(\s*0[\s,)]|\bclip(?:Path|-path)\s*:\s*['"]?inset\(\s*50%\s*\)/.test(src)) {
    signals.push('숨김');
  }
  return signals;
}

/** 소스가 공용 포커스 표시 규칙을 쓰는가. */
export function usesFocusRingRule(src: string): boolean {
  return /\b(?:FOCUS_RING\w*|useFocusVisible)\b|:focus-visible\b/.test(src);
}

/** 실제 입력 테스트 묶음 중 하나라도 `it('<component>: …')` 항목을 갖는가. */
export function hasFocusRingTest(tests: Readonly<Record<string, string>>, component: string): boolean {
  const re = new RegExp(`\\bit\\(\\s*['"\`]${component}:`);
  return Object.values(tests).some((t) => re.test(t));
}

/**
 * 포커스 표시 선언과 저장소 상태를 대조해 위반 목록을 낸다(빈 배열 = 통과).
 * 위반 문자열은 컴포넌트·파일 이름으로 시작한다.
 */
export function auditFocusRing(decl: FocusRingDeclaration, input: FocusRingInput): string[] {
  const violations: string[] = [];

  // 0) 구조
  const seen = new Set<string>();
  for (const e of decl.focusRing) {
    if (seen.has(e.component)) violations.push(`${e.component}: focusRing 선언이 둘입니다`);
    seen.add(e.component);
    if (!e.indicator.trim()) violations.push(`${e.component}: indicator 가 비었습니다`);
  }
  for (const ig of decl.focusRingIgnored) {
    if (!ig.reason.trim()) violations.push(`${ig.source}: focusRingIgnored 에 사유가 없습니다`);
  }

  // 1) 누락
  const declared = new Set([...decl.focusRing.map((e) => e.source), ...decl.focusRingIgnored.map((i) => i.source)]);
  for (const [path, src] of Object.entries(input.sources)) {
    const signals = findFocusRingSignals(src);
    if (signals.length > 0 && !declared.has(path)) {
      violations.push(`누락 ${path}: 포커스 표시 신호(${signals.join(', ')})가 있는데 focusRing 에 없습니다`);
    }
  }

  // 2) 규칙
  for (const e of decl.focusRing) {
    const src = input.sources[e.source];
    if (src === undefined) violations.push(`${e.component}: 소스 ${e.source} 가 없습니다`);
    else if (!usesFocusRingRule(src)) {
      violations.push(`${e.component}: ${e.source} 가 FOCUS_RING·useFocusVisible·:focus-visible 을 쓰지 않습니다`);
    }
  }

  // 3) 실제 입력
  for (const e of decl.focusRing) {
    if (!hasFocusRingTest(input.realInputTests, e.component)) {
      violations.push(`${e.component}: 실제 입력 테스트에 '${e.component}: …' 항목이 없습니다`);
    }
  }

  return violations;
}
