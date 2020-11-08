export type Element = SectionElement | ContentElement;

export type ButtonElement = {
  type: 'button';
  properties: {
    href?: string;
  };
};

export type DividerElement = {
  type: 'divider';
  properties: {};
};

export type RawHtmlElement = {
  type: 'raw-html';
  properties: {};
};

export type ImageElement = {
  type: 'image';
  properties: {
    src: string;
  };
};

export type SocialSharingElement = {
  type: 'social-sharing';
  properties: {};
};

export type SpacerElement = {
  type: 'spacer';
  properties: {};
};

export type TextElement = {
  type: 'text';
  children?: string;
};

export type ContentElement = ButtonElement | DividerElement | ImageElement | RawHtmlElement | SocialSharingElement | SpacerElement | TextElement;

export type SectionElement = {
  type: 'section';
  properties: {
    columns: 1 | 2 | 3 | 4;
  };
  children?: (ContentElement | undefined)[];
};

export const contentTypes: ContentElement['type'][] = ['button', 'divider', 'image', 'raw-html', 'spacer', 'text'];
export const anyTypes: Element['type'][] = [...contentTypes, 'section'];
