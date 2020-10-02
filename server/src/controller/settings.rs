use actix_web::{get, HttpResponse};
use serde::Serialize;

use crate::error::ServerError;

const EXAMPLE_CATAPULTE_BASE_URL: &str = "http://catapulte:port";

lazy_static! {
    pub static ref SETTINGS: Settings = Settings::default();
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    pub example_catapulte_base_url: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            example_catapulte_base_url: std::env::var("EXAMPLE_CATAPULTE_BASE_URL")
                .unwrap_or(EXAMPLE_CATAPULTE_BASE_URL.into()),
        }
    }
}

#[get("/api/settings")]
pub async fn handler() -> Result<HttpResponse, ServerError> {
    Ok(HttpResponse::Ok().json(SETTINGS.clone()))
}

#[cfg(test)]
mod tests {
    use crate::tests::execute_request;
    use actix_web::http::StatusCode;
    use actix_web::test;

    #[actix_rt::test]
    #[serial]
    async fn status_get_success() {
        let req = test::TestRequest::get().uri("/api/settings").to_request();
        let res = execute_request(req).await;
        assert_eq!(res.status(), StatusCode::OK);
    }
}
