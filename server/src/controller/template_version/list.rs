use crate::error::ServerError;
use crate::model::template_version::TemplateVersion;
use crate::service::database::client::Pool;
use actix_web::{get, web, HttpResponse};
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct Filter {
    #[serde(default = "Filter::default_limit")]
    limit: u32,
    #[serde(default = "Filter::default_offset")]
    offset: u32,
}

impl Filter {
    pub fn default_limit() -> u32 {
        20
    }
    pub fn default_offset() -> u32 {
        0
    }
}

#[get("/api/templates/{template_id}/versions")]
pub async fn handler(
    pool: web::Data<Pool>,
    id: web::Path<Uuid>,
    filter: web::Query<Filter>,
) -> Result<HttpResponse, ServerError> {
    let pool: &Pool = &pool;
    let result = TemplateVersion::find_by_template(
        pool,
        &id,
        false,
        filter.limit as i64,
        filter.offset as i64,
    )
    .await?;
    Ok(HttpResponse::Ok().json(result))
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::model::template::Template;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;
    use serde_json::from_slice;

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let template = create_template("first", None).await;
        let url = format!("/api/templates/{}/versions", template.id);
        let req = test::TestRequest::get().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let body = test::read_body(res).await;
        let body: Vec<Template> = from_slice(body.as_ref()).unwrap();
        assert_eq!(body.len(), 0);
    }
}
