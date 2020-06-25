use crate::error::ServerError;
use crate::model::template_version::TemplateVersion;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

const QUERY_UPDATE: &'static str = r#"
UPDATE template_versions
SET content = $3, updated_at = now()
WHERE id = $1 and template_id = $2
RETURNING id, template_id, name, content, created_at, updated_at, deleted_at
"#;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateVersionUpdate {
    id: Uuid,
    template_id: Uuid,
    content: String,
}

impl TemplateVersionUpdate {
    pub fn update(version_id: &Uuid, template_id: &Uuid, content: &str) -> Self {
        Self {
            id: version_id.clone(),
            template_id: template_id.clone(),
            content: content.to_string(),
        }
    }

    pub async fn save(&self, client: &Client) -> Result<Option<TemplateVersion>, ServerError> {
        debug!("save template version {}", self.template_id);
        let stmt = client.prepare(QUERY_UPDATE).await?;
        let rows = client
            .query(&stmt, &[&self.id, &self.template_id, &self.content])
            .await?;
        Ok(rows.first().map(TemplateVersion::from))
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    #[allow(dead_code)]
    pub async fn update_template_version(
        id: &Uuid,
        template_id: &Uuid,
        content: &str,
    ) -> Option<TemplateVersion> {
        let client = POOL.get().await.unwrap();
        TemplateVersionUpdate::update(id, template_id, content)
            .save(&client)
            .await
            .unwrap()
    }
}
