import { findByText, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('handle default', async () => {
  const handleAccept = jest.fn();
  const handleCancel = jest.fn();
  render(
    <Element
      open
      onAccept={handleAccept}
      onCancel={handleCancel}
      title="This is a title"
      description="This is a description"
    />,
  );
  expect(await findByText(document.body, 'This is a title')).toBeVisible();
  expect(await findByText(document.body, 'This is a description')).toBeVisible();
  expect(await findByText(document.body, 'Cancel')).toBeVisible();
  expect(await findByText(document.body, 'OK')).toBeVisible();
});

test('handle custom labels', async () => {
  const handleAccept = jest.fn();
  const handleCancel = jest.fn();
  render(
    <Element
      open
      onAccept={handleAccept}
      onCancel={handleCancel}
      title="This is a title"
      description="This is a description"
      cancelLabel="DO CANCEL"
      acceptLabel="DO ACCEPT"
    />,
  );
  expect(await findByText(document.body, 'This is a title')).toBeVisible();
  expect(await findByText(document.body, 'This is a description')).toBeVisible();
  expect(await findByText(document.body, 'DO CANCEL')).toBeVisible();
  expect(await findByText(document.body, 'DO ACCEPT')).toBeVisible();
  fireEvent.click(await findByText(document.body, 'DO ACCEPT'));
  expect(handleAccept).toHaveBeenCalled();
  fireEvent.click(await findByText(document.body, 'DO CANCEL'));
  expect(handleCancel).toHaveBeenCalled();
});
