import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

export type ToggleButtonGroupProps = {
  title?: string;
  onChange: (value: string) => any;
  options: {
    icon: any;
    label: string;
    value: string;
  }[];
  value: string;
};

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ options, onChange, title, value }) => {
  return (
    <div>
      <ButtonGroup color="primary">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Tooltip key={option.value} title={option.label}>
              <Button
                disabled={option.value === value}
                name={option.value}
                onClick={() => onChange(option.value)}
              >
                <Icon />
              </Button>
            </Tooltip>
          );
        })}
      </ButtonGroup>
      <Typography color="textSecondary" component="div" variant="caption">
        {title}
      </Typography>
    </div>
  );
};

export default ToggleButtonGroup;
