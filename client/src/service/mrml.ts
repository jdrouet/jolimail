import { useEffect, useState } from 'react';

export type MRML = {
  toEmail: (input: string) => { subject: string; text: string; html: string };
};

export const useMRML = function () {
  const [mod, setModule] = useState<MRML>();
  useEffect(() => {
    import('mrml-js')
      .then(({ toEmail }) => setModule({ toEmail }))
      .catch(console.error);
  }, []);
  return mod;
};
