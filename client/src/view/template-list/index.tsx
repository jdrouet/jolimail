import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateButton from 'src/component/button-fab';
import Clickable from 'src/component/clickable';
import Skeleton from 'src/component/skeleton';
import TemplateCardlet from 'src/component/template-cardlet';
import emptyListSrc from 'src/image/empty.svg';
import { Template, useTemplateList } from 'src/service/server';
import { getRoute as getTemplateCreatePath } from 'src/view/template-create';
import { getRoute as getTemplateEditionPath } from 'src/view/template-edition';

export const ROUTE = '/';
export const getRoute = () => ROUTE;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  item: {
    marginTop: theme.spacing(),
  },
  empty: {
    '& > img': {
      maxWidth: 300,
      margin: theme.spacing(3),
    },
    'textAlign': 'center',
  },
}));

const TemplateListView: React.FC<any> = () => {
  const classes = useStyles();
  const { data: templateList, isValidating: loading } = useTemplateList();
  const history = useHistory();

  const handleClickTemplate = (_: any, item: Template) => history.push(getTemplateEditionPath({ templateId: item.id }));
  const handleClickCreate = () => history.push(getTemplateCreatePath());

  return (
    <Skeleton loading={loading} mainClassName={classes.root}>
      {Array.isArray(templateList) && templateList.length === 0 ? (
        <Grid container alignItems="center" justify="center">
          <Grid className={classes.empty} item xs={12} sm={10} md={8}>
            <img alt="empty template list" src={emptyListSrc} />
            <Typography gutterBottom variant="h5">
              Seems like there are no templates
            </Typography>
            <Button color="primary" data-action="create-template" onClick={handleClickCreate} variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {Array.isArray(templateList) && templateList.length > 0 ? (
        <React.Fragment>
          <Grid container spacing={1} justify="center">
            {templateList.map((item) => (
              <Grid item key={item.id} xs={12} sm={10} md={8}>
                <Clickable onClick={handleClickTemplate} value={item}>
                  <TemplateCardlet className={classes.item} template={item} />
                </Clickable>
              </Grid>
            ))}
          </Grid>
          <CreateButton data-action="create-template" extended label="Create a template" onClick={handleClickCreate} />
        </React.Fragment>
      ) : null}
    </Skeleton>
  );
};

export default TemplateListView;
