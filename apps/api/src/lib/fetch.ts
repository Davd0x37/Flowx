import { internalGuard } from '@flowx/shared';

export interface RequestClient {
  fetch: (input: RequestInfo | URL, options?: RequestInit) => Promise<Response>;
}

export const Fetch: RequestClient = {
  async fetch(input: RequestInfo | URL, options?: RequestInit): Promise<Response> {
    const wnd = internalGuard('fetch');

    try {
      return wnd.fetch(input, options);
    } catch (error) {
      throw new Error(`Error occured during fetch: ${error}`);
    }
  },
};
