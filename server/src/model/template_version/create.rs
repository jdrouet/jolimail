use crate::error::ServerError;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::TemplateVersion;

const QUERY_INSERT: &'static str = r#"
INSERT INTO template_versions (template_id, content)
VALUES ($1, $2)
RETURNING id, template_id, content, created_at, updated_at, deleted_at
"#;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateVersionCreate {
    template_id: Uuid,
    content: Option<String>,
}

impl TemplateVersionCreate {
    pub fn create(template_id: Uuid, content: Option<String>) -> Self {
        Self {
            template_id,
            content,
        }
    }

    pub async fn save(&self, client: &Client) -> Result<TemplateVersion, ServerError> {
        debug!("save template version {}", self.template_id);
        let stmt = client.prepare(QUERY_INSERT).await?;
        let rows = client
            .query(&stmt, &[&self.template_id, &self.content])
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
        content: Option<&str>,
    ) -> TemplateVersion {
        let client = POOL.get().await.unwrap();
        let tmpl = TemplateVersionCreate {
            template_id,
            content: content.and_then(|value| Some(value.to_string())),
        };
        tmpl.save(&client).await.unwrap()
    }
}
