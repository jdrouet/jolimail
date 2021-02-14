use super::client::{Pool, Transaction};
use regex::Regex;
use std::collections::HashSet;
use std::path::PathBuf;

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

/// extract scripts path from environment variables
fn get_script_path_from_env() -> Result<String, Error> {
    std::env::var("MIGRATION_PATH").or(Err(Error::PathUndefined))
}

fn filter_script_entry(entry: std::fs::DirEntry) -> Option<String> {
    let fname_regex = Regex::new(r"(\d{8}_\d{6})-(?:up|down)\.sql$").unwrap();
    entry
        .path()
        .to_str()
        .and_then(|value| fname_regex.captures(value))
        .and_then(|capture| capture.get(1))
        .map(|m| String::from(m.as_str()))
}

/// extract list of scripts from migration folder
fn get_scripts(path: &str) -> Result<HashSet<String>, Error> {
    debug!("get scripts from {}", path);
    let path = PathBuf::from(path);
    let entries = std::fs::read_dir(path)?;
    Ok(entries
        .filter_map(|entry| entry.ok())
        .filter_map(filter_script_entry)
        .collect())
}

#[derive(Debug)]
pub enum Error {
    QueryError(String),
    PathUndefined,
    PathInvalid,
    ScriptNotFound(String),
    ScriptFailed(String),
}

impl From<sqlx::Error> for Error {
    fn from(err: sqlx::Error) -> Error {
        Error::QueryError(err.to_string())
    }
}

impl From<std::io::Error> for Error {
    fn from(_err: std::io::Error) -> Self {
        Error::PathInvalid
    }
}

/// util to run the database migration
#[derive(Clone, Debug)]
pub struct Migrator {
    tablename: String,
    script_path: String,
    scripts: HashSet<String>,
}

impl Migrator {
    pub fn from_env() -> Result<Self, Error> {
        debug!("create migrator from env");
        let tablename = get_tablename_from_env();
        let script_path = get_script_path_from_env()?;
        Migrator::new(tablename, script_path)
    }

    fn new(tablename: String, script_path: String) -> Result<Self, Error> {
        debug!("create migrator from {} to {}", script_path, tablename);
        let scripts = get_scripts(script_path.as_str())?;
        Ok(Self {
            tablename,
            script_path,
            scripts,
        })
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

    fn get_script_path(&self, name: &str, up: bool) -> PathBuf {
        debug!("get script path for {} ({})", name, up);
        let direction = if up { "up" } else { "down" };
        PathBuf::from(self.script_path.as_str()).join(format!("{}-{}.sql", name, direction))
    }

    fn get_script_content(&self, name: &str, up: bool) -> Result<String, Error> {
        debug!("get script content for {} ({})", name, up);
        match std::fs::read_to_string(self.get_script_path(name, up)) {
            Ok(content) => Ok(content),
            Err(_) => Err(Error::ScriptNotFound(name.to_string())),
        }
    }

    async fn execute_script<'a>(
        &self,
        conn: &mut Transaction<'_>,
        content: &str,
    ) -> Result<(), Error> {
        match sqlx::query(content).execute(conn).await {
            Ok(_) => Ok(()),
            Err(err) => Err(Error::ScriptFailed(err.to_string())),
        }
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

    async fn run_script<'a>(
        &self,
        conn: &mut Transaction<'_>,
        name: &str,
        up: bool,
    ) -> Result<(), Error> {
        debug!("run script for {} ({})", name, up);
        let content = self.get_script_content(name, up)?;
        self.execute_script(conn, content.as_str()).await?;
        if up {
            self.insert_migration(conn, name).await?;
        } else {
            self.delete_migration(conn, name).await?;
        }
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
        let mut scripts: Vec<_> = self.scripts.iter().collect();
        scripts.sort();
        for item in scripts.iter() {
            let name = item.as_str();
            if !self.check_migrated(&mut conn, name).await? {
                self.run_script(&mut conn, name, true).await?;
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
        let mut scripts: Vec<_> = self.scripts.iter().collect();
        scripts.sort();
        scripts.reverse();
        for item in scripts.iter() {
            let name = item.as_str();
            if self.check_migrated(&mut conn, name).await? {
                self.run_script(&mut conn, name, false).await?;
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

    pub fn get_migration_path() -> String {
        std::env::var("TEST_MIGRATION_PATH").unwrap_or_else(|_| "migrations".into())
    }

    #[test]
    #[serial]
    fn create_from_env() {
        std::env::remove_var("MIGRATION_PATH");
        assert!(Migrator::from_env().is_err());
        std::env::set_var("MIGRATION_PATH", "/fake/path");
        assert!(Migrator::from_env().is_err());
        std::env::set_var("MIGRATION_PATH", get_migration_path().as_str());
        let migrator = Migrator::from_env().unwrap();
        assert_ne!(migrator.scripts.len(), 0);
    }

    #[actix_rt::test]
    #[serial]
    async fn run_up_down() {
        std::env::set_var("DATABASE_USER", "postgres");
        std::env::set_var("DATABASE_HOST", "localhost");
        std::env::set_var("DATABASE_DBNAME", "postgres");
        std::env::set_var("MIGRATION_PATH", get_migration_path().as_str());
        let migrator = Migrator::from_env().unwrap();
        migrator.up(&POOL).await.unwrap();
        migrator.down(&POOL).await.unwrap();
    }
}
