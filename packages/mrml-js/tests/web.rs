//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use mrml_js;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn to_html_success() {
    let result = mrml_js::to_html("<mjml></mjml>");
    assert!(result.is_ok());
}

#[wasm_bindgen_test]
fn to_html_error() {
    let result = mrml_js::to_html("<mjml");
    assert!(result.is_err());
}
