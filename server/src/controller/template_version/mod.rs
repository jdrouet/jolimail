mod create;
mod delete;
mod get;
mod list;
mod update;

use actix_web::web::ServiceConfig;

pub fn config(cfg: &mut ServiceConfig) {
    cfg.service(create::handler);
    cfg.service(get::handler);
    cfg.service(list::handler);
    cfg.service(update::handler);
    cfg.service(delete::handler);
}
