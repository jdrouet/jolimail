import Paper from '@material-ui/core/Paper';
import React from 'react';

export type ImageElement = {
  type: 'image';
  properties: {
    alt?: string;
    src?: string;
  };
};

export type PreviewImageProps = { className?: string; value: ImageElement };

const PreviewImage: React.FC<PreviewImageProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      <img alt={value.properties.alt} src={value.properties.src} />
    </Paper>
  );
};

export default PreviewImage;
