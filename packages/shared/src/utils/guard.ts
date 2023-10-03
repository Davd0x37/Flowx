import { defaultGlobal } from './env';
import { RuntimeAppError } from './errorUtils';

/**
 * Checks if global container provides required functionality
 *
 * @param fun Runtime-provided API name eg. IntersectionObserver
 * @param container global container name eg. window, self, globalThis, global
 */
export const isSupported = <T extends object>(fun: string, container: T): boolean => {
  return fun in container;
};

/**
 *
 *
 * @template T
 * @param {T} expr Expression to check
 * @param {RuntimeAppError} [error] Error instance
 * @throws Throws error if expression is nullable
 * @return {NonNullable<T>} {asserts} Returns unwrapped value
 */
function assert<T>(expr: T, error: RuntimeAppError): asserts expr is NonNullable<T> {
  if (!expr) throw error;
}

/**
 * Returns global container (window, self, global etc.) if requested functionality is available
 *
 * @throws Throws error if global container is not available
 * @return NonNullable<typeof defaultGlobal>
 */
export const defaultGlobalExist = (): NonNullable<typeof defaultGlobal> => {
  const defaultGlobalRef = defaultGlobal;

  assert(
    defaultGlobalRef,

    new RuntimeAppError({
      name: 'GLOBAL_HANDLER_NOT_AVAILABLE',
      message: 'Requested "Global / Window" handler is not available in current runtime!',
    }),
  );

  return defaultGlobalRef;
};

/**
 * Returns global container (window, self, global etc.) if requested functionality is available
 *
 * @param {string} fun Requested functionality
 * @throws Throws error if functionality not available
 * @return Window | globalThis | self | global
 */
export const internalGuard = (fun: string): NonNullable<typeof defaultGlobal> => {
  const defaultGlobalRef = defaultGlobalExist();

  assert(
    isSupported(fun, defaultGlobalRef),

    new RuntimeAppError({
      name: 'RUNTIME_FUNCTION_NOT_AVAILABLE',
      message: `Requested "${fun}" is not available in current runtime!`,
    }),
  );

  return defaultGlobalRef;
};
