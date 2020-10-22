import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Element from './index';

test('default props', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/now']}>
      <Route path="/now">
        <Element>
          <div id="now" />
        </Element>
      </Route>
      <Route path="/">
        <div id="home" />
      </Route>
    </MemoryRouter>,
  );
  const navigateBack = container.querySelector('[name="navigate-back"]');
  expect(navigateBack).toBeNull();
  const homeButton = container.querySelector('[name="navigate-home"]');
  expect(homeButton).toBeVisible();
  fireEvent.click(homeButton!);
  expect(container.querySelector('#home')).toBeVisible();
});

test('click on back', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/previous', '/now']} initialIndex={1}>
      <Route path="/now">
        <Element backButtonVisible>
          <div id="now" />
        </Element>
      </Route>
      <Route path="/previous">
        <div id="previous" />
      </Route>
    </MemoryRouter>,
  );
  const navigateBack = container.querySelector('[name="navigate-back"]');
  expect(navigateBack).toBeVisible();
  fireEvent.click(navigateBack!);
  expect(container.querySelector('#previous')).toBeVisible();
});

test('loading state', async () => {
  const { container } = render(
    <Element loading>
      <div id="now" />
    </Element>,
  );
  const loader = container.querySelector('#loading');
  expect(loader).toBeVisible();
});
