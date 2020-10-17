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
          <IconButton onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        <MenuItem data-action="set-to-default" onClick={handleSetToDefault} disabled={currentVersion}>
          Set to default
        </MenuItem>
        <MenuItem data-action="duplicate" onClick={handleDuplicate}>
          Duplicate
        </MenuItem>
        <Divider />
        <MenuItem data-action="delete" onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default TemplateVersionListItem;
