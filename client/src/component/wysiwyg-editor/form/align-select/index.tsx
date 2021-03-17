import React from 'react';

import SimpleSelect, { SimpleSelectParentProps } from '../simple-select';

export type Align = 'left' | 'center' | 'right' | 'justify';

export type AlignSelectProps = SimpleSelectParentProps<Align>;

export const OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Justify', value: 'justify' },
];

const AlignSelect: React.FC<AlignSelectProps> = (props) => (
  <SimpleSelect options={OPTIONS} {...props} label={props.label ?? 'Align'} name={props.name ?? 'align'} />
);

export default AlignSelect;
