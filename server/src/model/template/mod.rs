use crate::error::ServerError;
use chrono::prelude::*;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use tokio_postgres::row::Row;
use uuid::Uuid;

pub mod content;
pub mod create;
pub mod update;

lazy_static! {
    pub static ref COLUMNS: String = String::from(
        "id, slug, title, description, current_version_id, created_at, updated_at, deleted_at"
    );
    pub static ref QUERY_LIST_ALL: String = format!(
        "SELECT {} FROM templates WHERE deleted_at IS NULL ORDER BY updated_at DESC",
        COLUMNS.as_str()
    );
    pub static ref QUERY_FIND_BY_ID: String = format!(
        "SELECT {} FROM templates WHERE id = $1 AND deleted_at IS NULL LIMIT 1",
        COLUMNS.as_str()
    );
}

// const QUERY_CONTENT_BY_SLUG: &'static str = r#"
// SELECT template_versions.content
// FROM templates
// JOIN template_versions ON templates.current_version_id = template_versions.id
// WHERE templates.id = $1 AND templates.deleted_at IS null
// LIMIT 1
// "#;

const DELETE_BY_ID: &str = "UPDATE templates SET deleted_at = now() WHERE id = $1";

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
        let stmt = client.prepare(QUERY_LIST_ALL.as_str()).await?;
        let rows = client.query(&stmt, &[]).await?;
        Ok(rows.iter().map(Template::from).collect())
    }

    pub async fn find_by_id(client: &Client, id: &Uuid) -> Result<Option<Template>, ServerError> {
        debug!("find template by id {}", id);
        let stmt = client.prepare(QUERY_FIND_BY_ID.as_str()).await?;
        let rows = client.query(&stmt, &[&id]).await?;
        Ok(rows.first().map(Template::from))
    }

    // pub async fn get_content_by_id(
    //     client: &Client,
    //     id: &Uuid,
    // ) -> Result<Option<String>, ServerError> {
    //     debug!("get template content by id {}", id);
    //     let stmt = client.prepare(QUERY_CONTENT_BY_SLUG).await?;
    //     let rows = client.query(&stmt, &[&id]).await?;
    //     Ok(rows.first().map(|row| row.get(0)))
    // }

    pub async fn unset_current_version(
        client: &Client,
        template_id: &Uuid,
        version_id: &Uuid,
    ) -> Result<u64, ServerError> {
        let stmt = client.prepare("UPDATE templates SET current_version_id = null WHERE id = $1 AND current_version_id = $2").await?;
        let count = client.execute(&stmt, &[&template_id, &version_id]).await?;
        Ok(count)
    }

    pub async fn delete_by_id(client: &Client, id: &Uuid) -> Result<u64, ServerError> {
        let stmt = client.prepare(DELETE_BY_ID).await?;
        let count = client.execute(&stmt, &[&id]).await?;
        Ok(count)
    }
}
