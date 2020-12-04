import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState } from 'react';

import AbstractInput from '../../form/abstract-input';
import TextInput from '../../form/text-input';
import { TextElement } from './service';

export type DialogEditionTextProps = {
  open: boolean;
  onSave: (value: TextElement) => void;
  onCancel: () => void;
  value: TextElement;
};

const useStyles = makeStyles(() => ({
  push: {
    flex: 1,
  },
}));

const DialogEditionText: React.FC<DialogEditionTextProps> = ({ open, onCancel, onSave, value }) => {
  const classes = useStyles();
  const [element, setElement] = useState<TextElement>(value);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setExpanded(false);
    }
  }, [open, setExpanded]);

  const handleToggle = useCallback(() => setExpanded((value) => !value), [setExpanded]);

  const handleChangeChildren = (children: string) =>
    setElement((item) => ({
      ...item,
      children,
    }));

  const handleChangeProperty = useCallback(
    (property: string, name: string) =>
      setElement((item) => ({
        ...item,
        properties: {
          ...item.properties,
          [name]: property,
        },
      })),
    [setElement],
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel} scroll="paper">
      <DialogTitle>Text edition</DialogTitle>
      <DialogContent>
        <TextInput
          autoFocus
          label="Content"
          multiline
          name="children"
          onChange={handleChangeChildren}
          value={element.children}
        />
        <Collapse in={expanded}>
          <AbstractInput
            label="Align"
            name="align"
            type="align"
            onChange={handleChangeProperty}
            value={element.properties.align ?? 'left'}
          />
          <AbstractInput
            label="Color"
            name="color"
            type="text"
            onChange={handleChangeProperty}
            value={element.properties.color ?? '#000000'}
          />
          <AbstractInput
            label="Font Family"
            name="font-family"
            onChange={handleChangeProperty}
            type="text"
            value={element.properties['font-family'] ?? 'Ubuntu, Helvetica, Arial, sans-serif'}
          />
          <AbstractInput
            label="Font Size"
            name="font-size"
            onChange={handleChangeProperty}
            type="text"
            value={element.properties['font-size'] ?? '13px'}
          />
          <AbstractInput
            label="Font Style"
            name="font-style"
            onChange={handleChangeProperty}
            type="text"
            value={element.properties['font-style']}
          />
          <AbstractInput
            type="text"
            label="Font Weight"
            name="font-weight"
            onChange={handleChangeProperty}
            value={element.properties['font-weight']}
          />
          <AbstractInput
            type="text"
            label="Line Height"
            name="line-height"
            onChange={handleChangeProperty}
            value={element.properties['line-height']}
          />
          <AbstractInput
            type="text"
            label="Letter Spacing"
            name="letter-spacing"
            onChange={handleChangeProperty}
            value={element.properties['letter-spacing']}
          />
          <AbstractInput
            type="text"
            label="Height"
            name="height"
            onChange={handleChangeProperty}
            value={element.properties['height']}
          />
          <AbstractInput
            type="text-decoration"
            label="Text Decoration"
            name="text-decoration"
            onChange={handleChangeProperty}
            value={element.properties['text-decoration']}
          />
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggle}>{expanded ? 'Less options' : 'More options'}</Button>
        <div className={classes.push} />
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(element)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditionText;
