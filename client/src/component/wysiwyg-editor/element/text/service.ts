import { Align } from '../../form/align-select';
import { TextDecoration } from '../../form/text-decoration-select';
import { TextTransform } from '../../form/text-transform-select';
import { toElement } from '../util';

export type TextElement = {
  type: 'text';
  properties: {
    'color'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    // TODO
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    'height'?: string;
    'text-decoration'?: TextDecoration;
    'text-transform'?: TextTransform;
    'align'?: Align;
    // TODO
    'container-background-color'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'css-class'?: string;
  };
  children?: string;
};

export const toMrml = (element: TextElement): string =>
  toElement('mj-text', element.properties, element.children ?? '');
