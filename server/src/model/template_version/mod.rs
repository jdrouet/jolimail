use crate::error::ServerError;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use sqlx::postgres::PgQueryResult;
use uuid::Uuid;

pub mod create;
pub mod update;

lazy_static! {
    pub static ref COLUMNS: String =
        String::from("id, template_id, name, content, attributes, created_at, updated_at, deleted_at");
    pub static ref COLUMNS_NODATA: String = String::from("id, template_id, name, null as content, attributes, created_at, updated_at, deleted_at");
    pub static ref QUERY_FIND_BY_ID: String = format!(
        "SELECT {} FROM template_versions WHERE template_id = $1 AND id = $2 AND deleted_at IS null LIMIT 1",
        COLUMNS.as_str()
    );
    pub static ref QUERY_FIND_BY_TEMPLATE_ID: String = format!(
        "SELECT {} FROM template_versions WHERE template_id = $1 AND deleted_at IS null ORDER BY created_at DESC LIMIT $2 OFFSET $3",
        COLUMNS.as_str()
    );
    pub static ref QUERY_FIND_BY_TEMPLATE_ID_NO_CONTENT: String = format!(
        "SELECT {} FROM template_versions WHERE template_id = $1 AND deleted_at IS null ORDER BY created_at DESC LIMIT $2 OFFSET $3",
        COLUMNS_NODATA.as_str()
    );
}

const DELETE_BY_ID: &str =
    "UPDATE template_versions SET deleted_at = now() WHERE template_id = $1 and id = $2";

#[derive(sqlx::FromRow, Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TemplateVersion {
    pub id: Uuid,
    pub template_id: Uuid,
    pub name: String,
    pub content: Option<String>,
    pub attributes: Option<JsonValue>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

impl TemplateVersion {
    pub async fn find_by_id<'a, X>(
        conn: X,
        template_id: &Uuid,
        version_id: &Uuid,
    ) -> Result<Option<Self>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("get template version {}", version_id);
        let result = sqlx::query_as::<_, Self>(QUERY_FIND_BY_ID.as_str())
            .bind(template_id)
            .bind(version_id)
            .fetch_optional(conn)
            .await?;
        Ok(result)
    }
    pub async fn find_by_template<'a, X>(
        conn: X,
        template_id: &Uuid,
        content: bool,
        limit: i64,
        offset: i64,
    ) -> Result<Vec<Self>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("list template versions");
        let query = if content {
            QUERY_FIND_BY_TEMPLATE_ID.as_str()
        } else {
            QUERY_FIND_BY_TEMPLATE_ID_NO_CONTENT.as_str()
        };
        let result = sqlx::query_as::<_, Self>(query)
            .bind(template_id)
            .bind(limit)
            .bind(offset)
            .fetch_all(conn)
            .await?;
        Ok(result)
    }

    pub async fn delete_by_id<'a, X>(
        conn: X,
        template_id: &Uuid,
        version_id: &Uuid,
    ) -> Result<u64, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("delete template versions by id {}", version_id);
        let result: PgQueryResult = sqlx::query(DELETE_BY_ID)
            .bind(template_id)
            .bind(version_id)
            .execute(conn)
            .await?;
        Ok(result.rows_affected())
    }
}
