import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or get from your state manager
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Example auth functions
export const loginUser = (credentials: any) => apiClient.post('/auth/login', credentials);
export const fetchUserProfile = () => apiClient.get('/auth/profile');

// Example aggregated apps function
export const fetchAggregatedApps = () => apiClient.get('/aggregated-apps');

export default apiClient;