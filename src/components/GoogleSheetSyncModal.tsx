import React, { useState } from 'react';
import {
  FileSpreadsheet,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  Settings,
  Database,
  CloudDownload,
  Info,
} from 'lucide-react';
import { googleSheetService, DEFAULT_SHEET_API_URL } from '../services/googleSheetService';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete: (newSongsCount: number, updatedCount: number, totalCount: number) => void;
  totalLocalSongs: number;
}

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
  totalLocalSongs,
}) => {
  const [apiUrl, setApiUrl] = useState<string>(googleSheetService.getApiUrl());
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState<{
    added: number;
    updated: number;
    total: number;
  } | null>(null);

  const lastSync = googleSheetService.getLastSyncInfo();

  if (!isOpen) return null;

  const handleResetDefaultUrl = () => {
    setApiUrl(DEFAULT_SHEET_API_URL);
    googleSheetService.resetApiUrl();
  };

  const handleSaveUrl = () => {
    googleSheetService.setApiUrl(apiUrl);
    setIsEditingUrl(false);
  };

  const handleExecuteSync = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSyncSuccess(null);

    try {
      // Save current url if modified
      googleSheetService.setApiUrl(apiUrl);

      const cloudSongs = await googleSheetService.fetchSongs(apiUrl);

      // Trigger completion callback which performs the database merge in App.tsx
      onSyncComplete(0, 0, cloudSongs.length);
      setSyncSuccess({
        added: cloudSongs.length,
        updated: 0,
        total: cloudSongs.length,
      });
    } catch (err: any) {
      console.error('Google Sheet Sync Error:', err);
      setErrorMessage(
        err?.message || 'Gagal menyambung ke Google Sheet. Periksa koneksi internet atau URL Anda.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[320] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-850/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 text-emerald-400 border border-emerald-400/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Sinkronisasi Lagu Google Sheet
              </h3>
              <p className="text-xs text-slate-400">
                Tarik perbendaharaan lagu gereja langsung dari spreadsheet
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Theory / Rules Banner */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex gap-3 text-slate-300">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 leading-relaxed">
              <p className="font-bold text-indigo-200">
                Aturan Penggabungan & Perlindungan Versi Lagu:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-300">
                <li>
                  <strong>Lagu dari Google Sheet</strong> menggunakan <em>nomor urut</em> (ID: 1, 2, dst).
                </li>
                <li>
                  <strong>Lagu yang Anda input manual</strong> menggunakan <em>waktu/jam</em> (Timestamp).
                </li>
                <li>
                  Jika Anda memiliki versi kustom manual untuk lagu yang sama, <strong>keduanya tetap tersimpan berdampingan</strong> di perangkat lokal Anda tanpa tertimpa!
                </li>
              </ul>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Database Lokal Saat Ini
              </span>
              <span className="text-lg font-black text-amber-300 mt-0.5 block">
                {totalLocalSongs} Lagu
              </span>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Sync Terakhir
              </span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">
                {lastSync.lastTime || 'Belum pernah sync'}
              </span>
              {lastSync.count > 0 && (
                <span className="text-[10px] text-emerald-400 font-mono">
                  ({lastSync.count} lagu disinkronkan)
                </span>
              )}
            </div>
          </div>

          {/* URL Configuration */}
          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Endpoint Google Apps Script</span>
              </label>
              <div className="flex items-center gap-2">
                {apiUrl !== DEFAULT_SHEET_API_URL && (
                  <button
                    type="button"
                    onClick={handleResetDefaultUrl}
                    className="text-[11px] text-amber-400 hover:underline cursor-pointer"
                  >
                    Reset Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsEditingUrl(!isEditingUrl)}
                  className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                >
                  {isEditingUrl ? 'Batal Edit' : 'Ubah URL'}
                </button>
              </div>
            </div>

            {isEditingUrl ? (
              <div className="space-y-2 pt-1">
                <input
                  type="url"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-slate-950 text-white font-mono text-xs px-3 py-2 rounded-lg border border-slate-600 outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleSaveUrl}
                  className="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg text-xs hover:bg-indigo-500 cursor-pointer"
                >
                  Simpan URL
                </button>
              </div>
            ) : (
              <p className="font-mono text-[11px] text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800 break-all select-all">
                {apiUrl}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold">Gagal Melakukan Sinkronisasi</p>
                <p className="text-[11px] text-rose-200">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {syncSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold">Sinkronisasi Berhasil!</p>
                <p className="text-[11px] text-emerald-200">
                  {syncSuccess.total} lagu berhasil diambil dan disinkronkan ke penyimpanan lokal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-850/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleExecuteSync}
            disabled={isLoading}
            className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl transition flex items-center gap-2 shadow-lg cursor-pointer ${
              isLoading
                ? 'bg-indigo-700 opacity-70 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Sedang Mengambil Lirik...</span>
              </>
            ) : (
              <>
                <CloudDownload className="w-4 h-4" />
                <span>Sinkronkan Sekarang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
