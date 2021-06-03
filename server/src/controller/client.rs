use actix_files::Files;
use actix_web::web::ServiceConfig;
use std::env;

pub fn config(cfg: &mut ServiceConfig) {
    let path = env::var("CLIENT_PATH").unwrap_or_else(|_| "static".into());
    cfg.service(Files::new("/", path).index_file("index.html"));
}
