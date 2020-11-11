import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback, useState } from 'react';

import EditionOverlay from '../../edition-overlay';
import DialogEditionText from './dialog';
import { TextElement } from './service';

export type PreviewTextElementProps = {
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

export const PreviewTextElement: React.FC<PreviewTextElementProps> = ({ className, onChange, onDelete, value }) => {
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
