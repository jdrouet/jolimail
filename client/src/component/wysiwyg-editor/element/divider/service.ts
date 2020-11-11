import { indent, toElement } from '../util';

export type DividerElement = {
  type: 'divider';
  properties: {
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
};

export const toMrml = (input: DividerElement, level: number): string =>
  indent(level, toElement('mj-divider', input.properties));
