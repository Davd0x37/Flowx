import { APP_ERRORS, RUNTIME_ERRORS } from 'app/types/appErrorCodes';
import { isDevEnv } from './env';

/**
 * TYPES
 */
export interface ErrorParameters<T> {
  name: T;
  message: string;
  cause?: unknown;
}

interface DebugParams {
  name: string;
  message: string;
}

interface DebugErrorParams {
  showTrace?: boolean;
}

/**
 * CONSTANTS
 */
const consoleStyles = {
  groupName: `font-size: 1.3em; background: #040507; color: #f44336; padding: 3px 10px;`,
  error: {
    name: `background: #040507; color: #f44336; padding: 3px 10px;`,
    message: `background: #365a68; color: #d8e9d3; padding: 3px 10px;`,
    stack: `background: #5ca6c4; color: #040507; padding: 3px 10px;`,
    cause: `background: #b78834; color: #040507; padding: 3px 10px;`,
  },
} as const;

/**
 * Implementation
 */
export class BaseError<T extends string> extends Error {
  public name: T;
  public message: string;
  public cause?: unknown;

  constructor({ name, message, cause }: ErrorParameters<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export class RuntimeAppError extends BaseError<RUNTIME_ERRORS> {}
export class AppError extends BaseError<APP_ERRORS> {}

function printAdditionals(params: DebugParams) {
  console.group(`%c${params.name}`, consoleStyles.groupName);

  console.log(`%c[ERROR NAME]:\t ${params.name}`, consoleStyles.error.name);

  console.log(`%c[ERROR MESSAGE]:\t ${params.message}`, consoleStyles.error.message);

  console.groupEnd();
}

function printErrorInstance(error: unknown, params?: DebugErrorParams) {
  if (error instanceof BaseError) {
    console.group(`%c${error.name}`, consoleStyles.groupName);

    if (params?.showTrace) {
      console.groupCollapsed(`%c[COLLAPSED STACK TRACE]`, consoleStyles.error.stack);
      console.trace();
      console.groupEnd();
    }

    console.log(`%c[ERROR NAME]:\t ${error.name}`, consoleStyles.error.name);
    console.log(`%c[ERROR MESSAGE]:\t ${error.message}`, consoleStyles.error.message);

    if (error?.stack) {
      console.log('%c[ERROR STACK]:\t', consoleStyles.error.stack, error.stack);
    }

    if (error?.cause) {
      console.log('%c[ERROR CAUSE]:\t', consoleStyles.error.cause, error.cause);
    }

    console.groupEnd();
  }
}

export function debug(params: DebugParams) {
  if (isDevEnv) {
    printAdditionals(params);
  }
}

export function debugError(error: unknown, params?: DebugErrorParams) {
  if (isDevEnv) {
    printErrorInstance(error, params);
  }
}
