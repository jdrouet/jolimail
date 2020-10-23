import { getByText, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('normal behaviour', async () => {
  const template = {
    id: 'some-id',
    currentVersionId: null,
    slug: 'something',
    title: 'something',
    description: 'lorem ipsum',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    deletedAt: null,
  };
  const { container } = render(<Element template={template} />);
  expect(getByText(container, 'something')!).toBeVisible();
  expect(getByText(container, 'lorem ipsum')!).toBeVisible();
  expect(getByText(container, 'Created less than a minute ago')!).toBeVisible();
});
