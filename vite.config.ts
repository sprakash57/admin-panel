import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'components', replacement: '/src/components' },
      { find: 'theme', replacement: '/src/theme' },
      { find: 'types', replacement: '/src/types' },
      { find: 'data', replacement: '/src/data' },
      { find: 'helpers', replacement: '/src/helpers' },
    ],
  },
});
