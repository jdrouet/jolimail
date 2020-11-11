import { ContentElement, toMrml as elementToMrml } from '../service';
import { indent } from '../util';

export type SectionElement = {
  type: 'section';
  properties: {
    columns: 1 | 2 | 3 | 4;
  };
  children?: (ContentElement | undefined)[];
};

const childToMrml = (input: ContentElement | undefined, level: number): string =>
  `${indent(level, '<mj-column>')}\n${input ? elementToMrml(input, level + 1) : ''}\n${indent(level, '</mj-column>')}`;

export const toMrml = (input: SectionElement, level: number): string => {
  const children = (input.children ?? []).map((item) => childToMrml(item, level + 1)).join('');
  return `${indent(level, '<mj-section>')}\n${children}\n${indent(level, '</mj-section>')}`;
};
