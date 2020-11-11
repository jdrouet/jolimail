import { findByRole, findByText, fireEvent, render } from '@testing-library/react';
import React from 'react';

import SimpleSelect from './index';

it('should toggle to mobile', async () => {
  const handleChange = jest.fn();
  const options = [
    { label: 'First', value: 'first' },
    { label: 'Second', value: 'second' },
    { label: 'Third', value: 'third' },
  ];
  const { container } = render(
    <SimpleSelect label="Example" name="example" onChange={handleChange} options={options} value="first" />,
  );
  const label = await findByText(container, 'Example');
  expect(label).toBeVisible();
  const select = await findByRole(container, 'button');
  fireEvent.click(select);
  // TODO find a way to test popover
});
