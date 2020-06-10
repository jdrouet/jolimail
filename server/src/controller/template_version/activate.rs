use crate::error::ServerError;
use crate::model::template::Template;
use actix_web::{post, web, HttpResponse};
use deadpool_postgres::Pool;
use uuid::Uuid;

#[post("/api/templates/{template_id}/versions/{version_id}/activate")]
pub async fn handler(
    pool: web::Data<Pool>,
    ids: web::Path<(Uuid, Uuid)>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    Template::set_current_version(&client, ids.0, ids.1).await?;
    Ok(HttpResponse::NoContent().finish())
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::model::template_version::create::tests::create_template_version;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let template = create_template("my first template", Some("description")).await;
        let version = create_template_version(template.id, Some("<mjml></mjml>")).await;
        let url = format!(
            "/api/templates/{}/versions/{}/activate",
            template.id, version.id
        );
        let req = test::TestRequest::post().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NO_CONTENT);
    }
}
