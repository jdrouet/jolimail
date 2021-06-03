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

use actix_web::{middleware, web, App, HttpServer};
use std::env;

use service::database::client::{get_pool, Pool};
use service::database::migration::Migrator;

macro_rules! create_app {
    () => {
        App::new().app_data(web::JsonConfig::default().error_handler(error::json_error_handler))
    };
}

fn get_address() -> String {
    env::var("ADDRESS").unwrap_or_else(|_| "localhost".into())
}

fn get_port() -> String {
    env::var("PORT").unwrap_or_else(|_| "3000".into())
}

fn get_bind() -> String {
    format!("{}:{}", get_address(), get_port())
}

async fn migrate_database(pool: &Pool) {
    info!("running migrations");
    let migrator = Migrator::from_env();
    migrator.up(pool).await.expect("couldn't run migration");
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let pool = get_pool();
    migrate_database(&pool).await;

    info!("starting server");
    HttpServer::new(move || {
        create_app!()
            .data(pool.clone())
            .wrap(middleware::DefaultHeaders::new().header("X-Version", "0.1.1"))
            .wrap(middleware::Logger::default())
            .wrap(middleware::Compress::default())
            .configure(controller::config)
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
    use env_test_util::TempEnvVar;

    pub async fn execute_request(req: Request) -> ServiceResponse {
        let mut app = test::init_service(
            create_app!()
                .data(POOL.clone())
                .configure(controller::config),
        )
        .await;
        test::call_service(&mut app, req).await
    }

    #[test]
    #[serial]
    fn test_get_address() {
        let _address = TempEnvVar::new("ADDRESS");
        assert_eq!(get_address(), "localhost");
        let _address = _address.with("something");
        assert_eq!(get_address(), "something");
    }

    #[test]
    #[serial]
    fn test_get_port() {
        let _port = TempEnvVar::new("PORT");
        assert_eq!(get_port(), "3000");
        let _port = _port.with("1234");
        assert_eq!(get_port(), "1234");
    }

    #[test]
    #[serial]
    fn test_bind() {
        let _address = TempEnvVar::new("ADDRESS");
        let _port = TempEnvVar::new("PORT");
        assert_eq!(get_bind(), "localhost:3000");
        let _address = _address.with("something");
        let _port = _port.with("1234");
        assert_eq!(get_bind(), "something:1234");
    }
}
