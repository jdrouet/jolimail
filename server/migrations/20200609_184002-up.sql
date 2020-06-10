ALTER TABLE templates ADD COLUMN current_version_id UUID REFERENCES template_versions(id) ON DELETE SET NULL;
