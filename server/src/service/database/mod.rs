pub mod client;
pub mod migration;

#[cfg(test)]
pub mod tests {
    use super::client::tests::POOL;
    use super::migration::Migrator;

    pub async fn reset_database() {
        let mut client = POOL.get().await.unwrap();
        let migrator = Migrator::from_env().unwrap();
        migrator.down(&mut client).await.unwrap();
        migrator.up(&mut client).await.unwrap();
    }
}
