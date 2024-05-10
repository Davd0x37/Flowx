import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    platform: 'node',
    target: 'es2022',
  },
  build: {
    target: 'es2022',
    lib: {
      entry: resolve(__dirname, 'app/index.ts'),
      name: 'main',
      fileName: 'main',
      formats: ['es'],
    },
    ssr: true,
  },

  resolve: {
    alias: {
      // Main directory alias
      app: resolve(__dirname, './app'),

      // Features alias
      features: resolve(__dirname, './app/features'),

      // UI alias
      ui: resolve(__dirname, './app/components/ui'),
    },
  },
});
