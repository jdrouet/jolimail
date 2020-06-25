import SmartphoneIcon from '@material-ui/icons/Smartphone';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import React from 'react';

import Element from './index';

const options = [
  {
    icon: SmartphoneIcon,
    label: 'first',
    value: 'first',
  },
  {
    icon: SmartphoneIcon,
    label: 'second',
    value: 'second',
  },
];

test('change from first to second', async () => {
  const handleChange = jest.fn();
  const { container } = render(<Element options={options} onChange={handleChange} value="first" />);
  await waitForElement(() => container.querySelector('[name="first"][disabled]'));
  fireEvent.click(container.querySelector('[name="second"]')!);
  expect(handleChange).toHaveBeenCalledWith('second');
});
