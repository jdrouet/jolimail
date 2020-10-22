import { fireEvent, getByText, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('handle click', async () => {
  const handleClick = jest.fn();
  const { container } = render(
    <Element value={42} onClick={handleClick}>
      <span id="click" />
    </Element>,
  );
  fireEvent.click(container.querySelector('span#click')!);
  expect(handleClick).toHaveBeenCalled();
  expect(handleClick.mock.calls[0][1]).toEqual(42);
});
