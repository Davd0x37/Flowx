import { consoleStyles } from './constants'
import { BaseError, type DebugParams } from './errorUtils'

interface DebugErrorParams {
  showTrace?: boolean
}

function printAdditional(params: DebugParams) {
  console.group(`%c${params.name}`, consoleStyles.groupName)

  console.log(`%c[ERROR NAME]:\t ${params.name}`, consoleStyles.error.name)

  console.log(`%c[ERROR MESSAGE]:\t ${params.message}`, consoleStyles.error.message)

  console.groupEnd()
}

function printErrorInstance(error: unknown, params?: DebugErrorParams) {
  if (error instanceof BaseError) {
    console.group(`%c${error.name}`, consoleStyles.groupName)

    if (params?.showTrace) {
      console.groupCollapsed('%c[COLLAPSED STACK TRACE]', consoleStyles.error.stack)
      console.trace()
      console.groupEnd()
    }

    console.log(`%c[ERROR NAME]:\t ${error.name}`, consoleStyles.error.name)
    console.log(`%c[ERROR MESSAGE]:\t ${error.message}`, consoleStyles.error.message)

    if (error.stack) {
      console.log('%c[ERROR STACK]:\t', consoleStyles.error.stack, error.stack)
    }

    if (error.cause) {
      console.log('%c[ERROR CAUSE]:\t', consoleStyles.error.cause, error.cause)
    }

    console.groupEnd()
  }
}

export function debug(params: DebugParams) {
  printAdditional(params)
}

export function debugError(error: unknown, params?: DebugErrorParams) {
  printErrorInstance(error, params)
}
