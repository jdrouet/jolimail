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
