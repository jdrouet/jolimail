import React from 'react';
import * as Editor from 'src/service/editor';

import ButtonElement from './button-element';
import DividerElement from './divider-element';
import ImageElement from './image-element';
import RawHtmlElement from './raw-html-element';
import SectionElement from './section-element';
import SocialSharingElement from './social-sharing-element';
import SpacerElement from './spacer-element';
import TextElement from './text-element';

type ChangeHandler<T> = (value: T) => void;

export type TemplatePreviewElementProps<T> = {
  className?: string;
  onChange: ChangeHandler<T>;
  value: T;
};

const TemplatePreviewElement: React.FC<TemplatePreviewElementProps<Editor.Element>> = (props) => {
  if (props.value.type === 'button') {
    const value = props.value as Editor.ButtonElement;
    return <ButtonElement className={props.className} value={value} />;
  }
  if (props.value.type === 'divider') {
    const value = props.value as Editor.DividerElement;
    return <DividerElement className={props.className} value={value} />;
  }
  if (props.value.type === 'image') {
    const value = props.value as Editor.ImageElement;
    return <ImageElement className={props.className} value={value} />;
  }
  if (props.value.type === 'raw-html') {
    const value = props.value as Editor.RawHtmlElement;
    return <RawHtmlElement className={props.className} value={value} />;
  }
  if (props.value.type === 'section') {
    const value = props.value as Editor.SectionElement;
    return <SectionElement className={props.className} onChange={props.onChange} value={value} />;
  }
  if (props.value.type === 'social-sharing') {
    const value = props.value as Editor.SocialSharingElement;
    return <SocialSharingElement className={props.className} value={value} />;
  }
  if (props.value.type === 'spacer') {
    const value = props.value as Editor.SpacerElement;
    return <SpacerElement className={props.className} value={value} />;
  }
  if (props.value.type === 'text') {
    const value = props.value as Editor.TextElement;
    return <TextElement className={props.className} value={value} />;
  }
  return null;
};

export default TemplatePreviewElement;
