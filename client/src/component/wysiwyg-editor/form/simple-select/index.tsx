import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

export type SimpleSelectOption<T extends string> = { label: string; value: T };

export type SimpleSelectParentProps<T extends string> = {
  label?: string;
  name: string;
  onChange: (value: T, name: string) => any;
  value?: T;
};

export type SimpleSelectProps<T extends string> = SimpleSelectParentProps<T> & {
  options: SimpleSelectOption<T>[];
};

const SimpleSelect = function <T extends string>({ label, name, onChange, options, value }: SimpleSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as T, name);
  };

  const labelId = `${name}-label`;
  const testId = `${name}-select`;

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select data-testid={testId} labelId={labelId} name={name} onChange={handleChange} value={value}>
        {options.map((option) => (
          <MenuItem data-testid={`${option.value}-option`} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
