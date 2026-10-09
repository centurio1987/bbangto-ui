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
      style={{ display: 'inline-flex', gap: 'var(--bbangto-spacing-1)' }}
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
              padding: 'var(--bbangto-spacing-1)',
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
