import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'http://localhost:5001', // Replace this with the correct URL of your backend server
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  build: {
    outDir: 'dist', // Specify the output directory for the build artifacts
  },
});
