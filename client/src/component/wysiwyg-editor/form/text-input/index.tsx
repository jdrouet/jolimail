import TextField from '@material-ui/core/TextField';
import React, { useCallback } from 'react';

export type TextInputProps = {
  autoFocus?: boolean;
  label: string;
  multiline?: boolean;
  name: string;
  onChange: (value: string, name: string) => void;
  value?: string;
};

const TextInput: React.FC<TextInputProps> = ({ autoFocus, label, multiline, name, onChange, value = '' }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      onChange(event.target.value, name);
    },
    [name, onChange],
  );

  const testId = `${name}-input`;

  return (
    <TextField
      autoFocus={autoFocus}
      data-testId={testId}
      label={label}
      fullWidth
      margin="normal"
      multiline={multiline}
      name={name}
      onChange={handleChange}
      value={value}
    />
  );
};

export default TextInput;
