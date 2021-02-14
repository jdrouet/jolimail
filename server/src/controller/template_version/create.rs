use crate::error::ServerError;
use crate::model::template_version::create::TemplateVersionCreate;
use crate::service::database::client::Pool;
use crate::service::validation::validate_json_schema;
use actix_web::{post, web, HttpResponse};
use serde::Deserialize;
use serde_json::Value as JsonValue;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct BodyPayload {
    pub name: String,
    pub content: Option<String>,
    pub attributes: Option<JsonValue>,
}

impl BodyPayload {
    pub fn validate(&self) -> Result<(), ServerError> {
        if let Some(attributes) = self.attributes.as_ref() {
            validate_json_schema(&attributes)?;
        }
        Ok(())
    }
}

#[post("/api/templates/{template_id}/versions")]
pub async fn handler(
    pool: web::Data<Pool>,
    template_id: web::Path<Uuid>,
    body: web::Json<BodyPayload>,
) -> Result<HttpResponse, ServerError> {
    let pool: &Pool = &pool;
    body.validate()?;
    let created = TemplateVersionCreate::create(
        *template_id,
        body.name.clone(),
        body.content.clone(),
        body.attributes.clone(),
    )
    .save(pool)
    .await?;
    Ok(HttpResponse::Ok().json(&created))
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
        let payload = json!({ "name": "0.0.1", "content": "<mjml></mjml>" });
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

    #[actix_rt::test]
    #[serial]
    async fn name_conflict() {
        reset_database().await;
        let template = create_template("my first template", Some("description")).await;
        let url = format!("/api/templates/{}/versions", template.id);
        let payload = json!({ "name": "0.0.1", "content": "<mjml></mjml>" });
        let req = test::TestRequest::post()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let req = test::TestRequest::post()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::CONFLICT);
    }
}
