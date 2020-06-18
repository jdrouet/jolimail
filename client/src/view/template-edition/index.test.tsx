import React from 'react';
import fetchMock from 'fetch-mock';
import { MemoryRouter, Route } from 'react-router';
import { render, waitForElement } from '@testing-library/react';
import View from './index';

const renderView = () =>
  render(
    <MemoryRouter initialEntries={['/edition/template-id']}>
      <Route path="/edition/:template_id">
        <View />
      </Route>
    </MemoryRouter>,
  );

test('renders', async () => {
  const mock = fetchMock.get(
    '/api/templates/template-id',
    Promise.resolve({
      id: 'template-id',
      title: 'Template title',
      description: 'Some information',
    }),
  );
  const { container } = renderView();
  await waitForElement(() => container.querySelector('section'));
  mock.restore();
});
