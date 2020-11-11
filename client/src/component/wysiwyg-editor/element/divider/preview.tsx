import Paper from '@material-ui/core/Paper';
import React from 'react';

import { DividerElement } from './service';

export type PreviewDividerElementProps = { className?: string; value: DividerElement };

export const PreviewDividerElement: React.FC<PreviewDividerElementProps> = ({ className }) => {
  return (
    <Paper className={className} variant="outlined">
      <hr />
    </Paper>
  );
};
