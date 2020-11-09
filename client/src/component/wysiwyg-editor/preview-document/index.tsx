import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback } from 'react';

import DropZone from '../drop-zone';
import { Mode } from '../mode-button-group';
import PreviewElement, { Element } from '../preview-element';
import { SectionElement } from '../preview-section';

export type TemplatePreviewProps = {
  className?: string;
  breakpoint?: number;
  mode?: Mode;
  onChange: (value: SectionElement[]) => void;
  elements: SectionElement[];
};

const useStyles = makeStyles(() => ({
  root: {
    transition: 'all ease-in .5s',
  },
  mobile: (breakpoint: number) => ({
    maxWidth: breakpoint,
    width: '100%',
    height: 640,
  }),
  desktop: {
    width: '90%',
    height: 800,
  },
}));

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  breakpoint = 480,
  className,
  mode = 'desktop',
  onChange,
  elements,
}) => {
  const classes = useStyles(breakpoint);

  const handleChange = (index: number) => (element: Element) => {
    const changed = elements.map((elt, idx) => {
      if (idx === index && element.type === 'section') {
        return element;
      }
      return elt;
    });
    onChange(changed);
  };

  const handleDrop = useCallback(
    (item: Element) => {
      onChange([...elements, item as SectionElement]);
    },
    [elements, onChange],
  );

  const handleDropChild = (index: number) => (_: Element) => {
    onChange(elements.filter((_, idx) => idx !== index));
  };

  return (
    <Paper className={cn(className, classes[mode])}>
      {elements.map((element, index) => (
        <PreviewElement
          key={`${index}-${element.type}`}
          mode={mode}
          onChange={handleChange(index)}
          onDelete={handleDropChild(index)}
          value={element}
        />
      ))}
      <DropZone accept="section" onDrop={handleDrop} />
    </Paper>
  );
};

export default TemplatePreview;
