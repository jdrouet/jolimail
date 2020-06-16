use crate::error::ServerError;
use deadpool_postgres::{Config, Pool};
use tokio_postgres::NoTls;

fn get_config() -> Config {
    #[allow(deprecated)]
    Config::from_env("DATABASE").expect("couldn't build config")
}

pub fn get_pool() -> Pool {
    let cfg = get_config();
    cfg.create_pool(NoTls).expect("couldn't get pool")
}

impl From<tokio_postgres::Error> for ServerError {
    fn from(error: tokio_postgres::Error) -> Self {
        error!("tokio-pg: {:?}", error);
        if let Some(error) = error.into_source() {
            if error.is::<tokio_postgres::error::DbError>() {
                let error = error
                    .downcast_ref::<tokio_postgres::error::DbError>()
                    .unwrap();
                ServerError::from(error.clone())
            } else {
                ServerError::InternalServerError(error.to_string())
            }
        } else {
            ServerError::InternalServerError("database error".into())
        }
    }
}

impl From<tokio_postgres::error::DbError> for ServerError {
    fn from(error: tokio_postgres::error::DbError) -> Self {
        error!("tokio-pg-db: {:?}", error);
        if error.table().is_some() && error.constraint().is_some() {
            let constraint = error.constraint().unwrap();
            let table = error.table().unwrap();
            let constraint: Vec<&str> = constraint.split("_").collect();
            if constraint.len() == 3
                && constraint.get(0).is_some()
                && constraint.get(0) == Some(&table)
                && constraint.get(2) == Some(&"key")
            {
                return ServerError::Conflict(format!(
                    "{} already exists",
                    constraint.get(1).unwrap()
                ));
            }
        }
        ServerError::InternalServerError(error.to_string())
    }
}

#[cfg(test)]
pub mod tests {
    use super::get_pool;
    use deadpool_postgres::Pool;

    lazy_static! {
        pub static ref POOL: Pool = get_pool();
    }
}
