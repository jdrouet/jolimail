import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SaveIcon from '@material-ui/icons/Save';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertSnackbar from 'src/component/alert-snackbar';
import Skeleton from 'src/component/skeleton';
import { useValidation as useJsonSchemaValidation } from 'src/service/json-schema';
import { useValidation as useMrmlValidation } from 'src/service/mrml';
import { getTemplateVersion, updateTemplateVersion } from 'src/service/server';

import Editor from './editor';
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
    paddingBottom: 24,
  },
  grow: {
    flex: 1,
  },
  editor: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const { templateId, versionId } = useParams<LocationParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [attributes, setAttributes] = useState<string>('');

  const attributesError = useJsonSchemaValidation(attributes);
  const templateError = useMrmlValidation(content);

  useEffect(() => {
    setLoading(true);
    getTemplateVersion(templateId, versionId)
      .then((version) => {
        setContent(version.content || '');
        setAttributes(JSON.stringify(version.attributes || {}, null, 2));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [setAttributes, setContent, templateId, versionId]);

  const handleSave = useCallback(() => {
    setLoading(true);
    updateTemplateVersion(templateId, versionId, { content, attributes: JSON.parse(attributes) as object })
      .then((version) => {
        setContent(version.content || '');
        setAttributes(JSON.stringify(version.attributes || {}, null, 2));
      })
      // TODO handle validation errors server side
      .finally(() => setLoading(false));
  }, [attributes, content, setAttributes, setContent, templateId, versionId]);

  return (
    <Skeleton
      backButtonVisible
      loading={loading}
      mainClassName={classes.root}
      rightElements={
        <React.Fragment>
          <Tooltip title="Save template and attributes">
            <IconButton color="inherit" disabled={loading} onClick={handleSave}>
              <SaveIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      }
    >
      <section className={cn(classes.grow, classes.editor)}>
        <Editor
          template={content}
          attributes={attributes}
          attributesInvalid={Boolean(attributesError)}
          templateInvalid={Boolean(templateError)}
          onChangeTemplate={setContent}
          onChangeAttributes={setAttributes}
        />
      </section>
      <section className={classes.grow}>
        <Preview value={content} />
      </section>
      <AlertSnackbar message={attributesError} severity="error" />
      <AlertSnackbar message={templateError} severity="error" />
    </Skeleton>
  );
};

export default TemplateEditionView;
