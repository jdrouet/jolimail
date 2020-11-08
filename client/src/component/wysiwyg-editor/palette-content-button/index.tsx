import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import PaletteButton from '../palette-button';

export type PaletteContentButtonProps = {
  label: string;
  icon: React.FunctionComponent<{ className: string }>;
  type: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
    paddingTop: theme.spacing(2),
    textAlign: 'center',
  },
  icon: {
    height: '1.6em',
    width: '1.6em',
  },
}));

const PaletteContentButton: React.FC<PaletteContentButtonProps> = ({ icon: Icon, type, label }) => {
  const classes = useStyles();
  return (
    <PaletteButton className={classes.root} type={type} properties={{}}>
      <Icon className={classes.icon} />
      <Typography>{label}</Typography>
    </PaletteButton>
  );
};

export default PaletteContentButton;
