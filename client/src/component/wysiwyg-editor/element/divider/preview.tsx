import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useState } from 'react';

import EditionOverlay from '../../edition-overlay';
import DialogEditionButton from './dialog';
import { DividerElement } from './service';

export type PreviewDividerElementProps = {
  className?: string;
  onChange: (element: DividerElement) => void;
  onDelete: (element: DividerElement) => void;
  value: DividerElement;
};

const useStyles = makeStyles(() => ({
  root: (props: DividerElement['properties']) => ({
    backgroundColor: props['container-background-color'],
    padding: props.padding ?? '10px 25px',
    paddingTop: props['padding-top'],
    paddingRight: props['padding-right'],
    paddingBottom: props['padding-bottom'],
    paddingLeft: props['padding-left'],
  }),
  element: (props: DividerElement['properties']) => ({
    borderColor: props['border-color'] ?? '#000000',
    borderStyle: props['border-style'] ?? 'solid',
    borderWidth: props['border-width'] ?? '4px',
    width: props.width ?? '100%',
  }),
}));

export const PreviewDividerElement: React.FC<PreviewDividerElementProps> = ({
  className,
  onChange,
  onDelete,
  value,
}) => {
  const classes = useStyles(value.properties);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = (element: DividerElement) => {
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
        <hr className={classes.element} />
      </EditionOverlay>
      <DialogEditionButton open={open} onCancel={() => setOpen(false)} onSave={handleSave} value={value} />
    </React.Fragment>
  );
};
