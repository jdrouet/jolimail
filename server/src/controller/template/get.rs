use crate::error::ServerError;
use crate::model::template::Template;
use crate::service::database::client::Pool;
use actix_web::{get, web, HttpResponse};
use uuid::Uuid;

#[get("/api/templates/{id}")]
pub async fn handler(
    pool: web::Data<Pool>,
    template_id: web::Path<Uuid>,
) -> Result<HttpResponse, ServerError> {
    let pool: &Pool = &pool;
    match Template::find_by_id(pool, &template_id).await? {
        Some(template) => Ok(HttpResponse::Ok().json(template)),
        None => Err(ServerError::NotFound(format!(
            "unable to find template with id {}",
            template_id
        ))),
    }
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;

    #[actix_rt::test]
    #[serial]
    async fn not_found() {
        reset_database().await;
        let req = test::TestRequest::get()
            .uri("/api/templates/da62fa2c-566e-4ff3-be1b-4189ed4d057d")
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NOT_FOUND);
    }

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let url = format!("/api/templates/{}", tmpl.id);
        let req = test::TestRequest::get().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }
}
