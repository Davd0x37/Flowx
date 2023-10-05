use chacha20poly1305::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Key, XChaCha20Poly1305, XNonce,
};
use hex::*;
// use rand_core::RngCore;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(input: &str, key: &str) -> String {
    // decode key saved as hex value - must be decoded otherwise using .as_bytes will
    // parse every character as separate byte and in result we get 2x larger array
    let key = hex::decode(&key[..]).expect("Failed decoding hex to bytes");
    let key = Key::from_slice(&key);
    // create cipher instance
    let aead = XChaCha20Poly1305::new(key);

    // // Generate random bytes and fill array
    // let mut nonce = [0u8; 24];
    // OsRng.fill_bytes(&mut nonce);

    let nonce = XChaCha20Poly1305::generate_nonce(&mut OsRng);

    // Convert to generic_array
    // let nonce = XNonce::from_slice(&nonce);

    // Encrypt input
    let ciphertext = aead
        .encrypt(&nonce, input.as_bytes())
        .expect("Encryption failed!"); // NOTE: handle this error to avoid panics!

    // Concat nonce with encrypted data [nonce (24 bytes [start 0, 23 stop]), encrypted ([start 24, .. stop])]
    let out: Vec<u8> = nonce.to_vec().into_iter().chain(ciphertext).collect();

    out.encode_hex()
}

/// input must contain previously generated nonce 0..23 position (23 bytes)
#[wasm_bindgen]
pub fn decrypt(input: &str, key: &str) -> String {
    let input = hex::decode(input).expect("Error while decoding hex");
    // decode key saved as hex - 2x larger array if not decoded
    let key = hex::decode(&key[..]).expect("Failed decoding hex to bytes");

    let key = Key::from_slice(&key);
    let aead = XChaCha20Poly1305::new(key);

    // First 24 bytes are nonce
    // for XNonce length of nonce is 24 bytes
    // however for Nonce (used with ChaCha20), length of nonce is 12 bytes
    let nonce = &input[0..=23];
    let nonce = XNonce::from_slice(nonce);

    // content starts at 24 index
    let ciphertext = &input[24..];

    // decrypt with nonce
    let decipher = aead.decrypt(nonce, ciphertext).expect("Decryption failed!");

    String::from_utf8(decipher).expect("Error while converting decipher to utf8")
}

#[test]
fn test_derive_key() {
    use crate::crypto::deriv_key::DerivKey;

    let password = "secretP44sw0rd";
    let mut derived_key = DerivKey::derive_key(&password);

    let message = "SOME MESSAGE";

    let encrypted = encrypt(message, &derived_key.get_hash());
    let decrypted = decrypt(&encrypted, &derived_key.get_hash());

    assert_eq!(message, decrypted);
}
