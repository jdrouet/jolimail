import Paper from '@material-ui/core/Paper';
import React from 'react';

import { SpacerElement } from './service';

export type PreviewSpacerElementProps = { className?: string; value: SpacerElement };

export const PreviewSpacerElement: React.FC<PreviewSpacerElementProps> = ({ className }) => {
  return (
    <Paper className={className} variant="outlined">
      Some space
    </Paper>
  );
};
