use crate::error::ServerError;
use chrono::prelude::*;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use tokio_postgres::row::Row;
use uuid::Uuid;

pub mod create;

const QUERY_LIST_ALL: &'static str = r#"
SELECT id, slug, title, description, current_version_id, created_at, updated_at, deleted_at
FROM templates
WHERE deleted_at IS NULL
ORDER BY updated_at DESC
"#;

const QUERY_FIND_BY_ID: &'static str = r#"
SELECT id, slug, title, description, current_version_id, created_at, updated_at, deleted_at
FROM templates
WHERE id = $1
LIMIT 1
"#;

const QUERY_CONTENT_BY_SLUG: &'static str = r#"
SELECT template_versions.content
FROM templates
JOIN template_versions ON templates.current_version_id = template_versions.id
WHERE templates.id = $1
LIMIT 1
"#;

const QUERY_UPDATE_VERSION: &'static str = r#"
UPDATE templates
SET current_version_id = $2
WHERE id = $1
"#;

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Template {
    pub id: Uuid,
    pub slug: String,
    pub title: String,
    pub description: Option<String>,
    pub current_version_id: Option<Uuid>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

impl From<&Row> for Template {
    fn from(row: &Row) -> Self {
        Self {
            id: row.get(0),
            slug: row.get(1),
            title: row.get(2),
            description: row.get(3),
            current_version_id: row.get(4),
            created_at: row.get(5),
            updated_at: row.get(6),
            deleted_at: row.get(7),
        }
    }
}

impl Template {
    pub async fn list(client: &Client) -> Result<Vec<Template>, ServerError> {
        debug!("list templates");
        let stmt = client.prepare(QUERY_LIST_ALL).await?;
        let rows = client.query(&stmt, &[]).await?;
        Ok(rows.iter().map(Template::from).collect())
    }

    pub async fn find_by_id(client: &Client, id: &Uuid) -> Result<Option<Template>, ServerError> {
        debug!("find template by id {}", id);
        let stmt = client.prepare(QUERY_FIND_BY_ID).await?;
        let rows = client.query(&stmt, &[&id]).await?;
        Ok(rows.first().map(Template::from))
    }

    pub async fn get_content_by_id(
        client: &Client,
        id: &Uuid,
    ) -> Result<Option<String>, ServerError> {
        debug!("get template content by id {}", id);
        let stmt = client.prepare(QUERY_CONTENT_BY_SLUG).await?;
        let rows = client.query(&stmt, &[&id]).await?;
        Ok(rows.first().map(|row| row.get(0)))
    }

    pub async fn set_current_version(
        client: &Client,
        template_id: Uuid,
        version_id: Uuid,
    ) -> Result<(), ServerError> {
        debug!(
            "set template {} current version {}",
            template_id, version_id
        );
        let stmt = client.prepare(QUERY_UPDATE_VERSION).await?;
        client.execute(&stmt, &[&template_id, &version_id]).await?;
        Ok(())
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    pub async fn set_template_version(template_id: Uuid, version_id: Uuid) {
        let client = POOL.get().await.unwrap();
        Template::set_current_version(&client, template_id, version_id)
            .await
            .unwrap()
    }
}
