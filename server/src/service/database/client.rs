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

#[cfg(test)]
pub mod tests {
    use super::get_pool;
    use deadpool_postgres::Pool;

    lazy_static! {
        pub static ref POOL: Pool = get_pool();
    }
}
