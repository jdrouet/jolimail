import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useCallback } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
}));

export type ClickableProps<T> = {
  children: any;
  className?: string;
  onClick: (event: any, value?: T) => any;
  value?: T;
};

const Clickable: React.FC<ClickableProps<any>> = ({ children, className, onClick, value }) => {
  const classes = useStyles();
  const handleClick = useCallback((event) => onClick(event, value), [onClick, value]);
  return (
    <ButtonBase className={cn(classes.root, className)} component="div" onClick={handleClick}>
      {children}
    </ButtonBase>
  );
};

export default Clickable;
