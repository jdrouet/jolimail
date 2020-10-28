import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CreateButton from 'src/component/button-fab';
import ConfirmClickable from 'src/component/confirm-clickable';
import Skeleton from 'src/component/skeleton';
import TemplateCardlet from 'src/component/template-cardlet';
import TemplateUsageCardlet from 'src/component/template-usage-cardlet';
import TemplateVersionListItem from 'src/component/template-version-list-item';
import emptyListSrc from 'src/image/empty.svg';
import {
  TemplateVersion,
  deleteTemplate,
  deleteTemplateVersion,
  updateTemplate,
  useTemplate,
  useTemplateVersionList,
} from 'src/service/server';
import { getRoute as getTemplateVersionCreatePath } from 'src/view/template-version-create';
import { getRoute as getTemplateVersionEditionPath } from 'src/view/template-version-edition';

type LocationParams = {
  templateId: string;
};

export const getRoute = (params: LocationParams) => `/templates/${params.templateId}`;

export const ROUTE = getRoute({ templateId: ':templateId' });

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing(),
  },
  preview: {
    flex: 1,
  },
  empty: {
    '& > img': {
      maxWidth: 200,
      margin: theme.spacing(3),
    },
    'textAlign': 'center',
  },
}));

const TemplateEditionView: React.FC<any> = () => {
  const classes = useStyles();
  const { templateId } = useParams<LocationParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: versions, isValidating: loadingVersionList, revalidate: reloadVersionList } = useTemplateVersionList(
    templateId,
  );
  const { data: template, isValidating: loadingTemplate, revalidate: reloadTemplate } = useTemplate(templateId);

  const handleClickCreate = useCallback(() => history.push(getTemplateVersionCreatePath({ templateId })), [
    history,
    templateId,
  ]);
  const handleClickVersion = useCallback(
    (version: TemplateVersion) =>
      history.push(
        getTemplateVersionEditionPath({
          templateId,
          versionId: version.id,
        }),
      ),
    [history, templateId],
  );
  const handleClickDeleteVersion = useCallback(
    (version: TemplateVersion) => {
      setLoading(true);
      deleteTemplateVersion(templateId, version.id)
        .then(() => reloadVersionList())
        .finally(() => setLoading(false));
    },
    [reloadVersionList, setLoading, templateId],
  );
  const handleClickDuplicate = useCallback((version: TemplateVersion) => {
    console.log(version);
  }, []);
  const handleClickSetToDefault = useCallback(
    (version: TemplateVersion) => {
      setLoading(true);
      updateTemplate(templateId, { currentVersionId: version.id })
        .then(() => reloadTemplate())
        .finally(() => setLoading(false));
    },
    [reloadTemplate, setLoading, templateId],
  );
  const handleClickDelete = useCallback(() => {
    setLoading(true);
    deleteTemplate(templateId).then(() => {
      setLoading(false);
      history.goBack();
    });
  }, [history, templateId]);

  const defaultVersion = versions ? versions.find((item) => template?.currentVersionId === item.id) : undefined;

  return (
    <Skeleton
      backButtonVisible
      loading={loading || loadingVersionList || loadingTemplate}
      mainClassName={classes.root}
      rightElements={
        <ConfirmClickable
          onConfirmedClick={handleClickDelete}
          title="Delete the template"
          description="This will completely delete your template and its versions."
          acceptLabel="Delete"
        >
          <IconButton color="inherit" data-testid="template-delete" title="Delete the template">
            <DeleteIcon />
          </IconButton>
        </ConfirmClickable>
      }
    >
      <Grid container spacing={1} justify="center">
        {template ? (
          <React.Fragment>
            <Grid item xs={12} sm={10} md={8}>
              <TemplateCardlet template={template} />
            </Grid>
            <Grid item xs={12} sm={10} md={8}>
              <TemplateUsageCardlet template={template} version={defaultVersion} />
            </Grid>
          </React.Fragment>
        ) : null}
        {Array.isArray(versions) && versions.length ? (
          <React.Fragment>
            <Grid item xs={12} sm={10} md={8}>
              <Card>
                <List subheader={<ListSubheader>Available versions</ListSubheader>}>
                  {versions.map((version) => (
                    <TemplateVersionListItem
                      key={version.id}
                      currentVersion={version.id === template?.currentVersionId}
                      onClick={handleClickVersion}
                      onDelete={handleClickDeleteVersion}
                      onDuplicate={handleClickDuplicate}
                      onSetToDefault={handleClickSetToDefault}
                      version={version}
                    />
                  ))}
                </List>
              </Card>
            </Grid>
            <CreateButton
              data-action="create-template-version"
              extended
              label="Create a version"
              onClick={handleClickCreate}
            />
          </React.Fragment>
        ) : null}
        {Array.isArray(versions) && versions.length === 0 ? (
          <Grid className={classes.empty} item xs={12} sm={10} md={8}>
            <img alt="empty template versions" src={emptyListSrc} />
            <Typography gutterBottom variant="h5">
              Seems like there are no versions
            </Typography>
            <Button
              color="primary"
              data-action="create-template-version"
              onClick={handleClickCreate}
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </Skeleton>
  );
};

export default TemplateEditionView;
