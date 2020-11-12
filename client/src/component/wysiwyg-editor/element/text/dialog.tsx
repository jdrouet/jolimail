import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState } from 'react';

import AlignSelect from '../../form/align-select';
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
          <AlignSelect
            label="Align"
            name="align"
            onChange={handleChangeProperty}
            value={element.properties.align ?? 'left'}
          />
          <TextInput
            label="Color"
            name="color"
            onChange={handleChangeProperty}
            value={element.properties.color ?? '#000000'}
          />
          <TextInput
            label="Font Family"
            name="font-family"
            onChange={handleChangeProperty}
            value={element.properties['font-family'] ?? 'Ubuntu, Helvetica, Arial, sans-serif'}
          />
          <TextInput
            label="Font Size"
            name="font-size"
            onChange={handleChangeProperty}
            value={element.properties['font-size'] ?? '13px'}
          />
          <TextInput
            label="Font Style"
            name="font-style"
            onChange={handleChangeProperty}
            value={element.properties['font-style']}
          />
          <TextInput
            label="Font Weight"
            name="font-weight"
            onChange={handleChangeProperty}
            value={element.properties['font-weight']}
          />
          <TextInput
            label="Line Height"
            name="line-height"
            onChange={handleChangeProperty}
            value={element.properties['line-height']}
          />
          <TextInput
            label="Letter Spacing"
            name="letter-spacing"
            onChange={handleChangeProperty}
            value={element.properties['letter-spacing']}
          />
          <TextInput
            label="Height"
            name="height"
            onChange={handleChangeProperty}
            value={element.properties['height']}
          />
          <TextInput
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
