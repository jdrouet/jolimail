import Card from '@material-ui/core/Card';
import cn from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';

export type PaletteButtonProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  type: string;
  params: any;
};

const PaletteButton: React.FC<PaletteButtonProps> = ({ className, children, type, params }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type, params },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Card innerRef={drag} className={cn(className)} style={{ opacity }} variant="outlined">
      {children}
    </Card>
  );
};

export default PaletteButton;
