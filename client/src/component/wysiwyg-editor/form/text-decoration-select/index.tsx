import React from 'react';

import SimpleSelect, { SimpleSelectOption, SimpleSelectParentProps } from '../simple-select';

export type TextDecoration = 'underline' | 'overline' | 'line-through' | 'none';

export type TextDecorationSelectProps = SimpleSelectParentProps<TextDecoration>;

export const OPTIONS: SimpleSelectOption<TextDecoration>[] = [
  { label: 'Underline', value: 'underline' },
  { label: 'Overline', value: 'overline' },
  { label: 'Line Through', value: 'line-through' },
  { label: 'None', value: 'none' },
];

const TextDecorationSelect: React.FC<TextDecorationSelectProps> = (props) => (
  <SimpleSelect
    options={OPTIONS}
    {...props}
    label={props.label ?? 'Text Decoration'}
    name={props.name ?? 'text-decoration'}
    value={props.value ?? 'none'}
  />
);

export default TextDecorationSelect;
