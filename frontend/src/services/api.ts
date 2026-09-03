import axios from 'axios';
import { useAppStore } from '../stores/appStore';

export const DEFAULT_BACKEND_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: DEFAULT_BACKEND_URL,
  timeout: 120000
});

// Ensure a user-provided endpoint is a full base URL pointing at /api/v1
export const normalizeBackendUrl = (url: string): string => {
  let u = (url || '').trim().replace(/\/+$/, '');
  if (u && !/^https?:\/\//i.test(u)) u = 'https://' + u;
  if (u && !/\/api\/v1$/i.test(u)) u += '/api/v1';
  return u;
};

// Intercept requests to dynamically set the baseURL and API key
api.interceptors.request.use((config) => {
  // If the request specifically overrides the baseURL (e.g. checkHealth), don't overwrite it
  if (!config.baseURL || config.baseURL === DEFAULT_BACKEND_URL) {
    const state = useAppStore.getState();
    if (state.backendUrl) {
      config.baseURL = state.backendUrl;
    }
    if (state.apiKey && !config.headers['x-api-key']) {
      config.headers['x-api-key'] = state.apiKey;
    }
  }

  // Bypass Ngrok's browser warning page for free tunnels
  config.headers['ngrok-skip-browser-warning'] = 'true';

  return config;
});

export interface HealthResponse {
  status: string;
  gpu_available: boolean;
  latency?: number;
}

export const checkHealth = async (customUrl?: string, customApiKey?: string): Promise<HealthResponse> => {
  const startTime = performance.now();

  const config: any = { timeout: 10000 };
  if (customUrl) {
    config.baseURL = normalizeBackendUrl(customUrl);
  }
  if (customApiKey) {
    config.headers = { 'x-api-key': customApiKey };
  }

  const res = await api.get('/health', config);
  const endTime = performance.now();

  return {
    ...res.data,
    latency: Math.round(endTime - startTime)
  };
};

export const submitJob = async (jobParams: any) => {
  const res = await api.post('/jobs', jobParams);
  return res.data;
};

export const getJobStatus = async (jobId: string) => {
  const res = await api.get(`/jobs/${jobId}`);
  return res.data;
};

export const cancelJob = async (jobId: string) => {
  const res = await api.post(`/jobs/${jobId}/cancel`);
  return res.data;
};

export const getJobResult = async (jobId: string, filename: string): Promise<string> => {
  const res = await api.get(`/jobs/${jobId}/results/${encodeURIComponent(filename)}`, {
    responseType: 'text',
    // Prevent axios from trying to JSON-parse the PDB text
    transformResponse: [(data) => data]
  });
  return res.data;
};

const saveBlob = (data: any, filename: string) => {
  const url = URL.createObjectURL(new Blob([data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// Download via the API client so auth + ngrok-skip headers are applied
export const downloadResult = async (jobId: string, filename: string): Promise<void> => {
  const res = await api.get(`/jobs/${jobId}/results/${encodeURIComponent(filename)}`, {
    responseType: 'blob'
  });
  saveBlob(res.data, filename);
};

export const downloadResultsZip = async (jobId: string, jobName: string): Promise<void> => {
  const res = await api.get(`/jobs/${jobId}/results_zip`, { responseType: 'blob' });
  saveBlob(res.data, `${jobName}.result.zip`);
};

export const fetchStructure = async (pdbId: string) => {
  const res = await api.post(`/pdb/fetch`, { pdb_id: pdbId });
  return res.data;
};
