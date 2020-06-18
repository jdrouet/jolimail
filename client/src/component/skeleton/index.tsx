import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logoSrc from '../../image/logo.svg';

const useStyles = makeStyles(() => ({
  logo: {
    maxHeight: '1.5rem',
  },
  container: {
    paddingTop: 64,
  },
}));

export type SkeletonProps = {
  children: any;
};

const Skeleton: React.FC<SkeletonProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <img className={classes.logo} alt="Jolimail" src={logoSrc} />
        </Toolbar>
      </AppBar>
      <main className={classes.container}>
        {children}
      </main>
    </React.Fragment>
  );
};

export default Skeleton;
