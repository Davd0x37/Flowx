import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import AutoImport from 'unplugin-auto-import/vite';
import UnpluginIconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import tailwindConfig from './tailwind.config';
import tailwind from 'tailwindcss';

const autoImportOptions = {
  eslint: {
    filepath: resolve(__dirname, '../../', 'config/eslintrc-auto-import.json'),
  },
};

export default defineConfig({
  plugins: [
    // Vue 3
    vue(),

    // Unplugin Icons
    Icons({ compiler: 'vue3' }),

    // Vue dev tools - disabled in production mode
    VueDevTools(),

    // Auto importing
    AutoImport({
      // Import Vue and VueRouter
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
      resolvers: [
        // Resolves Unplugin Icons
        UnpluginIconsResolver({
          componentPrefix: 'Icon',
        }),
      ],
      dirs: ['./src/composables/**'],
      vueTemplate: true,
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
        filepath: autoImportOptions.eslint.filepath,
      },
    }),
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
      app: resolve(__dirname, './src'),

      // Features alias
      features: resolve(__dirname, './src/features'),

      // UI alias
      ui: resolve(__dirname, './src/components/ui'),
    },
  },
});
