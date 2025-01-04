import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'

/**
 * Encodes a session token using SHA-256 and Base32 encoding using oslojs lib
 */
function encodeSessionToken(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
}

/**
 * Generates a random session token using Base32 encoding using nodejs crypto and oslojs lib
 */
function generateSessionToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}

export { encodeSessionToken, generateSessionToken }
