# 목표
디자인 시스템 스토어를 만든다.

# 컨셉
이 스토어 사용자는 core pacakge에 theme을 제공해서 구상 디자인 시스템을 완성한다. core도 base layout이 달라질 수 있으므로, core theme에 따라 여러 개의 core를 제공한다. theme은 사용자가 직접 작성할수도 있지만, 이 프로젝트 레포에서 preset으로 몇 개를 제공해서 제공한다.

## Core package
base 레이아웃과 스타일, 로직을 포함하고 있는,컴포넌트 묶음이다. base 레이아웃 디자인에 따라, 여러 core theme을 제공한다. 

## Theme pacakge
base 

### Fallback theme
theme을 지정하지 않았을 때 기본 theme을 사용한다.

## 기술 사양
- react
- storybook
- pnpm
- pnpm workspace
- (그 외 필요한 것 있으면 ai agent가 제안)

## ai agent와 상의해서 결정해야 하는 것
- theme 인터페이스와 규격
- 디자인 원칙

### 미리 제공하는 디자인 원칙
- atomic system을 활용한다.
- 추상 컴포넌트를 만들어야 한다. 즉, 구체적 비즈니스 맥락이 아닌, 범용성에 초점이 맞춰져야 하고, 따라서, 인터페이스가 다소 복잡해질 수 있음을 감내한다.
- 컴포넌트 내부에 컨텐츠가 들어가는 경우, min-width를 우선적으로 고려한다.
