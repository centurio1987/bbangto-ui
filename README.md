<div align="center">
  <img src="./hero.png" alt="BBANGTO UI Hero Image" width="100%" style="border-radius: 12px; margin-bottom: 24px;" />
</div>

# BBANGTO UI

> **Serious Work, Joyful Wit.**

BBANGTO UI는 진지한 엔지니어링 기반 위에 즐겁고 위트 있는 사용자 경험을 제공하는 모던 리액트 디자인 시스템입니다.

---

## 📦 Packages

본 레포지토리는 Monorepo 구조로 설계되어 있으며, pnpm workspace로 관리됩니다.

| 패키지 | 버전 | 설명 |
|--------|------|------|
| `@centurio1987/bbangto-ui-core` | 0.4.0 | 56종 UI 컴포넌트 + 모션 레이어 + 패턴 |
| `@centurio1987/bbangto-ui-tokens` | 0.3.0 | 디자인 토큰 타입 정의 (Colors, Spacing, Typography, Motion 등) |
| `@centurio1987/bbangto-ui-themes` | 0.2.0 | 내장 테마 4종 + 브랜드 프리셋 74종 |
| `@centurio1987/bbangto-ui-hooks` | 0.3.0 | Headless React 훅 31종 |
| `@centurio1987/bbangto-ui-diagram` | 0.2.0 | 시스템 아키텍처 다이어그램 컴포넌트 |
| `apps/storybook` | — | 컴포넌트 카탈로그 및 브라우저 테스트 환경 |

---

## 🚀 Getting Started

### 1. Installation

```bash
pnpm add @centurio1987/bbangto-ui-core @centurio1987/bbangto-ui-tokens @centurio1987/bbangto-ui-themes
```

### 2. Theme Provider Setup

```tsx
import { ThemeProvider } from '@centurio1987/bbangto-ui-core';
import { lightTheme } from '@centurio1987/bbangto-ui-themes';

export default function Root() {
  return (
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  );
}
```

### 3. Component & Motion Usage

```tsx
import { Button } from '@centurio1987/bbangto-ui-core';
import { FadeIn, Spinner } from '@centurio1987/bbangto-ui-core';

export default function Dashboard() {
  return (
    <FadeIn>
      <Button variant="primary">시작하기</Button>
      <Spinner size="md" />
    </FadeIn>
  );
}
```

### 4. Hooks

```tsx
import { useDebounce, useDarkMode, useClickOutside } from '@centurio1987/bbangto-ui-hooks';
```

---

## 🎨 Theme System

내장 테마 4종과 브랜드 프리셋 74종을 제공합니다.

```tsx
import { lightTheme, darkTheme, amberTheme, highContrastTheme } from '@centurio1987/bbangto-ui-themes';

// 브랜드 프리셋 사용
import catalog from '@centurio1987/bbangto-ui-themes/catalog';
const brandTheme = catalog['ocean-breeze'];
```

---

## 🎬 Motion Layer

`@centurio1987/bbangto-ui-core`의 모션 레이어는 **토큰 기반 제로 런타임 의존성** 애니메이션 시스템입니다. framer-motion, emotion 없이 순수 CSS Custom Properties만 사용합니다.

**모션 Atom (26종)**

| 카테고리 | 컴포넌트 |
|----------|----------|
| 전환 래퍼 | `FadeIn`, `SlideIn`, `ScaleIn`, `ScrollReveal`, `Stagger` |
| 텍스트 | `TypingText`, `SplitReveal`, `GradientText`, `CountUp` |
| 로딩 | `Spinner`, `Pulse`, `BarsLoader`, `RingLoader`, `Shimmer` |
| 배경 | `AnimatedGradientBg`, `GridDriftBg`, `BorderBeam` |
| 인터랙션 | `Pressable`, `Ripple`, `Attention`, `Glow` |
| 스크롤 | `Parallax`, `ScrollProgress`, `Marquee`, `Wave` |

`prefers-reduced-motion`을 전역으로 적용하며, 필수 상태 전달 요소(`data-bbangto-motion="essential"`)는 예외 처리합니다.

---

## 🏗 Diagram Package

시스템 아키텍처 다이어그램을 리액트 컴포넌트로 작성할 수 있는 전용 패키지입니다.

```tsx
import { DiagramProvider, Node, Edge } from '@centurio1987/bbangto-ui-diagram';
```

---

## 🛠 Development

```bash
# 의존성 설치
pnpm install

# 전체 패키지 빌드 (storybook 제외)
pnpm build

# Storybook 개발 서버 (포트 6006)
pnpm dev

# 타입 검사
pnpm typecheck

# 브라우저 테스트 (Playwright + chromium)
pnpm test
```

### Quality Gate

모든 PR은 아래 게이트를 통과해야 합니다.

```bash
pnpm typecheck
pnpm build
pnpm test
pnpm --filter storybook build
```

---

<div align="center">
  <sub>Built with ❤️ by the BBANGTO Team.</sub>
</div>
