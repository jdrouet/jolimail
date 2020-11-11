import { ButtonElement } from './button';
import { DividerElement, toMrml as dividerToMrml } from './divider';
import { ImageElement, toMrml as imageToMrml } from './image';
import { RawHtmlElement } from './raw-html';
import { SectionElement, toMrml as sectionToMrml } from './section';
import { SocialSharingElement } from './social-sharing';
import { SpacerElement, toMrml as spacerToMrml } from './spacer';
import { TextElement, toMrml as textToMrml } from './text';

export type ContentElement =
  | ButtonElement
  | DividerElement
  | ImageElement
  | RawHtmlElement
  | SocialSharingElement
  | SpacerElement
  | TextElement;
export type Element = ContentElement | SectionElement;

export const CONTENT_TYPES: ContentElement['type'][] = [
  'button',
  'divider',
  'image',
  'raw-html',
  'social-sharing',
  'spacer',
  'text',
];
export const ALL_TYPES: Element['type'][] = [...CONTENT_TYPES, 'section'];

export const toMrml = (input: Element | Element[]): string => {
  if (Array.isArray(input)) {
    return input.map(toMrml).join('');
  }
  switch (input.type) {
    case 'divider':
      return dividerToMrml(input);
    case 'image':
      return imageToMrml(input);
    case 'section':
      return sectionToMrml(input);
    case 'spacer':
      return spacerToMrml(input);
    case 'text':
      return textToMrml(input);
    default:
      console.warn("couldn't find converter for", input.type);
      return '';
  }
};
