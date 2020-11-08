import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type TextElementProps = { className?: string; value: Editor.TextElement };

const TextElement: React.FC<TextElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      {value.children ?? 'Put your text here'}
    </Paper>
  );
};

export default TextElement;
