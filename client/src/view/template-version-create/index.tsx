import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AlertSnackbar, { useAlertState } from 'src/component/alert-snackbar';
import Skeleton from 'src/component/skeleton';
import { createTemplateVersion } from 'src/service/server';
import { getRoute as getTemplateVersionEditionRoute } from 'src/view/template-version-edition';

type LocationParams = {
  templateId: string;
};

export const getRoute = (params: LocationParams) => `/templates/${params.templateId}/versions/create`;
export const ROUTE = getRoute({ templateId: ':templateId' });

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    padding: theme.spacing(1),
    maxWidth: 500,
  },
  actions: {
    justifyContent: 'right',
  },
}));

const shrinkLabelProps = {
  shrink: true,
};

const validateInput = (input: string) => input.trim().length > 0;

const TemplateCreateView: React.FC<any> = () => {
  const classes = useStyles();
  const history = useHistory();
  const { templateId } = useParams<LocationParams>();

  const { onOpen: openAlert, ...alertState } = useAlertState();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const handleClickBack = useCallback(() => history.goBack(), [history]);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      createTemplateVersion(templateId, name)
        .then((version) => history.replace(getTemplateVersionEditionRoute({ templateId, versionId: version.id })))
        .catch((err: AxiosError) => {
          setLoading(false);
          if (err.response?.status === 409) {
            return openAlert('The name already exists', 'warning');
          }
          return openAlert('Something went wrong...', 'error');
        });
    },
    [history, templateId, name],
  );

  const formValid = validateInput(name);

  return (
    <Skeleton>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Create a new version" />
          <CardContent>
            <TextField
              InputLabelProps={shrinkLabelProps}
              autoFocus
              disabled={loading}
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button color="primary" disabled={loading || !formValid} size="medium" type="submit" variant="contained">
              Create
            </Button>
            <Button onClick={handleClickBack}>Cancel</Button>
          </CardActions>
        </Card>
      </form>
      <AlertSnackbar {...alertState} />
    </Skeleton>
  );
};

export default TemplateCreateView;
