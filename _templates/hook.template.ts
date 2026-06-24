// 템플릿: 신규 헤드리스 훅 (@centurio1987/hooks)
// 사용법: use__Name__ 치환 후 packages/hooks/src/use__Name__.ts 로 복사하고
//        packages/hooks/src/index.ts 에 re-export 추가.
// 규칙: JSX 반환 금지(로직만), zero runtime dependency(react peer만), any 금지,
//      SSR 안전(렌더 중 window/document 직접 접근 금지 — effect 내부에서만),
//      Math.random()/Date.now() 를 렌더 출력에 쓰지 않음.
// 레퍼런스 구현: packages/hooks/src/useIsMounted.ts
import { useCallback, useEffect, useState } from 'react';

export interface Use__Name__Options {
  enabled?: boolean;
}

export function use__Name__(options: Use__Name__Options = {}): boolean {
  const { enabled = true } = options;
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    // 구독/계산 로직. cleanup 반드시 반환.
    setValue(true);
    return () => setValue(false);
  }, [enabled]);

  return value;
}

// 단위 테스트는 packages/hooks/src/use__Name__.test.ts 에 vitest 로 작성한다.
// (테스트 하네스는 Wave 3 착수 시 packages/hooks 에 vitest + @testing-library/react 를 설치해 구성.)
