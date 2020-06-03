use mrml;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(catch)]
pub fn to_html(input: &str) -> Result<String, JsValue> {
    match mrml::to_html(input, mrml::Options::default()) {
        Ok(value) => Ok(value),
        Err(err) => Err(JsValue::from(format!("error: {:?}", err))),
    }
}
