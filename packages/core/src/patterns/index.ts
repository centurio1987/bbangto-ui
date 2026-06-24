// patterns (template + flow) — "한 화면/플로우" 전체 단위.
//
// 실용 정의: pattern = 정적 페이지 골격(template) + 그 화면 유형의 상호작용
// 플로우(검증/제출/포커스). blocks·components를 페이지 레벨로 배치한다.
// 계층 정의: /DESIGN_SYSTEM_GUIDE.md · 분류: ./../COMPONENT_CATALOG.md
//
// 대상(Wave 5): SignIn, SignUp, FormLayout, AIChat
//
// 신규 pattern 추가 시 아래에 re-export 한다.
export * from './SignIn';
export * from './SignUp';
export * from './FormLayout';
export * from './AIChat';
