import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback } from 'react';
import * as Editor from 'src/service/editor';

import DropZone from './drop-zone';
import TemplatePreviewElement from './element';

export type Mode = 'mobile' | 'desktop';

export type TemplatePreviewProps = {
  className?: string;
  mode?: Mode;
  onChange: (value: Editor.SectionElement[]) => void;
  elements: Editor.SectionElement[];
};

const useStyles = makeStyles(() => ({
  root: {
    transition: 'all ease-in .5s',
  },
  mobile: {
    maxWidth: 400,
    width: '100%',
    height: 640,
  },
  desktop: {
    width: '90%',
    height: 800,
  },
}));

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ className, mode = 'desktop', onChange, elements }) => {
  const classes = useStyles();

  const handleChange = (index: number) => (element: Editor.Element) => {
    const changed = elements.map((elt, idx) => {
      if (idx === index && element.type === 'section') {
        return element;
      }
      return elt;
    });
    onChange(changed);
  };

  const handleDrop = useCallback(
    (item: Editor.Element) => {
      onChange([...elements, item as Editor.SectionElement]);
    },
    [elements, onChange],
  );

  return (
    <Paper className={cn(className, classes[mode])}>
      {elements.map((element, index) => (
        <TemplatePreviewElement key={`${index}-${element.type}`} onChange={handleChange(index)} value={element} />
      ))}
      <DropZone accept="section" onDrop={handleDrop} />
    </Paper>
  );
};

export default TemplatePreview;
