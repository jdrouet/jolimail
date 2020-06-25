import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import React, { useCallback, useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useParams } from 'react-router-dom';
import Skeleton from 'src/component/skeleton';
import { getTemplateVersionContent, updateTemplateVersion } from 'src/service/server';

import Preview from './preview';

type LocationParams = {
  templateId: string;
  versionId: string;
};
export const getRoute = (params: LocationParams) => `/templates/${params.templateId}/versions/${params.versionId}`;
export const ROUTE = getRoute({ templateId: ':templateId', versionId: ':versionId' });

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  editor: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
}));

const editorOptions = {
  renderIndentGuides: true,
};

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const { templateId, versionId } = useParams<LocationParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTemplateVersionContent(templateId, versionId)
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [setContent, templateId, versionId]);

  const handleSave = useCallback(() => {
    setLoading(true);
    updateTemplateVersion(templateId, versionId, content)
      .then((version) => setContent(version.content))
      .finally(() => setLoading(false));
  }, [content, setContent, templateId, versionId]);

  return (
    <Skeleton
      loading={loading}
      mainClassName={classes.root}
      rightElements={
        <React.Fragment>
          <IconButton color="inherit" disabled={loading} onClick={handleSave}>
            <SaveIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      <section className={classes.editor}>
        <MonacoEditor options={editorOptions} onChange={setContent} value={content} language="html" theme="vs-dark" />
      </section>
      <section className={classes.preview}>
        <Preview value={content} />
      </section>
    </Skeleton>
  );
};

export default TemplateEditionView;
