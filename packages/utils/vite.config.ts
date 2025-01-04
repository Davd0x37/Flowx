/// <reference types='vitest/config' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const dirname = import.meta.dirname

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
      name: '@flowx/utils',
    },
    outDir: './dist',
    reportCompressedSize: true,
    rollupOptions: {
      external: [],
    },
  },
  cacheDir: '../../node_modules/.vite/packages/utils',
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
    }),

    // Nx paths resolver
    nxViteTsPaths({}),
  ],
  root: dirname,
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/packages/utils',
    },
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    watch: false,
  },
})
