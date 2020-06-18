import { useEffect, useState } from 'react';

export type TemplateCreate = {
  title: string;
  description?: string;
};

export const createTemplate = function (payload: TemplateCreate): Promise<Template> {
  return fetch('/api/templates', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status >= 200 && res.status < 400) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
};

export type Template = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  currentVersionId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export const useTemplateList = function () {
  const [list, setList] = useState<Template[]>();
  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((content) => setList(content));
  }, [setList]);
  return list;
};

export const useTemplate = function (templateId: string) {
  const [result, setResult] = useState<Template>();
  useEffect(() => {
    fetch(`/api/templates/${templateId}`)
      .then((res) => res.json())
      .then((content) => setResult(content));
  }, [setResult, templateId]);
  return result;
};
