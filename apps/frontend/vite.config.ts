/// <reference types='vitest/config' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

const dirname = import.meta.dirname

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    outDir: 'dist',
    reportCompressedSize: true,
  },
  cacheDir: '../../node_modules/.vite/apps/frontend',
  plugins: [
    // TanStack router plugin
    TanStackRouterVite({}),

    // React plugin
    react(),

    // Iconify loader
    Icons({ compiler: 'jsx', jsx: 'react' }),

    // Nx paths resolver
    nxViteTsPaths({}),
  ],
  preview: {
    host: 'localhost',
    port: 4300,
  },
  publicDir: './public',
  resolve: {
    alias: {
      '~': resolve(dirname, './src'),
      '~ui': resolve(dirname, './src/components/ui'),
    },
  },
  root: dirname,
  server: {
    host: 'localhost',
    port: 4200,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/apps/frontend',
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    setupFiles: './src/tests/setup-tests.ts',
    watch: false,
  },
})
