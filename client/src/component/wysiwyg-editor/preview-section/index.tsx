import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { times } from 'src/service/utils';

import DropZone from '../drop-zone';
import { Mode } from '../mode-button-group';
import PreviewElement, { CONTENT_TYPES, ContentElement, Element } from '../preview-element';

export type SectionElement = {
  type: 'section';
  properties: {
    columns: 1 | 2 | 3 | 4;
  };
  children?: (ContentElement | undefined)[];
};

const useChildrenStyles = makeStyles(() => ({
  desktop: {
    flex: 1,
  },
  mobile: {
    display: 'block',
  },
}));

export type TemplateSectionChildProps = {
  index: number;
  mode: Mode;
  onChange: (element: ContentElement, index: number) => void;
  value?: ContentElement;
};

const TemplateSectionChild: React.FC<TemplateSectionChildProps> = ({ index, mode, onChange, value }) => {
  const classes = useChildrenStyles();

  const handleChange = useCallback(
    (element: Element) => {
      onChange(element as ContentElement, index);
    },
    [index, onChange],
  );

  if (!value) {
    return <DropZone className={classes[mode]} accept={CONTENT_TYPES} onDrop={handleChange} />;
  }
  return <PreviewElement className={classes[mode]} mode={mode} onChange={handleChange} value={value} />;
};

const useStyles = makeStyles((theme) => ({
  desktop: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(),
  },
  mobile: {
    display: 'block',
  },
}));

export type TemplateSectionProps = {
  className?: string;
  mode: Mode;
  onChange: (element: SectionElement) => void;
  value: SectionElement;
};

const TemplateSection: React.FC<TemplateSectionProps> = ({ className, mode, onChange, value }) => {
  const classes = useStyles();

  const handleChangeChild = useCallback(
    (element: Element, index) => {
      const children = (value.children ?? times(value.properties.columns)).map((item, idx: number) => {
        if (idx === index) return element;
        return item;
      });
      onChange({
        ...value,
        children,
      });
    },
    [onChange, value],
  );

  return (
    <div className={cn(className, classes[mode])}>
      {times(value.properties.columns).map((_, index) => (
        <TemplateSectionChild
          key={index}
          index={index}
          mode={mode}
          onChange={handleChangeChild}
          value={value.children && value.children[index]}
        />
      ))}
    </div>
  );
};

export default TemplateSection;
