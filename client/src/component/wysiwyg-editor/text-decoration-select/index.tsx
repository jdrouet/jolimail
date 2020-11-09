import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export type TextDecoration = 'underline' | 'overline' | 'line-through' | 'none';

export type TextDecorationSelectProps = {
  label?: string;
  onChange: (value: TextDecoration) => any;
  value: TextDecoration;
};

const TextDecorationSelect: React.FC<TextDecorationSelectProps> = ({ onChange, label, value }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as TextDecoration);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="align-select-label">{label}</InputLabel>
      <Select labelId="align-select-label" id="align-select" onChange={handleChange} value={value}>
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="underline">Underline</MenuItem>
        <MenuItem value="overline">Overline</MenuItem>
        <MenuItem value="line-through">Line through</MenuItem>
      </Select>
    </FormControl>
  );
};

export default TextDecorationSelect;
