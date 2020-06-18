import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export type FabButtonProps = {
  extended?: boolean;
  onClick: () => any;
};

const FabButton: React.FC<FabButtonProps> = ({ extended, onClick }) => {
  const classes = useStyles();

  const iconClassName = extended ? classes.extendedIcon : undefined;
  const text = extended ? 'Create a template' : undefined;
  const variant = extended ? 'extended' : 'round';

  return (
    <Fab className={classes.root} color="primary" onClick={onClick} size="medium" variant={variant}>
      <AddIcon className={iconClassName} />
      {text}
    </Fab>
  );
};

export default FabButton;
