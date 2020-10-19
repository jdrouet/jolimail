import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

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
  'data-action'?: string;
  'extended'?: boolean;
  'label': string;
  'onClick': () => any;
};

const FabButton: React.FC<FabButtonProps> = ({ extended, label, onClick, ...props }) => {
  const classes = useStyles();

  const iconClassName = extended ? classes.extendedIcon : undefined;
  const text = extended ? label : undefined;
  const variant = extended ? 'extended' : 'round';

  return (
    <Fab className={classes.root} color="primary" onClick={onClick} size="medium" variant={variant} {...props}>
      <AddIcon className={iconClassName} />
      {text}
    </Fab>
  );
};

export default FabButton;
