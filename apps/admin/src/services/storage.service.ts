// /* eslint-disable @typescript-eslint/restrict-template-expressions */
// import { decrypt, encrypt } from 'app/helpers/crypto';
// import { generateDownloadUrl } from 'app/helpers/fs';
// import { Argon2 } from 'app/helpers/hash';
// import { useStore } from 'app/store/main';
// import { useServiceStore } from 'app/store/service';
// import { FileSchema, URLDownload } from 'app/types/fs';
// import { ConvertedStore, RootState } from 'app/types/store';
// import { Buffer } from 'buffer';
// import { debug } from 'debug';

export interface URLDownload {
  name: string;
  url: string;
}

export interface FileSchema {
  encryption: {
    salt: string;
  };
  data: string;
}

// export class StorageService {
//   static async downloadVault(vault: RootState): Promise<URLDownload> {
//     try {
//       // @FIXME: change to single store
//       const store = useStore();
//       const serviceStore = useServiceStore();

//       const {
//         encryption: { passwordHash, salt },
//       } = store.vault;

//       const convertedStore = {
//         store: store.$state,
//         serviceStore: serviceStore.$state,
//       };

//       // First step: convert object to JSON and save it as Buffer/UInt8Array
//       // We use Buffer because converting JSONObject to utf-8 using TextEncoder is bad
//       // Values above 128 and below 255 creates additional random values
//       // which leads to data corruption and in return we get not exact data we didn't saved
//       const restAB = Buffer.from(JSON.stringify(convertedStore));
//       // Second step: encrypt converted buffer
//       const restABEncrypted = await encrypt(restAB, passwordHash);
//       // Third step: convert arraybuffer to hex
//       const restAsHex = Buffer.from(restABEncrypted).toString('hex');

//       // Fourth step: salt doesn't have to be secret, so it doesn't need to be encrypted
//       // We need salt to generate a new hash used to decrypt the vault
//       const contentRaw: FileSchema = {
//         encryption: {
//           salt,
//         },
//         data: restAsHex,
//       };

//       // Fifth step: save configuration and encrypted data in buffer then convert it to hex
//       const encryptedContent = Buffer.from(JSON.stringify(contentRaw)).toString('hex');

//       // Finally, generate a download url from our encrypted data
//       const url = generateDownloadUrl(encryptedContent);

//       return {
//         name: vault.name,
//         url,
//       };
//     } catch (error) {
//       // if (error instanceof Error) {
//       debug('[StorageService]')(`DownloadVault: ${error}`);
//       // }
//       throw new Error('[StorageService] DownloadVault');
//     }
//   }

//   static async openVault(payload: string, rawPassword: string): Promise<void> {
//     try {
//       const store = useStore();

//       // These steps are complicated
//       // 1: Convert saved vault as hex to utf-8
//       const encryptedStringified = Buffer.from(payload, 'hex').toString('utf-8');
//       // 2: Configuration and encrypted data must be parsed as JSON
//       const encryptedParsed = JSON.parse(encryptedStringified) as FileSchema;
//       // 3: We get the encryption configuration and our encrypted data
//       const { encryption, data } = encryptedParsed;

//       // 4: Create new hash using raw password and old salt
//       const [_, encoded] = await Argon2.hash(rawPassword, encryption.salt);

//       // 5: Convert encrypted data from hex to UInt8Array
//       const dataFromHex = Buffer.from(data, 'hex');
//       // 6: Decrypt with newly generated hash
//       const decryptedAB = await decrypt(dataFromHex, encoded);
//       // 7: Convert from UInt8Array to utf-8
//       const decrypted = Buffer.from(decryptedAB).toString('utf-8');

//       // Finally, we can parse decrypted data as its format is known
//       const vault = JSON.parse(decrypted) as ConvertedStore;

//       const convertedStore = {
//         ...vault.store,
//         services: vault.serviceStore,
//       };

//       store.createVault(convertedStore);
//     } catch (error) {
//       // if (error instanceof Error) {
//       debug('[StorageService]')(`OpenVault: ${error}`);
//       // }
//       throw new Error('[StorageService] OpenVault');
//     }
//   }
// }
