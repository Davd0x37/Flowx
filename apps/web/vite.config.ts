import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import postcss from './postcss.config';

export default defineConfig({
  plugins: [vue(), Icons({ compiler: 'vue3' })],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      app: resolve(__dirname, './src'),
      features: resolve(__dirname, './src/features'),
      ui: resolve(__dirname, './src/components/ui'),
    },
  },
});
