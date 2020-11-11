import { Align } from '../../form/align-select';
import { toElement } from '../util';

export type ImageElement = {
  type: 'image';
  properties: {
    'align'?: Align;
    'alt'?: string;
    'border'?: string;
    'border-radius'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'fluid-on-mobile'?: string;
    'height'?: string;
    'href'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'rel'?: string;
    'src'?: string;
    'srcset'?: string;
    'target'?: string;
    'title'?: string;
    'usemap'?: string;
    'width'?: string;
  };
};

export const toMrml = (input: ImageElement): string => toElement('mj-image', input.properties);
