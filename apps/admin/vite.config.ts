import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import postcss from './postcss.config';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      app: resolve(__dirname, './src'),
      features: resolve(__dirname, './src/features'),
    },
  },
});
