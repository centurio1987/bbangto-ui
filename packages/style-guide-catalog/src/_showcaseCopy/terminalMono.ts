import type { ShowcaseCopyExt } from '../_showcase';

// TerminalShowcase 의 확장 카피. 나눈 까닭과 다시 생성하는 법은 ./index.ts 머리 주석.
export const terminalMonoCopyExt: ShowcaseCopyExt = {
  "menuEyebrow": "$ LS ./OUTPUT",
  "menuTitle": "출력 스트림",
  "skills": [
    "monospace",
    "dark-console",
    "phosphor-green",
    "box-border",
    "cursor-blink",
    "radius-0"
  ],
  "craftEyebrow": "MANIFESTO",
  "craftTitle": "콘솔이 지키는 원칙",
  "philosophy": [
    {
      "label": "STDOUT",
      "title": "정직한 출력",
      "body": "장식 없이 상태를 그대로 흘려보낸다 — 인터페이스는 로그처럼 읽혀야 한다."
    },
    {
      "label": "GRID",
      "title": "고정폭 정렬",
      "body": "모든 글자가 같은 칸을 차지하니 수치와 코드가 저절로 줄을 맞춘다."
    },
    {
      "label": "SIGNAL",
      "title": "절제된 강조",
      "body": "포스포 그린은 오직 지금 중요한 한 줄에만 켜져 신호를 흐리지 않는다."
    }
  ],
  "contact": {
    "email": "root [at] example.invalid",
    "phone": "—",
    "blog": "tty.console.invalid"
  },
  "footer": "// 커서가 깜빡이는 곳, 인터페이스는 명령을 기다린다.",
  "scrollLabel": "SCROLL ↓"
};
