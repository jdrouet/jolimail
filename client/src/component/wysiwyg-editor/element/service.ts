import { ButtonElement } from './button';
import { DividerElement, toMrml as dividerToMrml } from './divider';
import { ImageElement, toMrml as imageToMrml } from './image';
import { RawHtmlElement } from './raw-html';
import { SectionElement, toMrml as sectionToMrml } from './section';
import { SocialSharingElement } from './social-sharing';
import { SpacerElement, toMrml as spacerToMrml } from './spacer';
import { TextElement, toMrml as textToMrml } from './text';
import { indent } from './util';

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

export const toMrml = (input: Element | Element[], indent: number = 2): string => {
  if (Array.isArray(input)) {
    return input.map((item) => toMrml(item, indent)).join('\n');
  }
  switch (input.type) {
    case 'divider':
      return dividerToMrml(input, indent);
    case 'image':
      return imageToMrml(input, indent);
    case 'section':
      return sectionToMrml(input, indent);
    case 'spacer':
      return spacerToMrml(input, indent);
    case 'text':
      return textToMrml(input, indent);
    default:
      console.warn("couldn't find converter for", input.type);
      return '';
  }
};

const createTemplate = (elements: Element | Element[]): string =>
  ['<mjml>', indent(1, '<mj-body>'), toMrml(elements, 2), indent(1, '</mj-body>'), '</mjml>'].join('\n');

const getBoundaries = (existing?: string): [number, number] | undefined => {
  if (!existing) return undefined;
  const startIndex = existing.indexOf('<mj-body');
  const endIndex = existing.indexOf('</mj-body');
  if (startIndex < 0 || endIndex < 0) return undefined;
  const startChevron = existing.indexOf('>', startIndex);
  if (startChevron < 0) return undefined;
  return [startChevron + 1, endIndex];
};

export const insertMrml = (existing: string | undefined, elements: Element | Element[]): string => {
  const boundaries = getBoundaries(existing);
  if (!existing || !boundaries) return createTemplate(elements);
  const start = existing.substr(0, boundaries[0]);
  const end = existing.substr(boundaries[1]);
  return `${start}\n${toMrml(elements, 2)}\n\t${end}`;
};
