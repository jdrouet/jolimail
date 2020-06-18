import React from 'react';
import fetchMock from 'fetch-mock';
import { MemoryRouter, Route } from 'react-router';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import View from './index';

const renderView = () =>
  render(
    <MemoryRouter initialEntries={['/create']}>
      <Route path="/create">
        <View />
      </Route>
      <Route path="/edition/new">
        NEW TEMPLATE
      </Route>
    </MemoryRouter>,
  );

test('renders title input', () => {
  const { container } = renderView();
  const element = container.querySelector('[name="title"]');
  expect(element).toBeInTheDocument();
});

test('renders description input', () => {
  const { container } = renderView();
  const element = container.querySelector('[name="description"]');
  expect(element).toBeInTheDocument();
});

test('enable submit button', () => {
  const { container } = renderView();
  const inputTitle = container.querySelector('[name="title"]');
  expect(inputTitle).toBeInTheDocument();
  fireEvent.input(inputTitle as Element, { target: { value: 'a title' } });
  expect(inputTitle?.getAttribute('value')).toBe('a title');
  const inputDescription = container.querySelector('[name="description"]');
  expect(inputDescription).toBeInTheDocument();
  fireEvent.input(inputDescription as Element, { target: { value: 'a description' } });
  expect(inputDescription?.innerHTML).toBe('a description');
  const submitBtn = container.querySelector('[type="submit"]');
  expect(submitBtn).toBeInTheDocument();
  expect(submitBtn?.hasAttribute('disabled')).toBeFalsy();
});

test('submit creation', async () => {
  const mock = fetchMock.post('/api/templates', Promise.resolve({ id: 'new' }));
  const { container, getByText } = renderView();
  const inputTitle = container.querySelector('[name="title"]');
  expect(inputTitle).toBeInTheDocument();
  fireEvent.input(inputTitle as Element, { target: { value: 'first' } });
  const submitBtn = container.querySelector('[type="submit"]');
  fireEvent.click(submitBtn as Element);
  await waitForElement(() => getByText('NEW TEMPLATE'));
  mock.restore();
});
