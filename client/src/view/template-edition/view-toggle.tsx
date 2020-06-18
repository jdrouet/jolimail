import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export type ViewToggleValue = 'preview' | 'code';

export type ViewToggleProps = {
  onChange: (value: ViewToggleValue) => any;
  value: ViewToggleValue;
};

const ViewToggle: React.FC<ViewToggleProps> = ({ onChange, value }) => {
  return (
    <ButtonGroup color="primary">
      <Button disabled={'preview' === value} name="preview" onClick={(e) => onChange('preview')}>
        Preview
      </Button>
      <Button disabled={'code' === value} name="code" onClick={(e) => onChange('code')}>
        Code
      </Button>
    </ButtonGroup>
  );
};

export default ViewToggle;
