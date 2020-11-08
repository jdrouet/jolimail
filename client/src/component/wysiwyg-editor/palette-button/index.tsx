import Card from '@material-ui/core/Card';
import cn from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';

export type PaletteButtonProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  type: string;
  properties: any;
};

const PaletteButton: React.FC<PaletteButtonProps> = ({ className, children, type, properties }) => {
  const item = { type, properties };
  console.log(item);
  const [{ isDragging }, drag] = useDrag({
    item,
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
