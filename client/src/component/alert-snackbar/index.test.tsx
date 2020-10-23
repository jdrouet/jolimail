import { fireEvent, getByText, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('handle closing', async () => {
  const handleClose = jest.fn();
  const { container } = render(
    <div>
      <button id="other">click</button>
      <Element open message="Nothing" severity="error" onClose={handleClose} />
    </div>,
  );
  expect(getByText(container, 'Nothing')).toBeVisible();
  fireEvent.click(container.querySelector('button#other')!);
  expect(handleClose).not.toHaveBeenCalled();
  fireEvent.click(container.querySelector('button[title="Close"]')!);
  expect(handleClose).toHaveBeenCalled();
});
