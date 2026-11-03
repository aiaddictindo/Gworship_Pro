import React from 'react';
import { BookOpen, Download, FileSpreadsheet, X, Upload } from 'lucide-react';

interface BibleImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BibleImportModal: React.FC<BibleImportModalProps> = ({
  isOpen,
  onClose,
  onFileSelect,
}) => {
  if (!isOpen) return null;

  const sampleCSV = `book,chapter,verse,text
Kejadian,1,1,Pada mulanya Allah menciptakan langit dan bumi.
Kejadian,1,2,Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya.
Yohanes,3,16,"Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal."
Matius,6,33,"Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu."`;

  const downloadSample = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sample_bible_indonesia.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[320] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl text-white overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">
                Import Database Alkitab (CSV)
              </h3>
              <p className="text-xs text-slate-400">
                Mendukung Terjemahan Baru (TB), BIS, KJV, atau terjemahan lainnya
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

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-slate-800/70 p-3.5 rounded-lg border border-slate-700 space-y-2">
            <p className="text-slate-300">
              Format file CSV harus memiliki baris header dengan 4 kolom utama:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-bold">
                book
              </span>
              <span className="font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-bold">
                chapter
              </span>
              <span className="font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-bold">
                verse
              </span>
              <span className="font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800 font-bold">
                text
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              * Bisa juga menggunakan nama kolom: <code>kitab, pasal, ayat, isi</code>. Sistem otomatis mendeteksi pemetaan nama kitab Indonesia (1-66).
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-300 font-semibold">Contoh Baris CSV:</span>
              <button
                onClick={downloadSample}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Format Contoh
              </button>
            </div>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
              {sampleCSV}
            </pre>
          </div>

          <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg text-amber-200/90 text-[11px]">
            ⚡ Database Alkitab disimpan ke <strong>IndexedDB browser lokal</strong>, sehingga puluhan ribu ayat dapat diakses secara instan 100% offline tanpa perlu koneksi internet.
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-800/30 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition cursor-pointer"
          >
            Tutup
          </button>
          <label className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition cursor-pointer">
            <Upload className="w-4 h-4" />
            Pilih File CSV
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                onFileSelect(e);
                onClose();
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
