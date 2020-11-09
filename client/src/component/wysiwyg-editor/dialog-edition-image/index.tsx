import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import AlignSelect from '../align-select';
import { ImageElement } from '../preview-image';

export type DialogEditionImageProps = {
  open: boolean;
  onSave: (value: ImageElement) => void;
  onCancel: () => void;
  value: ImageElement;
};

const DialogEditionImage: React.FC<DialogEditionImageProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<ImageElement>(value);

  const handleChangeProperty = (key: keyof ImageElement['properties']) => (property: string) => {
    setElement((item) => ({
      ...item,
      properties: {
        ...item.properties,
        [key]: property,
      },
    }));
  };

  const handleChangePropertyFromInput = (key: keyof ImageElement['properties']) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const property = event.target.value;
    handleChangeProperty(key)(property);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>Image edition</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Source"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('src')}
          value={element.properties.src ?? ''}
        />
        <AlignSelect
          label="Align"
          onChange={handleChangeProperty('align')}
          value={element.properties.align ?? 'center'}
        />
        <TextField
          label="Alt"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('alt')}
          value={element.properties.alt ?? ''}
        />
        <TextField
          label="Border"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border')}
          value={element.properties.border ?? ''}
        />
        <TextField
          label="Border radius"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-radius')}
          value={element.properties['border-radius'] ?? 'none'}
        />
        <TextField
          label="Container background color"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('container-background-color')}
          value={element.properties['container-background-color'] ?? ''}
        />
        <TextField
          label="CSS class"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('css-class')}
          value={element.properties['css-class'] ?? ''}
        />
        <TextField
          label="Height"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('height')}
          value={element.properties['height'] ?? ''}
        />
        <TextField
          label="Href"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('href')}
          value={element.properties['href'] ?? ''}
        />
        <TextField
          label="Padding"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('padding')}
          value={element.properties['padding'] ?? '10px 25px'}
        />
        <TextField
          label="Padding Top"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('padding-top')}
          value={element.properties['padding-top'] ?? ''}
        />
        <TextField
          label="Padding Right"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('padding-right')}
          value={element.properties['padding-right'] ?? ''}
        />
        <TextField
          label="Padding Bottom"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('padding-bottom')}
          value={element.properties['padding-bottom'] ?? ''}
        />
        <TextField
          label="Padding Left"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('padding-left')}
          value={element.properties['padding-left'] ?? ''}
        />
        <TextField
          label="Rel"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('rel')}
          value={element.properties['rel'] ?? ''}
        />
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('title')}
          value={element.properties['title'] ?? ''}
        />
        <TextField
          label="Width"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('width')}
          value={element.properties['width'] ?? ''}
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

export default DialogEditionImage;
