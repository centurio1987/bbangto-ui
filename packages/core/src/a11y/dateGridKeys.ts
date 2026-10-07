/**
 * Day-grid keyboard movement (WAI-ARIA APG Date Picker Dialog), shared by Calendar
 * and DatePicker.
 *
 * Returns the date the key moves focus to, or `null` when the key is not a grid
 * key. Arrows move by a day / a week, Home / End go to the start / end of the
 * week (Sunday-first, matching the grids), PageUp / PageDown move a month
 * (a year with Shift), keeping the day of month where it exists.
 */
export function getDateGridTarget(key: string, from: Date, shiftKey = false): Date | null {
  const y = from.getFullYear();
  const m = from.getMonth();
  const d = from.getDate();
  const addMonths = (n: number) => {
    const lastDay = new Date(y, m + n + 1, 0).getDate();
    return new Date(y, m + n, Math.min(d, lastDay));
  };
  switch (key) {
    case 'ArrowRight':
      return new Date(y, m, d + 1);
    case 'ArrowLeft':
      return new Date(y, m, d - 1);
    case 'ArrowDown':
      return new Date(y, m, d + 7);
    case 'ArrowUp':
      return new Date(y, m, d - 7);
    case 'Home':
      return new Date(y, m, d - from.getDay());
    case 'End':
      return new Date(y, m, d + (6 - from.getDay()));
    case 'PageUp':
      return addMonths(shiftKey ? -12 : -1);
    case 'PageDown':
      return addMonths(shiftKey ? 12 : 1);
    default:
      return null;
  }
}

/** `YYYY-MM-DD` in local time — the key day cells carry as `data-bbangto-date`. */
export function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
