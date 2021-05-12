import { fireEvent, getByText, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('handle closing', async () => {
  const { container } = render(
    <div>
      <button id="other">click</button>
      <Element message="Nothing" severity="error" />
    </div>,
  );
  expect(getByText(container, 'Nothing')).toBeVisible();
  fireEvent.click(container.querySelector('button#other')!);
  fireEvent.click(container.querySelector('button[title="Close"]')!);
});
