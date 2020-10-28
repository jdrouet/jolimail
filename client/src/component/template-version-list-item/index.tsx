import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import cn from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useState } from 'react';
import ConfirmClickable from 'src/component/confirm-clickable';
import { TemplateVersion } from 'src/service/server';

const useStyles = makeStyles((theme) => ({
  root: {},
  preview: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
  grow: {
    flex: 1,
  },
  firstRow: {
    display: 'flex',
  },
}));

export type TemplateVersionListItemProps = {
  className?: string;
  currentVersion?: boolean;
  onClick: (value: TemplateVersion) => void;
  onDelete: (value: TemplateVersion) => void;
  onDuplicate: (value: TemplateVersion) => void;
  onSetToDefault: (value: TemplateVersion) => void;
  version: TemplateVersion;
};

const TemplateVersionListItem: React.FC<TemplateVersionListItemProps> = ({
  className,
  currentVersion = false,
  onClick,
  onDelete,
  onDuplicate,
  onSetToDefault,
  version,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const menuOpen = Boolean(anchorEl);

  const handleOpen = (evt: React.MouseEvent<HTMLElement>) => setAnchorEl(evt.currentTarget);
  const handleClose = () => setAnchorEl(undefined);
  const handleSetToDefault = () => {
    handleClose();
    onSetToDefault(version);
  };
  const handleDuplicate = () => {
    handleClose();
    onDuplicate(version);
  };
  const handleDelete = () => {
    handleClose();
    onDelete(version);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        className={cn(classes.root, className)}
        data-template={version.templateId}
        data-template-version={version.id}
        onClick={() => onClick(version)}
      >
        <ListItemText
          primary={`${version.name}${currentVersion ? ' (Default)' : ''}`}
          secondary={`Updated ${formatDistanceToNow(new Date(version.updatedAt), { addSuffix: true })}`}
        />
        <ListItemSecondaryAction>
          <IconButton data-testid="options" onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        <MenuItem data-testid="to-default" onClick={handleSetToDefault} disabled={currentVersion}>
          Set to default
        </MenuItem>
        <MenuItem data-testid="duplicate" onClick={handleDuplicate}>
          Duplicate
        </MenuItem>
        <Divider />
        <ConfirmClickable
          onConfirmedClick={handleDelete}
          title="Delete this version"
          description="This will completely delete your version."
          acceptLabel="Delete"
        >
          <MenuItem data-testid="delete">Delete</MenuItem>
        </ConfirmClickable>
      </Menu>
    </React.Fragment>
  );
};

export default TemplateVersionListItem;
