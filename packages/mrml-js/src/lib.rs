#[macro_use]
extern crate serde_derive;

use mrml;
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
pub struct JsEmail {
    pub html: String,
    pub text: String,
    pub subject: String,
}

impl JsEmail {
    fn from_str(input: &str) -> Result<Self, String> {
        match mrml::to_email(input, mrml::Options::default()) {
            Ok(value) => Ok(Self::from(value)),
            Err(err) => Err(format!("{:?}", err)),
        }
    }

    pub fn parse(input: &str) -> Result<JsValue, JsValue> {
        match Self::from_str(input) {
            Ok(value) => Ok(value.into()),
            Err(err) => Err(JsValue::from_str(err.as_str())),
        }
    }
}

impl From<mrml::Email> for JsEmail {
    fn from(value: mrml::Email) -> Self {
        Self {
            html: value.html,
            text: value.text,
            subject: value.subject,
        }
    }
}

impl Into<JsValue> for JsEmail {
    fn into(self) -> JsValue {
        JsValue::from_serde(&self).unwrap()
    }
}

#[wasm_bindgen(js_name = toEmail)]
pub fn to_email(input: &str) -> Result<JsValue, JsValue> {
    JsEmail::parse(input)
}
