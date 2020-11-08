import Paper from '@material-ui/core/Paper';
import React from 'react';

export type ImageElement = {
  type: 'image';
  properties: {
    'align'?: 'center' | 'right' | 'left';
    'alt'?: string;
    'border'?: string;
    'border-radius'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'fluid-on-mobile'?: string;
    'height'?: string;
    'href'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'padding-right'?: string;
    'rel'?: string;
    'src'?: string;
    'srcset'?: string;
    'target'?: string;
    'title'?: string;
    'usemap'?: string;
    'width'?: string;
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
