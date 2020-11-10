import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export type VerticalAlign = 'top' | 'middle' | 'bottom';

export type VerticalAlignSelectProps = {
  label?: string;
  onChange: (value: VerticalAlign) => any;
  value?: VerticalAlign;
};

const VerticalAlignSelect: React.FC<VerticalAlignSelectProps> = ({ onChange, label, value }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as VerticalAlign);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="vertical-align-select-label">{label}</InputLabel>
      <Select labelId="vertical-align-select-label" id="vertical-align-select" onChange={handleChange} value={value}>
        <MenuItem value="top">Top</MenuItem>
        <MenuItem value="middle">Middle</MenuItem>
        <MenuItem value="bottom">Bottom</MenuItem>
      </Select>
    </FormControl>
  );
};

export default VerticalAlignSelect;
