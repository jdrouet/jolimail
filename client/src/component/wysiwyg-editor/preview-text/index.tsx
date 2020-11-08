import Paper from '@material-ui/core/Paper';
import React from 'react';

export type TextElement = {
  type: 'text';
  properties: {};
  children?: string;
};

export type PreviewTextProps = { className?: string; value: TextElement };

const PreviewText: React.FC<PreviewTextProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      {value.children ?? 'Put your text here'}
    </Paper>
  );
};

export default PreviewText;
