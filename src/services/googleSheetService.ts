import { Song } from '../types';

export const DEFAULT_SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycbyGI8OiB0xcg6-F0K1BXjW-J7uXo5lnai4_FF9r2FhkWKL0WxHpHMPecLeYrmPEOHuhxg/exec';

const STORAGE_KEY_URL = 'gworship_sheet_api_url';
const STORAGE_KEY_LAST_TIME = 'gworship_last_sheet_sync_time';
const STORAGE_KEY_LAST_COUNT = 'gworship_last_sheet_sync_count';

export interface RawCloudSong {
  ID: number | string;
  Judul: string;
  Lirik: string;
}

export interface SyncResult {
  updatedSongs: Song[];
  addedCount: number;
  updatedCount: number;
  identicalCount: number;
  duplicatesRemovedCount: number;
  totalCloud: number;
}

export const normalizeTitle = (title: string): string => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const normalizeLyrics = (lyrics: string): string => {
  if (!lyrics) return '';
  return lyrics
    .toLowerCase()
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Abaikan tag header seperti [V1], [C1], [B], [Verse 1], dsb agar perbedaan penulisan tag tidak memicu duplikasi
    .replace(/\[[^\]]+\]/g, '')
    // Hapus tanda baca dan normalkan spasi
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const googleSheetService = {
  getApiUrl(): string {
    if (typeof window === 'undefined') return DEFAULT_SHEET_API_URL;
    return localStorage.getItem(STORAGE_KEY_URL) || DEFAULT_SHEET_API_URL;
  },

  setApiUrl(url: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY_URL, url.trim());
  },

  resetApiUrl() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY_URL);
  },

  getLastSyncInfo(): { lastTime: string | null; count: number } {
    if (typeof window === 'undefined') return { lastTime: null, count: 0 };
    const lastTime = localStorage.getItem(STORAGE_KEY_LAST_TIME);
    const count = parseInt(localStorage.getItem(STORAGE_KEY_LAST_COUNT) || '0', 10);
    return { lastTime, count };
  },

  async fetchSongs(customUrl?: string): Promise<RawCloudSong[]> {
    const targetUrl = (customUrl || this.getApiUrl()).trim();
    if (!targetUrl) {
      throw new Error('URL Google Sheet belum diatur.');
    }

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari Google Sheet (HTTP ${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Format data dari Google Apps Script harus berupa array JSON.');
    }

    // Filter valid song items
    return data.filter(
      (item): item is RawCloudSong =>
        item &&
        typeof item === 'object' &&
        typeof item.Judul === 'string' &&
        item.Judul.trim().length > 0 &&
        typeof item.Lirik === 'string'
    );
  },

  /**
   * Aturan Sinkronisasi Cerdas & Anti-Duplikasi:
   * - Mengecek apakah lagu dari versi aplikasi sebelumnya sudah diunduh atau ada di lokal.
   * - Jika Judul DAN Lirik 100% sama persis: TIDAK DIBUAT DUA VERSI. Versi lokal dipertahankan dan disinkronkan.
   * - Jika Judul sama tapi ada revisi lirik di spreadsheet: Lagu lokal diperbarui ke lirik terbaru (tanpa membuat duplikat).
   * - Menjalankan pembersihan menyeluruh terhadap duplikat yang mungkin sudah ada sebelumnya.
   */
  mergeSongs(currentSongs: Song[], cloudSongs: RawCloudSong[]): SyncResult {
    let addedCount = 0;
    let updatedCount = 0;
    let identicalCount = 0;
    let duplicatesRemovedCount = 0;

    // Salin daftar lagu saat ini
    const resultList = [...currentSongs];

    for (let index = 0; index < cloudSongs.length; index++) {
      const cloudItem = cloudSongs[index];
      const parsedId = Number(cloudItem.ID);
      const targetId = !isNaN(parsedId) && parsedId > 0 ? parsedId : index + 1;
      const cleanTitle = cloudItem.Judul.trim();
      const cleanLyrics = cloudItem.Lirik.trim();

      const normCloudTitle = normalizeTitle(cleanTitle);
      const normCloudLyrics = normalizeLyrics(cleanLyrics);

      // Cari lagu yang sudah ada di lokal:
      // 1. Cek berdasarkan ID numerik cloud yang sama
      let existingIdx = resultList.findIndex(
        (s) => Number(s.id) === targetId || String(s.id) === String(cloudItem.ID)
      );

      // 2. Jika tidak cocok via ID, cek apakah ada lagu dengan Judul yang sama persis
      if (existingIdx === -1) {
        existingIdx = resultList.findIndex(
          (s) => normalizeTitle(s.title) === normCloudTitle
        );
      }

      if (existingIdx !== -1) {
        const existingSong = resultList[existingIdx];
        const normExistingLyrics = normalizeLyrics(existingSong.lyrics);
        const isIdentical = normExistingLyrics === normCloudLyrics;

        if (isIdentical) {
          // 100% SAMA PERSIS: Jangan buat dua versi!
          // Pertahankan data lokal dan sinkronkan ID-nya agar konsisten
          resultList[existingIdx] = {
            ...existingSong,
            id: targetId,
            title: cleanTitle,
          };
          identicalCount++;
        } else {
          // Judul sama, ada revisi lirik di Google Sheet: perbarui liriknya
          resultList[existingIdx] = {
            ...existingSong,
            id: targetId,
            title: cleanTitle,
            lyrics: cleanLyrics,
          };
          updatedCount++;
        }
      } else {
        // Lagu benar-benar baru
        resultList.push({
          id: targetId,
          title: cleanTitle,
          lyrics: cleanLyrics,
          category: 'Praise & Worship',
          bgAnim: 'anim-cross',
        });
        addedCount++;
      }
    }

    // Pembersihan duplikat lanjutan (jika di penyimpanan lokal sebelumnya sudah terlanjur ada lagu ganda)
    const cleanList: Song[] = [];
    const seenSongKeys = new Set<string>();

    for (const song of resultList) {
      const key = `${normalizeTitle(song.title)}||${normalizeLyrics(song.lyrics)}`;
      if (!seenSongKeys.has(key)) {
        seenSongKeys.add(key);
        cleanList.push(song);
      } else {
        duplicatesRemovedCount++;
      }
    }

    // Urutkan alfabetis berdasarkan Judul
    cleanList.sort((a, b) => a.title.localeCompare(b.title, 'id', { sensitivity: 'base' }));

    // Simpan metadata waktu sinkronisasi
    if (typeof window !== 'undefined') {
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

      localStorage.setItem(STORAGE_KEY_LAST_TIME, formattedDate);
      localStorage.setItem(STORAGE_KEY_LAST_COUNT, String(cloudSongs.length));
    }

    return {
      updatedSongs: cleanList,
      addedCount,
      updatedCount,
      identicalCount,
      duplicatesRemovedCount,
      totalCloud: cloudSongs.length,
    };
  },
};
