use crate::error::ServerError;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value as JsonValue};
use uuid::Uuid;

use super::TemplateVersion;
use super::COLUMNS;

lazy_static! {
    pub static ref QUERY_INSERT: String = format!(
        "INSERT INTO template_versions (template_id, name, content, attributes) VALUES ($1, $2, $3, $4) RETURNING {}",
        COLUMNS.as_str()
    );
}

const DEFAULT_TEMPLATE_CONTENT: &'static str = r#"<mjml>
    <mj-head>
        <mj-title>Hello {{username}}</mj-title>
        <mj-preview>This is the preview of your email</mj-preview>
    </mj-head>
    <mj-body>
    </mj-body>
</mjml>
"#;

fn default_attributes() -> JsonValue {
    json!({
        "type": "object",
        "properties": {
            "username": {
                "type": "string",
            },
        },
        "required": []
    })
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateVersionCreate {
    template_id: Uuid,
    name: String,
    content: String,
    attributes: JsonValue,
}

impl TemplateVersionCreate {
    pub fn create(
        template_id: Uuid,
        name: String,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> Self {
        let content = content.unwrap_or(DEFAULT_TEMPLATE_CONTENT.into());
        let attributes = match attributes {
            Some(value) => value,
            None => default_attributes(),
        };
        Self {
            template_id,
            name,
            content,
            attributes,
        }
    }

    pub async fn save(&self, client: &Client) -> Result<TemplateVersion, ServerError> {
        debug!("save template version {}", self.template_id);
        let stmt = client.prepare(QUERY_INSERT.as_str()).await?;
        let rows = client
            .query(
                &stmt,
                &[
                    &self.template_id,
                    &self.name,
                    &self.content,
                    &self.attributes,
                ],
            )
            .await?;
        Ok(rows.first().map(TemplateVersion::from).unwrap())
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;
    use serde_json::Value as JsonValue;

    pub async fn create_template_version(
        template_id: Uuid,
        name: String,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> TemplateVersion {
        let client = POOL.get().await.unwrap();
        let tmpl = TemplateVersionCreate::create(template_id, name, content, attributes);
        tmpl.save(&client).await.unwrap()
    }
}
