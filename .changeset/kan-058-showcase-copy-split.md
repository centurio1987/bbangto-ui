---
'@centurio1987/bbangto-ui-style-guide-catalog': patch
---

Showcase 하나만 가져와도 51개 Showcase 몫의 확장 카피가 번들에 딸려 오던 문제를 고쳤다(KAN-058).
화면에 그려지는 내용은 그대로다(51개 Showcase 의 렌더 결과가 전후 바이트 단위로 같다).

### 바뀐 동작

- **`makeShowcase(W, copy, displayName, ext?)` — 확장 카피를 네 번째 인자로 받는다.** 전에는 세 번째 인자를
  키로 `SHOWCASE_COPY_EXT` 에서 확장 카피를 찾았고, 그 때문에 Showcase 하나가 51개 몫 전부를 끌고 왔다.
  이제 세 번째 인자는 표시용 이름(`displayName`)일 뿐이다. 카탈로그 preset 의 이름(예: `'NeobrutalismShowcase'`)을
  넘겨도 그 카탈로그 카피가 저절로 붙지 않으므로, 확장 카피는 네 번째 인자로 넘기거나 `copy` 에 직접 넣는다.
  카탈로그에 없는 이름을 넘기던 경우에는 바뀌는 것이 없다(그때도 기본값으로 그려졌다).
- `SHOWCASE_COPY_EXT` 는 지금처럼 루트에서 가져올 수 있다. 51개 카피를 모은 읽기용 값이고, 이 객체를 고쳐
  끼워도 `makeShowcase` 는 더 이상 읽지 않는다.

### 크기 (esbuild 0.27.7, minify, react·`@centurio1987/*` 바깥)

| 가져온 것 | 전 | 후 |
|---|---|---|
| `NeobrutalismShowcase` 하나 | 101,092B | 25,649B |
| 패키지 전체(`export *`) | 840,248B | 840,904B |
