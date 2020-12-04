import React from 'react';

import AlignSelect, { Align } from '../align-select';
import TextDecorationSelect, { TextDecoration } from '../text-decoration-select';
import TextInput from '../text-input';
import TextTransformSelect, { TextTransform } from '../text-transform-select';
import VerticalAlignSelect, { VerticalAlign } from '../vertical-align-select';

interface IAbstractInputProps<T, V> {
  readonly type: T;
  readonly label: string;
  readonly name: string;
  readonly onChange: (value: V, name: string) => void;
  readonly value?: V;
}

export type AbstractInputProps =
  | IAbstractInputProps<'align', Align>
  | IAbstractInputProps<'text-decoration', TextDecoration>
  | IAbstractInputProps<'text-transform', TextTransform>
  | IAbstractInputProps<'vertical-align', VerticalAlign>
  | IAbstractInputProps<'text', string>;

const AbstractInput = function (props: AbstractInputProps) {
  if (props.type === 'align') {
    const { type, ...others } = props;
    return <AlignSelect {...others} />;
  }
  if (props.type === 'text-decoration') {
    const { type, ...others } = props;
    return <TextDecorationSelect {...others} />;
  }
  if (props.type === 'text-transform') {
    const { type, ...others } = props;
    return <TextTransformSelect {...others} />;
  }
  if (props.type === 'vertical-align') {
    const { type, ...others } = props;
    return <VerticalAlignSelect {...others} />;
  }
  const { type, ...others } = props;
  return <TextInput {...others} />;
};

export default AbstractInput;
