import { fireEvent, getByText, render, waitFor } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import View from './index';

afterEach(() => nock.cleanAll());

test('perfect case', async () => {
  const scope = nock('http://localhost').post('/api/templates').reply(200, { id: 'random-template-id' });
  const { container } = render(
    <MemoryRouter initialEntries={['/templates/create']}>
      <Route path="/templates/create">
        <View />
      </Route>
      <Route>
        <div id="other-view" />
      </Route>
    </MemoryRouter>,
  );
  expect(getByText(container, 'Create your template')).toBeVisible();
  const titleInput = container.querySelector('input[name="title"]');
  expect(titleInput).toBeVisible();
  fireEvent.change(titleInput!, { target: { value: 'whatever' } });
  const descriptionInput = container.querySelector('textarea[name="description"]');
  expect(descriptionInput).toBeVisible();
  fireEvent.change(descriptionInput!, { target: { value: 'some description' } });
  expect(container.querySelector('button[name="cancel"]')).toBeVisible();
  const createButton = container.querySelector('button[name="create"]');
  expect(createButton).toBeVisible();
  fireEvent.click(createButton!);
  await waitFor(() => container.querySelector('button[name="create"][disabled]'));
  await waitFor(() => scope.isDone());
  expect(container.querySelector('#other-view')).toBeVisible();
});

test('conflict error case', async () => {
  const scope = nock('http://localhost').post('/api/templates').reply(409, 'Title already exists');
  const { container } = render(<View />);
  const titleInput = container.querySelector('input[name="title"]');
  fireEvent.change(titleInput!, { target: { value: 'whatever' } });
  const descriptionInput = container.querySelector('textarea[name="description"]');
  fireEvent.change(descriptionInput!, { target: { value: 'some description' } });
  const createButton = container.querySelector('button[name="create"]');
  fireEvent.click(createButton!);
  await waitFor(() => container.querySelector('button[name="create"][disabled]'));
  await waitFor(() => scope.isDone());
  await waitFor(() => getByText(container, 'The title already exists'));
});

test('random error case', async () => {
  const scope = nock('http://localhost').post('/api/templates').reply(500, 'Something wrong happened...');
  const { container } = render(<View />);
  const titleInput = container.querySelector('input[name="title"]');
  fireEvent.change(titleInput!, { target: { value: 'whatever' } });
  const descriptionInput = container.querySelector('textarea[name="description"]');
  fireEvent.change(descriptionInput!, { target: { value: 'some description' } });
  const createButton = container.querySelector('button[name="create"]');
  fireEvent.click(createButton!);
  await waitFor(() => container.querySelector('button[name="create"][disabled]'));
  await waitFor(() => scope.isDone());
  await waitFor(() => getByText(container, 'Something went wrong...'));
  fireEvent.click(container.querySelector('button[title="Close"]')!);
  expect(getByText(container, 'Something went wrong...')).not.toBeVisible();
});

test('missing title error', async () => {
  const { container } = render(<View />);
  expect(container.querySelector('input[name="title"]')).toBeVisible();
  const descriptionInput = container.querySelector('textarea[name="description"]');
  expect(descriptionInput).toBeVisible();
  fireEvent.change(descriptionInput!, { target: { value: 'some description' } });
  expect(container.querySelector('button[name="create"][disabled]')).toBeVisible();
});
