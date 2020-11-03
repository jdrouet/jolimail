use crate::error::ServerError;
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

const DEFAULT_TEMPLATE_CONTENT: &str = r#"<mjml>
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
        let content = content.unwrap_or_else(|| DEFAULT_TEMPLATE_CONTENT.into());
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

    pub async fn save<'a, X>(&self, conn: X) -> Result<TemplateVersion, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("save template version {}", self.template_id);
        let result = sqlx::query_as::<_, TemplateVersion>(QUERY_INSERT.as_str())
            .bind(self.template_id)
            .bind(self.name.as_str())
            .bind(self.content.as_str())
            .bind(&self.attributes)
            .fetch_one(conn)
            .await?;
        Ok(result)
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;
    use crate::service::database::client::Pool;
    use serde_json::Value as JsonValue;

    pub async fn create_template_version(
        template_id: Uuid,
        name: String,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> TemplateVersion {
        let pool: &Pool = &POOL;
        let tmpl = TemplateVersionCreate::create(template_id, name, content, attributes);
        tmpl.save(pool).await.unwrap()
    }
}
