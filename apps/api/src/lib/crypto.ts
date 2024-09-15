// https://github.com/dchest/tweetnacl-js

export interface CryptoClient {
  encrypt: (input: string | ArrayBuffer, key: string) => ArrayBuffer | Promise<ArrayBuffer>
  decrypt: (input: string | ArrayBuffer, key: string) => ArrayBuffer | Promise<ArrayBuffer>
  hash?: (key: unknown) => unknown
  verify?: (key: unknown) => unknown
}

export const Crypto: CryptoClient = {
  encrypt: (_input: string | ArrayBuffer, _key: string): ArrayBuffer | Promise<ArrayBuffer> => {
    throw new Error('Function not implemented.')
    // return input as ArrayBuffer;
  },
  decrypt: (_input: string | ArrayBuffer, _key: string): ArrayBuffer | Promise<ArrayBuffer> => {
    throw new Error('Function not implemented.')
    // return input as ArrayBuffer;
  },
  hash: (_key: unknown): unknown => {
    throw new Error('Function not implemented.')
  },
  verify: (_key: unknown): unknown => {
    throw new Error('Function not implemented.')
  },
}
