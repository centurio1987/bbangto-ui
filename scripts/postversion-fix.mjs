// changesets 버그 우회: 워크스페이스 앱 패키지명이 npm의 `storybook` 패키지명과
// 정확히 충돌해, `changeset version`이 apps/storybook의 devDependency `storybook`
// 범위를 앱 자신의 버전(예: ^0.0.3)으로 잘못 덮어쓴다. 버전 적용 직후 이 한 줄을
// 실제 Storybook 메이저(@storybook/react-vite 범위와 동일)로 복구한다.
import { readFileSync, writeFileSync } from 'node:fs';

const path = new URL('../apps/storybook/package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(path, 'utf8'));
const desired = pkg.devDependencies?.['@storybook/react-vite'];

if (desired && pkg.devDependencies.storybook !== desired) {
  const broken = pkg.devDependencies.storybook;
  pkg.devDependencies.storybook = desired;
  writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`[postversion-fix] storybook devDep ${broken} -> ${desired} 복구`);
} else {
  console.log('[postversion-fix] storybook devDep 정상 — 변경 없음');
}
