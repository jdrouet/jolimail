import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useCallback, useState } from 'react';

import AlignSelect from '../../form/align-select';
import TextDecorationSelect from '../../form/text-decoration-select';
import TextInput from '../../form/text-input';
import TextTransformSelect from '../../form/text-transform-select';
import VerticalAlignSelect from '../../form/vertical-align-select';
import { ButtonElement } from './service';

export type DialogEditionButtonProps = {
  open: boolean;
  onSave: (value: ButtonElement) => void;
  onCancel: () => void;
  value: ButtonElement;
};

const DialogEditionButton: React.FC<DialogEditionButtonProps> = ({ open, onCancel, onSave, value }) => {
  const [element, setElement] = useState<ButtonElement>(value);

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
        <AlignSelect
          label="Align"
          name="align"
          onChange={handleChangeProperty}
          value={element.properties.align ?? 'center'}
        />
        <TextInput
          label="Background color"
          name="background-color"
          onChange={handleChangeProperty}
          value={element.properties['background-color']}
        />
        <TextInput label="Border" name="border" onChange={handleChangeProperty} value={element.properties.border} />
        <TextInput
          label="Border Top"
          name="border-top"
          onChange={handleChangeProperty}
          value={element.properties['border-top']}
        />
        <TextInput
          label="Border Right"
          name="border-right"
          onChange={handleChangeProperty}
          value={element.properties['border-right']}
        />
        <TextInput
          label="Border Bottom"
          name="border-bottom"
          onChange={handleChangeProperty}
          value={element.properties['border-bottom']}
        />
        <TextInput
          label="Border Left"
          name="border-left"
          onChange={handleChangeProperty}
          value={element.properties['border-left']}
        />
        <TextInput
          label="Border radius"
          name="border-radius"
          onChange={handleChangeProperty}
          value={element.properties['border-radius'] ?? 'none'}
        />
        <TextInput label="Color" name="color" onChange={handleChangeProperty} value={element.properties['color']} />
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
        <TextInput
          label="Font Family"
          name="font-family"
          onChange={handleChangeProperty}
          value={element.properties['font-family']}
        />
        <TextInput
          label="Font Size"
          name="font-size"
          onChange={handleChangeProperty}
          value={element.properties['font-size']}
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
        <TextInput label="Height" name="height" onChange={handleChangeProperty} value={element.properties['height']} />
        <TextInput label="Href" name="href" onChange={handleChangeProperty} value={element.properties['href']} />
        <TextInput
          label="Inner Padding"
          name="inner-padding"
          onChange={handleChangeProperty}
          value={element.properties['inner-padding']}
        />
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
        <TextInput label="Target" name="target" onChange={handleChangeProperty} value={element.properties['target']} />
        <AlignSelect
          label="Text Align"
          name="text-align"
          onChange={handleChangeProperty}
          value={element.properties['text-align']}
        />
        <TextDecorationSelect
          label="Text Decoration"
          name="text-decoration"
          onChange={handleChangeProperty}
          value={element.properties['text-decoration']}
        />
        <TextTransformSelect
          label="Text Transform"
          name="text-transform"
          onChange={handleChangeProperty}
          value={element.properties['text-transform']}
        />
        <VerticalAlignSelect
          label="Vertical Align"
          name="vertical-align"
          onChange={handleChangeProperty}
          value={element.properties['vertical-align']}
        />
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

export default DialogEditionButton;
