import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cn from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';
import { Template } from 'src/service/server';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
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

export type TemplateCardletProps = {
  className?: string;
  template: Template;
};

const TemplateCardlet: React.FC<TemplateCardletProps> = ({ className, template }) => {
  const classes = useStyles();
  return (
    <Card className={cn(classes.root, className)} data-template={template.id}>
      <CardMedia className={classes.preview} image="logo512.png" />
      <CardContent className={classes.grow}>
        <div className={classes.firstRow}>
          <Typography className={classes.grow} gutterBottom variant="h5" component="h2">
            {template.title}
          </Typography>
          <Typography variant="caption" component="span" color="textSecondary">
            Created {formatDistanceToNow(new Date(template.createdAt), { addSuffix: true })}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" component="p">
          {template.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TemplateCardlet;
