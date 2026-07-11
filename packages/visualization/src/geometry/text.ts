const MONO_CHAR_RATIO = 0.6;
const TITLE_CHAR_RATIO = 0.55;
const SAFE_PADDING = 1.0;

export function estimateWidth(text: string, fontSize: number, mono = false): number {
  if (mono) return text.length * fontSize * MONO_CHAR_RATIO;
  return text.length * fontSize * TITLE_CHAR_RATIO + fontSize * SAFE_PADDING;
}

export function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  mono = false,
  maxLines = Infinity,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (lines.length >= maxLines) break;
    const test = current ? `${current} ${word}` : word;
    if (current && estimateWidth(test, fontSize, mono) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

export function truncateText(
  text: string,
  maxWidth: number,
  fontSize: number,
  mono = false,
  ellipsis = '…',
): string {
  if (estimateWidth(text, fontSize, mono) <= maxWidth) return text;
  let t = text;
  while (t.length > 0 && estimateWidth(t + ellipsis, fontSize, mono) > maxWidth) {
    t = t.slice(0, -1);
  }
  return t + ellipsis;
}
