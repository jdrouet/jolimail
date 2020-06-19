import React from 'react';
import LaptopIcon from '@material-ui/icons/Laptop';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import ToggleButtonGroup from '../../component/toggle-button-group';

export type ModeToggleValue = 'mobile' | 'desktop';

export type ModeToggleProps = {
  onChange: (value: ModeToggleValue) => any;
  value: ModeToggleValue;
};

const options = [
  {
    icon: SmartphoneIcon,
    label: 'Mobile',
    value: 'mobile',
  },
  {
    icon: LaptopIcon,
    label: 'Desktop',
    value: 'desktop',
  },
];

const ModeToggle: React.FC<ModeToggleProps> = ({ onChange, value }) => {
  return <ToggleButtonGroup options={options} onChange={(item) => onChange(item as ModeToggleValue)} title="Mode" value={value} />;
};

export default ModeToggle;
