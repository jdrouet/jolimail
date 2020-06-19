import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Element from './mode-toggle';

test('change from desktop to mobile', async () => {
  const handleChange = jest.fn();
  const { container } = render(<Element onChange={handleChange} value="desktop" />);
  await waitForElement(() => container.querySelector('[name="mobile"]'));
  await waitForElement(() => container.querySelector('[name="desktop"]'));
  fireEvent.click(container.querySelector('[name="mobile"]')!);
  expect(handleChange).toHaveBeenCalledWith('mobile');
});
