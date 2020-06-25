import { withKnobs } from '@storybook/addon-knobs';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import TemplateCardlet from './index';

export default {
  title: 'Component/Template/Cardlet',
  decorators: [withKnobs],
} as Meta;

const template = {
  id: 'asdfghjk',
  slug: 'trololo',
  title: 'trololo',
  description: 'This is the description',
  currentVersionId: null,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  deletedAt: null,
};

export const Basic: Story = () => <TemplateCardlet template={template} />;
