import { render } from '@testing-library/react';
import React from 'react';

import { Align } from '../align-select';
import AbstractInput from './index';

it('should render type text', () => {
  const handleChange = jest.fn<void, [string, string]>();
  const value: string = '';
  render(<AbstractInput label="random" name="text" onChange={handleChange} type="text" value={value} />);
});

it('should render type align', () => {
  const handleChange: (value: Align, name: string) => void = jest.fn<void, [Align, string]>();
  const value: Align = 'left';
  render(<AbstractInput label="random" name="align" onChange={handleChange} type="align" value={value} />);
});
