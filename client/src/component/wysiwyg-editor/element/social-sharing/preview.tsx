import Paper from '@material-ui/core/Paper';
import React from 'react';

import { SocialSharingElement } from './service';

export type PreviewSocialSharingElementProps = { className?: string; value: SocialSharingElement };

export const PreviewSocialSharingElement: React.FC<PreviewSocialSharingElementProps> = ({ className }) => {
  return (
    <Paper className={className} variant="outlined">
      Social sharing
    </Paper>
  );
};
