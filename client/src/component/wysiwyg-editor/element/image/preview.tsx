import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useState } from 'react';

import EditionOverlay from '../../edition-overlay';
import DialogEditionImage from './dialog';
import { ImageElement } from './service';

export const DEFAULT_SRC = 'https://github.com/jdrouet/jolimail/raw/main/client/public/logo192.png';

export type PreviewImageElementProps = {
  className?: string;
  onChange: (element: ImageElement) => void;
  onDelete: (element: ImageElement) => void;
  value: ImageElement;
};

const useStyles = makeStyles(() => ({
  root: (props: ImageElement['properties']) => ({
    backgroundColor: props['container-background-color'],
    border: props.border ?? 'none',
    borderRadius: props['border-radius'],
    textAlign: props.align ?? 'center',
    padding: props.padding ?? '10px 25px',
    paddingTop: props['padding-top'],
    paddingRight: props['padding-right'],
    paddingBottom: props['padding-bottom'],
    paddingLeft: props['padding-left'],
  }),
  element: (props: ImageElement['properties']) => ({
    height: props.height,
    width: props.width,
  }),
}));

export const PreviewImageElement: React.FC<PreviewImageElementProps> = ({ className, onChange, onDelete, value }) => {
  const classes = useStyles(value['properties']);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = (element: ImageElement) => {
    setOpen(false);
    onChange(element);
  };

  return (
    <React.Fragment>
      <EditionOverlay
        className={cn(classes.root, className)}
        onDelete={onDelete}
        onEdit={() => setOpen(true)}
        value={value}
      >
        <img
          className={cn(classes.element, value.properties['css-class'])}
          alt={value.properties.alt}
          src={value.properties.src ?? DEFAULT_SRC}
          title={value.properties.title}
        />
      </EditionOverlay>
      <DialogEditionImage open={open} onCancel={() => setOpen(false)} onSave={handleSave} value={value} />
    </React.Fragment>
  );
};
