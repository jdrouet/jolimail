import { findByAltText, findByTestId, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { wrap } from 'src/__utils__/swr';

import View from './index';

const renderApp = () =>
  wrap(
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">
        <View key="empty case" />
      </Route>
      <Route path="/templates/create">
        <div data-testid="create-view" />
      </Route>
      <Route path="/templates/:templateId">
        <div data-testid="template-view" />
      </Route>
    </MemoryRouter>,
  );

test('empty case', async () => {
  const scope = nock('http://localhost').get('/api/templates').once().reply(200, []);
  const { container } = renderApp();
  await waitForElementToBeRemoved(() => container.querySelector('#loading'));
  await findByAltText(container, 'empty template list');
  const button = container.querySelector('button[data-action="create-template"]');
  fireEvent.click(button!);
  await findByTestId(container, 'create-view');
  expect(scope.isDone()).toBeTruthy();
});

test('with some values', async () => {
  const scope = nock('http://localhost')
    .get('/api/templates')
    .once()
    .reply(200, [
      {
        id: 'first',
        slug: 'first-template',
        name: 'First template',
        description: 'Whatever',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deleteAt: null,
      },
    ]);
  const { container } = renderApp();
  await waitForElementToBeRemoved(() => container.querySelector('#loading'));
  const createButton = await waitFor(() => container.querySelector('button[data-action="create-template"]'));
  expect(createButton).toBeVisible();
  const templates = await waitFor(() => container.querySelectorAll('[data-template]'));
  expect(templates.length).toBeGreaterThan(0);
  fireEvent.click(templates[0]!);
  await findByTestId(container, 'template-view');
  expect(scope.isDone()).toBeTruthy();
});
