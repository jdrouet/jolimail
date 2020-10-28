import {
  findByAltText,
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { getRandomId } from 'src/__utils__/faker';
import { wrap } from 'src/__utils__/swr';

import View from './index';

const renderApp = (templateId: string) =>
  wrap(
    <MemoryRouter initialEntries={['/', `/templates/${templateId}`]} initialIndex={1}>
      <Switch>
        <Route exact path="/templates/:templateId">
          <View />
        </Route>
        <Route exact path="/templates/:templateId/versions/:versionId">
          <div data-testid="version-view" />
        </Route>
        <Route exact path="/">
          <div data-testid="other-view" />
        </Route>
      </Switch>
    </MemoryRouter>,
  );

test('basic case', async () => {
  const templateId = getRandomId();
  const versionId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [
      {
        id: versionId,
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {});
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  expect(await findByTitle(container, 'Delete the template')).toBeVisible();
  expect(await findByText(container, 'Random template')).toBeVisible();
  expect(await findByText(container, '0.1.0')).toBeVisible();
  scope.done();
});

test('without version', async () => {
  const templateId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {});
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  expect(await findByTitle(container, 'Delete the template')).toBeVisible();
  expect(await findByText(container, 'Random template')).toBeVisible();
  expect(await findByAltText(container, 'empty template versions')).toBeVisible();
  scope.done();
});

test('deleting template and confirm', async () => {
  const templateId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {})
    .delete(`/api/templates/${templateId}`)
    .once()
    .reply(204);
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  expect(await findByTitle(container, 'Delete the template')).toBeVisible();
  const title = await findByText(container, 'Random template');
  expect(title).toBeVisible();
  expect(await findByAltText(container, 'empty template versions')).toBeVisible();
  const deleteButton = await findByTestId(container, 'template-delete');
  fireEvent.click(deleteButton);
  fireEvent.click(await findByTestId(document.body, 'confirm-dialog-accept'));
  await waitForElementToBeRemoved(title);
  expect(await findByTestId(container, 'other-view')).toBeVisible();
  scope.done();
});

test('deleting template and cancel', async () => {
  const templateId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {});
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  expect(await findByTitle(container, 'Delete the template')).toBeVisible();
  const title = await findByText(container, 'Random template');
  expect(title).toBeVisible();
  expect(await findByAltText(container, 'empty template versions')).toBeVisible();
  const deleteButton = await findByTestId(container, 'template-delete');
  fireEvent.click(deleteButton);
  const cancelButton = await findByTestId(document.body, 'confirm-dialog-cancel');
  fireEvent.click(cancelButton);
  await waitForElementToBeRemoved(cancelButton);
  scope.done();
});

test('set version as default', async () => {
  const templateId = getRandomId();
  const versionId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [
      {
        id: versionId,
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {})
    .patch(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      currentVersionId: versionId,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      currentVersionId: versionId,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    });
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  const versionOption = await findByTestId(container, 'options');
  expect(versionOption).toBeVisible();
  fireEvent.click(versionOption);
  const setToDefaultButton = await findByText(document.body, 'Set to default');
  expect(setToDefaultButton).toBeVisible();
  fireEvent.click(setToDefaultButton);
  await waitForElementToBeRemoved(setToDefaultButton);
  expect(await findByText(container, '0.1.0 (Default)')).toBeVisible();
  scope.done();
});

test('delete version', async () => {
  const templateId = getRandomId();
  const versionId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      currentVersionId: null,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [
      {
        id: versionId,
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ])
    .get('/api/settings')
    .once()
    .optionally()
    .reply(200, {})
    .delete(`/api/templates/${templateId}/versions/${versionId}`)
    .once()
    .reply(204)
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, []);
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  const versionTitle = await findByText(container, '0.1.0');
  const versionOption = await findByTestId(container, 'options');
  expect(versionOption).toBeVisible();
  fireEvent.click(versionOption);
  const deleteButton = await findByTestId(document.body, 'delete');
  expect(deleteButton).toBeVisible();
  fireEvent.click(deleteButton);
  const acceptButton = await findByTestId(document.body, 'confirm-dialog-accept');
  fireEvent.click(acceptButton);
  await waitForElementToBeRemoved(acceptButton);
  await waitForElementToBeRemoved(versionTitle);
  scope.done();
});

test('navigate to version', async () => {
  const templateId = getRandomId();
  const versionId = getRandomId();
  const scope = nock('http://localhost')
    .get(`/api/templates/${templateId}`)
    .once()
    .reply(200, {
      id: templateId,
      slug: 'random-template',
      title: 'Random template',
      description: '',
      currentVersionId: null,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get(`/api/templates/${templateId}/versions`)
    .once()
    .reply(200, [
      {
        id: versionId,
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ])
    .get('/api/settings')
    .once()
    .reply(200, {});
  const { container } = renderApp(templateId);
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  const versionTitle = await findByText(container, '0.1.0');
  expect(versionTitle).toBeVisible();
  fireEvent.click(versionTitle);
  await findByTestId(container, 'version-view');
  scope.done();
});
