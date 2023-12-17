import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

import postcss from './postcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Icons({ compiler: 'jsx', jsx: 'react' })],
  css: {
    postcss,
  },
  resolve: {
    alias: {
      app: resolve(__dirname, './src'),
    },
  },
});
