import type { ShowcaseCopyExt } from '../_showcase';

// PixelArtRetroShowcase 의 확장 카피. 나눈 까닭과 다시 생성하는 법은 ./index.ts 머리 주석.
export const pixelArtRetroCopyExt: ShowcaseCopyExt = {
  "menuEyebrow": "GALLERY",
  "menuTitle": "도트로 찍어낸 화면 갤러리",
  "skills": [
    "8비트 도트",
    "픽셀 그리드",
    "직각 모서리",
    "하드 도트 그림자",
    "고채도 원색",
    "CRT 스캔라인"
  ],
  "craftEyebrow": "PHILOSOPHY",
  "craftTitle": "저해상 안에 담은 규율",
  "philosophy": [
    {
      "label": "GRID",
      "title": "그리드 스냅",
      "body": "모든 좌표는 4px 정수 단위로 떨어진다 — 소수점 자리를 남기지 않아야 도트가 흐려지지 않는다."
    },
    {
      "label": "LIMIT",
      "title": "제한 팔레트",
      "body": "코발트·레드·그린·옐로 네 색으로 화면을 짠다 — 색을 줄일수록 형태가 또렷해진다."
    },
    {
      "label": "HARD EDGE",
      "title": "직각의 정직함",
      "body": "라운드도 블러도 없이 직각과 계단만으로 형태를 세운다 — 경계가 곧 신뢰다."
    }
  ],
  "contact": {
    "email": "hi [at] pixelarcade.example.invalid",
    "phone": "—",
    "blog": "log.pixelarcade.invalid"
  },
  "footer": "저해상이지만 또렷하게 — 픽셀 하나까지 그리드에 맞춘 8비트 스튜디오.",
  "scrollLabel": "SCROLL ↓"
};
