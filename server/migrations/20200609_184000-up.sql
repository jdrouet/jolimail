CREATE TABLE templates (
  id UUID NOT NULL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE TABLE template_versions (
  id UUID NOT NULL PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMP
);

ALTER TABLE templates ADD COLUMN current_version UUID
REFERENCES template_versions(id) ON DELETE SET NULL;
