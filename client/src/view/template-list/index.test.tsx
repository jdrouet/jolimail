import { findByAltText, findByTestId, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { wrap } from 'src/__utils__/swr';

import View from './index';

const renderApp = () =>
  wrap(
    <MemoryRouter initialEntries={['/']}>
      <Switch>
        <Route exact path="/">
          <View key="empty case" />
        </Route>
        <Route exact path="/templates/create">
          <div data-testid="create-view" />
        </Route>
        <Route exact path="/templates/:templateId">
          <div data-testid="template-view" />
        </Route>
      </Switch>
    </MemoryRouter>,
  );

test('empty case', async () => {
  const scope = nock('http://localhost').get('/api/templates').query({ offset: 0, limit: 20 }).once().reply(200, []);
  const { container } = renderApp();
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  await findByAltText(container, 'The are no template available...');
  const button = container.querySelector('button[data-action="create-template"]');
  fireEvent.click(button!);
  await findByTestId(container, 'create-view');
  expect(scope.isDone()).toBeTruthy();
});

test('with some values', async () => {
  const scope = nock('http://localhost')
    .get('/api/templates')
    .query({ offset: 0, limit: 20 })
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
  const loading = await findByTestId(container, 'loading');
  await waitForElementToBeRemoved(loading);
  const createButton = await waitFor(() => container.querySelector('button[data-action="create-template"]'));
  expect(createButton).toBeVisible();
  const templates = await waitFor(() => container.querySelectorAll('[data-template]'));
  expect(templates.length).toBeGreaterThan(0);
  fireEvent.click(templates[0]!);
  await findByTestId(container, 'template-view');
  expect(scope.isDone()).toBeTruthy();
});
