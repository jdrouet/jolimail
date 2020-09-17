use crate::error::ServerError;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use tokio_postgres::row::Row;
use serde_json::Value as JsonValue;

lazy_static! {
    pub static ref QUERY_FIND_BY_SLUG: String = concat!(
        "SELECT ",
        "templates.title AS name, ",
        "templates.description AS description, ",
        "template_versions.content AS template, ",
        "template_versions.attributes AS attributes ",
        "FROM templates ",
        "JOIN template_versions ON templates.current_version_id = template_versions.id ",
        "WHERE templates.slug = $1 AND templates.deleted_at IS NULL ",
        "LIMIT 1"
    ).to_string();
}
#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateContent {
    pub name: String,
    pub description: String,
    pub template: String,
    pub attributes: JsonValue,
}

impl From<&Row> for TemplateContent {
    fn from(row: &Row) -> Self {
        Self {
            name: row.get(0),
            description: row.get(1),
            template: row.get(2),
            attributes: row.get(3),
        }
    }
}

impl TemplateContent {
    pub async fn find_by_slug(client: &Client, slug: &str) -> Result<Option<Self>, ServerError> {
        debug!("find template content by slug {}", slug);
        let stmt = client.prepare(QUERY_FIND_BY_SLUG.as_str()).await?;
        let rows = client.query(&stmt, &[&slug]).await?;
        Ok(rows.first().map(TemplateContent::from))
    }
}
