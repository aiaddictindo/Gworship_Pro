import { DisplayState, CustomMediaItem } from '../types';

const CHANNEL_NAME = 'gworship_channel';
const STORAGE_KEY = 'gworship_live_state';

class SyncService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(state: DisplayState) => void> = new Set();
  private mediaListeners: Set<(media: CustomMediaItem[]) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          if (event.data?.type === 'SYNC_STATE' && event.data?.payload) {
            this.notifyListeners(event.data.payload as DisplayState);
          } else if (event.data?.type === 'SYNC_MEDIA' && event.data?.payload) {
            this.notifyMediaListeners(event.data.payload as CustomMediaItem[]);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel error, using storage fallback', err);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            this.notifyListeners(parsed);
          } catch {
            // ignore
          }
        }
      });
    }
  }

  broadcast(state: DisplayState) {
    if (this.channel) {
      this.channel.postMessage({ type: 'SYNC_STATE', payload: state });
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // LocalStorage quota may be reached if huge base64 images are used
      }
    }
  }

  broadcastMedia(media: CustomMediaItem[]) {
    if (this.channel) {
      this.channel.postMessage({ type: 'SYNC_MEDIA', payload: media });
    }
  }

  subscribe(callback: (state: DisplayState) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  subscribeMedia(callback: (media: CustomMediaItem[]) => void): () => void {
    this.mediaListeners.add(callback);
    return () => this.mediaListeners.delete(callback);
  }

  private notifyListeners(state: DisplayState) {
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch (err) {
        console.error('Error notifying sync listener', err);
      }
    });
  }

  private notifyMediaListeners(media: CustomMediaItem[]) {
    this.mediaListeners.forEach((listener) => {
      try {
        listener(media);
      } catch (err) {
        console.error('Error notifying media sync listener', err);
      }
    });
  }

  getSavedState(): DisplayState | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}

export const syncService = new SyncService();
