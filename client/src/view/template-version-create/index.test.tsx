import { findByTestId, findByText, fireEvent } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { wrap } from 'src/__utils__/swr';

import View from './index';

const renderApp = () =>
  wrap(
    <MemoryRouter initialEntries={['/templates/my-template/versions/create']}>
      <Switch>
        <Route exact path="/templates/:templateId/versions/create">
          <View />
        </Route>
        <Route exact path="/templates/:templateId/versions/:versionId">
          <div data-testid="version-view" />
        </Route>
      </Switch>
    </MemoryRouter>,
  );

test('normal case', async () => {
  const scope = nock('http://localhost')
    .post('/api/templates/my-template/versions')
    .reply(200, [
      {
        id: 'version-id',
        name: '0.1.0',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        deletedAt: null,
      },
    ]);
  const { container } = renderApp();
  const nameInput = container.querySelector('input[name="name"]');
  expect(nameInput).not.toBeNull();
  fireEvent.change(nameInput!, { target: { value: '0.1.0' } });
  const submitButton = container.querySelector('button[type="submit"]');
  expect(nameInput).not.toBeNull();
  fireEvent.click(submitButton!);
  expect(await findByTestId(container, 'version-view')).toBeVisible();
  scope.done();
});

test('conflict case', async () => {
  const scope = nock('http://localhost')
    .post('/api/templates/my-template/versions')
    .reply(409, 'Version name already exists');
  const { container } = renderApp();
  const nameInput = container.querySelector('input[name="name"]');
  expect(nameInput).not.toBeNull();
  fireEvent.change(nameInput!, { target: { value: '0.1.0' } });
  const submitButton = container.querySelector('button[type="submit"]');
  expect(nameInput).not.toBeNull();
  fireEvent.click(submitButton!);
  expect(await findByText(container, 'The name already exists')).toBeVisible();
  expect(nameInput).toBeVisible();
  scope.done();
});

test('error case', async () => {
  const scope = nock('http://localhost').post('/api/templates/my-template/versions').reply(500, 'Oooops');
  const { container } = renderApp();
  const nameInput = container.querySelector('input[name="name"]');
  expect(nameInput).not.toBeNull();
  fireEvent.change(nameInput!, { target: { value: '0.1.0' } });
  const submitButton = container.querySelector('button[type="submit"]');
  expect(nameInput).not.toBeNull();
  fireEvent.click(submitButton!);
  expect(await findByText(container, 'Something went wrong...')).toBeVisible();
  expect(nameInput).toBeVisible();
  scope.done();
});
