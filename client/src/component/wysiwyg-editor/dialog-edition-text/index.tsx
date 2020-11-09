import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import AlignSelect from '../align-select';
import { TextElement } from '../preview-text';

export type DialogEditionTextProps = {
  open: boolean;
  onSave: (value: TextElement) => void;
  onCancel: () => void;
  value: TextElement;
};

const DialogEditionText: React.FC<DialogEditionTextProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<TextElement>(value);

  const handleChangeChildren = (event: React.ChangeEvent<HTMLInputElement>) => {
    const children = event.target.value;
    setElement((item) => ({
      ...item,
      children,
    }));
  };

  const handleChangeProperty = (key: keyof TextElement['properties']) => (property: string) => {
    setElement((item) => ({
      ...item,
      properties: {
        ...item.properties,
        [key]: property,
      },
    }));
  };

  const handleChangePropertyFromInput = (key: keyof TextElement['properties']) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const property = event.target.value;
    setElement((item) => ({
      ...item,
      properties: {
        ...item.properties,
        [key]: property,
      },
    }));
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel} scroll="paper">
      <DialogTitle>Text edition</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Content"
          fullWidth
          margin="normal"
          multiline
          name="children"
          onChange={handleChangeChildren}
          value={element.children ?? ''}
        />
        <AlignSelect
          label="Align"
          onChange={handleChangeProperty('align')}
          value={element.properties.align ?? 'left'}
        />
        <TextField
          label="Color"
          fullWidth
          margin="normal"
          name="color"
          onChange={handleChangePropertyFromInput('color')}
          value={element.properties.color ?? '#000000'}
        />
        <TextField
          label="Font Family"
          fullWidth
          margin="normal"
          name="font-family"
          onChange={handleChangePropertyFromInput('font-family')}
          value={element.properties['font-family'] ?? 'Ubuntu, Helvetica, Arial, sans-serif'}
        />
        <TextField
          label="Font Size"
          fullWidth
          margin="normal"
          name="font-size"
          onChange={handleChangePropertyFromInput('font-size')}
          value={element.properties['font-size'] ?? '13px'}
        />
        <TextField
          label="Font Style"
          fullWidth
          margin="normal"
          name="font-style"
          onChange={handleChangePropertyFromInput('font-style')}
          value={element.properties['font-style']}
        />
        <TextField
          label="Font Weight"
          fullWidth
          margin="normal"
          name="font-weight"
          onChange={handleChangePropertyFromInput('font-weight')}
          value={element.properties['font-weight']}
        />
        <TextField
          label="Line Height"
          fullWidth
          margin="normal"
          name="line-height"
          onChange={handleChangePropertyFromInput('line-height')}
          value={element.properties['line-height']}
        />
        <TextField
          label="Letter Spacing"
          fullWidth
          margin="normal"
          name="letter-spacing"
          onChange={handleChangePropertyFromInput('letter-spacing')}
          value={element.properties['letter-spacing']}
        />
        <TextField
          label="Height"
          fullWidth
          margin="normal"
          name="height"
          onChange={handleChangePropertyFromInput('height')}
          value={element.properties['height']}
        />
        <TextField
          label="Text Decoration"
          fullWidth
          margin="normal"
          name="text-decoration"
          onChange={handleChangePropertyFromInput('text-decoration')}
          value={element.properties['text-decoration']}
        />
      </DialogContent>
      <DialogActions>
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
