/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
