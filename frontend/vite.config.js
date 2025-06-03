import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config with proxy for backend API
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all API requests under /api to FastAPI backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
