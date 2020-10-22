import { findByText, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Element from './index';

test('normal behaviour', async () => {
  const onClick = jest.fn();
  const onDelete = jest.fn();
  const onDuplicate = jest.fn();
  const onSetToDefault = jest.fn();
  const version = {
    id: 'version-id',
    templateId: 'some-id',
    name: '0.1.0',
    content: '<mjml />',
    attributes: {},
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    deletedAt: null,
  };
  const { container } = render(
    <Element
      onClick={onClick}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onSetToDefault={onSetToDefault}
      version={version}
    />,
  );
  expect(container).toHaveTextContent(version.name);
  const element = await findByText(container, version.name);
  expect(element!).toBeVisible();
  fireEvent.click(element);
  expect(onClick).toHaveBeenCalled();
});

test('with default', () => {
  const onClick = jest.fn();
  const onDelete = jest.fn();
  const onDuplicate = jest.fn();
  const onSetToDefault = jest.fn();
  const version = {
    id: 'version-id',
    templateId: 'some-id',
    name: '0.1.0',
    content: '<mjml />',
    attributes: {},
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    deletedAt: null,
  };
  const { container } = render(
    <Element
      currentVersion
      onClick={onClick}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onSetToDefault={onSetToDefault}
      version={version}
    />,
  );
  expect(container).toHaveTextContent(`${version.name} (Default)`);
});
