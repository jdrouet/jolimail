import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export type Align = 'left' | 'center' | 'right' | 'justify';

export type AlignSelectProps = {
  label?: string;
  onChange: (value: Align) => any;
  value: Align;
};

const AlignSelect: React.FC<AlignSelectProps> = ({ onChange, label, value }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as Align);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="align-select-label">{label}</InputLabel>
      <Select labelId="align-select-label" id="align-select" onChange={handleChange} value={value}>
        <MenuItem value="left">Left</MenuItem>
        <MenuItem value="center">Center</MenuItem>
        <MenuItem value="right">Right</MenuItem>
        <MenuItem value="justify">Justify</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AlignSelect;
