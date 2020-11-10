import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
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
  onDelete: (element: ContentElement, index: number) => void;
  value?: ContentElement;
};

const TemplateSectionChild: React.FC<TemplateSectionChildProps> = ({ index, mode, onChange, onDelete, value }) => {
  const classes = useChildrenStyles();

  const handleDelete = useCallback(
    (element: Element) => {
      onDelete(element as ContentElement, index);
    },
    [index, onDelete],
  );

  const handleChange = useCallback(
    (element: Element) => {
      onChange(element as ContentElement, index);
    },
    [index, onChange],
  );

  if (!value) {
    return <DropZone className={classes[mode]} accept={CONTENT_TYPES} onDrop={handleChange} />;
  }
  return (
    <PreviewElement
      className={classes[mode]}
      mode={mode}
      onChange={handleChange}
      onDelete={handleDelete}
      value={value}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover > $panel': {
      visibility: 'visible',
    },
    'marginLeft': theme.spacing(-4),
    'paddingLeft': theme.spacing(4),
    'position': 'relative',
  },
  desktop: {
    display: 'flex',
    flexDirection: 'row',
  },
  mobile: {
    display: 'block',
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    visibility: 'hidden',
    paddingRight: theme.spacing(),
  },
}));

export type TemplateSectionProps = {
  className?: string;
  mode: Mode;
  onChange: (element: SectionElement) => void;
  onDelete: (element: SectionElement) => void;
  value: SectionElement;
};

const getChildren = (value: SectionElement) => value.children ?? times(value.properties.columns);

const TemplateSection: React.FC<TemplateSectionProps> = ({ className, mode, onChange, onDelete, value }) => {
  const classes = useStyles();

  const handleDelete = useCallback(() => {
    onDelete(value);
  }, [onDelete, value]);

  const handleDeleteChild = useCallback(
    (_: Element, index: number) => {
      onChange({
        ...value,
        children: getChildren(value).map((item, idx: number) => {
          if (idx === index) return undefined;
          return item;
        }),
      });
    },
    [onChange, value],
  );

  const handleChangeChild = useCallback(
    (element: Element, index) => {
      const children = getChildren(value).map((item, idx: number) => {
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
    <div className={cn(className, classes.root, classes[mode])}>
      <div className={classes.panel}>
        <IconButton onClick={handleDelete} size="small">
          <DeleteIcon />
        </IconButton>
      </div>
      {times(value.properties.columns).map((_, index) => (
        <TemplateSectionChild
          key={index}
          index={index}
          mode={mode}
          onChange={handleChangeChild}
          onDelete={handleDeleteChild}
          value={value.children && value.children[index]}
        />
      ))}
    </div>
  );
};

export default TemplateSection;
