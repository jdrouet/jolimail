import Paper from '@material-ui/core/Paper';
import React from 'react';

export type SocialSharingElement = {
  type: 'social-sharing';
  properties: {
    'align'?: 'left' | 'center' | 'right';
    'border-radius'?: string;
    'color'?: string;
    'css-class'?: string;
    'container-background-color'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'icon-height'?: string;
    'icon-size'?: string;
    'inner-padding'?: string;
    'line-height'?: string;
    'mode'?: 'horizontal' | 'vertical';
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'icon-padding'?: string;
    'text-padding'?: string;
    'text-decoration'?: string;
  };
};

export type PreviewSocialSharingProps = { className?: string; value: SocialSharingElement };

const PreviewSocialSharing: React.FC<PreviewSocialSharingProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Social sharing
    </Paper>
  );
};

export default PreviewSocialSharing;
