const MAX_FRAMES = 10;

/**
 * Focus the element `getTarget` returns, retrying for a few frames until it really
 * has focus. A target can be missing for a frame (a grid re-rendering for a new
 * month) or refuse focus while its panel is still hidden (a `visibility`
 * transition). Returns a cancel function for effect cleanup.
 */
export function focusWhenReady(getTarget: () => HTMLElement | null | undefined): () => void {
  let id = 0;
  let frames = 0;
  const attempt = () => {
    const target = getTarget();
    if (target && document.activeElement !== target) target.focus();
    if (target && document.activeElement === target) return;
    if (frames++ < MAX_FRAMES) id = requestAnimationFrame(attempt);
  };
  attempt();
  return () => cancelAnimationFrame(id);
}
