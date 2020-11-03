use crate::error::ServerError;
use crate::model::template::Template;
use serde::{Deserialize, Serialize};
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
    pub async fn save<'a, X>(&self, conn: X) -> Result<Option<Template>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("save template {}", self.id);
        let mut changes = vec!["updated_at = now()".to_string()];
        if self.title.is_some() {
            changes.push(format!("title = ${}", changes.len() + 1));
        }
        if self.description.is_some() {
            changes.push(format!("description = ${}", changes.len() + 1));
        }
        if self.current_version_id.is_some() {
            changes.push(format!("current_version_id = ${}", changes.len() + 1));
        }
        let stmt = format!(
            "UPDATE templates SET {} WHERE id = $1 RETURNING {}",
            changes.join(", "),
            COLUMNS.as_str()
        );
        let query = sqlx::query_as::<_, Template>(stmt.as_str()).bind(self.id);
        let query = if let Some(title) = self.title.as_ref() {
            query.bind(title)
        } else {
            query
        };
        let query = if let Some(description) = self.description.as_ref() {
            query.bind(description)
        } else {
            query
        };
        let query = if let Some(current_version_id) = self.current_version_id.as_ref() {
            query.bind(current_version_id)
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

    #[allow(dead_code)]
    pub async fn update_template(
        id: &Uuid,
        title: Option<String>,
        description: Option<String>,
        current_version_id: Option<Uuid>,
    ) -> Option<Template> {
        let pool: &Pool = &POOL;
        let body = TemplateUpdate {
            id: *id,
            title: title.clone(),
            description: description.clone(),
            current_version_id,
        };
        body.save(pool).await.unwrap()
    }

    pub async fn set_template_version(id: &Uuid, version_id: &Uuid) -> Option<Template> {
        update_template(id, None, None, Some(*version_id)).await
    }
}
