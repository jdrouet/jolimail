import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type SocialSharingElementProps = { className?: string; value: Editor.SocialSharingElement };

const SocialSharingElement: React.FC<SocialSharingElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Social sharing
    </Paper>
  );
};

export default SocialSharingElement;
