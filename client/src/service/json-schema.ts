import { useEffect, useState } from 'react';

export const validate = (input?: string) =>
  import('ajv')
    .then(({ default: Ajv }) => {
      const instance = new Ajv();
      if (input) {
        const body = JSON.parse(input);
        instance.compile(body);
      }
      return undefined;
    })
    .catch(() => 'Invalid attributes');

export const useValidation = (input: string) => {
  const [result, setResult] = useState<string>();

  useEffect(() => {
    validate(input).then(setResult);
  }, [input, setResult]);

  return result;
};
