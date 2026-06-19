import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
  server: {
    proxy: {
      '/api/copilot': {
        target: 'https://api.githubcopilot.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/copilot/, ''),
        secure: true,
      },
    },
  },
});
