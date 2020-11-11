import Paper from '@material-ui/core/Paper';
import React from 'react';

import { RawHtmlElement } from './service';

export type PreviewRawHtmlElementProps = { className?: string; value: RawHtmlElement };

export const PreviewRawHtmlElement: React.FC<PreviewRawHtmlElementProps> = ({ className }) => {
  return (
    <Paper className={className} variant="outlined">
      Raw HTML
    </Paper>
  );
};
