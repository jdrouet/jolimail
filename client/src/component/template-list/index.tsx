import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Clickable from 'src/component/clickable';
import EmptyState from 'src/component/empty-state';
import LoadingState from 'src/component/loading-state';
import TemplateCardlet from 'src/component/template-cardlet';
import { Template, useTemplateList } from 'src/service/server';

type TemplateListProps = {
  count: number;
  page: number;
  onClickCreate: () => void;
  onClickMore: () => void;
  onClickTemplate: (_: any, item: Template) => void;
  showMoreButton: boolean;
};

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  item: {
    marginTop: theme.spacing(),
  },
}));

const TemplateList: React.FC<TemplateListProps> = ({
  count,
  onClickMore,
  onClickTemplate,
  onClickCreate,
  page,
  showMoreButton,
}) => {
  const classes = useStyles();
  const { data } = useTemplateList(page * count, count);

  if (!Array.isArray(data)) {
    return (
      <Grid item xs={12}>
        <LoadingState />
      </Grid>
    );
  }

  if (page === 0 && Array.isArray(data) && data.length === 0) {
    return (
      <Grid item xs={12}>
        <EmptyState message="The are no template available..." onClickCreate={onClickCreate} />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={10} md={8}>
          <Clickable onClick={onClickTemplate} value={item}>
            <TemplateCardlet className={classes.item} template={item} />
          </Clickable>
        </Grid>
      ))}
      {(data ?? []).length === count && !showMoreButton ? (
        <Grid item xs={6}>
          <Divider className={classes.divider} />
        </Grid>
      ) : null}
      {(data ?? []).length === count && showMoreButton ? (
        <Grid className={classes.center} item xs={12}>
          <Button onClick={onClickMore} variant="outlined">
            Load more...
          </Button>
        </Grid>
      ) : null}
    </React.Fragment>
  );
};

export default TemplateList;
