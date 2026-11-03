import React, { useState, useEffect } from 'react';
import { Song, CustomMediaItem, BackgroundFx, DEFAULT_BG_FX } from '../types';
import { BG_COLOR_PRESETS, getHueColorName } from './BackgroundEffectsControl';
import { AnimatedBgThumbnail } from './AnimatedBgThumbnail';
import { Music, Plus, Sparkles, X, Save, Palette, Video, Code, ImageIcon, Eye, Languages, FileText } from 'lucide-react';
import { formatLyricsWithTranslations } from '../utils/lyricsFormatter';

interface SongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (song: Song) => void;
  songToEdit: Song | null;
  customMediaList?: CustomMediaItem[];
  bgPresets?: { id: string; name: string; desc: string; color: string }[];
}

export const SongModal: React.FC<SongModalProps> = ({
  isOpen,
  onClose,
  onSave,
  songToEdit,
  customMediaList = [],
  bgPresets = [],
}) => {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [category, setCategory] = useState('Praise & Worship');
  const [bgAnim, setBgAnim] = useState<string>('anim-cross');
  const [bgFx, setBgFx] = useState<BackgroundFx>(DEFAULT_BG_FX);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    if (songToEdit) {
      setTitle(songToEdit.title);
      setLyrics(songToEdit.lyrics);
      setCategory(songToEdit.category || 'Praise & Worship');
      setBgAnim(songToEdit.bgAnim || 'anim-cross');
      setBgFx(songToEdit.bgFx || DEFAULT_BG_FX);
    } else {
      setTitle('');
      setLyrics('');
      setCategory('Praise & Worship');
      setBgAnim('anim-cross');
      setBgFx(DEFAULT_BG_FX);
    }
  }, [songToEdit, isOpen]);

  if (!isOpen) return null;

  const insertTag = (tag: string) => {
    setLyrics((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n\n[${tag}]\n` : `[${tag}]\n`;
    });
  };

  const insertTranslation = () => {
    setLyrics((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n(Arti terjemahan bahasa Indonesia)\n` : `(Arti terjemahan bahasa Indonesia)\n`;
    });
  };

  const insertBilingualTemplate = () => {
    setLyrics((prev) => {
      const template = `[V1]\nAmazing grace, how sweet the sound\n(Sungguh besar anugerah-Nya)\nThat saved a wretch like me\n(Yang s'lamatkan jiwaku)\n\n[C1]\nMy chains are gone, I've been set free\n(Rantaiku lepas, 'ku dibebaskan)\nMy God, my Savior has ransomed me\n(Allah Penebusku melunasiku)`;
      const trimmed = prev.trim();
      return trimmed ? `${trimmed}\n\n${template}` : template;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: songToEdit ? songToEdit.id : Date.now(),
      title: title.trim(),
      lyrics: lyrics.trim(),
      category,
      bgAnim,
      bgFx,
    });
    onClose();
  };

  // Combine available backgrounds
  const defaultPresets = bgPresets.length > 0 ? bgPresets : [
    { id: 'anim-cross', name: 'Salib Bercahaya', desc: 'Cross Glow Animasi', color: 'from-amber-600/30 to-amber-950/50' },
    { id: 'anim-stars', name: 'Taburan Bintang', desc: 'Starry Twinkle Cosmos', color: 'from-blue-900/40 to-slate-950' },
    { id: 'grad-1', name: 'Deep Midnight', desc: 'Worship Navy Gradient', color: 'from-slate-900 to-cyan-950' },
    { id: 'grad-4', name: 'Royal Violet', desc: 'Atmosphere Ungu Megah', color: 'from-purple-900 to-indigo-950' },
    { id: 'grad-5', name: 'Emerald Grace', desc: 'Hijau Kedamaian Hidup', color: 'from-emerald-900 to-teal-950' },
    { id: 'grad-6', name: 'Sunrise Praise', desc: 'Warm Radiant Red Glow', color: 'from-rose-900 to-amber-950' },
  ];

  return (
    <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">
                {songToEdit ? 'Edit Lagu & Background' : 'Tambah Lagu Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Latar belakang dan pengaturan warna tersimpan melekat khusus untuk lagu ini
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Judul Lagu <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Bapa Engkau Sungguh Baik"
              className="w-full bg-slate-800 text-white text-sm px-3.5 py-2.5 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Latar Belakang Lagu (Per-Song Background Selection) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Latar Belakang Khusus Lagu Ini</span>
              </label>
              <span className="text-[10px] text-slate-400">
                Menempel otomatis saat lagu dimainkan
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700 bg-slate-950 shadow-md">
                <AnimatedBgThumbnail id={bgAnim} className="w-full h-full object-cover" />
              </div>
              <select
                value={bgAnim}
                onChange={(e) => setBgAnim(e.target.value)}
                className="flex-1 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 outline-none focus:border-amber-400 cursor-pointer"
              >
                <optgroup label="✨ Media Kustom & Animasi 3D">
                  {customMediaList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.type === 'html' ? '⚡ ' : m.type === 'video' ? '🎬 ' : '🖼️ '}
                      {m.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌟 Animasi & Gradien Bawaan">
                  {defaultPresets.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.desc})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Color Presets */}
            <div className="pt-1">
              <div className="text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Tema Warna (Color Grading):</span>
                <span className="text-[10px] text-amber-300 font-mono">
                  Hue: {bgFx.hue}° {getHueColorName(bgFx.hue)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {BG_COLOR_PRESETS.map((p) => {
                  const isSel = (p.fx.hue ?? 0) === bgFx.hue && (p.fx.saturation ?? 100) === bgFx.saturation;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setBgFx({ ...DEFAULT_BG_FX, ...p.fx })}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border transition cursor-pointer shrink-0 ${
                        isSel
                          ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: p.dotColor }}
                      />
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Lirik & Terjemahan
                </label>
                {/* Switch between Editor and Preview */}
                <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('editor')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                      activeTab === 'editor'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Editor Teks</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                      activeTab === 'preview'
                        ? 'bg-amber-500 text-black shadow font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Pratinjau Layar</span>
                  </button>
                </div>
              </div>

              {/* Tag & Translation Inserter */}
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-slate-400 font-semibold mr-0.5">Sisipkan:</span>
                {['V1', 'V2', 'V3', 'C1', 'C2', 'B1', 'E'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => insertTag(tag)}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
                  >
                    [{tag}]
                  </button>
                ))}
                <button
                  type="button"
                  onClick={insertTranslation}
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition cursor-pointer flex items-center gap-1"
                  title="Sisipkan baris terjemahan kurung ()"
                >
                  <Languages className="w-3 h-3" />
                  <span>(Arti)</span>
                </button>
                <button
                  type="button"
                  onClick={insertBilingualTemplate}
                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition cursor-pointer"
                  title="Sisipkan contoh format lagu dwibahasa"
                >
                  Contoh Dwibahasa
                </button>
              </div>
            </div>

            {activeTab === 'editor' ? (
              <textarea
                rows={9}
                required
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="[V1]
Amazing grace, how sweet the sound
(Sungguh besar anugerah-Nya)
That saved a wretch like me
(Yang s'lamatkan jiwaku)

[C1]
My chains are gone, I've been set free
(Rantaiku lepas, 'ku dibebaskan)"
                className="w-full flex-1 bg-slate-800 text-white font-mono text-xs sm:text-sm p-3 rounded-lg border border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed resize-none transition"
              />
            ) : (
              <div className="w-full flex-1 min-h-[190px] max-h-[220px] overflow-y-auto bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center relative shadow-inner">
                <div className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Pratinjau Output Layar Proyektor:
                </div>
                {lyrics.trim() ? (
                  <div
                    className="w-full text-base sm:text-lg leading-snug"
                    dangerouslySetInnerHTML={{
                      __html: formatLyricsWithTranslations(lyrics),
                    }}
                  />
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Belum ada lirik. Tulis lirik di tab Editor Teks untuk melihat pratinjau.
                  </span>
                )}
              </div>
            )}

            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 mt-2 text-[11px] text-slate-300 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Languages className="w-3.5 h-3.5" />
                <span>Format Penulisan Terjemahan / Bahasa Daerah / Inggris:</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Ketik terjemahan bahasa Indonesia di dalam tanda kurung <code className="text-amber-300 font-mono font-bold">(...)</code> tepat di bawah baris lirik asli (atau di sampingnya). Teks di dalam kurung otomatis berukuran <strong>sepertiga (~40%)</strong>, berhuruf <strong>miring (italic)</strong>, dan berwarna <strong>emas lembut</strong> di layar proyektor.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Simpan Lagu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
