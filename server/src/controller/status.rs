use actix_web::{get, web, HttpResponse};
use deadpool_postgres::Pool;

use crate::error::ServerError;

#[get("/status")]
pub async fn handler(pool: web::Data<Pool>) -> Result<HttpResponse, ServerError> {
    let _client = pool.get().await?;
    Ok(HttpResponse::NoContent().finish())
}

#[cfg(test)]
mod tests {
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;

    #[actix_rt::test]
    #[serial]
    async fn status_get_success() {
        let req = test::TestRequest::get().uri("/status").to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::NO_CONTENT);
    }
}
