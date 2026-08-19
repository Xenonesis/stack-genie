/**
 * Single source of truth for diagram canvas/export theme backgrounds.
 * Consumed by the live canvas (studio-diagram-canvas), the PNG export
 * (studio-export-actions), and the theme toolbar (studio-toolbar) so the
 * preview and exported output always share matching backgrounds.
 */
export const THEME_CANVAS_BG: Record<'dark' | 'light' | 'neutral', string> = {
  dark: '#080808',
  light: '#ffffff',
  neutral: '#0f172a',
};