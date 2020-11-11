import React from 'react';

import SimpleSelect, { SimpleSelectParentProps } from '../simple-select';

export type VerticalAlign = 'top' | 'middle' | 'bottom';

export const OPTIONS = [
  { label: 'Top', value: 'top' },
  { label: 'Middle', value: 'middle' },
  { label: 'Bottom', value: 'bottom' },
];

const VerticalAlignSelect: React.FC<SimpleSelectParentProps<VerticalAlign>> = (props) => (
  <SimpleSelect
    options={OPTIONS}
    {...props}
    label={props.label ?? 'Vertical align'}
    name={props.name ?? 'vertical-align'}
  />
);

export default VerticalAlignSelect;
