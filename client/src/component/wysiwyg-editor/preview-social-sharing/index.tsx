import Paper from '@material-ui/core/Paper';
import React from 'react';

export type SocialSharingElement = {
  type: 'social-sharing';
  properties: {};
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
