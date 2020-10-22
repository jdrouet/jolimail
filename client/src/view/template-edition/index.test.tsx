import { getByAltText, getByText, getByTitle, waitForElementToBeRemoved } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { wrap } from 'src/__utils__/swr';

import View from './index';

const renderApp = () =>
  wrap(
    <MemoryRouter initialEntries={['/templates/my-template']}>
      <Route path="/templates/:templateId">
        <View />
      </Route>
      <Route path="/">
        <div id="other-view" />
      </Route>
    </MemoryRouter>,
  );

test('basic case', async () => {
  const scope = nock('http://localhost')
    .get('/api/templates/my-template')
    .reply(200, {
      id: 'my-template',
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get('/api/templates/my-template/versions')
    .reply(200, [
      {
        id: 'version-id',
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ])
    .get('/api/settings')
    .optionally()
    .reply(200, {});
  const { container } = renderApp();
  await waitForElementToBeRemoved(() => container.querySelector('#loading'));
  expect(getByTitle(container, 'Delete the template')).toBeVisible();
  expect(getByText(container, 'Random template')).toBeVisible();
  expect(getByText(container, '0.1.0')).toBeVisible();
  scope.done();
});

test('without version', async () => {
  const scope = nock('http://localhost')
    .get('/api/templates/my-template')
    .reply(200, {
      id: 'my-template',
      slug: 'random-template',
      title: 'Random template',
      description: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      deletedAt: null,
    })
    .get('/api/templates/my-template/versions')
    .reply(200, [])
    .get('/api/settings')
    .optionally()
    .reply(200, {});
  const { container } = renderApp();
  await waitForElementToBeRemoved(() => container.querySelector('#loading'));
  expect(getByTitle(container, 'Delete the template')).toBeVisible();
  expect(getByText(container, 'Random template')).toBeVisible();
  expect(getByAltText(container, 'empty template versions')).toBeVisible();
  scope.done();
});
