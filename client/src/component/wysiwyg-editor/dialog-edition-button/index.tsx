import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

import AlignSelect from '../align-select';
import { ButtonElement } from '../preview-button';
import TextDecorationSelect from '../text-decoration-select';
import TextTransformSelect from '../text-transform-select';
import VerticalAlignSelect from '../vertical-align-select';

export type DialogEditionButtonProps = {
  open: boolean;
  onSave: (value: ButtonElement) => void;
  onCancel: () => void;
  value: ButtonElement;
};

const DialogEditionButton: React.FC<DialogEditionButtonProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<ButtonElement>(value);

  const handleChangeProperty = (key: keyof ButtonElement['properties']) => (property: string) => {
    setElement((item) => ({
      ...item,
      properties: {
        ...item.properties,
        [key]: property,
      },
    }));
  };

  const handleChangePropertyFromInput = (key: keyof ButtonElement['properties']) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const property = event.target.value;
    handleChangeProperty(key)(property);
  };

  const handleChangeChildren = (event: React.ChangeEvent<HTMLInputElement>) => {
    const children = event.target.value;
    setElement((item) => ({
      ...item,
      children,
    }));
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>Button edition</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Label"
          fullWidth
          margin="normal"
          onChange={handleChangeChildren}
          value={element.children ?? ''}
        />
        <AlignSelect
          label="Align"
          onChange={handleChangeProperty('align')}
          value={element.properties.align ?? 'center'}
        />
        <TextField
          label="Background color"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('background-color')}
          value={element.properties['background-color'] ?? ''}
        />
        <TextField
          label="Border"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border')}
          value={element.properties.border ?? ''}
        />
        <TextField
          label="Border Top"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-top')}
          value={element.properties['border-top'] ?? ''}
        />
        <TextField
          label="Border Right"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-right')}
          value={element.properties['border-right'] ?? ''}
        />
        <TextField
          label="Border Bottom"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-bottom')}
          value={element.properties['border-bottom'] ?? ''}
        />
        <TextField
          label="Border Left"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-left')}
          value={element.properties['border-left'] ?? ''}
        />
        <TextField
          label="Border radius"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('border-radius')}
          value={element.properties['border-radius'] ?? 'none'}
        />
        <TextField
          label="Color"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('color')}
          value={element.properties['color'] ?? ''}
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
          label="Font Family"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('font-family')}
          value={element.properties['font-family'] ?? ''}
        />
        <TextField
          label="Font Size"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('font-size')}
          value={element.properties['font-size'] ?? ''}
        />
        <TextField
          label="Font Style"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('font-style')}
          value={element.properties['font-style'] ?? ''}
        />
        <TextField
          label="Font Weight"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('font-weight')}
          value={element.properties['font-weight'] ?? ''}
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
          label="Inner Padding"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('inner-padding')}
          value={element.properties['inner-padding']}
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
          label="Target"
          fullWidth
          margin="normal"
          onChange={handleChangePropertyFromInput('target')}
          value={element.properties['target'] ?? ''}
        />
        <AlignSelect
          label="Text Align"
          onChange={handleChangeProperty('text-align')}
          value={element.properties['text-align']}
        />
        <TextDecorationSelect
          label="Text Decoration"
          onChange={handleChangeProperty('text-decoration')}
          value={element.properties['text-decoration']}
        />
        <TextTransformSelect
          label="Text Transform"
          onChange={handleChangeProperty('text-transform')}
          value={element.properties['text-transform']}
        />
        <VerticalAlignSelect
          label="Vertical Align"
          onChange={handleChangeProperty('vertical-align')}
          value={element.properties['vertical-align']}
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

export default DialogEditionButton;
