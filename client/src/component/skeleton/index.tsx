import { CircularProgress } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import cn from 'classnames';
import React from 'react';
import logoSrc from 'src/image/logo.svg';

const useStyles = makeStyles((theme) => ({
  left: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  right: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    maxHeight: '1.5rem',
    marginRight: theme.spacing(2),
  },
  container: {
    paddingTop: 64,
  },
}));

export type SkeletonProps = {
  children: any;
  loading?: boolean;
  mainClassName?: string;
  rightElements?: JSX.Element | JSX.Element[];
};

const Skeleton: React.FC<SkeletonProps> = ({ children, loading, mainClassName, rightElements }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar key="header-bar" position="fixed">
        <Toolbar>
          <div className={classes.left}>
            <img className={classes.logo} alt="Jolimail" src={logoSrc} />
            {loading ? <CircularProgress color="secondary" size={24} thickness={6} /> : null}
          </div>
          <div className={classes.right}>{rightElements}</div>
        </Toolbar>
      </AppBar>
      <main className={cn(classes.container, mainClassName)}>{children}</main>
    </React.Fragment>
  );
};

export default Skeleton;
