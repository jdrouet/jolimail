import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTemplate } from '../../service/server';
import ViewToggle, { ViewToggleValue } from './view-toggle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: 'calc(100vh - 68px)',
  },
  drawer: {
    backgroundColor: theme.palette.background.paper,
    borderRightColor: theme.palette.divider,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    minWidth: 200,
    width: '20%',
  },
  container: {
    flex: 1,
  },
  item: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const [tab, setTab] = useState<ViewToggleValue>('preview');
  const params = useParams<{ template_id: string }>();
  const template = useTemplate(params.template_id);
  return (
    <div className={classes.root}>
      <section className={classes.drawer}>
        <div className={classes.item}>
          <ViewToggle onChange={setTab} value={tab} />
        </div>
      </section>
      <main className={classes.container}></main>
    </div>
  );
};

export default TemplateEditionView;
