import Snackbar from '@material-ui/core/Snackbar';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useCallback, useState } from 'react';

type AlertState = {
  message?: string;
  open: boolean;
  severity: AlertProps['severity'];
};

type HandleOpenAlert = (message: string, severity: AlertProps['severity']) => void;

export type AlertSnackbarProps = AlertState & { onClose: (event: any, reason?: string) => void };

export const useAlertState = function () {
  const [state, setState] = useState<AlertState>({
    open: false,
    severity: 'error',
  });

  const onClose = useCallback(() => setState((previous) => ({ ...previous, open: false })), [setState]);

  const onOpen: HandleOpenAlert = useCallback(
    (message: string, severity: AlertProps['severity']) =>
      setState({
        open: true,
        message,
        severity,
      }),
    [setState],
  );

  return { ...state, onClose, onOpen };
};

const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ message, onClose, open, severity }) => {
  const handleClose = (event: any, reason?: string) => {
    if (reason === 'clickaway') return;
    return onClose(event, reason);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert elevation={6} onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
