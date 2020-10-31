import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import { config as swrConfig } from 'src/service/server';
import { theme } from 'src/theme';
import TemplateCreateView, { ROUTE as TEMPLATE_CREATE_PATH } from 'src/view/template-create';
import TemplateEditionView, { ROUTE as TEMPLATE_EDITION_PATH } from 'src/view/template-edition';
import TemplateListView, { ROUTE as TEMPLATE_LIST_PATH } from 'src/view/template-list';
import TemplateVersionCreateView, { ROUTE as TEMPLATE_VERSION_CREATE_PATH } from 'src/view/template-version-create';
import TemplateVersionEditionView, { ROUTE as TEMPLATE_VERSION_EDITION_PATH } from 'src/view/template-version-edition';
import TemplateVersionEditorView, { ROUTE as TEMPLATE_VERSION_WYSIWYG_PATH } from 'src/view/template-version-wysiwyg';
import { SWRConfig } from 'swr';

function Application() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig value={swrConfig}>
        <Router>
          <Switch>
            <Route path={TEMPLATE_CREATE_PATH} component={TemplateCreateView} />
            <Route path={TEMPLATE_VERSION_CREATE_PATH} component={TemplateVersionCreateView} />
            <Route path={TEMPLATE_VERSION_WYSIWYG_PATH} component={TemplateVersionEditorView} />
            <Route path={TEMPLATE_VERSION_EDITION_PATH} component={TemplateVersionEditionView} />
            <Route path={TEMPLATE_EDITION_PATH} component={TemplateEditionView} />
            <Route path={TEMPLATE_LIST_PATH} component={TemplateListView} />
          </Switch>
        </Router>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default Application;
