import axios from 'axios';
import useSwr from 'swr';

export type ErrorResponse = {
  name: string;
  message?: string;
};

export const getter = <T>(url: string, params?: object): Promise<T> =>
  axios.get(url, { params }).then((res) => res.data);

export const config = {
  fetcher: getter,
};

export type Settings = {
  exampleCatapulteBaseUrl: string;
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

export type TemplateCreate = {
  title: string;
  description?: string;
};

export type TemplateUpdate = {
  title?: string;
  description?: string;
  currentVersionId?: string;
};

export type TemplateVersion = {
  id: string;
  templateId: string;
  name: string;
  content: string | null;
  attributes: object | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export const createTemplate = (payload: TemplateCreate): Promise<Template> =>
  axios.post('/api/templates', payload).then((res) => res.data);

export const updateTemplate = (templateId: string, payload: TemplateUpdate): Promise<Template> =>
  axios.patch(`/api/templates/${templateId}`, payload).then((res) => res.data);

export const deleteTemplate = (templateId: string): Promise<any> => axios.delete(`/api/templates/${templateId}`);

export const getTemplate = (id: string): Promise<Template> => getter(`/api/templates/${id}`);

export const useTemplate = function (templateId?: string) {
  return useSwr<Template>(templateId ? [`/api/templates/${templateId}`] : null, getter);
};

export const useTemplateList = () => useSwr<Template[]>('/api/templates');

export const getTemplateContent = (id: string): Promise<string> => getter(`/api/templates/${id}/content`);

export const useTemplateContent = (templateId?: string) =>
  useSwr<string>(templateId ? [`/api/templates/${templateId}/content`] : null);

export const getTemplateVersion = (id: string, versionId: string): Promise<TemplateVersion> =>
  getter(`/api/templates/${id}/versions/${versionId}`);

export const useTemplateVersion = function (templateId?: string, versionId?: string) {
  return useSwr<TemplateVersion>(
    templateId && versionId ? [`/api/templates/${templateId}/versions/${versionId}`] : null,
    getter,
  );
};

export const getTemplateVersionContent = (templateId: string, versionId: string): Promise<string> =>
  getter(`/api/templates/${templateId}/versions/${versionId}/content`);

export const useTemplateVersionContent = function (templateId?: string, versionId?: string) {
  return useSwr<string>(
    templateId && versionId ? [`/api/templates/${templateId}/versions/${versionId}/content`] : null,
  );
};

export const getTemplateVersionList = (templateId: string): Promise<TemplateVersion[]> =>
  getter(`/api/templates/${templateId}/versions`);

export const useTemplateVersionList = function (templateId?: string) {
  return useSwr<TemplateVersion[]>(templateId ? [`/api/templates/${templateId}/versions`] : null);
};

export const createTemplateVersion = (templateId: string, name: string, content?: string) =>
  axios.post(`/api/templates/${templateId}/versions`, { name, content }).then((res) => res.data);

export type TemplateVersionUpdate = {
  content?: string;
  attributes?: object;
};

export const updateTemplateVersion = (templateId: string, versionId: string, payload: TemplateVersionUpdate) =>
  axios.patch(`/api/templates/${templateId}/versions/${versionId}`, payload).then((res) => res.data);

export const deleteTemplateVersion = (templateId: string, versionId: string): Promise<any> =>
  axios.delete(`/api/templates/${templateId}/versions/${versionId}`);

export const useSettings = () => useSwr<Settings>('/api/settings');
