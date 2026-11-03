import React, { useState, useMemo, useRef } from 'react';
import {
  DisplayState,
  BackgroundFx,
  CompositeBackgroundConfig,
  CompositeBlendMode,
  CustomMediaItem,
  DEFAULT_BG_FX,
  DEFAULT_COMPOSITE_BG,
  DEFAULT_CHROMA_KEY,
} from '../types';
import { DEFAULT_PRESET_IMAGES, PresetStillImage } from '../db/presetImages';
import { DEFAULT_BUILTIN_HTML_BACKGROUNDS } from '../db/defaultData';
import { AnimatedBgThumbnail } from './AnimatedBgThumbnail';
import { BG_COLOR_PRESETS } from './BackgroundEffectsControl';
import {
  Layers,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Code,
  Droplet,
  Eye,
  EyeOff,
  RotateCcw,
  Upload,
  Check,
  CheckCircle2,
  BookmarkPlus,
  Play,
  Palette,
  Gauge,
  Sun,
  Contrast,
  SlidersHorizontal,
  Flame,
  Zap,
} from 'lucide-react';

interface BackgroundStudioTabProps {
  displayState: DisplayState;
  customMediaList: CustomMediaItem[];
  customDataSlots: Record<string, string>;
  activeSongTitle?: string;
  totalSetlistSongs: number;
  onApplyCompositeToLive: (config: CompositeBackgroundConfig) => void;
  onSaveAsNewBackground: (name: string, config: CompositeBackgroundConfig) => void;
  onApplyToActiveSong: (config: CompositeBackgroundConfig, fx: BackgroundFx) => void;
  onUpdateBgFx: (fx: BackgroundFx) => void;
  onApplyBgToAllSongs: () => void;
  onResetBgFx: () => void;
  onUploadImage: (name: string, dataUrl: string) => void;
}

export const BackgroundStudioTab: React.FC<BackgroundStudioTabProps> = ({
  displayState,
  customMediaList,
  customDataSlots,
  activeSongTitle,
  totalSetlistSongs,
  onApplyCompositeToLive,
  onSaveAsNewBackground,
  onApplyToActiveSong,
  onUpdateBgFx,
  onApplyBgToAllSongs,
  onResetBgFx,
  onUploadImage,
}) => {
  // Local state for the composition configuration
  const [compositeConfig, setCompositeConfig] = useState<CompositeBackgroundConfig>(() => {
    if (displayState.compositeBg) {
      return { ...displayState.compositeBg, enabled: true };
    }
    return { ...DEFAULT_COMPOSITE_BG, enabled: true };
  });

  // Current background effects
  const currentFx = useMemo(() => {
    return { ...DEFAULT_BG_FX, ...(displayState.bgFx || {}) };
  }, [displayState.bgFx]);

  // Preview options
  const [showSampleText, setShowSampleText] = useState<boolean>(true);
  const [sampleTextIndex, setSampleTextIndex] = useState<number>(0);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [customBgName, setCustomBgName] = useState<string>('');
  const [activeSubSection, setActiveSubSection] = useState<'MIXER' | 'EFFECTS'>('MIXER');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const sampleTexts = [
    {
      title: 'Besar Setia-Mu',
      body: 'Besar setia-Mu, Allah Bapaku\nBesar kasih-Mu, tiada bertara\nGereja menyembah dalam hadirat-Mu\nKekal abadi nama-Mu dipuji',
    },
    {
      title: 'Malam Kudus, Sunyi Senyap',
      body: 'Malam kudus, sunyi senyap\nBintang-Mu gemerlap\nJurus\'lamat manusia, ada datang di dunia\nKristus Anak Daud, Kristus Anak Daud',
    },
    {
      title: 'Kudus, Kuduslah Tuhan',
      body: 'Kudus, kuduslah Tuhan Allah Maha Kuasa\nBumi dan surga penuh kemuliaan-Mu\nHosana di tempat yang maha tinggi\nTerpujilah Engkau yang datang dalam nama Tuhan',
    },
  ];

  // List of available still images (Presets + Custom Uploaded Images)
  const availableImages = useMemo(() => {
    const list: Array<{ id: string; name: string; data: string; isPreset?: boolean }> = [];
    DEFAULT_PRESET_IMAGES.forEach((p) => {
      list.push({ id: p.id, name: p.name, data: p.data, isPreset: true });
    });
    customMediaList
      .filter((m) => m.type === 'image')
      .forEach((m) => {
        list.push({ id: m.id, name: m.name, data: m.data, isPreset: false });
      });
    return list;
  }, [customMediaList]);

  // List of available HTML animations
  const availableHtmlAnimations = useMemo(() => {
    const list: Array<{ id: string; name: string; data: string }> = [];
    DEFAULT_BUILTIN_HTML_BACKGROUNDS.forEach((h) => {
      list.push({ id: h.id, name: h.name, data: h.data });
    });
    customMediaList
      .filter((m) => m.type === 'html')
      .forEach((m) => {
        if (!list.some((existing) => existing.id === m.id)) {
          list.push({ id: m.id, name: m.name, data: m.data });
        }
      });
    return list;
  }, [customMediaList]);

  // Selected base image data
  const selectedBaseImageData = useMemo(() => {
    if (compositeConfig.baseImageData) return compositeConfig.baseImageData;
    const found = availableImages.find((img) => img.id === compositeConfig.baseImageId);
    return found ? found.data : availableImages[0]?.data || '';
  }, [compositeConfig.baseImageId, compositeConfig.baseImageData, availableImages]);

  // Selected overlay HTML data
  const selectedOverlayHtmlData = useMemo(() => {
    if (compositeConfig.overlayHtmlData) return compositeConfig.overlayHtmlData;
    const found = availableHtmlAnimations.find((h) => h.id === compositeConfig.overlayHtmlId);
    return found ? found.data : availableHtmlAnimations[0]?.data || '';
  }, [compositeConfig.overlayHtmlId, compositeConfig.overlayHtmlData, availableHtmlAnimations]);

  // Processed HTML for live preview with transparent background override
  const processedPreviewHtml = useMemo(() => {
    if (!selectedOverlayHtmlData) return '';
    const forceTransparent = compositeConfig.chromaKey.transparentAnimationBg !== false;
    if (!forceTransparent) return selectedOverlayHtmlData;

    const transparentStyle = `
      <style id="chroma-override-style">
        html, body {
          background: transparent !important;
          background-color: transparent !important;
        }
        .ambient-glow, .bg-glow {
          opacity: 0.25 !important;
        }
      </style>
    `;

    if (selectedOverlayHtmlData.includes('</head>')) {
      return selectedOverlayHtmlData.replace('</head>', `${transparentStyle}</head>`);
    }
    return transparentStyle + selectedOverlayHtmlData;
  }, [selectedOverlayHtmlData, compositeConfig.chromaKey.transparentAnimationBg]);

  // Compute CSS filter style for Color Grading
  const filterStyle = useMemo(() => {
    const parts: string[] = [];
    if (currentFx.hue) parts.push(`hue-rotate(${currentFx.hue}deg)`);
    if (currentFx.brightness !== 100) parts.push(`brightness(${currentFx.brightness}%)`);
    if (currentFx.contrast !== 100) parts.push(`contrast(${currentFx.contrast}%)`);
    if (currentFx.saturation !== 100) parts.push(`saturate(${currentFx.saturation}%)`);
    if (currentFx.blur > 0) parts.push(`blur(${currentFx.blur}px)`);
    if (currentFx.sepia > 0) parts.push(`sepia(${currentFx.sepia}%)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  }, [currentFx]);

  // Update composite config helper
  const updateConfig = (patch: Partial<CompositeBackgroundConfig>) => {
    setCompositeConfig((prev) => ({
      ...prev,
      ...patch,
      enabled: true,
    }));
  };

  const updateChromaKey = (patch: Partial<typeof DEFAULT_CHROMA_KEY>) => {
    setCompositeConfig((prev) => ({
      ...prev,
      chromaKey: {
        ...prev.chromaKey,
        ...patch,
      },
      enabled: true,
    }));
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        onUploadImage(cleanName, dataUrl);
        updateConfig({
          baseImageId: `img-custom-${Date.now()}`,
          baseImageData: dataUrl,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Quick preset blend modes
  const blendModes: Array<{ id: CompositeBlendMode; label: string; desc: string }> = [
    { id: 'screen', label: 'Screen (Layar)', desc: 'Hilangkan hitam pekat, partikel cahaya & salju menyatu sempurna' },
    { id: 'normal', label: 'Normal', desc: 'Transparansi standar tanpa pembauran warna' },
    { id: 'lighten', label: 'Lighten', desc: 'Ambil piksel paling terang di antara kedua latar' },
    { id: 'color-dodge', label: 'Color Dodge', desc: 'Efek kilau bercahaya intens & kontras dramatis' },
    { id: 'overlay', label: 'Overlay', desc: 'Perpaduan kontras kaya mengikuti warna gambar dasar' },
    { id: 'soft-light', label: 'Soft Light', desc: 'Pencahayaan lembut dan halus seperti sinar fajar' },
    { id: 'multiply', label: 'Multiply', desc: 'Campuran gelap, cocok untuk nuansa hening & malam' },
  ];

  // Chroma key color quick presets
  const chromaColorPresets = [
    { label: 'Hitam (Gelap)', color: '#000000', desc: 'Latar gelap default animasi' },
    { label: 'Green Screen', color: '#00ff00', desc: 'Layar hijau chroma key' },
    { label: 'Blue Screen', color: '#0000ff', desc: 'Layar biru chroma key' },
    { label: 'Navy Gelap', color: '#030611', desc: 'Latar biru malam aurora' },
  ];

  return (
    <div className="space-y-4 pb-12 select-none">
      {/* 1. TOP HEADER & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Layers className="w-4 h-4 text-amber-400" />
            </span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>Studio Komposisi & Efek Latar</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 font-mono border border-amber-500/40">
                2 LAYER MIXER + CHROMA KEY
              </span>
            </h3>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Gabungkan foto still image (altar/gereja) dengan animasi bergerak (salib 3D, salju, lentera, api) + hapus warna latar (chroma key) & atur transparansi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            onClick={() => onApplyCompositeToLive(compositeConfig)}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            title="Terapkan hasil gabungan ini langsung ke layar proyektor"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Terapkan ke Layar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const defaultName = `Komposisi: ${
                availableImages.find((img) => img.id === compositeConfig.baseImageId)?.name.split(' (')[0] || 'Foto'
              } + ${
                availableHtmlAnimations.find((h) => h.id === compositeConfig.overlayHtmlId)?.name.split(' (')[0] || 'Animasi'
              }`;
              setCustomBgName(defaultName);
              setSaveModalOpen(true);
            }}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition cursor-pointer flex items-center gap-1.5 active:scale-95"
            title="Simpan sebagai background baru di daftar media"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Simpan Preset</span>
          </button>

          {activeSongTitle && (
            <button
              type="button"
              onClick={() => onApplyToActiveSong(compositeConfig, currentFx)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
              title={`Tempelkan komposisi latar ini khusus untuk lagu "${activeSongTitle}"`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tempel ke Lagu</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. WYSIWYG LIVE 16:9 PREVIEW BOX */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-700 bg-black shadow-2xl">
        {/* Underneath: Base Still Image */}
        {selectedBaseImageData && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url(${selectedBaseImageData})`,
              opacity: (compositeConfig.baseOpacity ?? 100) / 100,
              filter: filterStyle,
            }}
          />
        )}

        {/* On Top: HTML Animation Overlay with Opacity & Blend Mode & Chroma Key */}
        {processedPreviewHtml && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-200"
            style={{
              opacity: (compositeConfig.overlayOpacity ?? 85) / 100,
              mixBlendMode: compositeConfig.blendMode || 'screen',
              filter: filterStyle,
            }}
          >
            <iframe
              key={`preview-${compositeConfig.overlayHtmlId}-${compositeConfig.blendMode}-${compositeConfig.chromaKey.transparentAnimationBg}`}
              srcDoc={processedPreviewHtml}
              className="absolute inset-0 w-full h-full border-none pointer-events-none"
              sandbox="allow-scripts allow-same-origin"
              title="Interactive Studio Preview"
            />
          </div>
        )}

        {/* Sample Worship Lyrics Overlay for Readability Check */}
        {showSampleText && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30 mb-2 shadow">
              {sampleTexts[sampleTextIndex].title}
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] whitespace-pre-line leading-relaxed max-w-2xl font-sans">
              {sampleTexts[sampleTextIndex].body}
            </p>
          </div>
        )}

        {/* Preview HUD Controls */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 text-xs shadow-lg">
          <button
            type="button"
            onClick={() => setShowSampleText((prev) => !prev)}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white transition cursor-pointer"
          >
            {showSampleText ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>{showSampleText ? 'Teks ON' : 'Teks OFF'}</span>
          </button>
          {showSampleText && (
            <button
              type="button"
              onClick={() => setSampleTextIndex((prev) => (prev + 1) % sampleTexts.length)}
              className="text-[10px] font-mono text-amber-300 hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer ml-1"
            >
              Ganti Lirik
            </button>
          )}
        </div>

        {/* Preview Bottom Label HUD */}
        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">
            Gambar: <strong className="text-white">{availableImages.find((i) => i.id === compositeConfig.baseImageId)?.name.split(' (')[0] || 'Altar'}</strong>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            Animasi: <strong className="text-amber-300">{availableHtmlAnimations.find((h) => h.id === compositeConfig.overlayHtmlId)?.name.split(' (')[0] || 'Salib 3D'}</strong>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-mono font-bold">
            {compositeConfig.overlayOpacity}% • {compositeConfig.blendMode.toUpperCase()}
          </span>
        </div>
      </div>

      {/* 3. STUDIO SECTION SWITCHER: [KOMPOSISI 2 LAYER] vs [EDIT EFEK & WARNA] */}
      <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveSubSection('MIXER')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
            activeSubSection === 'MIXER'
              ? 'bg-indigo-600 text-white shadow-lg font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Penggabung 2 Latar (Mixer & Chroma Key)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('EFFECTS')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
            activeSubSection === 'EFFECTS'
              ? 'bg-indigo-600 text-white shadow-lg font-black'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Editor Efek Warna & Kecepatan Background</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SECTION A: MIXER 2 LAYER (BASE IMAGE + ANIMATION + CHROMA KEY) */}
      {/* ============================================================== */}
      {activeSubSection === 'MIXER' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* STEP 1: PILIH GAMBAR DASAR (STILL IMAGE) */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-black">
                  1
                </span>
                <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Pilih Gambar Dasar (Latar Belakang Diam)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-400/50 transition cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>+ Unggah Gambar Sendiri</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Horizontal Scroll / Grid of Still Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {availableImages.map((img) => {
                const isSelected = compositeConfig.baseImageId === img.id;
                return (
                  <div
                    key={img.id}
                    onClick={() =>
                      updateConfig({
                        baseImageId: img.id,
                        baseImageData: img.data,
                      })
                    }
                    className={`group relative rounded-xl border overflow-hidden cursor-pointer transition flex flex-col justify-between h-24 bg-slate-950 ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-85 group-hover:opacity-100 transition">
                      <img
                        src={img.data}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 p-1.5 flex items-center justify-between">
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs shadow">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-black/70 text-slate-300 backdrop-blur-xs">
                          {img.isPreset ? 'PRESET' : 'KUSTOM'}
                        </span>
                      )}
                    </div>
                    <div className="relative z-10 p-1.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                      <p className="text-[10px] font-bold text-white truncate drop-shadow">
                        {img.name.split(' (')[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Base Image Opacity Slider */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-amber-400" />
                <span>Kecerahan / Opasitas Gambar Dasar:</span>
              </span>
              <div className="flex items-center gap-2 w-48 sm:w-64">
                <input
                  type="range"
                  min={20}
                  max={100}
                  step={1}
                  value={compositeConfig.baseOpacity ?? 100}
                  onChange={(e) => updateConfig({ baseOpacity: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <span className="w-12 text-right text-xs font-mono font-bold text-amber-400">
                  {compositeConfig.baseOpacity ?? 100}%
                </span>
              </div>
            </div>
          </div>

          {/* STEP 2: PILIH LAPISAN ANIMASI HTML (OVERLAY) */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-black">
                  2
                </span>
                <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>Pilih Lapisan Animasi HTML (Animasi Bergerak)</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                {availableHtmlAnimations.length} Animasi Siap Dipakai
              </span>
            </div>

            {/* Grid of HTML Animations with SVG Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
              {availableHtmlAnimations.map((anim) => {
                const isSelected = compositeConfig.overlayHtmlId === anim.id;
                return (
                  <div
                    key={anim.id}
                    onClick={() =>
                      updateConfig({
                        overlayHtmlId: anim.id,
                        overlayHtmlData: anim.data,
                      })
                    }
                    className={`group relative rounded-xl border overflow-hidden cursor-pointer transition flex flex-col justify-between h-24 bg-slate-950 ${
                      isSelected
                        ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-85 group-hover:opacity-100 transition">
                      <AnimatedBgThumbnail
                        id={anim.id}
                        name={anim.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 p-1.5 flex items-center justify-between">
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-xs shadow">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-black/70 text-cyan-300 backdrop-blur-xs">
                          HTML
                        </span>
                      )}
                    </div>
                    <div className="relative z-10 p-1.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
                      <p className="text-[10px] font-bold text-white truncate drop-shadow">
                        {anim.name.split(' (')[0]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overlay Transparency Slider */}
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-white font-bold flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  <span>Tingkat Transparansi Animasi HTML:</span>
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/40">
                  {compositeConfig.overlayOpacity}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={1}
                value={compositeConfig.overlayOpacity}
                onChange={(e) => updateConfig({ overlayOpacity: parseInt(e.target.value, 10) })}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 leading-tight">
                Geser ke kiri untuk membuat animasi lebih transparan/halus di atas foto, atau geser ke kanan untuk animasi yang lebih pekat & menonjol.
              </p>
            </div>
          </div>

          {/* STEP 3: BLEND MODE & CHROMA KEY COLOR KNOCKOUT */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Mode Campuran & Fitur Chroma Key (Hapus Warna Latar)</span>
              </span>
            </div>

            {/* Mode Campuran (Blend Mode) Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>Pilih Mode Campuran (Blend Mode):</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {blendModes.map((bm) => {
                  const isActive = compositeConfig.blendMode === bm.id;
                  return (
                    <button
                      key={bm.id}
                      type="button"
                      onClick={() => updateConfig({ blendMode: bm.id })}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'bg-purple-950/70 border-purple-400 text-white ring-1 ring-purple-400/50 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-black text-amber-300 flex items-center justify-between">
                        <span>{bm.label}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-purple-300" />}
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight mt-1">
                        {bm.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chroma Key Controls */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-purple-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Chroma Key & Hapus Latar Belakang Animasi</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                      {compositeConfig.chromaKey.enabled ? 'AKTIF' : 'NONAKTIF'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Menghapus warna latar solid pada animasi HTML agar elemen 3D dan partikel menyatu tembus pandang ke still image.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => updateChromaKey({ enabled: !compositeConfig.chromaKey.enabled })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    compositeConfig.chromaKey.enabled
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {compositeConfig.chromaKey.enabled ? 'Chroma Key Aktif' : 'Aktifkan Chroma Key'}
                </button>
              </div>

              {compositeConfig.chromaKey.enabled && (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  {/* Pure Alpha Transparent Background Option */}
                  <div
                    onClick={() =>
                      updateChromaKey({
                        transparentAnimationBg: !compositeConfig.chromaKey.transparentAnimationBg,
                      })
                    }
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between cursor-pointer transition"
                  >
                    <div>
                      <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Transparan Murni (Direct Alpha Knockout)</span>
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Otomatis mengubah kode latar animasi HTML menjadi 100% transparan tanpa kotak gelap
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-xs ${
                        compositeConfig.chromaKey.transparentAnimationBg
                          ? 'bg-amber-500 border-amber-400 text-black'
                          : 'border-slate-700 bg-slate-950'
                      }`}
                    >
                      {compositeConfig.chromaKey.transparentAnimationBg && '✓'}
                    </div>
                  </div>

                  {/* Quick Color Presets */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-slate-300 font-semibold">Pilih Warna Target yang Dihilangkan:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {chromaColorPresets.map((cc) => {
                        const isMatch = compositeConfig.chromaKey.color.toLowerCase() === cc.color.toLowerCase();
                        return (
                          <button
                            key={cc.color}
                            type="button"
                            onClick={() => updateChromaKey({ color: cc.color })}
                            className={`p-2 rounded-lg border text-left transition cursor-pointer flex items-center gap-2 ${
                              isMatch
                                ? 'bg-indigo-950 border-amber-400 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                              style={{ backgroundColor: cc.color }}
                            />
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold text-white truncate">{cc.label}</p>
                              <p className="text-[9px] font-mono text-slate-400">{cc.color}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tolerance & Smoothness Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-semibold">Toleransi Warna (Tolerance):</span>
                        <span className="font-mono text-amber-400 font-bold">{compositeConfig.chromaKey.tolerance}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={80}
                        step={1}
                        value={compositeConfig.chromaKey.tolerance}
                        onChange={(e) => updateChromaKey({ tolerance: parseInt(e.target.value, 10) })}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-semibold">Kehalusan Tepi (Feathering):</span>
                        <span className="font-mono text-cyan-400 font-bold">{compositeConfig.chromaKey.smoothness}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={30}
                        step={1}
                        value={compositeConfig.chromaKey.smoothness}
                        onChange={(e) => updateChromaKey({ smoothness: parseInt(e.target.value, 10) })}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION B: EDITOR EFEK WARNA & KECEPATAN BACKGROUND (BG FX)    */}
      {/* ============================================================== */}
      {activeSubSection === 'EFFECTS' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Preset Color Palettes */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-purple-400" />
                <span>Preset Warna Cepat (Instant Color Grading)</span>
              </span>
              <button
                type="button"
                onClick={onResetBgFx}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Asli</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {BG_COLOR_PRESETS.map((preset) => {
                const isSelected =
                  currentFx.hue === (preset.fx.hue ?? 0) &&
                  currentFx.saturation === (preset.fx.saturation ?? 100);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      onUpdateBgFx({
                        ...currentFx,
                        ...preset.fx,
                      })
                    }
                    className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-purple-950/70 border-purple-400 text-white ring-1 ring-purple-400/50 shadow'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow"
                      style={{ backgroundColor: preset.dotColor }}
                    />
                    <span className="text-[11px] font-bold truncate">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Effect Sliders */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
            <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Pengaturan Detail Parameter Efek Visual</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Kecepatan (Speed) */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kecepatan Gerak (Speed):</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400">{currentFx.speed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={0.25}
                  max={3.0}
                  step={0.05}
                  value={currentFx.speed}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, speed: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* 2. Hue (Rotasi Warna) */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    <span>Nuansa Warna (Hue Rotate):</span>
                  </span>
                  <span className="font-mono font-bold text-purple-400">{currentFx.hue}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={currentFx.hue}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, hue: parseInt(e.target.value, 10) })}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              {/* 3. Kecerahan (Brightness) */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Kecerahan (Brightness):</span>
                  </span>
                  <span className="font-mono font-bold text-amber-300">{currentFx.brightness}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={200}
                  step={1}
                  value={currentFx.brightness}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, brightness: parseInt(e.target.value, 10) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* 4. Kontras (Contrast) */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Contrast className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kontras (Contrast):</span>
                  </span>
                  <span className="font-mono font-bold text-cyan-400">{currentFx.contrast}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={200}
                  step={1}
                  value={currentFx.contrast}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, contrast: parseInt(e.target.value, 10) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* 5. Saturasi (Saturation) */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                    <span>Kepekatan Warna (Saturation):</span>
                  </span>
                  <span className="font-mono font-bold text-rose-400">{currentFx.saturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={currentFx.saturation}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, saturation: parseInt(e.target.value, 10) })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              {/* 6. Blur Sinematik */}
              <div className="space-y-1 p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Blur Sinematik (Soft Focus):</span>
                  </span>
                  <span className="font-mono font-bold text-indigo-400">{currentFx.blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={currentFx.blur}
                  onChange={(e) => onUpdateBgFx({ ...currentFx, blur: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Setlist Broadcast Options */}
            {totalSetlistSongs > 1 && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  Terapkan efek visual dan kecepatan ini ke semua {totalSetlistSongs} lagu di jadwal ibadah saat ini:
                </span>
                <button
                  type="button"
                  onClick={onApplyBgToAllSongs}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer shrink-0 shadow"
                >
                  Terapkan ke Semua Lagu
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL DIALOG: SIMPAN SEBAGAI BACKGROUND PRESET BARU            */}
      {/* ============================================================== */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-[400] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <BookmarkPlus className="w-4 h-4 text-amber-400" />
                <span>Simpan Sebagai Background Baru</span>
              </h4>
              <button
                type="button"
                onClick={() => setSaveModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Kombinasi gambar dan animasi ini akan disimpan secara permanen di database lokal Anda dan muncul di galeri latar belakang untuk dipilih kapan saja.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Nama Preset Background:</label>
              <input
                type="text"
                value={customBgName}
                onChange={(e) => setCustomBgName(e.target.value)}
                placeholder="Contoh: Altar Kudus + Salib Emas 3D"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p>• Gambar Dasar: <strong className="text-white">{availableImages.find((i) => i.id === compositeConfig.baseImageId)?.name.split(' (')[0]}</strong></p>
              <p>• Animasi HTML: <strong className="text-amber-300">{availableHtmlAnimations.find((h) => h.id === compositeConfig.overlayHtmlId)?.name.split(' (')[0]}</strong></p>
              <p>• Opasitas: <strong className="text-cyan-300">{compositeConfig.overlayOpacity}%</strong> | Mode: <strong className="text-purple-300">{compositeConfig.blendMode.toUpperCase()}</strong></p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSaveModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalName = customBgName.trim() || 'Komposisi Latar Kustom';
                  onSaveAsNewBackground(finalName, compositeConfig);
                  setSaveModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow cursor-pointer active:scale-95 transition"
              >
                Simpan ke Galeri
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
