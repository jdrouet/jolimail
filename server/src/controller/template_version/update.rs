use crate::error::ServerError;
use crate::model::template_version::update::TemplateVersionUpdate;
use actix_web::{patch, web, HttpResponse};
use deadpool_postgres::Pool;
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct Payload {
    pub content: String,
}

#[patch("/api/templates/{template_id}/versions/{version_id}")]
pub async fn handler(
    pool: web::Data<Pool>,
    params: web::Path<(Uuid, Uuid)>,
    payload: web::Json<Payload>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    let template = TemplateVersionUpdate::update(&params.1, &params.0, payload.content.as_str())
        .save(&client)
        .await?;
    match template {
        Some(value) => Ok(HttpResponse::Ok().json(value)),
        None => Err(ServerError::NotFound(format!(
            "unable to find template version with id {}",
            params.1
        ))),
    }
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::model::template_version::create::tests::create_template_version;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;
    use serde_json::json;

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None).await;
        let payload = json!({ "content": "<mjml><mj-body></mj-body></mjml>" });
        let url = format!("/api/templates/{}/versions/{}", tmpl.id, vers.id);
        let req = test::TestRequest::patch()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }
}
