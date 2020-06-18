import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, waitForElement } from '@testing-library/react';
import View from './index';

const renderView = () =>
  render(
    <MemoryRouter initialEntries={['/edition/template_id']}>
      <Route path="/edition/template_id">
        <View />
      </Route>
    </MemoryRouter>,
  );

test('renders', async () => {
  const { container } = renderView();
  await waitForElement(() => container.querySelector('main'));
});
