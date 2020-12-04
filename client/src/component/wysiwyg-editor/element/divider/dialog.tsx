import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useCallback, useState } from 'react';

import AbstractInput from '../../form/abstract-input';
import { DividerElement } from './service';

export type DialogEditionDividerProps = {
  open: boolean;
  onSave: (value: DividerElement) => void;
  onCancel: () => void;
  value: DividerElement;
};

const DialogEditionDivider: React.FC<DialogEditionDividerProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<DividerElement>(value);

  const handleChangeProperty = useCallback(
    (property: string, name: string) => {
      setElement((item) => ({
        ...item,
        properties: {
          ...item.properties,
          [name]: property,
        },
      }));
    },
    [setElement],
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>Button edition</DialogTitle>
      <DialogContent>
        <AbstractInput
          label="Border Color"
          name="border-color"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['border-color']}
        />
        <AbstractInput
          label="Border Style"
          name="border-style"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['border-style']}
        />
        <AbstractInput
          label="Border Width"
          name="border-width"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['border-width']}
        />
        <AbstractInput
          label="Container background color"
          name="container-background-color"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['container-background-color']}
        />
        <AbstractInput
          label="CSS class"
          name="css-class"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['css-class']}
        />
        <AbstractInput
          label="Padding"
          name="padding"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['padding']}
        />
        <AbstractInput
          label="Padding Top"
          name="padding-top"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['padding-top']}
        />
        <AbstractInput
          label="Padding Right"
          name="padding-right"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['padding-right']}
        />
        <AbstractInput
          label="Padding Bottom"
          name="padding-bottom"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['padding-bottom']}
        />
        <AbstractInput
          label="Padding Left"
          name="padding-left"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties['padding-left']}
        />
        <AbstractInput
          label="Width"
          name="width"
          onChange={handleChangeProperty}
          type="text"
          value={element.properties.width}
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

export default DialogEditionDivider;
