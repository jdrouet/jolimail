use crate::error::ServerError;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use sqlx::Row;

lazy_static! {
    pub static ref QUERY_FIND_BY_SLUG: String = concat!(
        "SELECT ",
        "templates.title AS name, ",
        "templates.description AS description, ",
        "template_versions.content AS content, ",
        "template_versions.attributes AS attributes ",
        "FROM templates ",
        "JOIN template_versions ON templates.current_version_id = template_versions.id ",
        "WHERE templates.slug = $1 AND templates.deleted_at IS NULL ",
        "LIMIT 1"
    )
    .to_string();
}
#[derive(sqlx::FromRow, Clone, Debug, Deserialize, Serialize)]
pub struct TemplateContent {
    pub name: String,
    pub description: String,
    pub content: String,
    pub attributes: JsonValue,
}

impl From<sqlx::postgres::PgRow> for TemplateContent {
    fn from(row: sqlx::postgres::PgRow) -> Self {
        Self {
            name: row.get(0),
            description: row.get(1),
            content: row.get(2),
            attributes: row.get(3),
        }
    }
}

impl TemplateContent {
    pub async fn find_by_slug<'a, X>(conn: X, slug: &str) -> Result<Option<Self>, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("find template content by slug {}", slug);
        let result = sqlx::query_as::<_, Self>(QUERY_FIND_BY_SLUG.as_str())
            .bind(slug)
            .fetch_optional(conn)
            .await?;
        Ok(result)
    }
}
