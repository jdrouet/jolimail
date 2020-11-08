import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type ButtonElementProps = { className?: string; value: Editor.DividerElement };

const DividerElement: React.FC<ButtonElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      <hr />
    </Paper>
  );
};

export default DividerElement;
