import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppError } from '@flowx/shared';
import { Fetch } from 'app/lib/fetch';
import { OAuth2 } from '../oauth';
import { OAuthAuthorizeParameters, OAuthCodeChallengeStruct, OAuthSettings } from '../types';

vi.mock('app/lib/fetch', () => {
  return {
    Fetch: {
      fetch: vi.fn(async () => {
        return {
          json: () => {
            return {
              access_token: 'random_access_token',
              token_type: 'Bearer',
              expires_in: 3600,
              refresh_token: 'secret_token',
            };
          },
        };
      }),
    },
  };
});

const serviceOptions: OAuthSettings = {
  server: 'https://service.com',
  clientId: 'dGVzdCB0ZXN0IHRlc3Rz',
  clientSecret: 'MDEyMzQ1Njc4OTEwMTExMjEzMTQxNTE2',
  authorizationEndpoint: '/authorize',
  tokenEndpoint: '/api/token',
  discoveryEndpoint: '/.well-known/openid-configuration',
};

const authOptions: OAuthAuthorizeParameters = {
  redirectUri: 'https://local.app/authorize',
  responseType: 'code',
  scope: ['user', 'email'],
};

const redirectedURLWithCode = `http://localhost:5173/authorize/spotify?code=ultra_secret_code&state=secret_state`;
const redirectedURLWithError = `http://localhost:5173/authorize/spotify?code=ultra_secret_code&state=secret_state`;

const auth = new OAuth2(serviceOptions, Fetch);

let codeGlobal: string;
let challengeGlobal: OAuthCodeChallengeStruct;
let urlGlobal: string | null;

beforeEach(async () => {
  codeGlobal = auth.generateCodeVerifier();
  challengeGlobal = await auth.generatePKCECodeChallenge(codeGlobal);

  const { codeChallenge, codeChallengeMethod } = challengeGlobal;

  urlGlobal = auth.getAuthorizeURL({
    ...authOptions,
    state: 'secret_state',
    codeChallenge,
    codeChallengeMethod,
  });
});

describe('Test OAuth service', () => {
  it('generate code verifier', () => {
    const code = auth.generateCodeVerifier();

    expect(typeof code).toBe('string');
  });

  it('generate PKCE code challenge', async () => {
    expect.assertions(4);

    const challenge = await auth.generatePKCECodeChallenge(codeGlobal);

    expect(challenge).toHaveProperty('codeChallengeMethod');
    expect(challenge?.codeChallengeMethod).toBe('S256');
    expect(challenge).toHaveProperty('codeChallenge');
    expect(typeof challenge?.codeChallenge).toBe('string');
  });

  it('fail generating PKCE code challenge', async () => {
    expect.assertions(3);

    try {
      await auth.generatePKCECodeChallenge(null as any);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('message');
      expect(error).toHaveProperty('name');
      // expect(error.name).toBe('CODE_CHALLENGE_FAILED');
    }
  });

  describe('generate authorization URL', () => {
    it('with PKCE - default values', async () => {
      expect.assertions(1);

      const { codeChallenge, codeChallengeMethod } = challengeGlobal;

      const url = auth.getAuthorizeURL({
        ...authOptions,
        state: 'secret_state',
        codeChallenge,
        codeChallengeMethod,
      });

      expect(typeof url).toBe('string');
    });
    it('without PKCE - default values', async () => {
      expect.assertions(1);

      const url = auth.getAuthorizeURL(authOptions);

      expect(typeof url).toBe('string');
    });
  });

  describe('access token requests', () => {
    it('should send request', async () => {
      expect.assertions(1);

      const request = await auth.accessToken({
        code: '123123',
        codeVerifier: codeGlobal,
        redirectUri: authOptions.redirectUri,
      });

      expect(request).toHaveProperty('data');
    });
  });
});
