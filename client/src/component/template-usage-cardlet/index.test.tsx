import { render, waitFor } from '@testing-library/react';
import nock from 'nock';
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
  expect(container.querySelector('[data-template="some-id"]')!).toBeVisible();
  expect(container).toHaveTextContent('define it as default');
});

test('with version', () => {
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
  const { container } = render(<Element template={template} version={version} />);
  expect(container.querySelector('[data-template="some-id"]')!).toBeVisible();
  expect(container).toHaveTextContent('define it as default');
});

test('with current version', async () => {
  const scope = nock('http://localhost')
    .get('/api/settings')
    .reply(200, { exampleCatapulteBaseUrl: 'http://localhost' });
  const template = {
    id: 'some-id',
    currentVersionId: 'version-id',
    slug: 'something',
    title: 'something',
    description: 'lorem ipsum',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    deletedAt: null,
  };
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
  const { container } = render(<Element template={template} version={version} />);
  expect(container.querySelector('[data-template="some-id"]')!).toBeVisible();
  await waitFor(() => {
    expect(container).toHaveTextContent('you just need a simple http request');
  });
  expect(container).toHaveTextContent('sender@example.com');
});
