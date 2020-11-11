import { ContentElement, toMrml as elementToMrml } from '../service';

export type SectionElement = {
  type: 'section';
  properties: {
    columns: 1 | 2 | 3 | 4;
  };
  children?: (ContentElement | undefined)[];
};

const childToMrml = (input?: ContentElement): string => `<mj-option>${input ? elementToMrml(input) : ''}</mj-option>`;

export const toMrml = (input: SectionElement): string => {
  const children = (input.children ?? []).map(childToMrml).join('');
  return `<mj-section>${children}</mj-section>`;
};
