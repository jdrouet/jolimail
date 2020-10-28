import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export type ConfirmDialogProps = {
  open: boolean;
  onCancel: () => void;
  onAccept: () => void;
  cancelLabel?: string;
  acceptLabel?: string;
  title: string;
  description?: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onCancel,
  onAccept,
  cancelLabel = 'Cancel',
  acceptLabel = 'OK',
}) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle data-testid="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText data-testid="confirm-dialog-description">{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} data-testid="confirm-dialog-cancel" color="primary">
        {cancelLabel}
      </Button>
      <Button onClick={onAccept} data-testid="confirm-dialog-accept" color="primary" autoFocus>
        {acceptLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
