import React from 'react';

import { Mode } from '../mode-button-group';
import { PreviewButtonElement } from './button';
import { PreviewDividerElement } from './divider';
import { PreviewImageElement } from './image';
import { PreviewRawHtmlElement } from './raw-html';
import { PreviewSectionElement } from './section';
import { Element } from './service';
import { PreviewSocialSharingElement } from './social-sharing';
import { PreviewSpacerElement } from './spacer';
import { PreviewTextElement } from './text';

export type PreviewElementProps = {
  className?: string;
  mode: Mode;
  onChange: (element: Element) => void;
  onDelete: (element: Element) => void;
  value: Element;
};

export const PreviewElement: React.FC<PreviewElementProps> = ({ className, mode, onChange, onDelete, value }) => {
  if (value.type === 'button') {
    return <PreviewButtonElement className={className} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  if (value.type === 'divider') {
    return <PreviewDividerElement className={className} value={value} />;
  }
  if (value.type === 'image') {
    return <PreviewImageElement className={className} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  if (value.type === 'raw-html') {
    return <PreviewRawHtmlElement className={className} value={value} />;
  }
  if (value.type === 'section') {
    return (
      <PreviewSectionElement className={className} mode={mode} onChange={onChange} onDelete={onDelete} value={value} />
    );
  }
  if (value.type === 'social-sharing') {
    return <PreviewSocialSharingElement className={className} value={value} />;
  }
  if (value.type === 'spacer') {
    return <PreviewSpacerElement className={className} value={value} />;
  }
  if (value.type === 'text') {
    return <PreviewTextElement className={className} onChange={onChange} onDelete={onDelete} value={value} />;
  }
  return null;
};
