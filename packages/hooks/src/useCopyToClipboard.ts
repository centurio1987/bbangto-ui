import { useCallback, useState } from 'react';

/**
 * 텍스트를 클립보드에 복사하는 훅.
 *
 * 복사 성공 여부를 상태로 반환한다. 복사 완료 후 `resetMs`(기본 2000ms)가
 * 지나면 `copied` 상태가 자동으로 `false`로 돌아온다.
 *
 * SSR 환경에서는 `navigator.clipboard`가 없으므로 `copy` 호출 시
 * 조용히 `false`를 반환한다.
 *
 * @param resetMs 복사 후 상태 리셋 시간(ms), 기본 2000
 * @returns `[copied, copy]` 튜플
 *
 * @example
 * const [copied, copy] = useCopyToClipboard();
 * <button onClick={() => copy('hello!')}>
 *   {copied ? '복사됨' : '복사'}
 * </button>
 */
export function useCopyToClipboard(
  resetMs = 2000,
): [boolean, (text: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, resetMs);
        return true;
      } catch {
        return false;
      }
    },
    [resetMs],
  );

  return [copied, copy];
}
