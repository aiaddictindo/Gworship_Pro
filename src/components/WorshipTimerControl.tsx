import React, { useState, useEffect } from 'react';
import { WorshipTimerState } from '../types';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Sparkles,
  Settings2,
  Tv,
  CheckCircle2,
  AlertTriangle,
  Timer as TimerIcon,
  Tag,
  Radio,
} from 'lucide-react';

interface WorshipTimerControlProps {
  timer: WorshipTimerState;
  onUpdateTimer: (updater: (prev: WorshipTimerState) => WorshipTimerState) => void;
  onToggleTimerOverlay: () => void;
}

export const WorshipTimerControl: React.FC<WorshipTimerControlProps> = ({
  timer,
  onUpdateTimer,
  onToggleTimerOverlay,
}) => {
  const currentTimer: WorshipTimerState = timer || {
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

  const [displaySeconds, setDisplaySeconds] = useState<number>(currentTimer.remainingSeconds || 0);
  const [customMinutes, setCustomMinutes] = useState<number>(
    Math.floor((currentTimer.totalSeconds || 2700) / 60) || 45
  );
  const [customTitle, setCustomTitle] = useState<string>(currentTimer.title || 'Khotbah');

  // Sync displayed time accurately
  useEffect(() => {
    if (!currentTimer.isRunning) {
      setDisplaySeconds(currentTimer.remainingSeconds || 0);
      return;
    }

    const updateTime = () => {
      const now = Date.now();
      if (currentTimer.mode === 'countdown') {
        if (currentTimer.endTime) {
          const diff = Math.max(0, Math.ceil((currentTimer.endTime - now) / 1000));
          setDisplaySeconds(diff);
        } else {
          setDisplaySeconds(currentTimer.remainingSeconds || 0);
        }
      } else {
        // stopwatch
        if (currentTimer.startTime) {
          const diff = Math.max(0, Math.floor((now - currentTimer.startTime) / 1000));
          setDisplaySeconds(diff);
        } else {
          setDisplaySeconds(currentTimer.remainingSeconds || 0);
        }
      }
    };

    updateTime();
    if (!currentTimer.isRunning) {
      return;
    }
    const interval = setInterval(updateTime, 250);
    return () => clearInterval(interval);
  }, [currentTimer.isRunning, currentTimer.endTime, currentTimer.startTime, currentTimer.mode, currentTimer.remainingSeconds]);

  // Keep title input in sync if changed from preset
  useEffect(() => {
    setCustomTitle(currentTimer.title || 'Khotbah');
  }, [currentTimer.title]);

  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const handleTogglePlay = () => {
    onUpdateTimer((prev) => {
      const now = Date.now();
      if (prev.isRunning) {
        // Pause
        let newRemaining = prev.remainingSeconds;
        if (prev.mode === 'countdown') {
          if (prev.endTime) {
            newRemaining = Math.max(0, Math.ceil((prev.endTime - now) / 1000));
          }
        } else {
          if (prev.startTime) {
            newRemaining = Math.max(0, Math.floor((now - prev.startTime) / 1000));
          }
        }
        return {
          ...prev,
          isRunning: false,
          remainingSeconds: newRemaining,
          endTime: null,
          startTime: null,
        };
      } else {
        // Start / Resume
        if (prev.mode === 'countdown') {
          const secs = prev.remainingSeconds > 0 ? prev.remainingSeconds : prev.totalSeconds;
          return {
            ...prev,
            isRunning: true,
            remainingSeconds: secs,
            endTime: now + secs * 1000,
          };
        } else {
          // stopwatch
          const secs = prev.remainingSeconds;
          return {
            ...prev,
            isRunning: true,
            remainingSeconds: secs,
            startTime: now - secs * 1000,
          };
        }
      }
    });
  };

  const handleReset = () => {
    onUpdateTimer((prev) => ({
      ...prev,
      isRunning: false,
      remainingSeconds: prev.mode === 'countdown' ? prev.totalSeconds : 0,
      endTime: null,
      startTime: null,
    }));
  };

  const handleAddMinutes = (mins: number) => {
    onUpdateTimer((prev) => {
      const addSeconds = mins * 60;
      const now = Date.now();
      if (prev.mode === 'countdown') {
        const current = prev.isRunning && prev.endTime
          ? Math.max(0, Math.ceil((prev.endTime - now) / 1000))
          : prev.remainingSeconds;
        const newSecs = Math.max(0, current + addSeconds);
        return {
          ...prev,
          totalSeconds: prev.totalSeconds + addSeconds,
          remainingSeconds: newSecs,
          endTime: prev.isRunning ? now + newSecs * 1000 : null,
        };
      } else {
        // stopwatch
        const current = prev.isRunning && prev.startTime
          ? Math.max(0, Math.floor((now - prev.startTime) / 1000))
          : prev.remainingSeconds;
        const newSecs = Math.max(0, current + addSeconds);
        return {
          ...prev,
          remainingSeconds: newSecs,
          startTime: prev.isRunning ? now - newSecs * 1000 : null,
        };
      }
    });
  };

  const handleApplyPreset = (title: string, minutes: number, mode: 'countdown' | 'stopwatch') => {
    const totalSecs = minutes * 60;
    onUpdateTimer((prev) => ({
      ...prev,
      title,
      mode,
      totalSeconds: totalSecs,
      remainingSeconds: mode === 'countdown' ? totalSecs : 0,
      isRunning: false,
      endTime: null,
      startTime: null,
    }));
    setCustomMinutes(minutes);
  };

  const handleSetCustomTime = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSecs = Math.max(1, customMinutes * 60);
    onUpdateTimer((prev) => ({
      ...prev,
      title: customTitle.trim() || prev.title,
      mode: 'countdown',
      totalSeconds: totalSecs,
      remainingSeconds: totalSecs,
      isRunning: false,
      endTime: null,
      startTime: null,
    }));
  };

  const isCountdown = timer.mode === 'countdown';
  const isTimeUp = isCountdown && displaySeconds <= 0;
  const isWarning = isCountdown && displaySeconds > 0 && displaySeconds <= 300;

  return (
    <div className="space-y-4">
      {/* Top Banner & Overlay Toggle */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Timer Ibadah & Khotbah</span>
            </h4>
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                timer.visible
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {timer.visible ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>ON AIR (LAYAR PROYEKTOR)</span>
                </>
              ) : (
                <span>HANYA OPERATOR (OFF AIR)</span>
              )}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Gunakan untuk memantau durasi khotbah, pujian & penyembahan, atau countdown pembukaan
          </p>
        </div>

        {/* Master Projector Overlay Toggle */}
        <button
          type="button"
          onClick={onToggleTimerOverlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-lg active:scale-95 shrink-0 ${
            timer.visible
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 ring-2 ring-rose-400/40'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
          title="Tampilkan atau sembunyikan timer pada output layar proyektor / TV"
        >
          {timer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>{timer.visible ? 'Sembunyikan dari Proyektor' : 'Tampilkan di Layar Proyektor'}</span>
        </button>
      </div>

      {/* Main Digital Clock Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col items-center justify-center relative overflow-hidden ${
          isTimeUp
            ? 'bg-rose-950/70 border-rose-500/80 shadow-2xl shadow-rose-950/50'
            : isWarning
            ? 'bg-amber-950/50 border-amber-500/70 shadow-2xl shadow-amber-950/40'
            : 'bg-slate-900 border-slate-800 shadow-xl'
        }`}
      >
        {/* Mode & Title Sub-header */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                timer.isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              {timer.title || 'Timer Ibadah'}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 font-bold uppercase">
            <span>{timer.mode === 'countdown' ? 'Hitung Mundur' : 'Stopwatch'}</span>
          </div>
        </div>

        {/* Big Monospace Numbers */}
        <div className="py-2 sm:py-3 flex items-center justify-center">
          <span
            className={`font-mono font-black text-5xl sm:text-6xl md:text-7xl tracking-widest drop-shadow-lg select-none transition-colors ${
              isTimeUp
                ? 'text-rose-400 animate-pulse'
                : isWarning
                ? 'text-amber-400'
                : timer.isRunning
                ? 'text-emerald-400'
                : 'text-white'
            }`}
          >
            {formatTime(displaySeconds)}
          </span>
        </div>

        {/* Status message */}
        {isTimeUp && (
          <div className="mb-3 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shadow">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Waktu Khotbah / Sesi Telah Habis</span>
          </div>
        )}

        {/* Main Controls: Start/Pause, Reset, and Quick Time Extension */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap w-full mt-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition cursor-pointer shadow-lg active:scale-95 ${
              timer.isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
            }`}
          >
            {timer.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{timer.isRunning ? 'Jeda (Pause)' : 'Mulai (Start)'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer active:scale-95"
            title="Reset ke durasi awal"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          {/* Quick extension pills */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleAddMinutes(1)}
              className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-850 hover:bg-slate-700 text-emerald-400 hover:text-white transition cursor-pointer"
              title="Tambah 1 menit secara instan"
            >
              +1m
            </button>
            <button
              type="button"
              onClick={() => handleAddMinutes(5)}
              className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-850 hover:bg-slate-700 text-emerald-400 hover:text-white transition cursor-pointer"
              title="Tambah 5 menit secara instan"
            >
              +5m
            </button>
            <button
              type="button"
              onClick={() => handleAddMinutes(10)}
              className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-850 hover:bg-slate-700 text-emerald-400 hover:text-white transition cursor-pointer"
              title="Tambah 10 menit secara instan"
            >
              +10m
            </button>
            {isCountdown && (
              <button
                type="button"
                onClick={() => handleAddMinutes(-1)}
                className="px-2 py-1 rounded-lg text-xs font-black bg-slate-850 hover:bg-slate-700 text-rose-400 hover:text-white transition cursor-pointer"
                title="Kurangi 1 menit"
              >
                -1m
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Presets Grid */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Preset Durasi Acara Ibadah</span>
        </h5>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { title: 'Khotbah Utama', mins: 45, mode: 'countdown' as const, desc: '45 Menit Khotbah' },
            { title: 'Khotbah Singkat', mins: 30, mode: 'countdown' as const, desc: '30 Menit Khotbah' },
            { title: 'Praise & Worship', mins: 25, mode: 'countdown' as const, desc: '25 Menit Pujian' },
            { title: 'Doa Syafaat', mins: 10, mode: 'countdown' as const, desc: '10 Menit Doa' },
            { title: 'Pra-Ibadah Countdown', mins: 5, mode: 'countdown' as const, desc: '5 Menit Sebelum Ibadah' },
            { title: 'Stopwatch Bebas', mins: 0, mode: 'stopwatch' as const, desc: 'Hitung Maju dari 00:00' },
          ].map((preset, idx) => (
            <button
              key={`preset-${idx}`}
              type="button"
              onClick={() => handleApplyPreset(preset.title, preset.mins, preset.mode)}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-left transition cursor-pointer active:scale-95 group"
            >
              <p className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                {preset.title}
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {preset.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Duration & Title Form */}
      <form
        onSubmit={handleSetCustomTime}
        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Judul / Label Sesi
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Contoh: Khotbah, Praise & Worship, Doa"
              className="w-full bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="w-28">
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Menit Target
            </label>
            <input
              type="number"
              min={1}
              max={180}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer shadow shrink-0 self-end sm:self-auto"
        >
          Terapkan Custom
        </button>
      </form>

      {/* Overlay Appearance & Position Settings */}
      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
        <h5 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Pengaturan Posisi & Gaya Overlay di Layar Proyektor</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Position Selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Posisi di Layar
            </label>
            <select
              value={timer.position || 'top-right'}
              onChange={(e) =>
                onUpdateTimer((prev) => ({
                  ...prev,
                  position: e.target.value as any,
                }))
              }
              className="w-full bg-slate-900 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="top-right">Pojok Kanan Atas (Direkomendasikan)</option>
              <option value="top-left">Pojok Kiri Atas</option>
              <option value="bottom-right">Pojok Kanan Bawah</option>
              <option value="bottom-left">Pojok Kiri Bawah</option>
              <option value="bottom-center">Tengah Bawah (Panggung / Stage Display)</option>
            </select>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-1">
              Gaya Desain Overlay
            </label>
            <select
              value={timer.style || 'glass-badge'}
              onChange={(e) =>
                onUpdateTimer((prev) => ({
                  ...prev,
                  style: e.target.value as any,
                }))
              }
              className="w-full bg-slate-900 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="glass-badge">Kotak Kaca Modern (Glass Badge & Judul)</option>
              <option value="minimal">Teks Digital Minimalis (Tanpa Background)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
