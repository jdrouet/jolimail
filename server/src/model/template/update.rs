use crate::error::ServerError;
use crate::model::template::Template;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use tokio_postgres::types::ToSql;
use uuid::Uuid;

use super::COLUMNS;

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateUpdate {
    pub id: Uuid,
    pub title: Option<String>,
    pub description: Option<String>,
    pub current_version_id: Option<Uuid>,
}

impl TemplateUpdate {
    pub async fn save(&self, client: &Client) -> Result<Option<Template>, ServerError> {
        debug!("save template {}", self.id);
        let mut params: Vec<&(dyn ToSql + Sync)> = vec![&self.id];
        let mut changes = vec!["updated_at = now()".to_string()];
        if let Some(title) = self.title.as_ref() {
            params.push(title);
            changes.push(format!("title = ${}", params.len()));
        }
        if let Some(description) = self.description.as_ref() {
            params.push(description);
            changes.push(format!("description = ${}", params.len()));
        }
        if let Some(current_version_id) = self.current_version_id.as_ref() {
            params.push(current_version_id);
            changes.push(format!("current_version_id = ${}", params.len()));
        }
        let stmt = format!(
            "UPDATE templates SET {} WHERE id = $1 RETURNING {}",
            changes.join(", "),
            COLUMNS.as_str()
        );
        let stmt = client.prepare(stmt.as_str()).await?;
        let rows = client.query(&stmt, &params).await?;
        Ok(rows.first().map(Template::from))
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    #[allow(dead_code)]
    pub async fn update_template(
        id: &Uuid,
        title: Option<String>,
        description: Option<String>,
        current_version_id: Option<Uuid>,
    ) -> Option<Template> {
        let client = POOL.get().await.unwrap();
        let body = TemplateUpdate {
            id: id.clone(),
            title: title.clone(),
            description: description.clone(),
            current_version_id: current_version_id.clone(),
        };
        body.save(&client).await.unwrap()
    }

    pub async fn set_template_version(id: &Uuid, version_id: &Uuid) -> Option<Template> {
        update_template(id, None, None, Some(version_id.clone())).await
    }
}
