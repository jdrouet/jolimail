import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import cn from 'classnames';
import React, { useCallback } from 'react';

export type EditionOverlayProps<T> = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  onDelete: (element: T) => void;
  onEdit: (element: T) => void;
  value: T;
};

const useStyles = makeStyles(() => ({
  root: {
    '&:hover > $overlay': {
      visibility: 'visible',
    },
    'position': 'relative',
    'minHeight': 40,
  },
  overlay: {
    visibility: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const EditionOverlay: React.FC<EditionOverlayProps<any>> = ({ className, children, onDelete, onEdit, value }) => {
  const classes = useStyles();

  const handleDelete = useCallback(() => {
    onDelete(value);
  }, [onDelete, value]);

  const handleEdit = useCallback(() => {
    onEdit(value);
  }, [onEdit, value]);

  return (
    <div className={cn(classes.root, className)}>
      {children}
      <div className={classes.overlay}>
        <IconButton onClick={handleEdit} size="small">
          <CreateIcon />
        </IconButton>
        <IconButton onClick={handleDelete} size="small">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default EditionOverlay;
