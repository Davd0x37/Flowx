import vue from '@vitejs/plugin-vue';
import vueJSX from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';
import tailwindConfig from './tailwind.config';
import tailwind from 'tailwindcss';

export default defineConfig({
  plugins: [
    // Vue 3
    vue(),

    // JSX support
    vueJSX(),

    // Vue dev tools - disabled in production mode
    VueDevTools(),

    // Unplugin Icons
    Icons({ compiler: 'vue3' }),
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
