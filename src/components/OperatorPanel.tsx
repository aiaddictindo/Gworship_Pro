import React, { useState, useMemo } from 'react';
import {
  Song,
  BibleVerse,
  DisplayState,
  SlideItem,
  GradientSlot,
} from '../types';
import {
  BookOpen,
  Download,
  FileSpreadsheet,
  HelpCircle,
  Maximize,
  Minimize,
  Music,
  Plus,
  Search,
  Sun,
  Trash2,
  Tv,
  Upload,
  Edit,
  ArrowUp,
  ArrowDown,
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  ListOrdered,
  MonitorPlay,
  Type,
  Radio,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { LiveScreen } from './LiveScreen';
import { formatLyricsWithTranslations } from '../utils/lyricsFormatter';

interface OperatorPanelProps {
  currentTab: 'LAGU' | 'ALKITAB' | 'TAMPILAN';
  onSwitchTab: (tab: 'LAGU' | 'ALKITAB' | 'TAMPILAN') => void;
  activeContentType: 'SONG' | 'BIBLE';
  displayState: DisplayState;

  // Songs
  songs: Song[];
  songSetlist: Song[];
  currentSongIndex: number;
  currentSlides: SlideItem[];
  currentSlideIndex: number;
  onSelectSong: (index: number) => void;
  onGoToSlide: (index: number) => void;
  onAddToSetlist: (song: Song) => void;
  onMoveSongUp: (index: number) => void;
  onMoveSongDown: (index: number) => void;
  onRemoveFromSetlist: (index: number) => void;
  onOpenAddSongModal: () => void;
  onOpenEditSongModal: () => void;
  onOpenDeleteSongModal: () => void;
  onExportSongsJSON: () => void;
  onImportSongsJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSyncCloud: () => void;
  isSyncing: boolean;

  // Bible
  bibleData: BibleVerse[];
  bibleSetlist: BibleVerse[];
  currentBibleIndex: number;
  bibleStatusText: string;
  onSelectBibleVerse: (index: number) => void;
  onAddVerseToSetlist: (verse: BibleVerse) => void;
  onFastBibleSearch: (query: string) => void;
  onMoveBibleUp: (index: number) => void;
  onMoveBibleDown: (index: number) => void;
  onRemoveBibleFromSetlist: (index: number) => void;
  onOpenBibleImportModal: () => void;

  // Controls & Screen
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onToggleClear: () => void;
  onToggleBlack: () => void;
  onToggleTicker: () => void;
  onUpdateTickerText: (text: string) => void;
  tickerInput: string;
  setTickerInput: (text: string) => void;
  onChangeFontSize: (delta: number) => void;
  onOpenMultiScreen: () => void;
  onToggleWakeLock: () => void;
  isWakeLockActive: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onOpenShortcutsModal: () => void;

  // Background & Overlays
  currentBgSelector: string;
  onChangeBg: (selector: string) => void;
  customDataSlots: Record<string, string>;
  gradientSlots: Record<string, GradientSlot>;
  onUpdateGradient: (slot: string, c1: string, c2: string) => void;
  onUploadBgFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  overlays: { logo: string; intro: string; outro: string };
  onToggleOverlay: (type: 'logo' | 'intro' | 'outro') => void;
  onUploadOverlayFile: (type: 'logo' | 'intro' | 'outro', e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleDisplayMode?: () => void;
}

export const OperatorPanel: React.FC<OperatorPanelProps> = ({
  currentTab,
  onSwitchTab,
  activeContentType,
  displayState,
  songs,
  songSetlist,
  currentSongIndex,
  currentSlides,
  currentSlideIndex,
  onSelectSong,
  onGoToSlide,
  onAddToSetlist,
  onMoveSongUp,
  onMoveSongDown,
  onRemoveFromSetlist,
  onOpenAddSongModal,
  onOpenEditSongModal,
  onOpenDeleteSongModal,
  onExportSongsJSON,
  onImportSongsJSON,
  onSyncCloud,
  isSyncing,
  bibleData,
  bibleSetlist,
  currentBibleIndex,
  bibleStatusText,
  onSelectBibleVerse,
  onAddVerseToSetlist,
  onFastBibleSearch,
  onMoveBibleUp,
  onMoveBibleDown,
  onRemoveBibleFromSetlist,
  onOpenBibleImportModal,
  onNextSlide,
  onPrevSlide,
  onToggleClear,
  onToggleBlack,
  onToggleTicker,
  onUpdateTickerText,
  tickerInput,
  setTickerInput,
  onChangeFontSize,
  onOpenMultiScreen,
  onToggleWakeLock,
  isWakeLockActive,
  onToggleFullscreen,
  isFullscreen,
  onOpenShortcutsModal,
  currentBgSelector,
  onChangeBg,
  customDataSlots,
  gradientSlots,
  onUpdateGradient,
  onUploadBgFile,
  overlays,
  onToggleOverlay,
  onUploadOverlayFile,
  onToggleDisplayMode,
}) => {
  // Navigation & Sub-views
  const [librarySection, setLibrarySection] = useState<'SETLIST' | 'SONGS' | 'BIBLE'>('SETLIST');
  const [songSearch, setSongSearch] = useState('');
  const [songCategoryFilter, setSongCategoryFilter] = useState('ALL');
  const [fastBibleInput, setFastBibleInput] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'WORKSPACE' | 'SLIDES' | 'MONITOR'>('WORKSPACE');

  // Filter songs
  const filteredSongs = useMemo(() => {
    return songs.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(songSearch.toLowerCase()) ||
        s.lyrics.toLowerCase().includes(songSearch.toLowerCase());
      const matchCat =
        songCategoryFilter === 'ALL' ||
        (s.category && s.category.toLowerCase().includes(songCategoryFilter.toLowerCase()));
      return matchSearch && matchCat;
    });
  }, [songs, songSearch, songCategoryFilter]);

  // Bible books
  const bibleBooks = useMemo(() => {
    return Array.from(new Set(bibleData.map((v) => v.book)));
  }, [bibleData]);

  React.useEffect(() => {
    if (bibleBooks.length > 0 && !selectedBook) {
      setSelectedBook(bibleBooks[0]);
    }
  }, [bibleBooks, selectedBook]);

  const availableChapters = useMemo(() => {
    if (!selectedBook) return [1];
    const chaps = Array.from(
      new Set(bibleData.filter((v) => v.book === selectedBook).map((v) => v.chapter))
    ).sort((a, b) => a - b);
    return chaps.length > 0 ? chaps : [1];
  }, [bibleData, selectedBook]);

  const availableVerses = useMemo(() => {
    if (!selectedBook) return [1];
    const verses = Array.from(
      new Set(
        bibleData
          .filter((v) => v.book === selectedBook && v.chapter === selectedChapter)
          .map((v) => v.verse)
      )
    ).sort((a, b) => a - b);
    return verses.length > 0 ? verses : [1];
  }, [bibleData, selectedBook, selectedChapter]);

  const handleFastSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && fastBibleInput.trim()) {
      onFastBibleSearch(fastBibleInput.trim());
      setFastBibleInput('');
    }
  };

  const handleAddDirectVerse = () => {
    const verse = bibleData.find(
      (v) =>
        v.book === selectedBook &&
        v.chapter === selectedChapter &&
        v.verse === selectedVerse
    );
    if (verse) {
      onAddVerseToSetlist(verse);
    }
  };

  // Preset background list
  const bgPresets = [
    { id: 'anim-cross', name: 'Salib Bercahaya', desc: 'Cross Glow Animation', color: 'from-amber-600/30 to-amber-950/50' },
    { id: 'anim-stars', name: 'Taburan Bintang', desc: 'Starry Twinkle Cosmos', color: 'from-blue-900/40 to-slate-950' },
    { id: 'grad-1', name: 'Deep Midnight', desc: 'Calm Worship Gradient', color: 'from-slate-900 to-cyan-950' },
    { id: 'grad-4', name: 'Royal Violet', desc: 'Majestic Purple Atmosphere', color: 'from-purple-900 to-indigo-950' },
    { id: 'grad-5', name: 'Emerald Grace', desc: 'Hope & Life Green', color: 'from-emerald-900 to-teal-950' },
    { id: 'grad-6', name: 'Sunrise Praise', desc: 'Warm Radiant Glow', color: 'from-rose-900 to-amber-950' },
  ];

  return (
    <div className="w-full h-full bg-slate-950 text-slate-100 flex flex-col overflow-hidden select-text font-sans">
      {/* ============================================================== */}
      {/* 1. MASTER WORKSTATION HEADER                                   */}
      {/* ============================================================== */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between gap-2 shrink-0 z-20 shadow-md">
        {/* Logo & Online Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent truncate">
                GWORSHIP <span className="text-amber-400 font-extrabold text-xs">PRO</span>
              </h1>
              <span className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                OFFLINE READY
              </span>
            </div>
          </div>
        </div>

        {/* Master Output Control Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Black Screen Master Toggle */}
          <button
            type="button"
            onClick={onToggleBlack}
            className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border shadow ${
              displayState.isBlack
                ? 'bg-rose-600 text-white border-rose-400 shadow-rose-600/30 ring-2 ring-rose-400/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Layar Hitam Total (Pintasan B)"
          >
            <span className={`w-2 h-2 rounded-full ${displayState.isBlack ? 'bg-white' : 'bg-rose-500'}`} />
            <span>{displayState.isBlack ? 'BLACK ON' : 'BLACK (B)'}</span>
          </button>

          {/* Clear Text Master Toggle */}
          <button
            type="button"
            onClick={onToggleClear}
            className={`px-3 py-1.5 rounded-lg text-xs font-black tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border shadow ${
              displayState.isCleared
                ? 'bg-amber-600 text-white border-amber-400 shadow-amber-600/30 ring-2 ring-amber-400/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Hapus Lirik / Ayat (Pintasan C)"
          >
            <span className={`w-2 h-2 rounded-full ${displayState.isCleared ? 'bg-white' : 'bg-amber-400'}`} />
            <span>{displayState.isCleared ? 'TEKS OFF' : 'CLEAR (C)'}</span>
          </button>

          {/* Multi-screen Projector Output Window */}
          <button
            type="button"
            onClick={onOpenMultiScreen}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-purple-900/30 border border-purple-400/30 transition cursor-pointer"
            title="Buka Jendela Layar Proyektor Eksternal (Pintasan D)"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Layar Output</span>
          </button>

          {/* Always On (Wake Lock) */}
          <button
            type="button"
            onClick={onToggleWakeLock}
            className={`p-2 rounded-lg border text-xs transition cursor-pointer ${
              isWakeLockActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-inner'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={isWakeLockActive ? 'Layar Selalu Aktif: Hidup' : 'Layar Selalu Aktif: Mati'}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 cursor-pointer hidden md:flex"
            title="Layar Penuh (F)"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>

          {/* Shortcuts Help */}
          <button
            type="button"
            onClick={onOpenShortcutsModal}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-amber-400 cursor-pointer"
            title="Daftar Tombol Pintasan (Hotkeys)"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          <PWAInstallButton />
        </div>
      </header>

      {/* Mobile view switcher tab bar */}
      <div className="flex md:hidden bg-slate-900 border-b border-slate-800 px-2 py-1.5 gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('WORKSPACE')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
            mobileTab === 'WORKSPACE' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Urutan & Koleksi
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('SLIDES')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
            mobileTab === 'SLIDES' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Matriks Slide ({currentSlides.length})
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('MONITOR')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
            mobileTab === 'MONITOR' ? 'bg-indigo-600 text-white' : 'text-slate-400'
          }`}
        >
          Monitor & Latar
        </button>
      </div>

      {/* ============================================================== */}
      {/* 2. THREE-PANEL STUDIO PRO WORKSPACE (DESKTOP)                  */}
      {/* ============================================================== */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* ------------------------------------------------------------ */}
        {/* LEFT PANEL: URUTAN IBADAH (SETLIST) & LIBRARY               */}
        {/* ------------------------------------------------------------ */}
        <aside
          className={`w-full md:w-80 lg:w-96 bg-slate-900/95 border-r border-slate-800 flex flex-col shrink-0 overflow-hidden ${
            mobileTab === 'WORKSPACE' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Sub Navigation: Setlist | Semua Lagu | Alkitab */}
          <div className="p-2.5 bg-slate-950/70 border-b border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLibrarySection('SETLIST')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                librarySection === 'SETLIST'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Setlist ({songSetlist.length + bibleSetlist.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setLibrarySection('SONGS')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                librarySection === 'SONGS'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Lagu ({songs.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setLibrarySection('BIBLE')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                librarySection === 'BIBLE'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Alkitab</span>
            </button>
          </div>

          {/* Section Body */}
          <div className="flex-1 flex flex-col overflow-hidden p-3 min-h-0">
            {/* SUB-TAB 1: SETLIST IBADAH */}
            {librarySection === 'SETLIST' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Jadwal Ibadah Hari Ini
                  </span>
                  <span className="text-[10px] text-slate-400">Klik item untuk mulai</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                  {songSetlist.length === 0 && bibleSetlist.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                      <Music className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                      Setlist masih kosong. Buka tab <strong>"Lagu"</strong> atau <strong>"Alkitab"</strong> lalu pilih item untuk ditambahkan ke jadwal ibadah.
                    </div>
                  ) : (
                    <>
                      {/* Songs in Setlist */}
                      {songSetlist.map((song, idx) => {
                        const isActive = idx === currentSongIndex && activeContentType === 'SONG';
                        return (
                          <div
                            key={`song-setlist-${song.id}-${idx}`}
                            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                              isActive
                                ? 'bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/50'
                                : 'bg-slate-850/80 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                onSelectSong(idx);
                                if (window.innerWidth < 768) setMobileTab('SLIDES');
                              }}
                              className="flex items-center gap-2 overflow-hidden flex-1 text-left cursor-pointer mr-2 py-0.5"
                            >
                              <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                                  {song.title}
                                </p>
                                <p className="text-[10px] text-slate-400 flex items-center gap-2">
                                  <span>Lagu Pujian</span>
                                  {song.key && <span className="text-amber-400 font-semibold">{song.key}</span>}
                                </p>
                              </div>
                            </button>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => onMoveSongUp(idx)}
                                disabled={idx === 0}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Geser Naik"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onMoveSongDown(idx)}
                                disabled={idx === songSetlist.length - 1}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Geser Turun"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onRemoveFromSetlist(idx)}
                                className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer ml-1"
                                title="Hapus dari Setlist"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Bible in Setlist */}
                      {bibleSetlist.map((verse, idx) => {
                        const isActive = idx === currentBibleIndex && activeContentType === 'BIBLE';
                        return (
                          <div
                            key={`bible-setlist-${verse.id}-${idx}`}
                            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                              isActive
                                ? 'bg-amber-950/80 border-amber-500 shadow-md shadow-amber-950/50'
                                : 'bg-slate-850/80 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                onSelectBibleVerse(idx);
                                if (window.innerWidth < 768) setMobileTab('SLIDES');
                              }}
                              className="flex items-center gap-2 overflow-hidden flex-1 text-left cursor-pointer mr-2 py-0.5"
                            >
                              <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                                📖
                              </span>
                              <div className="min-w-0">
                                <p className={`text-xs font-bold truncate ${isActive ? 'text-amber-300' : 'text-slate-200'}`}>
                                  {verse.book} {verse.chapter}:{verse.verse}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {verse.text}
                                </p>
                              </div>
                            </button>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => onMoveBibleUp(idx)}
                                disabled={idx === 0}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Geser Naik"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onMoveBibleDown(idx)}
                                disabled={idx === bibleSetlist.length - 1}
                                className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                                title="Geser Turun"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onRemoveBibleFromSetlist(idx)}
                                className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer ml-1"
                                title="Hapus dari Setlist"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 2: DATABASE LAGU */}
            {librarySection === 'SONGS' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search Bar & Add Button */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={songSearch}
                      onChange={(e) => setSongSearch(e.target.value)}
                      placeholder="Cari judul atau lirik lagu..."
                      className="w-full bg-slate-950 text-white text-xs pl-8 pr-2.5 py-2 rounded-lg border border-slate-700 outline-none focus:border-indigo-500"
                    />
                    {songSearch && (
                      <button
                        type="button"
                        onClick={() => setSongSearch('')}
                        className="absolute right-2.5 top-2 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={onOpenAddSongModal}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-2.5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1 shadow shrink-0"
                    title="Buat Lagu Baru"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Baru</span>
                  </button>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 shrink-0">
                  {['ALL', 'Praise', 'Worship', 'Hymn'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSongCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition shrink-0 cursor-pointer ${
                        songCategoryFilter === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat === 'ALL' ? 'Semua' : cat}
                    </button>
                  ))}
                </div>

                {/* Song List */}
                <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                  {filteredSongs.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-xs italic">
                      Lagu tidak ditemukan. Klik "+ Baru" untuk menambahkan.
                    </div>
                  ) : (
                    filteredSongs.map((song) => (
                      <div
                        key={song.id}
                        className="p-2.5 rounded-xl bg-slate-850/80 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-200 truncate">{song.title}</p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {song.category || 'Praise & Worship'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onAddToSetlist(song);
                          }}
                          className="px-2.5 py-1 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1 shrink-0 cursor-pointer shadow"
                          title="Tambahkan ke Setlist Ibadah"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Setlist</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom Song Tools */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onExportSongsJSON}
                      className="hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Backup JSON</span>
                    </button>
                    <label className="hover:text-white flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3 h-3" />
                      <span>Import</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={onImportSongsJSON}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span>{songs.length} Lagu</span>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: ALKITAB DIGITAL */}
            {librarySection === 'BIBLE' && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Fast Bible Search Input */}
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-amber-400" />
                  <input
                    type="text"
                    value={fastBibleInput}
                    onChange={(e) => setFastBibleInput(e.target.value)}
                    onKeyDown={handleFastSearchKeyDown}
                    placeholder="Ketik ayat lalu tekan Enter (mis: Yoh 3:16)"
                    className="w-full bg-slate-950 text-white text-xs pl-8 pr-16 py-2 rounded-lg border border-slate-700 outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (fastBibleInput.trim()) {
                        onFastBibleSearch(fastBibleInput.trim());
                        setFastBibleInput('');
                      }
                    }}
                    className="absolute right-1.5 top-1.5 px-2 py-0.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-[10px] font-bold cursor-pointer"
                  >
                    Cari
                  </button>
                </div>

                {/* Dropdowns Kitab, Pasal, Ayat */}
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  <select
                    value={selectedBook}
                    onChange={(e) => {
                      setSelectedBook(e.target.value);
                      setSelectedChapter(1);
                      setSelectedVerse(1);
                    }}
                    className="bg-slate-950 text-white text-[11px] p-1.5 rounded-lg border border-slate-700 outline-none"
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
                    className="bg-slate-950 text-white text-[11px] p-1.5 rounded-lg border border-slate-700 outline-none"
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
                    className="bg-slate-950 text-white text-[11px] p-1.5 rounded-lg border border-slate-700 outline-none"
                  >
                    {availableVerses.map((v) => (
                      <option key={v} value={v}>
                        Ayat {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Direct Add & Preview Box */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 mb-2">
                  <p className="text-xs font-bold text-amber-400 mb-1">
                    {selectedBook} {selectedChapter}:{selectedVerse}
                  </p>
                  <p className="text-[11px] text-slate-300 italic mb-2 line-clamp-3">
                    {bibleData.find(
                      (v) =>
                        v.book === selectedBook &&
                        v.chapter === selectedChapter &&
                        v.verse === selectedVerse
                    )?.text || 'Ayat terpilih siap ditampilkan...'}
                  </p>
                  <button
                    type="button"
                    onClick={handleAddDirectVerse}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambahkan Ayat ke Setlist</span>
                  </button>
                </div>

                {/* Bible Import CSV button */}
                <div className="mt-auto pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{bibleStatusText}</span>
                  <button
                    type="button"
                    onClick={onOpenBibleImportModal}
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Import Alkitab CSV</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ------------------------------------------------------------ */}
        {/* CENTER PANEL: THE PROPRESENTER SLIDE MATRIX                  */}
        {/* ------------------------------------------------------------ */}
        <main
          className={`flex-1 flex flex-col bg-slate-950 overflow-hidden min-h-0 ${
            mobileTab === 'SLIDES' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Active Title Banner */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-black text-amber-300 tracking-wide truncate">
                  {displayState.activeTitle || 'Standby (Pilih lagu dari setlist)'}
                </h2>
                <p className="text-[10px] text-slate-400">
                  {activeContentType === 'SONG' ? 'Mode Lagu' : 'Mode Ayat Alkitab'} • {currentSlides.length} Slide
                </p>
              </div>
            </div>

            {/* Quick Song Edit/Delete Tools */}
            {activeContentType === 'SONG' && currentSongIndex >= 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={onOpenEditSongModal}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Edit Lirik & Judul Lagu Ini"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenDeleteSongModal}
                  className="p-1 rounded bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 cursor-pointer"
                  title="Hapus Lagu dari Database"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* THE SLIDE MATRIX: Big, beautiful, clickable tiles */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {currentSlides.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <MonitorPlay className="w-12 h-12 text-slate-700 mb-3" />
                <h3 className="text-sm font-bold text-slate-400 mb-1">Belum Ada Slide Aktif</h3>
                <p className="text-xs max-w-sm">
                  Pilih salah satu lagu atau ayat dari panel sebelah kiri untuk menampilkan slide matrix.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {currentSlides.map((slide, sIdx) => {
                  const isLive = sIdx === currentSlideIndex;
                  return (
                    <div
                      key={`slide-tile-${sIdx}`}
                      onClick={() => onGoToSlide(sIdx)}
                      className={`group relative rounded-xl p-3 sm:p-4 border transition-all duration-150 cursor-pointer select-none flex flex-col justify-between min-h-[110px] sm:min-h-[130px] ${
                        isLive
                          ? 'bg-amber-950/40 border-amber-400 shadow-xl shadow-amber-950/40 ring-2 ring-amber-400/40'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-600 hover:bg-slate-850'
                      }`}
                    >
                      {/* Top Tile Badge & Number */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            isLive
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {slide.tag || `Slide ${sIdx + 1}`}
                        </span>

                        {isLive ? (
                          <span className="flex items-center gap-1 text-[10px] font-black text-amber-400 tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                            LIVE ON AIR
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-600 font-bold group-hover:text-slate-400">
                            #{sIdx + 1}
                          </span>
                        )}
                      </div>

                      {/* Lyric Preview Text */}
                      <div
                        className="text-xs sm:text-sm font-semibold leading-relaxed line-clamp-4 text-slate-200 group-hover:text-white"
                        dangerouslySetInnerHTML={{ __html: formatLyricsWithTranslations(slide.text, displayState.translationPercent || 40) }}
                      />

                      {/* Hotkey hint */}
                      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Tekan angka <strong>{sIdx + 1}</strong> untuk lompat</span>
                        <span className="opacity-0 group-hover:opacity-100 transition text-amber-400 font-bold">
                          Klik untuk Live ▶
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Live Advance Navigation Bar */}
          <div className="h-14 bg-slate-900 border-t border-slate-800 px-4 flex items-center justify-between shrink-0 shadow-lg">
            {/* Prev Slide */}
            <button
              type="button"
              onClick={onPrevSlide}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer shadow active:scale-95"
              title="Slide Sebelumnya (Pintasan Panah Kiri)"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya (←)</span>
            </button>

            {/* Slide Counter */}
            <div className="text-center">
              <span className="text-xs font-extrabold text-amber-400">
                Slide {currentSlides.length > 0 ? currentSlideIndex + 1 : 0}
              </span>
              <span className="text-xs text-slate-500"> / {currentSlides.length}</span>
            </div>

            {/* Next Slide */}
            <button
              type="button"
              onClick={onNextSlide}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-black border border-indigo-400/40 transition cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-95"
              title="Slide Berikutnya (Pintasan Spasi / Panah Kanan)"
            >
              <span>Selanjutnya (Space / →)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT PANEL: LIVE CONFIDENCE MONITOR & STAGE CONTROLS       */}
        {/* ------------------------------------------------------------ */}
        <aside
          className={`w-full md:w-80 lg:w-96 bg-slate-900/95 border-l border-slate-800 flex flex-col shrink-0 overflow-y-auto p-3.5 space-y-4 ${
            mobileTab === 'MONITOR' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* 1. REAL-TIME 16:9 CONFIDENCE MONITOR */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                Live Output Monitor
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  displayState.isBlack
                    ? 'bg-rose-500/20 text-rose-400'
                    : displayState.isCleared
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {displayState.isBlack
                  ? 'OFF AIR (BLACK)'
                  : displayState.isCleared
                  ? 'CLEAR (NO TEXT)'
                  : 'ON AIR'}
              </span>
            </div>

            {/* 16:9 WYSIWYG Live Screen Preview */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-700 bg-black shadow-2xl">
              <LiveScreen
                state={displayState}
                customDataSlots={customDataSlots}
                gradientSlots={gradientSlots}
                overlays={overlays}
                pauseBackgroundAnimation={true}
              />
            </div>
          </div>

          {/* 2. DISPLAY FORMATTING & LOWER-THIRD MODE */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                Format Teks Layar
              </span>
              {onToggleDisplayMode && (
                <button
                  type="button"
                  onClick={onToggleDisplayMode}
                  className={`text-[10px] font-bold px-2 py-1 rounded transition cursor-pointer border ${
                    displayState.displayMode === 'lowerThird'
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  {displayState.displayMode === 'lowerThird' ? 'Lower Third (OBS)' : 'Layar Penuh (Center)'}
                </button>
              )}
            </div>

            {/* Font Size Adjuster */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">Ukuran Huruf ({displayState.fontSize}vw)</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onChangeFontSize(-0.5)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs cursor-pointer border border-slate-700"
                  title="Perkecil Font"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => onChangeFontSize(0.5)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs cursor-pointer border border-slate-700"
                  title="Perbesar Font"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 3. RUNNING TICKER / PENGUMUMAN BERJALAN */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Pengumuman Teks Berjalan</span>
              <button
                type="button"
                onClick={onToggleTicker}
                className={`text-[10px] font-bold px-2 py-0.5 rounded transition cursor-pointer ${
                  displayState.ticker.visible
                    ? 'bg-amber-500 text-black'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {displayState.ticker.visible ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={tickerInput}
                onChange={(e) => {
                  setTickerInput(e.target.value);
                  onUpdateTickerText(e.target.value);
                }}
                placeholder="Ketik teks pengumuman berjalan..."
                className="w-full bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* 4. PRESET BACKGROUND SELECTOR */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                Latar Belakang (Tema)
              </span>
              <label className="text-[10px] text-indigo-400 hover:text-indigo-300 cursor-pointer font-bold flex items-center gap-1">
                <Upload className="w-3 h-3" />
                <span>Upload BG</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUploadBgFile}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {bgPresets.map((preset) => {
                const isSelected = currentBgSelector === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onChangeBg(preset.id)}
                    className={`p-2 rounded-lg text-left transition border cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[55px] ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/30'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${preset.color} opacity-80`}
                    />
                    <div className="relative z-10">
                      <p className="text-[11px] font-bold text-white truncate">{preset.name}</p>
                      <p className="text-[9px] text-slate-300 line-clamp-1">{preset.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="relative z-10 self-end">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
