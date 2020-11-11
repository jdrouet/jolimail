import { ContentElement } from '../service';

export type SectionElement = {
  type: 'section';
  properties: {
    columns: 1 | 2 | 3 | 4;
  };
  children?: (ContentElement | undefined)[];
};
