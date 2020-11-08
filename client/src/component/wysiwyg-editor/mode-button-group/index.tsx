import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';

export type Mode = 'desktop' | 'mobile';

export type ModeButtonGroupProps = {
  onChange: (value: Mode) => any;
  value: Mode;
};

const ModeButtonGroup: React.FC<ModeButtonGroupProps> = ({ onChange, value }) => (
  <ButtonGroup color="primary">
    <Button disabled={value === 'desktop'} name="desktop" onClick={() => onChange('desktop')}>
      Desktop
    </Button>
    <Button disabled={value === 'mobile'} name="mobile" onClick={() => onChange('mobile')}>
      Mobile
    </Button>
  </ButtonGroup>
);

export default ModeButtonGroup;
