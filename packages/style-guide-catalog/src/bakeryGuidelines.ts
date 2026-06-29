/**
 * Neobrutalism_Editorial_01 사용 가이드라인.
 *
 * StyleGuideTokens.guidelines 규격(Record<string, Record<string, unknown>>)에 맞춘
 * 구조화 데이터. 도구/문서가 키 기반으로 읽어 렌더링할 수 있다.
 */
export const bakeryGuidelines: Record<string, Record<string, unknown>> = {
  surface: {
    title: '표면 & 테두리',
    dos: [
      '모든 경계는 잉크(--bbangto-ext-ink) 실선 테두리로 명확히 구분한다.',
      '카드·배지는 각진 모서리(radius 0)를 유지한다.',
    ],
    donts: [
      '부드러운 blur 그림자를 쓰지 않는다 — 그림자는 blur 0 오프셋만.',
      '둥근 모서리(border-radius > 0)를 도입하지 않는다(원형 아바타 제외).',
    ],
  },
  color: {
    title: '색 사용',
    dos: [
      '골드(--bbangto-ext-accent)는 강조(배지·포커스 링·버튼 오프셋 그림자)에만 쓴다.',
      '색 위 텍스트는 항상 잉크(ink-on-color)로 올려 대비를 확보한다.',
    ],
    donts: [
      '골드를 넓은 면적의 본문 배경으로 쓰지 않는다(가독성 저하).',
      '크림 위에 골드 텍스트를 쓰지 않는다(대비 부족).',
    ],
  },
  typography: {
    title: '타이포그래피',
    rule: '본문은 IBM Plex Sans KR(sans), 라벨·수치·코드는 IBM Plex Mono(mono).',
    requiredFonts: ['IBM Plex Sans KR', 'IBM Plex Mono'],
    note: '웹폰트는 호스트(앱/Storybook)가 로드한다. 컴포넌트 내부에서 @import 하지 않는다.',
  },
  accessibility: {
    title: '접근성',
    rules: [
      'focus-visible 시 골드 outline(2px)로 키보드 포커스를 분명히 표시한다.',
      'prefers-reduced-motion에서는 버튼 transform/transition을 비활성화한다.',
      '인터랙션 요소는 의미에 맞는 태그를 쓴다 — 페이지 내 이동은 <a href>, 동작은 <button>.',
    ],
  },
};
