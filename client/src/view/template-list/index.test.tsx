import { fireEvent, render, waitForElement } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';

import View from './index';

const renderView = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">
        <View />
      </Route>
      <Route path="/create">CREATION</Route>
      <Route path="/edition/first">FIRST TEMPLATE</Route>
    </MemoryRouter>,
  );

test('renders empty list', async () => {
  const mock = fetchMock.get('/api/templates', Promise.resolve([]));
  const { container, getByText } = renderView();
  await waitForElement(() => container.querySelector('main'));
  expect(getByText('Create a template')).toBeInTheDocument();
  mock.restore();
});

test('redirects to create page', async () => {
  const mock = fetchMock.get('/api/templates', Promise.resolve([]));
  const { container, getByText } = renderView();
  await waitForElement(() => container.querySelector('main'));
  fireEvent.click(getByText('Create a template'));
  await waitForElement(() => getByText('CREATION'));
  mock.restore();
});

test('renders elements', async () => {
  const templates = [
    { id: 'first', title: 'first template', description: '' },
    { id: 'second', title: 'second template', description: '' },
  ];
  const mock = fetchMock.get('/api/templates', Promise.resolve(templates));
  const { container, getByText } = renderView();
  await waitForElement(() => container.querySelector('main'));
  expect(container.querySelector('[data-template="first"]')).toBeInTheDocument();
  expect(container.querySelector('[data-template="second"]')).toBeInTheDocument();
  fireEvent.click(container.querySelector('[data-template="first"]') as Element);
  await waitForElement(() => getByText('FIRST TEMPLATE'));
  mock.restore();
});
