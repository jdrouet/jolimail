import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type ImageElementProps = { className?: string; value: Editor.ImageElement };

const ImageElement: React.FC<ImageElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      <img src={value.properties.src} />
    </Paper>
  );
};

export default ImageElement;
