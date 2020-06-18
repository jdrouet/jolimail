import React from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Template } from '../../service/server';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  preview: {
    height: 120,
    width: 120,
  },
  content: {
    flex: 1,
  },
}));

export type TemplateCardletProps = {
  className?: string;
  template: Template;
};

const TemplateCardlet: React.FC<TemplateCardletProps> = ({ className, template }) => {
  const classes = useStyles();
  return (
    <Card className={cn(classes.root, className)} data-template={template.id}>
      <CardMedia className={classes.preview} image="logo512.png" />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {template.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {template.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TemplateCardlet;
