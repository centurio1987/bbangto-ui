import type { ShowcaseCopyExt } from '../_showcase';

// CyberShowcase 의 확장 카피. 나눈 까닭과 다시 생성하는 법은 ./index.ts 머리 주석.
export const cyberpunkHudCopyExt: ShowcaseCopyExt = {
  "menuEyebrow": "CONSOLE",
  "menuTitle": "작전 콘솔 신호 목록",
  "skills": [
    "네온 HUD",
    "모노 타이포",
    "클립 모서리",
    "스캔라인",
    "코너 브래킷",
    "글리치 신호"
  ],
  "craftEyebrow": "PROTOCOL",
  "craftTitle": "신호를 다루는 세 가지 규약",
  "philosophy": [
    {
      "label": "DARKNESS",
      "title": "어둠을 배경으로",
      "body": "거의 검은 캔버스를 비워 두어야 단 하나의 네온 신호가 가장 밝게 읽힌다."
    },
    {
      "label": "CONTRAST",
      "title": "대비로 위계를",
      "body": "채움이 아니라 밝기 차이로 위계를 세워 눈이 초점을 잃지 않게 한다."
    },
    {
      "label": "RESTRAINT",
      "title": "멈출 줄 아는 모션",
      "body": "reduced-motion 신호가 오면 글리치와 스캔라인을 즉시 꺼 조용한 콘솔로 남는다."
    }
  ],
  "contact": {
    "email": "signal [at] example.invalid",
    "phone": "—",
    "blog": "hud-console.invalid"
  },
  "footer": "near-black 위에 켜진 단 하나의 네온 작전 인터페이스",
  "scrollLabel": "SCROLL ↓"
};
