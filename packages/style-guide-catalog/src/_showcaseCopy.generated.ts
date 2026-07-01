import type { ShowcaseCopyExt } from './_showcase';

/*
 * Style Guide Catalog — Showcase 확장 카피 레지스트리 (결정론적 주입 sink).
 *
 * 키 = 각 Showcase displayName(makeShowcase 3번째 인자). 값 = 에디토리얼 확장 섹션
 * (gallery/skills/philosophy/contact/footer) 텍스트. 템플릿 렌더 구조(_showcase.tsx)는
 * 코드로 고정, 정체성 문장·키워드만 여기 데이터로 주입한다.
 *
 * 이 파일은 showcase-copy-generate 워크플로가 가이드별 schema 검증 데이터를 생성한 뒤
 * JS(JSON.stringify)로 결정론적 조립한 결과다. NeobrutalismShowcase는 손저작 보존.
 */
export const SHOWCASE_COPY_EXT: Record<string, ShowcaseCopyExt> = {
  "NeobrutalismShowcase": {
    "menuEyebrow": "TODAY'S BAKE",
    "menuTitle": "오늘의 빵",
    "skills": [
      "AWS",
      "TypeScript",
      "Nest.js",
      "Vue.js",
      "Kubernetes",
      "Terraform"
    ],
    "craftEyebrow": "WHAT WE BAKE",
    "craftTitle": "우리가 굽는 것",
    "philosophy": [
      {
        "label": "PRODUCT",
        "title": "제품",
        "body": "아이디어를 정성껏 반죽해, 손에 잡히는 제품으로 구워 냅니다."
      },
      {
        "label": "INFRA",
        "title": "인프라",
        "body": "꺼지지 않는 화덕처럼, 안정적인 클라우드를 지킵니다."
      },
      {
        "label": "CRAFT",
        "title": "철학",
        "body": "장인의 레시피로, 끊임없이 공부하며 더 나은 맛을 찾습니다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "blog.example.invalid"
    },
    "footer": "오븐 · SOFTWARE BAKERY · 코드와 철학을 굽습니다 · ovens on 24/7",
    "scrollLabel": "SCROLL ↓"
  },
  "AiSurrealGradient3dShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "부유하는 렌더 갤러리",
    "skills": [
      "이리데센트",
      "3D 렌더",
      "스펙큘러 글로스",
      "크로마 시프트",
      "딥 다크 무대",
      "접지 그림자"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛으로 빚고, 어둠으로 붙든다",
    "philosophy": [
      {
        "label": "PRINCIPLE 01",
        "title": "절제된 무지개",
        "body": "색은 헤딩과 표면 장식에만 흐르게 두고, 본문은 언제나 솔리드 대비를 지켜 읽힘을 무너뜨리지 않는다."
      },
      {
        "label": "PRINCIPLE 02",
        "title": "떠 있음의 물리",
        "body": "소프트 접지 그림자로 오브젝트를 어둠에 붙들어, 부유가 허공이 아니라 무게를 가진 존재가 되게 한다."
      },
      {
        "label": "PRINCIPLE 03",
        "title": "고요한 광학",
        "body": "크로마 시프트와 시머는 각도의 선물일 뿐, 감속 모션 환경에선 정적으로 멈춰 눈을 지킨다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "render-lab.invalid"
    },
    "footer": "딥 다크 위에서 빛을 조각하는 초현실 렌더 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "ArtDecoShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "황금 라인의 진열장",
    "skills": [
      "Symmetry",
      "Gold Line",
      "Geometry",
      "Display Serif",
      "Fan Motif",
      "Onyx & Jade"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "기하가 곧 격조다",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "절제된 광채",
        "body": "골드는 아껴 쓸수록 빛난다. 라인 하나에도 위계를 담아 장식이 소음이 되지 않게 한다."
      },
      {
        "label": "ORDER",
        "title": "직선의 위엄",
        "body": "둥근 모서리를 버리고 직각과 축을 세워, 흑과 딥그린 위에 흔들림 없는 질서를 새긴다."
      },
      {
        "label": "HERITAGE",
        "title": "1920s의 호흡",
        "body": "넓은 자간의 대문자 세리프로 고전 극장의 격식을 되살려, 화면에 시대의 품격을 입힌다."
      }
    ],
    "contact": {
      "email": "atelier [at] example.invalid",
      "phone": "—",
      "blog": "goldline-atelier.invalid"
    },
    "footer": "황금 기하로 새긴 럭셔리 인터페이스의 아틀리에",
    "scrollLabel": "SCROLL ↓"
  },
  "AuroraShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "빛의 스펙트럼 갤러리",
    "skills": [
      "Mesh Gradient",
      "Dark Glass",
      "Glow Orb",
      "Motion Flow",
      "Reduced Motion",
      "Ice Focus"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛을 다루는 원칙",
    "philosophy": [
      {
        "label": "DEPTH",
        "title": "깊이는 겹으로",
        "body": "단색이 아니라 겹쳐 번지는 빛의 층위로 화면의 공간감을 만든다."
      },
      {
        "label": "RESTRAINT",
        "title": "절제된 발광",
        "body": "글로우는 초점을 모을 때만 켜고, 나머지는 어둠에 맡겨 시선을 흐리지 않는다."
      },
      {
        "label": "CARE",
        "title": "모두를 위한 흐름",
        "body": "움직임을 줄이려는 사용자에게는 흐름을 멈추고 대비를 지켜 읽힘을 보장한다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "aurora-mesh.invalid"
    },
    "footer": "딥 다크 위로 흐르는 빛, 오로라 메시 인터페이스 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "BauhausShowcase": {
    "menuEyebrow": "COMPOSITION",
    "menuTitle": "면과 도형으로 조립한 구성표",
    "skills": [
      "3원색",
      "면 분할",
      "기하 산세리프",
      "굵은 윤곽선",
      "하드 그림자",
      "원형 장식"
    ],
    "craftEyebrow": "PRINCIPLE",
    "craftTitle": "구성을 지배하는 세 가지 원칙",
    "philosophy": [
      {
        "label": "ORDER",
        "title": "질서가 먼저",
        "body": "장식보다 격자를 먼저 세우고, 모든 요소를 직각의 규칙 위에 배치한다."
      },
      {
        "label": "CONTRAST",
        "title": "긴장의 균형",
        "body": "원색과 흑백, 직선과 원형을 맞세워 화면에 팽팽한 긴장을 남긴다."
      },
      {
        "label": "HONESTY",
        "title": "재료의 정직함",
        "body": "면은 면대로, 선은 선대로 감추지 않고 구조 자체를 그대로 드러낸다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "grid-atelier.invalid"
    },
    "footer": "기하와 원색으로 질서를 조립하는 구성 실험실",
    "scrollLabel": "SCROLL ↓"
  },
  "BentoShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "타일로 짜는 보드",
    "skills": [
      "모듈 그리드",
      "둥근 타일",
      "soft elevation",
      "산세리프",
      "인디고/틸 액센트",
      "비대칭 균형"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "한 판에 담는 원칙",
    "philosophy": [
      {
        "label": "GRID",
        "title": "비대칭의 균형",
        "body": "크고 작은 셀을 섞되 한 판의 무게 중심을 흐트러뜨리지 않는 정렬을 지향한다."
      },
      {
        "label": "RHYTHM",
        "title": "일관된 간격",
        "body": "모든 타일이 같은 gap으로 숨 쉬어야 시선이 칸에서 칸으로 매끄럽게 옮겨간다."
      },
      {
        "label": "DEPTH",
        "title": "떠 있는 층위",
        "body": "얇은 보더와 부드러운 그림자만으로 각 셀이 판 위에 살짝 떠오른 층을 만든다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "bento-board.invalid"
    },
    "footer": "모듈로 정렬하고, 균형으로 완성하는 도시락 그리드 시스템.",
    "scrollLabel": "SCROLL ↓"
  },
  "BlueprintTechnicalShowcase": {
    "menuEyebrow": "SHEET INDEX",
    "menuTitle": "도면 시트 색인",
    "skills": [
      "아이소메트릭 투상",
      "치수 주석",
      "8px 모눈 정렬",
      "1px 라인 드로잉",
      "번호 콜아웃",
      "모노 라벨링"
    ],
    "craftEyebrow": "DRAFTING CODE",
    "craftTitle": "제도의 원칙",
    "philosophy": [
      {
        "label": "PRECISION",
        "title": "허용 오차 0",
        "body": "모든 선은 모눈 위에 스냅하고, 눈대중이 아니라 치수로 위치를 확정한다."
      },
      {
        "label": "RESTRAINT",
        "title": "채움 없는 표현",
        "body": "그림자와 색면을 버리고 선의 두께와 투상각만으로 깊이를 만든다."
      },
      {
        "label": "LEGIBILITY",
        "title": "읽히는 도면",
        "body": "번호와 텍스트 라벨을 항상 병기해 색에 기대지 않고도 구조가 판독되게 한다."
      }
    ],
    "contact": {
      "email": "drafting [at] example.invalid",
      "phone": "—",
      "blog": "sheet-index.invalid"
    },
    "footer": "모눈 위에 정렬한 1px 도면 언어 — DWG SYSTEM",
    "scrollLabel": "SCROLL ↓"
  },
  "ClayShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "빚어낸 표면 갤러리",
    "skills": [
      "점토 압출",
      "파스텔 팔레트",
      "말랑 반응",
      "라운드 xl",
      "이중 그림자"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "말랑함을 다루는 원칙",
    "philosophy": [
      {
        "label": "TOUCH",
        "title": "만지고 싶은 손맛",
        "body": "인터페이스는 눈으로 읽기 전에 손끝이 먼저 반응하도록, 두툼함과 촉감을 우선 설계한다."
      },
      {
        "label": "CALM",
        "title": "소음을 아끼는 절제",
        "body": "압출과 그림자는 강한 표현인 만큼, 꼭 필요한 곳에만 얹어 화면의 고요함을 지킨다."
      },
      {
        "label": "WARMTH",
        "title": "파스텔의 다정함",
        "body": "차갑지 않은 라벤더와 다색 파스텔로, 기능보다 먼저 편안한 인상을 건넨다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "clayplay.studio.invalid"
    },
    "footer": "말랑한 점토로 빚는 인터페이스 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "CollageShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "붙여 둔 페이지들",
    "skills": [
      "크라프트지",
      "콜라주",
      "핸드라이팅",
      "마스킹 테이프",
      "스티커 라벨",
      "폴라로이드"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "손으로 엮는 페이지",
    "philosophy": [
      {
        "label": "IMPERFECTION",
        "title": "기울어진 각도",
        "body": "완벽한 정렬 대신 살짝 어긋난 각도가 사람의 손길과 오늘의 온도를 남긴다."
      },
      {
        "label": "LAYERING",
        "title": "겹쳐 붙이기",
        "body": "사진 위에 메모, 그 위에 테이프 한 조각까지 쌓으며 이야기의 깊이를 만든다."
      },
      {
        "label": "KEEPSAKE",
        "title": "남겨 두는 마음",
        "body": "지나가는 순간을 오려 종이에 고정해 언제든 다시 펼쳐 볼 수 있는 기록으로 둔다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "scrapdays.invalid"
    },
    "footer": "오려 붙인 종이 위에 남기는 오늘의 콜라주 기록",
    "scrollLabel": "SCROLL ↓"
  },
  "CyberShowcase": {
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
  },
  "DarkLuxeShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "어둠 속 컬렉션",
    "skills": [
      "다크 베이스",
      "골드 헤어라인",
      "디스플레이 세리프",
      "시네마틱 여백",
      "각진 편집감",
      "모노 캡션"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "덜어냄으로 남기는 격",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "절제",
        "body": "장식을 더하기보다 걷어내어, 단 한 줄의 골드가 스스로 빛나게 둔다."
      },
      {
        "label": "CONTRAST",
        "title": "대비",
        "body": "순흑의 침묵과 정제된 빛이 부딪히는 자리에서 위계와 긴장이 태어난다."
      },
      {
        "label": "PATIENCE",
        "title": "정적",
        "body": "서두르지 않는 등장과 넓은 호흡으로, 시선이 머물 시간을 설계한다."
      }
    ],
    "contact": {
      "email": "atelier [at] example.invalid",
      "phone": "—",
      "blog": "darkluxe-editorial.invalid"
    },
    "footer": "어둠을 캔버스 삼아 절제된 빛으로 편집하는 다크 럭셔리 에디토리얼",
    "scrollLabel": "SCROLL ↓"
  },
  "EditorialShowcase": {
    "menuEyebrow": "CONTENTS",
    "menuTitle": "이번 호의 지면",
    "skills": [
      "세리프 위계",
      "헤어라인 규칙선",
      "잉크 온 페이퍼",
      "드롭캡",
      "칼럼 그리드",
      "모노 캡션"
    ],
    "craftEyebrow": "EDITORIAL",
    "craftTitle": "지면을 짜는 원칙",
    "philosophy": [
      {
        "label": "HIERARCHY",
        "title": "위계가 먼저다",
        "body": "무엇을 크게 두고 무엇을 낮출지 정하는 순간이 한 지면의 목소리를 결정한다."
      },
      {
        "label": "RESTRAINT",
        "title": "여백은 편집이다",
        "body": "덜어낸 자리마다 활자가 숨 쉴 공간이 생기고, 그 절제가 읽는 속도를 지킨다."
      },
      {
        "label": "LEGIBILITY",
        "title": "읽힘을 위한 대비",
        "body": "잉크와 종이의 흔들림 없는 대비가 모든 장식보다 오래 남는 신뢰를 만든다."
      }
    ],
    "contact": {
      "email": "editor [at] example.invalid",
      "phone": "—",
      "blog": "pressroom.invalid"
    },
    "footer": "잉크 온 페이퍼로 짜인 편집 지면 — 읽기를 위한 위계",
    "scrollLabel": "SCROLL ↓"
  },
  "FlatMaterialShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "표면들의 갤러리",
    "skills": [
      "Tonal Palette",
      "Elevation",
      "State Layer",
      "Pill Shape",
      "Dynamic Color",
      "M3 Chip"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "평면을 다루는 원칙",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "하나의 근원",
        "body": "모든 표면과 강조는 단 하나의 키컬러에서 갈라져 나오며, 그 뿌리를 벗어나지 않는다."
      },
      {
        "label": "RHYTHM",
        "title": "빛의 위계",
        "body": "높이는 색이 아니라 그림자가 만든다 — 떠오른 정도가 곧 중요도의 언어다."
      },
      {
        "label": "RESPONSE",
        "title": "닿는 순간",
        "body": "누르고 스치는 모든 접촉은 표면 위에 얇은 층으로 번져, 인터랙션을 눈에 보이게 한다."
      }
    ],
    "contact": {
      "email": "surface [at] example.invalid",
      "phone": "—",
      "blog": "tonal-system.invalid"
    },
    "footer": "평면 위에 질서를 세우는 톤과 elevation의 언어",
    "scrollLabel": "SCROLL ↓"
  },
  "AeroShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "광택 표면 갤러리",
    "skills": [
      "아쿠아 글로스",
      "글라스 표면",
      "하늘 그라디언트",
      "물방울 하이라이트",
      "잎·물·하늘"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "맑음을 설계하는 원칙",
    "philosophy": [
      {
        "label": "CLARITY",
        "title": "맑은 빛의 위계",
        "body": "표면이 투명할수록 정보의 층위를 빛의 세기로 구분해 어디를 봐야 할지 자연스럽게 안내한다."
      },
      {
        "label": "BREATH",
        "title": "여백은 하늘",
        "body": "요소 사이의 빈 공간을 하늘처럼 넉넉히 열어 광택 표면이 숨 쉴 자리를 남긴다."
      },
      {
        "label": "OPTIMISM",
        "title": "밝은 낙관",
        "body": "자연에서 온 색과 반짝임으로 사용자에게 산뜻하고 긍정적인 첫인상을 건넨다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "aero-gloss.studio.invalid"
    },
    "footer": "하늘과 물의 광택을 담는 가상 인터페이스 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "GlassmorphismShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "유리 표면 갤러리",
    "skills": [
      "Frosted Glass",
      "Backdrop Blur",
      "Aurora Glow",
      "1px Highlight",
      "Depth Layering",
      "Dark Canvas"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "투명함이 만드는 위계",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "비침의 절제",
        "body": "뒤 배경을 비추되 콘텐츠를 삼키지 않도록, 투명도는 읽힘이 무너지기 직전에서 멈춘다."
      },
      {
        "label": "VALUE",
        "title": "빛의 경계",
        "body": "표면과 표면 사이는 그림자가 아니라 가장자리에 맺힌 한 줄의 빛으로 구분한다."
      },
      {
        "label": "RHYTHM",
        "title": "고요한 색온",
        "body": "보라와 시안의 오로라는 배경에 스며들어 흐르며, 초점이 필요한 순간에만 조용히 밝아진다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "aurora-glass.invalid"
    },
    "footer": "깊은 색 위에 빛을 머금은 유리를 겹쳐 올리는 인터페이스 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "GlitchDistortionShowcase": {
    "menuEyebrow": "SIGNAL_FEED",
    "menuTitle": "깨진 프레임의 아카이브",
    "skills": [
      "채널 오프셋",
      "슬라이스 점프",
      "데이터모시",
      "듀오톤",
      "스캔라인",
      "픽셀 블록"
    ],
    "craftEyebrow": "PROTOCOL",
    "craftTitle": "손상을 다루는 규칙",
    "philosophy": [
      {
        "label": "NOISE_AS_FORM",
        "title": "의도된 손상",
        "body": "노이즈는 실수가 아니라 문법이다 — 어긋남의 양과 순간을 설계해 통제된 붕괴만을 남긴다."
      },
      {
        "label": "LEGIBLE_BASE",
        "title": "읽히는 정적",
        "body": "정지 상태는 언제나 판독 가능해야 하며, 왜곡은 오직 반응의 순간에만 전면으로 나선다."
      },
      {
        "label": "SAFE_FLICKER",
        "title": "안전한 깜빡임",
        "body": "섬광은 눈을 아프게 하지 않는 선에서 멈추고, 모션을 끈 사용자에게는 침묵을 돌려준다."
      }
    ],
    "contact": {
      "email": "signal [at] example.invalid",
      "phone": "—",
      "blog": "corrupt-feed.invalid"
    },
    "footer": "깨진 채널로 말하는 듀오톤 글리치 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "GothicMedievalDigitalShowcase": {
    "menuEyebrow": "RELIQUARY",
    "menuTitle": "성물 갤러리",
    "skills": [
      "블랙레터",
      "왁스 인장",
      "네온 릴릭",
      "성물 도상",
      "디지털 그리드",
      "다크 신비주의"
    ],
    "craftEyebrow": "CANON",
    "craftTitle": "충돌을 위한 계율",
    "philosophy": [
      {
        "label": "RITE",
        "title": "절제된 위계",
        "body": "화면 전체를 어둠에 잠재우고 단 하나의 광원만 허락함으로써, 시선이 스스로 정점을 찾아가도록 설계한다."
      },
      {
        "label": "TENSION",
        "title": "성과 속의 충돌",
        "body": "중세의 경건함과 회로의 냉기를 억지로 화해시키지 않고, 그 균열 자체를 미학의 언어로 남긴다."
      },
      {
        "label": "GRAIN",
        "title": "물성의 기억",
        "body": "매끈한 픽셀 위에 인쇄와 양피지의 결을 새겨, 디지털 표면에 손끝의 촉감을 되돌려 준다."
      }
    ],
    "contact": {
      "email": "scriptorium [at] example.invalid",
      "phone": "—",
      "blog": "reliquary-grid.invalid"
    },
    "footer": "어둠의 성소에서 단 하나의 빛을 벼리는 디지털 필경실",
    "scrollLabel": "SCROLL ↓"
  },
  "GrainyBlurDreamyShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "헤이즈 갤러리",
    "skills": [
      "필름 그레인",
      "아웃포커스 블러",
      "헤이즈 그라디언트",
      "저대비 무드",
      "잉크 단색 헤드라인",
      "시네마틱 여백"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "흐림을 다루는 원칙",
    "philosophy": [
      {
        "label": "TEXTURE",
        "title": "매끈함보다 입자",
        "body": "완벽한 매끄러움을 지우고 가시적 그레인을 남겨 화면에 손에 잡히는 촉감을 부여한다."
      },
      {
        "label": "CONTRAST",
        "title": "흐림과 또렷함의 분리",
        "body": "배경은 안개처럼 풀어놓되 메시지는 단 한 겹, 선명한 대비로 반드시 읽히게 만든다."
      },
      {
        "label": "RESTRAINT",
        "title": "부드러운 빛만 허용",
        "body": "윤곽이 날카로운 그림자를 버리고 은은한 앰비언트 헤이즈로만 깊이를 쌓는다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "hazefield.invalid"
    },
    "footer": "입자 낀 안개 속에서 한 줄만 또렷하게 — 몽환적 포토그래픽 헤이즈 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "HalftoneDotPrintShowcase": {
    "menuEyebrow": "PRESS SHEET",
    "menuTitle": "인쇄 분해 견본집",
    "skills": [
      "망점 스크린",
      "CMYK 색분해",
      "키라인",
      "그로테스크 산세리프",
      "스크린 각",
      "모노 캡션"
    ],
    "craftEyebrow": "PRESS ETHIC",
    "craftTitle": "점이 지키는 원칙",
    "philosophy": [
      {
        "label": "REGISTRATION",
        "title": "정합",
        "body": "네 채널이 정확히 겹칠 때만 색이 맑게 선다 — 어긋난 도트는 흐림이 아니라 오정합이다."
      },
      {
        "label": "HONESTY",
        "title": "드러난 격자",
        "body": "톤을 숨기지 않고 점의 크기와 밀도로 정직하게 노출해, 인쇄 과정 자체를 화면으로 삼는다."
      },
      {
        "label": "FLATNESS",
        "title": "평면의 힘",
        "body": "그림자 없이 1px 키라인과 도트 밀도만으로 깊이를 세워, 종이 위 인쇄의 물성을 지킨다."
      }
    ],
    "contact": {
      "email": "press [at] example.invalid",
      "phone": "—",
      "blog": "screentone.studio.invalid"
    },
    "footer": "망점으로 분해하고 키라인으로 마감하는 인쇄 분해 스튜디오.",
    "scrollLabel": "SCROLL ↓"
  },
  "HalftoneGlitchColorsepShowcase": {
    "menuEyebrow": "PRESS RUN",
    "menuTitle": "색분해 프레스 룩북",
    "skills": [
      "망점 스크린",
      "채널 오프셋",
      "2~3색 한정 잉크",
      "헤비 그로테스크",
      "오정합 콜라주",
      "글리치 슬라이스"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "어긋남을 다루는 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "한정된 잉크",
        "body": "팔레트를 2~3색으로 묶을수록 채널이 어긋날 때 생기는 깊이가 또렷해진다고 믿는다."
      },
      {
        "label": "INTENTION",
        "title": "의도된 오정합",
        "body": "어긋남은 실수가 아니라 배치의 선택이며, 각 슬라이스의 각도와 이동량을 손으로 조율한다."
      },
      {
        "label": "LEGIBILITY",
        "title": "읽히는 본문",
        "body": "장식은 찢고 흔들되 본문 잉크는 단일 솔리드로 또렷하게 지켜 판독을 최우선에 둔다."
      }
    ],
    "contact": {
      "email": "press [at] example.invalid",
      "phone": "—",
      "blog": "colorsep-press.invalid"
    },
    "footer": "한정 잉크와 의도된 어긋남으로 깊이를 찍는 색분해 프레스",
    "scrollLabel": "SCROLL ↓"
  },
  "HeritageFolkOrnamentShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "무늬 갈무리",
    "skills": [
      "대칭 플로럴",
      "스캘럽 보더",
      "코너 오너먼트",
      "다색 면 위계",
      "near-flat 공예",
      "흙빛 팔레트"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "손이 물려준 규칙",
    "philosophy": [
      {
        "label": "ORDER",
        "title": "대칭의 위안",
        "body": "좌우가 맞물릴 때 무늬는 비로소 숨을 고르니, 대칭과 반복으로 어수선함을 다스려 눈이 쉴 자리를 먼저 마련한다."
      },
      {
        "label": "RESTRAINT",
        "title": "비운 자리의 격",
        "body": "화려함은 테두리에 모으고 본문 면은 단색으로 비워, 손맛과 읽힘이 서로를 밀어내지 않도록 절제를 지킨다."
      },
      {
        "label": "LINEAGE",
        "title": "물림의 예의",
        "body": "새 색을 더하되 물려받은 짜임은 함부로 흩지 않으며, 흙빛 바탕과 꽃·새의 자리를 대대로 이어 온 약속처럼 지킨다."
      }
    ],
    "contact": {
      "email": "ateliar [at] example.invalid",
      "phone": "—",
      "blog": "folk-ornament.invalid"
    },
    "footer": "흙빛 바탕에 대대로 물려받은 무늬를 두르는 공예 오너먼트 가이드",
    "scrollLabel": "SCROLL ↓"
  },
  "HumanistShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "손끝이 지나간 자리",
    "skills": [
      "손그림",
      "종이결",
      "어스톤",
      "잉크 보더",
      "유기 곡선",
      "미세 그레인"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "다정함으로 그리는 원칙",
    "philosophy": [
      {
        "label": "HONESTY",
        "title": "결함을 드러내다",
        "body": "고르지 않은 선과 어긋난 정렬을 지우지 않고 그대로 남겨 화면에 사람의 손길을 담습니다."
      },
      {
        "label": "WARMTH",
        "title": "온기를 먼저",
        "body": "차가운 완결성보다 오래 곁에 두고 싶은 따뜻함을 앞세워 진심이 먼저 닿도록 설계합니다."
      },
      {
        "label": "RESTRAINT",
        "title": "절제된 흐트러짐",
        "body": "비틀림은 딱 필요한 만큼만 허용해 감성은 살리되 정보와 가독성은 흔들지 않습니다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "studio.humanist.invalid"
    },
    "footer": "손때 묻은 화면을 빚는 작은 작업실",
    "scrollLabel": "SCROLL ↓"
  },
  "IridescentChromeShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "시프트하는 포일의 진열",
    "skills": [
      "홀로그래픽 포일",
      "리퀴드 크롬",
      "이리데센트",
      "specular 하이라이트",
      "근흑 무대",
      "각도 시프트"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "금속은 빛을 훔쳐 색을 만든다",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "불투명이 먼저다",
        "body": "투명하게 비치는 유리가 아니라 빛을 되쏘는 금속 표면으로 만든다 — 반짝임은 두께 위에서만 진짜가 된다."
      },
      {
        "label": "CONTRAST",
        "title": "무대는 어둡게",
        "body": "근흑의 정적을 깔아야 스펙트럼이 살아나므로, 화려함은 배경이 침묵할 때만 허락한다."
      },
      {
        "label": "MOTION",
        "title": "각도가 곧 색이다",
        "body": "보는 방향과 손끝의 움직임에 따라 색을 흘려보내되, 정지를 원하는 눈에는 고요한 포일로 되돌려준다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "foil-atelier.invalid"
    },
    "footer": "근흑 무대 위, 각도마다 다시 태어나는 크롬의 아틀리에",
    "scrollLabel": "SCROLL ↓"
  },
  "KawaiiShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "말랑말랑 파스텔 갤러리",
    "skills": [
      "파스텔 팔레트",
      "둥근 곡선",
      "볼터치 글로우",
      "마스코트",
      "잉크 대비"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "둥글게, 사뿐하게, 또렷하게",
    "philosophy": [
      {
        "label": "SOFTNESS",
        "title": "모든 모서리를 둥글게",
        "body": "직각을 지워 표면 전체가 말랑하게 느껴지도록, 곡선을 기본값으로 삼는다."
      },
      {
        "label": "CLARITY",
        "title": "옅은 색은 진한 잉크로 받친다",
        "body": "파스텔의 낮은 대비는 진한 잉크색 텍스트로 또렷하게 붙잡아 읽기 쉽게 만든다."
      },
      {
        "label": "WARMTH",
        "title": "친근함이 먼저",
        "body": "장식은 뽐내기 위한 것이 아니라 다가서기 쉬운 다정한 인상을 남기기 위한 것이다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "pastel-friends.invalid"
    },
    "footer": "둥글둥글 파스텔 친구들 · 말랑한 곡선으로 만든 다정한 인상",
    "scrollLabel": "SCROLL ↓"
  },
  "KineticShowcase": {
    "menuEyebrow": "TYPE SPECIMENS",
    "menuTitle": "움직이는 활자 표본",
    "skills": [
      "Variable Font",
      "Kinetic Hover",
      "Monospace Meta",
      "단색 대비",
      "Reduced-Motion"
    ],
    "craftEyebrow": "PRINCIPLES",
    "craftTitle": "움직임을 다루는 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "하나의 신호",
        "body": "단색 위에 강조색은 오직 하나, 시선이 갈 곳을 흐리지 않도록 절제한다."
      },
      {
        "label": "HIERARCHY",
        "title": "굵기가 곧 위계",
        "body": "크기와 자간과 굵기만으로 위계를 세우고, 장식 없이 평면을 지킨다."
      },
      {
        "label": "RESPECT",
        "title": "멈춤을 존중",
        "body": "모션을 꺼도 같은 의미가 남도록 정적 폴백을 항상 함께 설계한다."
      }
    ],
    "contact": {
      "email": "type [at] example.invalid",
      "phone": "—",
      "blog": "kinetic-specimen.invalid"
    },
    "footer": "단색 배경 위, 커서를 따라 자라는 활자 하나.",
    "scrollLabel": "SCROLL ↓"
  },
  "MaxShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "터지는 화면들",
    "skills": [
      "충돌색",
      "가변 타이포",
      "겹침 레이아웃",
      "하드 섀도",
      "고채도",
      "네온"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "과잉을 다루는 규칙",
    "philosophy": [
      {
        "label": "CONTRAST",
        "title": "대비는 사수한다",
        "body": "채도를 아무리 끌어올려도 텍스트와 포커스의 대비는 절대 양보하지 않는다."
      },
      {
        "label": "HIERARCHY",
        "title": "소리에도 순서가 있다",
        "body": "모두가 외치면 아무도 들리지 않으니, 폭발은 강조 지점 하나에만 허락한다."
      },
      {
        "label": "MOTION",
        "title": "과함에도 배려를",
        "body": "떠오르고 눌리는 촉감은 즐겁되, 멈춤을 원하는 눈에는 조용히 정지한다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "dopamine.studio.invalid"
    },
    "footer": "과잉을 설계하는 고채도 인터페이스 실험실",
    "scrollLabel": "SCROLL ↓"
  },
  "MemphisShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "도형이 부딪치는 진열장",
    "skills": [
      "고채도 충돌",
      "지그재그",
      "테리조",
      "하드 그림자",
      "굵은 윤곽",
      "혼합 radius"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "소음 속에서도 읽히게",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "질서 있는 무질서",
        "body": "색과 형태를 마음껏 부딪치되, 그 소란을 지탱하는 뼈대는 언제나 계산된 규칙 위에 세운다."
      },
      {
        "label": "VALUE",
        "title": "읽히는 즐거움",
        "body": "장난스러운 표면이 정보를 가리는 순간 실패이므로, 유쾌함과 가독성은 늘 같은 편에 둔다."
      },
      {
        "label": "SPIRIT",
        "title": "경계 없는 놀이",
        "body": "정답이라 여겨지는 조합을 일부러 어긋내며, 예상치 못한 만남에서 새 리듬을 발견한다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "memphis-mix.studio.invalid"
    },
    "footer": "규칙을 비틀되 결코 흐트러지지 않는, 포스트모던 표면의 작업장.",
    "scrollLabel": "SCROLL ↓"
  },
  "MinimalSaasShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "화면 갤러리",
    "skills": [
      "여백 설계",
      "그레이 스케일",
      "단일 액센트",
      "1px 보더",
      "정보 밀도",
      "포커스 링"
    ],
    "craftEyebrow": "PRINCIPLES",
    "craftTitle": "조용한 제품의 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "덜어내기",
        "body": "화면에 남길 이유를 증명하지 못한 요소는 지운다 — 남은 것이 더 또렷해진다."
      },
      {
        "label": "HIERARCHY",
        "title": "위계로 말하기",
        "body": "강조는 색이 아니라 크기와 간격, 무게의 차이로 먼저 세운다."
      },
      {
        "label": "CONSISTENCY",
        "title": "예측 가능함",
        "body": "같은 동작은 늘 같은 자리와 같은 반응으로 답해 사용자의 신뢰를 쌓는다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "studio.saas.invalid"
    },
    "footer": "콘텐츠가 먼저인 제품 UI 시스템",
    "scrollLabel": "SCROLL ↓"
  },
  "MixedMediaCollageShowcase": {
    "menuEyebrow": "COMPOSITE",
    "menuTitle": "합성 레이어 갤러리",
    "skills": [
      "듀오톤",
      "그레인",
      "z-레이어",
      "컷아웃",
      "블렌드 모드",
      "그라운드 섀도"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "여럿을 한 톤으로 합치는 원칙",
    "philosophy": [
      {
        "label": "UNITY",
        "title": "톤이 먼저다",
        "body": "매체가 무엇이든 명도와 색온도를 먼저 맞춰야 이질감이 사라지고 한 장의 이미지로 읽힌다."
      },
      {
        "label": "DEPTH",
        "title": "위계로 읽힌다",
        "body": "이음새를 지우는 대신 레이어의 깊이와 순서로 무엇을 먼저 볼지 시선을 설계한다."
      },
      {
        "label": "RESTRAINT",
        "title": "손맛은 절제한다",
        "body": "회전과 그레인은 감각을 더하는 양념일 뿐, 가독성과 정보를 삼키는 순간 덜어낸다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "collage-lab.invalid"
    },
    "footer": "여러 매체를 한 호흡으로 합성하는 레이어 콜라주 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "NaiveDoodleShowcase": {
    "menuEyebrow": "SKETCHBOOK",
    "menuTitle": "낙서장 갤러리",
    "skills": [
      "크레용 스크리블",
      "손그림 윤곽선",
      "원색 마커",
      "화살표 주석",
      "삐뚤 정렬",
      "둥근 산세리프"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "삐뚤어도 지키는 규칙",
    "philosophy": [
      {
        "label": "PLAYFUL",
        "title": "실수는 개성",
        "body": "선이 삐져나가고 정렬이 어긋나도 지우지 않는다 — 그 흔들림 자체가 손그림의 표정이 된다."
      },
      {
        "label": "LEGIBLE",
        "title": "장난은 헤드에만",
        "body": "채색과 낙서는 마음껏 흩뿌리되, 본문만큼은 또렷한 산세리프로 남겨 누구나 편히 읽게 한다."
      },
      {
        "label": "CONTRAST",
        "title": "원색은 부딪혀야 산다",
        "body": "빨강·파랑·노랑을 조율하지 않고 천진하게 충돌시켜 종이 위에 아이의 에너지를 채운다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "scribble-note.invalid"
    },
    "footer": "크레용 한 자루로 그린, 삐뚤빼뚤 낙서 보드",
    "scrollLabel": "SCROLL ↓"
  },
  "NeumorphismShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "떠오른 표면의 진열",
    "skills": [
      "단색 표면",
      "이중 그림자",
      "압출/inset",
      "부드러운 라운드",
      "촉각 UI"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛이 곧 구조다",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "하나의 색으로",
        "body": "표면과 배경을 같은 색조로 묶어, 깊이는 오직 빛의 방향에서만 읽히게 한다."
      },
      {
        "label": "TACTILE",
        "title": "손끝의 반응",
        "body": "누름과 떠오름을 상태로 되돌려, 화면 위 요소가 물리적으로 만져지는 감각을 남긴다."
      },
      {
        "label": "CLARITY",
        "title": "저대비를 보정하다",
        "body": "부드러움에 안주하지 않고 텍스트와 포커스에는 또렷한 대비를 따로 확보한다."
      }
    ],
    "contact": {
      "email": "soft [at] example.invalid",
      "phone": "—",
      "blog": "softsurface.invalid"
    },
    "footer": "한 색의 표면, 빛으로 빚은 깊이 — Soft UI 스타일 가이드",
    "scrollLabel": "SCROLL ↓"
  },
  "OpArtKineticShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "진동하는 패턴의 목록",
    "skills": [
      "평행선 반복",
      "위상 드리프트",
      "고대비 흑백",
      "코발트 액센트",
      "옵티컬 리듬",
      "압축 그로테스크"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "눈을 흔드는 규칙",
    "philosophy": [
      {
        "label": "RHYTHM",
        "title": "반복이 곧 운동",
        "body": "같은 선을 정확히 되풀이할 때 정적인 면이 스스로 진동하기 시작한다."
      },
      {
        "label": "RESTRAINT",
        "title": "장식은 한 면에만",
        "body": "옵티컬 패턴을 화면 전체에 흩뿌리지 않고 한두 곳에 가둬야 그 울림이 산다."
      },
      {
        "label": "CLARITY",
        "title": "대비를 지키는 절제",
        "body": "흔들림은 배경의 몫으로 남기고, 읽어야 할 것은 언제나 고요한 솔리드 면 위에 둔다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "kinetic-grid.invalid"
    },
    "footer": "평행선과 위상, 눈이 만드는 착시의 스튜디오.",
    "scrollLabel": "SCROLL ↓"
  },
  "OrganicFluidBlobShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "흐름의 진열장",
    "skills": [
      "유체 곡선",
      "다색 그라디언트",
      "블롭 모핑",
      "바이오모픽",
      "평면 깊이",
      "스쿼클"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "굳지 않는 형태의 원칙",
    "philosophy": [
      {
        "label": "FLOW",
        "title": "흐름이 곧 구조",
        "body": "정지한 격자 대신 번지는 색면과 곡률로 위계를 세워, 화면이 살아 움직이면서도 시선의 길을 잃지 않게 한다."
      },
      {
        "label": "LEGIBILITY",
        "title": "색은 배경, 글자는 솔리드",
        "body": "비비드한 보간 구간은 배경과 보더 링에만 흐르게 하고, 읽어야 할 문장은 언제나 또렷한 솔리드 면 위에 놓는다."
      },
      {
        "label": "STILLNESS",
        "title": "그림자 없는 깊이",
        "body": "무거운 드롭섀도를 얹지 않고 색의 명암 보간만으로 원근을 빚어, 가볍고 매끈한 평면성을 지킨다."
      }
    ],
    "contact": {
      "email": "flow [at] example.invalid",
      "phone": "—",
      "blog": "fluidblob.studio.invalid"
    },
    "footer": "흐르는 곡선과 색으로 말하는 유체 디자인 랭귀지",
    "scrollLabel": "SCROLL ↓"
  },
  "PhotoTypeEditorialShowcase": {
    "menuEyebrow": "SPREADS",
    "menuTitle": "지면을 넘기는 커버 갤러리",
    "skills": [
      "background-clip 타입",
      "그로테스크 디스플레이",
      "포토 마스킹",
      "하드 오프셋",
      "각진 프레임",
      "톤다운 흑백"
    ],
    "craftEyebrow": "PRINCIPLES",
    "craftTitle": "평면 위에서 겹치는 원칙",
    "philosophy": [
      {
        "label": "SURFACE",
        "title": "평면의 정직함",
        "body": "깊이는 그림자가 아니라 레이어의 겹침과 마스킹으로만 만들어, 지면은 끝까지 한 장의 평면으로 남는다."
      },
      {
        "label": "CONTRAST",
        "title": "단색과 사진의 충돌",
        "body": "차콜·오렌지·옐로 단색 면이 톤다운된 사진과 정면으로 부딪히며 긴장을 만든다."
      },
      {
        "label": "LEGIBILITY",
        "title": "형태가 먼저 읽힌다",
        "body": "활자를 아무리 크게 눌러도 단어의 뼈대는 무너뜨리지 않아, 의미가 장식에 잡아먹히지 않는다."
      }
    ],
    "contact": {
      "email": "desk [at] example.invalid",
      "phone": "—",
      "blog": "photo-type-desk.invalid"
    },
    "footer": "포토와 타입이 한 평면에서 녹아드는 에디토리얼 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "PixelArtRetroShowcase": {
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
  },
  "PunkGrungeGraffitiShowcase": {
    "menuEyebrow": "WALL",
    "menuTitle": "벽에 붙은 진 더미",
    "skills": [
      "XEROX",
      "HALFTONE",
      "SPRAY",
      "찢긴 가장자리",
      "랜섬노트",
      "JITTER"
    ],
    "craftEyebrow": "MANIFESTO",
    "craftTitle": "거칠게 외치는 세 가지 규칙",
    "philosophy": [
      {
        "label": "NOISE",
        "title": "거칠기가 목소리다",
        "body": "매끈함을 지우고 복사기 번짐과 그레인을 남겨, 흠집이 곧 메시지가 되게 한다."
      },
      {
        "label": "CLASH",
        "title": "충돌로 세운 위계",
        "body": "형광 스폿을 아껴 오프블랙 위에 부딪히고, 소음 속에서도 한 곳만 크게 외치게 둔다."
      },
      {
        "label": "DIY",
        "title": "허가 없는 손",
        "body": "테이프와 스프레이로 직접 덧붙여, 완성보다 지금 벽에 붙이는 속도를 택한다."
      }
    ],
    "contact": {
      "email": "riot [at] example.invalid",
      "phone": "—",
      "blog": "wheatpaste.invalid"
    },
    "footer": "복사하고, 찢고, 붙인다 — 규칙 없이 벽에서 외치는 진.",
    "scrollLabel": "SCROLL ↓"
  },
  "RadiantGlowDarkShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "발광 컬렉션",
    "skills": [
      "Radial Glow",
      "Dark Mood",
      "Bloom Depth",
      "Noise Grain",
      "Neon Accent"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛을 다루는 원칙",
    "philosophy": [
      {
        "label": "FOCUS",
        "title": "하나의 초점",
        "body": "빛은 흩뿌릴수록 흐려진다 — 발광은 한 점으로 모을 때 비로소 무대가 된다."
      },
      {
        "label": "RESTRAINT",
        "title": "어둠의 절제",
        "body": "표면 대부분을 near-black으로 비워 두어야 중심의 발광이 강렬하게 살아난다."
      },
      {
        "label": "TEXTURE",
        "title": "빛의 결",
        "body": "미세한 노이즈 그레인으로 매끈한 발광에 질감을 입혀 화면이 차갑게 식지 않게 한다."
      }
    ],
    "contact": {
      "email": "glow [at] example.invalid",
      "phone": "—",
      "blog": "radiantglow.invalid"
    },
    "footer": "어둠 위에 빛을 켜는 다크 라디언트 글로우 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "RetroShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "어스톤으로 짠 갤러리",
    "skills": [
      "Earthtone Palette",
      "Film Grain",
      "Groovy Round",
      "Pill Shape",
      "Arch Card",
      "Space Mono"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "따뜻함을 쌓는 규칙",
    "philosophy": [
      {
        "label": "WARMTH",
        "title": "온도부터",
        "body": "차가운 회색을 배제하고 크림과 어스톤의 온도로 화면 전체의 무드를 먼저 세운다."
      },
      {
        "label": "TACTILE",
        "title": "손맛의 결",
        "body": "하단 솔리드 그림자와 옅은 그레인으로 눌리고 만져지는 아날로그 촉감을 남긴다."
      },
      {
        "label": "SOFTNESS",
        "title": "모난 곳 없이",
        "body": "모든 모서리를 라운드와 아치로 풀어 시선이 걸리지 않고 부드럽게 흐르게 한다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "warmretro.invalid"
    },
    "footer": "따뜻한 70년대의 결을 오늘의 인터페이스로 굽는 가상 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "RisographPrintShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "분판이 겹친 인쇄 면들",
    "skills": [
      "스팟 잉크",
      "오버프린트",
      "미스레지스트레이션",
      "망점 그레인",
      "듀오톤",
      "그로테스크 산세리프"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "한계가 색을 낳는다",
    "philosophy": [
      {
        "label": "LIMIT",
        "title": "제한된 팔레트",
        "body": "두세 색으로 스스로를 묶을 때 겹침이 제3색을 만들어 팔레트가 도리어 넓어진다."
      },
      {
        "label": "HONEST",
        "title": "공정을 숨기지 않는다",
        "body": "어긋난 분판과 화면을 덮는 그레인은 감출 결함이 아니라 인쇄가 남긴 정직한 서명이다."
      },
      {
        "label": "FLAT",
        "title": "깊이는 질감으로",
        "body": "그림자를 걷어낸 평면 위에서 깊이는 잉크의 농도와 종이의 결로만 말한다."
      }
    ],
    "contact": {
      "email": "press [at] example.invalid",
      "phone": "—",
      "blog": "overprint-studio.invalid"
    },
    "footer": "한정 잉크로 겹쳐 찍는 가상의 리소 인쇄 면 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "RomanticBotanicalShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "피어난 화면들의 정원",
    "skills": [
      "파스텔 팔레트",
      "화이트 라인아트",
      "세리프 디스플레이",
      "꽃잎 radius",
      "soft ambient",
      "보태니컬 도상"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "정원을 짓는 세 가지 마음",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "절제된 로맨틱",
        "body": "파스텔과 라인아트는 넘칠 때가 아니라 비울 때 가장 향기로우므로, 장식은 의미가 있는 자리에만 한 송이씩 놓는다."
      },
      {
        "label": "LEGIBILITY",
        "title": "읽히는 아름다움",
        "body": "흰 잉크의 낭만은 언제나 어두운 본문 톤이 또렷이 읽힌 다음의 사치이며, 대비 없는 우아함은 두지 않는다."
      },
      {
        "label": "BREATH",
        "title": "숨 쉬는 여백",
        "body": "꽃이 피려면 사이 공간이 필요하듯, 넉넉한 spacing과 낮은 그림자로 화면이 정원 위를 가볍게 부유하게 둔다."
      }
    ],
    "contact": {
      "email": "atelier [at] example.invalid",
      "phone": "—",
      "blog": "garden-lineart.invalid"
    },
    "footer": "파스텔 정원 위에 흰 잉크로 그린 화면 — 로맨틱 보태니컬 스타일 가이드",
    "scrollLabel": "SCROLL ↓"
  },
  "ScandiShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "따뜻한 결의 진열대",
    "skills": [
      "우드톤",
      "세이지 액센트",
      "종이 결",
      "부드러운 radius",
      "저채도 대비",
      "휴머니스트 산세리프"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "덜어내어 남긴 온기",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "절제",
        "body": "채우기보다 비우기를 먼저 결정해, 시선이 머물 한 곳만 남긴다."
      },
      {
        "label": "WARMTH",
        "title": "온기",
        "body": "차가운 순백을 피하고 살짝 물든 오프화이트로 손끝의 편안함을 지킨다."
      },
      {
        "label": "CALM",
        "title": "고요",
        "body": "낮은 그림자와 느린 전환으로 화면이 소리 없이 숨 쉬게 둔다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "scandiwarm.showcase.invalid"
    },
    "footer": "따뜻한 종이 위에서 절제를 가꾸는 가상의 미니멀 진열 가이드.",
    "scrollLabel": "SCROLL ↓"
  },
  "ShatteredGlassCinematicShowcase": {
    "menuEyebrow": "LOOKBOOK",
    "menuTitle": "굴절하는 파편 갤러리",
    "skills": [
      "균열 오버레이",
      "이리데센트",
      "시네마틱 다크",
      "파편 클립",
      "프리즘 산란",
      "엣지 글로우"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "깨짐을 다루는 규율",
    "philosophy": [
      {
        "label": "CONTROL",
        "title": "장식과 본문의 분리",
        "body": "굴절과 균열은 오직 장식 레이어에 가두고, 읽어야 할 문장은 언제나 빛이 비낀 평탄한 클리어 존에 남긴다."
      },
      {
        "label": "RESTRAINT",
        "title": "빛은 한 번만 스친다",
        "body": "프리즘 스윕은 등장과 호버의 순간에 단 한 번 지나가며, 반복되는 반짝임으로 시선을 지치게 하지 않는다."
      },
      {
        "label": "CONTRAST",
        "title": "연약함과 강렬함의 균형",
        "body": "깨질 듯 투명한 결정면과 시네마틱 어둠을 나란히 두어, fragile yet striking의 긴장을 화면의 중심에 세운다."
      }
    ],
    "contact": {
      "email": "atelier [at] example.invalid",
      "phone": "—",
      "blog": "prismshard.invalid"
    },
    "footer": "깨진 빛의 파편을 화면의 언어로 벼려내는 시네마틱 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "SkeuoShowcase": {
    "menuEyebrow": "SHOWROOM",
    "menuTitle": "만질 수 있는 표면들",
    "skills": [
      "가죽 질감",
      "베벨 하이라이트",
      "안쪽 그림자",
      "스티치 디테일",
      "물리 버튼",
      "노트 표면"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "손이 먼저 아는 인터페이스",
    "philosophy": [
      {
        "label": "TRUTH",
        "title": "정직한 무게",
        "body": "빛과 그림자는 눈속임이 아니라 실제 물성을 설명하는 언어로만 쓴다."
      },
      {
        "label": "RESTRAINT",
        "title": "절제된 사실주의",
        "body": "질감은 시선을 붙드는 곳에만 얹고, 나머지는 조용한 베이지로 비워 둔다."
      },
      {
        "label": "FEEDBACK",
        "title": "응답하는 표면",
        "body": "손끝의 모든 동작에는 눌리고 되돌아오는 물리적 화답이 뒤따라야 한다."
      }
    ],
    "contact": {
      "email": "atelier [at] example.invalid",
      "phone": "—",
      "blog": "tactile-leather.studio.invalid"
    },
    "footer": "가죽과 노트의 결로 빚은 촉각 인터페이스 공방",
    "scrollLabel": "SCROLL ↓"
  },
  "Spatial3DShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "떠오르는 표면들",
    "skills": [
      "CSS 3D transform",
      "라이팅 음영",
      "포인터 시차",
      "translateZ 깊이",
      "WebGL 슬롯",
      "reduced-motion"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "깊이를 다루는 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "절제된 부피",
        "body": "부피는 과시가 아니라 위계다 — 필요한 만큼만 띄우고 나머지는 평면에 둔다."
      },
      {
        "label": "RESPONSE",
        "title": "빛에 답하는 표면",
        "body": "표면은 광원을 기억한다 — 같은 방향의 라이팅이 모든 층위를 하나의 공간으로 묶는다."
      },
      {
        "label": "CARE",
        "title": "멈출 줄 아는 움직임",
        "body": "감속 설정을 존중해 시차와 틸트를 정지시켜, 누구에게도 멀미를 남기지 않는다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "depthlab.invalid"
    },
    "footer": "공간을 암시하는 인터페이스 — 빛과 거리로 층위를 쌓는 스튜디오.",
    "scrollLabel": "SCROLL ↓"
  },
  "SwissShowcase": {
    "menuEyebrow": "INDEX",
    "menuTitle": "모듈 인덱스",
    "skills": [
      "모듈러 그리드",
      "산세리프 위계",
      "비대칭 정렬",
      "헤어라인 규칙선",
      "고대비 흑백",
      "단일 액센트"
    ],
    "craftEyebrow": "PRINCIPLE",
    "craftTitle": "규칙이 자유를 만든다",
    "philosophy": [
      {
        "label": "ORDER",
        "title": "구조가 먼저",
        "body": "장식보다 배치가 앞선다 — 모든 요소는 그리드 위 좌표로 먼저 결정된다."
      },
      {
        "label": "RESTRAINT",
        "title": "덜어냄",
        "body": "필요 없는 선 하나까지 지워 남은 것이 스스로 말하게 둔다."
      },
      {
        "label": "CLARITY",
        "title": "정직한 정보",
        "body": "위계는 크기와 위치로만 드러내며, 읽는 이를 속이지 않는다."
      }
    ],
    "contact": {
      "email": "studio [at] example.invalid",
      "phone": "—",
      "blog": "grid-index.invalid"
    },
    "footer": "그리드 위에서, 침묵으로 조직된 정보.",
    "scrollLabel": "SCROLL ↓"
  },
  "TactileShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "만져보고 싶은 표면들",
    "skills": [
      "파스텔 톤",
      "청키 radius",
      "이중 그림자",
      "스퀴시 모션",
      "하이퍼리얼 광택",
      "소프트 촉감"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "말랑함을 다루는 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "절제된 손맛",
        "body": "질감과 광택은 강조가 필요한 표면에만 얹어, 화면 전체가 소음이 되지 않게 지킨다."
      },
      {
        "label": "RESPONSE",
        "title": "정직한 반응",
        "body": "손끝이 닿으면 형태가 답하고, 모션을 줄인 사용자에게는 조용히 정적인 안정을 돌려준다."
      },
      {
        "label": "COMFORT",
        "title": "부드러운 첫인상",
        "body": "둥근 모서리와 넉넉한 여백은 낯선 화면 앞의 긴장을 먼저 풀어주는 배려다."
      }
    ],
    "contact": {
      "email": "hello [at] example.invalid",
      "phone": "—",
      "blog": "squish-lab.invalid"
    },
    "footer": "말랑한 촉감으로 인터페이스에 온기를 더하는 소프트 텍스처 스튜디오",
    "scrollLabel": "SCROLL ↓"
  },
  "TerminalShowcase": {
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
  },
  "UkiyoeWoodblockShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "판목에 새긴 풍경집",
    "skills": [
      "평면 색면",
      "먹빛 keyline",
      "여백(ma)",
      "낙관 도장",
      "bokashi 띠",
      "쌀종이 질감"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "한 판, 한 색, 한 호흡",
    "philosophy": [
      {
        "label": "STILLNESS",
        "title": "비움의 위계",
        "body": "그림자를 걷어내고 남긴 여백이 오히려 시선의 순서를 정한다."
      },
      {
        "label": "RESTRAINT",
        "title": "흙빛 절제",
        "body": "채도를 낮춘 색면만 겹쳐, 요란함 대신 오래 머무는 인상을 남긴다."
      },
      {
        "label": "PROVENANCE",
        "title": "새김의 정직",
        "body": "한 번 그은 먹선은 지우지 않는다 — 판목의 결이 곧 손의 증거다."
      }
    ],
    "contact": {
      "email": "hanko [at] example.invalid",
      "phone": "—",
      "blog": "washi-atelier.invalid"
    },
    "footer": "먹선과 여백으로 풍경을 새기는 목판 아틀리에",
    "scrollLabel": "SCROLL ↓"
  },
  "VaporShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "네온 격자 진열대",
    "skills": [
      "Neon Glow",
      "Sunset Gradient",
      "Perspective Grid",
      "CRT Scanline",
      "Synthwave",
      "Deep Purple"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛으로 어둠을 조각하는 법",
    "philosophy": [
      {
        "label": "CONTRAST",
        "title": "어둠이 먼저다",
        "body": "빛은 충분히 깊은 어둠 위에서만 흐른다. 딥퍼플 캔버스를 먼저 놓고, 그 위에 네온의 윤곽을 새긴다."
      },
      {
        "label": "RESTRAINT",
        "title": "글로우는 초점에만",
        "body": "모든 표면이 빛나면 아무것도 빛나지 않는다. 네온 글로우는 시선이 머물 한 곳에만 아껴 쓴다."
      },
      {
        "label": "SAFETY",
        "title": "정지할 줄 아는 빛",
        "body": "스캔라인과 글리치는 멈출 수 있어야 아름답다. 모션을 줄인 사용자에게는 흔들림 없는 정적 화면을 건넨다."
      }
    ],
    "contact": {
      "email": "signal [at] example.invalid",
      "phone": "—",
      "blog": "synthgrid.invalid"
    },
    "footer": "딥퍼플 위로 흐르는 네온, 석양의 격자를 켜는 스튜디오.",
    "scrollLabel": "SCROLL ↓"
  },
  "WarpedCheckerboardShowcase": {
    "menuEyebrow": "GALLERY",
    "menuTitle": "휘어진 격자의 방",
    "skills": [
      "액화 왜곡",
      "체크 격자",
      "풀블리드",
      "Y2K 레트로",
      "플랫 카드",
      "솔리드 패널"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "격자를 흐르게 두는 법",
    "philosophy": [
      {
        "label": "PRINCIPLE",
        "title": "왜곡은 장식층에만",
        "body": "물결치는 체크는 배경과 보더에만 흐르게 두고, 읽어야 할 것은 결코 그 위에 얹지 않는다."
      },
      {
        "label": "VALUE",
        "title": "또렷함이 먼저",
        "body": "고채도 진동 위에서도 정보는 솔리드 패널에 분리해 4.5:1 대비를 지켜 흔들림 없이 읽힌다."
      },
      {
        "label": "TENOR",
        "title": "말랑한 평면",
        "body": "그림자를 걷어내고 큰 라운드와 유체 왜곡으로 깊이를 대신해, 눌러도 가라앉는 부드러운 호응을 만든다."
      }
    ],
    "contact": {
      "email": "hello [at] warpgrid.example.invalid",
      "phone": "—",
      "blog": "studio.warpgrid.invalid"
    },
    "footer": "유체로 휘어지는 2색 격자, 단 하나의 디스토션 문법",
    "scrollLabel": "SCROLL ↓"
  },
  "Y2KShowcase": {
    "menuEyebrow": "GALLERY // Y2K",
    "menuTitle": "크롬 표면 갤러리",
    "skills": [
      "Chrome Gradient",
      "Neon Glow",
      "Bubble Form",
      "Glossy Highlight",
      "Metallic UI"
    ],
    "craftEyebrow": "PHILOSOPHY",
    "craftTitle": "빛을 다루는 원칙",
    "philosophy": [
      {
        "label": "RESTRAINT",
        "title": "네온은 점으로",
        "body": "빛은 넓게 깔릴수록 흐려진다. 네온은 초점의 한 점에만 얹어 시선을 정확히 끌어낸다."
      },
      {
        "label": "CONTRAST",
        "title": "광택 뒤의 가독성",
        "body": "거울 같은 표면이 아무리 화려해도 글자는 언제나 진한 잉크색으로 또렷하게 읽혀야 한다."
      },
      {
        "label": "SOFTNESS",
        "title": "둥근 미래",
        "body": "미래는 날카롭지 않다. 버블처럼 둥근 폼이 크롬의 차가움을 만지고 싶은 감촉으로 바꾼다."
      }
    ],
    "contact": {
      "email": "hello [at] chrome-lab.example.invalid",
      "phone": "—",
      "blog": "neon-y2k.invalid"
    },
    "footer": "거울 같은 크롬과 빛나는 네온으로 짓는 미래주의 인터페이스",
    "scrollLabel": "SCROLL ↓"
  }
};
