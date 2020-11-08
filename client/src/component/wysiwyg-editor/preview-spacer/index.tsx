import Paper from '@material-ui/core/Paper';
import React from 'react';

export type SpacerElement = {
  type: 'spacer';
  properties: {
    'container-background-color'?: string;
    'css-class'?: string;
    'height'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'vertical-align'?: 'top' | 'middle' | 'bottom';
    'width'?: string;
  };
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
