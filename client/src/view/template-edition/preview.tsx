import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useMRML } from '../../service/mrml';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    margin: '0 auto',
    transition: 'all ease-in-out .5s',
  },
  frame: {
    border: 'none',
    display: 'block',
    width: '100%',
  },
  desktop: {
    maxWidth: 800,
  },
  mobile: {
    maxWidth: 400,
  },
}));

export type PreviewProps = {
  className?: string;
  mode?: 'mobile' | 'desktop';
  value?: string;
};

const Preview: React.FC<PreviewProps> = ({ className, mode = 'desktop', value }) => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');
  const mrml = useMRML();
  useEffect(() => {
    if (!mrml || !value) return;
    try {
      const result = mrml.toEmail(value);
      setContent(result.html);
    } catch (err) {
      console.error(err);
    }
  }, [setContent, value, mrml]);
  return (
    <Paper className={cn(classes.root, className, classes[mode])}>
      <iframe className={classes.frame} srcDoc={content} title="preview" />
    </Paper>
  );
};

export default Preview;
