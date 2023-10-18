#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_derive_key() {
    use wasm::crypto::{deriv_key::*, xchacha20::*};

    let password = "secretP44sw0rd";
    let mut derived_key = DerivKey::derive_key(&password);

    let message = "SOME MESSAGE";

    let encrypted = encrypt(message, &derived_key.get_hash());
    let decrypted = decrypt(&encrypted, &derived_key.get_hash());

    assert_eq!(message, decrypted);
}
