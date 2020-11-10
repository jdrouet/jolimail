import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cn from 'classnames';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { Element } from '../preview-element';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  over: {
    backgroundColor: theme.palette.action.hover,
  },
  forbidden: {
    backgroundColor: theme.palette.error.light,
  },
}));

export type DropZoneProps = {
  accept: Element['type'] | Element['type'][];
  className?: string;
  label?: string;
  onDrop: (element: Element) => void;
};

const collect = (monitor: DropTargetMonitor) => ({
  isOver: !!monitor.isOver(),
  canDrop: !!monitor.canDrop(),
});

const DropZone: React.FC<DropZoneProps> = ({ accept, className, onDrop, label = 'Drop an element here' }) => {
  const classes = useStyles();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    collect,
    drop: onDrop,
  });
  console.log({ isOver, canDrop });
  return (
    <Paper
      className={cn(classes.root, className, {
        [classes.over]: isOver && canDrop,
        [classes.forbidden]: isOver && !canDrop,
      })}
      innerRef={drop}
      variant="outlined"
    >
      <Typography variant="caption">{label}</Typography>
    </Paper>
  );
};

export default DropZone;
