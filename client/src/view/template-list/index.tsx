import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CreateButton from 'src/component/button-fab';
import Skeleton from 'src/component/skeleton';
import TemplateList from 'src/component/template-list';
import { times } from 'src/service/array';
import { Template } from 'src/service/server';
import { getRoute as getTemplateCreatePath } from 'src/view/template-create';
import { getRoute as getTemplateEditionPath } from 'src/view/template-edition';

export const ROUTE = '/';
export const getRoute = () => ROUTE;

const TEMPLATE_BATCH_SIZE = 20;

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
  const history = useHistory();
  const [pages, setPages] = useState<number>(1);

  const handleClickNext = useCallback(() => setPages((value) => value + 1), [setPages]);

  const handleClickTemplate = (_: any, item: Template) => history.push(getTemplateEditionPath({ templateId: item.id }));
  const handleClickCreate = () => history.push(getTemplateCreatePath());

  return (
    <Skeleton mainClassName={classes.root}>
      <Grid container spacing={1} justify="center">
        {times(pages).map((_, index) => (
          <TemplateList
            key={index}
            count={TEMPLATE_BATCH_SIZE}
            page={index}
            onClickMore={handleClickNext}
            onClickTemplate={handleClickTemplate}
            onClickCreate={handleClickCreate}
            showMoreButton={index + 1 === pages}
          />
        ))}
      </Grid>
      <CreateButton data-action="create-template" extended label="Create a template" onClick={handleClickCreate} />
    </Skeleton>
  );
};

export default TemplateListView;
