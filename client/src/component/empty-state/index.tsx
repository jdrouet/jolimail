import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import emptyListSrc from 'src/image/empty.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > img': {
      maxWidth: 300,
      margin: theme.spacing(3),
    },
    'textAlign': 'center',
  },
}));

type EmptyStateProps = {
  message: string;
  onClickCreate: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ message, onClickCreate }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt={message} src={emptyListSrc} />
      <Typography gutterBottom variant="h5">
        {message}
      </Typography>
      <Button color="primary" onClick={onClickCreate} variant="contained">
        Create
      </Button>
    </div>
  );
};

export default EmptyState;
