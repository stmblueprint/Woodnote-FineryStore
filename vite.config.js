import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/api': 'https://main.d37zqkts5spj19.amplifyapp.com',
    }
  },
  // build: {
  //   outDir: 'dist', // Specify the output directory for the build artifacts
  // },
});
