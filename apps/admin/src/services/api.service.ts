// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { hasTokens, tokensExpired } from 'app/helpers/oauth';
// import { GET_REDIRECT_URI } from 'app/helpers/utils';
// import { useServiceStore } from 'app/store/service';
// import { GrantTypeEnum } from 'app/types/auth';
// import { Selector } from 'app/types/common';
// import { Data, DataPath, Service } from 'app/types/service';
// import debug from 'debug';
// import { get } from 'lodash';

// import { OAuthStrategy } from './auth/oauth.strategy';
// import { RequestService } from './request.service';

// const runSelector = (obj: Selector, { detail, arrayLimit }: Data): string => {
//   if (Array.isArray(obj)) {
//     const selected = obj.flatMap((record) => get(record, detail));

//     return arrayLimit ? selected.slice(0, arrayLimit).join(', ') : selected.join(', ');
//   }

//   return get(obj, detail);
// };

// const selectData = (obj: Selector, selectors: Data[]): Pick<Data, 'label' | 'detail' | 'isEnabled' | 'isImportant'>[] =>
//   selectors.flatMap((selector) => {
//     const { label, isEnabled, isImportant, matcher } = selector;

//     const selected = runSelector(obj, selector);

//     const detail = matcher ? (get(matcher, selected) as string) : selected;

//     return {
//       label,
//       detail,
//       isImportant,
//       isEnabled,
//     };
//   });

// export class ApiService {
//   async authenticate(service: Service): Promise<string> {
//     try {
//       const oauthStrategy = new OAuthStrategy();
//       const store = useServiceStore();

//       const {
//         name,
//         auth: { credentials },
//       } = service;

//       const redirectUri = GET_REDIRECT_URI(name);

//       oauthStrategy.setCredentials({
//         authorizationUri: credentials.authorizationUri,
//         clientId: credentials.clientId,
//         scope: credentials.scope,
//         redirectUri,
//       });

//       const { codeVerifier, codeChallenge, authorizationUri } = await oauthStrategy.setupAuthentication();

//       store.updateTokens(name, {
//         codeVerifier,
//         codeChallenge,
//       });

//       return authorizationUri;
//     } catch (error) {
//       if (error instanceof Error) {
//         debug('[ApiService]')(`Authenticate: ${error.message}`);
//       }
//       throw new Error(`[ApiService] Authenticate - Throw ERROR`);
//     }
//   }

//   async requestTokens(service: Service): Promise<void> {
//     try {
//       if (!hasTokens(service.auth.tokens)) {
//         throw new Error("Couldn't find tokens!");
//       }

//       const oauthStrategy = new OAuthStrategy();
//       const store = useServiceStore();

//       const {
//         name,
//         auth: {
//           tokens: { receivedTokensTime, expiresIn, refreshToken, code, codeVerifier },
//           credentials: { clientId, tokenEndpointUri },
//           hasRequestedTokens,
//         },
//       } = service;

//       const exists =
//         hasRequestedTokens &&
//         receivedTokensTime &&
//         expiresIn &&
//         tokensExpired(receivedTokensTime as string, expiresIn as string);

//       // if (hasRequestedTokens && receivedTokensTime && expiresIn) {
//       //   if (tokensExpired(receivedTokensTime, expiresIn)) {
//       //     exists = true;
//       //   }
//       // }

//       const redirectUri = GET_REDIRECT_URI(name);

//       // @TODO: maybe create builder for parameters?
//       const params = {
//         client_id: clientId,
//         redirect_uri: redirectUri,
//         grant_type: exists ? GrantTypeEnum.REFRESH_TOKEN : GrantTypeEnum.AUTHORIZATION,
//         ...(exists ? { refresh_token: refreshToken } : { code, code_verifier: codeVerifier }),
//       };

//       oauthStrategy.setCredentials({
//         tokenEndpointUri,
//       });

//       const requestedTokens = await oauthStrategy.requestTokens(params);

//       store.updateTokens(name, {
//         codeVerifier: null,
//         codeChallenge: null,
//         code: null,
//         ...requestedTokens,
//       });

//       store.toggleRequestedTokens(name);
//     } catch (error) {
//       if (error instanceof Error) {
//         debug('[ApiService]')(`RequestTokens: ${error.message}`);
//       }
//       throw new Error(`[ApiService] RequestTokens - Throw ERROR`);
//     }
//   }

//   async requestData(service: Service): Promise<Data[]> {
//     try {
//       const requestService = new RequestService();

//       const {
//         auth: {
//           tokens: { accessToken, tokenType },
//         },
//         dataPaths,
//       } = service;

//       if (!Array.isArray(dataPaths) || !accessToken || !tokenType) {
//         throw new Error('[ApiService] RequestData: Data paths must be array');
//       }

//       const temp: Promise<Data[]>[] = [];

//       const run = async (path: DataPath): Promise<Data[]> => {
//         requestService.setUrl(path.path);
//         requestService.setToken(tokenType as string, accessToken as string);

//         const data = await requestService.get<Selector>();
//         const selected = selectData(data, path.select);

//         return selected;
//       };

//       dataPaths.forEach((path: DataPath) => {
//         temp.push(run(path));
//       });

//       const dataArrays = await Promise.all(temp);
//       const concat = dataArrays.reduce((acc: Data[], curr: Data[]) => [...acc, ...curr], []);

//       return concat;
//     } catch (error) {
//       if (error instanceof Error) {
//         debug('[ApiService]')(`RequestData: ${error.message}`);
//       }
//       throw new Error(`[ApiService] RequestData - Throw ERROR`);
//     }
//   }

//   async refreshService(name: string): Promise<void> {
//     const store = useServiceStore();
//     if (store.hasRequestedTokens(name)) {
//       const service = store.getService(name);
//       const data = await this.requestData(service);

//       store.updateService({
//         ...service,
//         data,
//       });
//     }
//   }

//   async refreshServices(): Promise<void> {
//     const store = useServiceStore();
//     await Promise.any(store.servicesList.map((service) => this.refreshService(service.name)));
//   }
// }
