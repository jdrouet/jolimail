use crate::error::ServerError;
use crate::model::template::Template;
use actix_web::{get, web, HttpResponse};
use deadpool_postgres::Pool;

#[get("/api/templates/{slug}/content")]
pub async fn handler(
    pool: web::Data<Pool>,
    slug: web::Path<String>,
) -> Result<HttpResponse, ServerError> {
    let client = pool.get().await?;
    match Template::get_content_by_slug(&client, slug.as_str()).await? {
        Some(template) => Ok(HttpResponse::Ok().body(template)),
        None => Err(ServerError::NotFound(format!(
            "unable to find template with slug {}",
            slug
        ))),
    }
}

#[cfg(test)]
mod tests {
    use crate::model::template::create::tests::create_template;
    use crate::model::template::tests::set_template_version;
    use crate::model::template_version::create::tests::create_template_version;
    use crate::service::database::tests::reset_database;
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;

    #[actix_rt::test]
    #[serial]
    async fn template_not_found() {
        reset_database().await;
        let req = test::TestRequest::get()
            .uri("/api/templates/whatever/content")
            .to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NOT_FOUND);
    }

    #[actix_rt::test]
    #[serial]
    async fn template_without_content() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let url = format!("/api/templates/{}/content", tmpl.slug);
        let req = test::TestRequest::get().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NOT_FOUND);
    }

    #[actix_rt::test]
    #[serial]
    async fn template_without_current() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let _vers = create_template_version(tmpl.id, Some("<mjml></mjml>")).await;
        let url = format!("/api/templates/{}/content", tmpl.slug);
        let req = test::TestRequest::get().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NOT_FOUND);
    }

    #[actix_rt::test]
    #[serial]
    async fn success() {
        reset_database().await;
        let tmpl = create_template("testing", Some("some description")).await;
        let vers = create_template_version(tmpl.id, Some("<mjml></mjml>")).await;
        set_template_version(tmpl.id, vers.id).await;
        let url = format!("/api/templates/{}/content", tmpl.slug);
        let req = test::TestRequest::get().uri(url.as_str()).to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
        let body = test::read_body(res).await;
        assert_eq!(body.to_vec(), b"<mjml></mjml>");
    }
}
