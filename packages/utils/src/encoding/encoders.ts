/**
 * Converts input string into base64 string
 *
 * @param {string} input String input which will be converted to base64 string
 * @returns {string} string encoded in base64
 */
function base64UrlEncode(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Converts Uint8Array into base64 string
 *
 * @param {Uint8Array} input content saved in Uint8Array
 * @returns {string} encoded base64 string from Uint8Array input
 */
function base64UrlEncodeAB(input: Uint8Array): string {
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(input)))
}

/**
 * Converts string to hex
 *
 * @param {string} input Input string
 * @return {string} {string} Converted string to hex
 */
function strToHex(input: string): string {
  return input
    .split('')
    .map((str) => str.charCodeAt(0).toString(16))
    .join('')
}

/**
 * Converts Uint8Array data into hex string
 *
 * @param {Uint8Array} buffer Data saved in Uint8Array instance
 * @returns {string} Uint8Array converted to hex
 */
function toHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map((val) => `00${val.toString(16)}`.slice(-2))
    .join('')
}

/**
 * Return string input as Uint8Array
 *
 * @param {string} str String to encode
 * @return {Uint8Array} Encoded string
 */
const stringToArrayBuffer = (str: string): Uint8Array =>
  new TextEncoder().encode(str)

/**
 * Decode Uint8Array as string
 *
 * @param {BufferSource} ab
 * @return {string} Decoded array
 */
function arrayBufferToString(ab: BufferSource, encoding = 'utf-8'): string {
  return new TextDecoder(encoding).decode(ab)
}

export {
  arrayBufferToString,
  base64UrlEncode,
  base64UrlEncodeAB,
  stringToArrayBuffer,
  strToHex,
  toHex,
}
