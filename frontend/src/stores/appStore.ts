import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkHealth, DEFAULT_BACKEND_URL } from '../services/api';

interface AppState {
  currentJobId: string | null;
  jobStatus: any | null;
  backendUrl: string;
  apiKey: string;
  isBackendConnected: boolean;
  lastConnected: string | null;
  setCurrentJobId: (id: string | null) => void;
  setJobStatus: (status: any) => void;
  setBackendUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setConnectionStatus: (isConnected: boolean, timestamp?: string) => void;
  clearConfig: () => void;
  checkConnection: () => Promise<boolean>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentJobId: null,
      jobStatus: null,
      backendUrl: '',
      apiKey: '',
      isBackendConnected: false,
      lastConnected: null,
      setCurrentJobId: (id) => set({ currentJobId: id }),
      setJobStatus: (status) => set({ jobStatus: status }),
      setBackendUrl: (url) => set({ backendUrl: url }),
      setApiKey: (key) => set({ apiKey: key }),
      setConnectionStatus: (isConnected, timestamp) => set((state) => ({ 
        isBackendConnected: isConnected,
        lastConnected: timestamp || state.lastConnected
      })),
      clearConfig: () => set({
        backendUrl: '',
        apiKey: '',
        isBackendConnected: false,
        lastConnected: null
      }),
      checkConnection: async () => {
        try {
          const { backendUrl, apiKey } = get();
          // Fall back to the local backend so the app connects out of the box
          await checkHealth(backendUrl || DEFAULT_BACKEND_URL, apiKey);
          const now = new Date().toISOString();
          set({ isBackendConnected: true, lastConnected: now });
          return true;
        } catch (e) {
          set({ isBackendConnected: false });
          return false;
        }
      }
    }),
    {
      name: 'biogen-storage',
      partialize: (state) => ({ 
        backendUrl: state.backendUrl,
        apiKey: state.apiKey,
        lastConnected: state.lastConnected
        // Explicitly NOT persisting isBackendConnected so it defaults to false on reload
      }),
    }
  )
);
