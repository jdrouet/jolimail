import React from 'react';

import { Mode } from '../mode-button-group';
import PreviewButton, { ButtonElement } from '../preview-button';
import PreviewDivider, { DividerElement } from '../preview-divider';
import PreviewImage, { ImageElement } from '../preview-image';
import PreviewRawHtml, { RawHtmlElement } from '../preview-raw-html';
import PreviewSection, { SectionElement } from '../preview-section';
import PreviewSocialSharing, { SocialSharingElement } from '../preview-social-sharing';
import PreviewSpacer, { SpacerElement } from '../preview-spacer';
import PreviewText, { TextElement } from '../preview-text';

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

export type PreviewElementProps = {
  className?: string;
  mode: Mode;
  onChange: (element: Element) => void;
  onDelete: (element: Element) => void;
  value: Element;
};

const PreviewElement: React.FC<PreviewElementProps> = ({ className, mode, onChange, onDelete, value }) => {
  if (value.type === 'button') {
    return <PreviewButton className={className} value={value} />;
  }
  if (value.type === 'divider') {
    return <PreviewDivider className={className} value={value} />;
  }
  if (value.type === 'image') {
    return <PreviewImage className={className} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  if (value.type === 'raw-html') {
    return <PreviewRawHtml className={className} value={value} />;
  }
  if (value.type === 'section') {
    return <PreviewSection className={className} mode={mode} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  if (value.type === 'social-sharing') {
    return <PreviewSocialSharing className={className} value={value} />;
  }
  if (value.type === 'spacer') {
    return <PreviewSpacer className={className} value={value} />;
  }
  if (value.type === 'text') {
    return <PreviewText className={className} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  return null;
};

export default PreviewElement;
