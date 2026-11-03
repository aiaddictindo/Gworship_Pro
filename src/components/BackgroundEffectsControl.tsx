import React from 'react';
import { BackgroundFx, DEFAULT_BG_FX } from '../types';
import {
  Gauge,
  Palette,
  Sun,
  Contrast,
  Sparkles,
  RotateCcw,
  Sliders,
  Droplet,
  Layers,
} from 'lucide-react';

interface BackgroundEffectsControlProps {
  bgFx: BackgroundFx;
  onChange: (fx: BackgroundFx) => void;
  onReset: () => void;
  compact?: boolean;
  activeSongTitle?: string;
  onApplyToAllSongs?: () => void;
  totalSetlistSongs?: number;
}

export interface ColorPreset {
  id: string;
  name: string;
  dotColor: string;
  fx: Partial<BackgroundFx>;
}

export const BG_COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'default',
    name: 'Asli',
    dotColor: '#94a3b8',
    fx: {
      hue: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'royal-purple',
    name: 'Purple',
    dotColor: '#a855f7',
    fx: {
      hue: 275,
      saturation: 125,
      contrast: 115,
      brightness: 95,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire',
    dotColor: '#0ea5e9',
    fx: {
      hue: 205,
      saturation: 120,
      contrast: 105,
      brightness: 95,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'emerald-green',
    name: 'Emerald',
    dotColor: '#10b981',
    fx: {
      hue: 125,
      saturation: 115,
      contrast: 105,
      brightness: 95,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'warm-amber',
    name: 'Gold',
    dotColor: '#f59e0b',
    fx: {
      hue: 38,
      saturation: 135,
      contrast: 105,
      brightness: 105,
      blur: 0,
      sepia: 10,
    },
  },
  {
    id: 'ruby-passion',
    name: 'Ruby',
    dotColor: '#f43f5e',
    fx: {
      hue: 335,
      saturation: 130,
      contrast: 120,
      brightness: 95,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'monochrome',
    name: 'B&W',
    dotColor: '#475569',
    fx: {
      saturation: 0,
      contrast: 135,
      brightness: 90,
      blur: 0,
      sepia: 0,
    },
  },
  {
    id: 'soft-bokeh',
    name: 'Bokeh',
    dotColor: '#6366f1',
    fx: {
      blur: 5,
      brightness: 85,
      contrast: 110,
      saturation: 95,
    },
  },
];

export const getHueColorName = (hue: number): string => {
  const h = ((hue % 360) + 360) % 360;
  if (h >= 345 || h < 15) return 'Merah';
  if (h >= 15 && h < 45) return 'Amber';
  if (h >= 45 && h < 75) return 'Emas';
  if (h >= 75 && h < 165) return 'Hijau';
  if (h >= 165 && h < 195) return 'Toska';
  if (h >= 195 && h < 255) return 'Biru';
  if (h >= 255 && h < 290) return 'Ungu';
  if (h >= 290 && h < 345) return 'Ruby';
  return 'Kustom';
};

export const BackgroundEffectsControl: React.FC<BackgroundEffectsControlProps> = ({
  bgFx,
  onChange,
  onReset,
  compact = false,
  activeSongTitle,
  onApplyToAllSongs,
  totalSetlistSongs = 0,
}) => {
  const currentFx = { ...DEFAULT_BG_FX, ...bgFx };

  const handleUpdate = (field: keyof BackgroundFx, value: number) => {
    onChange({
      ...currentFx,
      [field]: value,
    });
  };

  const handleApplyPreset = (preset: ColorPreset) => {
    onChange({
      ...currentFx,
      ...preset.fx,
    });
  };

  const isCustomized =
    currentFx.speed !== 1.0 ||
    currentFx.hue !== 0 ||
    currentFx.brightness !== 100 ||
    currentFx.contrast !== 100 ||
    currentFx.saturation !== 100 ||
    currentFx.blur !== 0 ||
    currentFx.sepia !== 0;

  const speedPills = [
    { label: '0.5x', val: 0.5 },
    { label: '0.75x', val: 0.75 },
    { label: '1x', val: 1.0 },
    { label: '1.25x', val: 1.25 },
    { label: '1.5x', val: 1.5 },
    { label: '2x', val: 2.0 },
  ];

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-xl p-3 sm:p-3.5 shadow-xl backdrop-blur-md flex flex-col gap-3 text-white">
      {/* 1. COMPACT TOOLBAR HEADER */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2 min-w-0">
          <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-xs font-extrabold text-white tracking-wide">
            Efek & Warna Background
          </span>
          {isCustomized ? (
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-400/30">
              {currentFx.speed}x • {currentFx.hue}° {getHueColorName(currentFx.hue)}
              {currentFx.blur > 0 ? ` • ${currentFx.blur}px blur` : ''}
            </span>
          ) : (
            <span className="text-[10px] text-slate-500 font-medium">Default</span>
          )}
        </div>

        {/* Reset Button */}
        {isCustomized && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/50 transition cursor-pointer shrink-0"
            title="Kembalikan semua efek ke normal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Active Song Attachment Info Banner */}
      {activeSongTitle && (
        <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-500/30 text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="text-slate-300">Menempel pada lagu:</span>
            <span className="font-bold text-amber-300 truncate max-w-[150px] sm:max-w-xs">
              "{activeSongTitle}"
            </span>
          </div>
          {onApplyToAllSongs && totalSetlistSongs > 1 && (
            <button
              type="button"
              onClick={onApplyToAllSongs}
              className="text-[10px] font-bold text-indigo-300 hover:text-white bg-indigo-900/60 hover:bg-indigo-800 px-2 py-0.5 rounded border border-indigo-700/60 transition cursor-pointer shrink-0"
              title="Terapkan background dan warna ini ke semua lagu di setlist"
            >
              Terapkan ke Semua ({totalSetlistSongs})
            </button>
          )}
        </div>
      )}

      {/* 2. MINIMALIST PRESET CHIPS STRIP (1-Row) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-0.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Preset:</span>
        </span>
        {BG_COLOR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleApplyPreset(preset)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0 text-[11px] font-medium"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: preset.dotColor }}
            />
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* 3. SPEED & HUE SLIDERS (INLINE COMPACT) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Speed Control */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-sky-400" />
              <span>Kecepatan</span>
            </span>
            <div className="flex items-center gap-1">
              {speedPills.map((p) => {
                const isSel = Math.abs(currentFx.speed - p.val) < 0.04;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handleUpdate('speed', p.val)}
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold transition cursor-pointer border ${
                      isSel
                        ? 'bg-sky-500 text-black border-sky-400 font-black'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
              <span className="text-[11px] font-mono font-bold text-sky-400 ml-1">
                {currentFx.speed.toFixed(2)}x
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0.25"
            max="3.0"
            step="0.05"
            value={currentFx.speed}
            onChange={(e) => handleUpdate('speed', parseFloat(e.target.value))}
            className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded cursor-pointer"
          />
        </div>

        {/* Hue Spectrum */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-amber-400" />
              <span>Warna (Hue)</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-xs"
                style={{ backgroundColor: `hsl(${currentFx.hue}, 90%, 55%)` }}
              />
              <span className="text-[11px] font-mono font-bold text-amber-400">
                {currentFx.hue}°
              </span>
              <span className="text-[10px] text-slate-400">
                {getHueColorName(currentFx.hue)}
              </span>
              {currentFx.hue !== 0 && (
                <button
                  type="button"
                  onClick={() => handleUpdate('hue', 0)}
                  className="text-[9px] text-slate-400 hover:text-white ml-0.5 cursor-pointer underline"
                >
                  Asli
                </button>
              )}
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={currentFx.hue}
            onChange={(e) => handleUpdate('hue', parseInt(e.target.value, 10))}
            className="w-full h-2 rounded appearance-none cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #ef4444 0%, #f97316 12%, #eab308 25%, #22c55e 38%, #06b6d4 50%, #3b82f6 62%, #8b5cf6 75%, #ec4899 88%, #ef4444 100%)',
            }}
          />
        </div>
      </div>

      {/* 4. COMPACT 4-GRID (BRIGHTNESS, CONTRAST, SATURATION, BLUR) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Kecerahan */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Terang</span>
            </span>
            <span
              onClick={() => handleUpdate('brightness', 100)}
              className="font-mono text-[10px] text-slate-400 hover:text-amber-400 cursor-pointer"
              title="Klik untuk reset 100%"
            >
              {currentFx.brightness}%
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="180"
            step="5"
            value={currentFx.brightness}
            onChange={(e) => handleUpdate('brightness', parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 h-1 bg-slate-800 rounded cursor-pointer"
          />
        </div>

        {/* Kontras */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Contrast className="w-3 h-3 text-indigo-400" />
              <span>Kontras</span>
            </span>
            <span
              onClick={() => handleUpdate('contrast', 100)}
              className="font-mono text-[10px] text-slate-400 hover:text-indigo-400 cursor-pointer"
              title="Klik untuk reset 100%"
            >
              {currentFx.contrast}%
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="180"
            step="5"
            value={currentFx.contrast}
            onChange={(e) => handleUpdate('contrast', parseInt(e.target.value, 10))}
            className="w-full accent-indigo-400 h-1 bg-slate-800 rounded cursor-pointer"
          />
        </div>

        {/* Saturasi */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Droplet className="w-3 h-3 text-pink-400" />
              <span>Saturasi</span>
            </span>
            <div className="flex items-center gap-1">
              {currentFx.saturation === 0 ? (
                <span className="text-[9px] text-pink-300 font-bold">B&W</span>
              ) : null}
              <span
                onClick={() => handleUpdate('saturation', 100)}
                className="font-mono text-[10px] text-slate-400 hover:text-pink-400 cursor-pointer"
                title="Klik untuk reset 100%"
              >
                {currentFx.saturation}%
              </span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={currentFx.saturation}
            onChange={(e) => handleUpdate('saturation', parseInt(e.target.value, 10))}
            className="w-full accent-pink-400 h-1 bg-slate-800 rounded cursor-pointer"
          />
        </div>

        {/* Blur / Bokeh */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold flex items-center gap-1">
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>Blur (Bokeh)</span>
            </span>
            <span
              onClick={() => handleUpdate('blur', 0)}
              className="font-mono text-[10px] text-slate-400 hover:text-emerald-400 cursor-pointer"
              title="Klik untuk reset 0px"
            >
              {currentFx.blur}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="16"
            step="1"
            value={currentFx.blur}
            onChange={(e) => handleUpdate('blur', parseInt(e.target.value, 10))}
            className="w-full accent-emerald-400 h-1 bg-slate-800 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
