use crate::error::ServerError;
use chrono::prelude::*;
use deadpool_postgres::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value as JsonValue;
use tokio_postgres::row::Row;
use uuid::Uuid;

pub mod create;
pub mod update;

lazy_static! {
    pub static ref COLUMNS: String =
        String::from("id, template_id, name, content, attributes, created_at, updated_at, deleted_at");
    pub static ref COLUMNS_NODATA: String = String::from("id, template_id, name, null as content, null as attributes, created_at, updated_at, deleted_at");
    pub static ref QUERY_FIND_BY_ID: String = format!(
        "SELECT {} FROM template_versions WHERE id = $1 AND deleted_at IS null LIMIT 1",
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

const QUERY_CONTENT_BY_ID: &'static str = r#"
SELECT template_versions.content
FROM template_versions
WHERE template_versions.id = $1 AND deleted_at IS null
LIMIT 1
"#;

const DELETE_BY_ID: &'static str =
    "UPDATE template_versions SET deleted_at = now() WHERE template_id = $1 and id = $2";

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TemplateVersion {
    pub id: Uuid,
    pub template_id: Uuid,
    pub name: String,
    pub content: Option<String>,
    pub attributes: JsonValue,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

impl From<&Row> for TemplateVersion {
    fn from(row: &Row) -> Self {
        Self {
            id: row.get(0),
            template_id: row.get(1),
            name: row.get(2),
            content: row.get(3),
            attributes: row.get(4),
            created_at: row.get(5),
            updated_at: row.get(6),
            deleted_at: row.get(7),
        }
    }
}

impl TemplateVersion {
    #[allow(unused)]
    pub async fn find_by_id(client: &Client, id: &Uuid) -> Result<Option<Self>, ServerError> {
        debug!("get template version {}", id);
        let stmt = client.prepare(&QUERY_FIND_BY_ID).await?;
        let rows = client.query(&stmt, &[id]).await?;
        Ok(rows.first().map(TemplateVersion::from))
    }
    pub async fn find_by_template(
        client: &Client,
        template_id: &Uuid,
        content: bool,
        limit: i64,
        offset: i64,
    ) -> Result<Vec<Self>, ServerError> {
        debug!("list template versions");
        let query = if content {
            QUERY_FIND_BY_TEMPLATE_ID.as_str()
        } else {
            QUERY_FIND_BY_TEMPLATE_ID_NO_CONTENT.as_str()
        };
        let stmt = client.prepare(query).await?;
        let rows = client.query(&stmt, &[template_id, &limit, &offset]).await?;
        Ok(rows.iter().map(TemplateVersion::from).collect())
    }

    pub async fn get_content_by_id(
        client: &Client,
        version_id: &Uuid,
    ) -> Result<Option<String>, ServerError> {
        debug!("get template versions content by id {}", version_id);
        let stmt = client.prepare(QUERY_CONTENT_BY_ID).await?;
        let rows = client.query(&stmt, &[version_id]).await?;
        Ok(rows.first().map(|row| row.get(0)))
    }

    pub async fn delete_by_id(
        client: &Client,
        template_id: &Uuid,
        version_id: &Uuid,
    ) -> Result<u64, ServerError> {
        debug!("delete template versions by id {}", version_id);
        let stmt = client.prepare(DELETE_BY_ID).await?;
        let count = client.execute(&stmt, &[&template_id, &version_id]).await?;
        Ok(count)
    }
}
