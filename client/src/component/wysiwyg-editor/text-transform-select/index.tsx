import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

export type TextTransformSelectProps = {
  label?: string;
  onChange: (value: TextTransform) => any;
  value: TextTransform;
};

const TextTransformSelect: React.FC<TextTransformSelectProps> = ({ onChange, label, value }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as TextTransform);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="align-select-label">{label}</InputLabel>
      <Select labelId="align-select-label" id="align-select" onChange={handleChange} value={value}>
        <MenuItem value="uppercase">Uppercase</MenuItem>
        <MenuItem value="lowercase">Lowercase</MenuItem>
        <MenuItem value="capitalize">Capitalize</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TextTransformSelect;
