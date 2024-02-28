// @FIXME: fix type errors

export const isBrowser = typeof window !== 'undefined';
// @ts-ignore
export const isNode = typeof process === 'object';

// @ts-ignore
export const isDevEnv = (isBrowser && import.meta.env.VITE_DEV_ENV) || (isNode && process.env.DEV_ENV);

export const defaultWindow = isBrowser ? window : undefined;
export const defaultDocument = isBrowser ? window.document : undefined;
export const defaultLocation = isBrowser ? window.location : undefined;
export const defaultNavigator = isBrowser ? window.navigator : undefined;

export const defaultGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
        ? window
        : // : typeof global !== 'undefined'
          // ? global
          undefined;
