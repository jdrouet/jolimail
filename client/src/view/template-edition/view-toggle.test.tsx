import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Element from './view-toggle';

test('change from code to preview', async () => {
  const handleChange = jest.fn();
  const { container } = render(<Element onChange={handleChange} value="code" />);
  await waitForElement(() => container.querySelector('[name="code"]'));
  await waitForElement(() => container.querySelector('[name="preview"]'));
  fireEvent.click(container.querySelector('[name="preview"]')!);
  expect(handleChange).toHaveBeenCalledWith('preview');
});
