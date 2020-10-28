import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import logoSrc from 'src/image/logo.svg';

const useStyles = makeStyles((theme) => ({
  left: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  right: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  backButton: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(),
  },
  logo: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-1),
  },
  logoImg: {
    margin: theme.spacing(),
    maxHeight: '1.5rem',
  },
  container: {
    paddingTop: 64,
  },
}));

export type SkeletonProps = {
  children: any;
  backButtonVisible?: boolean;
  loading?: boolean;
  mainClassName?: string;
  rightElements?: JSX.Element | JSX.Element[];
};

const Skeleton: React.FC<SkeletonProps> = ({ backButtonVisible, children, loading, mainClassName, rightElements }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClickBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleClickHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <React.Fragment>
      <AppBar key="header-bar" position="fixed">
        <Toolbar>
          <div className={classes.left}>
            {backButtonVisible ? (
              <IconButton className={classes.backButton} color="inherit" name="navigate-back" onClick={handleClickBack}>
                <ArrowBackIcon />
              </IconButton>
            ) : null}
            <ButtonBase className={classes.logo} name="navigate-home" onClick={handleClickHome}>
              <img className={classes.logoImg} alt="Jolimail" src={logoSrc} />
            </ButtonBase>
            {loading ? <CircularProgress color="secondary" data-testid="loading" size={24} thickness={6} /> : null}
          </div>
          <div className={classes.right}>{rightElements}</div>
        </Toolbar>
      </AppBar>
      <main className={cn(classes.container, mainClassName)}>{children}</main>
    </React.Fragment>
  );
};

export default Skeleton;
