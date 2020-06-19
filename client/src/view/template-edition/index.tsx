import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useTemplate, getTemplateContent } from '../../service/server';
import Drawer from './drawer';
import Preview from './preview';
import { ModeToggleValue } from './mode-toggle';
import { ViewToggleValue } from './view-toggle';

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
    paddingTop: theme.spacing(1),
    width: '20%',
  },
  container: {
    flex: 1,
    padding: theme.spacing(1),
  },
  textCenter: {
    textAlign: 'center',
  },
}));

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const [content, setContent] = useState<string>();
  const [mode, setMode] = useState<ModeToggleValue>('desktop');
  const [view, setView] = useState<ViewToggleValue>('preview');
  const { template_id } = useParams<{ template_id: string }>();
  const template = useTemplate(template_id);

  useEffect(() => {
    getTemplateContent(template_id).then(setContent);
  }, [template_id, setContent]);

  return (
    <div className={classes.root}>
      <Drawer onChangeMode={setMode} onChangeView={setView} mode={mode} template={template} view={view} />
      <main className={classes.container}>
        <Preview mode={mode} value={content} />
      </main>
    </div>
  );
};

export default TemplateEditionView;
