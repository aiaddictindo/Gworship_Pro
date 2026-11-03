/**
 * Utility for formatting worship lyrics with subtitle/translation support.
 * 
 * Any text enclosed in parentheses `(...)` is rendered with:
 * - A distinct font style (italic, lighter weight, font-sans)
 * - Scaled down to approximately 1/3 to 40% of the main lyric size (0.40em - 0.42em)
 * - Distinct, elegant soft golden amber color (text-amber-200/95) with subtle drop shadow
 * 
 * Supports:
 * - Dedicated translation lines: e.g. `(Sungguh besar anugerah-Nya)`
 * - Inline translations: e.g. `Amazing grace (Sungguh besar)`
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatLyricsWithTranslations(rawText: string, translationPercent: number = 40): string {
  if (!rawText) return '';

  const percent = typeof translationPercent === 'number' && !isNaN(translationPercent) && translationPercent > 0
    ? translationPercent
    : 40;
  // Relative em scale (e.g. 40% -> 0.40em, 65% -> 0.65em)
  const lineScaleEm = (percent / 100).toFixed(2);
  const inlineScaleEm = ((percent * 1.15) / 100).toFixed(2);

  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const formattedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (trimmed === '') {
      formattedLines.push('<div class="h-2 sm:h-3"></div>');
      continue;
    }

    // Check if the whole line is in parentheses: e.g. "(Marilah semua yang berbeban berat)"
    const wholeLineMatch = trimmed.match(/^\(([^)]+)\)$/);
    if (wholeLineMatch) {
      const innerContent = escapeHtml(wholeLineMatch[1].trim());
      formattedLines.push(
        `<div class="worship-translation-line leading-relaxed font-normal italic text-amber-200/95 tracking-normal my-0.5 sm:my-1 drop-shadow-sm font-sans select-text" style="font-size: ${lineScaleEm}em">(${innerContent})</div>`
      );
      continue;
    }

    // Line with potential inline parentheses: e.g. "Amazing grace (Sungguh besar)"
    const escapedLine = escapeHtml(rawLine);
    const withInlineTranslations = escapedLine.replace(
      /\(([^)]+)\)/g,
      `<span class="worship-translation-inline inline-block leading-tight font-normal italic text-amber-200/95 tracking-normal opacity-95 mx-1.5 align-baseline drop-shadow-sm font-sans select-text" style="font-size: ${inlineScaleEm}em">($1)</span>`
    );

    formattedLines.push(
      `<div class="worship-main-line font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] leading-snug select-text">${withInlineTranslations}</div>`
    );
  }

  return formattedLines.join('');
}
