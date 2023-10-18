#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_derive_key() {
    use wasm::crypto::deriv_key::DerivKey;

    let password = "secretP44sw0rd";
    let mut derived_key = DerivKey::derive_key(&password);

    let raw = derived_key.get_raw();
    assert!(DerivKey::verify_key(&password, &raw));
}
