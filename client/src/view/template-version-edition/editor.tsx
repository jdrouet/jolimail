import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useCallback, useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';

const MonacoEditor = React.lazy(() => import('react-monaco-editor'));

export enum TabValue {
  template = 'template',
  attributes = 'attributes',
}

const useStyles = makeStyles(() => ({
  grow: {
    flex: 1,
  },
}));

const editorOptions = {
  renderIndentGuides: true,
};

export type TemplateEditionViewEditor = {
  template: string;
  attributes: string;
  templateInvalid?: boolean;
  attributesInvalid?: boolean;
  onChangeTemplate: (value: string) => void;
  onChangeAttributes: (value: string) => void;
};

const TemplateEditionViewEditor: React.FC<TemplateEditionViewEditor> = ({
  template,
  attributes,
  templateInvalid,
  attributesInvalid,
  onChangeTemplate,
  onChangeAttributes,
}) => {
  const classes = useStyles();
  const [tab, setTab] = useState<TabValue>(TabValue.template);

  const handleChangeEditor = useCallback(
    (value: string) => {
      if (tab === TabValue.template) {
        onChangeTemplate(value);
      } else {
        onChangeAttributes(value);
      }
    },
    [onChangeAttributes, onChangeTemplate, tab],
  );

  const content = tab === TabValue.template ? template : attributes;

  return (
    <React.Fragment>
      <Tabs variant="fullWidth" onChange={(event, value) => setTab(value)} value={tab}>
        <Tab
          label={
            <Badge color="secondary" invisible={!templateInvalid} variant="dot">
              Template
            </Badge>
          }
          value={TabValue.template}
        />
        <Tab
          label={
            <Badge color="secondary" invisible={!attributesInvalid} variant="dot">
              Attributes
            </Badge>
          }
          value={TabValue.attributes}
        />
      </Tabs>
      <div className={classes.grow}>
        <React.Suspense fallback={<div />}>
          <MonacoEditor
            options={editorOptions}
            onChange={handleChangeEditor}
            value={content}
            language={tab === TabValue.template ? 'html' : 'json'}
            theme="vs-dark"
          />
        </React.Suspense>
      </div>
    </React.Fragment>
  );
};

export default TemplateEditionViewEditor;
