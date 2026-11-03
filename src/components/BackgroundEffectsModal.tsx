import React from 'react';
import { BackgroundFx } from '../types';
import { BackgroundEffectsControl } from './BackgroundEffectsControl';
import { X, Sliders } from 'lucide-react';

interface BackgroundEffectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bgFx: BackgroundFx;
  onChange: (fx: BackgroundFx) => void;
  onReset: () => void;
  activeSongTitle?: string;
  onApplyToAllSongs?: () => void;
  totalSetlistSongs?: number;
}

export const BackgroundEffectsModal: React.FC<BackgroundEffectsModalProps> = ({
  isOpen,
  onClose,
  bgFx,
  onChange,
  onReset,
  activeSongTitle,
  onApplyToAllSongs,
  totalSetlistSongs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[320] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-850/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-400/20">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Efek & Warna Background
              </h2>
              <p className="text-[11px] text-slate-400">
                Tersinkron otomatis ke layar proyektor secara real-time
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 overflow-y-auto max-h-[75vh]">
          <BackgroundEffectsControl
            bgFx={bgFx}
            onChange={onChange}
            onReset={onReset}
            activeSongTitle={activeSongTitle}
            onApplyToAllSongs={onApplyToAllSongs}
            totalSetlistSongs={totalSetlistSongs}
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            💡 Tip: Ubah warna tema ibadah cukup dengan menggeser <span className="text-amber-300 font-bold">Hue</span>.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
