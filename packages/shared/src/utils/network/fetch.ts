import { ApiResponseWrapper } from '../../types/response';
import { ResultWrapper } from '../../types/wrappers';
import { DebugParams } from '../../utils/guard/errorUtils';
import { internalGuard } from '../../utils/guard/index';

export interface RequestClient {
  fetch: <T, UseReactQueryBoolean extends boolean = true>(
    input: RequestInfo | URL,
    options?: RequestInit,
    useReactQuery?: UseReactQueryBoolean,
    externalApi?: boolean,
    // logger?: typeof globalThis.console,
  ) => Promise<UseReactQueryBoolean extends true ? unknown : ResultWrapper<T, string>>;
}

type StatusError = {
  name: DebugParams['name'];
  message: string;
};

function handleStatusError(status: number): StatusError {
  switch (status) {
    case 401: {
      return {
        name: 'TOKEN_REQUEST_CREDENTIALS_ERROR',
        message: 'Authorization error. Please check your credentials.',
      };
    }

    default: {
      return {
        name: 'FETCH_ERROR',
        message: 'Undefined status, please check your code request.',
      };
    }
  }
}

// @TODO: wrap return value - maybe move to an external function?
// This code is such a mess. I'll refactor this in near future
export const Fetch: RequestClient = {
  async fetch<T, UseReactQueryBoolean extends boolean = true>(
    input: RequestInfo | URL,
    options?: RequestInit,
    useReactQuery: UseReactQueryBoolean = true as UseReactQueryBoolean,
    externalApi = false,
    // logger = globalThis.console,
  ): Promise<UseReactQueryBoolean extends true ? unknown : ResultWrapper<T, string>> {
    // @TODO: node >= 18 and browsers support Fetch API, remove guard when refactoring this function
    const wnd = internalGuard('fetch');

    try {
      const response = await wnd.fetch(input, options);

      // @TODO: maybe remove this section? Fastify will return status code with message
      if (externalApi && !response.ok) {
        const { status } = response;
        // const { name: errorName, message: errorMessage } = handleStatusError(status);
        const { message } = handleStatusError(status);

        // logger.debug({
        //   name: errorName,
        //   message,
        // });

        return useReactQuery
          ? Promise.reject({ message })
          : {
              error: message,
            };
      }

      // @TODO: add option to select if should return json or other type
      const responseBody = (await response.json()) as NonNullable<T>;

      if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
        const message = 'Received response was not a JSON response';

        // logger.debug({
        //   name: 'FETCH_ERROR',
        //   message,
        // });

        return useReactQuery ? Promise.reject({ message }) : { error: message };
      }

      if (typeof responseBody === 'object' && 'status' in responseBody && 'error' in responseBody) {
        const errorWrapper = responseBody as ApiResponseWrapper;
        const { error } = errorWrapper;

        // logger.debug({
        //   name: 'FETCH_ERROR',
        //   message: error?.message,
        // });

        return useReactQuery
          ? Promise.reject({
              message: error?.message,
              data: error?.data,
            })
          : { error: error?.message };
      }

      return useReactQuery ? responseBody : { data: responseBody };
    } catch (error) {
      let message = 'Error occurred during fetch';

      if (error instanceof Error) {
        message = `Fetch error: ${error.message}`;

        // logger.debug({
        //   name: 'FETCH_ERROR',
        //   message,
        // });
      }

      return useReactQuery ? Promise.reject({ message }) : { error: message };
    }
  },
};
