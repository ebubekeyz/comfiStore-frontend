import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  sever: {
    proxy: {
      '/api': 'https://comfi-server-api.onrender.com/',
    },
  },
  plugins: [react()],
});
