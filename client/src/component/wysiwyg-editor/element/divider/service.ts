import { indent, toElement } from '../util';

export type Properties = {
  'border-color'?: string;
  'border-style'?: string;
  'border-width'?: string;
  'container-background-color'?: string;
  'css-class'?: string;
  'padding'?: string;
  'padding-top'?: string;
  'padding-right'?: string;
  'padding-bottom'?: string;
  'padding-left'?: string;
  'width'?: string;
};

export type DividerElement = {
  type: 'divider';
  properties: Properties;
};

export const toMrml = (input: DividerElement, level: number): string =>
  indent(level, toElement('mj-divider', input.properties));
