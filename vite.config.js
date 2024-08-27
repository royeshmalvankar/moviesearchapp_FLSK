import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/movie': {
        target: 'http://localhost:3000', // The backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/movie/, ''),
      },
    },
  },
});

