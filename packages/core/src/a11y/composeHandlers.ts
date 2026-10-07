/**
 * Event handler composition rule shared by every core component (KAN-054).
 *
 * The consumer's handler runs first. If it calls `preventDefault()`, the component's
 * own handling is skipped — that is how a consumer opts out of a built-in behaviour
 * (keep a dialog open on Escape, stop Enter from submitting a search).
 *
 * Use it wherever a component has its own handler for an event that the consumer can
 * also pass, including handlers that `{...props}` would otherwise silently replace.
 */
export function composeHandlers<E extends { defaultPrevented: boolean }>(
  external: ((event: E) => void) | undefined,
  internal: (event: E) => void,
): (event: E) => void {
  return (event) => {
    external?.(event);
    if (!event.defaultPrevented) internal(event);
  };
}
