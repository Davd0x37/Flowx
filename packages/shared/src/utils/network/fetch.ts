import { AppError } from '../error/errorUtils';

export interface RequestClient {
  fetch: <ResultType, _ErrorType>(
    input: RequestInfo | URL,
    options?: RequestInit,
  ) => Promise<ResultType>;
}

export const Fetch: RequestClient = {
  async fetch<ResultType, ErrorType>(
    input: RequestInfo | URL,
    options?: RequestInit,
  ): Promise<ResultType> {
    const response = await fetch(input, options);

    const responseBody = (await response.json()) as NonNullable<ResultType | ErrorType>;

    if (!response.ok) {
      const { status } = response;

      throw new AppError<ErrorType>({
        name: 'REQUEST_FETCH_ERROR',
        message: 'Error occurred during fetch',
        data: responseBody as NonNullable<ErrorType>,
        statusCode: status,
      });
    }

    if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
      throw new AppError<ErrorType>({
        name: 'JSON_PARSE_ERROR',
        message: 'Received response was not a JSON response',
        data: responseBody as NonNullable<ErrorType>,
      });
    }

    return responseBody as NonNullable<ResultType>;
  },
};
