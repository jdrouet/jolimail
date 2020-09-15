import ajv from 'ajv';
import { useEffect, useState } from 'react';

export const useValidator = function () {
  const [mod, setModule] = useState<ajv.Ajv>();
  useEffect(() => {
    import('ajv').then(({ default: Ajv }) => setModule(new Ajv())).catch(console.error);
  }, []);
  return mod;
};

export const validate = (instance: ajv.Ajv | undefined, input: string): boolean | undefined => {
  if (!instance) return undefined;
  try {
    const body = JSON.parse(input);
    instance.compile(body);
    return true;
  } catch {
    return false;
  }
};
