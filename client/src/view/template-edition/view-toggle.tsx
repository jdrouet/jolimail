import React from 'react';
import CodeIcon from '@material-ui/icons/Code';
import PreviewIcon from '@material-ui/icons/SubjectOutlined';
import ToggleButtonGroup from '../../component/toggle-button-group';

export type ViewToggleValue = 'preview' | 'code';

export type ViewToggleProps = {
  onChange: (value: ViewToggleValue) => any;
  value: ViewToggleValue;
};

const options = [
  {
    icon: PreviewIcon,
    label: 'Preview',
    value: 'preview',
  },
  {
    icon: CodeIcon,
    label: 'Code',
    value: 'code',
  },
];

const ViewToggle: React.FC<ViewToggleProps> = ({ onChange, value }) => {
  return <ToggleButtonGroup options={options} onChange={(item) => onChange(item as ViewToggleValue)} title="View" value={value} />;
};

export default ViewToggle;
