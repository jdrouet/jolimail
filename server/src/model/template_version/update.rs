use super::COLUMNS;
use crate::error::ServerError;
use crate::model::template_version::TemplateVersion;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
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

    pub async fn save<'a, X>(&self, conn: X) -> Result<Option<TemplateVersion>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("save template version {}", self.template_id);
        let mut changes = vec!["updated_at = now()".to_string()];
        if self.content.is_some() {
            changes.push(format!("content = ${}", changes.len() + 2));
        }
        if self.attributes.is_some() {
            changes.push(format!("attributes = ${}", changes.len() + 2));
        }
        let stmt = format!(
            "UPDATE template_versions SET {} WHERE template_id = $1 AND id = $2 RETURNING {}",
            changes.join(", "),
            COLUMNS.as_str()
        );
        let query = sqlx::query_as::<_, TemplateVersion>(stmt.as_str())
            .bind(self.template_id)
            .bind(self.id);
        let query = if let Some(content) = self.content.as_ref() {
            query.bind(content)
        } else {
            query
        };
        let query = if let Some(attributes) = self.attributes.as_ref() {
            query.bind(attributes)
        } else {
            query
        };
        let result = query.fetch_optional(conn).await?;
        Ok(result)
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;
    use crate::service::database::client::Pool;
    use serde_json::Value as JsonValue;

    #[allow(dead_code)]
    pub async fn update_template_version(
        id: &Uuid,
        template_id: &Uuid,
        content: Option<String>,
        attributes: Option<JsonValue>,
    ) -> Option<TemplateVersion> {
        let pool: &Pool = &POOL;
        TemplateVersionUpdate::update(id, template_id, content, attributes)
            .save(pool)
            .await
            .unwrap()
    }
}
