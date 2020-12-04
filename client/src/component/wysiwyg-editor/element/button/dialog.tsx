import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';

import AbstractInput from '../../form/abstract-input';
import TextInput from '../../form/text-input';
import { ButtonElement } from './service';

export type DialogEditionButtonProps = {
  open: boolean;
  onSave: (value: ButtonElement) => void;
  onCancel: () => void;
  value: ButtonElement;
};

const useStyles = makeStyles(() => ({
  push: {
    flex: 1,
  },
}));

const DialogEditionButton: React.FC<DialogEditionButtonProps> = ({ open, onCancel, onSave, value }) => {
  const classes = useStyles();
  const [element, setElement] = useState<ButtonElement>(value);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggle = useCallback(() => setExpanded((value) => !value), [setExpanded]);

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

  const handleChangeChildren = (children: string) =>
    setElement((item) => ({
      ...item,
      children,
    }));

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>Button edition</DialogTitle>
      <DialogContent>
        <TextInput autoFocus label="Label" name="label" onChange={handleChangeChildren} value={element.children} />
        <Collapse in={expanded}>
          <AbstractInput
            label="Align"
            name="align"
            onChange={handleChangeProperty}
            type="align"
            value={element.properties.align ?? 'center'}
          />
          <AbstractInput
            label="Background color"
            name="background-color"
            onChange={handleChangeProperty}
            type="text"
            value={element.properties['background-color']}
          />
          <AbstractInput
            type="text"
            label="Border"
            name="border"
            onChange={handleChangeProperty}
            value={element.properties.border}
          />
          <AbstractInput
            type="text"
            label="Border Top"
            name="border-top"
            onChange={handleChangeProperty}
            value={element.properties['border-top']}
          />
          <AbstractInput
            type="text"
            label="Border Right"
            name="border-right"
            onChange={handleChangeProperty}
            value={element.properties['border-right']}
          />
          <AbstractInput
            type="text"
            label="Border Bottom"
            name="border-bottom"
            onChange={handleChangeProperty}
            value={element.properties['border-bottom']}
          />
          <AbstractInput
            type="text"
            label="Border Left"
            name="border-left"
            onChange={handleChangeProperty}
            value={element.properties['border-left']}
          />
          <AbstractInput
            type="text"
            label="Border radius"
            name="border-radius"
            onChange={handleChangeProperty}
            value={element.properties['border-radius'] ?? 'none'}
          />
          <AbstractInput
            type="text"
            label="Color"
            name="color"
            onChange={handleChangeProperty}
            value={element.properties['color']}
          />
          <AbstractInput
            type="text"
            label="Container background color"
            name="container-background-color"
            onChange={handleChangeProperty}
            value={element.properties['container-background-color']}
          />
          <AbstractInput
            type="text"
            label="CSS class"
            name="css-class"
            onChange={handleChangeProperty}
            value={element.properties['css-class']}
          />
          <AbstractInput
            type="text"
            label="Font Family"
            name="font-family"
            onChange={handleChangeProperty}
            value={element.properties['font-family']}
          />
          <AbstractInput
            type="text"
            label="Font Size"
            name="font-size"
            onChange={handleChangeProperty}
            value={element.properties['font-size']}
          />
          <AbstractInput
            type="text"
            label="Font Style"
            name="font-style"
            onChange={handleChangeProperty}
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
            label="Height"
            name="height"
            onChange={handleChangeProperty}
            value={element.properties['height']}
          />
          <AbstractInput
            type="text"
            label="Href"
            name="href"
            onChange={handleChangeProperty}
            value={element.properties['href']}
          />
          <AbstractInput
            type="text"
            label="Inner Padding"
            name="inner-padding"
            onChange={handleChangeProperty}
            value={element.properties['inner-padding']}
          />
          <AbstractInput
            type="text"
            label="Padding"
            name="padding"
            onChange={handleChangeProperty}
            value={element.properties['padding'] ?? '10px 25px'}
          />
          <AbstractInput
            type="text"
            label="Padding Top"
            name="padding-top"
            onChange={handleChangeProperty}
            value={element.properties['padding-top']}
          />
          <AbstractInput
            type="text"
            label="Padding Right"
            name="padding-right"
            onChange={handleChangeProperty}
            value={element.properties['padding-right']}
          />
          <AbstractInput
            type="text"
            label="Padding Bottom"
            name="padding-bottom"
            onChange={handleChangeProperty}
            value={element.properties['padding-bottom']}
          />
          <AbstractInput
            type="text"
            label="Padding Left"
            name="padding-left"
            onChange={handleChangeProperty}
            value={element.properties['padding-left']}
          />
          <AbstractInput
            type="text"
            label="Rel"
            name="rel"
            onChange={handleChangeProperty}
            value={element.properties['rel']}
          />
          <AbstractInput
            type="text"
            label="Target"
            name="target"
            onChange={handleChangeProperty}
            value={element.properties['target']}
          />
          <AbstractInput
            label="Text Align"
            name="text-align"
            type="align"
            onChange={handleChangeProperty}
            value={element.properties['text-align']}
          />
          <AbstractInput
            label="Text Decoration"
            name="text-decoration"
            onChange={handleChangeProperty}
            type="text-decoration"
            value={element.properties['text-decoration']}
          />
          <AbstractInput
            label="Text Transform"
            name="text-transform"
            type="text-transform"
            onChange={handleChangeProperty}
            value={element.properties['text-transform']}
          />
          <AbstractInput
            label="Vertical Align"
            name="vertical-align"
            type="vertical-align"
            onChange={handleChangeProperty}
            value={element.properties['vertical-align']}
          />
          <AbstractInput
            type="text"
            label="Width"
            name="width"
            onChange={handleChangeProperty}
            value={element.properties['width']}
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

export default DialogEditionButton;
