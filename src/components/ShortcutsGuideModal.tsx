import React from 'react';
import {
  Keyboard,
  Smartphone,
  X,
  Tv,
  CheckCircle2,
  Zap,
  Languages,
} from 'lucide-react';

interface ShortcutsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsGuideModal: React.FC<ShortcutsGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const keyGroups = [
    {
      title: '1. Navigasi Dasar (Pindah Slide & Item)',
      icon: <Keyboard className="w-4 h-4 text-indigo-400" />,
      items: [
        { key: 'Panah Kanan (➡️)', desc: 'Pindah ke bagian lirik/ayat berikutnya (Next Slide)' },
        { key: 'Panah Kiri (⬅️)', desc: 'Pindah ke bagian lirik/ayat sebelumnya (Prev Slide)' },
        { key: 'Panah Bawah (⬇️)', desc: 'Pindah ke Lagu atau Ayat berikutnya yang ada di dalam Setlist' },
        { key: 'Panah Atas (⬆️)', desc: 'Pindah ke Lagu atau Ayat sebelumnya yang ada di dalam Setlist' },
        { key: 'Angka 1 - 9', desc: 'Langsung memuat Lagu/Ayat dari Setlist sesuai urutan nomornya (1 untuk urutan pertama, dst)' },
      ],
    },
    {
      title: '2. Navigasi Cepat Lirik Lagu (Lompat Bagian)',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      items: [
        { key: 'Q', desc: 'Verse 1 (Bait 1)' },
        { key: 'W', desc: 'Verse 2 (Bait 2)' },
        { key: 'E', desc: 'Verse 3 (Bait 3)' },
        { key: 'R', desc: 'Verse 4 (Bait 4)' },
        { key: 'A', desc: 'Chorus 1' },
        { key: 'S', desc: 'Chorus 2' },
        { key: 'D', desc: 'Chorus 3' },
        { key: 'Z', desc: 'Bridge (B1)' },
        { key: 'X', desc: 'Ending (E)' },
      ],
    },
    {
      title: '3. Kontrol Tampilan Layar Utama',
      icon: <Tv className="w-4 h-4 text-purple-400" />,
      items: [
        { key: 'C', desc: 'Clear Text: Menyembunyikan / memunculkan kembali teks lirik di layar' },
        { key: 'B', desc: 'Black Screen: Menggelapkan layar secara total / mengembalikan layar seperti semula' },
        { key: 'L', desc: 'Tampilan Eksternal: Membuka tab jendela Display baru (untuk digeser ke proyektor)' },
        { key: 'M', desc: 'Perbesar Huruf: Menambah ukuran font teks di layar (+0.5)' },
        { key: 'N', desc: 'Perkecil Huruf: Mengurangi ukuran font teks di layar (-0.5)' },
        { key: 'F / F11', desc: 'Mode Fullscreen (Layar Penuh Proyektor)' },
        { key: 'Esc / F2', desc: 'Buka / Tutup Panel Kontrol Operator / Keluar Modal' },
      ],
    },
    {
      title: '4. Overlays (Tampilan Gambar Tambahan)',
      icon: <Tv className="w-4 h-4 text-blue-400" />,
      items: [
        { key: 'P', desc: 'Menampilkan / menyembunyikan overlay Logo' },
        { key: 'I', desc: 'Menampilkan / menyembunyikan overlay Intro (Welcome)' },
        { key: 'O', desc: 'Menampilkan / menyembunyikan overlay Outro (Goodbye)' },
      ],
    },
    {
      title: '5. Gestur Layar Sentuh (Touchscreen)',
      icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
      items: [
        { key: 'Ketuk (Tap) Kanan Sekali', desc: 'Pindah ke lirik / slide berikutnya' },
        { key: 'Ketuk (Tap) Kanan 2 Kali', desc: 'Pindah ke lagu / ayat berikutnya di setlist' },
        { key: 'Ketuk (Tap) Kiri Sekali', desc: 'Pindah ke lirik / slide sebelumnya' },
        { key: 'Ketuk (Tap) Kiri 2 Kali', desc: 'Pindah ke lagu / ayat sebelumnya di setlist' },
        { key: 'Ketuk (Tap) Tengah', desc: 'Buka / Tutup Menu Kontrol Operator' },
        { key: 'Usap (Swipe) Kanan', desc: 'Mengaktifkan/mematikan layar gelap (Black Screen)' },
        { key: 'Usap (Swipe) Kiri', desc: 'Menyembunyikan/memunculkan teks (Clear Text)' },
        { key: 'Usap (Swipe) Atas', desc: 'Langsung lompat ke Verse 1 (Bait 1)' },
        { key: 'Usap (Swipe) Bawah', desc: 'Langsung lompat ke Chorus 1' },
        { key: 'Cubit (Pinch)', desc: 'Memperbesar atau memperkecil ukuran font teks secara manual' },
      ],
    },
    {
      title: '6. Format Lirik Dwibahasa (Lagu Daerah & Inggris)',
      icon: <Languages className="w-4 h-4 text-amber-400" />,
      items: [
        {
          key: '(Teks Terjemahan)',
          desc: 'Tulis teks dalam kurung () di bawah lirik asli. Otomatis diformat dengan persentase ukuran (default 40%, dapat disetel hingga 65-75% untuk Ibadah Lansia di tab TAMPILAN), berhuruf miring (italic), dan berwarna emas lembut.',
        },
        {
          key: '[V1], [C1], [B1], [E]',
          desc: 'Tag pembagi slide lagu: [V1] untuk Bait 1, [C1] untuk Chorus, [B1] untuk Bridge, [E] untuk Ending.',
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-[360] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-850/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 text-amber-400 border border-amber-400/20">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                Panduan Lengkap Pintasan Keyboard & Gestur Layar
              </h3>
              <p className="text-xs text-slate-400">
                Semua shortcut keyboard, ketukan layar, dan usapan gestur HP/PC (GWorship)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pro-Tips Screen Mirroring Banner */}
        <div className="px-5 pt-4 pb-1">
          <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-500/30 flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 mt-0.5 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-bold text-indigo-200">
                Mode Presentasi Layar HP (Screen Mirroring ke TV / Proyektor):
              </p>
              <p className="text-slate-300 leading-relaxed">
                Tutup panel dengan tombol hijau{' '}
                <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  TAMPILKAN KE LAYAR (BERSIH)
                </span>
                . Saat panel tertutup, gunakan ketukan (Tap), usapan (Swipe), atau tombol keyboard / presenter Logitech untuk mengendalikan lagu secara mulus tanpa mengganggu pandangan jemaat.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyGroups.map((group, gIdx) => (
            <div
              key={`group-${gIdx}`}
              className="bg-slate-850/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5"
            >
              <div className="flex items-center gap-2 border-b border-slate-750 pb-2">
                {group.icon}
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  {group.title}
                </h4>
              </div>

              <div className="space-y-1.5">
                {group.items.map((item, iIdx) => (
                  <div
                    key={`item-${gIdx}-${iIdx}`}
                    className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-2"
                  >
                    <span className="font-mono bg-slate-950 px-2.5 py-1 rounded-md text-xs font-black text-amber-300 border border-slate-700 shrink-0 shadow-sm">
                      {item.key}
                    </span>
                    <span className="text-slate-300 text-right text-[11px] font-medium leading-tight">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-850/90 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Tekan <strong>Esc</strong> atau tombol Tutup kapan saja
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            Mengerti & Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
