import React, { useCallback, useState } from 'react';
import ConfirmDialog from 'src/component/confirm-dialog';

export type ConfirmClickableProps = {
  children: JSX.Element;
  onConfirmedClick: () => void;
  title: string;
  description?: string;
  cancelLabel?: string;
  acceptLabel?: string;
};

const ConfirmClickable: React.FC<ConfirmClickableProps> = ({ children, onConfirmedClick, ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);
  const handleAccept = useCallback(() => {
    setOpen(false);
    onConfirmedClick();
  }, [setOpen, onConfirmedClick]);
  return (
    <React.Fragment>
      {React.cloneElement(children, { onClick: handleOpen })}
      <ConfirmDialog {...props} open={open} onCancel={handleClose} onAccept={handleAccept} />
    </React.Fragment>
  );
};

export default ConfirmClickable;
