import React from 'react';

import SimpleSelect, { SimpleSelectOption, SimpleSelectParentProps } from '../simple-select';

export type VerticalAlign = 'top' | 'middle' | 'bottom';

export type VerticalAlignSelectProps = SimpleSelectParentProps<VerticalAlign>;

export const OPTIONS: SimpleSelectOption<VerticalAlign>[] = [
  { label: 'Top', value: 'top' },
  { label: 'Middle', value: 'middle' },
  { label: 'Bottom', value: 'bottom' },
];

const VerticalAlignSelect: React.FC<VerticalAlignSelectProps> = (props) => (
  <SimpleSelect
    options={OPTIONS}
    {...props}
    label={props.label ?? 'Vertical align'}
    name={props.name ?? 'vertical-align'}
    value={props.value ?? 'middle'}
  />
);

export default VerticalAlignSelect;
