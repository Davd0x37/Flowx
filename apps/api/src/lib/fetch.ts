import { debug } from '@flowx/shared/utils/errorUtils';
import { internalGuard } from '@flowx/shared/utils/guard';

export interface RequestClient {
  fetch: (input: RequestInfo | URL, options?: RequestInit) => Promise<Response>;
}

export const Fetch: RequestClient = {
  async fetch(input: RequestInfo | URL, options?: RequestInit): Promise<Response> {
    const wnd = internalGuard('fetch');

    try {
      return wnd.fetch(input, options);
    } catch (error) {
      if (error instanceof Error) {
        debug({
          name: 'FETCH_ERROR',
          message: `Fetch error: ${error.message}`,
        });
      }

      throw new Error(`Error occured during fetch`);
    }
  },
};
