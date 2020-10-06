use super::COLUMNS;
use crate::error::ServerError;
use crate::model::template_version::TemplateVersion;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use tokio_postgres::types::ToSql;
use uuid::Uuid;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateVersionUpdate {
    id: Uuid,
    template_id: Uuid,
    content: Option<String>,
    attributes: Option<JsonValue>,
}

impl TemplateVersionUpdate {
    pub fn update(
        version_id: &Uuid,
        template_id: &Uuid,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> Self {
        Self {
            id: *version_id,
            template_id: *template_id,
            content,
            attributes,
        }
    }

    pub async fn save(&self, client: &Client) -> Result<Option<TemplateVersion>, ServerError> {
        debug!("save template version {}", self.template_id);
        let mut params: Vec<&(dyn ToSql + Sync)> = vec![&self.template_id, &self.id];
        let mut changes = vec!["updated_at = now()".to_string()];
        if let Some(content) = self.content.as_ref() {
            params.push(content);
            changes.push(format!("content = ${}", params.len()));
        }
        if let Some(attributes) = self.attributes.as_ref() {
            params.push(attributes);
            changes.push(format!("attributes = ${}", params.len()));
        }
        let stmt = format!(
            "UPDATE template_versions SET {} WHERE template_id = $1 AND id = $2 RETURNING {}",
            changes.join(", "),
            COLUMNS.as_str()
        );
        let stmt = client.prepare(stmt.as_str()).await?;
        let rows = client.query(&stmt, &params).await?;
        Ok(rows.first().map(TemplateVersion::from))
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;
    use serde_json::Value as JsonValue;

    #[allow(dead_code)]
    pub async fn update_template_version(
        id: &Uuid,
        template_id: &Uuid,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> Option<TemplateVersion> {
        let client = POOL.get().await.unwrap();
        TemplateVersionUpdate::update(id, template_id, content, attributes)
            .save(&client)
            .await
            .unwrap()
    }
}
