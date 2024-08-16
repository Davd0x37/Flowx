/// <reference types="vitest" />
import tailwind from 'tailwindcss';
import tailwindConfig from './tailwind.config';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { resolve } from 'node:path';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: './dist',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  cacheDir: '../../node_modules/.vite/packages/web',

  server: {
    port: 3030,
    host: 'localhost',
  },

  preview: {
    port: 3333,
    host: 'localhost',
  },

  plugins: [
    // React plugin
    react(),

    // TanStack router plugin
    // @TODO: use tanstack router when it's ready (v2 or v3)
    // TanStackRouterVite({
    //   routesDirectory: './app/routes',
    //   generatedRouteTree: './app/routes.gen.ts',
    // }),

    // Iconify loader
    Icons({ compiler: 'jsx', jsx: 'react' }),

    nxViteTsPaths(),
  ],

  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    globals: true,
    setupFiles: './app/tests/setupTests.ts',
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
      '@': resolve(__dirname, './app'),

      // Features alias
      '@features': resolve(__dirname, './app/features'),

      // UI alias
      '@ui': resolve(__dirname, './app/components/ui'),
    },
  },
});
