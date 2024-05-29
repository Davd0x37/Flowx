/**
 * Converts ArrayBuffer data into hex string
 * @param {Uint8Array} buffer Data saved in ArrayBuffer instance
 * @returns {string} ArrayBuffer converted to hex
 */
export const toHex = (buffer: Uint8Array): string =>
  buffer.reduce((mem, val) => mem + `00${val.toString(16)}`.slice(-2), '');

/**
 * Converts string to hex
 *
 * @param {string} input Input string
 * @return {string} {string} Converted string to hex
 */
export const strToHex = (input: string): string =>
  input
    .split('')
    .map((str) => str.charCodeAt(0).toString(16))
    .join('');

/**
 * Converts input string into base64 string
 * @param {string} input String input which will be converted to base64 string
 * @returns {string} string encoded in base64
 */
export const base64UrlEncode = (input: string): string =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Converts ArrayBuffer into base64 string
 * @param {ArrayBuffer} input content saved in ArrayBuffer
 * @returns {string} encoded base64 string from ArrayBuffer input
 */
export const base64UrlEncodeAB = (input: ArrayBuffer): string =>
  base64UrlEncode(String.fromCharCode(...new Uint8Array(input)));

/**
 * Return string input as Uint8Array
 *
 * @param {string} str String to encode
 * @return {Uint8Array} Encoded string
 */
export const stringToArrayBuffer = (str: string): Uint8Array => new TextEncoder().encode(str);

/**
 * Decode ArrayBuffer as string
 *
 * @param {BufferSource} ab
 * @return {string} Decoded array
 */
export const arrayBufferToString = (ab: BufferSource, encoding = 'utf-8'): string =>
  new TextDecoder(encoding).decode(ab);
