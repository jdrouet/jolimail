import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useTemplateList, Template } from '../../service/server';
import Clickable from '../../component/clickable';
import TemplateCardlet from '../../component/template-cardlet';
import CreateButton from './create-button';

const useStyles = makeStyles((theme) => ({
  list: {
    margin: '0 auto',
    maxWidth: 500,
  },
  item: {
    marginTop: theme.spacing(1),
  },
}));

const TemplateListView: React.FC<any> = () => {
  const classes = useStyles();
  const templateList = useTemplateList();
  const history = useHistory();

  const handleClickTemplate = useCallback(
    (_: any, item: Template) => {
      history.push(`/edition/${item.id}`);
    },
    [history],
  );
  const handleClickCreate = useCallback(() => {
    history.push('/create');
  }, [history]);

  return (
    <React.Fragment>
      <main className={classes.list}>
        {templateList?.map((item) => (
          <Clickable key={item.id} onClick={handleClickTemplate} value={item}>
            <TemplateCardlet className={classes.item} template={item} />
          </Clickable>
        ))}
      </main>
      {!!templateList ? <CreateButton extended={templateList.length === 0} onClick={handleClickCreate} /> : null}
    </React.Fragment>
  );
};

export default TemplateListView;
