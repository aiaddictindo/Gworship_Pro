import React, { useState } from 'react';
import { SavedSetlist, Song, BibleVerse } from '../types';
import {
  X,
  FolderOpen,
  Plus,
  Download,
  Upload,
  Trash2,
  Calendar,
  CheckCircle2,
  Music,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  FileJson,
  Tag,
} from 'lucide-react';

interface SetlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSetlists: SavedSetlist[];
  activeSetlistId: string | null;
  currentSongs: Song[];
  currentBibleVerses: BibleVerse[];
  onLoadSetlist: (setlist: SavedSetlist) => void;
  onSaveCurrentSetlist: (name: string, serviceType: string, date: string, desc: string) => void;
  onDeleteSetlist: (id: string) => void;
  onImportSetlistJSON: (file: File) => void;
  onExportSetlistJSON: (setlist: SavedSetlist) => void;
}

export const SetlistModal: React.FC<SetlistModalProps> = ({
  isOpen,
  onClose,
  savedSetlists,
  activeSetlistId,
  currentSongs,
  currentBibleVerses,
  onLoadSetlist,
  onSaveCurrentSetlist,
  onDeleteSetlist,
  onImportSetlistJSON,
  onExportSetlistJSON,
}) => {
  const [viewMode, setViewMode] = useState<'LIST' | 'SAVE_FORM'>('LIST');
  const [searchQuery, setSearchQuery] = useState('');

  // Save Form State
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState('Ibadah Raya 1');
  const [serviceDate, setServiceDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const filteredSetlists = savedSetlists.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.serviceType && s.serviceType.toLowerCase().includes(q)) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      s.songs.some((song) => song.title.toLowerCase().includes(q))
    );
  });

  const handleStartSave = () => {
    const existing = savedSetlists.find((s) => s.id === activeSetlistId);
    if (existing) {
      setName(existing.name);
      setServiceType(existing.serviceType || 'Ibadah Raya 1');
      setServiceDate(existing.serviceDate || new Date().toISOString().slice(0, 10));
      setDescription(existing.description || '');
    } else {
      const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });
      setName(`Ibadah - ${today}`);
      setServiceType('Ibadah Raya 1');
      setServiceDate(new Date().toISOString().slice(0, 10));
      setDescription('');
    }
    setViewMode('SAVE_FORM');
  };

  const handleConfirmSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveCurrentSetlist(name.trim(), serviceType, serviceDate, description.trim());
    setViewMode('LIST');
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImportSetlistJSON(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-[360] bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-850/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Manajemen Setlist Ibadah (Preset Lokal)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  IndexedDB
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Simpan, ganti antar ibadah mingguan, dan backup file (.json) tanpa harus menyusun ulang
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

        {/* Action Top Bar */}
        <div className="bg-slate-950/60 p-3 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
          {viewMode === 'LIST' ? (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleStartSave}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-95"
                  title="Simpan susunan lagu & firman yang sedang aktif saat ini ke daftar setlist"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan Setlist Saat Ini ({currentSongs.length + currentBibleVerses.length} Item)</span>
                </button>

                <label className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border border-slate-700 shadow active:scale-95">
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Import Setlist (.json)</span>
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </div>

              {savedSetlists.length > 0 && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari setlist ibadah..."
                  className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl border border-slate-800 outline-none focus:border-indigo-500 w-full sm:w-48"
                />
              )}
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Form Simpan Setlist Baru</span>
              </span>
              <button
                type="button"
                onClick={() => setViewMode('LIST')}
                className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              >
                Kembali ke Daftar
              </button>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {viewMode === 'SAVE_FORM' ? (
            <form onSubmit={handleConfirmSave} className="space-y-4 max-w-xl mx-auto">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-indigo-200">
                  Isi Setlist Saat Ini yang Akan Disimpan:
                </p>
                <p className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Music className="w-3.5 h-3.5" /> {currentSongs.length} Lagu
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <BookOpen className="w-3.5 h-3.5" /> {currentBibleVerses.length} Ayat Alkitab
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Nama Setlist / Judul Ibadah <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ibadah Raya 1 (Minggu Pagi) - 29 Sep 2026"
                  className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Jenis Ibadah
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
                  >
                    <option value="Ibadah Raya 1">Ibadah Raya 1 (Pagi)</option>
                    <option value="Ibadah Raya 2">Ibadah Raya 2 (Siang)</option>
                    <option value="Ibadah Raya 3">Ibadah Raya 3 (Sore)</option>
                    <option value="Ibadah Pemuda">Ibadah Pemuda / Youth</option>
                    <option value="Ibadah Remaja">Ibadah Remaja / Teens</option>
                    <option value="Sekolah Minggu">Sekolah Minggu / Anak</option>
                    <option value="Ibadah Doa">Ibadah Doa & Puasa</option>
                    <option value="Kebaktian Khusus">Kebaktian Khusus (Natal / Paskah)</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Catatan / Keterangan (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contoh: Tema khotbah 'Kemenangan Dalam Iman', pelayan worship team kelompok 2..."
                  className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('LIST')}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simpan ke IndexedDB</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {filteredSetlists.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {searchQuery ? 'Tidak ada setlist yang cocok dengan pencarian.' : 'Belum ada setlist yang disimpan.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleStartSave}
                    className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Simpan Setlist Saat Ini</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {filteredSetlists.map((setlist) => {
                    const isCurrentlyActive = setlist.id === activeSetlistId;
                    return (
                      <div
                        key={setlist.id}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                          isCurrentlyActive
                            ? 'bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-400/40 shadow-xl'
                            : 'bg-slate-850/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                        }`}
                      >
                        {/* Info Column */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-black text-white truncate">
                              {setlist.name}
                            </h4>
                            {isCurrentlyActive && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Sedang Dipakai
                              </span>
                            )}
                            {setlist.serviceType && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 border border-slate-700">
                                {setlist.serviceType}
                              </span>
                            )}
                            {setlist.serviceDate && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                {setlist.serviceDate}
                              </span>
                            )}
                          </div>

                          {setlist.description && (
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {setlist.description}
                            </p>
                          )}

                          {/* Song list preview chips */}
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700/80">
                              <Music className="w-3 h-3 text-indigo-400" />
                              {setlist.songs?.length || 0} Lagu
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700/80">
                              <BookOpen className="w-3 h-3 text-amber-400" />
                              {setlist.bibleVerses?.length || 0} Ayat
                            </span>
                            {setlist.songs?.slice(0, 3).map((s, idx) => (
                              <span
                                key={`chip-${setlist.id}-${s.id}-${idx}`}
                                className="text-[10px] text-slate-300 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[140px]"
                              >
                                {idx + 1}. {s.title}
                              </span>
                            ))}
                            {(setlist.songs?.length || 0) > 3 && (
                              <span className="text-[10px] text-slate-500">
                                +{(setlist.songs?.length || 0) - 3} lainnya
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions Column */}
                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                          {/* Export JSON Button */}
                          <button
                            type="button"
                            onClick={() => onExportSetlistJSON(setlist)}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-750 transition cursor-pointer shadow"
                            title="Export Setlist ke file .json"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Hapus setlist "${setlist.name}" dari IndexedDB?`)) {
                                onDeleteSetlist(setlist.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 border border-slate-750 transition cursor-pointer shadow"
                            title="Hapus Setlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Load / Apply Button */}
                          <button
                            type="button"
                            onClick={() => {
                              onLoadSetlist(setlist);
                              onClose();
                            }}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow active:scale-95 ${
                              isCurrentlyActive
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                : 'bg-indigo-600 text-white hover:bg-indigo-500'
                            }`}
                          >
                            <span>{isCurrentlyActive ? 'Muat Ulang' : 'Pilih Ibadah Ini'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-850/90 flex items-center justify-between text-xs text-slate-400">
          <span>
            Total: <strong>{savedSetlists.length}</strong> Setlist tersimpan di IndexedDB
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
