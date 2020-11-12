import React from 'react';

import SimpleSelect, { SimpleSelectParentProps } from '../simple-select';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

export type TextTransformSelectProps = SimpleSelectParentProps<TextTransform>;

export const OPTIONS = [
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
  />
);

export default TextTransformSelect;
