import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { AxiosError } from 'axios';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertSnackbar from 'src/component/alert-snackbar';
import Skeleton from 'src/component/skeleton';
import { createTemplate } from 'src/service/server';
import { getRoute as getTemplateEditionRoute } from 'src/view/template-edition';

export const ROUTE = '/templates/create';
export const getRoute = () => ROUTE;

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
  const [error, setError] = useState<string>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleClickBack = useCallback(() => history.goBack(), [history]);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createTemplate({ title, description })
        .then((template) =>
          history.replace(
            getTemplateEditionRoute({
              templateId: template.id,
            }),
          ),
        )
        .catch((err: AxiosError) => {
          if (err.response?.status === 409) {
            return setError('The title already exists');
          }
          return setError('Something went wrong...');
        });
    },
    [history, title, description, setError],
  );

  const formValid = validateInput(title);

  return (
    <Skeleton>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader title="Create your template" />
          <CardContent>
            <TextField
              InputLabelProps={shrinkLabelProps}
              autoFocus
              fullWidth
              label="Title"
              margin="normal"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              required
              value={title}
            />
            <TextField
              InputLabelProps={shrinkLabelProps}
              fullWidth
              label="Description"
              margin="normal"
              multiline
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button color="primary" disabled={!formValid} name="create" size="medium" type="submit" variant="contained">
              Create
            </Button>
            <Button name="cancel" onClick={handleClickBack}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
      <AlertSnackbar message={error} severity="error" />
    </Skeleton>
  );
};

export default TemplateCreateView;
