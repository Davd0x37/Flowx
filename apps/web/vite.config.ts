import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { resolve } from 'node:path';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import tailwindConfig from './tailwind.config';
import tailwind from 'tailwindcss';

export default defineConfig({
  plugins: [
    // React plugin
    react(),

    // TanStack router plugin
    // TanStackRouterVite({
    //   routesDirectory: 'app/pages',
    // }),

    // Iconify loader
    Icons({ compiler: 'jsx', jsx: 'react' }),
  ],

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
      app: resolve(__dirname, './app'),

      // Features alias
      features: resolve(__dirname, './app/features'),

      // UI alias
      ui: resolve(__dirname, './app/components/ui'),
    },
  },
});
