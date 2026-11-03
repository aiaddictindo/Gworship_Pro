export interface Song {
  id: number | string;
  title: string;
  lyrics: string;
  bgAnim?: string;
  bgFx?: BackgroundFx;
  author?: string;
  key?: string;
  tempo?: number;
  category?: string;
}

export interface SlideItem {
  tag: string;
  text: string;
}

export interface BibleVerse {
  id?: number | string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  type: 'PL' | 'PB';
}

export interface GradientSlot {
  c1: string;
  c2: string;
}

export interface ChromaKeySettings {
  enabled: boolean;
  color: string;                 // Hex or css color e.g. '#000000', '#030611', '#00ff00'
  tolerance: number;             // 0 to 100 (similarity tolerance)
  smoothness: number;            // 0 to 50 (edge feathering)
  transparentAnimationBg: boolean; // Force body/html transparent in HTML animation
}

export type CompositeBlendMode =
  | 'normal'
  | 'screen'
  | 'lighten'
  | 'color-dodge'
  | 'overlay'
  | 'soft-light'
  | 'multiply';

export interface CompositeBackgroundConfig {
  enabled: boolean;
  id?: string;
  name?: string;
  baseImageId: string;           // 'img-...' or preset id or custom media id
  baseImageData?: string;        // Base64 or URL or SVG
  baseOpacity?: number;          // 0 to 100 (default: 100)
  overlayHtmlId: string;         // 'html-...'
  overlayHtmlData?: string;      // Raw html string
  overlayOpacity: number;        // 0 to 100 (percentage, default: 85)
  blendMode: CompositeBlendMode;
  chromaKey: ChromaKeySettings;
}

export const DEFAULT_CHROMA_KEY: ChromaKeySettings = {
  enabled: true,
  color: '#000000',
  tolerance: 35,
  smoothness: 12,
  transparentAnimationBg: true,
};

export const DEFAULT_COMPOSITE_BG: CompositeBackgroundConfig = {
  enabled: false,
  baseImageId: 'preset-img-altar',
  overlayHtmlId: 'html-gold-cross',
  baseOpacity: 100,
  overlayOpacity: 85,
  blendMode: 'screen',
  chromaKey: DEFAULT_CHROMA_KEY,
};

export interface CustomMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'html' | 'composite';
  data: string;
  dateAdded: number;
  compositeConfig?: CompositeBackgroundConfig;
}

export interface WorshipTimerState {
  visible: boolean; // whether shown as overlay on live projector output
  mode: 'countdown' | 'stopwatch';
  title: string;
  totalSeconds: number; // original countdown duration
  remainingSeconds: number; // remaining or elapsed seconds
  isRunning: boolean;
  endTime: number | null; // target timestamp when countdown reaches 0
  startTime: number | null; // start timestamp when stopwatch began
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'bottom-center';
  style: 'glass-badge' | 'minimal';
}

export interface BackgroundFx {
  speed: number;       // default 1.0 (range: 0.25 to 3.0)
  hue: number;         // default 0 (range: 0 to 360 deg)
  brightness: number;  // default 100 (range: 20 to 200%)
  contrast: number;    // default 100 (range: 50 to 200%)
  saturation: number;  // default 100 (range: 0 to 200%)
  blur: number;        // default 0 (range: 0 to 20px)
  sepia: number;       // default 0 (range: 0 to 100%)
}

export const DEFAULT_BG_FX: BackgroundFx = {
  speed: 1.0,
  hue: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
};

export interface DisplayState {
  lyricsHtml: string;
  fontSize: number;
  bgSelector: string;
  bgFx?: BackgroundFx;
  compositeBg?: CompositeBackgroundConfig;
  isCleared: boolean;
  isBlack: boolean;
  ticker: {
    visible: boolean;
    text: string;
  };
  overlays: {
    logo: boolean;
    intro: boolean;
    outro: boolean;
  };
  timer?: WorshipTimerState;
  isBible: boolean;
  reference?: string;
  activeTitle?: string;
  activeTag?: string;
  displayMode?: 'center' | 'lowerThird';
  translationPercent?: number; // percentage of main lyric font size (default: 40, e.g. 35 to 80%)
}

export interface SavedSetlist {
  id: string;
  name: string;
  serviceDate?: string;
  serviceType?: string;
  description?: string;
  songs: Song[];
  bibleVerses: BibleVerse[];
  createdAt: number;
  updatedAt: number;
}

export type ContentMode = 'LAGU' | 'ALKITAB' | 'TAMPILAN';
export type ActiveContentType = 'SONG' | 'BIBLE';
