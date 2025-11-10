import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const api = {
  // Get analytics report
  getReport: () => apiClient.get('/report/json'),
  
  // Get recent sensor data
  getRecentData: (limit = 50) => apiClient.get(`/data/recent?limit=${limit}`),
  
  // Get single sensor record
  getSensorById: (id) => apiClient.get(`/data/${id}`),
  
  // Control pump
  controlPump: (action) => apiClient.post('/control/pump', { action }),
  
  // Get pump status
  getPumpStatus: () => apiClient.get('/control/pump/status'),
  
  // Health check
  healthCheck: () => apiClient.get('/health', { baseURL: API_BASE_URL.replace('/api', '') }),
};

export default api;
