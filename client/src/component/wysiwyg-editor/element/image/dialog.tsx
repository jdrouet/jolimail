import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';

import AbstractInput from '../../form/abstract-input';
import { ImageElement } from './service';

export type DialogEditionImageProps = {
  open: boolean;
  onSave: (value: ImageElement) => void;
  onCancel: () => void;
  value: ImageElement;
};

const useStyles = makeStyles(() => ({
  push: {
    flex: 1,
  },
}));

const DialogEditionImage: React.FC<DialogEditionImageProps> = ({ open, onCancel, onSave, value }) => {
  const classes = useStyles();
  const [element, setElement] = useState<ImageElement>(value);
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

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>Image edition</DialogTitle>
      <DialogContent>
        <AbstractInput
          type="text"
          label="Source"
          name="src"
          onChange={handleChangeProperty}
          value={element.properties.src}
        />
        <Collapse in={expanded}>
          <AbstractInput
            label="Align"
            name="align"
            onChange={handleChangeProperty}
            type="align"
            value={element.properties.align ?? 'center'}
          />
          <AbstractInput
            type="text"
            label="Alt"
            name="alt"
            onChange={handleChangeProperty}
            value={element.properties.alt}
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
            label="Border radius"
            name="border-radius"
            onChange={handleChangeProperty}
            value={element.properties['border-radius'] ?? 'none'}
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
            label="Title"
            name="title"
            onChange={handleChangeProperty}
            value={element.properties['title']}
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

export default DialogEditionImage;
