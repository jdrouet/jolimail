import { makeStyles } from '@material-ui/core/styles';
import cn from 'classnames';
import React, { useState } from 'react';

import { Align } from '../align-select';
import DialogEditionButton from '../dialog-edition-button';
import EditionOverlay from '../edition-overlay';
import { TextDecoration } from '../text-decoration-select';
import { TextTransform } from '../text-transform-select';
import { VerticalAlign } from '../vertical-align-select';

export type ButtonElement = {
  type: 'button';
  properties: {
    'align'?: Align;
    'background-color'?: string;
    'border'?: string;
    'border-radius'?: string;
    'border-bottom'?: string;
    'border-top'?: string;
    'border-right'?: string;
    'border-left'?: string;
    'color'?: string;
    'container-background-color'?: string;
    'css-class'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'height'?: string;
    'href'?: string;
    'inner-padding'?: string;
    'letter-spacing'?: string;
    'line-height'?: string;
    'padding'?: string;
    'padding-top'?: string;
    'padding-right'?: string;
    'padding-bottom'?: string;
    'padding-left'?: string;
    'rel'?: string;
    'target'?: string;
    'text-align'?: Align;
    'text-decoration'?: TextDecoration;
    'text-transform'?: TextTransform;
    'vertical-align'?: VerticalAlign;
    'width'?: string;
  };
  children?: string;
};

export type PreviewButtonProps = {
  className?: string;
  onChange: (element: ButtonElement) => void;
  onDelete: (element: ButtonElement) => void;
  value: ButtonElement;
};

const toHorizontal = (value?: VerticalAlign): Align | undefined => {
  if (!value) return undefined;
  if (value === 'top') return 'left';
  if (value === 'bottom') return 'right';
  return 'center';
};

const useStyles = makeStyles(() => ({
  root: (props: ButtonElement['properties']) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: props['container-background-color'],
    alignItems: toHorizontal(props['vertical-align'] ?? 'middle'),
    justifyContent: props.align ?? 'center',
    padding: props.padding ?? '10px 25px',
    paddingTop: props['padding-top'],
    paddingRight: props['padding-right'],
    paddingBottom: props['padding-bottom'],
    paddingLeft: props['padding-left'],
  }),
  element: (props: ButtonElement['properties']) => ({
    backgroundColor: props['background-color'] ?? '#414141',
    border: props.border ?? 'none',
    borderTop: props['border-top'],
    borderRight: props['border-right'],
    borderBottom: props['border-bottom'],
    borderLeft: props['border-left'],
    borderRadius: props['border-radius'] ?? '3px',
    color: props.color ?? '#ffffff',
    fontSize: props['font-size'] ?? '13px',
    fontStyle: props['font-style'],
    // TODO
    // fontWeight: props['font-weight'],
    height: props.height,
    letterSpacing: props['letter-spacing'],
    lineHeight: props['line-height'] ?? '120%',
    padding: props['inner-padding'] ?? '10px 25px',
    textAlign: props['text-align'],
    textDecoration: props['text-decoration'],
    // TODO
    // textTransform: props['text-transform'],
    width: props.width,
  }),
}));

const PreviewButton: React.FC<PreviewButtonProps> = ({ className, onChange, onDelete, value }) => {
  const classes = useStyles(value.properties);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = (element: ButtonElement) => {
    setOpen(false);
    onChange(element);
  };

  return (
    <React.Fragment>
      <EditionOverlay
        className={cn(classes.root, className)}
        onDelete={onDelete}
        onEdit={() => setOpen(true)}
        value={value}
      >
        <div className={classes.element}>{value.children ?? 'Click me'}</div>
      </EditionOverlay>
      <DialogEditionButton open={open} onCancel={() => setOpen(false)} onSave={handleSave} value={value} />
    </React.Fragment>
  );
};

export default PreviewButton;
