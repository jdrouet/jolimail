import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type SpacerElementProps = { className?: string; value: Editor.SpacerElement };

const SpacerElement: React.FC<SpacerElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Some space
    </Paper>
  );
};

export default SpacerElement;
