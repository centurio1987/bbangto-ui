// motion/shaders — WebGL/canvas 기반 셰이더 배경·이펙트.
//
// 21st.dev "Shaders (15)" 대응. motion 계층의 하위 카테고리이며 동일하게
// prefers-reduced-motion 정적 폴백을 필수로 가진다 (MOTION_QUALITY_CHECKLIST.md).
//
// 대상(Wave 3): MeshGradient, Aurora, Waves, Noise, Plasma, Metaballs 등
// (개별 목록은 COMPONENT_CATALOG.md 레지스트리, JS 렌더 페이지라 INFERRED 상태).
//
// 신규 shader 추가 시 아래에 re-export 한다.
export * from './MeshGradient';
export * from './Aurora';
export * from './Waves';
export * from './ParticleField';
