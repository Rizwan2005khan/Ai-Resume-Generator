import axios from 'axios';

// Detect environment and choose baseURL
const baseURL = import.meta.env.VITE_BASE_URL 
                || (window.location.hostname.includes('localhost') 
                    ? 'http://localhost:3000' 
                    : 'https://ai-resume-generator-server.vercel.app');

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
