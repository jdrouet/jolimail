import { render } from '@testing-library/react';
import React from 'react';
import { SWRConfig } from 'swr';

const configValue = {
  dedupingInterval: 0,
};

export const wrap = (children: JSX.Element | JSX.Element[]) =>
  render(<SWRConfig value={configValue}>{children}</SWRConfig>);
