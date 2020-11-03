use crate::error::ServerError;
use sqlx::postgres::PgPoolOptions;

pub type Pool = sqlx::Pool<sqlx::Postgres>;
pub type Transaction<'a> = sqlx::Transaction<'a, sqlx::Postgres>;

fn get_url() -> String {
    if let Ok(url) = std::env::var("DATABASE_URL") {
        return url;
    }
    let mut result = String::from("postgres://");
    if let Ok(username) = std::env::var("DATABASE_USER") {
        result.push_str(username.as_str());
        if let Ok(password) = std::env::var("DATABASE_PASSWORD") {
            result.push(':');
            result.push_str(password.as_str());
        }
        result.push('@');
    }
    if let Ok(hostname) = std::env::var("DATABASE_HOST") {
        result.push_str(hostname.as_str());
    } else {
        result.push_str("localhost");
    }
    if let Ok(port) = std::env::var("DATABASE_PORT") {
        result.push(':');
        result.push_str(port.as_str());
    }
    result.push('/');
    if let Ok(dbname) = std::env::var("DATABASE_DBNAME") {
        result.push_str(dbname.as_str());
    } else {
        result.push_str("jolimail");
    }
    result
}

fn get_pool_max_size() -> u32 {
    std::env::var("DATABASE_POOL_MAX_SIZE")
        .ok()
        .and_then(|value| value.parse::<_>().ok())
        .unwrap_or(10)
}

pub fn get_pool() -> Pool {
    let url = get_url();
    PgPoolOptions::new()
        .max_connections(get_pool_max_size())
        .connect_lazy(url.as_str())
        .expect("couldn't get pool")
}

impl From<&sqlx::postgres::PgDatabaseError> for ServerError {
    fn from(err: &sqlx::postgres::PgDatabaseError) -> Self {
        if err.routine() == Some("_bt_check_unique") {
            if let Some(column) = err.column() {
                ServerError::Conflict(format!("{} already exists", column))
            } else {
                ServerError::Conflict("already exists".into())
            }
        } else {
            ServerError::InternalServerError(err.to_string())
        }
    }
}

impl From<sqlx::Error> for ServerError {
    fn from(err: sqlx::Error) -> Self {
        match err {
            sqlx::Error::Database(db_err) => {
                if let Some(origin) = db_err.try_downcast_ref::<sqlx::postgres::PgDatabaseError>() {
                    ServerError::from(origin)
                } else {
                    ServerError::InternalServerError(db_err.to_string())
                }
            }
            _ => ServerError::InternalServerError(err.to_string()),
        }
    }
}

#[cfg(test)]
pub mod tests {
    use super::{get_pool, Pool};

    lazy_static! {
        pub static ref POOL: Pool = get_pool();
    }
}
