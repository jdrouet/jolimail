import fetchMock from 'fetch-mock';

import { createTemplate } from './server';

test('createTemplate', async () => {
  const mock = fetchMock.post('/api/templates', 400);
  try {
    await createTemplate({ title: 'testing' });
    expect(true).toBeFalsy();
  } catch (err) {
    expect(err.message).toEqual('Bad Request');
  }
  mock.restore();
});
