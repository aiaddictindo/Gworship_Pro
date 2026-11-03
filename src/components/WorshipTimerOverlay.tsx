import React, { useState, useEffect } from 'react';
import { WorshipTimerState } from '../types';
import { Clock, AlertTriangle, CheckCircle2, Play, Pause } from 'lucide-react';

interface WorshipTimerOverlayProps {
  timer?: WorshipTimerState;
}

export const WorshipTimerOverlay: React.FC<WorshipTimerOverlayProps> = ({ timer }) => {
  const [displaySeconds, setDisplaySeconds] = useState<number>(timer?.remainingSeconds ?? 0);

  useEffect(() => {
    if (!timer) return;

    if (!timer.isRunning) {
      setDisplaySeconds(timer.remainingSeconds);
      return;
    }

    const updateTime = () => {
      const now = Date.now();
      if (timer.mode === 'countdown') {
        if (timer.endTime) {
          const diff = Math.max(0, Math.ceil((timer.endTime - now) / 1000));
          setDisplaySeconds(diff);
        } else {
          setDisplaySeconds(timer.remainingSeconds);
        }
      } else {
        // stopwatch
        if (timer.startTime) {
          const diff = Math.max(0, Math.floor((now - timer.startTime) / 1000));
          setDisplaySeconds(diff);
        } else {
          setDisplaySeconds(timer.remainingSeconds);
        }
      }
    };

    updateTime();
    if (!timer?.isRunning || !timer?.visible) {
      return;
    }
    const interval = setInterval(updateTime, 250);
    return () => clearInterval(interval);
  }, [timer?.isRunning, timer?.visible, timer?.endTime, timer?.startTime, timer?.mode, timer?.remainingSeconds]);

  if (!timer || !timer.visible) return null;

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

  const isCountdown = timer.mode === 'countdown';
  const isTimeUp = isCountdown && displaySeconds <= 0;
  const isUrgent = isCountdown && displaySeconds > 0 && displaySeconds <= 60;
  const isWarning = isCountdown && displaySeconds > 60 && displaySeconds <= 300;

  const positionClasses = {
    'top-right': 'top-4 right-4 sm:top-6 sm:right-6',
    'top-left': 'top-4 left-4 sm:top-6 sm:left-6',
    'bottom-right': 'bottom-16 right-4 sm:bottom-16 sm:right-6',
    'bottom-left': 'bottom-16 left-4 sm:bottom-16 sm:left-6',
    'bottom-center': 'bottom-16 left-1/2 -translate-x-1/2 sm:bottom-16',
  }[timer.position || 'top-right'];

  // Minimal mode
  if (timer.style === 'minimal') {
    return (
      <div
        className={`absolute z-30 pointer-events-none select-none ${positionClasses} transition-all duration-300`}
      >
        <div
          className={`flex flex-col items-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] ${
            isTimeUp
              ? 'text-rose-500 animate-pulse'
              : isUrgent
              ? 'text-rose-400'
              : isWarning
              ? 'text-amber-400'
              : 'text-white'
          }`}
          style={{ textShadow: '0 2px 8px #000, 0 4px 20px #000' }}
        >
          {timer.title && (
            <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-slate-300 drop-shadow mb-0.5">
              {timer.title}
            </span>
          )}
          <span className="font-mono font-black text-2xl sm:text-4xl md:text-5xl tracking-widest">
            {formatTime(displaySeconds)}
          </span>
          {isTimeUp && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-600 text-white px-2 py-0.5 rounded mt-1 shadow-lg">
              WAKTU HABIS
            </span>
          )}
        </div>
      </div>
    );
  }

  // Glass badge mode (Default)
  return (
    <div
      className={`absolute z-30 pointer-events-none select-none ${positionClasses} transition-all duration-300`}
    >
      <div
        className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl backdrop-blur-md shadow-2xl border flex flex-col items-center gap-0.5 transition-colors duration-300 ${
          isTimeUp
            ? 'bg-rose-950/85 border-rose-500 text-rose-200 shadow-rose-950/60 ring-2 ring-rose-500/50 animate-pulse'
            : isUrgent
            ? 'bg-rose-950/75 border-rose-500/80 text-rose-200 shadow-rose-950/40'
            : isWarning
            ? 'bg-amber-950/75 border-amber-500/80 text-amber-200 shadow-amber-950/40'
            : 'bg-black/80 border-white/20 text-white shadow-black/80'
        }`}
      >
        {/* Header / Title */}
        <div className="flex items-center gap-1.5 w-full justify-between pb-0.5 border-b border-white/10">
          <div className="flex items-center gap-1 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isTimeUp
                  ? 'bg-rose-500 animate-ping'
                  : timer.isRunning
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300 truncate max-w-[120px] sm:max-w-[180px]">
              {timer.title || (isCountdown ? 'Hitung Mundur' : 'Stopwatch')}
            </span>
          </div>

          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-400 font-bold uppercase shrink-0">
            {timer.mode}
          </span>
        </div>

        {/* Digital Time Display */}
        <div className="flex items-center gap-2 pt-0.5">
          <Clock
            className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${
              isTimeUp
                ? 'text-rose-400'
                : isUrgent
                ? 'text-rose-400'
                : isWarning
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          />
          <span className="font-mono font-black text-xl sm:text-3xl md:text-4xl tracking-wider drop-shadow-md">
            {formatTime(displaySeconds)}
          </span>
        </div>

        {/* Time's up banner */}
        {isTimeUp && (
          <div className="text-[9px] sm:text-[10px] font-black text-white bg-rose-600 px-2 py-0.5 rounded-full uppercase tracking-widest mt-0.5 flex items-center gap-1 shadow">
            <AlertTriangle className="w-3 h-3" />
            <span>Waktu Selesai</span>
          </div>
        )}
      </div>
    </div>
  );
};
