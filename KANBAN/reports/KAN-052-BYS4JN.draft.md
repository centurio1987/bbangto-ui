## 이 카드가 끝나면 달라지는 것

카드 `KAN-052-BYS4JN`(칸반 보드에서 카드 한 장을 가리키는 식별자예요)은 bbangto-ui를 바깥 앱에 들여오면 생기는 문제를 나눠 맡은 카드 다섯 장 가운데 두 번째입니다. 맡은 문제는 Provider가 외부 글꼴을 늘 불러온다는 것이에요. Provider는 컴포넌트 트리 맨 위를 감싸 테마 값을 내려 주는 컴포넌트입니다. core(React 컴포넌트 패키지)에 둘, viz(시각화 패키지 visualization)에 하나가 있어요. 셋 다 CDN(Content Delivery Network, 파일을 여러 지역 서버에서 나눠 주는 서비스)에서 글꼴 Pretendard와 JetBrains Mono를 조건 없이 불러오고, 이를 끄는 prop이 없습니다.

이 카드가 끝나면 두 가지가 달라집니다. Provider에 `fonts="none"`을 넘기면 외부 글꼴 요청이 0건이 돼요. 글꼴을 직접 호스팅하는 앱이나 CSP(Content Security Policy, 페이지가 불러올 수 있는 외부 리소스를 제한하는 보안 정책)를 거는 앱도 외부 요청을 막을 수 있게 됩니다. 그리고 Provider를 여러 겹 감싸도 글꼴은 하나씩만 들어갑니다. 아무것도 넘기지 않으면 지금처럼 불러오니 기존 사용처는 고칠 것이 없어요.

```text
Before  core Provider 안에 viz Provider를 겹친 화면
  <FoundationProvider>                → <style>@import Pretendard</style>
                                        <style>@import JetBrains Mono</style>
    <VisualizationStyleGuideProvider> → <style>@import JetBrains Mono</style>   ← 두 번째

After   같은 화면
  document.head
    #bbangto-font-pretendard       1개
    #bbangto-font-jetbrains-mono   1개      (fonts="none"이면 둘 다 0개)
```

착수 전에 알아 둘 순서가 하나 있습니다. 배포 카드 `KAN-055-34A57K`(수정분 배포)와 이 카드가 `.changeset/` 폴더를 함께 써요. 다음 배포에 실을 변경과 버전 올림 종류를 적어 두는 자리입니다. 이 겹침은 순서를 정해 풀었습니다(직렬 중재). 이 카드가 먼저이고 KAN-055가 나중이에요. 배포는 `KAN-051`(번들 트리 셰이킹 복구, 쓰지 않는 코드를 번들에서 버리게 하는 카드)·KAN-052(이 카드)·`KAN-053`(Drawer·Tabs·Select 키보드 지원)이 main(기본 브랜치)에 병합된 뒤에야 뜻이 있기 때문이고, 2026-10-05에 유저가 승인했습니다. 그래서 이 카드에는 아무 제약이 없습니다. KAN-055는 이 카드가 완료될 때까지 착수하지 못해요.

viz 계열 통합 카드 `KAN-049-CWBPP6`과도 `packages/visualization/` 아래에서 범위가 겹칩니다. 이쪽은 용인(같은 경로를 함께 써도 된다고 미리 합의한 상태)으로 처리했어요. KAN-049는 viz의 PLAN·catalog 문서를 흡수하는 카드이고, 이 카드가 viz에서 고치는 것은 Provider 코드와 README의 사용법 절뿐입니다. README는 두 카드가 함께 고쳐요.

## 기본값은 그대로 두고 끄는 길만 여는 이유

지금 세 Provider는 렌더 트리(React가 그리는 컴포넌트 구조) 안에 `<style>{'@import url(...)'}</style>`을 그대로 내놓고, 같은 것이 이미 있는지 확인하지 않아요. 그래서 Provider를 겹치면 겹친 만큼 늘어납니다. Storybook(컴포넌트를 따로 띄워 보는 개발 도구)의 전역 데코레이터(모든 스토리를 바깥에서 감싸는 공통 코드)가 실제로 core Provider 안에 viz Provider를 감싸고 있어서, 위 그림처럼 JetBrains Mono가 두 번 들어가요.

고치는 방향은 기본값을 건드리지 않는 쪽으로 정했습니다. 세 Provider에 `fonts?: 'external' | 'none'` prop을 더하고 기본값을 `'external'`로 두면, 아무것도 넘기지 않던 코드는 지금과 똑같이 동작해요. 버전으로는 minor(기존 사용처가 그대로 동작하는 기능 추가)입니다.

```text
<FoundationProvider>               fonts 생략 → 'external' → 지금과 같다
<FoundationProvider fonts="none">  외부 글꼴 요청 0건 → 글꼴은 앱이 직접 불러온다
```

중복은 글꼴마다 정한 DOM id로 막습니다. DOM(Document Object Model)은 브라우저가 들고 있는 페이지 구조예요. `<style>`을 렌더 트리에 두지 않고 `document.head`에 `bbangto-font-pretendard`·`bbangto-font-jetbrains-mono` id를 붙여 넣되, 같은 id가 이미 있으면 넣지 않습니다. core의 모션 keyframes(애니메이션 정의) 주입(`packages/core/src/motion/keyframes.ts:212-224`)이 `useInsertionEffect`(React가 화면을 그리기 직전에 실행하는 훅)와 id 확인으로 이미 같은 일을 하고 있어요.

여기서 헷갈리기 쉬운 포인트는 React context(컴포넌트 트리 아래로 값을 내려 주는 React 기능)로도 같은 일을 할 수 있다고 보는 것입니다. viz는 core에 의존하지 않습니다(`packages/visualization/package.json:35-37`). 두 패키지가 같은 context를 나눌 수 없으니 core의 context는 그 안에 들어온 viz Provider를 알아보지 못해요. DOM id는 누가 넣었는지 따지지 않습니다. 값만 같으면 막아요.

```text
context 방식   core Provider ─ context ─✕─ viz Provider     (viz는 core를 모른다)
               core 안 viz 겹침 → JetBrains Mono 2개

DOM id 방식    core : head에 #bbangto-font-jetbrains-mono 를 넣는다
               viz  : 같은 id가 이미 있다 → 넣지 않는다
               core 안 viz 겹침 → JetBrains Mono 1개
```

그래서 core는 두 Provider의 글꼴 코드를 `src/internal/ExternalFonts.tsx` 하나로 묶고, viz는 같은 이름의 파일을 따로 두되 id 값을 똑같이 씁니다. 대가도 하나 있어요. SSR(Server-Side Rendering, 서버에서 HTML을 미리 그려 보내는 방식) HTML에는 글꼴 `@import`가 빠지고 화면이 켜진 뒤에 글꼴을 불러옵니다. 이 차이는 README에 적어요.

> 코드를 나눠 쓸 수 없으면 값을 맞춘다.

테스트 환경을 먼저 고치는 것도 접근에 들어 있습니다. 전역 데코레이터가 모든 스토리를 기본값 Provider 둘로 감싸니, 그대로 두면 `fonts="none"` 스토리를 만들어도 바깥 Provider가 글꼴을 넣어 버려요. 그래서 스토리 parameter(스토리마다 붙이는 설정값) `bbangtoProviders: false`로 데코레이터를 끌 수 있게 합니다. 이 점과 앞의 context 문제는 별도 세션의 플랜 검토(plan-reviewer, fable 모델)가 짚어 준 것을 반영했습니다.

```text
지금         전역 데코레이터 → FoundationProvider → VisualizationStyleGuideProvider → 스토리
             둘 다 기본값이라 글꼴을 넣는다 → none의 0건을 확인할 수 없다
글꼴 스토리  bbangtoProviders: false → 데코레이터 없이 스토리만 렌더
```

버린 대안은 셋입니다. 기본값을 `'none'`으로 바꾸는 안은 기존 사용처의 글꼴이 사라지는 major(기존 사용처가 코드를 고쳐야 하는 변경) 변경이라 이번 범위에서 뺐어요. 같은 패키지 안 context로만 중복을 막는 안은 위 그림처럼 core 안 viz 겹침을 못 막습니다. React 19의 `<link rel="stylesheet" precedence>` 자동 중복 제거는 peerDependency(쓰는 앱이 직접 설치하는 의존)가 React 18도 받아서(`packages/core/package.json:27-30`) 쓸 수 없어요.

범위 밖으로 둔 일은 둘이에요. 하나는 foundation(색 구성 묶음)마다 글꼴이 다른 문제로, `packages/foundations/src/amber.ts:19`는 Inter를 쓰는데 Provider가 불러오지 않습니다. 다른 하나는 글꼴 파일을 패키지에 동봉해 자체 호스팅하는 일입니다.

## 네 단계와 그 순서

`S1`~`S4`는 이 카드를 쪼갠 실행 단계(work) 넷이고, 번호는 이름표라 바뀌지 않아요. 넷은 모두 배치 1(한 번에 이어서 수행하는 work 묶음 가운데 첫 번째)에 들어 있습니다. 순서는 한 줄뿐이에요.

```text
S1 테스트 먼저      새 글꼴 스토리가 빨강인 것을 확인
 └▶ S2 core         id 두 개로 head에 주입              → core 경우 초록
     └▶ S3 viz      S2가 정한 id에 맞춘다               → core 안 viz 겹침까지 초록
         └▶ S4 문서  README · changeset · 품질 검사 명령
```

S1은 테스트 환경과 play 테스트(Storybook 스토리에 붙여 실제 브라우저에서 실행하는 검증 함수)를 먼저 씁니다. 앞 절의 데코레이터 parameter를 넣고, core 쪽 새 파일 `ProviderFonts.stories.tsx`와 viz 쪽 `visualization/Provider.stories.tsx`에 글꼴 스토리를 더해요. 각 스토리는 `beforeEach`(스토리를 렌더하기 전에 실행하는 준비 함수)에서 `bbangto-font-*` 노드를 지운 뒤 렌더합니다. 확인하는 경우는 여섯입니다.

```text
경우                               기대
core fonts="none"                  Pretendard 0 · JetBrains Mono 0
core 기본값                        각 1
core Provider 둘 겹침              각 1
core 안 viz 겹침 (둘 다 기본값)    JetBrains Mono 1
core 안 viz 겹침 (둘 다 none)      둘 다 0
viz fonts="none" 단독              JetBrains Mono 0
```

잠깐, 확인 하나만 해 볼까요? 이 테스트는 글꼴마다 노드 두 종류를 함께 셉니다. 왜 한 종류만 세지 않을까요?

```text
글꼴 하나마다 document 전체에서 함께 센다
  @import에 그 글꼴 URL이 든 <style>   ← 지금 코드가 만드는 노드
  id가 bbangto-font-<글꼴>인 노드       ← 고친 코드가 만드는 노드
```

지금 코드가 만드는 노드는 위쪽 조건에, 고친 코드가 만드는 노드는 아래쪽 조건에 걸리기 때문이에요. id 노드만 센다면 고치기 전 코드가 `<style>`을 두 개 내놓아도 0으로 셉니다. 둘을 함께 세야 고치기 전과 후를 같은 잣대로 잴 수 있어요.

S2는 core의 두 Provider에서 렌더 트리 안 `<style>`을 지우고 새 훅 `useExternalFonts`로 바꿉니다. S2가 끝나면 core 경우는 초록이 되지만 core 안 viz 겹침은 아직 빨강입니다. viz가 여전히 렌더 트리에 `<style>`을 내놓으니까요. S3가 viz Provider에 같은 id와 같은 URL로 같은 방식을 적용하면 그 겹침까지 초록이 됩니다.

```text
packages/core/src/internal/ExternalFonts.tsx           ┐  같은 id 값
packages/visualization/src/internal/ExternalFonts.tsx  ┘  bbangto-font-jetbrains-mono
viz는 core에 의존하지 않으므로 코드를 나누지 않고 값으로만 맞춘다
```

S2가 S3보다 앞인 이유도 여기 있습니다. S3의 완료 기준인 core 안 viz 겹침 1개는 두 패키지가 같은 id를 쓸 때만 성립해요. 그 id를 S2가 먼저 넣어야 S3가 맞출 대상이 생깁니다. 코드만 보면 둘을 동시에 짤 수도 있지만 확인은 S2 뒤에야 됩니다. 이 사실이 다음 절의 두 수행안을 가르는 지점이에요.

S4는 마무리입니다. core와 viz README에 `fonts` 사용법 절을 둬요. 적을 내용은 기본값이 지금과 같다는 점, `none`이면 외부 요청이 0건이고 글꼴은 앱이 직접 불러와야 한다는 점, SSR 차이입니다. changeset 파일 `.changeset/kan-052-provider-fonts.md`에는 core와 visualization 두 패키지의 minor 올림을 적고 게이트 5종(이 저장소가 정한 품질 검사 명령 다섯 개)을 실행합니다.

## 두 가지 수행안

두 안 모두 배치는 1개입니다. work 4개는 배치 하나에 담는 기본 크기(work 3~4개) 안이고, S4는 게이트 실행이라 S3 바로 뒤에 붙어야 뜻이 있어요. 그래서 렌더러(이 리포트의 그림과 표를 그리는 프로그램)의 배치 2안 비교 그림에서는 두 안이 똑같이 한 칸으로 나옵니다. 그 그림은 배치 수와 배치 크기 기준만으로 그리기 때문이에요. 두 안이 갈리는 곳은 배치 안쪽입니다. S2와 S3를 동시에 짜느냐, 그 하나예요.

단일 에이전트 안은 에이전트 하나가 워크트리(같은 저장소를 별도 폴더에 하나 더 펼친 작업 공간) 하나에서 S1부터 S4까지 차례로 수행합니다. 병렬 폭은 1이에요. S2에서 넣은 id 두 개를 같은 에이전트가 S3에서 그대로 맞추니 두 패키지의 id가 어긋날 여지가 없습니다. `pnpm build`와 Storybook 캐시도 에이전트 하나만 써서 빨강이나 초록이 누구의 변경 때문인지 헷갈릴 일이 없어요. 대가는 S2와 S3의 편집을 동시에 하지 못한다는 것입니다. S3의 확인이 S2 뒤에야 된다는 제약은 순서대로 가면 따로 챙길 것이 없어요. 되돌리기 단위는 work마다 다는 태그 `kan/KAN-052-BYS4JN/S<n>`입니다.

```text
에이전트 1 ── S1 ─▶ S2 core ─▶ S3 viz ─▶ S4
              워크트리 1개 · 빌드와 Storybook 캐시 1벌 · id는 한 에이전트가 맞춘다
배치 1개 · 병렬 폭 1
```

오케스트레이션 안은 본 에이전트가 S1을 끝낸 뒤 서브에이전트(일을 나눠 맡는 보조 에이전트) 둘에게 S2 core와 S3 viz를 동시에 맡깁니다. 병렬 폭은 2예요. 두 패키지 편집을 나란히 할 수 있다는 것이 얻는 것입니다. 대신 둘이 한 워크트리에서 `pnpm build`와 Storybook 캐시를 함께 쓰면 서로의 확인 결과가 섞이므로 워크트리를 하나 더 열어야 합니다. id 값을 둘이 따로 정하면 겹침 테스트가 빨갛게 남는데, 전략에 id가 이미 적혀 있으니 같은 값을 두 서브에이전트에 넘기면 피할 수 있어요. 코드는 동시에 짜도 S3의 확인은 S2가 들어간 뒤에야 되고, 되돌리기 단위는 단일 안과 같은 work 태그예요.

```text
에이전트 ── S1 ─┬─▶ 서브 A: S2 core   워크트리 1 ─┬─▶ S3 확인 ─▶ S4
                └─▶ 서브 B: S3 viz    워크트리 2 ─┘
                    id 두 개를 둘에게 똑같이 넘긴다
배치 1개 · 병렬 폭 2
```

추천은 단일 에이전트입니다. 오케스트레이션이 이득이 되려면 병렬 구간이 길고 각 조각이 따로 무거워야 해요. 이 카드에서 병렬로 열리는 구간은 S2·S3 한 칸이고, 거기서 얻는 것은 짧은 편집 두 개를 동시에 하는 것뿐입니다. 배치 계획 문서는 워크트리를 하나 더 여는 준비가 그 편집보다 크다고 판단했어요. S2와 S3가 각각 여러 파일에 걸친 큰 편집이었다면 판단이 반대로 나왔을 겁니다.

## 막힐 만한 자리

기존 스토리 셋이 렌더 트리 안 `@import` 스타일을 의식하고 짜여 있습니다. `ScrollArea.stories.tsx:146-147`·`LogoCloud.stories.tsx:83`·`FeatureGrid.stories.tsx:5`의 주석이 전역 `@import` 스타일이 앞설 수 있다고 적어 두었어요. S2 뒤에 이 셋이 빨개질 수 있습니다. 다만 셋 다 그 스타일을 피하려고 canvas(스토리가 그려지는 영역) 안의 `style`을 모두 합쳐 읽는 쪽이라 그럴 가능성은 낮아요. 빨개지면 그 스토리의 선택자를 고치고 기대값은 건드리지 않습니다.

주입한 노드가 언마운트해도 남는다는 점도 살펴야 해요. 정리하지 않으면 스토리끼리 결과가 섞여서 순서를 바꿀 때마다 결과가 달라집니다.

```text
스토리 A (기본값)  → head에 #bbangto-font-pretendard 1개. 언마운트해도 남는다
스토리 B (none)    → 정리 없이 세면 A가 남긴 1개가 잡혀 빨강
스토리 C (기본값)  → 정리 없이 세면 C가 아무것도 안 넣어도 1개라 초록
```

`beforeEach` 정리가 이것을 막습니다. 정리 없이도 초록이 나온다면 오히려 테스트가 잘못 센 것으로 봐요. Storybook이 core의 옛 빌드를 보는 일도 있습니다. 고친 뒤에도 글꼴 스토리가 그대로 빨강이면 이 경우이고, `pnpm build` 뒤 Storybook vite 캐시를 지우면 풀려요. 이 저장소에서 이미 겪은 일입니다.

`fonts` 타입이 두 패키지에서 갈라질 수도 있습니다. 두 패키지는 타입을 나눌 수 없으니 같은 리터럴을 각자 선언하고, 겹침 스토리가 두 Provider에 같은 값을 넘겨 타입 검사로 맞춰요. 전체 브라우저 테스트는 S1 완료와 S4 게이트 두 번만 실행하고, S2와 S3 사이에는 글꼴 스토리 파일만 골라 실행합니다.

```text
공개 API 변화   Provider 세 곳에 선택 prop fonts 하나
기본값          'external' = 지금 동작 그대로
되돌리기 단위   work마다 태그 kan/KAN-052-BYS4JN/S<n>
```

위 세 줄이 되돌리기 어려운 지점이 없다는 근거입니다. 루트 독립성 맵(상위 카드가 없는 맨 위 카드끼리 같은 경로를 잡았는지 경로별로 펼친 그림)에서는 이 카드 열에 빨간 칸이 둘 나옵니다. `.changeset/*.md` 줄과 `packages/visualization/**` 줄이에요. 그 아래 표에서 KAN-055가 미승인으로 찍히는 것은 이 겹침을 용인하지 않고 순서로 풀었기 때문이고, 첫 절에서 말한 대로 이 카드가 먼저입니다.

두 줄에는 KAN-051·KAN-053 같은 다른 카드도 함께 칠해져요. 맵이 서로 이어지는 경로를 한 줄로 묶기 때문입니다. 이 카드의 파일과 직접 겹치는 상대는 KAN-055와 KAN-049 둘뿐이에요. 다만 KAN-051·KAN-053도 core를 고치니, 둘 중 먼저 병합되는 카드가 있으면 main을 한 번 받아 게이트를 다시 실행합니다.

## 무엇이 되면 끝인가

끝의 기준은 게이트 5종이 전부 초록인 상태예요. 이 카드는 코드와 테스트를 함께 고치므로 다섯 개가 모두 실행 대상입니다.

```bash
pnpm typecheck                  # 워크스페이스 전체 타입 검사
pnpm build                      # 패키지 빌드
pnpm test                       # 글꼴 play 테스트를 실제 브라우저(chromium)에서 실행한다
pnpm --filter storybook build   # Storybook 번들 확인
pnpm test:unit                  # 패키지 단위 테스트
```

게이트만큼 챙겨야 할 것이 빨강에서 초록으로 넘어가는 순서입니다. 빨강을 한 번 봐야 테스트가 고치기 전 상태를 실제로 잡는다는 것이 확인돼요. 단계마다 아래 상태가 나와야 합니다.

```text
S1 직후  새 글꼴 스토리 빨강 · 그 밖의 기존 스토리 전부 초록
S2 직후  core 경우(0개 · 글꼴마다 1개 · 겹침 1개) 초록 · core 안 viz 겹침은 빨강
S3 직후  전부 초록
```

추가 확인은 둘입니다. 외부 글꼴 주소가 두 `ExternalFonts.tsx` 밖에 남지 않았는지 검색해요. 그리고 기본값 Storybook 화면에서 Pretendard와 JetBrains Mono가 예전처럼 나오는지 한 번 눈으로 확인합니다.

```bash
grep -rnE "fonts\.googleapis|cdn\.jsdelivr" packages/core/src packages/visualization/src
# packages/*/src/internal/ExternalFonts.tsx 두 파일 밖에서 0건이어야 한다
```

여기까지 초록이면 검토서를 만들고 카드를 검토(사람이 결과를 확인하는 칸)로 넘깁니다. 이 카드가 완료되는 순간이 KAN-055가 착수할 수 있게 되는 시점이에요.
