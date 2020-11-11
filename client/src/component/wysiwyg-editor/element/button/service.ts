import { Align } from '../../form/align-select';
import { TextDecoration } from '../../form/text-decoration-select';
import { TextTransform } from '../../form/text-transform-select';
import { VerticalAlign } from '../../form/vertical-align-select';
import { toElement } from '../util';

export type ButtonElement = {
  type: 'button';
  properties: {
    'align'?: Align;
    'background-color'?: string;
    'border'?: string;
    'border-radius'?: string;
    'border-bottom'?: string;
    'border-top'?: string;
    'border-right'?: string;
    'border-left'?: string;
    'color'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'height'?: string;
    'href'?: string;
    'inner-padding'?: string;
    'letter-spacing'?: string;
    'line-height'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'rel'?: string;
    'target'?: string;
    'text-align'?: Align;
    'text-decoration'?: TextDecoration;
    'text-transform'?: TextTransform;
    'vertical-align'?: VerticalAlign;
    'width'?: string;
  };
  children?: string;
};

export const toMrml = (input: ButtonElement): string => toElement('mj-button', input.properties, input.children ?? '');
