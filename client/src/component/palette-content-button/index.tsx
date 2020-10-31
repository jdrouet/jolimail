import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PaletteButton from 'src/component/palette-button';

export type PaletteContentButtonProps = {
  label: string;
  icon: React.FunctionComponent<{ className: string }>;
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

const PaletteContentButton: React.FC<PaletteContentButtonProps> = ({ icon: Icon, label }) => {
  const classes = useStyles();
  return (
    <PaletteButton className={classes.root} type="section" params={{}}>
      <Icon className={classes.icon} />
      <Typography>{label}</Typography>
    </PaletteButton>
  );
};

export default PaletteContentButton;
