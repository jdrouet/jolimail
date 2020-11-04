use crate::error::ServerError;
use serde::{Deserialize, Serialize};
use slug::slugify;

use super::Template;
use super::COLUMNS;

lazy_static! {
    pub static ref QUERY_INSERT: String = format!(
        "INSERT INTO templates (title, slug, description) VALUES ($1, $2, $3) RETURNING {}",
        COLUMNS.as_str()
    );
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct TemplateCreate {
    title: String,
    description: Option<String>,
}

impl TemplateCreate {
    pub async fn save<'a, X>(&self, conn: X) -> Result<Template, ServerError>
    where
        X: sqlx::Executor<'a, Database = sqlx::Postgres>,
    {
        debug!("save template {}", self.title);
        let slug = slugify(self.title.as_str());
        let result: Template = sqlx::query_as(QUERY_INSERT.as_str())
            .bind(self.title.as_str())
            .bind(slug)
            .bind(self.description.as_ref())
            .fetch_one(conn)
            .await?;
        Ok(result)
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    pub async fn create_template(title: &str, description: Option<&str>) -> Template {
        let mut conn = POOL.acquire().await.unwrap();
        let tmpl = TemplateCreate {
            title: title.to_string(),
            description: description.map(|value| value.to_string()),
        };
        tmpl.save(&mut conn).await.unwrap()
    }
}
