use super::client::{Pool, Transaction};

const SCRIPTS_UP: [(&str, &str); 5] = [
    (
        "20200609_183000",
        include_str!("../../../migrations/20200609_183000-up.sql"),
    ),
    (
        "20200609_184000",
        include_str!("../../../migrations/20200609_184000-up.sql"),
    ),
    (
        "20200609_184001",
        include_str!("../../../migrations/20200609_184001-up.sql"),
    ),
    (
        "20200609_183002",
        include_str!("../../../migrations/20200609_184002-up.sql"),
    ),
    (
        "20200609_183003",
        include_str!("../../../migrations/20200609_184003-up.sql"),
    ),
];

#[cfg(test)]
const SCRIPTS_DOWN: [(&str, &str); 5] = [
    (
        "20200609_183003",
        include_str!("../../../migrations/20200609_184003-down.sql"),
    ),
    (
        "20200609_183002",
        include_str!("../../../migrations/20200609_184002-down.sql"),
    ),
    (
        "20200609_184001",
        include_str!("../../../migrations/20200609_184001-down.sql"),
    ),
    (
        "20200609_184000",
        include_str!("../../../migrations/20200609_184000-down.sql"),
    ),
    (
        "20200609_183000",
        include_str!("../../../migrations/20200609_183000-down.sql"),
    ),
];

/// build sql query to create migration table
fn create_migration_table_query(tablename: &str) -> String {
    r#"
  CREATE TABLE IF NOT EXISTS {{TABLENAME}} (
    name TEXT NOT NULL PRIMARY KEY,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW()
  );
  "#
    .replace("{{TABLENAME}}", tablename)
}

/// extract tablename from environment variables or fallback to "migrations"
fn get_tablename_from_env() -> String {
    std::env::var("MIGRATION_TABLENAME").unwrap_or_else(|_| "migrations".into())
}

#[derive(Debug)]
pub enum Error {
    QueryError(String),
    ScriptFailed(String),
}

impl From<sqlx::Error> for Error {
    fn from(err: sqlx::Error) -> Error {
        Error::QueryError(err.to_string())
    }
}

/// util to run the database migration
#[derive(Clone, Debug)]
pub struct Migrator {
    tablename: String,
}

impl Migrator {
    pub fn from_env() -> Self {
        debug!("create migrator from env");
        let tablename = get_tablename_from_env();
        Migrator::new(tablename)
    }

    fn new(tablename: String) -> Self {
        Self { tablename }
    }

    /// check if the script has been run
    async fn check_migrated<'a>(
        &self,
        conn: &mut Transaction<'_>,
        name: &str,
    ) -> Result<bool, Error> {
        debug!("create migrated {}", name);
        let query = format!("SELECT COUNT(*) FROM {} WHERE name = $1", self.tablename);
        let count: (i64,) = sqlx::query_as(query.as_str())
            .bind(name)
            .fetch_one(conn)
            .await?;

        Ok(count.0 > 0)
    }

    async fn execute_script<'a>(
        &self,
        conn: &mut Transaction<'_>,
        content: &str,
    ) -> Result<(), Error> {
        sqlx::query(content)
            .execute(conn)
            .await
            .map(|_| ())
            .map_err(|err| Error::ScriptFailed(err.to_string()))
    }

    async fn insert_migration<'a>(
        &self,
        conn: &mut Transaction<'_>,
        name: &str,
    ) -> Result<(), Error> {
        debug!("insert migration for {}", name);
        let query = format!("INSERT INTO {} (name) VALUES ($1)", self.tablename);
        sqlx::query(query.as_str()).bind(name).execute(conn).await?;
        Ok(())
    }

    #[cfg(test)]
    async fn delete_migration<'a>(
        &self,
        conn: &mut Transaction<'_>,
        name: &str,
    ) -> Result<(), Error> {
        debug!("delete migration for {}", name);
        let query = format!("DELETE FROM {} WHERE name = $1", self.tablename);
        sqlx::query(query.as_str()).bind(name).execute(conn).await?;
        Ok(())
    }

    /// migrate up all the scripts
    pub async fn up(&self, pool: &Pool) -> Result<(), Error> {
        debug!("run migration up");
        let mut conn = pool.begin().await?;
        self.execute_script(
            &mut conn,
            create_migration_table_query(self.tablename.as_str()).as_str(),
        )
        .await?;
        for (name, script) in SCRIPTS_UP.iter() {
            if !self.check_migrated(&mut conn, name).await? {
                self.insert_migration(&mut conn, name).await?;
                self.execute_script(&mut conn, script).await?;
            } else {
                debug!("migration {} already done", name);
            }
        }
        conn.commit().await?;
        Ok(())
    }

    /// migrate down all the scripts
    #[cfg(test)]
    pub async fn down(&self, pool: &Pool) -> Result<(), Error> {
        debug!("run migration down");
        let mut conn = pool.begin().await?;
        self.execute_script(
            &mut conn,
            create_migration_table_query(self.tablename.as_str()).as_str(),
        )
        .await?;
        for (name, script) in SCRIPTS_DOWN.iter() {
            if self.check_migrated(&mut conn, name).await? {
                self.delete_migration(&mut conn, name).await?;
                self.execute_script(&mut conn, script).await?;
            } else {
                debug!("migration {} not done", name);
            }
        }
        conn.commit().await?;
        Ok(())
    }
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use crate::service::database::client::tests::POOL;

    #[actix_rt::test]
    #[serial]
    async fn run_up_down() {
        std::env::set_var("DATABASE_USER", "postgres");
        std::env::set_var("DATABASE_HOST", "localhost");
        std::env::set_var("DATABASE_DBNAME", "postgres");
        let migrator = Migrator::from_env();
        migrator.up(&POOL).await.unwrap();
        migrator.down(&POOL).await.unwrap();
    }
}
