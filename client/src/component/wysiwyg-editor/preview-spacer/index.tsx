import Paper from '@material-ui/core/Paper';
import React from 'react';

export type SpacerElement = {
  type: 'spacer';
  properties: {};
};

export type PreviewSpacerProps = { className?: string; value: SpacerElement };

const PreviewSpacer: React.FC<PreviewSpacerProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Some space
    </Paper>
  );
};

export default PreviewSpacer;
