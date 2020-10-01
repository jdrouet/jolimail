#[cfg(test)]
#[macro_use]
extern crate serial_test;

#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate log;

mod controller;
mod error;
mod model;
mod service;

use actix_files::Files;
use actix_web::{middleware, web, App, HttpServer};
use deadpool_postgres::Pool;
use std::env;

use service::database::client::get_pool;
use service::database::migration::Migrator;

macro_rules! create_app {
    () => {
        App::new().app_data(web::JsonConfig::default().error_handler(error::json_error_handler))
    };
}

macro_rules! bind_services {
    ($app: expr) => {
        $app.service(controller::settings::handler)
            .service(controller::status::handler)
            .service(controller::template_version::create::handler)
            .service(controller::template_version::get::handler)
            .service(controller::template_version::list::handler)
            .service(controller::template_version::update::handler)
            .service(controller::template_version::delete::handler)
            .service(controller::template::create::handler)
            .service(controller::template::content::handler)
            .service(controller::template::get::handler)
            .service(controller::template::list::handler)
            .service(controller::template::update::handler)
            .service(controller::template::delete::handler)
    };
}

fn get_address() -> String {
    match env::var("ADDRESS") {
        Ok(value) => value,
        Err(_) => "localhost".into(),
    }
}

fn get_port() -> String {
    match env::var("PORT") {
        Ok(value) => value,
        Err(_) => "3000".into(),
    }
}

fn get_client() -> String {
    match env::var("CLIENT_PATH") {
        Ok(value) => value,
        Err(_) => "static".into(),
    }
}

fn get_bind() -> String {
    format!("{}:{}", get_address(), get_port())
}

async fn migrate_database(pool: &Pool) {
    info!("running migrations");
    let mut client = pool.get().await.expect("couldn't get client");
    let migrator = Migrator::from_env().expect("couldn't init migration");
    migrator
        .up(&mut client)
        .await
        .expect("couldn't run migration");
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let pool = get_pool();
    migrate_database(&pool).await;

    info!("starting server");
    HttpServer::new(move || {
        bind_services!(create_app!()
            .data(pool.clone())
            .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.1.0"))
            .wrap(middleware::Logger::default())
            .wrap(middleware::Compress::default()))
        .service(Files::new("/", get_client()).index_file("index.html"))
    })
    .bind(get_bind())?
    .run()
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;
    use actix_http::Request;
    use actix_web::dev::ServiceResponse;
    use actix_web::{test, App};

    pub async fn execute_request(req: Request) -> ServiceResponse {
        let mut app = test::init_service(bind_services!(create_app!().data(POOL.clone()))).await;
        test::call_service(&mut app, req).await
    }

    #[test]
    #[serial]
    fn test_get_address() {
        std::env::remove_var("ADDRESS");
        assert_eq!(get_address(), "localhost");
        std::env::set_var("ADDRESS", "something");
        assert_eq!(get_address(), "something");
    }

    #[test]
    #[serial]
    fn test_get_port() {
        std::env::remove_var("PORT");
        assert_eq!(get_port(), "3000");
        std::env::set_var("PORT", "1234");
        assert_eq!(get_port(), "1234");
    }

    #[test]
    #[serial]
    fn test_bind() {
        std::env::remove_var("ADDRESS");
        std::env::remove_var("PORT");
        assert_eq!(get_bind(), "localhost:3000");
        std::env::set_var("ADDRESS", "something");
        std::env::set_var("PORT", "1234");
        assert_eq!(get_bind(), "something:1234");
    }
}
