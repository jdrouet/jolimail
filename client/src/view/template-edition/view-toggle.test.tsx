import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Element from './view-toggle';

test('change from code to preview', async () => {
  const handleChange = jest.fn();
  const { container, getByText } = render(<Element onChange={handleChange} value="code" />);
  await waitForElement(() => container.querySelector('[name="code"][disabled]'));
  fireEvent.click(getByText('Preview'));
  expect(handleChange).toHaveBeenCalledWith('preview');
});

test('change from preview to code', async () => {
  const handleChange = jest.fn();
  const { container, getByText } = render(<Element onChange={handleChange} value="preview" />);
  await waitForElement(() => container.querySelector('[name="preview"][disabled]'));
  fireEvent.click(getByText('Code'));
  expect(handleChange).toHaveBeenCalledWith('code');
});
