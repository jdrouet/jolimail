import { render } from '@testing-library/react';
import React from 'react';

import AlignSelect, { Align } from './index';

it('should render', () => {
  const handleChange = jest.fn<void, [Align, string]>();
  const value: Align = 'left';
  render(<AlignSelect label="random" name="align" onChange={handleChange} value={value} />);
});
