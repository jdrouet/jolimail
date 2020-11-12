import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useCallback, useState } from 'react';

import AlignSelect from '../../form/align-select';
import TextInput from '../../form/text-input';
import { ImageElement } from './service';

export type DialogEditionImageProps = {
  open: boolean;
  onSave: (value: ImageElement) => void;
  onCancel: () => void;
  value: ImageElement;
};

const DialogEditionImage: React.FC<DialogEditionImageProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<ImageElement>(value);

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
        <TextInput autoFocus label="Source" name="src" onChange={handleChangeProperty} value={element.properties.src} />
        <AlignSelect
          label="Align"
          name="align"
          onChange={handleChangeProperty}
          value={element.properties.align ?? 'center'}
        />
        <TextInput label="Alt" name="alt" onChange={handleChangeProperty} value={element.properties.alt} />
        <TextInput label="Border" name="border" onChange={handleChangeProperty} value={element.properties.border} />
        <TextInput
          label="Border radius"
          name="border-radius"
          onChange={handleChangeProperty}
          value={element.properties['border-radius'] ?? 'none'}
        />
        <TextInput
          label="Container background color"
          name="container-background-color"
          onChange={handleChangeProperty}
          value={element.properties['container-background-color']}
        />
        <TextInput
          label="CSS class"
          name="css-class"
          onChange={handleChangeProperty}
          value={element.properties['css-class']}
        />
        <TextInput label="Height" name="height" onChange={handleChangeProperty} value={element.properties['height']} />
        <TextInput label="Href" name="href" onChange={handleChangeProperty} value={element.properties['href']} />
        <TextInput
          label="Padding"
          name="padding"
          onChange={handleChangeProperty}
          value={element.properties['padding'] ?? '10px 25px'}
        />
        <TextInput
          label="Padding Top"
          name="padding-top"
          onChange={handleChangeProperty}
          value={element.properties['padding-top']}
        />
        <TextInput
          label="Padding Right"
          name="padding-right"
          onChange={handleChangeProperty}
          value={element.properties['padding-right']}
        />
        <TextInput
          label="Padding Bottom"
          name="padding-bottom"
          onChange={handleChangeProperty}
          value={element.properties['padding-bottom']}
        />
        <TextInput
          label="Padding Left"
          name="padding-left"
          onChange={handleChangeProperty}
          value={element.properties['padding-left']}
        />
        <TextInput label="Rel" name="rel" onChange={handleChangeProperty} value={element.properties['rel']} />
        <TextInput label="Title" name="title" onChange={handleChangeProperty} value={element.properties['title']} />
        <TextInput label="Width" name="width" onChange={handleChangeProperty} value={element.properties['width']} />
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
