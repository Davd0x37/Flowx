/// <reference types="vite/client" />

declare module '*.vue';

interface ImportMetaEnv {
  readonly VITE_ENV_DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
