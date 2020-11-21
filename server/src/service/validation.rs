use crate::error::ServerError;
use jsonschema::JSONSchema;
use serde_json::Value as JsonValue;

pub fn validate_json_schema(params: &JsonValue) -> Result<(), ServerError> {
    if let Err(error) = JSONSchema::compile(params) {
        debug!("unable to validate json schema {:?}", error);
        return Err(ServerError::BadRequest("json schema format invalid".into()));
    }
    Ok(())
}
