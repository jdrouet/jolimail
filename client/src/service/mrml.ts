import { useEffect, useState } from 'react';

export type MRML = {
  toHtml: (input: string) => string;
};

export const useMRML = function () {
  const [mod, setModule] = useState<MRML>();
  useEffect(() => {
    import('mrml').then(({ toHtml }) => setModule({ toHtml })).catch(console.error);
  }, []);
  return mod;
};

export const validate = (instance: MRML | undefined, input: string | undefined): boolean | undefined => {
  if (!instance || !input) return undefined;
  try {
    instance.toHtml(input);
    return true;
  } catch {
    return false;
  }
};
