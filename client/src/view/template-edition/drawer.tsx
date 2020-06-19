import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Template } from '../../service/server';
import ModeToggle, { ModeToggleValue } from './mode-toggle';
import ViewToggle, { ViewToggleValue } from './view-toggle';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRightColor: theme.palette.divider,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    minWidth: 200,
    padding: theme.spacing(1),
    width: '20%',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export type DrawerProps = {
  template?: Template;
  onChangeMode: (value: ModeToggleValue) => any;
  onChangeView: (value: ViewToggleValue) => any;
  mode: ModeToggleValue;
  view: ViewToggleValue;
};

const Drawer: React.FC<DrawerProps> = ({ onChangeMode, onChangeView, mode, template, view }) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12}>
          {template ? (
            <Typography align="center">{template.title}</Typography>
          ) : (
            <Skeleton height={24} variant="text" />
          )}
        </Grid>
        <Grid className={classes.textCenter} item xs={12} lg={6}>
          <ModeToggle onChange={onChangeMode} value={mode} />
        </Grid>
        <Grid className={classes.textCenter} item xs={12} lg={6}>
          <ViewToggle onChange={onChangeView} value={view} />
        </Grid>
      </Grid>
    </section>
  );
};

export default Drawer;
