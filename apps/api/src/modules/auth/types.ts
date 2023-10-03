// #############################
// 				  OAUTH
// #############################

// export const IResponse = {
//   CODE: 'code',
// } as const;

// export const IGrant = {
//   AUTHORIZATION: 'authorization_code',
//   REFRESH_TOKEN: 'refresh_token',
// } as const;

// export const IAuthenticationAction = {
//   REQUEST_DATA: 'request_data',
//   REQUEST_TOKENS: 'request_tokens',
//   REFRESH_TOKENS: 'refresh_tokens',
//   AUTHENTICATE_SERVICE: 'authenticate_service',
// } as const;

// export type ResponseType = keyof typeof IResponse;
// export type GrantType = keyof typeof IGrant;
// export type AuthenticationActionType = keyof typeof IAuthenticationAction;
export type ResponseType = 'code';
export type GrantType = 'authorization_code' | 'refresh_token';
export type AuthenticationActionType = 'request_data' | 'request_tokens' | 'refresh_tokens' | 'authenticate_service';
export type CodeChallengeMethodType = 'S256' | 'plain';
export type OAuthEndpoints = 'tokenEndpoint' | 'authorizationEndpoint' | 'discoveryEndpoint';

export interface OAuthSettings {
  /**
   * URL of OAuth2 server
   */
  server: string;

  /**
   * OAuth2 client id - required to authenticate requests with your application
   */
  clientId: string;

  /**
   * OAuth2 secret code - required only for authorization code and client credentials
   */
  clientSecret?: string;

  /**
   * Required for authorization code flow - by default it is /authorize endpoint
   */
  authorizationEndpoint?: string;

  /**
   * Required endpoint for requesting and refreshing tokens
   */
  tokenEndpoint?: string;

  /**
   * OAuth2 discovery endpoint
   * For most services it is '.well-known/oauth-authorization-server'
   * Useful for discovering other endpoints if previous are not provided
   */
  discoveryEndpoint?: string;
}

export interface OAuthParametersRequest {
  /**
   * Almost everywhere it is code for authorization code flow
   */
  responseType: ResponseType;

  /**
   * Defines if fetch is send to request new access tokens or refresh existing
   */
  grantType: GrantType;

  /**
   * Selected page to redirect user after authentication
   */
  redirectUri: string;

  /**
   * Received code from service. Needs to be send when fetching access tokens
   */
  code: string;

  /**
   * Used when refreshing existing access tokens
   */
  refreshToken: string;

  /**
   * Generated nonce that will be used to verify received tokens from service
   */
  state?: string;
  nonce?: string; // same as state - both are commonly used

  /**
   * List of required scopes to access data
   */
  scope: string | string[];

  /**
   * Default true for some services
   * show window authentication to user once again if this option is set to true
   */
  showDialog?: boolean;

  /**
   * Required when using PKCE flow
   */
  codeVerifier?: string;

  /**
   * Algorithm used to generate code challenge
   */
  codeChallengeMethod?: CodeChallengeMethodType;

  /**
   * Generated code challenge using selected method
   */
  codeChallenge?: string;
}

/**
 * UNIONS
 */
export type OAuthValidationParameters = Pick<OAuthParametersRequest, 'state' | 'nonce'>;
export type OAuthCodeChallengeStruct = Pick<OAuthParametersRequest, 'codeChallengeMethod' | 'codeChallenge'>;

export type OAuthAuthorizeParameters = OAuthValidationParameters &
  OAuthCodeChallengeStruct &
  Pick<OAuthParametersRequest, 'responseType' | 'redirectUri' | 'scope' | 'showDialog'>;

export type OAuthResponseValidation = Pick<OAuthParametersRequest, 'code'>;

export type OAuthAccessTokenRequest = Required<
  { grantType: 'authorization_code' } & Pick<OAuthParametersRequest, 'code' | 'redirectUri'>
>;
export type OAuthAccessTokenRequestPKCE = OAuthAccessTokenRequest &
  Required<Pick<OAuthParametersRequest, 'codeVerifier'>>;

export type OAuthRefreshTokensRequest = Required<
  { grantType: 'refresh_token' } & Pick<OAuthParametersRequest, 'refreshToken'>
>;
export type OAuthRefreshTokensRequestPKCE = OAuthRefreshTokensRequest;

export interface OAuthTokens {
  // Access token required to make server calls to service
  accessToken: string;

  // Bearer, Basic etc.
  tokenType: string;

  // Most services provide expires time in seconds
  expiresIn: number;

  // Token used to refresh access token
  refreshToken: string;

  // Time of recent request tokens
  dateOfLastRequest: number;
}

export interface OAuthRequestTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
