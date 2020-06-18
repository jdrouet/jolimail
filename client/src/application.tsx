import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Skeleton from './component/skeleton';
import TemplateCreateView from './view/template-create';
import TemplateEditionView from './view/template-edition';
import TemplateListView from './view/template-list';
import { theme } from './theme';

function Application() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Skeleton>
          <Switch>
            <Route path="/create" component={TemplateCreateView} />
            <Route path="/edition/:template_id" component={TemplateEditionView} />
            <Route path="/" component={TemplateListView} />
          </Switch>
        </Skeleton>
      </Router>
    </ThemeProvider>
  );
}

export default Application;
