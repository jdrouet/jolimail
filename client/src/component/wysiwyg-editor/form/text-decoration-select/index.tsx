import React from 'react';

import SimpleSelect, { SimpleSelectParentProps } from '../simple-select';

export type TextDecoration = 'underline' | 'overline' | 'line-through' | 'none';

export const OPTIONS = [
  { label: 'Underline', value: 'underline' },
  { label: 'Overline', value: 'overline' },
  { label: 'Line Through', value: 'line-through' },
  { label: 'None', value: 'none' },
];

const TextDecorationSelect: React.FC<SimpleSelectParentProps<TextDecoration>> = (props) => (
  <SimpleSelect
    options={OPTIONS}
    {...props}
    label={props.label ?? 'Text Decoration'}
    name={props.name ?? 'text-decoration'}
  />
);

export default TextDecorationSelect;
