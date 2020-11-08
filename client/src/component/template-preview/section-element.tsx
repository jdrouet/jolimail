import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback } from 'react';
import * as Editor from 'src/service/editor';
import { times } from 'src/service/utils';

import DropZone from './drop-zone';
import TemplateElement from './element';

export type TemplateSectionChildProps = {
  index: number;
  onChange: (element: Editor.ContentElement, index: number) => void;
  value?: Editor.ContentElement;
};

const TemplateSectionChild: React.FC<TemplateSectionChildProps> = ({ index, onChange, value }) => {
  const classes = useStyles();

  const handleChange = useCallback(
    (element: Editor.Element) => {
      onChange(element as Editor.ContentElement, index);
    },
    [index, onChange],
  );

  if (!value) {
    return <DropZone className={classes.element} accept={Editor.contentTypes} onDrop={handleChange} />;
  }
  return <TemplateElement className={classes.element} onChange={handleChange} value={value} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(),
  },
  element: {
    flex: 1,
  },
}));

export type TemplateSectionProps = {
  className?: string;
  onChange: (element: Editor.SectionElement) => void;
  value: Editor.SectionElement;
};

const TemplateSection: React.FC<TemplateSectionProps> = ({ className, onChange, value }) => {
  const classes = useStyles();

  const handleChangeChild = useCallback(
    (element: Editor.Element, index) => {
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
    <div className={cn(classes.root, className)}>
      {times(value.properties.columns).map((_, index) => (
        <TemplateSectionChild
          key={index}
          index={index}
          onChange={handleChangeChild}
          value={value.children && value.children[index]}
        />
      ))}
    </div>
  );
};

export default TemplateSection;
