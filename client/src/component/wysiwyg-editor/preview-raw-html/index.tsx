import Paper from '@material-ui/core/Paper';
import React from 'react';

export type RawHtmlElement = {
  type: 'raw-html';
};

export type PreviewRawHtmlProps = { className?: string; value: RawHtmlElement };

const PreviewRawHtml: React.FC<PreviewRawHtmlProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Raw HTML
    </Paper>
  );
};

export default PreviewRawHtml;
