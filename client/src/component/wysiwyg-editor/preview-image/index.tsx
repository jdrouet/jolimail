import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useState } from 'react';

import { Align } from '../align-select';
import DialogEditionImage from '../dialog-edition-image';
import EditionOverlay from '../edition-overlay';

export const DEFAULT_SRC = 'https://github.com/jdrouet/jolimail/raw/main/client/public/logo192.png';

export type ImageElement = {
  type: 'image';
  properties: {
    'align'?: Align;
    'alt'?: string;
    'border'?: string;
    'border-radius'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'fluid-on-mobile'?: string;
    'height'?: string;
    'href'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'rel'?: string;
    'src'?: string;
    'srcset'?: string;
    'target'?: string;
    'title'?: string;
    'usemap'?: string;
    'width'?: string;
  };
};

export type PreviewImageProps = {
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

const PreviewImage: React.FC<PreviewImageProps> = ({ className, onChange, onDelete, value }) => {
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

export default PreviewImage;
