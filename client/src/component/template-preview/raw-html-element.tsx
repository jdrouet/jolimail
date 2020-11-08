import Paper from '@material-ui/core/Paper';
import React from 'react';
import * as Editor from 'src/service/editor';

export type RawHtmlElementProps = { className?: string; value: Editor.RawHtmlElement };

const RawHtmlElement: React.FC<RawHtmlElementProps> = ({ className, value }) => {
  return (
    <Paper className={className} variant="outlined">
      Raw HTML
    </Paper>
  );
};

export default RawHtmlElement;
