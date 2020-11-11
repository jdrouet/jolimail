import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import DevicesIcon from '@material-ui/icons/Devices';
import NotificationIcon from '@material-ui/icons/Notifications';
import SaveIcon from '@material-ui/icons/Save';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Skeleton from 'src/component/skeleton';
import { useValidator, validate as validateJsonSchema } from 'src/service/json-schema';
import { useMRML, validate as validateTemplate } from 'src/service/mrml';
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

const getNotificationTooltip = (templateValid: boolean | undefined, attributesValid: boolean | undefined) => {
  if (!templateValid && !attributesValid) return 'Template and attributes are invalid...';
  if (!templateValid) return 'Template invalid...';
  if (!attributesValid) return 'Attributes invalid...';
  return 'Everything looks fine';
};

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { templateId, versionId } = useParams<LocationParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [attributes, setAttributes] = useState<string>('');
  const validator = useValidator();
  const mrml = useMRML();

  const attributesValid = validateJsonSchema(validator, attributes);
  const templateValid = validateTemplate(mrml, content);

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

  const handleClickDnDEditor = useCallback(() => {
    history.push(`/templates/${templateId}/versions/${versionId}/wysiwyg`);
  }, [history, templateId, versionId]);

  return (
    <Skeleton
      backButtonVisible
      loading={loading}
      mainClassName={classes.root}
      rightElements={
        <React.Fragment>
          <Tooltip title="Try the drag and drop editor">
            <IconButton
              color="inherit"
              disabled={loading || !attributesValid || !templateValid}
              onClick={handleClickDnDEditor}
            >
              <DevicesIcon />
            </IconButton>
          </Tooltip>
          <Badge color="secondary" overlap="circle" invisible={attributesValid && templateValid} variant="dot">
            <Tooltip title={getNotificationTooltip(templateValid, attributesValid)}>
              <IconButton color="inherit" disabled={attributesValid && templateValid}>
                <NotificationIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Badge>
          <Tooltip title="Save template and attributes">
            <IconButton color="inherit" disabled={loading || !attributesValid || !templateValid} onClick={handleSave}>
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
          templateInvalid={!templateValid}
          attributesInvalid={!attributesValid}
          onChangeTemplate={setContent}
          onChangeAttributes={setAttributes}
        />
      </section>
      <section className={classes.grow}>
        <Preview value={content} />
      </section>
    </Skeleton>
  );
};

export default TemplateEditionView;
