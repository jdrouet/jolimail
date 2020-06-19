import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import Element from './preview';

jest.mock('mrml-js');

test('render iframe content', async () => {
  const { container } = render(<Element value="<mjml></mjml>" />);
  await waitForElement(() => container.querySelector('iframe'));
});
