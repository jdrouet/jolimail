mod client;
mod settings;
mod status;
mod template;
mod template_version;

use actix_web::web::ServiceConfig;

pub fn config(cfg: &mut ServiceConfig) {
    cfg.service(status::handler);
    cfg.service(settings::handler);
    template_version::config(cfg);
    template::config(cfg);
    client::config(cfg);
}
