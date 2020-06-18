use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use tokio_postgres::row::Row;
use uuid::Uuid;

pub mod create;

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct TemplateVersion {
    pub id: Uuid,
    pub template_id: Uuid,
    pub content: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

impl From<&Row> for TemplateVersion {
    fn from(row: &Row) -> Self {
        Self {
            id: row.get(0),
            template_id: row.get(1),
            content: row.get(2),
            created_at: row.get(3),
            updated_at: row.get(4),
            deleted_at: row.get(5),
        }
    }
}
