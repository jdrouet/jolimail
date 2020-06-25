import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { theme } from 'src/theme';
import TemplateCreateView, { ROUTE as TEMPLATE_CREATE_PATH } from 'src/view/template-create';
import TemplateEditionView, { ROUTE as TEMPLATE_EDITION_PATH } from 'src/view/template-edition';
import TemplateListView, { ROUTE as TEMPLATE_LIST_PATH } from 'src/view/template-list';
import TemplateVersionCreateView, { ROUTE as TEMPLATE_VERSION_CREATE_PATH } from 'src/view/template-version-create';
import TemplateVersionEditionView, { ROUTE as TEMPLATE_VERSION_EDITION_PATH } from 'src/view/template-version-edition';

function Application() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path={TEMPLATE_CREATE_PATH} component={TemplateCreateView} />
          <Route path={TEMPLATE_VERSION_CREATE_PATH} component={TemplateVersionCreateView} />
          <Route path={TEMPLATE_VERSION_EDITION_PATH} component={TemplateVersionEditionView} />
          <Route path={TEMPLATE_EDITION_PATH} component={TemplateEditionView} />
          <Route path={TEMPLATE_LIST_PATH} component={TemplateListView} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default Application;
