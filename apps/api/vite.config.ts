import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,

  esbuild: {
    platform: 'node',
    target: 'es2022',
  },

  build: {
    target: 'es2022',
    lib: {
      entry: resolve(__dirname, 'app/index.ts'),
      formats: ['es'],
    },
    ssr: true,
    // outDir: '../../dist/packages/api',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  plugins: [nxViteTsPaths()],

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
