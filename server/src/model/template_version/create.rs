use crate::error::ServerError;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::TemplateVersion;

const QUERY_INSERT: &'static str = r#"
INSERT INTO template_versions (template_id, name, content)
VALUES ($1, $2, $3)
RETURNING id, template_id, name, content, created_at, updated_at, deleted_at
"#;

const DEFAULT_TEMPLATE_CONTENT: &'static str = r#"<mjml>
    <mj-head>
        <mj-title>Hello World</mj-title>
        <mj-preview>This is the preview of your email</mj-preview>
    </mj-head>
    <mj-body>
    </mj-body>
</mjml>
"#;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateVersionCreate {
    template_id: Uuid,
    name: String,
    content: String,
}

impl TemplateVersionCreate {
    pub fn create(template_id: Uuid, name: String, content: Option<String>) -> Self {
        let content = content.unwrap_or(DEFAULT_TEMPLATE_CONTENT.into());
        Self {
            template_id,
            name,
            content,
        }
    }

    pub async fn save(&self, client: &Client) -> Result<TemplateVersion, ServerError> {
        debug!("save template version {}", self.template_id);
        let stmt = client.prepare(QUERY_INSERT).await?;
        let rows = client
            .query(&stmt, &[&self.template_id, &self.name, &self.content])
            .await?;
        Ok(rows.first().map(TemplateVersion::from).unwrap())
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    pub async fn create_template_version(
        template_id: Uuid,
        name: String,
        content: Option<String>,
    ) -> TemplateVersion {
        let client = POOL.get().await.unwrap();
        let tmpl = TemplateVersionCreate::create(template_id, name, content);
        tmpl.save(&client).await.unwrap()
    }
}
