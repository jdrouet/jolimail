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

export const toHtml = (input?: string) => import('mrml').then(({ toHtml }) => (input ? toHtml(input) : ''));

export const useToHtml = (input?: string) => {
  const [result, setResult] = useState<string>();

  useEffect(() => {
    toHtml(input).then(setResult);
  }, [input, setResult]);

  return result;
};

export const validate = (input?: string) =>
  import('mrml')
    .then(({ validate }) => {
      if (input) {
        validate(input);
      }
      return undefined;
    })
    .catch((err) => {
      console.error(err);
      return 'Invalid template';
    });

export const useValidation = (input?: string) => {
  const [result, setResult] = useState<string>();

  useEffect(() => {
    validate(input).then(setResult);
  }, [input, setResult]);

  return result;
};
