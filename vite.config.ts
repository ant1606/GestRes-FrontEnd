import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '#', replacement: path.resolve(__dirname, 'src') },
      { find: '@mdi', replacement: path.resolve(__dirname, 'node_modules/@mdi') }
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: [...configDefaults.exclude],
    root: './'
  },
  build: {
    rollupOptions: {
      // external: ['@mdi/react', '@mdi/js'],
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
  }
});
