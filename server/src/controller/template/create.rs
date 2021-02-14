use crate::error::ServerError;
use crate::model::template::create::TemplateCreate;
use crate::service::database::client::Pool;
use actix_web::{post, web, HttpResponse};

#[post("/api/templates")]
pub async fn handler(
    pool: web::Data<Pool>,
    body: web::Json<TemplateCreate>,
) -> Result<HttpResponse, ServerError> {
    let pool: &Pool = &pool;
    let template = body.save(pool).await?;
    Ok(HttpResponse::Ok().json(&template))
}

#[cfg(test)]
mod tests {
    use crate::model::template::Template;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;
    use serde_json::{from_slice, json};

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let payload = json!({
          "title": "My first template",
          "description": "whatever",
        });
        let req = test::TestRequest::post()
            .uri("/api/templates")
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let body = test::read_body(res).await;
        let body: Template = from_slice(body.as_ref()).unwrap();
        assert_eq!(body.title, "My first template");
        assert_eq!(body.slug, "my-first-template");
        assert!(body.current_version_id.is_none());
    }

    #[actix_rt::test]
    #[serial]
    async fn name_conflict() {
        reset_database().await;
        let payload = json!({
          "title": "random-name",
          "description": "whatever",
        });
        let req = test::TestRequest::post()
            .uri("/api/templates")
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let req = test::TestRequest::post()
            .uri("/api/templates")
            .set_json(&payload)
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::CONFLICT);
    }
}
