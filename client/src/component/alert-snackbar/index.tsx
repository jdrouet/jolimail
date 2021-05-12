import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useCallback, useEffect, useState } from 'react';

export type AlertSnackbarProps = {
  message?: string;
  origin?: SnackbarOrigin;
  severity: AlertProps['severity'];
};

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ message, origin, severity }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>();

  useEffect(() => {
    if (message) {
      setContent(message);
    }
    setOpen(Boolean(message));
  }, [message, setContent, setOpen]);

  const handleClose = useCallback((_event: any, reason?: string) => {
    if (reason === 'clickaway') return;
    return setOpen(false);
  }, []);

  return (
    <Snackbar anchorOrigin={origin} autoHideDuration={6000} onClose={handleClose} open={open}>
      <Alert elevation={6} onClose={handleClose} severity={severity} variant="filled">
        {content}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
