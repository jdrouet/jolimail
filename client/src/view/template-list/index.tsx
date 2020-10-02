import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateButton from 'src/component/button-fab';
import Clickable from 'src/component/clickable';
import Skeleton from 'src/component/skeleton';
import TemplateCardlet from 'src/component/template-cardlet';
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
}));

const TemplateListView: React.FC<any> = () => {
  const classes = useStyles();
  const { data: templateList = [] } = useTemplateList();
  const history = useHistory();

  const handleClickTemplate = (_: any, item: Template) => history.push(getTemplateEditionPath({ templateId: item.id }));
  const handleClickCreate = () => history.push(getTemplateCreatePath());

  return (
    <Skeleton mainClassName={classes.root}>
      <Grid container spacing={1} justify="center">
        {templateList.map((item) => (
          <Grid item key={item.id} xs={12} sm={10} md={8}>
            <Clickable onClick={handleClickTemplate} value={item}>
              <TemplateCardlet className={classes.item} template={item} />
            </Clickable>
          </Grid>
        ))}
      </Grid>
      {!!templateList ? (
        <CreateButton extended={templateList.length === 0} label="Create a template" onClick={handleClickCreate} />
      ) : null}
    </Skeleton>
  );
};

export default TemplateListView;
