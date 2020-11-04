use crate::error::ServerError;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use sqlx::postgres::{PgDone, PgRow};
use sqlx::{Done, Row};
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

const DELETE_BY_ID: &str = "UPDATE templates SET deleted_at = now() WHERE id = $1";

#[derive(sqlx::FromRow, Clone, Debug, Deserialize, Serialize)]
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

impl From<PgRow> for Template {
    fn from(row: PgRow) -> Self {
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
    pub async fn list<'a, X>(conn: X) -> Result<Vec<Template>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("list templates");
        let list: Vec<Template> = sqlx::query_as::<_, Template>(QUERY_LIST_ALL.as_str())
            .fetch_all(conn)
            .await?;
        Ok(list)
    }

    pub async fn find_by_id<'a, X>(conn: X, id: &Uuid) -> Result<Option<Template>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("find template by id {}", id);
        let result: Option<Template> = sqlx::query_as::<_, Template>(QUERY_FIND_BY_ID.as_str())
            .bind(id)
            .fetch_optional(conn)
            .await?;
        Ok(result)
        // let stmt = client.prepare(QUERY_FIND_BY_ID.as_str()).await?;
        // let rows = client.query(&stmt, &[&id]).await?;
        // Ok(rows.first().map(Template::from))
    }

    pub async fn unset_current_version<'a, X>(
        conn: X,
        template_id: &Uuid,
        version_id: &Uuid,
    ) -> Result<u64, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        let result = sqlx::query("UPDATE templates SET current_version_id = null WHERE id = $1 AND current_version_id = $2")
        .bind(template_id)
        .bind(version_id)
        .execute(conn)
        .await?;
        Ok(result.rows_affected())
    }

    pub async fn delete_by_id<'a, X>(conn: X, id: &Uuid) -> Result<u64, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        let result: PgDone = sqlx::query(DELETE_BY_ID).bind(id).execute(conn).await?;
        Ok(result.rows_affected())
    }
}
