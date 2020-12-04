import { findByRole, findByText, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Dialog from './dialog';
import { ButtonElement } from './service';

it('should have content', async () => {
  const handleCancel = jest.fn();
  const handleSave = jest.fn();
  const element: ButtonElement = {
    type: 'button',
    properties: {},
  };
  render(<Dialog open={true} onCancel={handleCancel} onSave={handleSave} value={element} />);
  expect(await findByText(document.body, 'Button edition')).toBeVisible();
});
