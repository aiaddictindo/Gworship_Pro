import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Song,
  BibleVerse,
  SlideItem,
  DisplayState,
  GradientSlot,
  CustomMediaItem,
  SavedSetlist,
  WorshipTimerState,
} from './types';
import { db } from './db/indexedDB';
import {
  DEFAULT_GRADIENTS,
  INDO_BIBLE_BOOKS,
  PB_BOOKS,
  normalizeBookName,
  DEFAULT_HTML_BG_IDS,
} from './db/defaultData';
import { syncService } from './services/syncService';
import { LiveScreen } from './components/LiveScreen';
import { SongModal } from './components/SongModal';
import { BibleImportModal } from './components/BibleImportModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ShortcutsGuideModal } from './components/ShortcutsGuideModal';
import { AddBackgroundModal } from './components/AddBackgroundModal';
import { SetlistModal } from './components/SetlistModal';
import { WorshipTimerControl } from './components/WorshipTimerControl';
import { GoogleSheetSyncModal } from './components/GoogleSheetSyncModal';
import { BackgroundEffectsModal } from './components/BackgroundEffectsModal';
import { BackgroundEffectsControl } from './components/BackgroundEffectsControl';
import { BackgroundStudioTab } from './components/BackgroundStudioTab';
import { AnimatedBgThumbnail } from './components/AnimatedBgThumbnail';
import {
  BackgroundFx,
  DEFAULT_BG_FX,
  CompositeBackgroundConfig,
  DEFAULT_COMPOSITE_BG,
} from './types';
import { DEFAULT_PRESET_IMAGES } from './db/presetImages';
import { googleSheetService, normalizeTitle, normalizeLyrics } from './services/googleSheetService';
import {
  ChevronLeft,
  ChevronRight,
  Sliders,
  X,
  Music,
  BookOpen,
  Palette,
  Settings,
  Plus,
  Search,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit,
  Download,
  Upload,
  Sun,
  Maximize,
  Minimize,
  Tv,
  HelpCircle,
  CheckCircle2,
  Type,
  Eye,
  EyeOff,
  Radio,
  FileSpreadsheet,
  Video,
  Image as ImageIcon,
  Code,
  Sparkles,
  FolderOpen,
  Layers,
  Clock,
  RotateCcw,
  CloudDownload,
  Flame,
  Activity,
  Languages,
  Snowflake,
  Zap,
} from 'lucide-react';

const DEFAULT_WORSHIP_TIMER: WorshipTimerState = {
  visible: false,
  mode: 'countdown',
  title: 'Khotbah',
  totalSeconds: 45 * 60,
  remainingSeconds: 45 * 60,
  isRunning: false,
  endTime: null,
  startTime: null,
  position: 'top-right',
  style: 'glass-badge',
};

export const BG_PRESETS = [
  { id: 'anim-cross', name: 'Salib Bercahaya', desc: 'Cross Glow Animasi', color: 'from-amber-600/30 to-amber-950/50' },
  { id: 'anim-stars', name: 'Taburan Bintang', desc: 'Starry Twinkle Cosmos', color: 'from-blue-900/40 to-slate-950' },
  { id: 'grad-1', name: 'Deep Midnight', desc: 'Worship Navy Gradient', color: 'from-slate-900 to-cyan-950' },
  { id: 'grad-4', name: 'Royal Violet', desc: 'Atmosphere Ungu Megah', color: 'from-purple-900 to-indigo-950' },
  { id: 'grad-5', name: 'Emerald Grace', desc: 'Hijau Kedamaian Hidup', color: 'from-emerald-900 to-teal-950' },
  { id: 'grad-6', name: 'Sunrise Praise', desc: 'Warm Radiant Red Glow', color: 'from-rose-900 to-amber-950' },
];

export const getBgName = (bgId?: string, customMediaList: CustomMediaItem[] = []): string => {
  if (!bgId) return 'Salib Bercahaya';
  const custom = customMediaList.find((m) => m.id === bgId);
  if (custom) return custom.name;
  const preset = BG_PRESETS.find((p) => p.id === bgId);
  if (preset) return preset.name;
  if (bgId === 'html-jesus-birthday') return 'Happy Birthday Jesus 3D';
  if (bgId === 'html-birthday-celebration') return 'Pesta Ulang Tahun Sukacita';
  if (bgId === 'html-birthday-candles') return 'Lilin Ulang Tahun Emas';
  if (bgId === 'preset-img-birthday') return 'Panggung Ulang Tahun';
  if (bgId === 'preset-img-jesus-manger') return 'Palungan Betlehem Natal';
  if (bgId.startsWith('comp-')) return 'Komposisi 2 Latar';
  if (bgId.startsWith('preset-img-')) return 'Foto Altar / Still Image';
  if (bgId.startsWith('vid-')) return 'Video Loop';
  if (bgId.startsWith('img-')) return 'Gambar';
  if (bgId.startsWith('html-')) return 'Animasi 3D';
  if (bgId.startsWith('grad-')) return 'Gradien';
  return bgId;
};

export default function App() {
  // Check if current URL is a dedicated external display window (?display=true)
  const isDisplayMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('display') === 'true' || window.location.hash === '#display';
  }, []);

  // Display State (Worship Output)
  const [displayState, setDisplayState] = useState<DisplayState>(() => {
    const saved = syncService.getSavedState();
    if (saved) {
      return {
        ...saved,
        overlays: saved.overlays || {
          logo: false,
          intro: false,
          outro: false,
        },
        ticker: saved.ticker || {
          visible: false,
          text: 'Selamat Beribadah di Rumah Tuhan • Damai Sejahtera Kristus Menyertai Kita Semua',
        },
        timer: saved.timer || DEFAULT_WORSHIP_TIMER,
        bgFx: saved.bgFx || DEFAULT_BG_FX,
        translationPercent: saved.translationPercent || 40,
      };
    }
    return {
      lyricsHtml: '',
      fontSize: 4.5,
      translationPercent: 40,
      bgSelector: 'anim-cross',
      bgFx: DEFAULT_BG_FX,
      isCleared: false,
      isBlack: false,
      ticker: {
        visible: false,
        text: 'Selamat Beribadah di Rumah Tuhan • Damai Sejahtera Kristus Menyertai Kita Semua',
      },
      overlays: {
        logo: false,
        intro: false,
        outro: false,
      },
      timer: DEFAULT_WORSHIP_TIMER,
      isBible: false,
      reference: '',
      activeTitle: '',
      activeTag: '',
      displayMode: 'center',
    };
  });

  // Presentation Data
  const [songs, setSongs] = useState<Song[]>([]);
  const [songSetlist, setSongSetlist] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);

  const [bibleData, setBibleData] = useState<BibleVerse[]>([]);
  const [bibleSetlist, setBibleSetlist] = useState<BibleVerse[]>([]);
  const [currentBibleIndex, setCurrentBibleIndex] = useState<number>(-1);
  const [bibleStatusText, setBibleStatusText] = useState<string>('Memuat Alkitab...');

  const [activeContentType, setActiveContentType] = useState<'SONG' | 'BIBLE'>('SONG');
  const [currentSlides, setCurrentSlides] = useState<SlideItem[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Saved Setlists (IndexedDB)
  const [savedSetlists, setSavedSetlists] = useState<SavedSetlist[]>([]);
  const [activeSetlistId, setActiveSetlistId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gworship_active_setlist_id') || null;
    }
    return null;
  });
  const [activeSetlistName, setActiveSetlistName] = useState<string>('Setlist Kustom');
  const [isSetlistModalOpen, setIsSetlistModalOpen] = useState<boolean>(false);

  // Google Sheet Cloud Sync
  const [isSyncingSheet, setIsSyncingSheet] = useState<boolean>(false);
  const [isSheetSyncModalOpen, setIsSheetSyncModalOpen] = useState<boolean>(false);

  // Backgrounds & Custom Data Slots
  const [gradientSlots] = useState<Record<string, GradientSlot>>(DEFAULT_GRADIENTS);
  const [customDataSlots, setCustomDataSlots] = useState<Record<string, string>>({});
  const [customMediaList, setCustomMediaList] = useState<CustomMediaItem[]>([]);
  const [isAddBgModalOpen, setIsAddBgModalOpen] = useState<boolean>(false);
  const [mediaFilter, setMediaFilter] = useState<'ALL' | 'COMPOSITE' | 'IMAGE' | 'VIDEO' | 'HTML' | 'GRADIENT'>('ALL');
  const [isBgEffectsModalOpen, setIsBgEffectsModalOpen] = useState<boolean>(false);
  const [showInlineBgStudio, setShowInlineBgStudio] = useState<boolean>(true);
  const [overlays, setOverlays] = useState<{ logo: string; intro: string; outro: string }>({
    logo: typeof window !== 'undefined' ? localStorage.getItem('ov_logo') || '' : '',
    intro: typeof window !== 'undefined' ? localStorage.getItem('ov_intro') || '' : '',
    outro: typeof window !== 'undefined' ? localStorage.getItem('ov_outro') || '' : '',
  });

  // Toast Notification State
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toastError, setToastError] = useState<boolean>(false);
  const toastTimerRef = useRef<any>(null);

  const showToast = useCallback((msg: string, isError = false) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg(msg);
    setToastError(isError);
    toastTimerRef.current = setTimeout(() => {
      setToastMsg('');
    }, 2800);
  }, []);

  const handleToggleOverlay = useCallback((type: 'logo' | 'intro' | 'outro') => {
    setDisplayState((prev) => {
      const nextVal = !prev.overlays[type];
      const nextState = {
        ...prev,
        overlays: {
          ...prev.overlays,
          [type]: nextVal,
        },
      };
      syncService.broadcast(nextState);
      showToast(`Overlay ${type.toUpperCase()}: ${nextVal ? 'Tampil' : 'Sembunyi'}`);
      return nextState;
    });
  }, [showToast]);

  const handleOverlayUpload = useCallback((type: 'logo' | 'intro' | 'outro', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setOverlays((prev) => {
        const next = { ...prev, [type]: dataUrl };
        try {
          localStorage.setItem(`ov_${type}`, dataUrl);
          showToast(`HTML ${type.toUpperCase()} disimpan!`);
        } catch {
          showToast('Memori penuh untuk file ini!', true);
        }
        return next;
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [showToast]);

  // Mirror-Mode Floating Control Drawer State
  // When false: 100% clean presentation screen for screen mirroring to projector!
  const [isControlOpen, setIsControlOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'SETLIST' | 'SONGS' | 'BIBLE' | 'THEME' | 'STUDIO' | 'TIMER' | 'SETTINGS'>('SETLIST');

  // Eco Mode (Mode Dingin / Hemat Baterai & Anti-Panas)
  // Pauses background animation rendering in operator view while menu is open,
  // relieving the GPU/CPU and preventing Android phones from overheating.
  const [ecoMode, setEcoMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('gworship_eco_mode');
      if (saved !== null) return JSON.parse(saved);
      return typeof window !== 'undefined' && (window.innerWidth < 768 || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent));
    } catch {
      return true;
    }
  });

  const handleToggleEcoMode = useCallback(() => {
    setEcoMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('gworship_eco_mode', JSON.stringify(next));
      } catch {}
      showToast(next ? '❄️ Mode Dingin Aktif: HP lebih adem & hemat baterai' : '⚡ Mode Performa Penuh Aktif');
      return next;
    });
  }, [showToast]);

  // Search & Filter States
  const [songSearch, setSongSearch] = useState('');
  const [fastBibleInput, setFastBibleInput] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(1);
  const [tickerInput, setTickerInput] = useState(
    'Selamat Beribadah di Rumah Tuhan • Damai Sejahtera Kristus Menyertai Kita Semua'
  );

  // System controls
  const [isWakeLockActive, setIsWakeLockActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState<any>(null);
  const [swipeMode, setSwipeMode] = useState<'shortcuts' | 'slide'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('gworship_swipe_mode') as 'shortcuts' | 'slide') || 'shortcuts';
    }
    return 'shortcuts';
  });

  const handleToggleSwipeMode = useCallback(
    (mode: 'shortcuts' | 'slide') => {
      setSwipeMode(mode);
      try {
        localStorage.setItem('gworship_swipe_mode', mode);
        showToast(
          mode === 'slide'
            ? 'Gestur Usap: Navigasi Slide (Next / Prev)'
            : 'Gestur Usap: Pintasan Layar (Black / Clear)'
        );
      } catch {}
    },
    [showToast]
  );

  // Modals
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [songToEdit, setSongToEdit] = useState<Song | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);
  const [isBibleImportModalOpen, setIsBibleImportModalOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  // Touch, Tap & Pinch Handling
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const touchEndYRef = useRef<number>(0);
  const didSwipeRef = useRef<boolean>(false);
  const lastSwipeTimeRef = useRef<number>(0);
  const lastTouchTimeRef = useRef<number>(0);
  const tapTimerRef = useRef<any>(null);
  const lastTapDirRef = useRef<'left' | 'right' | null>(null);
  const isPinchingRef = useRef<boolean>(false);
  const initialPinchDistanceRef = useRef<number>(0);
  const initialFontSizePinchRef = useRef<number>(4.5);

  // -------------------------------------------------------------
  // 1. SYNC & INITIAL DATA
  // -------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = syncService.subscribe((newState) => {
      setDisplayState(newState);
    });
    return () => unsubscribe();
  }, []);

  const broadcastDisplay = useCallback((newState: DisplayState) => {
    setDisplayState(newState);
    syncService.broadcast(newState);
  }, []);

  useEffect(() => {
    // Custom background images from localStorage
    try {
      const savedBgs = localStorage.getItem('gworship_custom_bgs');
      if (savedBgs) setCustomDataSlots(JSON.parse(savedBgs));
    } catch {}

    // Load songs from IndexedDB (dengan pembersihan duplikat otomatis)
    db.deduplicateSongs().then((loadedSongs) => {
      setSongs(loadedSongs);
      const savedSetlist = localStorage.getItem('gworship_song_setlist');
      if (savedSetlist) {
        try {
          const parsed = JSON.parse(savedSetlist);
          setSongSetlist(parsed);
          if (parsed.length > 0) {
            handleSelectSongDirect(parsed[0], 0);
          }
        } catch {
          setSongSetlist(loadedSongs.slice(0, 3));
          if (loadedSongs.length > 0) handleSelectSongDirect(loadedSongs[0], 0);
        }
      } else {
        setSongSetlist(loadedSongs.slice(0, 3));
        if (loadedSongs.length > 0) handleSelectSongDirect(loadedSongs[0], 0);
      }
    });

    // Load bible from IndexedDB
    db.getBibleVerses().then((verses) => {
      setBibleData(verses);
      setBibleStatusText(`${verses.length} Ayat Tersimpan`);
    });

    // Load custom media (Images, Videos, HTML animations) from IndexedDB
    db.getCustomMediaList().then((mediaList) => {
      setCustomMediaList(mediaList);
      const slots: Record<string, string> = {};
      mediaList.forEach((m) => {
        slots[m.id] = m.data;
      });
      setCustomDataSlots((prev) => ({ ...prev, ...slots }));
    });

    // Load saved setlists from IndexedDB
    db.getSavedSetlists().then((setlists) => {
      setSavedSetlists(setlists);
      const savedActiveId = localStorage.getItem('gworship_active_setlist_id');
      if (savedActiveId) {
        const found = setlists.find((s) => s.id === savedActiveId);
        if (found) {
          setActiveSetlistId(found.id);
          setActiveSetlistName(found.name);
        }
      } else if (setlists.length > 0) {
        setActiveSetlistId(setlists[0].id);
        setActiveSetlistName(setlists[0].name);
      }
    });

    const unsubMedia = syncService.subscribeMedia((mediaList) => {
      setCustomMediaList(mediaList);
      const slots: Record<string, string> = {};
      mediaList.forEach((m) => {
        slots[m.id] = m.data;
      });
      setCustomDataSlots((prev) => ({ ...prev, ...slots }));
    });

    return () => {
      unsubMedia();
    };
  }, []);

  // Save setlist to localStorage
  useEffect(() => {
    if (songSetlist.length > 0) {
      try {
        localStorage.setItem('gworship_song_setlist', JSON.stringify(songSetlist));
      } catch {}
    }
  }, [songSetlist]);

  // -------------------------------------------------------------
  // 2. PARSE LYRICS INTO SLIDES
  // -------------------------------------------------------------
  const parseSongLyrics = useCallback((lyricsText: string): SlideItem[] => {
    if (!lyricsText || !lyricsText.trim()) return [];

    const lines = lyricsText.replace(/\r\n/g, '\n').split('\n');
    const result: SlideItem[] = [];
    let currentTag = 'Bait 1';
    let currentLines: string[] = [];

    const flush = () => {
      if (currentLines.length > 0) {
        const text = currentLines.join('\n').trim();
        if (text) {
          result.push({ tag: currentTag, text });
        }
        currentLines = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      const tagMatch = trimmed.match(/^\[(.*?)\]$/);
      if (tagMatch) {
        flush();
        const raw = tagMatch[1].trim();
        if (raw.toUpperCase().startsWith('V') || raw.toLowerCase().includes('verse')) {
          const numMatch = raw.match(/\d+/);
          currentTag = numMatch ? (raw.toUpperCase().startsWith('V') && raw.length <= 3 ? raw.toUpperCase() : `Verse ${numMatch[0]}`) : raw.toUpperCase();
        } else if (raw.toUpperCase().startsWith('C') || raw.toLowerCase().includes('chorus') || raw.toLowerCase().includes('reff') || raw.toLowerCase().includes('refrain')) {
          const numMatch = raw.match(/\d+/);
          currentTag = numMatch ? `Chorus ${numMatch[0]}` : 'Chorus';
        } else if (raw.toUpperCase().startsWith('B') || raw.toLowerCase().includes('bridge')) {
          const numMatch = raw.match(/\d+/);
          currentTag = numMatch ? `Bridge ${numMatch[0]}` : 'Bridge';
        } else if (raw.toUpperCase().startsWith('E') || raw.toLowerCase().includes('ending')) {
          currentTag = 'Ending';
        } else {
          currentTag = raw;
        }
      } else if (trimmed === '' && currentLines.length >= 4) {
        flush();
      } else {
        currentLines.push(line);
      }
    }
    flush();

    if (result.length === 0) {
      const blocks = lyricsText.split(/\n\s*\n/).filter((b) => b.trim());
      return blocks.map((b, i) => ({
        tag: `Bait ${i + 1}`,
        text: b.trim(),
      }));
    }

    return result;
  }, []);

  // -------------------------------------------------------------
  // 3. SONG & SLIDE STAGING
  // -------------------------------------------------------------
  const handleSelectSongDirect = useCallback(
    (song: Song, index: number) => {
      const slides = parseSongLyrics(song.lyrics);
      setCurrentSongIndex(index);
      setCurrentSlides(slides);
      setCurrentSlideIndex(0);
      setActiveContentType('SONG');

      const firstSlide = slides[0];
      const targetBg = song.bgAnim || displayState.bgSelector || 'anim-cross';
      const targetFx = song.bgFx || DEFAULT_BG_FX;

      broadcastDisplay({
        ...displayState,
        lyricsHtml: firstSlide ? firstSlide.text : '',
        activeTitle: song.title,
        activeTag: firstSlide ? firstSlide.tag : '',
        bgSelector: targetBg,
        bgFx: targetFx,
        isBible: false,
        reference: '',
        isCleared: false,
      });
    },
    [parseSongLyrics, displayState, broadcastDisplay]
  );

  const handleSelectSong = useCallback(
    (index: number) => {
      if (index < 0 || index >= songSetlist.length) return;
      handleSelectSongDirect(songSetlist[index], index);
    },
    [songSetlist, handleSelectSongDirect]
  );

  const handleGoToSlide = useCallback(
    (sIndex: number) => {
      if (sIndex < 0 || sIndex >= currentSlides.length) return;
      setCurrentSlideIndex(sIndex);
      const slide = currentSlides[sIndex];

      broadcastDisplay({
        ...displayState,
        lyricsHtml: slide.text,
        activeTag: slide.tag,
        isCleared: false,
      });
    },
    [currentSlides, displayState, broadcastDisplay]
  );

  const handleNextSlide = useCallback(() => {
    if (currentSlides.length === 0) return;
    if (currentSlideIndex < currentSlides.length - 1) {
      handleGoToSlide(currentSlideIndex + 1);
    }
  }, [currentSlides, currentSlideIndex, handleGoToSlide]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlides.length === 0) return;
    if (currentSlideIndex > 0) {
      handleGoToSlide(currentSlideIndex - 1);
    }
  }, [currentSlides, currentSlideIndex, handleGoToSlide]);

  const handleToggleClear = useCallback(() => {
    setDisplayState((prev) => {
      const nextVal = !prev.isCleared;
      const nextState = { ...prev, isCleared: nextVal };
      syncService.broadcast(nextState);
      showToast(nextVal ? 'Clear Text: AKTIF (Teks Sembunyi)' : 'Clear Text: NONAKTIF');
      return nextState;
    });
  }, [showToast]);

  const handleToggleBlack = useCallback(() => {
    setDisplayState((prev) => {
      const nextVal = !prev.isBlack;
      const nextState = { ...prev, isBlack: nextVal };
      syncService.broadcast(nextState);
      showToast(nextVal ? 'Black Screen: AKTIF (Layar Hitam)' : 'Black Screen: NONAKTIF');
      return nextState;
    });
  }, [showToast]);

  const handleToggleTicker = useCallback(() => {
    broadcastDisplay({
      ...displayState,
      ticker: {
        ...displayState.ticker,
        visible: !displayState.ticker.visible,
      },
    });
  }, [displayState, broadcastDisplay]);

  const handleUpdateTickerText = useCallback(
    (text: string) => {
      broadcastDisplay({
        ...displayState,
        ticker: {
          ...displayState.ticker,
          text,
        },
      });
    },
    [displayState, broadcastDisplay]
  );

  const handleChangeFontSize = useCallback(
    (delta: number) => {
      const newSize = Math.max(2.5, Math.min(8.5, +(displayState.fontSize + delta).toFixed(1)));
      broadcastDisplay({
        ...displayState,
        fontSize: newSize,
      });
    },
    [displayState, broadcastDisplay]
  );

  const handleChangeTranslationPercent = useCallback(
    (deltaOrValue: number, isAbsolute = false) => {
      const current = displayState.translationPercent ?? 40;
      const target = isAbsolute ? deltaOrValue : current + deltaOrValue;
      const clamped = Math.max(25, Math.min(85, Math.round(target)));
      broadcastDisplay({
        ...displayState,
        translationPercent: clamped,
      });
      showToast(`🔤 Skala Font Arti: ${clamped}% dari lirik`);
    },
    [displayState, broadcastDisplay, showToast]
  );

  const handleToggleDisplayMode = useCallback(() => {
    const nextMode = displayState.displayMode === 'lowerThird' ? 'center' : 'lowerThird';
    broadcastDisplay({
      ...displayState,
      displayMode: nextMode,
    });
  }, [displayState, broadcastDisplay]);

  const activeSong = useMemo(() => {
    if (activeContentType === 'SONG' && currentSongIndex >= 0 && currentSongIndex < songSetlist.length) {
      return songSetlist[currentSongIndex];
    }
    return null;
  }, [activeContentType, currentSongIndex, songSetlist]);

  const saveSongDebounceRef = useRef<any>(null);
  const persistSongDebounced = useCallback((song: Song) => {
    if (saveSongDebounceRef.current) clearTimeout(saveSongDebounceRef.current);
    saveSongDebounceRef.current = setTimeout(async () => {
      try {
        await db.saveSong(song);
      } catch (err) {
        console.error('Failed to auto-save song', err);
      }
    }, 350);
  }, []);

  const handleChangeBg = useCallback(
    async (selector: string) => {
      let compConfigToSet: CompositeBackgroundConfig | undefined = undefined;
      if (selector.startsWith('comp-')) {
        const found = customMediaList.find((m) => m.id === selector);
        if (found) {
          if (found.compositeConfig) {
            compConfigToSet = found.compositeConfig;
          } else {
            try {
              compConfigToSet = JSON.parse(found.data);
            } catch {}
          }
        }
      }

      broadcastDisplay({
        ...displayState,
        bgSelector: selector,
        compositeBg: compConfigToSet,
      });

      // Auto-attach to active song in setlist & library!
      const currentActive =
        activeContentType === 'SONG' && currentSongIndex >= 0 && currentSongIndex < songSetlist.length
          ? songSetlist[currentSongIndex]
          : null;

      if (currentActive) {
        const updatedSong: Song = {
          ...currentActive,
          bgAnim: selector,
          bgFx: displayState.bgFx || currentActive.bgFx || DEFAULT_BG_FX,
        };

        // Update active setlist
        setSongSetlist((prev) =>
          prev.map((s, idx) => (idx === currentSongIndex ? updatedSong : s))
        );

        // Update library
        setSongs((prev) =>
          prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
        );

        // Persist in IndexedDB
        await db.saveSong(updatedSong);

        // Persist in saved setlist if active
        if (activeSetlistId) {
          const sl = savedSetlists.find((item) => item.id === activeSetlistId);
          if (sl) {
            const updatedSl = {
              ...sl,
              songs: sl.songs.map((s) => (s.id === updatedSong.id ? updatedSong : s)),
              updatedAt: Date.now(),
            };
            await db.saveSetlist(updatedSl);
            setSavedSetlists((prev) =>
              prev.map((item) => (item.id === activeSetlistId ? updatedSl : item))
            );
          }
        }

        const bgName = getBgName(selector, customMediaList);
        showToast(`📌 Background "${bgName}" ditempelkan ke lagu "${currentActive.title}"!`);
      }
    },
    [
      displayState,
      broadcastDisplay,
      activeContentType,
      currentSongIndex,
      songSetlist,
      customMediaList,
      activeSetlistId,
      savedSetlists,
      showToast,
    ]
  );

  const handleSaveCustomMedia = useCallback(
    async (item: CustomMediaItem) => {
      const updated = await db.saveCustomMedia(item);
      setCustomMediaList(updated);
      setCustomDataSlots((prev) => ({ ...prev, [item.id]: item.data }));
      syncService.broadcastMedia(updated);
      handleChangeBg(item.id);
      showToast(`Latar "${item.name}" disimpan & diterapkan!`);
    },
    [handleChangeBg, showToast]
  );

  const handleDeleteCustomMedia = useCallback(
    async (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = await db.deleteCustomMedia(id);
      setCustomMediaList(updated);
      syncService.broadcastMedia(updated);
      if (displayState.bgSelector === id) {
        handleChangeBg('anim-cross');
      }
      showToast('Latar Belakang berhasil dihapus');
    },
    [displayState.bgSelector, handleChangeBg, showToast]
  );

  const handleUpdateBgFx = useCallback(
    (newFx: BackgroundFx) => {
      broadcastDisplay({
        ...displayState,
        bgFx: newFx,
      });

      // Auto-attach to active song
      const currentActive =
        activeContentType === 'SONG' && currentSongIndex >= 0 && currentSongIndex < songSetlist.length
          ? songSetlist[currentSongIndex]
          : null;

      if (currentActive) {
        const updatedSong: Song = {
          ...currentActive,
          bgFx: newFx,
          bgAnim: displayState.bgSelector || currentActive.bgAnim || 'anim-cross',
        };

        setSongSetlist((prev) =>
          prev.map((s, idx) => (idx === currentSongIndex ? updatedSong : s))
        );

        setSongs((prev) =>
          prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
        );

        persistSongDebounced(updatedSong);
      }
    },
    [
      displayState,
      broadcastDisplay,
      activeContentType,
      currentSongIndex,
      songSetlist,
      persistSongDebounced,
    ]
  );

  const handleResetBgFx = useCallback(async () => {
    broadcastDisplay({
      ...displayState,
      bgFx: DEFAULT_BG_FX,
    });

    const currentActive =
      activeContentType === 'SONG' && currentSongIndex >= 0 && currentSongIndex < songSetlist.length
        ? songSetlist[currentSongIndex]
        : null;

    if (currentActive) {
      const updatedSong: Song = {
        ...currentActive,
        bgFx: DEFAULT_BG_FX,
      };

      setSongSetlist((prev) =>
        prev.map((s, idx) => (idx === currentSongIndex ? updatedSong : s))
      );

      setSongs((prev) =>
        prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
      );

      await db.saveSong(updatedSong);
      showToast(`Efek warna lagu "${currentActive.title}" direset ke normal`);
    } else {
      showToast('Efek background & warna direset ke default');
    }
  }, [
    displayState,
    broadcastDisplay,
    activeContentType,
    currentSongIndex,
    songSetlist,
    showToast,
  ]);

  const handleApplyBgToAllSongs = useCallback(async () => {
    if (songSetlist.length === 0) {
      showToast('Setlist lagu masih kosong', true);
      return;
    }
    const targetBg = displayState.bgSelector || 'anim-cross';
    const targetFx = displayState.bgFx || DEFAULT_BG_FX;

    const updatedSetlist = songSetlist.map((s) => ({
      ...s,
      bgAnim: targetBg,
      bgFx: targetFx,
    }));

    setSongSetlist(updatedSetlist);

    setSongs((prev) =>
      prev.map((s) => {
        const match = updatedSetlist.find((u) => u.id === s.id);
        return match || s;
      })
    );

    for (const song of updatedSetlist) {
      await db.saveSong(song);
    }

    if (activeSetlistId) {
      const sl = savedSetlists.find((item) => item.id === activeSetlistId);
      if (sl) {
        const updatedSl = { ...sl, songs: updatedSetlist, updatedAt: Date.now() };
        await db.saveSetlist(updatedSl);
        setSavedSetlists((prev) =>
          prev.map((item) => (item.id === activeSetlistId ? updatedSl : item))
        );
      }
    }

    showToast(`✓ Background & warna ditempelkan ke semua ${updatedSetlist.length} lagu di setlist!`);
  }, [
    songSetlist,
    displayState.bgSelector,
    displayState.bgFx,
    activeSetlistId,
    savedSetlists,
    showToast,
  ]);

  // --- STUDIO KOMPOSISI 2 LATAR (IMAGE + ANIMATION MIXER) ---
  const handleApplyCompositeToLive = useCallback(
    (config: CompositeBackgroundConfig) => {
      const targetId = config.id || 'comp-active';
      const savedConfig: CompositeBackgroundConfig = {
        ...config,
        id: targetId,
        enabled: true,
      };

      broadcastDisplay({
        ...displayState,
        bgSelector: targetId,
        compositeBg: savedConfig,
      });

      showToast('✨ Komposisi 2 Latar (Gambar + Animasi) Berhasil Diterapkan ke Layar!');
    },
    [displayState, broadcastDisplay, showToast]
  );

  const handleSaveAsNewBackground = useCallback(
    async (name: string, config: CompositeBackgroundConfig) => {
      const newId = `comp-${Date.now()}`;
      const savedConfig: CompositeBackgroundConfig = {
        ...config,
        id: newId,
        name,
        enabled: true,
      };

      const newMediaItem: CustomMediaItem = {
        id: newId,
        name,
        type: 'composite',
        data: JSON.stringify(savedConfig),
        dateAdded: Date.now(),
        compositeConfig: savedConfig,
      };

      const updated = [newMediaItem, ...customMediaList];
      await db.saveSetting('custom_media_items', updated);
      setCustomMediaList(updated);
      syncService.broadcastMedia(updated);

      // Immediately set as active
      broadcastDisplay({
        ...displayState,
        bgSelector: newId,
        compositeBg: savedConfig,
      });

      showToast(`💾 Background "${name}" berhasil disimpan ke galeri!`);
    },
    [customMediaList, displayState, broadcastDisplay, showToast]
  );

  const handleApplyCompositeToActiveSong = useCallback(
    async (config: CompositeBackgroundConfig, fx: BackgroundFx) => {
      const currentActive =
        activeContentType === 'SONG' && currentSongIndex >= 0 && currentSongIndex < songSetlist.length
          ? songSetlist[currentSongIndex]
          : null;

      if (!currentActive) {
        showToast('Pilih lagu aktif di setlist terlebih dahulu', true);
        return;
      }

      const compId = config.id || `comp-song-${currentActive.id}`;
      const savedConfig: CompositeBackgroundConfig = {
        ...config,
        id: compId,
        enabled: true,
      };

      const updatedSong: Song = {
        ...currentActive,
        bgAnim: compId,
        bgFx: fx,
      };

      // Ensure stored in customMediaList if not present
      if (!customMediaList.some((m) => m.id === compId)) {
        const newMediaItem: CustomMediaItem = {
          id: compId,
          name: `Komposisi: ${currentActive.title}`,
          type: 'composite',
          data: JSON.stringify(savedConfig),
          dateAdded: Date.now(),
          compositeConfig: savedConfig,
        };
        const updatedMedia = [newMediaItem, ...customMediaList];
        await db.saveSetting('custom_media_items', updatedMedia);
        setCustomMediaList(updatedMedia);
        syncService.broadcastMedia(updatedMedia);
      }

      setSongSetlist((prev) =>
        prev.map((s, idx) => (idx === currentSongIndex ? updatedSong : s))
      );
      setSongs((prev) =>
        prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
      );
      await db.saveSong(updatedSong);

      broadcastDisplay({
        ...displayState,
        bgSelector: compId,
        bgFx: fx,
        compositeBg: savedConfig,
      });

      showToast(`📌 Komposisi 2 Latar berhasil ditempelkan pada lagu "${currentActive.title}"!`);
    },
    [
      activeContentType,
      currentSongIndex,
      songSetlist,
      customMediaList,
      displayState,
      broadcastDisplay,
      showToast,
    ]
  );

  const handleUploadImageFromStudio = useCallback(
    async (name: string, dataUrl: string) => {
      const newId = `img-custom-${Date.now()}`;
      const newMediaItem: CustomMediaItem = {
        id: newId,
        name: name || 'Foto Unggahan Kustom',
        type: 'image',
        data: dataUrl,
        dateAdded: Date.now(),
      };
      const updated = [newMediaItem, ...customMediaList];
      await db.saveSetting('custom_media_items', updated);
      setCustomMediaList(updated);
      syncService.broadcastMedia(updated);
      showToast(`Gambar "${newMediaItem.name}" berhasil diunggah!`);
    },
    [customMediaList, showToast]
  );

  const isBgFxActive = useMemo(() => {
    const fx = displayState.bgFx || DEFAULT_BG_FX;
    return (
      fx.speed !== 1.0 ||
      fx.hue !== 0 ||
      fx.brightness !== 100 ||
      fx.contrast !== 100 ||
      fx.saturation !== 100 ||
      fx.blur !== 0 ||
      fx.sepia !== 0
    );
  }, [displayState.bgFx]);

  const handleUpdateTimer = useCallback(
    (updater: (prev: WorshipTimerState) => WorshipTimerState) => {
      setDisplayState((prev) => {
        const currentTimer = prev.timer || DEFAULT_WORSHIP_TIMER;
        const nextTimer = updater(currentTimer);
        const nextState = {
          ...prev,
          timer: nextTimer,
        };
        broadcastDisplay(nextState);
        return nextState;
      });
    },
    [broadcastDisplay]
  );

  const handleToggleTimerOverlay = useCallback(() => {
    setDisplayState((prev) => {
      const currentTimer = prev.timer || DEFAULT_WORSHIP_TIMER;
      const nextTimer: WorshipTimerState = {
        ...currentTimer,
        visible: !currentTimer.visible,
      };
      const nextState = {
        ...prev,
        timer: nextTimer,
      };
      broadcastDisplay(nextState);
      showToast(
        nextTimer.visible
          ? '⏱️ Timer diaktifkan ke Layar Proyektor (Live)'
          : '⏱️ Timer disembunyikan dari Layar Proyektor'
      );
      return nextState;
    });
  }, [broadcastDisplay, showToast]);

  // -------------------------------------------------------------
  // 4. BIBLE SEARCH & STAGING
  // -------------------------------------------------------------
  const bibleBooks = useMemo(() => {
    const rawBooks = Array.from(new Set(bibleData.map((v) => normalizeBookName(v.book))));
    return rawBooks.sort((a, b) => {
      const idxA = INDO_BIBLE_BOOKS.indexOf(a);
      const idxB = INDO_BIBLE_BOOKS.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [bibleData]);

  useEffect(() => {
    if (bibleBooks.length > 0 && (!selectedBook || !bibleBooks.includes(selectedBook))) {
      setSelectedBook(bibleBooks[0]);
    }
  }, [bibleBooks, selectedBook]);

  const availableChapters = useMemo(() => {
    if (!selectedBook) return [1];
    const chaps = Array.from(
      new Set(
        bibleData
          .filter((v) => normalizeBookName(v.book) === selectedBook)
          .map((v) => v.chapter)
      )
    ).sort((a, b) => a - b);
    return chaps.length > 0 ? chaps : [1];
  }, [bibleData, selectedBook]);

  const availableVerses = useMemo(() => {
    if (!selectedBook) return [1];
    const verses = Array.from(
      new Set(
        bibleData
          .filter(
            (v) =>
              normalizeBookName(v.book) === selectedBook && v.chapter === selectedChapter
          )
          .map((v) => v.verse)
      )
    ).sort((a, b) => a - b);
    return verses.length > 0 ? verses : [1];
  }, [bibleData, selectedBook, selectedChapter]);

  const handleSelectBibleVerse = useCallback(
    (verse: BibleVerse) => {
      const resolvedBook = normalizeBookName(verse.book);
      const ref = `${resolvedBook} ${verse.chapter}:${verse.verse}`;
      const slides: SlideItem[] = [{ tag: ref, text: verse.text }];
      setCurrentSlides(slides);
      setCurrentSlideIndex(0);
      setActiveContentType('BIBLE');

      broadcastDisplay({
        ...displayState,
        lyricsHtml: `"${verse.text}"`,
        activeTitle: ref,
        activeTag: 'Alkitab',
        isBible: true,
        reference: ref,
        isCleared: false,
      });
    },
    [displayState, broadcastDisplay]
  );

  const handleAddVerseToSetlist = useCallback(
    (verse: BibleVerse) => {
      setBibleSetlist((prev) => {
        const next = [...prev, verse];
        return next;
      });
      handleSelectBibleVerse(verse);
    },
    [handleSelectBibleVerse]
  );

  const handleFastBibleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      const clean = query.trim().replace(/\s+/g, ' ');
      const match = clean.match(/^([1-3]?\s*[A-Za-z]+)\s*(\d+)[:\.]?(\d+)?$/);

      if (match) {
        const rawBook = match[1].toLowerCase().replace(/\s+/g, '');
        const chapter = parseInt(match[2], 10);
        const verseNum = match[3] ? parseInt(match[3], 10) : 1;

        const foundBook = INDO_BIBLE_BOOKS.find((b) => {
          const lower = b.toLowerCase().replace(/\s+/g, '');
          return lower.startsWith(rawBook) || lower.includes(rawBook);
        });

        if (foundBook) {
          const foundVerse = bibleData.find(
            (v) => v.book === foundBook && v.chapter === chapter && v.verse === verseNum
          );
          if (foundVerse) {
            handleAddVerseToSetlist(foundVerse);
            return;
          }
        }
      }

      const searchLower = query.toLowerCase();
      const matchedVerses = bibleData.filter(
        (v) =>
          v.text.toLowerCase().includes(searchLower) ||
          `${v.book} ${v.chapter}:${v.verse}`.toLowerCase().includes(searchLower)
      );

      if (matchedVerses.length > 0) {
        handleAddVerseToSetlist(matchedVerses[0]);
      } else {
        alert(`Ayat "${query}" tidak ditemukan di database.`);
      }
    },
    [bibleData, handleAddVerseToSetlist]
  );

  // -------------------------------------------------------------
  // SETLIST MANAGEMENT HANDLERS (INDEXEDDB & JSON)
  // -------------------------------------------------------------
  const handleLoadSetlist = useCallback(
    (setlist: SavedSetlist) => {
      setSongSetlist(setlist.songs || []);
      setBibleSetlist(setlist.bibleVerses || []);
      setActiveSetlistId(setlist.id);
      setActiveSetlistName(setlist.name);
      try {
        localStorage.setItem('gworship_active_setlist_id', setlist.id);
        localStorage.setItem('gworship_song_setlist', JSON.stringify(setlist.songs || []));
      } catch {}

      if (setlist.songs && setlist.songs.length > 0) {
        handleSelectSongDirect(setlist.songs[0], 0);
      } else if (setlist.bibleVerses && setlist.bibleVerses.length > 0) {
        handleSelectBibleVerse(setlist.bibleVerses[0]);
        setCurrentBibleIndex(0);
      } else {
        setCurrentSongIndex(-1);
        setCurrentBibleIndex(-1);
        setCurrentSlides([]);
      }
      showToast(`Setlist "${setlist.name}" berhasil dimuat!`);
    },
    [handleSelectSongDirect, handleSelectBibleVerse, showToast]
  );

  const handleSaveCurrentSetlist = useCallback(
    async (name: string, serviceType: string, date: string, desc: string) => {
      const existing = savedSetlists.find((s) => s.id === activeSetlistId);
      const newSetlist: SavedSetlist = {
        id: existing?.id || `setlist-${Date.now()}`,
        name,
        serviceType,
        serviceDate: date,
        description: desc,
        songs: songSetlist,
        bibleVerses: bibleSetlist,
        createdAt: existing?.createdAt || Date.now(),
        updatedAt: Date.now(),
      };

      const updated = await db.saveSetlist(newSetlist);
      setSavedSetlists(updated);
      setActiveSetlistId(newSetlist.id);
      setActiveSetlistName(newSetlist.name);
      try {
        localStorage.setItem('gworship_active_setlist_id', newSetlist.id);
      } catch {}
      showToast(`Setlist "${newSetlist.name}" disimpan ke IndexedDB!`);
    },
    [activeSetlistId, savedSetlists, songSetlist, bibleSetlist, showToast]
  );

  const handleDeleteSetlist = useCallback(
    async (id: string) => {
      const updated = await db.deleteSetlist(id);
      setSavedSetlists(updated);
      if (activeSetlistId === id) {
        setActiveSetlistId(null);
        setActiveSetlistName('Setlist Kustom');
        try {
          localStorage.removeItem('gworship_active_setlist_id');
        } catch {}
      }
      showToast('Setlist berhasil dihapus');
    },
    [activeSetlistId, showToast]
  );

  const handleExportSetlistJSON = useCallback(
    (setlist: SavedSetlist) => {
      const exportData = {
        format: 'gworship_setlist',
        version: 1,
        setlist,
        exportedAt: new Date().toISOString(),
      };
      const jsonStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
      const a = document.createElement('a');
      a.href = jsonStr;
      const cleanFileName = setlist.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      a.download = `setlist_${cleanFileName}_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      showToast(`File setlist "${setlist.name}.json" berhasil diexport!`);
    },
    [showToast]
  );

  const handleImportSetlistJSON = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          let newSetlist: SavedSetlist;

          if (parsed.format === 'gworship_setlist' && parsed.setlist) {
            newSetlist = {
              ...parsed.setlist,
              id: `setlist-${Date.now()}`,
              name: parsed.setlist.name || file.name.replace(/\.json$/i, ''),
              updatedAt: Date.now(),
            };
          } else if (parsed.name && (parsed.songs || parsed.bibleVerses)) {
            newSetlist = {
              id: `setlist-${Date.now()}`,
              name: parsed.name,
              serviceType: parsed.serviceType || 'Ibadah',
              serviceDate: parsed.serviceDate || new Date().toISOString().slice(0, 10),
              description: parsed.description || 'Diimpor dari file JSON',
              songs: parsed.songs || [],
              bibleVerses: parsed.bibleVerses || [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
          } else if (Array.isArray(parsed)) {
            newSetlist = {
              id: `setlist-${Date.now()}`,
              name: file.name.replace(/\.json$/i, '').replace(/[-_]/g, ' '),
              serviceType: 'Ibadah',
              serviceDate: new Date().toISOString().slice(0, 10),
              description: `Diimpor dari ${file.name}`,
              songs: parsed,
              bibleVerses: [],
              createdAt: Date.now(),
              updatedAt: Date.now(),
            };
          } else {
            showToast('Format JSON Setlist tidak valid!', true);
            return;
          }

          const updated = await db.saveSetlist(newSetlist);
          setSavedSetlists(updated);
          handleLoadSetlist(newSetlist);
          showToast(`Setlist "${newSetlist.name}" berhasil diimpor & dimuat!`);
        } catch {
          showToast('Gagal memproses file JSON!', true);
        }
      };
      reader.readAsText(file);
    },
    [handleLoadSetlist, showToast]
  );

  const handleClearCurrentSetlist = useCallback(() => {
    if (confirm('Kosongkan seluruh susunan lagu & ayat di setlist saat ini?')) {
      setSongSetlist([]);
      setBibleSetlist([]);
      setCurrentSongIndex(-1);
      setCurrentBibleIndex(-1);
      setCurrentSlides([]);
      setActiveSetlistId(null);
      setActiveSetlistName('Setlist Kosong');
      try {
        localStorage.removeItem('gworship_active_setlist_id');
        localStorage.setItem('gworship_song_setlist', JSON.stringify([]));
      } catch {}
      showToast('Setlist dikosongkan.');
    }
  }, [showToast]);

  // -------------------------------------------------------------
  // 5. QUICK TAG JUMP & CONTENT NAVIGATION
  // -------------------------------------------------------------
  const jumpToTag = useCallback(
    (targetTag: string) => {
      if (activeContentType !== 'SONG' || currentSlides.length === 0) return;
      const targetClean = targetTag.toUpperCase();
      const idx = currentSlides.findIndex((s) => {
        const clean = s.tag.toUpperCase().replace(/[\[\]]/g, '').trim();
        if (clean === targetClean) return true;
        if (targetClean === 'B1' && (clean === 'B' || clean === 'BRIDGE' || clean === 'BRIDGE 1')) return true;
        if (targetClean === 'E' && (clean === 'E1' || clean === 'ENDING' || clean === 'END')) return true;
        if (
          targetClean === 'C1' &&
          (clean === 'C' ||
            clean === 'REFREIN' ||
            clean === 'CHORUS' ||
            clean === 'REFF' ||
            clean === 'REFREIN 1' ||
            clean === 'CHORUS 1' ||
            clean === 'REFF 1')
        )
          return true;
        if (targetClean === 'C2' && (clean === 'REFREIN 2' || clean === 'CHORUS 2' || clean === 'REFF 2')) return true;
        if (targetClean === 'C3' && (clean === 'REFREIN 3' || clean === 'CHORUS 3' || clean === 'REFF 3')) return true;
        if (targetClean === 'V1' && (clean === 'V' || clean === 'VERSE 1' || clean === 'BAIT 1')) return true;
        if (targetClean === 'V2' && (clean === 'VERSE 2' || clean === 'BAIT 2')) return true;
        if (targetClean === 'V3' && (clean === 'VERSE 3' || clean === 'BAIT 3')) return true;
        if (targetClean === 'V4' && (clean === 'VERSE 4' || clean === 'BAIT 4')) return true;
        return false;
      });

      if (idx !== -1) {
        handleGoToSlide(idx);
        showToast('⏩ ' + currentSlides[idx].tag);
      } else {
        showToast(`Bagian [${targetTag}] tidak ada di lagu ini`, true);
      }
    },
    [activeContentType, currentSlides, handleGoToSlide, showToast]
  );

  const nextContent = useCallback(() => {
    if (activeContentType === 'SONG') {
      if (currentSlideIndex < currentSlides.length - 1) {
        handleGoToSlide(currentSlideIndex + 1);
      }
    } else if (activeContentType === 'BIBLE') {
      if (currentBibleIndex < bibleSetlist.length - 1) {
        handleSelectBibleVerse(bibleSetlist[currentBibleIndex + 1]);
        setCurrentBibleIndex(currentBibleIndex + 1);
        showToast(
          `Ayat: ${bibleSetlist[currentBibleIndex + 1]?.book} ${bibleSetlist[currentBibleIndex + 1]?.chapter}:${bibleSetlist[currentBibleIndex + 1]?.verse}`
        );
      }
    }
  }, [
    activeContentType,
    currentSlideIndex,
    currentSlides.length,
    bibleSetlist,
    currentBibleIndex,
    handleGoToSlide,
    handleSelectBibleVerse,
    showToast,
  ]);

  const prevContent = useCallback(() => {
    if (activeContentType === 'SONG') {
      if (currentSlideIndex > 0) {
        handleGoToSlide(currentSlideIndex - 1);
      }
    } else if (activeContentType === 'BIBLE') {
      if (currentBibleIndex > 0) {
        handleSelectBibleVerse(bibleSetlist[currentBibleIndex - 1]);
        setCurrentBibleIndex(currentBibleIndex - 1);
        showToast(
          `Ayat: ${bibleSetlist[currentBibleIndex - 1]?.book} ${bibleSetlist[currentBibleIndex - 1]?.chapter}:${bibleSetlist[currentBibleIndex - 1]?.verse}`
        );
      }
    }
  }, [
    activeContentType,
    currentSlideIndex,
    bibleSetlist,
    currentBibleIndex,
    handleGoToSlide,
    handleSelectBibleVerse,
    showToast,
  ]);

  // -------------------------------------------------------------
  // 6. TOUCH, TAP & SWIPE GESTURES (MIRROR SCREEN MODE)
  // -------------------------------------------------------------
  const handleTap = useCallback(
    (direction: 'left' | 'right' | 'center') => {
      if (isPinchingRef.current || Date.now() - lastSwipeTimeRef.current < 400) return;

      // 1. Center Tap: Buka / Tutup Menu Kontrol Operator
      if (direction === 'center') {
        if (tapTimerRef.current) {
          clearTimeout(tapTimerRef.current);
          tapTimerRef.current = null;
          lastTapDirRef.current = null;
        }
        setIsControlOpen((prev) => !prev);
        return;
      }

      // 2. Double Tap check (jika ketuk sisi yang sama dalam 260ms) -> Pindah Lagu / Ayat
      if (tapTimerRef.current !== null && lastTapDirRef.current === direction) {
        clearTimeout(tapTimerRef.current);
        tapTimerRef.current = null;
        lastTapDirRef.current = null;

        if (direction === 'right') {
          if (activeContentType === 'SONG' && currentSongIndex < songSetlist.length - 1) {
            handleSelectSong(currentSongIndex + 1);
            showToast(`⏩ Lagu Berikutnya: ${songSetlist[currentSongIndex + 1]?.title}`);
          } else if (activeContentType === 'BIBLE' && currentBibleIndex < bibleSetlist.length - 1) {
            handleSelectBibleVerse(bibleSetlist[currentBibleIndex + 1]);
            setCurrentBibleIndex(currentBibleIndex + 1);
            showToast('⏩ Ayat Berikutnya');
          }
        } else {
          if (activeContentType === 'SONG' && currentSongIndex > 0) {
            handleSelectSong(currentSongIndex - 1);
            showToast(`⏪ Lagu Sebelumnya: ${songSetlist[currentSongIndex - 1]?.title}`);
          } else if (activeContentType === 'BIBLE' && currentBibleIndex > 0) {
            handleSelectBibleVerse(bibleSetlist[currentBibleIndex - 1]);
            setCurrentBibleIndex(currentBibleIndex - 1);
            showToast('⏪ Ayat Sebelumnya');
          }
        }
        return;
      }

      // 3. First Tap: Set timer untuk Single Tap (Pindah Lirik / Slide Berikutnya atau Sebelumnya)
      if (tapTimerRef.current) {
        clearTimeout(tapTimerRef.current);
      }
      lastTapDirRef.current = direction;
      tapTimerRef.current = setTimeout(() => {
        tapTimerRef.current = null;
        lastTapDirRef.current = null;
        if (direction === 'right') {
          nextContent();
        } else {
          prevContent();
        }
      }, 260);
    },
    [
      nextContent,
      prevContent,
      activeContentType,
      currentSongIndex,
      songSetlist,
      currentBibleIndex,
      bibleSetlist,
      handleSelectSong,
      handleSelectBibleVerse,
      showToast,
    ]
  );

  const handleScreenTouchStart = (e: React.TouchEvent) => {
    if (isControlOpen) return;
    lastTouchTimeRef.current = Date.now();
    if (e.touches.length === 2) {
      isPinchingRef.current = true;
      initialPinchDistanceRef.current = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      initialFontSizePinchRef.current = displayState.fontSize;
    } else if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].pageX;
      touchStartYRef.current = e.touches[0].pageY;
      didSwipeRef.current = false;
    }
  };

  const handleScreenTouchMove = (e: React.TouchEvent) => {
    if (isControlOpen) return;
    if (isPinchingRef.current && e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const scale = currentDistance / (initialPinchDistanceRef.current || 1);
      let newSize = initialFontSizePinchRef.current * scale;
      if (newSize < 2) newSize = 2;
      if (newSize > 15) newSize = 15;
      newSize = +newSize.toFixed(1);
      broadcastDisplay({ ...displayState, fontSize: newSize });
    }
  };

  const handleScreenTouchEnd = (e: React.TouchEvent) => {
    if (isControlOpen) return;
    lastTouchTimeRef.current = Date.now();

    if (isPinchingRef.current) {
      if (e.touches.length < 2) {
        isPinchingRef.current = false;
        showToast(`Ukuran Font: ${displayState.fontSize}vw`);
      }
      return;
    }

    if (!didSwipeRef.current && e.changedTouches.length === 1) {
      touchEndXRef.current = e.changedTouches[0].pageX;
      touchEndYRef.current = e.changedTouches[0].pageY;
      const dx = touchEndXRef.current - touchStartXRef.current;
      const dy = touchEndYRef.current - touchStartYRef.current;

      if (Math.abs(dx) > 40 || Math.abs(dy) > 40) {
        didSwipeRef.current = true;
        lastSwipeTimeRef.current = Date.now();
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate(25);
          } catch {}
        }

        if (Math.abs(dx) > Math.abs(dy)) {
          // Horizontal Swipe
          if (dx > 0) {
            handleToggleBlack(); // Geser Kanan -> Black Screen
          } else {
            handleToggleClear(); // Geser Kiri -> Clear Text
          }
        } else {
          // Vertical Swipe
          if (dy > 0) {
            jumpToTag('C1'); // Geser Bawah -> Chorus 1
          } else {
            jumpToTag('V1'); // Geser Atas -> Bait V1
          }
        }
      } else {
        // TAP (movement <= 40px)
        // Kiri (< 35%): Lirik Sebelumnya (Tap 2x: Lagu Sebelumnya)
        // Kanan (> 65%): Lirik Berikutnya (Tap 2x: Lagu Berikutnya)
        // Tengah (35% - 65%): Buka / Tutup Menu Kontrol Operator
        const tapX = touchEndXRef.current;
        const width = window.innerWidth;
        if (tapX < width * 0.35) {
          handleTap('left');
        } else if (tapX > width * 0.65) {
          handleTap('right');
        } else {
          handleTap('center');
        }
      }
    }
  };

  const handleScreenClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlOpen) return;
      // Prevent duplicate synthetic click from mobile touchscreen
      if (Date.now() - lastTouchTimeRef.current < 600) return;

      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
        return;
      }
      if (Date.now() - lastSwipeTimeRef.current < 400) return;

      const width = window.innerWidth;
      const clickX = e.clientX;

      if (clickX < width * 0.35) {
        handleTap('left');
      } else if (clickX > width * 0.65) {
        handleTap('right');
      } else {
        handleTap('center');
      }
    },
    [isControlOpen, handleTap]
  );

  // -------------------------------------------------------------
  // 7. SYSTEM SHORTCUTS & TOOLS
  // -------------------------------------------------------------
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  const handleToggleWakeLock = useCallback(async () => {
    if ('wakeLock' in navigator) {
      if (isWakeLockActive && wakeLockSentinel) {
        try {
          await wakeLockSentinel.release();
          setWakeLockSentinel(null);
          setIsWakeLockActive(false);
          showToast('Always On: NONAKTIF');
        } catch {}
      } else {
        try {
          const sentinel = await (navigator as any).wakeLock.request('screen');
          setWakeLockSentinel(sentinel);
          setIsWakeLockActive(true);
          showToast('Always On: AKTIF (Layar tidak padam)');
          sentinel.addEventListener('release', () => {
            setIsWakeLockActive(false);
            setWakeLockSentinel(null);
          });
        } catch {
          showToast('Wake Lock tidak didukung browser ini', true);
        }
      }
    }
  }, [isWakeLockActive, wakeLockSentinel, showToast]);

  const handleOpenMultiScreen = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}?display=true`;
    window.open(url, 'GWorshipLiveOutput', 'width=1280,height=720,menubar=no,toolbar=no,location=no');
    showToast('Tab Display Dibuka (Tarik ke Layar Proyektor)');
  }, [showToast]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      // Logitech Presenter Remotes & Extra Navigation Keys
      switch (e.key) {
        case 'PageDown':
          e.preventDefault();
          nextContent();
          return;
        case 'PageUp':
          e.preventDefault();
          prevContent();
          return;
        case 'Enter':
          e.preventDefault();
          nextContent();
          return;
        case 'Backspace':
          e.preventDefault();
          prevContent();
          return;
        case 'Home':
          e.preventDefault();
          if (currentSlides.length > 0) {
            handleGoToSlide(0);
            showToast('⏮ Slide Pertama');
          }
          return;
        case 'End':
          e.preventDefault();
          if (currentSlides.length > 0) {
            handleGoToSlide(currentSlides.length - 1);
            showToast('⏭ Slide Terakhir');
          }
          return;
        case '.':
          e.preventDefault();
          handleToggleBlack();
          return;
        case ',':
          e.preventDefault();
          handleToggleClear();
          return;
      }

      // Numbers 1 - 9: Jump directly to setlist item #1 through #9
      if (e.key >= '1' && e.key <= '9') {
        const numIndex = parseInt(e.key, 10) - 1;
        if (activeContentType === 'SONG' && numIndex < songSetlist.length) {
          e.preventDefault();
          handleSelectSong(numIndex);
          showToast(`Lagu [${numIndex + 1}]: ${songSetlist[numIndex].title}`);
        } else if (activeContentType === 'BIBLE' && numIndex < bibleSetlist.length) {
          e.preventDefault();
          handleSelectBibleVerse(bibleSetlist[numIndex]);
          setCurrentBibleIndex(numIndex);
          showToast(
            `Ayat [${numIndex + 1}]: ${bibleSetlist[numIndex].book} ${bibleSetlist[numIndex].chapter}:${bibleSetlist[numIndex].verse}`
          );
        }
        return;
      }

      // Number 0: Jump to setlist item #10
      if (e.key === '0') {
        if (activeContentType === 'SONG' && songSetlist.length >= 10) {
          e.preventDefault();
          handleSelectSong(9);
          showToast(`Lagu [10]: ${songSetlist[9].title}`);
        } else if (activeContentType === 'BIBLE' && bibleSetlist.length >= 10) {
          e.preventDefault();
          handleSelectBibleVerse(bibleSetlist[9]);
          setCurrentBibleIndex(9);
          showToast(
            `Ayat [10]: ${bibleSetlist[9].book} ${bibleSetlist[9].chapter}:${bibleSetlist[9].verse}`
          );
        }
        return;
      }

      const key = e.key.toLowerCase();
      switch (key) {
        case ' ':
        case 'arrowright':
          e.preventDefault();
          nextContent();
          break;
        case 'arrowleft':
          e.preventDefault();
          prevContent();
          break;
        case 'arrowdown':
          e.preventDefault();
          if (activeContentType === 'SONG' && currentSongIndex < songSetlist.length - 1) {
            handleSelectSong(currentSongIndex + 1);
            showToast(`Lagu: ${songSetlist[currentSongIndex + 1].title}`);
          } else if (activeContentType === 'BIBLE' && currentBibleIndex < bibleSetlist.length - 1) {
            handleSelectBibleVerse(bibleSetlist[currentBibleIndex + 1]);
            setCurrentBibleIndex(currentBibleIndex + 1);
          }
          break;
        case 'arrowup':
          e.preventDefault();
          if (activeContentType === 'SONG' && currentSongIndex > 0) {
            handleSelectSong(currentSongIndex - 1);
            showToast(`Lagu: ${songSetlist[currentSongIndex - 1].title}`);
          } else if (activeContentType === 'BIBLE' && currentBibleIndex > 0) {
            handleSelectBibleVerse(bibleSetlist[currentBibleIndex - 1]);
            setCurrentBibleIndex(currentBibleIndex - 1);
          }
          break;
        case 'c':
          e.preventDefault();
          handleToggleClear();
          break;
        case 'b':
          e.preventDefault();
          handleToggleBlack();
          break;
        case 'l':
          e.preventDefault();
          handleOpenMultiScreen();
          break;
        case 'f':
        case 'f11':
          e.preventDefault();
          handleToggleFullscreen();
          break;
        case 'p':
          e.preventDefault();
          handleToggleOverlay('logo');
          break;
        case 'i':
          e.preventDefault();
          handleToggleOverlay('intro');
          break;
        case 'o':
          e.preventDefault();
          handleToggleOverlay('outro');
          break;
        case 'm':
          e.preventDefault();
          handleChangeFontSize(0.5);
          showToast(`Perbesar Huruf: ${(displayState.fontSize + 0.5).toFixed(1)}vw`);
          break;
        case 'n':
          e.preventDefault();
          handleChangeFontSize(-0.5);
          showToast(`Perkecil Huruf: ${(displayState.fontSize - 0.5).toFixed(1)}vw`);
          break;
        case 'u':
          e.preventDefault();
          handleToggleTimerOverlay();
          break;
        case 't':
          e.preventDefault();
          handleToggleTicker();
          break;
        case 'k':
          e.preventDefault();
          handleToggleWakeLock();
          break;
        case '+':
        case '=':
        case ']':
          e.preventDefault();
          handleChangeFontSize(0.5);
          showToast(`Perbesar Huruf: ${(displayState.fontSize + 0.5).toFixed(1)}vw`);
          break;
        case '-':
        case '_':
        case '[':
          e.preventDefault();
          handleChangeFontSize(-0.5);
          showToast(`Perkecil Huruf: ${(displayState.fontSize - 0.5).toFixed(1)}vw`);
          break;
        case 'q':
          e.preventDefault();
          jumpToTag('V1');
          break;
        case 'w':
          e.preventDefault();
          jumpToTag('V2');
          break;
        case 'e':
          e.preventDefault();
          jumpToTag('V3');
          break;
        case 'r':
          e.preventDefault();
          jumpToTag('V4');
          break;
        case 'a':
          e.preventDefault();
          jumpToTag('C1');
          break;
        case 's':
          e.preventDefault();
          jumpToTag('C2');
          break;
        case 'd':
          e.preventDefault();
          jumpToTag('C3');
          break;
        case 'z':
          e.preventDefault();
          jumpToTag('B1');
          break;
        case 'x':
          e.preventDefault();
          jumpToTag('E');
          break;
        case 'v':
          e.preventDefault();
          jumpToTag('V1');
          break;
        case 'f2':
          e.preventDefault();
          setIsControlOpen((prev) => !prev);
          break;
        case '?':
        case 'h':
        case 'f1':
          e.preventDefault();
          setIsShortcutsModalOpen((prev) => !prev);
          break;
        case 'escape':
          if (isShortcutsModalOpen) {
            e.preventDefault();
            setIsShortcutsModalOpen(false);
          } else if (isSongModalOpen) {
            setIsSongModalOpen(false);
          } else if (isDeleteModalOpen) {
            setIsDeleteModalOpen(false);
          } else if (isBibleImportModalOpen) {
            setIsBibleImportModalOpen(false);
          } else if (isControlOpen) {
            e.preventDefault();
            setIsControlOpen(false);
          } else if (displayState.isBlack) {
            handleToggleBlack();
          } else if (displayState.isCleared) {
            handleToggleClear();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    nextContent,
    prevContent,
    activeContentType,
    currentSongIndex,
    songSetlist,
    currentBibleIndex,
    bibleSetlist,
    handleSelectSong,
    handleSelectBibleVerse,
    handleToggleClear,
    handleToggleBlack,
    handleOpenMultiScreen,
    handleToggleFullscreen,
    handleToggleOverlay,
    handleToggleTicker,
    handleToggleWakeLock,
    handleToggleTimerOverlay,
    handleGoToSlide,
    handleChangeFontSize,
    jumpToTag,
    currentSlides,
    displayState.fontSize,
    displayState.isBlack,
    displayState.isCleared,
    isControlOpen,
    isShortcutsModalOpen,
    isSongModalOpen,
    isDeleteModalOpen,
    isBibleImportModalOpen,
    showToast,
  ]);

  // -------------------------------------------------------------
  // 7. SONG DATABASE & BACKUP TOOLS
  // -------------------------------------------------------------
  const handleSaveSong = useCallback(async (song: Song) => {
    await db.saveSong(song);
    const updated = await db.getSongs();
    setSongs(updated);
    setSongSetlist((prev) => prev.map((s) => (s.id === song.id ? song : s)));

    // If currently active song was edited, update displayState immediately!
    if (activeSong && activeSong.id === song.id) {
      broadcastDisplay({
        ...displayState,
        activeTitle: song.title,
        bgSelector: song.bgAnim || displayState.bgSelector || 'anim-cross',
        bgFx: song.bgFx || DEFAULT_BG_FX,
      });
    }

    showToast(`✓ Lagu "${song.title}" berhasil disimpan!`);
  }, [activeSong, displayState, broadcastDisplay, showToast]);

  const handleDeleteSong = useCallback(async (id: number | string) => {
    await db.deleteSong(id);
    const updated = await db.getSongs();
    setSongs(updated);
    setSongSetlist((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleSyncGoogleSheet = useCallback(async () => {
    setIsSyncingSheet(true);
    showToast('⏳ Menghubungkan ke Google Sheet...');
    try {
      const cloudSongs = await googleSheetService.fetchSongs();
      const currentLocal = await db.getSongs();
      const {
        updatedSongs,
        addedCount,
        updatedCount,
        identicalCount,
        duplicatesRemovedCount,
        totalCloud,
      } = googleSheetService.mergeSongs(currentLocal, cloudSongs);

      // Simpan menggunakan replaceAllSongs agar record duplikat lama di IndexedDB benar-benar terhapus
      await db.replaceAllSongs(updatedSongs);
      setSongs(updatedSongs);

      // Sinkronkan Setlist aktif jika ada lagu yang diupdate
      setSongSetlist((prev) =>
        prev.map((s) => {
          const match = updatedSongs.find(
            (u) => u.id === s.id || normalizeTitle(u.title) === normalizeTitle(s.title)
          );
          return match ? { ...s, id: match.id, title: match.title, lyrics: match.lyrics } : s;
        })
      );

      const summaryParts: string[] = [];
      if (addedCount > 0) summaryParts.push(`${addedCount} lagu baru`);
      if (updatedCount > 0) summaryParts.push(`${updatedCount} diperbarui`);
      if (identicalCount > 0) summaryParts.push(`${identicalCount} 100% sama persis (tanpa duplikat)`);
      if (duplicatesRemovedCount > 0) summaryParts.push(`${duplicatesRemovedCount} duplikat lama dibersihkan`);

      showToast(
        `✓ Sync Berhasil (${totalCloud} lagu): ${summaryParts.join(', ') || 'Semua lirik sudah cocok'}`
      );
    } catch (err: any) {
      console.error('Sheet sync error:', err);
      showToast(
        err?.message || 'Gagal koneksi ke Google Sheet. Periksa internet atau URL.',
        true
      );
    } finally {
      setIsSyncingSheet(false);
    }
  }, [showToast]);

  const handleExportSongsJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(songs, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `gworship_songs_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [songs]);

  const handleImportSongsJSON = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          const currentLocal = await db.getSongs();
          let importedNew = 0;
          let updatedCount = 0;
          let skippedIdentical = 0;

          for (const item of imported) {
            if (item.title && item.lyrics) {
              const normItemTitle = normalizeTitle(item.title);
              const normItemLyrics = normalizeLyrics(item.lyrics);
              const matchIdx = currentLocal.findIndex(
                (s) => normalizeTitle(s.title) === normItemTitle
              );

              if (matchIdx !== -1) {
                const existing = currentLocal[matchIdx];
                if (normalizeLyrics(existing.lyrics) === normItemLyrics) {
                  // 100% sama persis, jangan buat dua versi
                  skippedIdentical++;
                } else {
                  // Lirik berbeda, perbarui versi yang sudah ada
                  currentLocal[matchIdx] = {
                    ...existing,
                    lyrics: item.lyrics,
                  };
                  updatedCount++;
                }
              } else {
                currentLocal.push({
                  id: item.id || Date.now() + Math.random(),
                  title: item.title,
                  lyrics: item.lyrics,
                  bgAnim: item.bgAnim || 'anim-cross',
                  category: item.category || 'Praise & Worship',
                });
                importedNew++;
              }
            }
          }
          await db.replaceAllSongs(currentLocal);
          setSongs(currentLocal);
          showToast(
            `Impor JSON Selesai: ${importedNew} baru, ${updatedCount} diperbarui, ${skippedIdentical} sama persis (dilewati)`
          );
        }
      } catch {
        alert('File JSON tidak valid.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [showToast]);

  const handleBibleCsvImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length <= 1) return;

        const parseLine = (line: string): string[] => {
          const res: string[] = [];
          let cur = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
              res.push(cur.trim());
              cur = '';
            } else {
              cur += char;
            }
          }
          res.push(cur.trim());
          return res;
        };

        const header = parseLine(lines[0]).map((h) => h.toLowerCase());
        const bookIdx = header.findIndex((h) => h.includes('book') || h.includes('kitab'));
        const chapIdx = header.findIndex((h) => h.includes('chap') || h.includes('pasal'));
        const verseIdx = header.findIndex((h) => h.includes('verse') || h.includes('ayat'));
        const textIdx = header.findIndex((h) => h.includes('text') || h.includes('isi'));

        const parsedVerses: BibleVerse[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = parseLine(lines[i]);
          if (cols.length >= 4) {
            const rawB = bookIdx >= 0 ? cols[bookIdx] : cols[0];
            const c = chapIdx >= 0 ? parseInt(cols[chapIdx], 10) : parseInt(cols[1], 10);
            const v = verseIdx >= 0 ? parseInt(cols[verseIdx], 10) : parseInt(cols[2], 10);
            const t = textIdx >= 0 ? cols[textIdx] : cols[3];
            const b = normalizeBookName(rawB);
            if (b && !isNaN(c) && !isNaN(v) && t) {
              const bookIndex = INDO_BIBLE_BOOKS.indexOf(b);
              const isPB = bookIndex >= 39 || PB_BOOKS.includes(b);
              parsedVerses.push({
                id: `${b.toLowerCase().replace(/\s+/g, '')}-${c}-${v}`,
                book: b,
                chapter: c,
                verse: v,
                text: t.replace(/^"|"$/g, ''),
                type: isPB ? 'PB' : 'PL',
              });
            }
          }
        }

        if (parsedVerses.length > 0) {
          await db.bulkSaveBible(parsedVerses);
          const allVerses = await db.getBibleVerses();
          setBibleData(allVerses);
          setBibleStatusText(`${allVerses.length} Ayat Alkitab Tersimpan`);
          alert(`Sukses mengimpor ${parsedVerses.length} ayat Alkitab ke database lokal!`);
        }
      } catch {
        alert('Gagal memproses file CSV.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleUploadBgFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const slotId = 'img-custom-1';
      setCustomDataSlots((prev) => {
        const next = { ...prev, [slotId]: dataUrl };
        try {
          localStorage.setItem('gworship_custom_bgs', JSON.stringify(next));
        } catch {}
        return next;
      });
      handleChangeBg(slotId);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [handleChangeBg]);

  // Preset backgrounds
  const bgPresets = [
    { id: 'anim-cross', name: 'Salib Bercahaya', desc: 'Cross Glow Animasi', color: 'from-amber-600/30 to-amber-950/50' },
    { id: 'anim-stars', name: 'Taburan Bintang', desc: 'Starry Twinkle Cosmos', color: 'from-blue-900/40 to-slate-950' },
    { id: 'grad-1', name: 'Deep Midnight', desc: 'Worship Navy Gradient', color: 'from-slate-900 to-cyan-950' },
    { id: 'grad-4', name: 'Royal Violet', desc: 'Atmosphere Ungu Megah', color: 'from-purple-900 to-indigo-950' },
    { id: 'grad-5', name: 'Emerald Grace', desc: 'Hijau Kedamaian Hidup', color: 'from-emerald-900 to-teal-950' },
    { id: 'grad-6', name: 'Sunrise Praise', desc: 'Warm Radiant Red Glow', color: 'from-rose-900 to-amber-950' },
  ];

  // -------------------------------------------------------------
  // 8. RENDER PURE EXTERNAL PROJECTOR WINDOW (?display=true)
  // -------------------------------------------------------------
  if (isDisplayMode) {
    return (
      <div className="w-screen h-screen bg-black overflow-hidden select-none cursor-none">
        <LiveScreen
          state={displayState}
          customDataSlots={customDataSlots}
          customMediaList={customMediaList}
          gradientSlots={gradientSlots}
          overlays={overlays}
          isDisplayOnly={true}
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 9. MIRROR-SCREEN FIRST PRESENTATION EXPERIENCE
  // -------------------------------------------------------------
  return (
    <div
      className="relative w-screen h-screen bg-black text-white overflow-hidden select-none"
      onTouchStart={handleScreenTouchStart}
      onTouchMove={handleScreenTouchMove}
      onTouchEnd={handleScreenTouchEnd}
      onClick={handleScreenClick}
    >
      {/* Toast Notification HUD for Gestures & Shortcuts */}
      {toastMsg && (
        <div className="fixed top-6 inset-x-0 mx-auto z-[350] w-fit max-w-[90vw] pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black shadow-2xl backdrop-blur-md border flex items-center gap-2 ${
              toastError
                ? 'bg-rose-950/90 text-rose-200 border-rose-500/50 shadow-rose-950/50'
                : 'bg-slate-900/95 text-amber-300 border-amber-500/40 shadow-black/80'
            }`}
          >
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LAYER 1: 100% PURE FULLSCREEN WORSHIP OUTPUT (MIRRORED TO TV)  */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0">
        <LiveScreen
          state={displayState}
          customDataSlots={customDataSlots}
          customMediaList={customMediaList}
          gradientSlots={gradientSlots}
          overlays={overlays}
          isDisplayOnly={false}
          pauseBackgroundAnimation={ecoMode && isControlOpen}
        />
      </div>

      {/* ============================================================== */}
      {/* LAYER 2: DISCREET FLOATING CONTROL TRIGGER (WHEN PANEL CLOSED) */}
      {/* ============================================================== */}
      {!isControlOpen && (
        <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-between pointer-events-none px-3 sm:px-4">
          {/* SISI KIRI: Indikator Jumlah Slide & Chip Timer */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <div
              className="bg-black/25 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 text-[11px] font-bold text-amber-300/90 shadow-lg flex items-center gap-2 transition duration-200 select-none"
              title="Indikator nomor slide yang sedang aktif"
            >
              <span>
                Slide {currentSlides.length > 0 ? currentSlideIndex + 1 : 0} / {currentSlides.length}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Quick Eco Mode Status Chip */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleEcoMode();
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold shadow-lg backdrop-blur-md border transition cursor-pointer active:scale-95 select-none ${
                ecoMode
                  ? 'bg-cyan-950/40 hover:bg-cyan-900/60 border-cyan-500/40 text-cyan-300'
                  : 'bg-black/25 hover:bg-black/60 border-white/10 text-slate-300'
              }`}
              title={ecoMode ? 'Mode Dingin Aktif: HP adem & hemat baterai (Klik untuk ubah)' : 'Mode Performa Penuh (Klik untuk aktifkan Mode Dingin)'}
            >
              <Snowflake className="w-3 h-3 text-cyan-400" />
              <span>{ecoMode ? 'Dingin' : 'Penuh'}</span>
            </button>

            {/* Quick Timer Status Chip if timer is running or visible */}
            {(displayState.timer?.isRunning || displayState.timer?.visible) && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('TIMER');
                  setIsControlOpen(true);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg backdrop-blur-md border transition cursor-pointer active:scale-95 ${
                  displayState.timer?.visible
                    ? 'bg-rose-950/60 border-rose-500/60 text-rose-200 shadow-rose-950/30'
                    : 'bg-black/25 border-amber-500/40 text-amber-300/90 hover:bg-black/60'
                }`}
                title="Buka Panel Timer Ibadah"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400/90" />
                <span className="uppercase text-[10px] tracking-wider truncate max-w-[110px]">
                  {displayState.timer?.title || 'Timer'}
                </span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                    displayState.timer?.visible ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {displayState.timer?.visible ? 'LIVE' : 'OFF AIR'}
                </span>
              </button>
            )}
          </div>

          {/* SISI KANAN: Tombol Menu Kontrol Transparan */}
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsControlOpen(true);
              }}
              className="flex items-center gap-1.5 bg-black/25 hover:bg-black/70 text-white/80 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border border-white/10 hover:border-white/30 transition duration-200 cursor-pointer active:scale-95 select-none"
              title="Buka Panel Menu Kontrol Operator"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400/90" />
              <span>Menu Kontrol</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LAYER 3: FLOATING OPERATOR WORKSTATION DRAWER                  */}
      {/* ============================================================== */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        className={`absolute inset-x-0 bottom-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-700/80 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] transition-transform duration-300 flex flex-col max-h-[85vh] sm:max-h-[75vh] select-text pointer-events-auto ${
          isControlOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* --- DRAWER TOP ACTION BAR --- */}
        <div className="bg-slate-900 border-b border-slate-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 shrink-0 flex-wrap">
          {/* Close Panel Button (Crucial for screen mirroring!) */}
          <button
            type="button"
            onClick={() => setIsControlOpen(false)}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-extrabold shadow transition cursor-pointer active:scale-95"
            title="Sembunyikan panel agar layar proyektor 100% bersih"
          >
            <Eye className="w-4 h-4" />
            <span>TAMPILKAN KE LAYAR (BERSIH)</span>
          </button>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevSlide}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-700 cursor-pointer shadow active:scale-95"
              title="Slide Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <span className="text-xs font-mono font-bold text-amber-400 px-2">
              {currentSlideIndex + 1}/{currentSlides.length || 0}
            </span>
            <button
              type="button"
              onClick={handleNextSlide}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-500 cursor-pointer shadow active:scale-95"
              title="Slide Berikutnya"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Master Output Buttons */}
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Quick Google Sheet Sync Button */}
            <button
              type="button"
              onClick={handleSyncGoogleSheet}
              disabled={isSyncingSheet}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow ${
                isSyncingSheet
                  ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                  : 'bg-indigo-600/90 hover:bg-indigo-600 text-white border-indigo-400'
              }`}
              title="Tarik & Sinkronkan Lirik Lagu dari Google Sheet (Sync Cloud)"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isSyncingSheet ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncingSheet ? 'Syncing...' : 'Sync Cloud'}</span>
            </button>

            {/* Quick Timer Pill */}
            <button
              type="button"
              onClick={() => setActiveTab('TIMER')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow ${
                displayState.timer?.visible
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-300'
                  : displayState.timer?.isRunning
                  ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Buka Timer Ibadah"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Timer</span>
              {displayState.timer?.visible && (
                <span className="text-[9px] px-1 rounded bg-rose-600 text-white font-mono font-bold">
                  LIVE
                </span>
              )}
            </button>

            {/* Quick Background Studio Effects Button */}
            <button
              type="button"
              onClick={() => setIsBgEffectsModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow ${
                isBgFxActive
                  ? 'bg-amber-600/90 text-white border-amber-400 ring-2 ring-amber-400/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Studio Efek & Warna Background (Kecepatan, Hue, Kecerahan, Blur)"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Efek BG</span>
              {isBgFxActive && (
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={handleToggleClear}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow ${
                displayState.isCleared
                  ? 'bg-amber-600 text-white border-amber-400 ring-2 ring-amber-400/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {displayState.isCleared ? 'TEKS OFF' : 'CLEAR (C)'}
            </button>

            <button
              type="button"
              onClick={handleToggleBlack}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer shadow ${
                displayState.isBlack
                  ? 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-400/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {displayState.isBlack ? 'BLACK ON' : 'BLACK (B)'}
            </button>

            <button
              type="button"
              onClick={() => setIsShortcutsModalOpen(true)}
              className="p-1.5 text-amber-400 hover:text-amber-300 rounded-lg hover:bg-slate-800 cursor-pointer border border-amber-500/30 bg-amber-500/10 transition"
              title="Panduan Pintasan Keyboard & Gestur (Tekan ?)"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsControlOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- HORIZONTAL SLIDE TILES STRIP --- */}
        {currentSlides.length > 0 && (
          <div className="bg-slate-950/90 px-3 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-thin">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Slide Langsung:
            </span>
            {currentSlides.map((slide, sIdx) => {
              const isActive = sIdx === currentSlideIndex;
              return (
                <button
                  type="button"
                  key={`quick-slide-${sIdx}`}
                  onClick={() => handleGoToSlide(sIdx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer border flex items-center gap-1.5 min-w-[70px] justify-center ${
                    isActive
                      ? 'bg-amber-500 text-black border-white shadow-lg font-black scale-105'
                      : 'bg-slate-850 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <span>{slide.tag}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
                </button>
              );
            })}
          </div>
        )}

        {/* --- DRAWER TABS SWITCHER --- */}
        <div className="bg-slate-900/60 px-3 py-1.5 border-b border-slate-800 flex items-center gap-1 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('SETLIST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'SETLIST' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Setlist ({songSetlist.length + bibleSetlist.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SONGS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'SONGS' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Koleksi Lagu ({songs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('BIBLE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'BIBLE' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Alkitab Digital</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('THEME')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'THEME' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Latar & Format</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('STUDIO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'STUDIO'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 text-white shadow-lg font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Studio Komposisi & Efek</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
              BARU
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('TIMER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'TIMER' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Timer Ibadah</span>
            {displayState.timer?.isRunning && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {displayState.timer?.visible && (
              <span className="text-[9px] px-1 rounded bg-rose-600 text-white font-mono font-bold">
                LIVE
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('SETTINGS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'SETTINGS' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Alat & Layar</span>
          </button>
        </div>

        {/* --- TAB CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[220px]">
          {/* TAB 1: SETLIST IBADAH */}
          {activeTab === 'SETLIST' && (
            <div className="space-y-3">
              {/* Setlist Management Header Card */}
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-slate-400">Setlist Aktif:</span>
                    <span className="text-xs sm:text-sm font-black text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 truncate max-w-[240px]">
                      {activeSetlistName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      ({songSetlist.length} Lagu, {bibleSetlist.length} Ayat)
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setIsSetlistModalOpen(true)}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-indigo-600/30 active:scale-95"
                      title="Buka daftar setlist tersimpan di IndexedDB atau simpan preset baru"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Ganti / Kelola Ibadah</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const current = savedSetlists.find((s) => s.id === activeSetlistId);
                        if (current) {
                          handleExportSetlistJSON(current);
                        } else {
                          handleExportSetlistJSON({
                            id: `setlist-${Date.now()}`,
                            name: activeSetlistName,
                            songs: songSetlist,
                            bibleVerses: bibleSetlist,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                          });
                        }
                      }}
                      className="flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer shadow active:scale-95"
                      title="Download file setlist (.json)"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">Export .json</span>
                    </button>

                    <label className="flex items-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition cursor-pointer shadow active:scale-95">
                      <Upload className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden sm:inline">Import .json</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImportSetlistJSON(file);
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                    </label>

                    {(songSetlist.length > 0 || bibleSetlist.length > 0) && (
                      <button
                        type="button"
                        onClick={handleClearCurrentSetlist}
                        className="p-1.5 bg-slate-800 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 rounded-xl border border-slate-700 transition cursor-pointer"
                        title="Kosongkan seluruh isi setlist saat ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <span>Susunan Lagu & Ayat Presentasi Hari Ini</span>
                <span className="text-[10px] text-slate-400 normal-case">Klik item untuk langsung tampilkan</span>
              </div>

              {songSetlist.length === 0 && bibleSetlist.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs italic border border-dashed border-slate-800 rounded-xl">
                  Setlist masih kosong. Buka tab <strong>Koleksi Lagu</strong> atau <strong>Alkitab</strong> lalu klik "+ Setlist".
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {songSetlist.map((song, idx) => {
                    const isActive = idx === currentSongIndex && activeContentType === 'SONG';
                    return (
                      <div
                        key={`setlist-song-${song.id}-${idx}`}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                          isActive
                            ? 'bg-indigo-950/80 border-indigo-500 shadow-md ring-1 ring-indigo-400/40'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleSelectSong(idx);
                            setIsControlOpen(false); // Auto close so mirror is clean!
                          }}
                          className="flex items-center gap-2.5 overflow-hidden flex-1 text-left cursor-pointer mr-2 py-1"
                        >
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-bold truncate text-white">{song.title}</p>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-[10px] text-slate-400">{song.category || 'Praise & Worship'}</p>
                              {song.bgAnim && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] bg-slate-800/90 text-amber-300 border border-slate-700/80 font-mono">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full shrink-0"
                                    style={{
                                      backgroundColor: song.bgFx?.hue
                                        ? `hsl(${song.bgFx.hue}, 85%, 55%)`
                                        : '#f59e0b',
                                    }}
                                  />
                                  <span>{getBgName(song.bgAnim, customMediaList)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (idx > 0) {
                                const next = [...songSetlist];
                                const tmp = next[idx];
                                next[idx] = next[idx - 1];
                                next[idx - 1] = tmp;
                                setSongSetlist(next);
                              }
                            }}
                            disabled={idx === 0}
                            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Naik"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (idx < songSetlist.length - 1) {
                                const next = [...songSetlist];
                                const tmp = next[idx];
                                next[idx] = next[idx + 1];
                                next[idx + 1] = tmp;
                                setSongSetlist(next);
                              }
                            }}
                            disabled={idx === songSetlist.length - 1}
                            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Turun"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setSongSetlist(songSetlist.filter((_, i) => i !== idx))}
                            className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                            title="Hapus"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Bible in setlist */}
                  {bibleSetlist.map((verse, idx) => (
                    <div
                      key={`setlist-bible-${verse.id}-${idx}`}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handleSelectBibleVerse(verse);
                          setIsControlOpen(false);
                        }}
                        className="flex items-center gap-2 overflow-hidden flex-1 text-left cursor-pointer mr-2 py-1"
                      >
                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0">
                          📖
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-amber-300 truncate">
                            {verse.book} {verse.chapter}:{verse.verse}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">{verse.text}</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBibleSetlist(bibleSetlist.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KOLEKSI LAGU */}
          {activeTab === 'SONGS' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={songSearch}
                    onChange={(e) => setSongSearch(e.target.value)}
                    placeholder="Cari judul lagu atau lirik..."
                    className="w-full bg-slate-900 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
                  />
                  {songSearch && (
                    <button
                      type="button"
                      onClick={() => setSongSearch('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSyncGoogleSheet}
                  disabled={isSyncingSheet}
                  className={`text-white text-xs font-bold px-3 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow shrink-0 ${
                    isSyncingSheet
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-500'
                      : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                  }`}
                  title="Tarik & Sinkronkan Lirik Lagu dari Google Sheet"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isSyncingSheet ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isSyncingSheet ? 'Menyelaraskan...' : 'Sync Sheet'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSheetSyncModalOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition cursor-pointer border border-slate-700 shrink-0"
                  title="Pengaturan URL Google Sheet"
                >
                  <Settings className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSongToEdit(null);
                    setIsSongModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Lagu</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                {songs
                  .filter((s) => s.title.toLowerCase().includes(songSearch.toLowerCase()) || s.lyrics.toLowerCase().includes(songSearch.toLowerCase()))
                  .map((song) => (
                    <div
                      key={`song-db-${song.id}`}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {typeof song.id === 'number' && song.id < 1000000000 ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold shrink-0">
                              #{song.id}
                            </span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                              Lokal
                            </span>
                          )}
                          <p className="text-xs font-bold text-white truncate">{song.title}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-[10px] text-slate-400 truncate">{song.category || 'Praise & Worship'}</p>
                          {song.bgAnim && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9px] bg-slate-800/90 text-amber-300 border border-slate-700/80 font-mono">
                              <span
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{
                                  backgroundColor: song.bgFx?.hue
                                    ? `hsl(${song.bgFx.hue}, 85%, 55%)`
                                    : '#f59e0b',
                                }}
                              />
                              <span>{getBgName(song.bgAnim, customMediaList)}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSongToEdit(song);
                            setIsSongModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-indigo-400 rounded cursor-pointer"
                          title="Edit Lagu"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSongToDelete(song);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSongSetlist((prev) => [...prev, song]);
                            handleSelectSongDirect(song, songSetlist.length);
                            setIsControlOpen(false); // Close so projector is clean
                          }}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 shadow"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Pilih</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: ALKITAB DIGITAL */}
          {activeTab === 'BIBLE' && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-amber-400" />
                <input
                  type="text"
                  value={fastBibleInput}
                  onChange={(e) => setFastBibleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFastBibleSearch(fastBibleInput);
                      setFastBibleInput('');
                      setIsControlOpen(false);
                    }
                  }}
                  placeholder="Ketik ayat cepat lalu tekan Enter (misal: Yohanes 3:16, Mzm 23:1)..."
                  className="w-full bg-slate-900 text-white text-xs pl-9 pr-16 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleFastBibleSearch(fastBibleInput);
                    setFastBibleInput('');
                    setIsControlOpen(false);
                  }}
                  className="absolute right-1.5 top-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Buka
                </button>
              </div>

              {/* Selector Kitab-Pasal-Ayat */}
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={selectedBook}
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    setSelectedChapter(1);
                    setSelectedVerse(1);
                  }}
                  className="bg-slate-900 text-white text-xs p-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
                >
                  {bibleBooks.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedChapter}
                  onChange={(e) => {
                    setSelectedChapter(Number(e.target.value));
                    setSelectedVerse(1);
                  }}
                  className="bg-slate-900 text-white text-xs p-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
                >
                  {availableChapters.map((c) => (
                    <option key={c} value={c}>
                      Pasal {c}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedVerse}
                  onChange={(e) => setSelectedVerse(Number(e.target.value))}
                  className="bg-slate-900 text-white text-xs p-2 rounded-xl border border-slate-700 outline-none cursor-pointer"
                >
                  {availableVerses.map((v) => (
                    <option key={v} value={v}>
                      Ayat {v}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview Verse & Add */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-400 mb-0.5">
                    {selectedBook} {selectedChapter}:{selectedVerse}
                  </p>
                  <p className="text-[11px] text-slate-300 italic line-clamp-2">
                    {bibleData.find(
                      (v) => v.book === selectedBook && v.chapter === selectedChapter && v.verse === selectedVerse
                    )?.text || 'Pilih ayat di atas...'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const verse = bibleData.find(
                      (v) => v.book === selectedBook && v.chapter === selectedChapter && v.verse === selectedVerse
                    );
                    if (verse) {
                      handleAddVerseToSetlist(verse);
                      setIsControlOpen(false); // Hide panel so screen is clean!
                    }
                  }}
                  className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow shrink-0"
                >
                  Tampilkan Ayat Langsung
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: LATAR BELAKANG & FORMAT */}
          {activeTab === 'THEME' && (
            <div className="space-y-4">
              {/* Top Controls: Add Button & Filter Pills */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Latar Belakang & Media Output</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-mono">
                        {customMediaList.length + bgPresets.length} Media
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Gunakan Gambar, Video Loop, atau Animasi HTML (Salib 3D) yang tersimpan lokal
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowInlineBgStudio((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        showInlineBgStudio
                          ? 'bg-amber-500 text-black border-amber-400 shadow-sm font-black'
                          : isBgFxActive
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      }`}
                      title="Atur Kecepatan, Warna (Hue), Kecerahan & Blur Background"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{showInlineBgStudio ? 'Tutup Efek' : 'Efek & Warna'}</span>
                      {isBgFxActive && !showInlineBgStudio && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAddBgModalOpen(true)}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/30 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Media / Kode HTML</span>
                    </button>
                  </div>
                </div>

                {/* Quick Banner to Studio Komposisi 2 Latar */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-slate-900 border border-rose-500/30 flex items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        Gabungkan Foto Still Altar + Animasi Bergerak (Chroma Key & Layer)
                      </p>
                      <p className="text-[10px] text-slate-300 truncate">
                        Hapus background hitam/hijau animasi HTML dan pasang foto still sebagai latar belakang.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('STUDIO')}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shrink-0 shadow-lg shadow-rose-900/40 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Buka Studio Komposisi →</span>
                  </button>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                  {[
                    { id: 'ALL', label: 'Semua Media', icon: Sparkles },
                    { id: 'COMPOSITE', label: 'Komposisi 2 Latar', icon: Layers },
                    { id: 'HTML', label: 'HTML Animasi (Salib 3D)', icon: Code },
                    { id: 'VIDEO', label: 'Video Loop', icon: Video },
                    { id: 'IMAGE', label: 'Gambar', icon: ImageIcon },
                    { id: 'GRADIENT', label: 'Gradien Warna', icon: Palette },
                  ].map((filter) => {
                    const IconComp = filter.icon;
                    const isActive = mediaFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setMediaFilter(filter.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-black shadow-md font-black'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        <IconComp className="w-3 h-3" />
                        <span>{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Inline Studio Pengaturan Kecepatan & Warna Background */}
                {showInlineBgStudio && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <BackgroundEffectsControl
                      bgFx={displayState.bgFx || DEFAULT_BG_FX}
                      onChange={handleUpdateBgFx}
                      onReset={handleResetBgFx}
                      activeSongTitle={activeSong?.title}
                      onApplyToAllSongs={handleApplyBgToAllSongs}
                      totalSetlistSongs={songSetlist.length}
                    />
                  </div>
                )}

                {/* Active Song Attachment Banner */}
                {activeSong ? (
                  <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                      <span className="text-slate-300">Menempel pada lagu aktif:</span>
                      <span className="font-extrabold text-amber-300 truncate max-w-[200px] sm:max-w-xs">
                        "{activeSong.title}"
                      </span>
                    </div>
                    {songSetlist.length > 1 && (
                      <button
                        type="button"
                        onClick={handleApplyBgToAllSongs}
                        className="text-[11px] font-bold text-indigo-300 hover:text-white bg-indigo-900/60 hover:bg-indigo-800 px-2.5 py-1 rounded-lg border border-indigo-700/60 transition cursor-pointer shrink-0"
                        title="Terapkan background dan warna ini ke semua lagu di setlist"
                      >
                        Terapkan ke Semua ({songSetlist.length} Lagu)
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                    💡 Pilih lagu dari Setlist atau Pustaka Lagu untuk menempelkan background & warna khusus per lagu.
                  </div>
                )}
              </div>

              {/* Media Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[38vh] overflow-y-auto pr-1">
                {/* 1. Custom Media (HTML, Video, Images, Composite) */}
                {customMediaList
                  .filter((item) => {
                    if (mediaFilter === 'ALL') return true;
                    if (mediaFilter === 'COMPOSITE' && item.type === 'composite') return true;
                    if (mediaFilter === 'HTML' && item.type === 'html') return true;
                    if (mediaFilter === 'VIDEO' && item.type === 'video') return true;
                    if (mediaFilter === 'IMAGE' && item.type === 'image') return true;
                    return false;
                  })
                  .map((item) => {
                    const isSelected = displayState.bgSelector === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleChangeBg(item.id)}
                        className={`group relative rounded-xl border overflow-hidden cursor-pointer transition flex flex-col justify-between h-28 bg-slate-950 ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Background Thumbnail */}
                        <div className="absolute inset-0 pointer-events-none opacity-80 group-hover:opacity-100 transition">
                          {item.type === 'image' && (
                            <img
                              src={item.data}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {item.type === 'video' && (
                            <video
                              src={item.data}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          )}
                          {(item.type === 'html' || item.type === 'composite') && (
                            <AnimatedBgThumbnail
                              id={item.id}
                              name={item.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* Top Badge & Delete Button */}
                        <div className="relative z-10 p-2 flex items-center justify-between">
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider backdrop-blur-md shadow flex items-center gap-1 ${
                              item.type === 'composite'
                                ? 'bg-rose-600/90 text-white'
                                : item.type === 'html'
                                ? 'bg-amber-500/90 text-black'
                                : item.type === 'video'
                                ? 'bg-purple-600/90 text-white'
                                : 'bg-emerald-600/90 text-white'
                            }`}
                          >
                            {item.type === 'composite' && <Layers className="w-2.5 h-2.5" />}
                            {item.type === 'html' && <Code className="w-2.5 h-2.5" />}
                            {item.type === 'video' && <Video className="w-2.5 h-2.5" />}
                            {item.type === 'image' && <ImageIcon className="w-2.5 h-2.5" />}
                            <span>{item.type === 'composite' ? 'KOMPOSISI' : item.type}</span>
                          </span>

                          {!DEFAULT_HTML_BG_IDS.includes(item.id) && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteCustomMedia(item.id, e)}
                              className="p-1 rounded-md bg-black/60 hover:bg-rose-600 text-slate-400 hover:text-white transition opacity-0 group-hover:opacity-100 cursor-pointer shadow"
                              title="Hapus Media Ini"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {/* Bottom Label */}
                        <div className="relative z-10 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                          <p className="text-xs font-bold text-white truncate drop-shadow">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-amber-300 font-mono truncate">
                            {isSelected ? '● SEDANG AKTIF' : 'Klik untuk gunakan'}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                {/* 2. Built-in Gradients & Ambient Animations */}
                {(mediaFilter === 'ALL' || mediaFilter === 'GRADIENT') &&
                  bgPresets.map((preset) => {
                    const isSelected = displayState.bgSelector === preset.id;
                    const isAnim = preset.id.startsWith('anim-');
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleChangeBg(preset.id)}
                        className={`group relative rounded-xl border overflow-hidden cursor-pointer transition flex flex-col justify-between h-28 bg-slate-950 ${
                          isSelected
                            ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                            : 'border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="absolute inset-0 pointer-events-none opacity-85 group-hover:opacity-100 transition">
                          {isAnim ? (
                            <AnimatedBgThumbnail
                              id={preset.id}
                              name={preset.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${preset.color}`} />
                          )}
                        </div>
                        <div className="relative z-10 p-2 flex items-center justify-between">
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider bg-slate-900/80 text-slate-300 backdrop-blur-md shadow">
                            {isAnim ? 'ANIMASI' : 'GRADIEN'}
                          </span>
                        </div>
                        <div className="relative z-10 p-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                          <p className="text-xs font-bold text-white truncate drop-shadow">{preset.name}</p>
                          <p className="text-[10px] text-slate-300 truncate">{preset.desc}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Font Size, Translation Percentage, & Display Mode */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Ukuran Font Lirik Utama */}
                  <div className="flex flex-col justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300 font-semibold">Font Lirik Utama</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{displayState.fontSize}vw</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleChangeFontSize(-0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer active:scale-95 transition"
                        title="Perkecil Font Utama (-0.5vw)"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeFontSize(0.5)}
                        className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center cursor-pointer active:scale-95 transition"
                        title="Perbesar Font Utama (+0.5vw)"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 2. Ukuran Font Terjemahan (% dari Lirik) */}
                  <div className="flex flex-col justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5 text-amber-400" />
                        <span>Font Arti (%)</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {displayState.translationPercent || 40}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleChangeTranslationPercent(-5)}
                        className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold flex items-center justify-center cursor-pointer active:scale-95 transition text-xs"
                        title="Perkecil Persentase Terjemahan (-5%)"
                      >
                        -5%
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeTranslationPercent(5)}
                        className="flex-1 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold flex items-center justify-center cursor-pointer active:scale-95 transition text-xs"
                        title="Perbesar Persentase Terjemahan (+5%)"
                      >
                        +5%
                      </button>
                    </div>
                  </div>

                  {/* 3. Format Posisi */}
                  <div className="flex flex-col justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300 font-semibold">Format Posisi</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleDisplayMode}
                      className="w-full py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold rounded-lg cursor-pointer transition active:scale-95 text-center"
                    >
                      {displayState.displayMode === 'lowerThird' ? 'Lower Third (OBS)' : 'Tengah Layar'}
                    </button>
                  </div>
                </div>

                {/* Quick Presets for Translation Scaling */}
                <div className="flex items-center justify-between gap-1.5 px-3 py-2 bg-slate-950/80 rounded-xl border border-slate-800 text-xs flex-wrap">
                  <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                    <span className="font-bold text-amber-300">Preset Skala Terjemahan:</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {[
                      { label: '35% (Kecil)', val: 35 },
                      { label: '40% (Standar)', val: 40 },
                      { label: '50% (Sedang)', val: 50 },
                      { label: '65% (Ibadah Lansia)', val: 65 },
                      { label: '75% (Ekstra Besar)', val: 75 },
                    ].map((preset) => {
                      const isSel = (displayState.translationPercent || 40) === preset.val;
                      return (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => handleChangeTranslationPercent(preset.val, true)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition cursor-pointer active:scale-95 ${
                            isSel
                              ? 'bg-amber-500 text-black border-amber-400 shadow font-black'
                              : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Running Ticker */}
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Pengumuman Teks Berjalan</span>
                  <button
                    type="button"
                    onClick={handleToggleTicker}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer ${
                      displayState.ticker.visible ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {displayState.ticker.visible ? 'AKTIF' : 'NONAKTIF'}
                  </button>
                </div>
                <input
                  type="text"
                  value={tickerInput}
                  onChange={(e) => {
                    setTickerInput(e.target.value);
                    handleUpdateTickerText(e.target.value);
                  }}
                  placeholder="Ketik pengumuman..."
                  className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB: STUDIO KOMPOSISI & EFEK (2-LAYER MIXER + CHROMA KEY + BG FX) */}
          {activeTab === 'STUDIO' && (
            <BackgroundStudioTab
              displayState={displayState}
              customMediaList={customMediaList}
              customDataSlots={customDataSlots}
              activeSongTitle={activeSong?.title}
              totalSetlistSongs={songSetlist.length}
              onApplyCompositeToLive={handleApplyCompositeToLive}
              onSaveAsNewBackground={handleSaveAsNewBackground}
              onApplyToActiveSong={handleApplyCompositeToActiveSong}
              onUpdateBgFx={handleUpdateBgFx}
              onApplyBgToAllSongs={handleApplyBgToAllSongs}
              onResetBgFx={handleResetBgFx}
              onUploadImage={handleUploadImageFromStudio}
            />
          )}

          {/* TAB 5: TIMER IBADAH (COUNTDOWN / STOPWATCH OVERLAY) */}
          {activeTab === 'TIMER' && (
            <WorshipTimerControl
              timer={displayState.timer || DEFAULT_WORSHIP_TIMER}
              onUpdateTimer={handleUpdateTimer}
              onToggleTimerOverlay={handleToggleTimerOverlay}
            />
          )}

          {/* TAB 6: ALAT & PENGATURAN */}
          {activeTab === 'SETTINGS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Timer Quick Card in Settings */}
              <button
                type="button"
                onClick={() => setActiveTab('TIMER')}
                className="p-3 rounded-xl border border-amber-800/60 bg-amber-950/40 hover:bg-amber-900/50 text-left flex items-center justify-between cursor-pointer sm:col-span-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-amber-300">Timer Ibadah & Khotbah (Countdown / Stopwatch)</p>
                    {displayState.timer?.visible && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono font-bold">
                        LIVE DI PROYEKTOR
                      </span>
                    )}
                    {displayState.timer?.isRunning && !displayState.timer?.visible && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                        SEDANG BERJALAN
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-amber-400/80">
                    Buka panel kontrol durasi khotbah, preset 45m/30m/25m, dan overlay panggung
                  </p>
                </div>
                <Clock className="w-5 h-5 text-amber-400" />
              </button>
              {/* Google Sheet Sync Card */}
              <button
                type="button"
                onClick={() => setIsSheetSyncModalOpen(true)}
                className="p-3 rounded-xl border border-indigo-800/60 bg-indigo-950/40 hover:bg-indigo-900/50 text-left flex items-center justify-between cursor-pointer sm:col-span-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-indigo-300">
                      Sinkronisasi Lagu Google Sheet (Cloud Sync)
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold">
                      SIAP SYNC
                    </span>
                  </div>
                  <p className="text-[10px] text-indigo-400/80">
                    Tarik 113+ lirik lagu gereja otomatis dari spreadsheet. Versi kustom lokal Anda tetap aman tidak tertimpa.
                  </p>
                </div>
                <FileSpreadsheet className="w-5 h-5 text-indigo-400 shrink-0" />
              </button>

              {/* Anti-Panas & Mode Dingin (Hemat Daya / Eco Mode) */}
              <div className="p-3.5 rounded-xl border border-cyan-800/60 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 space-y-2 sm:col-span-2 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Snowflake className="w-4 h-4 text-cyan-400" />
                        <span>Mode Dingin & Anti-Panas (Eco Mode)</span>
                      </p>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          ecoMode
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {ecoMode ? '❄️ AKTIF (ADEM)' : '⚡ PERFORMA PENUH'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed max-w-xl">
                      Mencegah HP Android cepat panas saat ibadah dengan membatasi FPS animasi di 30 FPS, mem-pause render animasi saat menu kontrol dibuka, dan otomatis menghentikan GPU saat layar HP mati/terkunci.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <button
                      type="button"
                      onClick={() => !ecoMode && handleToggleEcoMode()}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        ecoMode
                          ? 'bg-cyan-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Snowflake className="w-3.5 h-3.5" />
                      <span>Dingin (Hemat)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => ecoMode && handleToggleEcoMode()}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        !ecoMode
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Penuh</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Swipe Gesture Behavior Selector */}
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900 space-y-2 sm:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Mode Usap Layar (Swipe HP/Tablet)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                        {swipeMode === 'shortcuts' ? 'Pintasan (Black/Clear)' : 'Navigasi Slide'}
                      </span>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Tentukan aksi saat mengusap layar proyektor mirror di HP
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleSwipeMode('shortcuts')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        swipeMode === 'shortcuts'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pintasan (Black/Clear)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleSwipeMode('slide')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        swipeMode === 'slide'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Navigasi (Next/Prev)
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleWakeLock}
                className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition ${
                  isWakeLockActive ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div>
                  <p className="text-xs font-bold">Layar Selalu Aktif (Wake Lock)</p>
                  <p className="text-[10px] text-slate-400">Cegah layar HP padam saat ibadah</p>
                </div>
                <Sun className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold">Mode Fullscreen</p>
                  <p className="text-[10px] text-slate-400">Tampilkan penuh di layar proyektor</p>
                </div>
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsShortcutsModalOpen(true)}
                className="p-3 rounded-xl border border-amber-800/60 bg-amber-950/40 hover:bg-amber-900/50 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-amber-300">Panduan Pintasan Keyboard & Gestur</p>
                  <p className="text-[10px] text-amber-400/80">Space/Panah, B (Black), C (Clear), M (Menu), F (Fullscreen)</p>
                </div>
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={handleOpenMultiScreen}
                className="p-3 rounded-xl border border-purple-800/60 bg-purple-950/40 hover:bg-purple-900/50 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-purple-300">Buka Tab Layar Proyektor Terpisah</p>
                  <p className="text-[10px] text-purple-400/80">Untuk Laptop/PC dengan 2 monitor</p>
                </div>
                <Tv className="w-5 h-5 text-purple-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsBibleImportModalOpen(true)}
                className="p-3 rounded-xl border border-blue-800/60 bg-blue-950/40 hover:bg-blue-900/50 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-blue-300">Import Alkitab CSV</p>
                  <p className="text-[10px] text-blue-400/80">Simpan database ayat lengkap secara offline</p>
                </div>
                <FileSpreadsheet className="w-5 h-5 text-blue-400" />
              </button>

              <button
                type="button"
                onClick={() => setIsSetlistModalOpen(true)}
                className="p-3 rounded-xl border border-indigo-800/60 bg-indigo-950/40 hover:bg-indigo-900/50 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-indigo-300">Kelola Setlist Ibadah (Preset Lokal)</p>
                  <p className="text-[10px] text-indigo-400/80">Simpan preset, ganti jadwal ibadah & backup .json</p>
                </div>
                <FolderOpen className="w-5 h-5 text-indigo-400" />
              </button>

              <button
                type="button"
                onClick={handleExportSongsJSON}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-left flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-white">Cadangkan Lagu (Export JSON)</p>
                  <p className="text-[10px] text-slate-400">Download file backup database lagu</p>
                </div>
                <Download className="w-5 h-5" />
              </button>

              <label className="p-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 text-left flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-white">Pulihkan Lagu (Import JSON)</p>
                  <p className="text-[10px] text-slate-400">Unggah file backup lagu</p>
                </div>
                <Upload className="w-5 h-5" />
                <input type="file" accept=".json" onChange={handleImportSongsJSON} className="hidden" />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL DIALOGS                                                  */}
      {/* ============================================================== */}
      <SongModal
        isOpen={isSongModalOpen}
        onClose={() => setIsSongModalOpen(false)}
        onSave={handleSaveSong}
        songToEdit={songToEdit}
        customMediaList={customMediaList}
        bgPresets={bgPresets}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (songToDelete) {
            handleDeleteSong(songToDelete.id);
            setIsDeleteModalOpen(false);
            setSongToDelete(null);
          }
        }}
        title={songToDelete?.title || ''}
      />

      <BibleImportModal
        isOpen={isBibleImportModalOpen}
        onClose={() => setIsBibleImportModalOpen(false)}
        onFileSelect={handleBibleCsvImport}
      />

      <ShortcutsGuideModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <AddBackgroundModal
        isOpen={isAddBgModalOpen}
        onClose={() => setIsAddBgModalOpen(false)}
        onSaveMedia={handleSaveCustomMedia}
      />

      <SetlistModal
        isOpen={isSetlistModalOpen}
        onClose={() => setIsSetlistModalOpen(false)}
        savedSetlists={savedSetlists}
        activeSetlistId={activeSetlistId}
        currentSongs={songSetlist}
        currentBibleVerses={bibleSetlist}
        onLoadSetlist={handleLoadSetlist}
        onSaveCurrentSetlist={handleSaveCurrentSetlist}
        onDeleteSetlist={handleDeleteSetlist}
        onImportSetlistJSON={handleImportSetlistJSON}
        onExportSetlistJSON={handleExportSetlistJSON}
      />

      <GoogleSheetSyncModal
        isOpen={isSheetSyncModalOpen}
        onClose={() => setIsSheetSyncModalOpen(false)}
        onSyncComplete={handleSyncGoogleSheet}
        totalLocalSongs={songs.length}
      />

      <BackgroundEffectsModal
        isOpen={isBgEffectsModalOpen}
        onClose={() => setIsBgEffectsModalOpen(false)}
        bgFx={displayState.bgFx || DEFAULT_BG_FX}
        onChange={handleUpdateBgFx}
        onReset={handleResetBgFx}
        activeSongTitle={activeSong?.title}
        onApplyToAllSongs={handleApplyBgToAllSongs}
        totalSetlistSongs={songSetlist.length}
      />
    </div>
  );
}
