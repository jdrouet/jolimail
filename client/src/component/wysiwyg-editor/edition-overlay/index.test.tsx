import { findByText, fireEvent, render } from '@testing-library/react';
import React from 'react';

import EditionOverlay from './index';

it('call callbacks', async () => {
  const handleEdit = jest.fn();
  const handleDelete = jest.fn();
  const value = 'something';
  const { container } = render(
    <EditionOverlay onEdit={handleEdit} onDelete={handleDelete} value={value}>
      <div>content</div>
    </EditionOverlay>,
  );
  const content = await findByText(container, 'content');
  expect(content).toBeVisible();
  fireEvent.mouseOver(content);
});
