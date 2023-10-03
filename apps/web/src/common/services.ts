// import { ServiceState } from 'app/types/store';

// export default {
//   Spotify: {
//     $id: '54365b65-639b-47fd-bbc3-c48c5f0e2b44',
//     name: 'Spotify',
//     config: {
//       icon: 'lab la-spotify',
//       color: '#1DB954',
//       isEnabled: true,
//     },
//     auth: {
//       hasRequestedTokens: false,
//       credentials: {
//         authorizationUri: 'https://accounts.spotify.com/authorize',
//         tokenEndpointUri: 'https://accounts.spotify.com/api/token',
//         clientId: '',
//         clientSecret: '',
//         scope: 'user-read-private user-read-email',
//       },
//       tokens: {},
//     },
//     dataPaths: [
//       {
//         name: 'me',
//         path: 'https://api.spotify.com/v1/me',
//         select: [
//           {
//             label: 'Kraj',
//             detail: 'country',
//             isImportant: false,
//             isEnabled: true,
//           },
//           {
//             label: 'Nazwa',
//             detail: 'display_name',
//             isImportant: false,
//             isEnabled: true,
//           },
//           {
//             label: 'Email',
//             detail: 'email',
//             isImportant: false,
//             isEnabled: true,
//           },
//           {
//             label: 'Followers',
//             detail: 'followers.total',
//             isImportant: true,
//             isEnabled: true,
//           },
//           {
//             label: 'Typ konta',
//             detail: 'product',
//             isImportant: true,
//             isEnabled: true,
//             matcher: { premium: 'Premium' },
//           },
//         ],
//       },
//     ],
//     data: [],
//   },
//   Discord: {
//     $id: '19fd6125-4c8d-4300-b7c9-63d210132707',
//     name: 'Discord',
//     config: {
//       icon: 'lab la-discord',
//       color: '#7686CA',
//       isEnabled: true,
//     },
//     auth: {
//       hasRequestedTokens: false,
//       credentials: {
//         authorizationUri: 'https://discord.com/api/oauth2/authorize',
//         tokenEndpointUri: 'https://discord.com/api/oauth2/token',
//         clientId: '',
//         clientSecret: '',
//         scope: 'identify email guilds',
//       },
//       tokens: {},
//     },
//     dataPaths: [
//       {
//         name: '@me',
//         path: 'https://discordapp.com/api/users/@me',
//         select: [
//           {
//             label: 'Nazwa',
//             detail: 'username',
//             isImportant: false,
//             isEnabled: true,
//           },
//           {
//             label: 'Email',
//             detail: 'email',
//             isImportant: false,
//             isEnabled: true,
//           },
//           {
//             label: '#ID',
//             detail: 'discriminator',
//             isImportant: true,
//             isEnabled: true,
//           },
//           {
//             label: 'Zweryfikowany',
//             detail: 'verified',
//             isImportant: true,
//             isEnabled: true,
//             matcher: {
//               true: 'Tak',
//               false: 'Nie',
//             },
//           },
//           {
//             label: 'Weryfikacja 2FA',
//             detail: 'mfa_enabled',
//             isImportant: true,
//             isEnabled: true,
//             matcher: {
//               true: 'Włączona',
//               false: 'Wyłączona',
//             },
//           },
//         ],
//       },
//       {
//         name: '@me/guilds',
//         path: 'https://discordapp.com/api/users/@me/guilds',
//         select: [
//           {
//             label: 'Serwery',
//             detail: 'name',
//             isImportant: false,
//             isEnabled: true,
//             arrayLimit: 3,
//           },
//         ],
//       },
//     ],
//     data: [],
//   },
// } as ServiceState['list'];
