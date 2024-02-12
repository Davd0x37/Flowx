import { AppError, RequestBuilder, URLBuilder, base64UrlEncodeAB, debug, resolveUrl } from '@flowx/shared';
import type { ResultWrapper } from '@flowx/shared';
import type { RequestClient } from 'app/lib/fetch';
import { generateRandomValue, hash } from '../crypto';
import type {
  CodeChallengeMethodType,
  OAuthAccessTokenRequestPKCE,
  OAuthAuthorizeParameters,
  OAuthCodeChallengeStruct,
  OAuthEndpoints,
  OAuthRefreshTokensRequestPKCE,
  OAuthRequestTokenResponse,
  OAuthSettings,
  OAuthTokens,
  OAuthValidationParameters,
} from './types';

// https://github.com/panva/oauth4webapi

/**
 * Constant size for code verifier in Uint8Array - default 32 bytes
 */
export const CODE_VERIFIER_LENGTH = 32;

export class OAuth2 {
  private readonly settings: OAuthSettings;
  private reqClient: RequestClient;

  private defaultEndpoints: Record<OAuthEndpoints, string> = {
    authorizationEndpoint: '/authorize',
    tokenEndpoint: '/api/token',
    discoveryEndpoint: '/.well-known/oauth-authorization-server',
    // discoveryEndpoint: '/.well-known/openid-configuration',
  };

  constructor(settings: OAuthSettings, reqClient: RequestClient) {
    this.settings = settings;
    this.reqClient = reqClient;

    if (!settings?.authorizationEndpoint && !settings.discoveryEndpoint) {
      this.discover();
    }
  }

  private getBasicAuthToken(): string | null {
    if (!this.settings?.clientSecret) return null;

    return btoa(this.settings.clientId + ':' + this.settings.clientSecret);
  }

  // Run validateAuthorizationResponse before
  public getCodeFromURL(url: URL | string): string | null {
    const params = resolveUrl(url).searchParams;

    return params.get('code');
  }

  public getTokensFromResponse(response: OAuthRequestTokenResponse): OAuthTokens {
    return {
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      refreshToken: response.refresh_token,
      dateOfLastRequest: Date.now(), // @TODO: remove side effect?
    };
  }

  public generateCodeVerifier(): string {
    const randomValue = generateRandomValue(CODE_VERIFIER_LENGTH);

    return base64UrlEncodeAB(randomValue);
  }

  public async generatePKCECodeChallenge(
    codeVerifier: string,
    codeChallengeMethod: CodeChallengeMethodType = 'S256',
  ): Promise<OAuthCodeChallengeStruct> {
    try {
      const hashedVerifier = await hash(codeVerifier);

      const codeChallenge = base64UrlEncodeAB(hashedVerifier);

      return {
        codeChallenge,
        codeChallengeMethod,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error?.message : `Couldn't generate code challenge, please check error message`;

      throw new AppError({
        name: 'CODE_CHALLENGE_FAILED',
        message,
        cause: error,
      });
    }
  }

  private getEndpoint(endpoint: OAuthEndpoints): URL | string {
    const { server } = this.settings;

    if (endpoint in this.settings) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return resolveUrl(this.settings[endpoint]!, server);
    }

    if (endpoint in this.defaultEndpoints) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return resolveUrl(this.defaultEndpoints[endpoint]!, server);
    }

    // Since we have defaultEndpoints to all possible values
    // we could return null but endpoint type restricts possible values and only
    // way to bypass this is to pass value as 'any' type
    throw new AppError({
      name: 'ENDPOINT_NOT_FOUND',
      message: `Please pass valid endpoint`,
    });
  }

  /**
   * Generate authentication URI from passed configuration
   *
   * @param {OAuthAuthorizeParameters} options
   * @returns {string} generated authorization URL
   */
  public getAuthorizeURL(options: OAuthAuthorizeParameters): string | null {
    const scope = Array.isArray(options.scope) ? options.scope.join(' ') : options.scope;
    const { clientId } = this.settings;

    const endpoint = this.getEndpoint('authorizationEndpoint');

    const urlBuilder = new URLBuilder(endpoint, {
      client_id: clientId,
      response_type: options.responseType,
      redirect_uri: options.redirectUri,
      scope,
    });

    if (options?.showDialog) {
      urlBuilder.addParameters({
        show_dialog: options.showDialog + '', // URLSearchParams accepts only string as value
      });
    }

    if (options?.state) {
      urlBuilder.addParameters({
        state: options.state,
      });
    }

    if (options?.codeChallengeMethod && options?.codeChallenge) {
      urlBuilder.addParameters({
        code_challenge: options.codeChallenge,
        code_challenge_method: options.codeChallengeMethod,
      });
    }

    return urlBuilder.toString();
  }

  public tokenURLBuilder(
    endpoint: URL | string,
    options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE,
  ): URLBuilder {
    const urlBuilder = new URLBuilder(endpoint, {
      client_id: this.settings.clientId,
    });

    switch (options.grantType) {
      case 'authorization_code': {
        urlBuilder.addParameters({
          grant_type: options.grantType,
          code: options.code,
          redirect_uri: options.redirectUri,
          code_verifier: options.codeVerifier,
        });

        break;
      }
      case 'refresh_token': {
        urlBuilder.addParameters({
          grant_type: options.grantType,
          refresh_token: options.refreshToken,
        });
        break;
      }

      default: {
        break;
      }
    }

    return urlBuilder;
  }

  public validate(url: URL | string, options?: OAuthValidationParameters): boolean {
    const params = resolveUrl(url).searchParams;
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    const state = params.get('state');
    const code = params.get('code');

    if (error) {
      debug({
        name: 'RESPONSE_ERROR',
        message: errorDescription || 'Undefined response error',
      });

      return false;
    }

    if (code === null) {
      debug({
        name: 'CODE_NOT_FOUND',
        message: `Couldn't find 'code' in received url`,
      });

      return false;
    }

    if (state !== null) {
      if (options?.state === undefined) {
        debug({
          name: 'STATE_NOT_FOUND',
          message: `Received 'state' in response but I wasn't able to read 'state' from options parameter`,
        });

        return false;
      }

      if (options?.state !== state) {
        debug({
          name: 'STATE_MISMATCH',
          message: `State parameter from response didn't match the 'state' passed in options parameter`,
        });

        return false;
      }
    }

    return true;
  }

  private async discover() {
    const endpoint = this.getEndpoint('discoveryEndpoint');

    try {
      const response = await this.reqClient.fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        mode: 'no-cors',
      });

      if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
        debug({
          name: 'DISCOVERY_CONTENT_TYPE_ERROR',
          message: `Received response was not JSON response`,
        });

        return;
      }

      const responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      const message = error instanceof Error ? error.message : `OpenID discovery fetch failed`;

      debug({
        name: 'DISCOVERY_CONFIGURATION_ERROR',
        message,
      });
    }
  }

  public async accessToken(
    options: Omit<OAuthAccessTokenRequestPKCE, 'grantType'>,
  ): Promise<ResultWrapper<OAuthTokens>> {
    return this.__request('tokenEndpoint', {
      ...options,
      grantType: 'authorization_code',
    });
  }

  public async refreshToken(
    options: Omit<OAuthRefreshTokensRequestPKCE, 'grantType'>,
  ): Promise<ResultWrapper<OAuthTokens>> {
    return this.__request('tokenEndpoint', {
      ...options,
      grantType: 'refresh_token',
    });
  }

  private async __request(
    endpoint: OAuthEndpoints,
    // make union of possible options
    options: OAuthAccessTokenRequestPKCE | OAuthRefreshTokensRequestPKCE,
  ): Promise<ResultWrapper<OAuthTokens>> {
    const endpointUri = this.getEndpoint(endpoint);
    const basicAuth = this.getBasicAuthToken();

    if (basicAuth === null) {
      const message = `Client secret not provided`;
      debug({
        name: 'BASIC_AUTH_CONFIGURATION_ERROR',
        message,
      });

      return {
        error: message,
      };
    }

    const requestTokenURL = this.tokenURLBuilder(endpointUri, options);
    const queryStringBody = requestTokenURL.getSearchParams().toString();

    const requestBuilder = new RequestBuilder(endpointUri, {
      method: 'POST',
      body: queryStringBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
    });

    const requestInstance = requestBuilder.getRequest();

    try {
      const request = await this.reqClient.fetch(requestInstance);
      const response = await request.json();

      if (response?.error) {
        let message = `OAuth error: ${response.error}`;

        if (response?.error_description) {
          message += ` | ${response.error_description}`;
        }

        debug({
          name: 'TOKEN_REQUEST_ERROR',
          message,
        });

        return {
          error: message,
        };
      } else if (request.status === 401) {
        const message = `OAuth received error. Check your clientId or clientSecret`;

        debug({
          name: 'TOKEN_REQUEST_CREDENTIALS_ERROR',
          message,
        });

        return {
          error: message,
        };
      }

      return {
        data: this.getTokensFromResponse(response),
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : `Couldn't send request to service`;

      debug({
        name: 'TOKEN_REQUEST_UNKNOWN_ERROR',
        message,
      });

      return {
        error: message,
      };
    }
  }
}
