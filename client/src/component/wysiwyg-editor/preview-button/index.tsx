import Button from '@material-ui/core/Button';
import React from 'react';

export type ButtonElement = {
  type: 'button';
  properties: {
    'align'?: 'left' | 'center' | 'right';
    'background-color'?: string;
    'border'?: string;
    'border-bottom'?: string;
    'border-top'?: string;
    'border-right'?: string;
    'border-left'?: string;
    'color'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'height'?: string;
    'href'?: string;
    'inner-padding'?: string;
    'letter-spacing'?: string;
    'line-height'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'rel'?: string;
    'target'?: string;
    'text-align'?: string;
    'text-decoration'?: string;
    'vertical-align'?: 'top' | 'middle' | 'bottom';
    'width'?: string;
  };
  children?: string;
};

export type PreviewButtonProps = { className?: string; value: ButtonElement };

const PreviewButton: React.FC<PreviewButtonProps> = ({ className, value }) => {
  return (
    <Button className={className} variant="outlined">
      {value.children ?? 'Click me'}
    </Button>
  );
};

export default PreviewButton;
