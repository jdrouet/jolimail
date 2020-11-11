import { ButtonElement } from './button';
import { DividerElement } from './divider';
import { ImageElement } from './image';
import { RawHtmlElement } from './raw-html';
import { SectionElement } from './section';
import { SocialSharingElement } from './social-sharing';
import { SpacerElement } from './spacer';
import { TextElement } from './text';

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

export const toMRML = (input: any) => {
  return '';
};
