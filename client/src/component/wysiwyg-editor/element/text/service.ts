import { Align } from '../../form/align-select';
import { TextDecoration } from '../../form/text-decoration-select';
import { TextTransform } from '../../form/text-transform-select';

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

export const toHtml = (element: TextElement) => {
  const attributes = Object.entries(element.properties)
    .map((entry) => `${entry[0]}="${entry[1]}"`)
    .join(' ');
  return `<mj-text ${attributes}>${element.children}</mj-text>`;
};
