import { ResultWrapper } from '@flowx/shared/types/wrappers';
import { DebugParams, debug } from '@flowx/shared/utils/errorUtils';
import { internalGuard } from '@flowx/shared/utils/guard';

export interface RequestClient {
  fetch: <T>(input: RequestInfo | URL, options?: RequestInit) => Promise<ResultWrapper<T, string>>;
}

// Wrapper around DebugParams from error utils
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

// @TODO: add additional types for Fetch in debug method

export const Fetch: RequestClient = {
  async fetch<T>(input: RequestInfo | URL, options?: RequestInit): Promise<ResultWrapper<T, string>> {
    const wnd = internalGuard('fetch');

    try {
      const response = await wnd.fetch(input, options);

      if (!response.ok) {
        const { status, statusText } = response;
        const { name: errorName, message: errorMessage } = handleStatusError(status);
        const message = `Request error: ${statusText} | ${errorMessage}`;

        debug({
          name: errorName,
          message,
        });

        return {
          error: message,
        };
      }

      // @FIXME: test and fix this
      const responseBody = (await response.json()) as NonNullable<T>;

      if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
        debug({
          name: 'FETCH_ERROR',
          message: `Received response was not JSON response`,
        });

        return {
          error: 'Received response was not JSON response',
        };
      }

      if (typeof responseBody === 'object' && 'error' in responseBody && typeof responseBody.error === 'string') {
        const error = responseBody.error;
        const errorDescription =
          'error_description' in responseBody && typeof responseBody?.error_description === 'string'
            ? responseBody.error_description
            : '';

        const message = `Request error: ${error} | ${errorDescription}`;

        debug({
          name: 'FETCH_ERROR',
          message,
        });

        return {
          error: message,
        };
      }

      return {
        data: responseBody,
      };
    } catch (error) {
      let message = 'Error occurred during fetch';

      if (error instanceof Error) {
        message = `Fetch error: ${error.message}`;
        debug({
          name: 'FETCH_ERROR',
          message,
        });
      }

      return {
        error: message,
      };
    }
  },
};
