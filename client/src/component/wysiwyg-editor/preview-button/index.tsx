import Button from '@material-ui/core/Button';
import React from 'react';

export type ButtonElement = {
  type: 'button';
  properties: {};
  children?: string;
};

export type PreviewButtonProps = { className?: string; value: ButtonElement };

const PreviewButton: React.FC<PreviewButtonProps> = ({ className, value }) => {
  return (
    <Button className={className} variant="outlined">
      {value.children ?? 'Click me'}
    </Button>
  );
};

export default PreviewButton;
