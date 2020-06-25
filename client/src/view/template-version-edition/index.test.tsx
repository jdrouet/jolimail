import { render, waitForElement } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';

import View from './index';

jest.mock('mrml-js');

const renderView = () =>
  render(
    <MemoryRouter initialEntries={['/edition/template-id']}>
      <Route path="/edition/:template_id">
        <View />
      </Route>
    </MemoryRouter>,
  );

test('renders', async () => {
  const mockTemplate = fetchMock.get(
    '/api/templates/template-id',
    Promise.resolve({
      id: 'template-id',
      title: 'Template title',
      description: 'Some information',
    }),
  );
  const mockContent = fetchMock.get('/api/templates/template-id/content', Promise.resolve('<mjml></mjml>'));
  const { container } = renderView();
  await waitForElement(() => container.querySelector('section'));
  mockTemplate.restore();
  mockContent.restore();
});
