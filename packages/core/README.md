# @centurio1987/bbangto-ui-core

bbangto-ui의 **React UI 컴포넌트**와 모션 레이어. 스타일은 토큰(CSS 변수)으로만 들어오므로,
같은 컴포넌트를 스타일 가이드만 바꿔 다시 칠할 수 있다.

```tsx
import { Button, StyleGuideProvider } from '@centurio1987/bbangto-ui-core';
```

- 컴포넌트는 접근성 기본값(role·focus ring·키보드 조작)을 갖춘 상태로 나온다
- 모션은 `src/motion`의 atom/variant 조합으로 구성되며 `prefers-reduced-motion`을 존중한다
- 기본 테마(light / dark / high-contrast)가 함께 들어 있다. 브랜드 프리셋은
  `@centurio1987/bbangto-ui-foundations`, 완성된 스타일 가이드는 `@centurio1987/bbangto-ui-style-guide-catalog`

## 원하는 것이 없을 때

core 에 원하는 컴포넌트가 없으면 **앱 안에 확장 컴포넌트를 만든다.** 라이브러리를 빼거나 다른 UI 라이브러리로
바꿀 일이 아니다. core 컴포넌트는 전부 `--bbangto-*` CSS 변수로 칠해지므로, 같은 변수를 읽는 컴포넌트를 앱에서
만들면 테마나 스타일 가이드를 바꿀 때 함께 바뀐다. 순서는 넷이다.

1. **export 에서 찾는다.** 컴포넌트 말고도 페이지 섹션(`Hero`·`PricingSection` 등), 화면 패턴(`SignIn`·`FormLayout` 등),
   모션 atom, 아이콘(이름이 `Icon` 으로 끝난다)이 같은 배럴에서 나온다. 목록은 `dist/index.d.ts` 에 있다.
2. **가까운 것이 있으면 감싼다.** 모자란 것만 더한다. 나머지 prop(`className`·`style`·`aria-*`·`data-*`)은 바깥
   엘리먼트로 넘어가고 `ref` 도 넘어간다. 예외가 셋이다. `DataGrid` 는 `ref`·`className`·`style` 을 받지 않는다.
   `Skeleton`·`Text` 는 `className`·`style` 은 넘기지만 `ref` 는 React 19 에서만 넘어간다.
3. **없으면 토큰으로 만든다.** 색·간격·모서리·그림자·글꼴은 아래 변수로 칠한다. 값은 `FoundationProvider`·
   `StyleGuideProvider` 가 안쪽 엘리먼트에 심으므로, 만든 컴포넌트도 Provider 안에 둔다. 밖에 두면 변수가 없어
   브라우저 기본값으로 그려진다.
4. **개선 요청은 그다음이다.** 앱을 완성한 뒤, 만든 컴포넌트가 다른 앱에도 쓸모 있으면 저장소에 제안한다.
   요청을 이유로 구현을 멈추거나 라이브러리를 바꾸지 않는다.

| 갈래 | 변수 |
| --- | --- |
| 의미 색 | `--bbangto-semantic-primary-{base,hover,active,subtle,foreground}` · `--bbangto-semantic-{error,success,warning}-base` · `--bbangto-semantic-background-{base,elevated,sunken,overlay}` · `--bbangto-semantic-foreground-{base,muted,subtle,inverse}` · `--bbangto-semantic-border-{base,muted,strong,focus}` |
| 간격 | `--bbangto-spacing-{0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,64}` — 숫자가 px 값이다(`spacing-16` = 16px) |
| 모서리 | `--bbangto-radius-{none,sm,md,lg,xl,full}` |
| 그림자 | `--bbangto-shadow-{none,sm,md,lg,xl}` |
| 글꼴 | `--bbangto-typography-font-family-{sans,mono}` · `--bbangto-typography-scale-{display,h1,h2,h3,body,meta}-{font-size,line-height,letter-spacing,font-weight}` |

전체 목록은 `@centurio1987/bbangto-ui-tokens` 를 따로 설치한 뒤 `flattenToCSSVars(lightFoundation)` 으로 뽑는다.
같은 패키지의 `cssVar('semantic', 'primary', 'base')` 는 `var(--bbangto-semantic-primary-base)` 를 돌려준다.
tokens 는 core 의 의존성이지만 pnpm 처럼 엄격한 설치에서는 직접 설치해야 import 할 수 있다.

감쌀 때 걸리는 자리가 둘 있다. 아이콘(`*Icon`)은 색이 그림에 박혀 있어 `color` 나 토큰으로 다시 칠할 수 없다.
`Button` 은 마우스를 올리고 내릴 때 배경·테두리·글자색 인라인 값을 자기 것으로 다시 쓰므로, `style.color` 로
바꾼 색은 hover 한 번에 사라진다. 색이 달라야 하면 `variant`·`color` 로 고르거나 새로 만든다.

### 예제 — 별점 입력

core 에 없는 별점 입력이다. 네이티브 `button` 에 토큰 색을 칠하고, 키보드는 라디오 그룹 규칙을 따른다. 위의
두 자리 때문에 `StarIcon`·`Button` 을 감싸지 않고 별을 직접 그렸다. 이 예제는 저장소 Storybook 의
`Overview/Extend When Missing` 이 실제로 그려 확인한다.

```tsx
import { useRef, useState, type KeyboardEvent } from 'react';

// core 에 별점 입력이 없어서 앱 안에 만든다. 색·간격·모서리는 --bbangto-* 변수로만 칠하므로
// FoundationProvider·StyleGuideProvider 가 바꾸는 테마를 그대로 따른다. Provider 안에 둔다.
// 키보드는 라디오 그룹 규칙을 따른다 — Tab 으로 들어오고 화살표·Home·End 로 고른다.

interface RatingProps {
  label: string;
  value: number;
  onChange: (next: number) => void;
  max?: number;
}

const KEY_STEP: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };

export function Rating({ label, value, onChange, max = 5 }: RatingProps) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const select = (n: number) => {
    const next = Math.min(max, Math.max(1, n));
    onChange(next);
    buttons.current[next - 1]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Home') select(1);
    else if (e.key === 'End') select(max);
    else if (e.key in KEY_STEP) select(value + KEY_STEP[e.key]!);
    else return;
    e.preventDefault();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      style={{ display: 'inline-flex', gap: 'var(--bbangto-spacing-4)' }}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const filled = n <= value;
        return (
          <button
            key={n}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n}점`}
            tabIndex={n === Math.max(value, 1) ? 0 : -1}
            onClick={() => select(n)}
            style={{
              padding: 'var(--bbangto-spacing-4)',
              border: 0,
              borderRadius: 'var(--bbangto-radius-sm)',
              background: 'transparent',
              color: filled ? 'var(--bbangto-semantic-primary-base)' : 'var(--bbangto-semantic-border-strong)',
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path
                d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export function RatingExample() {
  const [value, setValue] = useState(3);
  return <Rating label="만족도" value={value} onChange={setValue} />;
}
```

## 외부 글꼴 (`fonts`)

`FoundationProvider`와 `StyleGuideProvider`는 기본으로 Pretendard(jsDelivr)와 JetBrains Mono(Google Fonts)를
CDN에서 불러온다. 글꼴을 직접 호스팅하거나 CSP로 외부 요청을 막는 앱은 `fonts="none"`으로 끈다.

```tsx
<FoundationProvider>                 {/* 기본값 'external' — 지금까지와 같다 */}
<FoundationProvider fonts="none">    {/* 외부 글꼴 요청 0건. 글꼴은 앱이 직접 불러온다 */}
```

- 글꼴은 `document.head`에 글꼴마다 한 번만 들어간다(`#bbangto-font-pretendard`, `#bbangto-font-jetbrains-mono`).
  Provider를 여러 겹 감싸거나 `VisualizationStyleGuideProvider`를 안에 겹쳐도 요청은 글꼴당 한 번이다.
- 주입은 문서 전체가 나눠 쓴다. 한 Provider에 `fonts="none"`을 줘도 다른 Provider가 이미 넣은 글꼴은 남는다.
  외부 요청을 0건으로 만들려면 문서 안의 Provider 전부에 `fonts="none"`을 준다.
- SSR(서버 렌더링) HTML에는 글꼴 `@import`가 들어가지 않는다. 화면이 켜진(hydration) 뒤에 불러온다.

전체 저장소: [github.com/centurio1987/bbangto-ui](https://github.com/centurio1987/bbangto-ui)
