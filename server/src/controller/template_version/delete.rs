use crate::error::ServerError;
use crate::model::template::Template;
use crate::model::template_version::TemplateVersion;
use actix_web::{delete, web, HttpResponse};
use deadpool_postgres::Pool;
use uuid::Uuid;

#[delete("/api/templates/{template_id}/versions/{version_id}")]
pub async fn handler(
    pool: web::Data<Pool>,
    web::Path((template_id, version_id)): web::Path<(Uuid, Uuid)>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    Template::unset_current_version(&client, &template_id, &version_id).await?;
    match TemplateVersion::delete_by_id(&client, &template_id, &version_id).await? {
        0 => Err(ServerError::NotFound(format!(
            "unable to find template version with id {}",
            version_id
        ))),
        _ => Ok(HttpResponse::NoContent().finish()),
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

    #[actix_rt::test]
    #[serial]
    async fn not_found() {
        reset_database().await;
        let req = test::TestRequest::delete()
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
        let vers = create_template_version(tmpl.id, "0.0.1".into(), None, None).await;
        let url = format!("/api/templates/{}/versions/{}", tmpl.id, vers.id);
        let req = test::TestRequest::delete().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NO_CONTENT);
    }
}
