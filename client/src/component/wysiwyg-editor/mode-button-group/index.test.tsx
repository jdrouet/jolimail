import { findByTestId, fireEvent, render } from '@testing-library/react';
import React from 'react';

import ModeButtonGroup from './index';

it('should toggle to mobile', async () => {
  const handleChange = jest.fn();
  const { container } = render(<ModeButtonGroup onChange={handleChange} value="desktop" />);
  const desktopBtn = await findByTestId(container, 'mode-desktop');
  const mobileBtn = await findByTestId(container, 'mode-mobile');
  expect(desktopBtn).toHaveAttribute('disabled');
  expect(mobileBtn).not.toHaveAttribute('disabled');
  fireEvent.click(mobileBtn);
  expect(handleChange).toHaveBeenCalledWith('mobile');
});

it('should toggle to desktop', async () => {
  const handleChange = jest.fn();
  const { container } = render(<ModeButtonGroup onChange={handleChange} value="mobile" />);
  const desktopBtn = await findByTestId(container, 'mode-desktop');
  const mobileBtn = await findByTestId(container, 'mode-mobile');
  expect(desktopBtn).not.toHaveAttribute('disabled');
  expect(mobileBtn).toHaveAttribute('disabled');
  fireEvent.click(desktopBtn);
  expect(handleChange).toHaveBeenCalledWith('desktop');
});
