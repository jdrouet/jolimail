pub mod client;
pub mod migration;

#[cfg(test)]
pub mod tests {
    use super::client::tests::POOL;
    use super::migration::Migrator;

    pub async fn reset_database() {
        let migrator = Migrator::from_env();
        migrator.down(&POOL).await.unwrap();
        migrator.up(&POOL).await.unwrap();
    }
}
