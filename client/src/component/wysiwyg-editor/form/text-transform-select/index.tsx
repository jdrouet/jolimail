import React from 'react';

import SimpleSelect, { SimpleSelectOption, SimpleSelectParentProps } from '../simple-select';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none';

export type TextTransformSelectProps = SimpleSelectParentProps<TextTransform>;

export const OPTIONS: SimpleSelectOption<TextTransform>[] = [
  { label: 'None', value: 'none' },
  { label: 'Uppercase', value: 'uppercase' },
  { label: 'Lowercase', value: 'lowercase' },
  { label: 'Capitalize', value: 'capitalize' },
];

const TextTransformSelect: React.FC<TextTransformSelectProps> = (props) => (
  <SimpleSelect
    options={OPTIONS}
    {...props}
    label={props.label ?? 'Text transform'}
    name={props.name ?? 'text-transform'}
    value={props.value ?? 'none'}
  />
);

export default TextTransformSelect;
