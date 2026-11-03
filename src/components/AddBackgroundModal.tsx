import React, { useState } from 'react';
import { CustomMediaItem } from '../types';
import { DEFAULT_GOLDEN_CROSS_HTML, DEFAULT_BUILTIN_HTML_BACKGROUNDS } from '../db/defaultData';
import { AnimatedBgThumbnail } from './AnimatedBgThumbnail';
import {
  X,
  Upload,
  Code,
  Image,
  Video,
  FileCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';

interface AddBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMedia: (item: CustomMediaItem) => void;
}

export const AddBackgroundModal: React.FC<AddBackgroundModalProps> = ({
  isOpen,
  onClose,
  onSaveMedia,
}) => {
  const [tab, setTab] = useState<'upload' | 'code'>('upload');

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'image' | 'video' | 'html'>('image');
  const [mediaData, setMediaData] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSizeText, setFileSizeText] = useState('');
  const [htmlCode, setHtmlCode] = useState(DEFAULT_GOLDEN_CROSS_HTML);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setFileName(file.name);
    setFileSizeText(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const defaultTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    if (!name) {
      setName(defaultTitle);
    }

    if (file.type.startsWith('image/')) {
      setType('image');
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      setType('video');
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.name.endsWith('.html') || file.type.includes('html')) {
      setType('html');
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setMediaData(text);
        setHtmlCode(text);
      };
      reader.readAsText(file);
    } else {
      setErrorMsg('Format file tidak didukung. Harap pilih Gambar (.jpg, .png, .webp), Video (.mp4, .webm), atau file .html.');
    }
  };

  const handleSave = () => {
    const finalName = name.trim() || (tab === 'code' ? 'Animasi Salib Emas 3D' : fileName || 'Latar Baru');
    const finalData = tab === 'code' ? htmlCode : mediaData;
    const finalType = tab === 'code' ? 'html' : type;

    if (!finalData) {
      setErrorMsg(tab === 'code' ? 'Kode HTML tidak boleh kosong.' : 'Silakan pilih file gambar, video, atau HTML terlebih dahulu.');
      return;
    }

    const prefix = finalType === 'image' ? 'img' : finalType === 'video' ? 'vid' : 'html';
    const newMedia: CustomMediaItem = {
      id: `${prefix}-${Date.now()}`,
      name: finalName,
      type: finalType,
      data: finalData,
      dateAdded: Date.now(),
    };

    onSaveMedia(newMedia);
    onClose();
    // Reset state
    setName('');
    setMediaData('');
    setFileName('');
    setFileSizeText('');
  };

  return (
    <div className="fixed inset-0 z-[360] bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-850/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-400/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Tambah Latar Belakang (Gambar / Video / HTML)
              </h3>
              <p className="text-xs text-slate-400">
                Simpan media lokal di perangkat secara offline untuk presentasi ibadah
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

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-2 gap-2">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              tab === 'upload'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload File (Gambar / Video / HTML)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('code');
              setType('html');
              if (!name) setName('Animasi Salib Emas 3D');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              tab === 'code'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Editor / Input Kode HTML</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Nama / Judul Latar Belakang
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Salib Emas 3D, Video Awan Loop, Background Paskah..."
              className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* TAB 1: UPLOAD FILE */}
          {tab === 'upload' && (
            <div className="space-y-3">
              <label className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500/70 bg-slate-950/50 hover:bg-slate-900/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition group">
                <input
                  type="file"
                  accept="image/*,video/mp4,video/webm,.html,text/html"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 group-hover:bg-indigo-500/30 text-indigo-400 flex items-center justify-center transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-200">
                    Klik atau Seret File ke Sini
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Format yang didukung: <strong className="text-indigo-300">Gambar</strong> (JPG, PNG, WebP), <strong className="text-purple-300">Video</strong> (MP4, WebM), atau <strong className="text-amber-300">File HTML</strong>
                  </p>
                </div>
                {fileName && (
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{fileName} ({fileSizeText})</span>
                  </div>
                )}
              </label>

              {/* Media Preview Box */}
              {mediaData && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-bold">
                      <Eye className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Pratinjau ({type.toUpperCase()})</span>
                    </span>
                    <span className="text-[11px] font-mono">{fileSizeText}</span>
                  </div>
                  <div className="w-full h-44 rounded-xl border border-slate-800 bg-black overflow-hidden relative shadow-inner">
                    {type === 'image' && (
                      <img
                        src={mediaData}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {type === 'video' && (
                      <video
                        src={mediaData}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                    {type === 'html' && (
                      <iframe
                        srcDoc={mediaData}
                        title="HTML Preview"
                        className="w-full h-full border-none pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CODE EDITOR */}
          {tab === 'code' && (
            <div className="space-y-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-amber-400" />
                    <span>Kode HTML / CSS / JS Lengkap</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Pilih template awal untuk diedit:</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {DEFAULT_BUILTIN_HTML_BACKGROUNDS.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => {
                        setHtmlCode(tpl.data);
                        if (!name) setName(tpl.name + ' (Kustom)');
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-400/50 transition cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <div className="w-5 h-3.5 rounded overflow-hidden shrink-0 border border-slate-700/80 bg-black">
                        <AnimatedBgThumbnail id={tpl.id} name={tpl.name} className="w-full h-full object-cover" />
                      </div>
                      <span>{tpl.name.split(' (')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                rows={9}
                placeholder="<!DOCTYPE html><html><head><style>...</style></head><body>...</body></html>"
                className="w-full bg-slate-950 font-mono text-[11px] text-emerald-400 p-3 rounded-xl border border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {/* Live Preview Box */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Pratinjau Langsung Animasi HTML:</span>
                </span>
                <div className="w-full h-44 rounded-xl border border-slate-800 bg-black overflow-hidden relative shadow-inner">
                  <iframe
                    srcDoc={htmlCode}
                    title="Live HTML Preview"
                    className="w-full h-full border-none pointer-events-none"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-850/90 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan & Terapkan Latar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
