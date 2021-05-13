import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  progress: {
    margin: theme.spacing(5),
  },
}));

type LoadingStateProps = {};

const LoadingState: React.FC<LoadingStateProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress data-testid="loading" className={classes.progress} size="5em" />
    </div>
  );
};

export default LoadingState;
