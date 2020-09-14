use crate::error::ServerError;
use deadpool_postgres::PoolError;

pub mod database;
pub mod validation;

impl From<PoolError> for ServerError {
    fn from(err: PoolError) -> Self {
        ServerError::InternalServerError(err.to_string())
    }
}
