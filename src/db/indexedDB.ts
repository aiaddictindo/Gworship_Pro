import { Song, BibleVerse, GradientSlot, CustomMediaItem, SavedSetlist } from '../types';
import { normalizeTitle, normalizeLyrics } from '../services/googleSheetService';
import {
  DEFAULT_SONGS,
  DEFAULT_BIBLE_VERSES,
  DEFAULT_GRADIENTS,
  DEFAULT_GOLDEN_CROSS_HTML,
  DEFAULT_CHRISTMAS_TREE_HTML,
  DEFAULT_BUILTIN_HTML_BACKGROUNDS,
  normalizeBookName,
  INDO_BIBLE_BOOKS,
} from './defaultData';

const DB_NAME = 'GWorshipPro_DB';
const DB_VERSION = 1;

class WorshipDatabase {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB is not supported'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Songs store
        if (!db.objectStoreNames.contains('songs')) {
          const songStore = db.createObjectStore('songs', { keyPath: 'id' });
          songStore.createIndex('title', 'title', { unique: false });
        }

        // Bible verses store
        if (!db.objectStoreNames.contains('bible')) {
          const bibleStore = db.createObjectStore('bible', { keyPath: 'id' });
          bibleStore.createIndex('book_chap_verse', ['book', 'chapter', 'verse'], { unique: false });
          bibleStore.createIndex('book', 'book', { unique: false });
          bibleStore.createIndex('type', 'type', { unique: false });
        }

        // Settings & Slots store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    return this.dbPromise;
  }

  // --- SONGS ---
  async getSongs(): Promise<Song[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('songs', 'readonly');
        const store = tx.objectStore('songs');
        const req = store.getAll();
        req.onsuccess = () => {
          let songs = req.result as Song[];
          if (!songs || songs.length === 0) {
            // Seed default songs
            this.seedDefaultSongs().then(resolve).catch(reject);
          } else {
            // Auto-merge new default songs (e.g. bilingual songs) if missing
            for (const defSong of DEFAULT_SONGS) {
              if (!songs.some((s) => s.id === defSong.id || s.title.toLowerCase() === defSong.title.toLowerCase())) {
                songs.push(defSong);
                this.saveSong(defSong);
              }
            }
            songs.sort((a, b) => a.title.localeCompare(b.title));
            resolve(songs);
          }
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      // Fallback to localStorage if IndexedDB failed
      const raw = localStorage.getItem('gworship_songs');
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return DEFAULT_SONGS;
        }
      }
      return DEFAULT_SONGS;
    }
  }

  async saveSong(song: Song): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('songs', 'readwrite');
        const store = tx.objectStore('songs');
        const req = store.put(song);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      const songs = await this.getSongs();
      const idx = songs.findIndex((s) => s.id === song.id);
      if (idx >= 0) songs[idx] = song;
      else songs.push(song);
      localStorage.setItem('gworship_songs', JSON.stringify(songs));
    }
  }

  async deleteSong(id: string | number): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('songs', 'readwrite');
        const store = tx.objectStore('songs');
        const req = store.delete(id);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      let songs = await this.getSongs();
      songs = songs.filter((s) => s.id !== id);
      localStorage.setItem('gworship_songs', JSON.stringify(songs));
    }
  }

  async bulkSaveSongs(songs: Song[]): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('songs', 'readwrite');
        const store = tx.objectStore('songs');
        for (const song of songs) {
          store.put(song);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      localStorage.setItem('gworship_songs', JSON.stringify(songs));
    }
  }

  async replaceAllSongs(songs: Song[]): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('songs', 'readwrite');
        const store = tx.objectStore('songs');
        const clearReq = store.clear();
        clearReq.onsuccess = () => {
          for (const song of songs) {
            store.put(song);
          }
        };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      localStorage.setItem('gworship_songs', JSON.stringify(songs));
    }
  }

  async deduplicateSongs(): Promise<Song[]> {
    const songs = await this.getSongs();
    const seen = new Set<string>();
    const cleanList: Song[] = [];
    let hadDuplicates = false;

    for (const song of songs) {
      const key = `${normalizeTitle(song.title)}||${normalizeLyrics(song.lyrics)}`;
      if (!seen.has(key)) {
        seen.add(key);
        cleanList.push(song);
      } else {
        hadDuplicates = true;
      }
    }

    if (hadDuplicates) {
      await this.replaceAllSongs(cleanList);
    }
    return cleanList;
  }

  private async seedDefaultSongs(): Promise<Song[]> {
    await this.bulkSaveSongs(DEFAULT_SONGS);
    return DEFAULT_SONGS;
  }

  // --- BIBLE ---
  async getBibleVerses(): Promise<BibleVerse[]> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('bible', 'readonly');
        const store = tx.objectStore('bible');
        const req = store.getAll();
        req.onsuccess = () => {
          let verses = req.result as BibleVerse[];
          if (!verses || verses.length === 0) {
            this.seedDefaultBible().then(resolve).catch(reject);
          } else {
            // Auto-heal / migrate any numeric book names (e.g. "1" -> "Kejadian", "66" -> "Wahyu" from AYT CSV)
            let needsUpdate = false;
            for (const v of verses) {
              const normalized = normalizeBookName(v.book);
              if (normalized && normalized !== v.book) {
                v.book = normalized;
                v.id = `${normalized.toLowerCase().replace(/\s+/g, '')}-${v.chapter}-${v.verse}`;
                const num = INDO_BIBLE_BOOKS.indexOf(normalized) + 1;
                if (num > 0) {
                  v.type = num > 39 ? 'PB' : 'PL';
                }
                needsUpdate = true;
              }
            }
            if (needsUpdate) {
              this.bulkSaveBible(verses).catch(() => {});
            }
            resolve(verses);
          }
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      const raw = localStorage.getItem('gworship_bible');
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return DEFAULT_BIBLE_VERSES;
        }
      }
      return DEFAULT_BIBLE_VERSES;
    }
  }

  async bulkSaveBible(verses: BibleVerse[]): Promise<void> {
    const db = await this.getDB();
    // Process in batches of 2000 for high performance without transaction timeout
    const batchSize = 2000;
    for (let i = 0; i < verses.length; i += batchSize) {
      const chunk = verses.slice(i, i + batchSize);
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('bible', 'readwrite');
        const store = tx.objectStore('bible');
        for (const verse of chunk) {
          if (!verse.id) {
            verse.id = `${verse.book}_${verse.chapter}_${verse.verse}`;
          }
          store.put(verse);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    }
  }

  async clearBible(): Promise<void> {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('bible', 'readwrite');
      const store = tx.objectStore('bible');
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  private async seedDefaultBible(): Promise<BibleVerse[]> {
    await this.bulkSaveBible(DEFAULT_BIBLE_VERSES);
    return DEFAULT_BIBLE_VERSES;
  }

  // --- SETTINGS & ASSETS ---
  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction('settings', 'readonly');
        const store = tx.objectStore('settings');
        const req = store.get(key);
        req.onsuccess = () => {
          if (req.result !== undefined && req.result.value !== undefined) {
            resolve(req.result.value as T);
          } else {
            resolve(defaultValue);
          }
        };
        req.onerror = () => resolve(defaultValue);
      });
    } catch {
      const raw = localStorage.getItem(`gworship_setting_${key}`);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return defaultValue;
        }
      }
      return defaultValue;
    }
  }

  async saveSetting<T>(key: string, value: T): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('settings', 'readwrite');
        const store = tx.objectStore('settings');
        const req = store.put({ key, value });
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      localStorage.setItem(`gworship_setting_${key}`, JSON.stringify(value));
    }
  }

  // --- CUSTOM MEDIA (IMAGES, VIDEOS, HTML ANIMATIONS) ---
  async getCustomMediaList(): Promise<CustomMediaItem[]> {
    const defaultList: CustomMediaItem[] = DEFAULT_BUILTIN_HTML_BACKGROUNDS;
    try {
      const list = await this.getSetting<CustomMediaItem[]>('custom_media_items', []);
      if (!list || list.length === 0) {
        await this.saveSetting('custom_media_items', defaultList);
        return defaultList;
      }
      // Ensure all default HTML animations are present & upgraded to optimized version
      let merged = [...list];
      let hasChanges = false;
      for (const def of defaultList) {
        const existingIdx = merged.findIndex((m) => m.id === def.id);
        if (existingIdx === -1) {
          merged.push(def);
          hasChanges = true;
        } else if (merged[existingIdx].data !== def.data) {
          // Auto-upgrade built-in templates with the optimized code
          merged[existingIdx] = { ...merged[existingIdx], data: def.data, name: def.name };
          hasChanges = true;
        }
      }
      if (hasChanges) {
        await this.saveSetting('custom_media_items', merged);
      }
      return merged;
    } catch {
      return defaultList;
    }
  }

  async saveCustomMedia(item: CustomMediaItem): Promise<CustomMediaItem[]> {
    const list = await this.getCustomMediaList();
    const existingIndex = list.findIndex((m) => m.id === item.id);
    let updated: CustomMediaItem[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...list];
    }
    await this.saveSetting('custom_media_items', updated);
    return updated;
  }

  async deleteCustomMedia(id: string): Promise<CustomMediaItem[]> {
    const list = await this.getCustomMediaList();
    const updated = list.filter((m) => m.id !== id);
    await this.saveSetting('custom_media_items', updated);
    return updated;
  }

  // --- SAVED SETLISTS (IBADAH RAYA, PEMUDA, DOA, DLL.) ---
  async getSavedSetlists(): Promise<SavedSetlist[]> {
    try {
      const list = await this.getSetting<SavedSetlist[]>('saved_setlists', []);
      if (!list || list.length === 0) {
        // Create initial default setlists from seeded songs
        const songs = await this.getSongs();
        const verses = await this.getBibleVerses();
        const defaultSetlists: SavedSetlist[] = [
          {
            id: 'setlist-ibadah-raya-1',
            name: 'Ibadah Raya 1 (Minggu Pagi)',
            serviceDate: new Date().toISOString().slice(0, 10),
            serviceType: 'Ibadah Raya',
            description: 'Urutan lagu ibadah umum minggu pagi & pembacaan firman',
            songs: songs.slice(0, 3),
            bibleVerses: verses.slice(0, 1),
            createdAt: Date.now() - 86400000,
            updatedAt: Date.now() - 86400000,
          },
          {
            id: 'setlist-ibadah-pemuda',
            name: 'Ibadah Pemuda & Remaja (Youth)',
            serviceDate: new Date().toISOString().slice(0, 10),
            serviceType: 'Ibadah Pemuda',
            description: 'Lagu-lagu pujian tempo cepat & penyembahan pemuda',
            songs: songs.length > 3 ? songs.slice(1, 4) : songs.slice(0, 2),
            bibleVerses: verses.length > 1 ? verses.slice(1, 2) : [],
            createdAt: Date.now() - 43200000,
            updatedAt: Date.now() - 43200000,
          },
        ];
        await this.saveSetting('saved_setlists', defaultSetlists);
        return defaultSetlists;
      }
      return list;
    } catch {
      return [];
    }
  }

  async saveSetlist(setlist: SavedSetlist): Promise<SavedSetlist[]> {
    const list = await this.getSavedSetlists();
    const existingIndex = list.findIndex((s) => s.id === setlist.id);
    let updated: SavedSetlist[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = { ...setlist, updatedAt: Date.now() };
    } else {
      updated = [{ ...setlist, createdAt: Date.now(), updatedAt: Date.now() }, ...list];
    }
    await this.saveSetting('saved_setlists', updated);
    return updated;
  }

  async deleteSetlist(id: string): Promise<SavedSetlist[]> {
    const list = await this.getSavedSetlists();
    const updated = list.filter((s) => s.id !== id);
    await this.saveSetting('saved_setlists', updated);
    return updated;
  }
}

export const dbService = new WorshipDatabase();
export const db = dbService;
