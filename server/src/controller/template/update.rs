use crate::error::ServerError;
use crate::model::template::update::TemplateUpdate;
use actix_web::{patch, web, HttpResponse};
use deadpool_postgres::Pool;
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Payload {
    pub title: Option<String>,
    pub description: Option<String>,
    pub current_version_id: Option<Uuid>,
}

#[patch("/api/templates/{template_id}")]
pub async fn handler(
    pool: web::Data<Pool>,
    params: web::Path<Uuid>,
    payload: web::Json<Payload>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    let body = TemplateUpdate {
        id: *params,
        title: payload.title.clone(),
        description: payload.description.clone(),
        current_version_id: payload.current_version_id,
    };
    let result = body.save(&client).await?;
    match result {
        Some(template) => Ok(HttpResponse::Ok().json(template)),
        None => Err(ServerError::NotFound(format!(
            "unable to find template version with id {}",
            params
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
    async fn success_set_template_version() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None, None).await;
        let payload = json!({ "templateVersionId": vers.id });
        let url = format!("/api/templates/{}", tmpl.id);
        let req = test::TestRequest::patch()
            .uri(url.as_str())
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }
}
