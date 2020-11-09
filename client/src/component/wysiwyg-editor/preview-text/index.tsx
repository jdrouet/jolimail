import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import { Align } from '../align-select';
import DialogEditionText from '../dialog-edition-text';
import EditionOverlay from '../edition-overlay';
import { TextDecoration } from '../text-decoration-select';
import { TextTransform } from '../text-transform-select';

export type TextElement = {
  type: 'text';
  properties: {
    'color'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    // TODO
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    'height'?: string;
    'text-decoration'?: TextDecoration;
    'text-transform'?: TextTransform;
    'align'?: Align;
    // TODO
    'container-background-color'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'css-class'?: string;
  };
  children?: string;
};

export type PreviewTextProps = {
  className?: string;
  onChange: (element: TextElement) => void;
  onDelete: (element: TextElement) => void;
  value: TextElement;
};

const useStyles = makeStyles(() => ({
  root: (props: TextElement['properties']) => ({
    backgroundColor: props['container-background-color'],
    padding: props.padding ?? '10px 25px',
    paddingTop: props['padding-top'],
    paddingRight: props['padding-right'],
    paddingBottom: props['padding-bottom'],
    paddingLeft: props['padding-left'],
  }),
  element: (props: TextElement['properties']) => ({
    color: props.color ?? '#000000',
    fontFamily: props['font-family'] ?? 'Ubuntu, Helvetica, Arial, sans-serif',
    fontSize: props['font-size'] ?? 13,
    // TODO
    // fontWeight: props['font-weight'],
    lineHeight: props['line-height'] ?? 1,
    letterSpacing: props['letter-spacing'],
    height: props.height,
    textDecoration: props['text-decoration'],
    textTransform: props['text-transform'],
    textAlign: props.align,
  }),
}));

const PreviewText: React.FC<PreviewTextProps> = ({ className, onChange, onDelete, value }) => {
  const classes = useStyles(value.properties);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = useCallback(
    (element: TextElement) => {
      onChange(element);
      setOpen(false);
    },
    [onChange, setOpen],
  );

  return (
    <React.Fragment>
      <EditionOverlay
        className={cn(classes.root, className)}
        onDelete={onDelete}
        onEdit={() => setOpen(true)}
        value={value}
      >
        <div className={cn(classes.element, value.properties['css-class'])}>
          {value.children ?? 'Put your text here'}
        </div>
      </EditionOverlay>
      <DialogEditionText open={open} onCancel={() => setOpen(false)} onSave={handleSave} value={value} />
    </React.Fragment>
  );
};

export default PreviewText;
