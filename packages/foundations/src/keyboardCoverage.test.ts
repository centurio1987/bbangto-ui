/**
 * keyboardCoverage.test.ts — **core 키보드 테스트 커버리지 게이트** (KAN-054).
 *
 * `metadataCoverage.test.ts` 와 같은 자리·같은 구조다. 물리적으로 foundations 에 호스팅하지만 저장소 전역
 * 게이트이고(`test:unit` 의 `pnpm -r` 이 전 패키지를 항상 실행한다), 두 층위로 돈다:
 *  1) 실제 repo 검증 — `keyboard-coverage.json` 선언 vs core 소스·스토리·실제 입력 테스트.
 *  2) fixture 실패주입 — 누락·키보드 없는 스토리·다른 스토리에만 있는 키 입력·실제 입력 누락에서 위반을 낸다.
 *
 * 검사 규칙과 한계는 `keyboardCoverage.ts` 파일 주석에 있다.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  auditFocusRing,
  auditKeyboardCoverage,
  findFocusRingSignals,
  findInteractiveSignals,
  realInputTestPath,
  storyBlock,
  usesKeyboardInput,
  type FocusRingDeclaration,
  type FocusRingInput,
  type KeyboardCoverageDeclaration,
  type KeyboardCoverageInput,
} from './keyboardCoverage';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');

/** dir 하위 파일 중 suffix 로 끝나는 것을 {repo 상대경로: 내용} 으로 읽는다. */
function readTree(absDir: string, suffix: string, acc: Record<string, string> = {}): Record<string, string> {
  if (!existsSync(absDir)) return acc;
  for (const ent of readdirSync(absDir, { withFileTypes: true })) {
    const abs = join(absDir, ent.name);
    if (ent.isDirectory()) readTree(abs, suffix, acc);
    else if (ent.name.endsWith(suffix)) {
      acc[relative(repoRoot, abs).split('\\').join('/')] = readFileSync(abs, 'utf8');
    }
  }
  return acc;
}

/**
 * 누락 검사가 훑는 core 폴더. 처음에는 `components/` 만 봤는데, 같은 검사 함수로 나머지를 훑자
 * `blocks/FeatureGrid.tsx` 의 탭이 키보드로 닿지 않는 결함이 나왔다(KAN-054 검토 §3-5).
 */
const CORE_UI_DIRS = ['components', 'blocks', 'patterns', 'motion'];

function readDecl(): KeyboardCoverageDeclaration & FocusRingDeclaration {
  return JSON.parse(readFileSync(join(repoRoot, 'keyboard-coverage.json'), 'utf8'));
}

describe('keyboard-coverage — 실제 repo', () => {
  const decl = readDecl();
  const input: KeyboardCoverageInput = {
    sources: Object.assign(
      {},
      ...CORE_UI_DIRS.map((dir) => readTree(join(repoRoot, 'packages/core/src', dir), '.tsx')),
    ),
    stories: readTree(join(repoRoot, 'apps/storybook/src/stories'), '.stories.tsx'),
    realInputTests: readTree(join(repoRoot, 'apps/storybook/src/real-input'), '.realinput.test.tsx'),
  };

  it('core 상호작용 컴포넌트마다 키보드 스토리가 있고, 오버레이는 실제 입력 테스트가 있다', () => {
    expect(auditKeyboardCoverage(decl, input)).toEqual([]);
  });

  it('선언한 스토리·소스 경로가 저장소 형식을 따른다', () => {
    for (const e of decl.components) {
      expect(e.source).toMatch(/^packages\/core\/src\/(components|blocks|patterns|motion)\/.+\.tsx$/);
      expect(e.story).toMatch(/^apps\/storybook\/src\/stories\/.+\.stories\.tsx$/);
    }
  });
});

describe('keyboard-coverage — 상호작용 신호', () => {
  it('지정 role 과 네이티브가 아닌 요소의 onClick 을 잡는다', () => {
    expect(findInteractiveSignals('<ul role="menu">')).toEqual(['role=menu']);
    expect(findInteractiveSignals(`<div role={open ? 'dialog' : undefined}>`)).toEqual(['role=dialog']);
    expect(findInteractiveSignals('<div onClick={() => go()}>x</div>')).toEqual(['<div onClick>']);
  });

  it('속성 안의 화살표 함수(=>)에서 끊기지 않는다', () => {
    const src = '<li ref={(n) => setRef(n)} style={{ a: 1 }} onClick={() => pick(i)} />';
    expect(findInteractiveSignals(src)).toEqual(['<li onClick>']);
  });

  it('네이티브 요소와 컴포넌트 태그의 onClick, 중괄호 안의 onClick 은 잡지 않는다', () => {
    expect(findInteractiveSignals('<button onClick={f}>x</button>')).toEqual([]);
    expect(findInteractiveSignals('<a href="#" onClick={f}>x</a>')).toEqual([]);
    expect(findInteractiveSignals('<Button onClick={f}>x</Button>')).toEqual([]);
    expect(findInteractiveSignals('<div render={() => <button onClick={f} />}>x</div>')).toEqual([]);
    expect(findInteractiveSignals('<div role="region">x</div>')).toEqual([]);
  });
});

describe('keyboard-coverage — 스토리 블록', () => {
  const story = [
    "export const Default: Story = { play: async () => { await userEvent.click(b); } };",
    "export const Keyboard: Story = { play: async () => { await userEvent.keyboard('{Enter}'); } };",
    "export const Tabbing: Story = { play: async () => { await userEvent.tab(); } };",
  ].join('\n');

  it('다음 export const 까지 자른다', () => {
    expect(usesKeyboardInput(storyBlock(story, 'Default')!)).toBe(false);
    expect(usesKeyboardInput(storyBlock(story, 'Keyboard')!)).toBe(true);
    expect(usesKeyboardInput(storyBlock(story, 'Tabbing')!)).toBe(true);
  });

  it('이름이 접두어로만 겹치는 스토리를 혼동하지 않는다', () => {
    expect(storyBlock(story, 'Key')).toBeNull();
  });

  it('fireEvent 로 키를 흉내 낸 것은 키보드 입력으로 치지 않는다', () => {
    const fire = "export const Esc: Story = { play: async () => { fireEvent.keyDown(d, { key: 'Escape' }); } };";
    expect(usesKeyboardInput(storyBlock(fire, 'Esc')!)).toBe(false);
  });
});

describe('keyboard-coverage — fixture 실패 주입', () => {
  const SRC = 'packages/core/src/components/Fake.tsx';
  const STORY = 'apps/storybook/src/stories/Fake.stories.tsx';
  const keyboardStory =
    "export const Keyboard: Story = { play: async () => { await userEvent.keyboard('{ArrowDown}'); } };";
  const base: KeyboardCoverageDeclaration = {
    components: [
      {
        component: 'Fake',
        source: SRC,
        story: STORY,
        keyboardStories: ['Keyboard'],
        behaviors: ['↓로 이동'],
        realInput: false,
      },
    ],
    ignored: [],
  };
  const input: KeyboardCoverageInput = {
    sources: { [SRC]: '<ul role="menu" />' },
    stories: { [STORY]: keyboardStory },
    realInputTests: {},
  };

  it('fixture 기준선은 통과한다', () => {
    expect(auditKeyboardCoverage(base, input)).toEqual([]);
  });

  it('선언 없는 상호작용 컴포넌트는 누락으로 잡는다', () => {
    const extra = 'packages/core/src/components/Sneaky.tsx';
    const v = auditKeyboardCoverage(base, {
      ...input,
      sources: { ...input.sources, [extra]: '<div onClick={() => x()} />' },
    });
    expect(v).toHaveLength(1);
    expect(v[0]).toMatch(/^누락 packages\/core\/src\/components\/Sneaky\.tsx/);
  });

  it('ignored 에 사유와 함께 올린 파일은 누락이 아니다', () => {
    const extra = 'packages/core/src/components/Native.tsx';
    const decl = { ...base, ignored: [{ source: extra, reason: '네이티브 입력' }] };
    const v = auditKeyboardCoverage(decl, {
      ...input,
      sources: { ...input.sources, [extra]: '<fieldset role="radiogroup" />' },
    });
    expect(v).toEqual([]);
  });

  it('지정한 스토리의 키보드 입력을 지우면 잡는다', () => {
    const v = auditKeyboardCoverage(base, {
      ...input,
      stories: { [STORY]: keyboardStory.replace("userEvent.keyboard('{ArrowDown}')", 'userEvent.click(b)') },
    });
    expect(v).toEqual(['Fake: 스토리 Keyboard 의 play 가 userEvent.keyboard/tab 을 쓰지 않습니다']);
  });

  it('키 입력이 다른 스토리에만 있으면 잡는다', () => {
    const v = auditKeyboardCoverage(base, {
      ...input,
      stories: {
        [STORY]: [
          'export const Keyboard: Story = { play: async () => { await userEvent.click(b); } };',
          "export const Other: Story = { play: async () => { await userEvent.keyboard('{Enter}'); } };",
        ].join('\n'),
      },
    });
    expect(v).toEqual(['Fake: 스토리 Keyboard 의 play 가 userEvent.keyboard/tab 을 쓰지 않습니다']);
  });

  it('지정한 스토리가 없으면 잡는다', () => {
    const v = auditKeyboardCoverage(base, { ...input, stories: { [STORY]: 'export const Default = {};' } });
    expect(v).toEqual([`Fake: 스토리 Keyboard 이 ${STORY} 에 없습니다`]);
  });

  it('realInput 항목의 실제 입력 테스트가 없거나 vitest/browser 를 안 쓰면 잡는다', () => {
    const decl = { ...base, components: [{ ...base.components[0], realInput: true }] };
    const path = realInputTestPath('Fake');
    expect(auditKeyboardCoverage(decl, input)).toEqual([`Fake: 실제 입력 테스트 ${path} 가 없습니다`]);
    expect(
      auditKeyboardCoverage(decl, {
        ...input,
        realInputTests: { [path]: "import { userEvent } from 'storybook/test';" },
      }),
    ).toEqual([`Fake: ${path} 가 vitest/browser 의 입력을 쓰지 않습니다`]);
    expect(
      auditKeyboardCoverage(decl, {
        ...input,
        realInputTests: { [path]: "import { userEvent } from 'vitest/browser';" },
      }),
    ).toEqual([]);
  });

  it('구조 — 중복 선언·빈 목록·사유 없는 ignored 를 잡는다', () => {
    const decl: KeyboardCoverageDeclaration = {
      components: [
        base.components[0],
        { ...base.components[0], keyboardStories: [], behaviors: [] },
      ],
      ignored: [{ source: 'x.tsx', reason: ' ' }],
    };
    const v = auditKeyboardCoverage(decl, input);
    expect(v).toContain('Fake: 선언이 둘입니다');
    expect(v).toContain('Fake: keyboardStories 가 비었습니다');
    expect(v).toContain('Fake: behaviors 가 비었습니다');
    expect(v).toContain('x.tsx: ignored 에 사유가 없습니다');
  });
});

describe('focus-ring — 실제 repo', () => {
  const decl = readDecl();
  const input: FocusRingInput = {
    sources: Object.assign(
      {},
      ...CORE_UI_DIRS.map((dir) => readTree(join(repoRoot, 'packages/core/src', dir), '.tsx')),
    ),
    realInputTests: readTree(join(repoRoot, 'apps/storybook/src/real-input'), '.realinput.test.tsx'),
  };

  it('브라우저 테두리를 끄거나 입력을 숨긴 core 컴포넌트마다 포커스 표시 규칙과 실제 입력 테스트가 있다', () => {
    expect(auditFocusRing(decl, input)).toEqual([]);
  });

  it('선언한 소스 경로가 저장소 형식을 따른다', () => {
    for (const e of [...decl.focusRing, ...decl.focusRingIgnored]) {
      expect(e.source).toMatch(/^packages\/core\/src\/(components|blocks|patterns|motion)\/.+\.tsx$/);
    }
  });
});

describe('focus-ring — 신호', () => {
  it('인라인 객체와 스타일 문자열의 outline:none 을 잡는다', () => {
    expect(findFocusRingSignals("const s = { outline: 'none' };")).toEqual(['outline:none']);
    expect(findFocusRingSignals('const s = { outline: 0 };')).toEqual(['outline:none']);
    expect(findFocusRingSignals('.x:focus { outline: none; }')).toEqual(['outline:none']);
  });

  it('1px 숨김 패턴을 잡는다', () => {
    expect(findFocusRingSignals("style={{ clip: 'rect(0 0 0 0)' }}")).toEqual(['숨김']);
    expect(findFocusRingSignals("style={{ clip: 'rect(0, 0, 0, 0)' }}")).toEqual(['숨김']);
    expect(findFocusRingSignals("style={{ clipPath: 'inset(50%)' }}")).toEqual(['숨김']);
    expect(findFocusRingSignals('.x input { clip-path: inset(50%); }')).toEqual(['숨김']);
  });

  it('outlineOffset·실제 테두리·부분 잘라내기는 잡지 않는다', () => {
    expect(findFocusRingSignals("const s = { outlineOffset: 0, outline: '2px solid red' };")).toEqual([]);
    expect(findFocusRingSignals('clipPath: `inset(0 0 0 ${p}%)`')).toEqual([]);
  });
});

describe('focus-ring — fixture 실패 주입', () => {
  const SRC = 'packages/core/src/components/Fake.tsx';
  const TEST = 'apps/storybook/src/real-input/FocusVisible.realinput.test.tsx';
  const base: FocusRingDeclaration = {
    focusRing: [{ component: 'Fake', source: SRC, indicator: '자기 자신' }],
    focusRingIgnored: [],
  };
  const input: FocusRingInput = {
    sources: { [SRC]: "import { FOCUS_RING } from '../a11y'; const s = { outline: 'none' };" },
    realInputTests: { [TEST]: "it('Fake: Tab 으로 오면 테두리', async () => {});" },
  };

  it('fixture 기준선은 통과한다', () => {
    expect(auditFocusRing(base, input)).toEqual([]);
  });

  it('목록에 없는 파일의 outline:none 을 누락으로 잡는다', () => {
    const extra = 'packages/core/src/components/Sneaky.tsx';
    const v = auditFocusRing(base, { ...input, sources: { ...input.sources, [extra]: "{ outline: 'none' }" } });
    expect(v).toEqual([`누락 ${extra}: 포커스 표시 신호(outline:none)가 있는데 focusRing 에 없습니다`]);
  });

  it('숨김 패턴만 있는 파일도 누락으로 잡는다', () => {
    const extra = 'packages/core/src/components/Hidden.tsx';
    const v = auditFocusRing(base, {
      ...input,
      sources: { ...input.sources, [extra]: "<input style={{ clip: 'rect(0 0 0 0)' }} />" },
    });
    expect(v).toEqual([`누락 ${extra}: 포커스 표시 신호(숨김)가 있는데 focusRing 에 없습니다`]);
  });

  it('목록에 있지만 공용 규칙을 안 쓰는 소스를 잡는다', () => {
    const v = auditFocusRing(base, { ...input, sources: { [SRC]: "const s = { outline: 'none' };" } });
    expect(v).toEqual([`Fake: ${SRC} 가 FOCUS_RING·useFocusVisible·:focus-visible 을 쓰지 않습니다`]);
  });

  it('목록에 있지만 실제 입력 항목이 없으면 잡는다', () => {
    const v = auditFocusRing(base, {
      ...input,
      realInputTests: { [TEST]: "it('Other: Tab 으로 오면 테두리', async () => {});" },
    });
    expect(v).toEqual(["Fake: 실제 입력 테스트에 'Fake: …' 항목이 없습니다"]);
  });

  it('사유 없는 예외와 빈 indicator 를 잡는다', () => {
    const v = auditFocusRing(
      {
        focusRing: [{ ...base.focusRing[0], indicator: ' ' }],
        focusRingIgnored: [{ source: 'x.tsx', reason: '' }],
      },
      input,
    );
    expect(v).toContain('Fake: indicator 가 비었습니다');
    expect(v).toContain('x.tsx: focusRingIgnored 에 사유가 없습니다');
  });
});
