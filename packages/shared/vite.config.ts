/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
    globals: true,
  },
});
