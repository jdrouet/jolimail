import { render } from '@testing-library/react';
import React from 'react';
import { SWRConfig } from 'swr';

export const wrap = (children: JSX.Element | JSX.Element[]) =>
  render(<SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>);
