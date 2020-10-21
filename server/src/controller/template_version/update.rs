use crate::error::ServerError;
use crate::model::template_version::update::TemplateVersionUpdate;
use crate::service::validation::validate_json_schema;
use actix_web::{patch, web, HttpResponse};
use deadpool_postgres::Pool;
use serde::Deserialize;
use serde_json::Value as JsonValue;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct BodyPayload {
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

#[patch("/api/templates/{template_id}/versions/{version_id}")]
pub async fn handler(
    pool: web::Data<Pool>,
    web::Path((template_id, version_id)): web::Path<(Uuid, Uuid)>,
    payload: web::Json<BodyPayload>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    payload.validate()?;
    let template = TemplateVersionUpdate::update(
        &version_id,
        &template_id,
        payload.content.clone(),
        payload.attributes.clone(),
    )
    .save(&client)
    .await?;
    match template {
        Some(value) => Ok(HttpResponse::Ok().json(value)),
        None => Err(ServerError::NotFound(format!(
            "unable to find template version with id {}",
            version_id
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
    async fn success_content() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None, None).await;
        let payload = json!({ "content": "<mjml><mj-body></mj-body></mjml>" });
        let url = format!("/api/templates/{}/versions/{}", tmpl.id, vers.id);
        let req = test::TestRequest::patch()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }

    #[actix_rt::test]
    #[serial]
    async fn success_attributes() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None, None).await;
        let payload = json!({
            "attributes": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                    },
                },
                "required": ["url"]
            },
        });
        let url = format!("/api/templates/{}/versions/{}", tmpl.id, vers.id);
        let req = test::TestRequest::patch()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }

    #[actix_rt::test]
    #[serial]
    async fn invalid_attributes() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None, None).await;
        let payload = json!({
            "attributes": "invalid",
        });
        let url = format!("/api/templates/{}/versions/{}", tmpl.id, vers.id);
        let req = test::TestRequest::patch()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::BAD_REQUEST);
    }
}
