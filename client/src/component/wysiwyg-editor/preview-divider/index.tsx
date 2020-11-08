import Paper from '@material-ui/core/Paper';
import React from 'react';

export type DividerElement = {
  type: 'divider';
  properties: {
    'border-color'?: string;
    'border-style'?: string;
    'border-width'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'width'?: string;
  };
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
