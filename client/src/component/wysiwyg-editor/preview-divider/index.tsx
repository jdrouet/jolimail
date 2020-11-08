import Paper from '@material-ui/core/Paper';
import React from 'react';

export type DividerElement = {
  type: 'divider';
  properties: {};
};

export type PreviewDividerProps = { className?: string; value: DividerElement };

const PreviewDivider: React.FC<PreviewDividerProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      <hr />
    </Paper>
  );
};

export default PreviewDivider;
