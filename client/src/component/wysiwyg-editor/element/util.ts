import { times } from 'src/service/utils';

export const toAttributes = (input: { [key: string]: any }) =>
  Object.entries(input)
    .map((entry) => `${entry[0]}="${entry[1]}"`)
    .join(' ');

export const toElement = (tag: string, attributes?: { [key: string]: any }, children?: string): string => {
  const attrs = toAttributes(attributes ?? {});
  const open = attrs.length > 0 ? `<${tag} ${attrs}` : `<${tag}`;
  if (typeof children === 'undefined') {
    return open + ' />';
  }
  return `${open}>${children}</${tag}>`;
};

export const indent = (level: number, value: string) => times(level * 4, ' ').join('') + value;
