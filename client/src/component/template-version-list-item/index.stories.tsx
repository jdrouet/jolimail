import List from '@material-ui/core/List';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import TemplateVersionListItem from './index';

export default {
  title: 'Component/TemplateVersion/ListItem',
  decorators: [withKnobs],
} as Meta;

const version = {
  id: 'asdfghjk',
  templateId: 'iooinrgoieg',
  name: '0.0.1',
  content: '',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  deletedAt: null,
};

export const Basic: Story = () => (
  <List>
    <TemplateVersionListItem
      onClick={console.log}
      onDelete={console.log}
      onDuplicate={console.log}
      onSetToDefault={console.log}
      version={version}
    />
  </List>
);

export const CurrentVersion: Story = () => (
  <List>
    <TemplateVersionListItem
      currentVersion
      onClick={console.log}
      onDelete={console.log}
      onDuplicate={console.log}
      onSetToDefault={console.log}
      version={version}
    />
  </List>
);
