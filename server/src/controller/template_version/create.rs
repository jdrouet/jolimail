use crate::error::ServerError;
// use crate::model::template::Template;
use crate::model::template_version::create::TemplateVersionCreate;
use actix_web::{post, web, HttpResponse};
use deadpool_postgres::Pool;
use uuid::Uuid;

#[post("/api/templates/{template_id}/versions")]
pub async fn handler(
    pool: web::Data<Pool>,
    template_id: web::Path<Uuid>,
    content: web::Json<String>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    let body = TemplateVersionCreate::create(*template_id, Some(content.to_string()));
    let created = body.save(&client).await?;
    Ok(HttpResponse::Ok().json(created))
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::model::template_version::TemplateVersion;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;
    use serde_json::{from_slice, json};

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let template = create_template("my first template", Some("description")).await;
        let url = format!("/api/templates/{}/versions", template.id);
        let payload = json!("<mjml></mjml>");
        let req = test::TestRequest::post()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let body = test::read_body(res).await;
        let body: TemplateVersion = from_slice(body.as_ref()).unwrap();
        assert_eq!(body.content, Some("<mjml></mjml>".to_string()));
    }
}
