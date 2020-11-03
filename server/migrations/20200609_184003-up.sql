ALTER TABLE template_versions
ADD CONSTRAINT template_versions_unique_name
UNIQUE (template_id, name);
