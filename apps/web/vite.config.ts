/// <reference types="vitest" />

import { resolve } from 'node:path'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'
import postcssPresetEnv from 'postcss-preset-env'
import tailwind from 'tailwindcss'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import tailwindConfig from './tailwind.config'

export default defineConfig({
  root: import.meta.dirname,

  cacheDir: '../../node_modules/.vite/apps/web',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    // TanStack router plugin
    TanStackRouterVite({}),

    // React plugin
    react(),

    // Iconify loader
    Icons({ compiler: 'jsx', jsx: 'react' }),

    nxViteTsPaths(),
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/web',
      provider: 'v8',
    },
    setupFiles: './src/tests/setupTests.ts',
  },

  css: {
    postcss: {
      plugins: [
        // Tailwind plugin for postcss
        tailwind(tailwindConfig),

        // Autoprefixer for browser compatibility
        autoprefixer,

        // Postcss nested for better readability
        postcssNested,

        // Postcss preset env for modern css features
        postcssPresetEnv,
      ],
    },
  },

  resolve: {
    alias: {
      // Main directory alias
      '~': resolve(import.meta.dirname, './src'),
    },
  },
})
