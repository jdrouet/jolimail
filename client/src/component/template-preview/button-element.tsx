import Button from '@material-ui/core/Button';
import React from 'react';
import * as Editor from 'src/service/editor';

export type ButtonElementProps = { className?: string; value: Editor.ButtonElement };

const ButtonElement: React.FC<ButtonElementProps> = ({ className, value }) => {
  return (
    <Button className={className} variant="outlined">
      Click me
    </Button>
  );
};

export default ButtonElement;
